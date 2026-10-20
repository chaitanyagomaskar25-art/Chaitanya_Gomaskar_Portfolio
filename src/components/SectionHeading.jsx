import { useScrollReveal } from '@/hooks/useScrollReveal';

export function SectionHeading({ eyebrow, title, subtitle, icon: Icon }) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} mb-14 text-center`}
    >
      <div className="mb-3 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent-primary" />
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent-primary">
          {Icon && <Icon className="h-3.5 w-3.5" />}
          {eyebrow}
        </span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent-primary" />
      </div>
      <h2 className="text-3xl font-extrabold text-fg-primary sm:text-4xl lg:text-[2.5rem] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-fg-secondary text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
}
