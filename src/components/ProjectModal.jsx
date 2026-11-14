import { useEffect } from 'react';
import { X, Github, ExternalLink, Code2, CheckCircle2, Heart, Eye, ArrowUpRight, Sparkles } from 'lucide-react';

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasGithub = Boolean(project.githubUrl && project.githubUrl.length > 0);
  const hasDemo = Boolean(project.liveDemoUrl && project.liveDemoUrl.length > 0);

  return (
    <div
      className="fixed inset-0 z-[70] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Soft Non-Intrusive Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Premium Side Panel Drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-border-primary bg-bg-secondary shadow-2xl transition-transform duration-300 ease-out animate-in slide-in-from-right">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border-primary/80 px-6 py-4.5 bg-bg-secondary/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-fg-tertiary">
              Project Preview &amp; Architecture
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview drawer"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-border-primary text-fg-secondary transition-colors hover:border-accent-primary hover:text-fg-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Cover Media */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border-primary/80 bg-bg-tertiary shadow-sm">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {project.category || 'Full-Stack'}
              </span>
              {project.featured && (
                <span className="rounded-full bg-accent-primary px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  ★ Flagship
                </span>
              )}
            </div>
          </div>

          {/* Title & Tagline */}
          <div>
            <h3
              id="drawer-title"
              className="font-display text-xl sm:text-2xl font-bold tracking-tight text-fg-primary"
            >
              {project.title}
            </h3>
            {project.tagline && (
              <p className="mt-1 text-xs font-semibold text-accent-primary">
                {project.tagline}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-fg-tertiary mb-2">
              Overview
            </h4>
            <p className="text-sm leading-relaxed text-fg-secondary">
              {project.description}
            </p>
          </div>

          {/* Key Metrics / Highlights if present */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="rounded-2xl border border-accent-primary/20 bg-accent-soft/40 p-4">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-accent-primary mb-2.5">
                Key Technical Highlights
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {project.metrics.map((metric) => (
                  <div key={metric} className="flex items-center gap-1.5 text-xs font-medium text-fg-primary">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-primary shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrated Tech Stack */}
          <div>
            <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-fg-tertiary mb-2.5">
              <Code2 className="h-3.5 w-3.5 text-accent-primary" />
              Technologies &amp; Libraries
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border-primary/80 bg-bg-tertiary px-2.5 py-1 text-xs font-semibold text-fg-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-2.5 border-t border-border-primary/80 bg-bg-secondary/95 p-4 sm:px-6">
          {hasDemo && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold shadow-sm transition-all hover:shadow-glow"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Launch Live Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}

          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all hover:border-accent-primary"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Source</span>
            </a>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-xs font-semibold text-fg-secondary hover:text-fg-primary"
          >
            Close
          </button>
        </div>
      </aside>
    </div>
  );
}
