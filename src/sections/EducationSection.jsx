import { GraduationCap, MapPin, BookOpen, Calendar } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { education } from '@/data/education';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function TimelineEntry({ entry, index }) {
  const { ref, visible } = useScrollReveal({ rootMargin: '0px 0px -60px 0px' });

  return (
    <div
      ref={ref}
      className={`reveal-left ${visible ? 'reveal-visible' : ''} relative pl-16`}
      style={{ transitionDelay: visible ? `${index * 120}ms` : '0ms' }}
    >
      {/* Timeline node */}
      <div className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent-primary bg-bg-secondary text-accent-primary shadow-md transition-transform hover:scale-110">
        <GraduationCap className="h-6 w-6" />
      </div>

      {/* Card */}
      <div className="card-glow group rounded-xl border border-border-primary bg-bg-secondary p-5 shadow-sm transition-all hover:border-accent-primary hover:shadow-md sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-fg-primary">
              {entry.degree}
            </h3>
            <p className="text-sm font-medium text-accent-primary">
              {entry.institution}
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-bg-tertiary px-3 py-1 text-xs font-medium text-fg-secondary">
            <Calendar className="h-3 w-3" />
            {entry.startYear} — {entry.endYear}
          </span>
        </div>

        {entry.location && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-fg-tertiary">
            <MapPin className="h-4 w-4" />
            {entry.location}
          </p>
        )}

        {entry.description && (
          <p className="mt-3 text-sm text-fg-secondary text-balance">
            {entry.description}
          </p>
        )}

        {entry.coursework && (
          <div className="mt-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
              <BookOpen className="h-3.5 w-3.5" />
              Relevant Coursework
            </p>
            <p className="mt-1 text-sm text-fg-secondary">{entry.coursework}</p>
          </div>
        )}

        {entry.cgpa && (
          <p className="mt-3 inline-block rounded-lg bg-accent-soft px-3 py-1 text-sm font-semibold text-accent-primary">
            CGPA: {entry.cgpa}
          </p>
        )}

         {entry.percentage && (
          <p className="mt-3 inline-block rounded-lg bg-accent-soft px-3 py-1 text-sm font-semibold text-accent-primary">
            Percentage: {entry.percentage}
          </p>
        )}
      </div>
    </div>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ background: 'var(--orb-2)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Education"
          title="Academic Background"
          subtitle="My educational journey and qualifications."
          icon={GraduationCap}
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary via-border-secondary to-transparent" aria-hidden="true" />

          <div className="space-y-8">
            {education.map((entry, index) => (
              <TimelineEntry key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
