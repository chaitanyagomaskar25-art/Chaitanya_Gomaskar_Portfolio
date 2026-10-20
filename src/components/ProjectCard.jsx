import { Github, ExternalLink, Star, ArrowRight, Eye } from 'lucide-react';

export function ProjectCard({ project, onDetails }) {
  const hasGithub = project.githubUrl.length > 0;
  const hasDemo = project.liveDemoUrl.length > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-bg-secondary shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-bg-tertiary">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

       

      

        {/* Preview button on hover */}
        {onDetails && (
          <button
            onClick={() => onDetails(project)}
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye className="h-4 w-4" />
            Quick View
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold text-fg-primary transition-colors group-hover:text-accent-primary">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-fg-secondary text-balance">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-bg-tertiary px-2.5 py-1 text-xs font-medium text-fg-secondary transition-colors hover:text-accent-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-2">
          <a
            href={hasGithub ? project.githubUrl : undefined}
            target={hasGithub ? '_blank' : undefined}
            rel={hasGithub ? 'noopener noreferrer' : undefined}
            aria-disabled={!hasGithub}
            onClick={(e) => !hasGithub && e.preventDefault()}
            className={`group/btn flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
              hasGithub
                ? 'text-fg-primary hover:bg-bg-tertiary hover:text-accent-primary'
                : 'cursor-not-allowed text-fg-tertiary opacity-50'
            }`}
          >
            <Github className="h-4 w-4" />
            Code
            {hasGithub && <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover/btn:opacity-100" />}
          </a>
          <a
            href={hasDemo ? project.liveDemoUrl : undefined}
            target={hasDemo ? '_blank' : undefined}
            rel={hasDemo ? 'noopener noreferrer' : undefined}
            aria-disabled={!hasDemo}
            onClick={(e) => !hasDemo && e.preventDefault()}
            className={`group/btn flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
              hasDemo
                ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:opacity-90 hover:shadow-md'
                : 'cursor-not-allowed bg-bg-tertiary text-fg-tertiary opacity-50'
            }`}
          >
            <ExternalLink className="h-4 w-4" />
            Demo
          </a>
          {onDetails && (
            <button
              onClick={() => onDetails(project)}
              aria-label={`View details for ${project.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-bg-tertiary text-fg-secondary transition-all hover:text-accent-primary"
            >
              <ArrowRight className="h-4 w-4 arrow-hover" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
