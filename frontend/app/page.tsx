import Link from "next/link";
import Image from "next/image";

// Landing page voor SkillVal
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-skillval-ocean/10 via-skillval-forest/10 to-skillval-warm/10">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <Image
            src="/logo-skillval.png"
            alt="SkillVal"
            width={200}
            height={67}
            className="w-auto h-16"
          />
          <nav className="flex gap-6">
            <Link
              href="/dashboard/candidate"
              className="px-6 py-3 bg-gradient-to-r from-skillval-warm to-skillval-bright hover:from-skillval-bright hover:to-skillval-warm/90 text-white font-bold rounded-xl shadow-lg shadow-skillval-warm/30 transition"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-skillval-ocean mb-6">
              Valideer je vaardigheden met <span className="text-skillval-warm">SkillVal</span>
            </h1>
            <p className="text-xl text-skillval-forest/80 mb-8">
              Digitale EVC-trajecten met AI-ondersteuning voor autotechniek en jeugdzorg.
              Bouw je portfolio en behaal je erkenning.
            </p>
            <div className="flex gap-4">
              <Link
                href="/dashboard/candidate"
                className="px-8 py-4 bg-skillval-warm hover:bg-skillval-bright text-white font-bold rounded-xl shadow-xl shadow-skillval-warm/35 transition text-lg"
              >
                Start Nu
              </Link>
              <Link
                href="/dashboard/upload"
                className="px-8 py-4 bg-white hover:bg-skillval-cream text-skillval-ocean font-bold rounded-xl shadow-lg shadow-skillval-ocean/10 border-2 border-skillval-ocean/30 transition text-lg"
              >
                Upload Bewijs
              </Link>
            </div>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/hero-professional-1.jpg"
              alt="Professional working"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-skillval-ocean mb-12">
          Waarom SkillVal?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border-t-4 border-skillval-warm">
            <div className="relative mb-6">
              <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                <Image
                  src="/education-learning.jpg"
                  alt="Education"
                  width={400}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 bg-skillval-warm rounded-xl flex items-center justify-center absolute -bottom-2 left-4 shadow-lg shadow-skillval-warm/35">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-skillval-ocean mb-3">EVC-Erkenning</h3>
            <p className="text-skillval-ocean/70">
              Behaal officiële erkenning voor je werkervaring en vaardigheden
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border-t-4 border-skillval-bright">
            <div className="relative mb-6">
              <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                <Image
                  src="/discussion-group.jpg"
                  alt="Discussion"
                  width={400}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 bg-skillval-bright rounded-xl flex items-center justify-center absolute -bottom-2 left-4 shadow-lg shadow-skillval-bright/35">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-skillval-ocean mb-3">AI-Ondersteuning</h3>
            <p className="text-skillval-ocean/70">
              Intelligente hulp bij het documenteren en analyseren van je competenties
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border-t-4 border-skillval-gold">
            <div className="relative mb-6">
              <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                <Image
                  src="/teamwork-success.jpg"
                  alt="Teamwork"
                  width={400}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 bg-skillval-gold rounded-xl flex items-center justify-center absolute -bottom-2 left-4 shadow-lg shadow-skillval-gold/35">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-skillval-ocean mb-3">Portfolio Beheer</h3>
            <p className="text-skillval-ocean/70">
              Organiseer al je bewijsstukken op één centrale plek
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section with Images */}
      <section className="container mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-skillval-ocean to-skillval-warm shadow-2xl shadow-skillval-ocean/40">
          <div className="absolute inset-0 opacity-25">
            <div className="grid grid-cols-4 h-full">
              <div className="relative h-full">
                <Image
                  src="/team-collaboration.jpg"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-full">
                <Image
                  src="/students-working.jpg"
                  alt="Students working"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-full">
                <Image
                  src="/mentor-support.jpg"
                  alt="Mentor support"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-full">
                <Image
                  src="/professional-woman.jpg"
                  alt="Professional woman"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="relative p-16 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Klaar om te beginnen?</h2>
            <p className="text-xl text-white/80 mb-8">
              Start vandaag nog met het opbouwen van je professionele portfolio
            </p>
            <Link
              href="/dashboard/candidate"
              className="inline-block px-10 py-4 bg-white text-skillval-warm font-bold rounded-xl shadow-xl shadow-skillval-warm/30 hover:bg-skillval-cream transition text-lg"
            >
              Ga naar Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center text-skillval-ocean/70">
        <p>&copy; 2024 SkillVal - Validation of Skills</p>
      </footer>
    </div>
  );
}
