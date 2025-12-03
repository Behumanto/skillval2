"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

type ActiveAssessment = {
  id: string;
  candidateName: string;
  evcStandard: string;
  startTime: string;
  currentTask: string;
  notes: AssessmentNote[];
  photos: AssessmentPhoto[];
  videoRecordings: VideoRecording[];
  isRecording: boolean;
  isVideoRecording: boolean;
  detectedObjects: DetectedObject[];
  questions: AssessmentQuestion[];
};

type AssessmentNote = {
  id: string;
  timestamp: number;
  content: string;
  category: "observation" | "question" | "comment" | "concern";
};

type AssessmentPhoto = {
  id: string;
  timestamp: number;
  url: string;
  description: string;
  detectedObjects?: string[];
};

type VideoRecording = {
  id: string;
  startTime: number;
  endTime?: number;
  url?: string;
  thumbnail?: string;
  objectDetections: DetectedObject[];
};

type DetectedObject = {
  timestamp: number;
  objects: string[];
  confidence: number;
  screenshot?: string;
};

type AssessmentQuestion = {
  id: string;
  timestamp: number;
  question: string;
  answer?: string;
  category: "technical" | "safety" | "process" | "knowledge";
  importance: "low" | "medium" | "high";
};

type CompetencyObservation = {
  competency: string;
  observed: boolean;
  notes: string;
  evidenceType: "visual" | "audio" | "written";
  timestamp?: number;
  confidence: number;
  subSteps: SubStepProgress[];
  requiresAssessorVerification: boolean;
};

type SubStepProgress = {
  step: string;
  detected: boolean;
  confidence: number;
  evidence: string;
  timestamp?: number;
  criticality: 'low' | 'medium' | 'high';
  assessorVerified?: boolean;
};

