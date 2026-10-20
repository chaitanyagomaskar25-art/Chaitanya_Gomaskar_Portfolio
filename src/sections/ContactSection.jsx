import { Mail, Github, Linkedin, MapPin, MessageSquare, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { ContactForm } from '@/components/ContactForm';
import { profile } from '@/data/profile';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function ContactSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 bottom-1/4 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--orb-3)' }} />
        <div className="absolute right-1/3 top-1/4 h-64 w-64 rounded-full opacity-15 blur-3xl" style={{ background: 'var(--orb-1)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          subtitle="Have a project or opportunity in mind? I'd love to hear from you."
          icon={MessageSquare}
        />

        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''} grid gap-12 lg:grid-cols-2`}>
          {/* Info — open layout, no card wrapper */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-primary">
                <MessageSquare className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-fg-primary">
                Let's work together
              </h3>
              <p className="mt-3 text-fg-secondary text-balance">
                Whether you have a question, a project idea, or just want to connect,
                feel free to reach out. I'll get back to you as soon as possible.
              </p>
            </div>

            {/* Contact items — dividers instead of boxes */}
            <div className="divide-y divide-border-primary">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 py-4 first:pt-0 transition-colors hover:text-accent-primary"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-xs text-fg-tertiary">Email</p>
                  <p className="text-sm font-medium text-fg-primary group-hover:text-accent-primary">{profile.email}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-fg-tertiary opacity-0 transition-opacity group-hover:opacity-100" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-4 transition-colors"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-primary">
                  <Linkedin className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-xs text-fg-tertiary">LinkedIn</p>
                  <p className="text-sm font-medium text-fg-primary group-hover:text-accent-primary">Connect with me</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-fg-tertiary opacity-0 transition-opacity group-hover:opacity-100" />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-4 transition-colors"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-primary">
                  <Github className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-xs text-fg-tertiary">GitHub</p>
                  <p className="text-sm font-medium text-fg-primary group-hover:text-accent-primary">View my code</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-fg-tertiary opacity-0 transition-opacity group-hover:opacity-100" />
              </a>

              <div className="flex items-center gap-4 py-4 last:pb-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-fg-tertiary">Location</p>
                  <p className="text-sm font-medium text-fg-primary">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form — keep in a soft container since it's a form */}
          <div className="rounded-2xl border border-border-primary bg-bg-secondary/50 p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
