import { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, MessageSquare, ArrowUpRight, Copy, Check, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { ContactForm } from '@/components/ContactForm';
import { profile } from '@/data/profile';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function ContactSection() {
  const { ref, visible } = useScrollReveal();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/3 bottom-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'var(--orb-3)' }}
        />
        <div
          className="absolute right-1/4 top-1/4 h-72 w-72 rounded-full opacity-15 blur-3xl"
          style={{ background: 'var(--orb-1)' }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Initiate Conversation"
          title="Get In Touch"
          subtitle="Have a full-stack opportunity, collaboration proposal, or technical question? My inbox is always open."
          icon={MessageSquare}
        />

        <div
          ref={ref}
          className={`reveal ${
            visible ? 'reveal-visible' : ''
          } grid gap-10 lg:grid-cols-12 lg:gap-12`}
        >
          {/* Left Column: Direct Contact Channels & Availability (5 Cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-primary/30 bg-accent-soft px-3 py-1 text-xs font-bold text-accent-primary mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Open for Full-Time Roles &amp; Collaborations</span>
              </div>

              <h3 className="font-display text-2xl font-bold tracking-tight text-fg-primary sm:text-3xl">
                Let's discuss how I can add value to your engineering team.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
                Whether you're looking for a dedicated Full-Stack MERN Developer, a responsive frontend engineer, or an eager problem solver ready to tackle real-world software challenges, let's connect.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-3">
              {/* Direct Email Card */}
              <div className="bento-card group flex items-center justify-between p-4 transition-all hover:border-accent-primary/60">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3.5 flex-1 min-w-0"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-primary transition-transform group-hover:scale-105">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-fg-tertiary">
                      Direct Email
                    </p>
                    <p className="truncate text-sm font-semibold text-fg-primary group-hover:text-accent-primary transition-colors">
                      {profile.email}
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={copyEmail}
                    title="Copy Email"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-fg-tertiary hover:bg-bg-tertiary hover:text-accent-primary transition-colors"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-fg-tertiary hover:text-accent-primary transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* LinkedIn Network Card */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card group flex items-center justify-between p-4 transition-all hover:border-accent-primary/60"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent-primary transition-transform group-hover:scale-105">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-fg-tertiary">
                      Professional Profile
                    </p>
                    <p className="text-sm font-semibold text-fg-primary group-hover:text-accent-primary transition-colors">
                      LinkedIn Network
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-fg-tertiary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-primary" />
              </a>

              {/* GitHub Profile Card */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card group flex items-center justify-between p-4 transition-all hover:border-accent-primary/60"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent-primary transition-transform group-hover:scale-105">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-fg-tertiary">
                      Source Repositories
                    </p>
                    <p className="text-sm font-semibold text-fg-primary group-hover:text-accent-primary transition-colors">
                      GitHub Profile
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-fg-tertiary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-primary" />
              </a>

              {/* Location Card */}
              <div className="bento-card flex items-center gap-3.5 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-fg-tertiary">
                    Location &amp; Timezone
                  </p>
                  <p className="text-sm font-semibold text-fg-primary">
                    {profile.location} • IST (UTC+5:30)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

