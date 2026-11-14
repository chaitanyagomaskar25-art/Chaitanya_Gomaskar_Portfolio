import { GraduationCap, MapPin, BookOpen, Calendar, Award } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { education } from '@/data/education';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function TimelineEntry({ entry, index }) {
  const { ref, visible } = useScrollReveal({ rootMargin: '0px 0px -60px 0px' });

  return (
    <div
      ref={ref}
      className={`reveal-left ${visible ? 'reveal-visible' : ''} relative pl-12 sm:pl-16`}
      style={{ transitionDelay: visible ? `${index * 120}ms` : '0ms' }}
    >
      {/* Illuminated Node */}
      <div className="absolute left-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-accent-primary/60 bg-bg-secondary text-accent-primary shadow-glow transition-transform hover:scale-110">
        <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>

      {/* Card */}
      <div className="bento-card p-6 sm:p-7 shadow-sm transition-all hover:border-accent-primary/60">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-fg-primary">
              {entry.degree}
            </h3>
            <p className="text-sm font-semibold text-accent-primary mt-0.5">
              {entry.institution}
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-border-primary/80 bg-bg-tertiary px-3 py-1 text-xs font-semibold text-fg-secondary">
            <Calendar className="h-3.5 w-3.5" />
            {entry.startYear} — {entry.endYear}
          </span>
        </div>

        {entry.location && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-fg-tertiary">
            <MapPin className="h-3.5 w-3.5 text-accent-primary" />
            {entry.location}
          </p>
        )}

        {entry.description && (
          <p className="mt-3.5 text-sm leading-relaxed text-fg-secondary">
            {entry.description}
          </p>
        )}

        {entry.coursework && (
          <div className="mt-4 border-t border-border-primary/60 pt-3">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-fg-tertiary">
              <BookOpen className="h-3.5 w-3.5" />
              Core Coursework
            </p>
            <p className="mt-1 text-xs leading-relaxed text-fg-secondary">{entry.coursework}</p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {entry.cgpa && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500">
              <Award className="h-3.5 w-3.5" />
              Academic CGPA: {entry.cgpa} / 10.0
            </span>
          )}

          {entry.percentage && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent-soft px-3 py-1 text-xs font-bold text-accent-primary">
              Score: {entry.percentage}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function EducationSection() {
  return (
    <section id="experience" className="relative py-20 sm:py-28 bg-bg-secondary/20 scroll-mt-20">
      {/* Anchor for backward compatibility with #education */}
      <span id="education" className="sr-only" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: 'var(--orb-2)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Academic Background"
          title="Education &amp; Qualifications"
          subtitle="Formal foundation in computer applications, algorithmic thinking, and software engineering."
          icon={GraduationCap}
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical Timeline Rule */}
          <div className="absolute left-5 sm:left-6 top-4 bottom-4 w-px bg-gradient-to-b from-accent-primary via-accent-secondary to-transparent" aria-hidden="true" />

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
