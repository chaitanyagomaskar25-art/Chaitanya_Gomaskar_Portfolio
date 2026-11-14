import { Code2, Server, Database, Layers, CheckCircle2, ShieldCheck, Zap, Laptop } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { profile, aboutHighlights } from '@/data/profile';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const engineeringPillars = [
  {
    icon: Laptop,
    title: 'Frontend Engineering',
    description: 'Developing reactive, accessible, component-driven user interfaces in React with Tailwind CSS.',
  },
  {
    icon: Server,
    title: 'Backend & REST APIs',
    description: 'Architecting modular Express.js servers, secure JWT auth flows, and robust microservices.',
  },
  {
    icon: Database,
    title: 'Database Architecture',
    description: 'Schema modeling with Mongoose, indexing, NoSQL data storage, and structured query handling.',
  },
  {
    icon: Zap,
    title: 'Performance & Problem Solving',
    description: 'Optimizing algorithmic efficiency, network latencies, responsive layouts, and cross-browser resilience.',
  },
];

export function AboutSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: 'var(--orb-3)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Background & Philosophy"
          title="About Me"
          subtitle="A passionate full-stack developer bridging sleek user interfaces with dependable backend systems."
          icon={Code2}
        />

        {/* Bento Grid Layout */}
        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''} grid grid-cols-1 gap-5 md:grid-cols-3`}>
          {/* Bento Card 1: Narrative & Engineering Focus (2 Columns wide) */}
          <div className="bento-card p-6 sm:p-8 md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-accent-soft px-3 py-1 text-xs font-bold text-accent-primary mb-4">
                <Code2 className="h-3.5 w-3.5" />
                <span>Full-Stack Mindset</span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-fg-primary sm:text-3xl">
                Transforming complex product ideas into intuitive, scalable software.
              </h3>
              <div className="mt-4 space-y-3.5 text-sm sm:text-base leading-relaxed text-fg-secondary">
                <p>
                  I'm a Full-Stack Developer specializing in modern web applications built on the MERN stack. My focus is crafting cohesive digital products: from lightning-fast client interfaces to resilient server-side microservices and structured databases.
                </p>
                <p>
                  I continuously refine my software engineering depth through hands-on project creation, participating in software hackathons, and solving algorithmic problems on platforms like CodeChef and freeCodeCamp.
                </p>
              </div>
            </div>

            {/* Quick Commitments */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border-primary/60 pt-5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-fg-primary">Clean &amp; Maintainable Code</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-fg-primary">Responsive Across All Viewports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-fg-primary">REST API Best Practices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-fg-primary">Accessible (a11y) Design</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Key Milestones & Social Proof (1 Column) */}
          <div className="bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500 mb-4">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified Milestones</span>
              </span>
              <h4 className="font-display text-xl font-bold text-fg-primary">
                Engineering Metrics
              </h4>
              <p className="mt-1 text-xs text-fg-tertiary">
                Track record of consistent delivery and technical learning.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-border-primary/80 bg-bg-tertiary/40 p-4">
                  <p className="text-xs font-semibold text-fg-tertiary">Projects Engineered</p>
                  <p className="font-display text-3xl font-extrabold gradient-accent-text">10+</p>
                  <p className="text-[11px] text-fg-secondary mt-0.5">Full-stack apps, AI generators &amp; tools</p>
                </div>

                <div className="rounded-xl border border-border-primary/80 bg-bg-tertiary/40 p-4">
                  <p className="text-xs font-semibold text-fg-tertiary">Academic Performance</p>
                  <p className="font-display text-3xl font-extrabold text-accent-primary">9.5 CGPA</p>
                  <p className="text-[11px] text-fg-secondary mt-0.5">Bachelor of Computer Applications (Eternal Univ)</p>
                </div>

                <div className="rounded-xl border border-border-primary/80 bg-bg-tertiary/40 p-4">
                  <p className="text-xs font-semibold text-fg-tertiary">Verified Certifications</p>
                  <p className="font-display text-3xl font-extrabold text-fg-primary">10+</p>
                  <p className="text-[11px] text-fg-secondary mt-0.5">Coursera, freeCodeCamp, CodeChef &amp; Meta</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 3: 4 Engineering Pillars (Full 3-column span) */}
          <div className="bento-card p-6 sm:p-8 md:col-span-3">
            <h4 className="font-display text-lg font-bold text-fg-primary mb-4">
              Core Technical Competencies
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {engineeringPillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border-primary/70 bg-bg-tertiary/30 p-4 transition-all hover:border-accent-primary/50 hover:bg-bg-tertiary/50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-primary mb-3">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h5 className="text-sm font-bold text-fg-primary">{item.title}</h5>
                    <p className="mt-1 text-xs leading-relaxed text-fg-secondary">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
