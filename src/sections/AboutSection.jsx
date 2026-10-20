import { Code2, Server, Database, Layers } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { profile, aboutHighlights } from '@/data/profile';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const interests = [
  { icon: Code2, label: 'Frontend Development', desc: 'Responsive, accessible interfaces with React' },
  { icon: Server, label: 'Backend Development', desc: 'REST APIs and server-side logic with Node.js' },
  { icon: Database, label: 'Database Management', desc: 'SQL and NoSQL databases for efficient storage' },
  { icon: Layers, label: 'Problem Solving', desc: 'Continuously learning and building practical solutions' },
];

export function AboutSection() {
  const { ref: contentRef, visible: contentVisible } = useScrollReveal();
  const { ref: visualRef, visible: visualVisible } = useScrollReveal({ rootMargin: '0px 0px -80px 0px' });

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/3 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ background: 'var(--orb-3)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Me"
          title="Who I Am"
          subtitle="Get to know the developer behind the code."
          icon={Code2}
        />

        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Visual — organic shape, not a card */}
          <div ref={visualRef} className={`reveal-left ${visualVisible ? 'reveal-visible' : ''} lg:col-span-2`}>
            <div className="relative mx-auto max-w-sm">
              {/* Soft gradient glow behind */}
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent-primary to-accent-secondary opacity-15 blur-2xl" />
              <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent-soft to-transparent">
                {profile.aboutImage ? (
                  <img
                    src={profile.aboutImage}
                    alt={`${profile.name} working`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-fg-tertiary">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft">
                      <Code2 className="h-8 w-8 text-accent-primary" />
                    </div>
                    <p className="text-sm">
                      Add a professional photo or workspace image in
                      <br />
                      <code className="text-xs">src/data/profile.js</code>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content — open editorial layout, no cards */}
          <div ref={contentRef} className={`reveal ${contentVisible ? 'reveal-visible' : ''} lg:col-span-3`}>
            <div className="space-y-4">
              {profile.about.split('\n\n').map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-fg-secondary text-balance">
                  {para}
                </p>
              ))}
            </div>

            {/* Interests — inline with icons, no boxes */}
            <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {interests.map((item, idx) => (
                <div
                  key={item.label}
                  className="group flex items-start gap-3"
                  style={{
                    transitionDelay: contentVisible ? `${idx * 80}ms` : '0ms',
                  }}
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-primary transition-transform group-hover:scale-110">
                    <item.icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-fg-primary">{item.label}</p>
                    <p className="text-xs text-fg-tertiary text-balance">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights — stat row with dividers, no boxes */}
            <div className="mt-10 flex items-stretch gap-4 sm:gap-8">
              {aboutHighlights.map((h, idx) => (
                <div
                  key={h.label}
                  className={`flex flex-col ${idx < aboutHighlights.length - 1 ? 'border-r border-border-primary pr-4 sm:pr-8' : ''}`}
                >
                  <p className="text-3xl font-extrabold gradient-text">{h.value}</p>
                  <p className="mt-1 text-xs text-fg-tertiary">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
