import { useScrollReveal } from '@/hooks/useScrollReveal';

export function SectionHeading({ eyebrow, title, subtitle, icon: Icon, align = 'center' }) {
  const { ref, visible } = useScrollReveal();
  const isLeft = align === 'left';

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} mb-12 sm:mb-16 ${
        isLeft ? 'text-left' : 'text-center'
      }`}
    >
      {eyebrow && (
        <div className={`mb-3 inline-flex items-center gap-2 rounded-full border border-border-primary/80 bg-bg-secondary/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-primary backdrop-blur-sm ${
          isLeft ? '' : 'mx-auto'
        }`}>
          {Icon && <Icon className="h-3.5 w-3.5" />}
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-fg-primary sm:text-4xl lg:text-5xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-sm sm:text-base text-fg-secondary leading-relaxed text-balance ${
          isLeft ? 'max-w-2xl' : 'mx-auto max-w-2xl'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