export default function LiveAssessmentPage() {
  const [activeAssessment, setActiveAssessment] = useState<ActiveAssessment>({
    id: "live-1",
    candidateName: "Robin Jansen",
    evcStandard: "Autotechniek APK Keurmeester",
    startTime: new Date().toISOString(),
    currentTask: "Remmen controle en beoordeling",
    notes: [],
    photos: [],
    videoRecordings: [],
    isRecording: false,
    isVideoRecording: false,
    detectedObjects: [],
    questions: []
  });

  const [observations, setObservations] = useState<CompetencyObservation[]>([
    { 
      competency: "Systematische diagnose", 
      observed: false, 
      notes: "", 
      evidenceType: "visual", 
      confidence: 0,
      subSteps: [],
      requiresAssessorVerification: false
    },
    { 
      competency: "Veiligheidsprotocol naleven", 
      observed: false, 
      notes: "", 
      evidenceType: "visual", 
      confidence: 0,
      subSteps: [],
      requiresAssessorVerification: false
    },
    { 
      competency: "Correct gereedschap gebruik", 
      observed: false, 
      notes: "", 
      evidenceType: "visual", 
      confidence: 0,
      subSteps: [],
      requiresAssessorVerification: false
    },
    { 
      competency: "Documentatie bijhouden", 
      observed: false, 
      notes: "", 
      evidenceType: "written", 
      confidence: 0,
      subSteps: [],
      requiresAssessorVerification: false
    },
    { 
      competency: "Kwaliteitscontrole uitvoeren", 
      observed: false, 
      notes: "", 
      evidenceType: "visual", 
      confidence: 0,
      subSteps: [],
      requiresAssessorVerification: false
    },
    { 
      competency: "Communicatie met opdrachtgever", 
      observed: false, 
      notes: "", 
      evidenceType: "audio", 
      confidence: 0,
      subSteps: [],
      requiresAssessorVerification: false
    }
  ]);

  const [currentNote, setCurrentNote] = useState("");
  const [noteCategory, setNoteCategory] = useState<AssessmentNote["category"]>("observation");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questionCategory, setQuestionCategory] = useState<AssessmentQuestion["category"]>("technical");
  const [questionImportance, setQuestionImportance] = useState<AssessmentQuestion["importance"]>("medium");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);
  const [assessmentStatus, setAssessmentStatus] = useState<"not_started" | "active" | "paused" | "ended">("not_started");
  const [liveTranscription, setLiveTranscription] = useState<string[]>([]);
  const [currentDetectedObjects, setCurrentDetectedObjects] = useState<string[]>([]);
  const [objectDetectionText, setObjectDetectionText] = useState<string>("");
  const [assessorAlerts, setAssessorAlerts] = useState<string[]>([]);
  const [azureVisionEnabled, setAzureVisionEnabled] = useState<boolean>(true);
  const [expandedCompetencies, setExpandedCompetencies] = useState<Set<string>>(new Set());
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Initialize camera and object detection
  useEffect(() => {
    initializeCamera();
    initializeSpeechRecognition();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    };
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "environment" },
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error("Fout bij toegang tot camera:", error);
    }
  };

  const initializeSpeechRecognition = () => {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'nl-NL';
        
        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          
          if (event.results[current].isFinal) {
            setLiveTranscription(prev => [
              ...prev,
              `[${formatTime(elapsedTime)}] ${transcript}`
            ]);
          }
        };
        
        recognition.onerror = (event: any) => {
          console.log('Speech recognition error:', event.error);
        };
        
        speechRecognitionRef.current = recognition;
      } else {
        console.log('Speech recognition not supported');
      }
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
    }
  };

  const startVideoRecording = async () => {
    if (!streamRef.current) {
      console.log("No camera stream available");
      alert("Camera niet beschikbaar. Zorg ervoor dat camera toegang is verleend.");
      return;
    }

    try {
      // Ensure we have a good stream
      if (!streamRef.current.active) {
        await initializeCamera();
        if (!streamRef.current || !streamRef.current.active) {
          throw new Error("Camera stream niet actief");
        }
      }

      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: 'video/webm;codecs=vp8,opus'
      });
      
      const chunks: Blob[] = [];
      const startTime = elapsedTime;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
          console.log("Video chunk recorded:", event.data.size);
        }
      };

      mediaRecorder.onstop = () => {
        console.log("Video recording stopped, creating blob...");
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        setActiveAssessment(prev => ({
          ...prev,
          isVideoRecording: false,
          videoRecordings: [
            ...prev.videoRecordings,
            {
              id: Date.now().toString(),
              startTime: startTime,
              endTime: elapsedTime,
              url: url,
              objectDetections: prev.detectedObjects.filter(d => d.timestamp >= startTime)
            }
          ]
        }));
        
        console.log("Video recording saved successfully");
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setActiveAssessment(prev => ({ ...prev, isVideoRecording: false }));
      };

      mediaRecorder.start(1000); // Record in 1 second chunks
      mediaRecorderRef.current = mediaRecorder;
      
      setActiveAssessment(prev => ({ ...prev, isVideoRecording: true }));
      console.log("Video recording started successfully");
      
      // Start object detection during recording
      startObjectDetection();
      
    } catch (error) {
      console.error("Fout bij starten video opname:", error);
      alert(`Kon video opname niet starten: ${error instanceof Error ? error.message : 'Onbekende fout'}`);
      setActiveAssessment(prev => ({ ...prev, isVideoRecording: false }));
    }
  };

  const stopVideoRecording = () => {
    console.log("Stopping video recording...");
    
    if (mediaRecorderRef.current) {
      const recorder = mediaRecorderRef.current;
      
      if (recorder.state === "recording") {
        recorder.stop();
        console.log("Video recorder stopped");
      } else {
        console.log("Recorder not in recording state:", recorder.state);
        setActiveAssessment(prev => ({ ...prev, isVideoRecording: false }));
      }
    } else {
      console.log("No media recorder available");
      setActiveAssessment(prev => ({ ...prev, isVideoRecording: false }));
    }
  };

  const startObjectDetection = () => {
    console.log("Starting object detection...");
    
    const detectObjects = async () => {
      console.log("DetectObjects function called");
      console.log("VideoRef exists:", !!videoRef.current);
      console.log("CanvasRef exists:", !!canvasRef.current);
      console.log("Video dimensions:", videoRef.current?.videoWidth, videoRef.current?.videoHeight);
      console.log("Recording status (state):", activeAssessment.isVideoRecording);
      console.log("Recording status (MediaRecorder):", mediaRecorderRef.current?.state);
      
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (ctx && videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          ctx.drawImage(videoRef.current, 0, 0);
          console.log("Canvas drawn successfully");
          
          try {
            // Convert canvas to blob for API
            canvas.toBlob(async (blob) => {
              if (blob) {
                const formData = new FormData();
                formData.append('image', blob, 'screenshot.jpg');
                formData.append('timestamp', elapsedTime.toString());
                formData.append('currentTask', activeAssessment.currentTask);
                formData.append('candidateName', activeAssessment.candidateName);
                
                // Try Azure Vision first if enabled
                const apiEndpoint = azureVisionEnabled 
                  ? '/api/live-assessment/azure-vision' 
                  : '/api/live-assessment/object-detection';
                
                console.log(`Sending detection request to: ${apiEndpoint}`);
                
                const response = await fetch(apiEndpoint, {
                  method: 'POST',
                  body: formData
                });
                
                console.log(`Detection API response status: ${response.status}`);
                
                if (response.ok) {
                  const detectionResult = await response.json();
                  console.log("Detection result:", detectionResult);
                  
                  // Handle Azure Vision response
                  if (azureVisionEnabled && detectionResult.competencySteps) {
                    console.log("Processing Azure Vision result");
                    handleAzureVisionResult(detectionResult);
                  } else {
                    console.log("Processing basic object detection result");
                    // Handle regular object detection
                    const detection: DetectedObject = {
                      timestamp: elapsedTime,
                      objects: detectionResult.objects || [],
                      confidence: detectionResult.confidence || 0.5,
                      screenshot: canvas.toDataURL()
                    };
                    
                    setActiveAssessment(prev => ({
                      ...prev,
                      detectedObjects: [...prev.detectedObjects, detection]
                    }));
                    
                    // Update real-time object detection display
                    setCurrentDetectedObjects(detectionResult.objects || []);
                    setObjectDetectionText(
                      `[${formatTime(elapsedTime)}] Gedetecteerd: ${(detectionResult.objects || []).join(", ")} (${((detectionResult.confidence || 0.5) * 100).toFixed(0)}%)`
                    );
                    
                    // Apply AI-powered competency updates
                    if (detectionResult.competencyUpdates) {
                      applyCompetencyUpdates(detectionResult.competencyUpdates);
                    }
                  }
                } else {
                  console.error(`Detection API error: ${response.status}`);
                  console.log("Falling back to simulation mode");
                  // Fallback to simulation if API fails
                  const simulatedDetections = simulateObjectDetection();
                  const confidence = Math.random() * 0.3 + 0.7;
                  const detection: DetectedObject = {
                    timestamp: elapsedTime,
                    objects: simulatedDetections,
                    confidence: confidence,
                    screenshot: canvas.toDataURL()
                  };
                  
                  setActiveAssessment(prev => ({
                    ...prev,
                    detectedObjects: [...prev.detectedObjects, detection]
                  }));
                  
                  // Update real-time object detection display (simulation)
                  setCurrentDetectedObjects(simulatedDetections);
                  setObjectDetectionText(
                    `[${formatTime(elapsedTime)}] Simulatie: ${simulatedDetections.join(", ")} (${(confidence * 100).toFixed(0)}%)`
                  );
                  
                  updateCompetencyObservations(simulatedDetections);
                }
              }
            }, 'image/jpeg', 0.8);
          } catch (error) {
            console.error('Object detection error:', error);
            console.log("Exception caught, falling back to simulation");
            // Always fallback to simulation on error
            const simulatedDetections = simulateObjectDetection();
            const confidence = Math.random() * 0.3 + 0.7;
            const detection: DetectedObject = {
              timestamp: elapsedTime,
              objects: simulatedDetections,
              confidence: confidence,
              screenshot: canvas.toDataURL()
            };
            
            setActiveAssessment(prev => ({
              ...prev,
              detectedObjects: [...prev.detectedObjects, detection]
            }));
            
            // Update real-time object detection display (simulation)
            setCurrentDetectedObjects(simulatedDetections);
            setObjectDetectionText(
              `[${formatTime(elapsedTime)}] Simulatie (Error): ${simulatedDetections.join(", ")} (${(confidence * 100).toFixed(0)}%)`
            );
            
            updateCompetencyObservations(simulatedDetections);
          }
        } else {
          console.log("Canvas context unavailable or video not ready");
          console.log("Canvas context exists:", !!ctx);
          console.log("Video dimensions:", videoRef.current?.videoWidth, videoRef.current?.videoHeight);
        }
      } else {
        console.log("Video or canvas ref not available");
        console.log("VideoRef.current:", !!videoRef.current);
        console.log("CanvasRef.current:", !!canvasRef.current);
      }
    };

    // Wait a moment for video to be ready, then start detection
    setTimeout(() => {
      console.log("Initial detection attempt after video setup");
      detectObjects();
    }, 1000);

    // Run detection every 3 seconds during recording for better responsiveness
    const detectionInterval = setInterval(() => {
      // Check if video is recording by checking MediaRecorder state instead of state variable
      const isRecording = mediaRecorderRef.current?.state === 'recording';
      console.log("Detection interval check - MediaRecorder state:", mediaRecorderRef.current?.state, "State variable:", activeAssessment.isVideoRecording);
      
      if (isRecording && videoRef.current && canvasRef.current) {
        console.log("Running scheduled object detection...");
        detectObjects();
      } else if (!isRecording) {
        console.log("Stopping detection interval - not recording");
        clearInterval(detectionInterval);
      }
    }, 3000);
  };

  const simulateObjectDetection = (): string[] => {
    const automotiveObjects = [
      "remklauw", "remschijf", "wielmoer", "steeksleutel", "dopsleutel",
      "multimeter", "diagnose computer", "hefbrug", "veiligheidsbril",
      "handschoenen", "motor", "accu", "radiator", "versnellingsbok",
      "uitlaat", "schokdemper", "veer", "rubberlaars", "oliekan"
    ];
    
    const detected = [];
    const numDetections = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numDetections; i++) {
      const randomObject = automotiveObjects[Math.floor(Math.random() * automotiveObjects.length)];
      if (!detected.includes(randomObject)) {
        detected.push(randomObject);
      }
    }
    
    return detected;
  };

  const handleAzureVisionResult = (result: any) => {
    // Update detected objects
    const detection: DetectedObject = {
      timestamp: elapsedTime,
      objects: result.detectedObjects,
      confidence: result.overallConfidence,
      screenshot: canvasRef.current?.toDataURL() || ''
    };
    
    setActiveAssessment(prev => ({
      ...prev,
      detectedObjects: [...prev.detectedObjects, detection]
    }));
    
    // Update real-time display
    setCurrentDetectedObjects(result.detectedObjects);
    setObjectDetectionText(
      `[${formatTime(elapsedTime)}] Azure Vision: ${result.detectedObjects.join(", ")} (${(result.overallConfidence * 100).toFixed(0)}%)`
    );
    
    // Update competency observations with sub-steps
    setObservations(prev => prev.map(obs => {
      const matchingCompetency = result.competencySteps?.find(
        (cs: any) => cs.competency === obs.competency
      );
      
      if (matchingCompetency) {
        return {
          ...obs,
          subSteps: matchingCompetency.subSteps.map((step: any) => ({
            ...step,
            timestamp: step.detected ? elapsedTime : step.timestamp
          })),
          confidence: Math.max(obs.confidence, matchingCompetency.overallProgress),
          observed: matchingCompetency.overallProgress > 0.6,
          requiresAssessorVerification: matchingCompetency.requiresAssessorVerification,
          timestamp: matchingCompetency.overallProgress > 0.6 && !obs.timestamp ? elapsedTime : obs.timestamp
        };
      }
      return obs;
    }));
    
    // Update assessor alerts
    if (result.assessorAlerts?.length > 0) {
      setAssessorAlerts(prev => [
        ...prev,
        ...result.assessorAlerts.map((alert: string) => 
          `[${formatTime(elapsedTime)}] ${alert}`
        )
      ]);
    }
  };

  const applyCompetencyUpdates = (competencyUpdates: any[]) => {
    if (!competencyUpdates || competencyUpdates.length === 0) return;
    
    setObservations(prev => prev.map(obs => {
      const update = competencyUpdates.find(u => u.competency === obs.competency);
      if (update) {
        const newConfidence = Math.min(1, obs.confidence + update.confidenceIncrease);
        const shouldObserve = update.shouldMarkObserved || newConfidence > 0.7;
        
        return {
          ...obs,
          confidence: newConfidence,
          observed: shouldObserve,
          notes: obs.notes ? `${obs.notes}; ${update.reasoning}` : update.reasoning,
          timestamp: shouldObserve && !obs.timestamp ? elapsedTime : obs.timestamp
        };
      }
      return obs;
    }));
  };

  const updateCompetencyObservations = (detectedObjects: string[]) => {
    const safetyItems = ["veiligheidsbril", "handschoenen", "rubberlaars"];
    const toolItems = ["steeksleutel", "dopsleutel", "multimeter", "diagnose computer"];
    
    setObservations(prev => prev.map(obs => {
      let newConfidence = obs.confidence;
      let observed = obs.observed;
      
      if (obs.competency === "Veiligheidsprotocol naleven" && detectedObjects.some(obj => safetyItems.includes(obj))) {
        newConfidence = Math.min(1, obs.confidence + 0.2);
        observed = newConfidence > 0.6;
      }
      
      if (obs.competency === "Correct gereedschap gebruik" && detectedObjects.some(obj => toolItems.includes(obj))) {
        newConfidence = Math.min(1, obs.confidence + 0.3);
        observed = newConfidence > 0.5;
      }
      
      return {
        ...obs,
        confidence: newConfidence,
        observed: observed,
        timestamp: observed && !obs.timestamp ? elapsedTime : obs.timestamp
      };
    }));
  };

  const toggleTimer = () => {
    if (isTimerRunning) {
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      console.log("Timer stopped at:", formatTime(elapsedTime));
    } else {
      // Start timer
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      console.log("Timer started");
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const startAssessment = () => {
    setAssessmentStatus("active");
    if (!isTimerRunning) {
      toggleTimer();
    }
    // Start speech recognition
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.start();
    }
    console.log("Assessment started");
  };

  const pauseAssessment = () => {
    setAssessmentStatus("paused");
    if (isTimerRunning) {
      toggleTimer();
    }
    // Stop speech recognition
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
    }
    console.log("Assessment paused");
  };

  const endAssessment = () => {
    setAssessmentStatus("ended");
    if (isTimerRunning) {
      toggleTimer();
    }
    if (activeAssessment.isVideoRecording) {
      stopVideoRecording();
    }
    // Stop speech recognition
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
    }
    console.log("Assessment ended");
  };

  const resumeAssessment = () => {
    setAssessmentStatus("active");
    if (!isTimerRunning) {
      toggleTimer();
    }
    // Resume speech recognition
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.start();
    }
    console.log("Assessment resumed");
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addNote = () => {
    if (currentNote.trim()) {
      const note: AssessmentNote = {
        id: Date.now().toString(),
        timestamp: elapsedTime,
        content: currentNote,
        category: noteCategory
      };
      
      setActiveAssessment(prev => ({
        ...prev,
        notes: [...prev.notes, note]
      }));
      setCurrentNote("");
    }
  };

  const addQuestion = () => {
    if (currentQuestion.trim()) {
      const question: AssessmentQuestion = {
        id: Date.now().toString(),
        timestamp: elapsedTime,
        question: currentQuestion,
        category: questionCategory,
        importance: questionImportance
      };
      
      setActiveAssessment(prev => ({
        ...prev,
        questions: [...prev.questions, question]
      }));
      setCurrentQuestion("");
      setShowQuestionDialog(false);
    }
  };

  const takeScreenshot = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0);
        
        const screenshot = canvas.toDataURL();
        const photo: AssessmentPhoto = {
          id: Date.now().toString(),
          timestamp: elapsedTime,
          url: screenshot,
          description: `Screenshot op ${formatTime(elapsedTime)}`,
          detectedObjects: activeAssessment.detectedObjects[activeAssessment.detectedObjects.length - 1]?.objects || []
        };
        
        setActiveAssessment(prev => ({
          ...prev,
          photos: [...prev.photos, photo]
        }));
      }
    }
  };

  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const photo: AssessmentPhoto = {
        id: Date.now().toString(),
        timestamp: elapsedTime,
        url: url,
        description: `Foto op ${formatTime(elapsedTime)}`
      };
      
      setActiveAssessment(prev => ({
        ...prev,
        photos: [...prev.photos, photo]
      }));
    }
  };

  const generateAssessmentReport = async () => {
    try {
      // Stop any ongoing recording first
      if (activeAssessment.isVideoRecording) {
        stopVideoRecording();
      }
      
      const assessmentData = {
        assessment: activeAssessment,
        observations: observations,
        duration: elapsedTime,
        completedAt: new Date().toISOString(),
        azureVisionEnabled: azureVisionEnabled,
        assessorAlerts: assessorAlerts,
        summary: {
          totalObservations: observations.filter(obs => obs.observed).length,
          totalPhotos: activeAssessment.photos.length,
          totalNotes: activeAssessment.notes.length,
          totalQuestions: activeAssessment.questions.length,
          detectedObjects: [...new Set(activeAssessment.detectedObjects.flatMap(d => d.objects))],
          averageConfidence: observations.reduce((acc, obs) => acc + obs.confidence, 0) / observations.length,
          subStepsCompleted: observations.reduce((acc, obs) => acc + obs.subSteps.filter(s => s.detected).length, 0),
          totalSubSteps: observations.reduce((acc, obs) => acc + obs.subSteps.length, 0),
          criticalStepsMissed: observations.reduce((acc, obs) => acc + obs.subSteps.filter(s => s.criticality === 'high' && !s.detected).length, 0),
          assessorVerifications: observations.reduce((acc, obs) => acc + obs.subSteps.filter(s => s.assessorVerified).length, 0)
        }
      };

      // Show generating message
      const generateButton = document.querySelector('button[onClick*="generateAssessmentReport"]') as HTMLButtonElement;
      if (generateButton) {
        generateButton.disabled = true;
        generateButton.textContent = "Rapport wordt gegenereerd...";
      }

      // Call API to generate comprehensive report
      const response = await fetch('/api/live-assessment/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentData)
      });

      if (response.ok) {
        const detailedReport = await response.json();
        
        // Display comprehensive report summary
        alert(`✅ Assessment Rapport Succesvol Gegenereerd!\n\n` +
              `📋 ASSESSMENT DETAILS:\n` +
              `• Kandidaat: ${detailedReport.candidateName}\n` +
              `• Standaard: ${detailedReport.evcStandard}\n` +
              `• Assessor: ${detailedReport.assessorName}\n` +
              `• Duur: ${formatTime(detailedReport.duration)}\n` +
              `• Azure Vision: ${azureVisionEnabled ? '✅ Gebruikt' : '❌ Basic Mode'}\n\n` +
              `🎯 RESULTATEN:\n` +
              `• Overall Score: ${detailedReport.summary.overallScore}/10\n` +
              `• Competenties: ${detailedReport.summary.competenciesObserved}/${detailedReport.summary.totalCompetencies}\n` +
              `• Certificering: ${detailedReport.summary.recommendedForCertification ? '✅ Aanbevolen' : '❌ Niet aanbevolen'}\n\n` +
              `🔬 SUB-STAPPEN ANALYSE:\n` +
              `• Sub-stappen voltooid: ${assessmentData.summary.subStepsCompleted}/${assessmentData.summary.totalSubSteps}\n` +
              `• Kritieke stappen gemist: ${assessmentData.summary.criticalStepsMissed}\n` +
              `• Assessor verificaties: ${assessmentData.summary.assessorVerifications}\n` +
              `• Alerts gegenereerd: ${assessorAlerts.length}\n\n` +
              `📊 BEWIJS MATERIAAL:\n` +
              `• Video opnames: ${detailedReport.evidenceSummary.totalVideos}\n` +
              `• Foto's: ${detailedReport.evidenceSummary.totalPhotos}\n` +
              `• Notities: ${detailedReport.evidenceSummary.totalNotes}\n` +
              `• Vragen: ${detailedReport.evidenceSummary.totalQuestions}\n\n` +
              `🔍 OBJECT DETECTIE:\n` +
              `• Unieke objecten: ${detailedReport.objectDetectionSummary.uniqueObjectsDetected.length}\n` +
              `• Veiligheid score: ${detailedReport.objectDetectionSummary.safetyComplianceScore}/10\n` +
              `• Gereedschap score: ${detailedReport.objectDetectionSummary.toolUsageScore}/10\n` +
              `• Detectie betrouwbaarheid: ${(detailedReport.objectDetectionSummary.confidenceAverage * 100).toFixed(1)}%\n\n` +
              `💪 STERKE PUNTEN:\n${detailedReport.summary.keyStrengths.map((s: string) => `• ${s}`).join('\n')}\n\n` +
              `📈 VERBETERPUNTEN:\n${detailedReport.summary.areasForImprovement.map((a: string) => `• ${a}`).join('\n')}\n\n` +
              `📄 Rapport ID: ${detailedReport.reportId}\n` +
              `💾 Rapport is opgeslagen en klaar voor download.`);
        
        // Log detailed report for debugging
        console.log("Detailed Assessment Report:", detailedReport);
      } else {
        throw new Error(`API Error: ${response.status}`);
      }
      
    } catch (error) {
      console.error("Error generating report:", error);
      
      // Fallback to basic report
      const basicSummary = {
        totalObservations: observations.filter(obs => obs.observed).length,
        totalPhotos: activeAssessment.photos.length,
        totalNotes: activeAssessment.notes.length,
        totalQuestions: activeAssessment.questions.length,
        detectedObjects: [...new Set(activeAssessment.detectedObjects.flatMap(d => d.objects))],
        averageConfidence: observations.reduce((acc, obs) => acc + obs.confidence, 0) / observations.length
      };
      
      alert(`⚠️ Rapport Generatie - Fallback Modus\n\n` +
            `• Kandidaat: ${activeAssessment.candidateName}\n` +
            `• Duur: ${formatTime(elapsedTime)}\n` +
            `• Competenties geobserveerd: ${basicSummary.totalObservations}/${observations.length}\n` +
            `• Foto's: ${basicSummary.totalPhotos}\n` +
            `• Video opnames: ${activeAssessment.videoRecordings.length}\n` +
            `• Notities: ${basicSummary.totalNotes}\n` +
            `• Vragen gesteld: ${basicSummary.totalQuestions}\n` +
            `• Gedetecteerde objecten: ${basicSummary.detectedObjects.length}\n` +
            `• Gemiddelde betrouwbaarheid: ${(basicSummary.averageConfidence * 100).toFixed(1)}%\n\n` +
            `Basic rapport wordt lokaal opgeslagen...`);
    } finally {
      // Reset button
      const generateButton = document.querySelector('button[onClick*="generateAssessmentReport"]') as HTMLButtonElement;
      if (generateButton) {
        generateButton.disabled = false;
        generateButton.textContent = "Assessment Voltooien & Rapport Genereren";
      }
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "observation": return "bg-blue-100 text-blue-800";
      case "question": return "bg-purple-100 text-purple-800";
      case "comment": return "bg-green-100 text-green-800";
      case "concern": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Video Stream - Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Header with Timer and Video Controls */}
      <div className="glass-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md ${
              activeAssessment.isVideoRecording ? 'bg-red-600' : 'bg-blue-600'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Live Assessment</h1>
              <p className="text-gray-600">{activeAssessment.candidateName} - {activeAssessment.evcStandard}</p>
              {activeAssessment.isVideoRecording && (
                <p className="text-red-600 text-sm font-medium">🔴 Video opname actief</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Assessment Controls */}
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-600 font-medium">Assessment</div>
              <div className="flex gap-2">
                {assessmentStatus === "not_started" && (
                  <button
                    onClick={startAssessment}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Start Assessment
                  </button>
                )}
                {assessmentStatus === "active" && (
                  <button
                    onClick={pauseAssessment}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                  >
                    Pause Assessment
                  </button>
                )}
                {assessmentStatus === "paused" && (
                  <button
                    onClick={resumeAssessment}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Resume Assessment
                  </button>
                )}
                {(assessmentStatus === "active" || assessmentStatus === "paused") && (
                  <button
                    onClick={endAssessment}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    End Assessment
                  </button>
                )}
              </div>
              <div className="text-xs text-gray-500">
                Status: {
                  assessmentStatus === "not_started" ? "Niet gestart" :
                  assessmentStatus === "active" ? "Actief" :
                  assessmentStatus === "paused" ? "Gepauzeerd" :
                  "Beëindigd"
                }
              </div>
            </div>

            {/* Video Controls */}
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-600 font-medium">Video Opname</div>
              <div className="flex gap-2">
                {!activeAssessment.isVideoRecording ? (
                  <button
                    onClick={startVideoRecording}
                    disabled={assessmentStatus === "not_started" || assessmentStatus === "ended"}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Start Video
                  </button>
                ) : (
                  <button
                    onClick={stopVideoRecording}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Stop Video
                  </button>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {activeAssessment.isVideoRecording ? "🔴 Opname actief" : "⏹️ Gestopt"}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 font-mono">{formatTime(elapsedTime)}</div>
              <div className="text-sm text-gray-600 mt-1">
                {isTimerRunning ? "⏱️ Assessment loopt" : "⏸️ Assessment gepauzeerd"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large Video Feed */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Live Video Feed</h2>
          <div className="flex gap-2">
            <span className={`text-sm px-3 py-1 rounded-full ${activeAssessment.isVideoRecording ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
              {activeAssessment.isVideoRecording ? '🔴 Recording' : '⏸️ Stopped'}
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-600">
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>
        
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-80 lg:h-96 bg-black rounded-lg object-cover"
          />
          
          {/* Recording Indicator */}
          {activeAssessment.isVideoRecording && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              🔴 OPNAME
            </div>
          )}

          {/* Live Object Detection Text Overlay */}
          {objectDetectionText && (
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-3 py-2 rounded-lg max-w-xs">
              <div className="font-medium mb-1">🔍 Live Detectie:</div>
              <div>{objectDetectionText}</div>
            </div>
          )}

              
          {/* Action Buttons Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <button
              onClick={takeScreenshot}
              className="flex-1 bg-white/90 hover:bg-white text-gray-800 text-sm py-2 px-4 rounded-lg transition shadow-md"
            >
              📸 Screenshot
            </button>
            <button
              onClick={() => setShowQuestionDialog(true)}
              className="flex-1 bg-white/90 hover:bg-white text-gray-800 text-sm py-2 px-4 rounded-lg transition shadow-md"
            >
              ❓ Vraag Stellen
            </button>
          </div>
        </div>
        
        {/* Azure Vision Settings & Assessor Alerts */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">⚙️ AI Vision Settings</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  console.log("Manual detection test triggered");
                  const detectObjects = async () => {
                    if (videoRef.current && canvasRef.current) {
                      const canvas = canvasRef.current;
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        canvas.width = videoRef.current.videoWidth;
                        canvas.height = videoRef.current.videoHeight;
                        ctx.drawImage(videoRef.current, 0, 0);
                        
                        // Force simulation for testing
                        const simulatedDetections = simulateObjectDetection();
                        const confidence = Math.random() * 0.3 + 0.7;
                        const detection: DetectedObject = {
                          timestamp: elapsedTime,
                          objects: simulatedDetections,
                          confidence: confidence,
                          screenshot: canvas.toDataURL()
                        };
                        
                        setActiveAssessment(prev => ({
                          ...prev,
                          detectedObjects: [...prev.detectedObjects, detection]
                        }));
                        
                        setCurrentDetectedObjects(simulatedDetections);
                        setObjectDetectionText(
                          `[${formatTime(elapsedTime)}] Test Detectie: ${simulatedDetections.join(", ")} (${(confidence * 100).toFixed(0)}%)`
                        );
                        
                        updateCompetencyObservations(simulatedDetections);
                        console.log("Manual test detection completed", simulatedDetections);
                      }
                    }
                  };
                  detectObjects();
                }}
                className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                🧪 Test Detectie
              </button>
              <button
                onClick={() => setAzureVisionEnabled(!azureVisionEnabled)}
                className={`text-xs px-3 py-1 rounded-full transition ${
                  azureVisionEnabled 
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {azureVisionEnabled ? '✅ Azure Vision ON' : '❌ Basic Detection'}
              </button>
            </div>
          </div>
          
          {/* Assessor Alerts */}
          {assessorAlerts.length > 0 && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-yellow-800">🚨 Assessor Alerts</h4>
                <button
                  onClick={() => setAssessorAlerts([])}
                  className="text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
                >
                  Clear
                </button>
              </div>
              <div className="max-h-24 overflow-y-auto space-y-1">
                {assessorAlerts.slice(-3).map((alert, index) => (
                  <div key={index} className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded">
                    {alert}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Object Detection & Success Rate */}
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">🔍 Object & Situatie Detectie</h3>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeAssessment.isVideoRecording ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {activeAssessment.isVideoRecording ? '🔴 Detectie actief' : '⏸️ Gestopt'}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  azureVisionEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {azureVisionEnabled ? '🤖 Azure Vision' : '⚙️ Basic Mode'}
                </span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                  {activeAssessment.detectedObjects.length} detecties
                </span>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 min-h-32">
              {objectDetectionText ? (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-green-800">Laatste detectie:</div>
                  <div className="text-sm text-green-700">{objectDetectionText}</div>
                  {currentDetectedObjects.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs font-medium text-green-700 mb-1">Gedetecteerde objecten:</div>
                      <div className="flex flex-wrap gap-1">
                        {currentDetectedObjects.map((object, index) => (
                          <span key={index} className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            {object}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 text-sm italic">
                    {activeAssessment.isVideoRecording 
                      ? "Wacht op object detectie..." 
                      : "Start video opname voor object detectie"
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">📊 Succes Rate</h3>
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                {observations.filter(obs => obs.observed).length}/{observations.length} competenties
              </span>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 min-h-32">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-700">Overall Voortgang:</span>
                  <span className="text-lg font-bold text-purple-800">
                    {observations.length > 0 ? Math.round((observations.filter(obs => obs.observed).length / observations.length) * 100) : 0}%
                  </span>
                </div>
                
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ 
                      width: `${observations.length > 0 ? (observations.filter(obs => obs.observed).length / observations.length) * 100 : 0}%` 
                    }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="text-center p-2 bg-white rounded border">
                    <div className="font-medium text-gray-700">Bewijs Items</div>
                    <div className="text-lg font-bold text-blue-600">
                      {activeAssessment.photos.length + activeAssessment.videoRecordings.length + activeAssessment.notes.length}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border">
                    <div className="font-medium text-gray-700">Gem. Betrouwbaarheid</div>
                    <div className="text-lg font-bold text-green-600">
                      {observations.length > 0 ? Math.round(observations.reduce((acc, obs) => acc + obs.confidence, 0) / observations.length * 100) : 0}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Spraak Transcriptie */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">🎤 Live Spraak Transcriptie</h3>
            <div className="flex gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                speechRecognitionRef.current && assessmentStatus === "active" ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {speechRecognitionRef.current && assessmentStatus === "active" ? '🎤 Luistert' : '🎤 Inactief'}
              </span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                {liveTranscription.length} uitspraken
              </span>
              <button
                onClick={() => setLiveTranscription([])}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition"
                disabled={liveTranscription.length === 0}
              >
                Wissen
              </button>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-h-40 overflow-y-auto">
            {liveTranscription.length === 0 ? (
              <div className="flex items-center justify-center h-20">
                <p className="text-gray-500 text-sm italic">
                  {assessmentStatus === "active" 
                    ? "Luistert naar spraak..." 
                    : "Start assessment om spraakherkenning te activeren"
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {liveTranscription.map((text, index) => (
                  <div key={index} className="text-sm text-blue-800 border-l-2 border-blue-300 pl-3 py-1">
                    <span className="text-xs text-blue-600 mr-2">[{index + 1}]</span>
                    {text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Competency Observations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Competentie Observaties</h2>
            <div className="space-y-3">
              {observations.map((observation, index) => (
                <div key={index} className={`p-3 border rounded-lg ${
                  observation.observed ? 'border-green-300 bg-green-50' : 
                  observation.requiresAssessorVerification ? 'border-yellow-300 bg-yellow-50' :
                  'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedCompetencies);
                          if (newExpanded.has(observation.competency)) {
                            newExpanded.delete(observation.competency);
                          } else {
                            newExpanded.add(observation.competency);
                          }
                          setExpandedCompetencies(newExpanded);
                        }}
                        className="text-gray-400 hover:text-gray-600 transition"
                      >
                        {expandedCompetencies.has(observation.competency) ? '▼' : '▶'}
                      </button>
                      <span className="font-medium text-gray-900">{observation.competency}</span>
                      {observation.requiresAssessorVerification && (
                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                          ⚠️ Verificatie vereist
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        observation.evidenceType === 'visual' ? 'bg-blue-100 text-blue-800' :
                        observation.evidenceType === 'audio' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {observation.evidenceType === 'visual' ? 'Visueel' : 
                         observation.evidenceType === 'audio' ? 'Audio' : 'Geschreven'}
                      </span>
                      <span className="text-xs text-gray-600">
                        {(observation.confidence * 100).toFixed(0)}%
                      </span>
                      <button
                        onClick={() => setObservations(prev => 
                          prev.map((obs, i) => 
                            i === index ? { ...obs, observed: !obs.observed } : obs
                          )
                        )}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          observation.observed 
                            ? 'border-green-500 bg-green-500 text-white' 
                            : 'border-gray-300'
                        }`}
                      >
                        {observation.observed && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Sub-steps - shown when expanded */}
                  {expandedCompetencies.has(observation.competency) && observation.subSteps.length > 0 && (
                    <div className="mb-3 bg-white border border-gray-100 rounded p-3">
                      <div className="text-xs font-medium text-gray-700 mb-2">
                        🔍 Gedetecteerde Sub-stappen ({observation.subSteps.filter(s => s.detected).length}/{observation.subSteps.length})
                      </div>
                      <div className="space-y-2">
                        {observation.subSteps.map((subStep, subIndex) => (
                          <div key={subIndex} className={`flex items-center justify-between p-2 rounded text-xs ${
                            subStep.detected ? 
                              (subStep.criticality === 'high' ? 'bg-green-100 border-green-200' : 'bg-blue-100 border-blue-200') :
                              (subStep.criticality === 'high' ? 'bg-red-100 border-red-200' : 'bg-gray-100 border-gray-200')
                          } border`}>
                            <div className="flex items-center gap-2">
                              <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                subStep.detected ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'
                              }`}>
                                {subStep.detected && '✓'}
                              </span>
                              <span className={subStep.detected ? 'text-gray-900' : 'text-gray-500'}>
                                {subStep.step}
                              </span>
                              <span className={`px-1 py-0.5 rounded text-xs ${
                                subStep.criticality === 'high' ? 'bg-red-100 text-red-600' :
                                subStep.criticality === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {subStep.criticality === 'high' ? 'Kritiek' : 
                                 subStep.criticality === 'medium' ? 'Belangrijk' : 'Basis'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {subStep.confidence > 0 && (
                                <span className="text-gray-600">
                                  {(subStep.confidence * 100).toFixed(0)}%
                                </span>
                              )}
                              {subStep.detected && subStep.timestamp && (
                                <span className="text-gray-500">
                                  {formatTime(subStep.timestamp)}
                                </span>
                              )}
                              <button
                                onClick={() => {
                                  setObservations(prev => prev.map((obs, obsIndex) => {
                                    if (obsIndex === index) {
                                      const updatedSubSteps = obs.subSteps.map((step, stepIndex) => 
                                        stepIndex === subIndex 
                                          ? { ...step, assessorVerified: !step.assessorVerified }
                                          : step
                                      );
                                      return { ...obs, subSteps: updatedSubSteps };
                                    }
                                    return obs;
                                  }));
                                }}
                                className={`text-xs px-2 py-1 rounded ${
                                  subStep.assessorVerified 
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                title="Assessor verificatie"
                              >
                                {subStep.assessorVerified ? '👍 OK' : '👁️ Check'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <textarea
                    value={observation.notes}
                    onChange={(e) => setObservations(prev => 
                      prev.map((obs, i) => 
                        i === index ? { ...obs, notes: e.target.value } : obs
                      )
                    )}
                    placeholder="Notities en observaties..."
                    className="w-full text-sm border border-gray-200 rounded p-2 resize-none"
                    rows={2}
                  />
                  {observation.timestamp && (
                    <div className="text-xs text-gray-500 mt-1">
                      Geobserveerd op: {formatTime(observation.timestamp)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Task */}
          <div className="glass-card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Huidige Taak</h2>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-medium text-blue-900">{activeAssessment.currentTask}</h3>
              <p className="text-sm text-blue-700 mt-1">
                Focus op systematische aanpak, veiligheid en kwaliteit van uitvoering
              </p>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Taak wijzigen</label>
              <select 
                value={activeAssessment.currentTask}
                onChange={(e) => setActiveAssessment(prev => ({ ...prev, currentTask: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Remmen controle en beoordeling</option>
                <option>Motordiagnose uitvoeren</option>
                <option>Verlichting systeem controleren</option>
                <option>Uitlaatgassen meting</option>
                <option>Ophanging en besturing controle</option>
                <option>APK eindcontrole</option>
              </select>
            </div>
          </div>
        </div>

        {/* Evidence Capture */}
        <div className="space-y-6">
          {/* Quick Notes */}
          <div className="glass-card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Notities & Acties</h2>
            <div className="space-y-3">
              <select
                value={noteCategory}
                onChange={(e) => setNoteCategory(e.target.value as AssessmentNote["category"])}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              >
                <option value="observation">Observatie</option>
                <option value="question">Vraag</option>
                <option value="comment">Commentaar</option>
                <option value="concern">Zorgpunt</option>
              </select>
              
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Voeg notitie toe..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none"
                rows={3}
              />
              
              <button
                onClick={addNote}
                disabled={!currentNote.trim()}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300"
              >
                Notitie Toevoegen
              </button>
            </div>

            {/* Recent Notes */}
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Recente Notities</h3>
              {activeAssessment.notes.slice(-3).map((note) => (
                <div key={note.id} className="p-2 bg-gray-50 rounded text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${getCategoryColor(note.category)}`}>
                      {note.category}
                    </span>
                    <span className="text-gray-500 text-xs">{formatTime(note.timestamp)}</span>
                  </div>
                  <p>{note.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Summary */}
          <div className="glass-card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Bewijs Overzicht</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Video opnames:</span>
                <span className="font-medium">{activeAssessment.videoRecordings.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Screenshots:</span>
                <span className="font-medium">{activeAssessment.photos.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Notities:</span>
                <span className="font-medium">{activeAssessment.notes.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Vragen gesteld:</span>
                <span className="font-medium">{activeAssessment.questions.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Object detecties:</span>
                <span className="font-medium">{activeAssessment.detectedObjects.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Competenties geobserveerd:</span>
                <span className="font-medium text-green-600">
                  {observations.filter(obs => obs.observed).length}/{observations.length}
                </span>
              </div>
            </div>
            
            <button
              onClick={generateAssessmentReport}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Assessment Voltooien & Rapport Genereren
            </button>
          </div>

          {/* Camera Capture */}
          <div className="glass-card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Camera Opties</h2>
            <div className="space-y-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Foto Uploaden
              </button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoCapture}
              className="hidden"
              capture="environment"
            />
          </div>
        </div>
      </div>

      {/* Question Dialog */}
      {showQuestionDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Vraag Stellen</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
                <select
                  value={questionCategory}
                  onChange={(e) => setQuestionCategory(e.target.value as AssessmentQuestion["category"])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="technical">Technisch</option>
                  <option value="safety">Veiligheid</option>
                  <option value="process">Proces</option>
                  <option value="knowledge">Kennis</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Belangrijkheid</label>
                <select
                  value={questionImportance}
                  onChange={(e) => setQuestionImportance(e.target.value as AssessmentQuestion["importance"])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="low">Laag</option>
                  <option value="medium">Gemiddeld</option>
                  <option value="high">Hoog</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vraag</label>
                <textarea
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Stel uw vraag..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowQuestionDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Annuleren
              </button>
              <button
                onClick={addQuestion}
                disabled={!currentQuestion.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300"
              >
                Vraag Toevoegen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}