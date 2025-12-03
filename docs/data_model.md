# SkillVal Data Model (MongoDB)

Alle collections bevatten `tenantId` voor multi-tenant isolatie en `createdAt`/`updatedAt` timestamps.

## users
- `_id`
- `tenantId`
- `email`
- `passwordHash`
- `firstName`
- `lastName`
- `roles` (array: `admin`, `coach`, `assessor`, `candidate`, `employer`)
- `status` (`active`, `invited`, `disabled`)
- `lastLoginAt`
- `avatarUrl`
- `aiUsagePreferences` (bv. consent flags)

## candidates
- `_id`
- `tenantId`
- `userId` (ref users)
- `trajectId`
- `currentPhase` (enum 1..7)
- `phaseHistory` (array: `{ phase, status, updatedBy, timestamp }`)
- `indicatorCoverage` (array per deskundigheidsgebied `{ competencyId, coveragePercent, indicatorsMet: [indicatorId] }`)
- `portfolioStatusBadge` (green/orange/red)
- `aiAssistUsage` (`percentage`, `lastInteractionAt`)
- `riskScore` (fraude-indicatie)
- `supportingCoachIds`
- `assignedAssessorIds`

## trajects
- `_id`
- `tenantId`
- `name`
- `type` (`autotech`, `youthcare`)
- `description`
- `competencyAreas` (`[{ competencyId, name, indicatorIds }]`)
- `requiredCoveragePercent` (default 80)
- `status`
- `timeline` (`[{ phase, startedAt, completedAt }]`)
- `metadata` (flex veld)

## indicators
- `_id`
- `tenantId`
- `competencyId`
- `code` (bv. `SKJ-1.3`)
- `title`
- `description`
- `evidenceHints`
- `fraudSignals` (patterns to watch)
- `vectorEmbedding` (Array[float] - via Atlas Vector Search)

## evidenceItems
- `_id`
- `tenantId`
- `candidateId`
- `uploaderId`
- `trajectId`
- `type` (`text`, `pdf`, `audio`, `video`, `image`)
- `blobUrl` (Azure Blob/MinIO)
- `checksum`
- `status` (`uploaded`, `processing`, `ready`, `flagged`)
- `extractedText`
- `transcript` (for audio/video)
- `indicatorMatches` (`[{ indicatorId, confidence }]`)
- `aiGeneratedLikelihood` (`low`, `medium`, `high`)
- `fraudFlags` (`[{ type, score, details }]`)
- `employerValidation` (`{ employerId, status, comments, validatedAt }`)
- `aiAssistAnnotations` (`[{ prompt, response, timestamp }]`)

## assessments
- `_id`
- `tenantId`
- `candidateId`
- `assessorId`
- `trajectId`
- `scheduledAt`
- `completedAt`
- `liveSessionId`
- `observations` (`[{ indicatorId, note, mediaIds, score }]`)
- `sessionMedia` (`[{ mediaId, type, blobUrl }]`)
- `aiDraftReportId`
- `verdict` (`meets`, `partial`, `insufficient`)
- `comments`

## reports
- `_id`
- `tenantId`
- `candidateId`
- `trajectId`
- `assessmentId`
- `type` (`draft`, `final`)
- `indicatorSummary` (`[{ indicatorId, status, evidenceItemIds }]`)
- `competencyCoverage` (`[{ competencyId, coveragePercent, notes }]`)
- `generatedByAI` (bool)
- `finalizedBy`
- `finalizedAt`
- `blobUrl` (PDF)
- `jsonPayload` (structured export)

## auditLogs
- `_id`
- `tenantId`
- `actorId`
- `actorRoles`
- `action` (`CREATE_EVIDENCE`, `VIEW_PORTFOLIO`, etc.)
- `resourceType`
- `resourceId`
- `metadata`
- `aiAssist` (bool)
- `ipAddress`
- `userAgent`
- `createdAt`
