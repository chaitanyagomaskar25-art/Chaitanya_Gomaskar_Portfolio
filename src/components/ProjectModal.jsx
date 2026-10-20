import { useEffect } from 'react';
import { X, Github, ExternalLink, Star, Code2, Layers, Tag } from 'lucide-react';

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

  const hasGithub = project.githubUrl.length > 0;
  const hasDemo = project.liveDemoUrl.length > 0;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-bg-secondary shadow-lg animate-scale-in">
        {/* Header image */}
        <div className="relative aspect-video overflow-hidden bg-bg-tertiary">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-bg-secondary/80 glass text-fg-secondary transition-colors hover:border-accent-primary hover:text-accent-primary"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="rounded-full bg-bg-secondary/80 glass px-3 py-1 text-xs font-medium text-fg-secondary">
              {project.category}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-6">
          <h3 className="text-xl font-bold text-fg-primary sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-fg-secondary text-balance">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mt-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
              <Code2 className="h-3.5 w-3.5" />
              Technology Stack
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border-primary bg-bg-tertiary px-3 py-1.5 text-xs font-medium text-fg-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col gap-2 border-t border-border-primary p-4 sm:flex-row sm:justify-end sm:p-6">
          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-lg border border-border-primary px-4 py-2.5 text-sm font-medium text-fg-primary transition-all hover:border-accent-primary hover:text-accent-primary"
            >
              <Github className="h-4 w-4" />
              View Code
              <ExternalLink className="h-3.5 w-3.5 arrow-hover" />
            </a>
          )}
          {hasDemo && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
          {!hasGithub && !hasDemo && (
            <p className="text-center text-xs text-fg-tertiary sm:py-2">
              Repository and demo links coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
