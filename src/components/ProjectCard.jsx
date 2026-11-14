import { Github, ExternalLink } from 'lucide-react';

export function ProjectCard({ project, isFeatured = false, isWide = false }) {
  const hasGithub = Boolean(project.githubUrl && project.githubUrl.length > 0);
  const hasDemo = Boolean(project.liveDemoUrl && project.liveDemoUrl.length > 0);

  return (
    <article
      className={`bento-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-accent-primary/60 ${
        isFeatured ? 'ring-1 ring-accent-primary/30' : ''
      }`}
    >
      {/* Thumbnail Container */}
      <div className={`relative overflow-hidden bg-bg-tertiary ${isWide ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badges: Category & Featured */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="rounded-full border border-white/20 bg-black/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {project.category || 'Full-Stack'}
          </span>
          {project.featured && (
            <span className="rounded-full bg-accent-primary px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              ★ Featured
            </span>
          )}
        </div>
      </div>


      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-display text-base sm:text-lg font-bold text-fg-primary line-clamp-1"
          >
            {project.title}
          </h3>
        </div>

        {project.tagline && (
          <p className="mt-1 text-xs font-semibold text-accent-primary">
            {project.tagline}
          </p>
        )}

        <p className="mt-2.5 line-clamp-2.5 flex-1 text-xs sm:text-sm leading-relaxed text-fg-secondary">
          {project.description}
        </p>

        {/* Technology Stack Badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-border-primary/80 bg-bg-tertiary/70 px-2 py-0.5 text-[11px] font-medium text-fg-secondary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-lg border border-border-primary/60 bg-bg-tertiary/40 px-1.5 py-0.5 text-[10px] font-medium text-fg-tertiary">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center gap-2.5 border-t border-border-primary/60 pt-4">
          <a
            href={hasDemo ? project.liveDemoUrl : undefined}
            target={hasDemo ? '_blank' : undefined}
            rel={hasDemo ? 'noopener noreferrer' : undefined}
            onClick={(e) => !hasDemo && e.preventDefault()}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold shadow-sm transition-all ${
              hasDemo
                ? 'btn-primary'
                : 'cursor-not-allowed bg-bg-tertiary text-fg-tertiary opacity-40'
            }`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live Demo
          </a>

          <a
            href={hasGithub ? project.githubUrl : undefined}
            target={hasGithub ? '_blank' : undefined}
            rel={hasGithub ? 'noopener noreferrer' : undefined}
            onClick={(e) => !hasGithub && e.preventDefault()}
            className={`flex items-center justify-center gap-1.5 rounded-xl border border-border-primary px-3.5 py-2 text-xs font-semibold transition-all ${
              hasGithub
                ? 'bg-bg-tertiary/60 text-fg-primary hover:border-accent-primary hover:text-accent-primary'
                : 'cursor-not-allowed text-fg-tertiary opacity-40'
            }`}
          >
            <Github className="h-3.5 w-3.5" />
            Code
          </a>
        </div>
      </div>
    </article>
  );
}


