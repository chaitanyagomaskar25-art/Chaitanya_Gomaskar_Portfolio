import { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  ExternalLink,
  Github,
  Flame,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { ProjectCard } from './ProjectCard';

const categories = ['All', 'Full-Stack MERN', 'AI & APIs', 'Frontend & UI'];

export function ProjectsCarousel({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFeatured, setOnlyFeatured] = useState(false);


  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCat =
        activeCategory === 'All' ||
        project.category === activeCategory ||
        (project.technologies && project.technologies.includes(activeCategory));

      const matchFeatured = !onlyFeatured || project.featured;

      const matchSearch =
        !searchQuery.trim() ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.technologies &&
          project.technologies.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      return matchCat && matchFeatured && matchSearch;
    });
  }, [projects, activeCategory, searchQuery, onlyFeatured]);

  // Identify standout flagship or hero project
  const flagship = useMemo(() => {
    return projects.find((p) => p.id === 1) || projects[0];
  }, [projects]);

  // Asymmetric Bento Grid Projects (excluding flagship when viewing All without filters)
  const bentoProjects = useMemo(() => {
    if (activeCategory === 'All' && !searchQuery.trim() && !onlyFeatured) {
      return filteredProjects.filter((p) => p.id !== flagship?.id);
    }
    return filteredProjects;
  }, [filteredProjects, activeCategory, searchQuery, onlyFeatured, flagship]);

  const handleOpenDetails = (project) => {
    setSelected(project);
  };

  return (
    <>
      <div className="space-y-10">
        {/* Controls Bar: Category Pills + Search Filter + Quick Toggles */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border-primary/80 bg-bg-secondary/60 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-md shadow-accent-primary/20'
                      : 'border border-border-primary bg-bg-secondary text-fg-secondary hover:border-accent-primary hover:text-accent-primary'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      activeCategory === cat
                        ? 'bg-white/25 text-white'
                        : 'bg-bg-tertiary text-fg-tertiary'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Featured Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setOnlyFeatured(!onlyFeatured)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                onlyFeatured
                  ? 'border-amber-500/80 bg-amber-500/10 text-amber-500'
                  : 'border-border-primary bg-bg-secondary text-fg-secondary hover:text-fg-primary'
              }`}
            >
              <Flame className={`h-3.5 w-3.5 ${onlyFeatured ? 'fill-amber-500' : ''}`} />
              <span>Featured Only</span>
            </button>

            <div className="relative min-w-[180px] sm:min-w-[220px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-fg-tertiary" />
              <input
                type="text"
                placeholder="Search tech or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border-primary bg-bg-secondary py-2 pl-9 pr-3 text-xs text-fg-primary placeholder:text-fg-tertiary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Flagship Hero Showcase (Rendered prominently when in 'All' tab and no active search) */}
        {flagship && activeCategory === 'All' && !searchQuery.trim() && !onlyFeatured && (
          <div className="bento-card relative overflow-hidden rounded-3xl border border-border-primary/80 bg-bg-secondary p-6 shadow-2xl transition-all duration-300 hover:border-accent-primary/60 sm:p-8 lg:p-10">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-primary/10 blur-3xl" />
            
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Media Column (7 Cols) */}
              <div className="relative lg:col-span-7">
                <div className="group relative overflow-hidden rounded-2xl border border-border-primary/80 bg-bg-tertiary shadow-xl">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={flagship.image}
                      alt={flagship.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Flagship Pill */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary px-3.5 py-1 text-xs font-bold text-white shadow-md">
                      ★ Flagship MERN Product
                    </span>
                    <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                      Full-Stack &amp; AI
                    </span>
                  </div>
                </div>
              </div>

              {/* Narrative Content Column (5 Cols) */}
              <div className="flex flex-col lg:col-span-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <Sparkles className="h-4 w-4" />
                  <span>Featured Case Study</span>
                </div>

                <h3 className="font-display mt-2 text-2xl font-black tracking-tight text-fg-primary sm:text-3xl">
                  {flagship.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
                  {flagship.description}
                </p>

                {/* Highlights */}
                {flagship.metrics && (
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {flagship.metrics.map((m) => (
                      <div key={m} className="flex items-center gap-1.5 text-xs font-semibold text-fg-secondary">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent-primary shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mt-5 border-t border-border-primary/60 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-fg-tertiary mb-2">
                    Architectural Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {flagship.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-border-primary/80 bg-bg-tertiary px-2.5 py-1 text-xs font-semibold text-fg-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {flagship.liveDemoUrl && (
                    <a
                      href={flagship.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-md transition-all hover:shadow-glow"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}

                  {flagship.githubUrl && (
                    <a
                      href={flagship.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all hover:border-accent-primary"
                    >
                      <Github className="h-4 w-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Asymmetric Bento Showcase Grid */}
        <div>
          {bentoProjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border-primary p-12 text-center">
              <p className="text-sm font-medium text-fg-secondary">
                No engineering projects match your current filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                  setOnlyFeatured(false);
                }}
                className="mt-3 text-xs font-bold text-accent-primary hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bentoProjects.map((project, idx) => {
                // In standard view, the first card in the subgrid gets asymmetric width on desktop
                const isWide = idx === 0 && bentoProjects.length >= 3;
                return (
                  <div
                    key={project.id || project._id}
                    className={isWide ? 'md:col-span-2' : 'col-span-1'}
                  >
                    <ProjectCard
                      project={project}
                      isFeatured={project.featured}
                      isWide={isWide}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

