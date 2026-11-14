import { useState } from 'react';
import { ArrowRight, Mail, Github, Linkedin, MapPin, Sparkles, Code2, Database, Server, Layers, ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import chaitanyaPhoto from '@/assets/chaitanya.webp';

const roles = [
  'Full-Stack Developer',
  'MERN Stack Engineer',
  'REST API Specialist',
  'React & Node.js Builder'
];

const coreTechs = [
  { name: 'React', color: '#38bdf8' },
  { name: 'Node.js', color: '#22c55e' },
  { name: 'Express', color: '#f59e0b' },
  { name: 'MongoDB', color: '#10b981' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Tailwind CSS', color: '#06b6d4' },
];

export function HeroSection() {
  const typedRole = useTypingAnimation(roles, { typeSpeed: 65, deleteSpeed: 30, pauseDuration: 1900 });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      {/* Subtle Ambient Glow and Minimal Background Mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-75" />
        <div
          className="ambient-orb absolute left-[10%] top-[8%] h-[34rem] w-[34rem] rounded-full opacity-60 blur-3xl transition-opacity duration-1000"
          style={{ background: 'var(--orb-1)' }}
        />
        <div
          className="ambient-orb-reverse absolute right-[8%] bottom-[10%] h-[30rem] w-[30rem] rounded-full opacity-50 blur-3xl transition-opacity duration-1000"
          style={{ background: 'var(--orb-2)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg-primary) 85%)',
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-14">
          
          {/* Left Column: Authoritative Editorial Presentation */}
          <div className="flex flex-col text-center lg:text-left">
            
            {/* Availability Indicator */}
            {profile.availability && (
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border-primary/80 bg-bg-secondary/80 px-3.5 py-1.5 text-xs font-semibold text-fg-secondary backdrop-blur-md shadow-sm self-center lg:self-start">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>{profile.availability}</span>
              </div>
            )}

            {/* Main Headline */}
            <h1 className="font-display mt-5 text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-fg-primary leading-[1.08] text-balance">
              Building digital experiences that <span className="gradient-accent-text">solve real problems.</span>
            </h1>

            {/* Name & Dynamic Typing Role */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-lg sm:text-2xl font-bold lg:justify-start">
              <span className="text-fg-primary">
                Hi, I'm <span className="gradient-accent-text">{profile.name}</span>
              </span>
              <span className="text-fg-tertiary font-normal hidden sm:inline">—</span>
              <span className="typing-cursor text-accent-primary font-bold">
                {typedRole}
              </span>
            </div>

            {/* Short Professional Introduction */}
            <p className="mx-auto mt-5 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-fg-secondary text-balance lg:mx-0">
              {profile.introduction}
            </p>

            {/* Two Primary Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
              <button
                onClick={() => scrollTo('projects')}
                className="btn-primary group flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold shadow-lg"
              >
                <span>View My Work</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="btn-secondary group flex items-center gap-2 px-5 py-3.5 text-sm font-semibold"
              >
                <Mail className="h-4 w-4 text-fg-secondary transition-colors group-hover:text-accent-primary" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Coordinates & Location Pill */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-border-primary/60 pt-6 lg:justify-start">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-primary hover:text-accent-primary"
                >
                  <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-primary hover:text-accent-primary"
                >
                  <Linkedin className="h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Send Direct Email"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-primary hover:text-accent-primary"
                >
                  <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              )}

              {profile.location && (
                <span className="flex items-center gap-1.5 rounded-xl border border-border-primary/70 bg-bg-secondary/60 px-3 py-2 text-xs font-medium text-fg-tertiary">
                  <MapPin className="h-3.5 w-3.5 text-accent-primary shrink-0" />
                  <span>{profile.location}</span>
                </span>
              )}
            </div>

            {/* Small Refined Technology Stack Preview */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="text-[11px] font-bold uppercase tracking-wider text-fg-tertiary mr-1">
                Core Stack:
              </span>
              {coreTechs.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border-primary/60 bg-bg-secondary/70 px-2.5 py-1 text-xs font-semibold text-fg-secondary shadow-sm"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>

          </div>

          {/* Right Column: Beautiful Profile Presentation with Balanced Framing */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Subtle Ambient Radial Backlight */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent-primary/20 via-accent-secondary/20 to-sky-500/20 opacity-70 blur-2xl transition-all duration-700 pointer-events-none" />

              {/* Main Card Frame */}
              <div className="bento-card relative overflow-hidden p-3.5 shadow-xl">
                
                {/* Photo Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-bg-tertiary">
                  <img
                    src={chaitanyaPhoto || profile.profileImage}
                    alt={profile.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Photo Caption Pill */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between rounded-xl border border-white/20 bg-black/60 px-3.5 py-2 backdrop-blur-md">
                    <div>
                      <p className="text-xs font-bold text-white">{profile.name}</p>
                      <p className="text-[10px] text-slate-300 font-medium">{profile.role}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  </div>
                </div>

                {/* Subtle Floating Badges */}
                <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl border border-border-primary/80 bg-bg-tertiary/40 p-2.5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-fg-tertiary">Portfolio</p>
                    <p className="font-display text-sm font-extrabold text-fg-primary">10+ Projects</p>
                  </div>
                  <div className="rounded-xl border border-border-primary/80 bg-bg-tertiary/40 p-2.5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-fg-tertiary">Specialization</p>
                    <p className="font-display text-sm font-extrabold text-accent-primary">MERN Stack</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
