import { useState, useEffect } from 'react';
import { Download, ArrowDown, Github, Linkedin, Mail, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { profile, aboutHighlights } from '@/data/profile';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

const roles = ['Full-Stack Developer', 'React Developer', 'Backend Developer', 'Problem Solver'];

const techStack = [
  { name: 'React', color: '#61dafb' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Python', color: '#3776ab' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Database', color: '#336791' },
];

const codeLines = [
  { text: 'const developer = {', indent: 0 },
  { text: "name: 'Chaitanya Hivraj Gomaskar',", indent: 1, color: true },
  { text: "role: 'Full-Stack Developer',", indent: 1, color: true },
  { text: 'skills: [', indent: 1 },
  { text: "'React', 'Node.js', 'Python',", indent: 2, color: true },
  { text: "'Tailwind CSS', 'Javascript','NodeJS', ", indent: 2, color: true },
  { text: "'MongoDB', 'ExpressJS','SQL'", indent: 3, color: true },
  { text: '],', indent: 1 },
  { text: 'available: true,', indent: 1, color: true },
  { text: '}', indent: 0 },
];

export function HeroSection() {
  const typedRole = useTypingAnimation(roles, { typeSpeed: 90, deleteSpeed: 45, pauseDuration: 1800 });
  const [codeVisible, setCodeVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCodeVisible(true);
      return;
    }
    const timer = setTimeout(() => setCodeVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResume = () => {
    if (profile.resumeAvailable) {
      const link = document.createElement('a');
      link.href = profile.resumePath;
      link.download = 'Full-Stack-Developer-Resume.pdf';
      link.click();
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="orb-float absolute left-[10%] top-[15%] h-80 w-80 rounded-full opacity-70 blur-3xl" style={{ background: 'var(--orb-1)' }} />
        <div className="orb-float-slow absolute right-[15%] bottom-[20%] h-72 w-72 rounded-full opacity-60 blur-3xl" style={{ background: 'var(--orb-2)' }} />
        <div className="orb-float-delayed absolute left-[45%] top-[60%] h-64 w-64 rounded-full opacity-50 blur-3xl" style={{ background: 'var(--orb-3)' }} />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg-primary) 80%)',
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:px-8">
        {/* Text content */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-bg-secondary/80 glass px-4 py-2 text-sm font-medium text-fg-secondary shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {profile.availability}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] text-fg-primary sm:text-5xl lg:text-[3.5rem] text-balance">
            Hi, I'm <span className="gradient-text">{profile.name}</span>
          </h1>

          {/* Typing animation */}
          <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
            <Sparkles className="h-5 w-5 text-accent-secondary" />
            <p className="typing-cursor text-xl font-semibold text-accent-primary sm:text-2xl">
              {typedRole}
            </p>
          </div>

          <p className="mt-4 text-lg font-medium text-fg-tertiary text-balance">
            {profile.headline}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-fg-secondary text-balance lg:mx-0">
            {profile.introduction}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              onClick={() => scrollTo('projects')}
              className="group btn-lift flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-glow"
            >
              Explore My Projects
              <ArrowRight className="h-4 w-4 arrow-hover" />
            </button>
            <button
              onClick={handleResume}
              disabled={!profile.resumeAvailable}
              title={
                profile.resumeAvailable
                  ? 'Download Resume'
                  : 'Add your resume PDF at public/resume.pdf to enable download'
              }
              className="group btn-lift flex items-center gap-2 rounded-xl border border-border-primary bg-bg-secondary/60 px-6 py-3 text-sm font-semibold text-fg-primary backdrop-blur-sm transition-all hover:border-accent-primary hover:text-accent-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </button>
          </div>

          {/* Socials */}
          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary transition-all hover:-translate-y-1 hover:border-accent-primary hover:text-accent-primary hover:shadow-md"
            >
              <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary transition-all hover:-translate-y-1 hover:border-accent-primary hover:text-accent-primary hover:shadow-md"
            >
              <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send email"
              className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary transition-all hover:-translate-y-1 hover:border-accent-primary hover:text-accent-primary hover:shadow-md"
            >
              <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
            <span className="ml-2 flex items-center gap-1.5 text-sm text-fg-tertiary">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </span>
          </div>

          {/* Tech stack preview */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-fg-tertiary">Tech Stack:</span>
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-fg-secondary transition-all hover:text-accent-primary"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Visual: profile + code panel */}
        <div className="order-1 flex flex-col items-center gap-6 lg:order-2">
          {/* Profile image with animated gradient border */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-primary to-accent-secondary opacity-25 blur-2xl" />
            <div className="gradient-border relative flex h-56 w-56 items-center justify-center rounded-3xl shadow-lg sm:h-72 sm:w-72">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="h-full w-full rounded-3xl object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-fg-tertiary">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft text-3xl font-bold text-accent-primary">
                    {profile.name.charAt(0).toUpperCase() === 'Y' ? '?' : profile.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-center text-xs">Add your photo in<br />src/data/profile.js</p>
                </div>
              )}
            </div>
            {/* Floating highlight chips */}
            <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-border-primary bg-bg-secondary px-4 py-2 shadow-md sm:block">
              <p className="text-xs text-fg-tertiary">{aboutHighlights[0]?.label}</p>
              <p className="text-lg font-bold gradient-text">{aboutHighlights[0]?.value}</p>
            </div>
            <div className="absolute -right-4 -top-4 hidden rounded-xl border border-border-primary bg-bg-secondary px-4 py-2 shadow-md sm:block">
              <p className="text-xs text-fg-tertiary">{aboutHighlights[1]?.label}</p>
              <p className="text-lg font-bold text-accent-secondary">{aboutHighlights[1]?.value}</p>
            </div>
          </div>

          {/* Code panel */}
          <div className="hidden w-full max-w-sm overflow-hidden rounded-2xl border border-border-primary bg-bg-elevated shadow-md lg:block">
            <div className="flex items-center gap-2 border-b border-border-primary px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
              <span className="ml-2 font-mono text-xs text-fg-tertiary">developer.js</span>
            </div>
            <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
              <code className="font-mono">
                {codeLines.map((line, i) => (
                  <div
                    key={i}
                    className="transition-opacity duration-300"
                    style={{
                      opacity: codeVisible ? 1 : 0,
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    <span className="select-none text-fg-tertiary/50">
                      {String(i + 1).padStart(2, '0')}{' '}
                    </span>
                    <span className={line.color ? 'text-accent-secondary' : 'text-fg-secondary'}>
                      {' '.repeat(line.indent * 2)}{line.text}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => scrollTo('about')}
        aria-label="Scroll to about section"
        className="scroll-hint absolute bottom-6 left-1/2 -translate-x-1/2 text-fg-tertiary transition-colors hover:text-accent-primary"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </section>
  );
}
