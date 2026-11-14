import { useState, useEffect } from 'react';
import { FolderGit2, Github, ExternalLink, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { projects as fallbackProjects } from '@/data/projects';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { api } from '@/services/api';
import { profile } from '@/data/profile';

export function ProjectsSection() {
  const { ref, visible } = useScrollReveal();
  const [projectList, setProjectList] = useState(fallbackProjects);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getProjects();
        if (data && data.length > 0) {
          // Merge API data with local image assets & tags if necessary
          const merged = data.map((remote) => {
            const local = fallbackProjects.find((f) => f.id === remote.id);
            return {
              ...remote,
              image: local?.image || remote.image,
              metrics: local?.metrics || remote.metrics,
              tagline: local?.tagline || remote.tagline,
            };
          });
          setProjectList(merged);
        }
      } catch (e) {
        // Fallback to local data
        setProjectList(fallbackProjects);
      }
    }
    load();
  }, []);

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      {/* Ambient Radial Highlights */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: 'var(--orb-1)' }}
        />
        <div
          className="absolute left-1/4 bottom-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'var(--orb-2)' }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio &amp; Engineering"
          title="Featured Projects"
          subtitle="Production-grade MERN applications, AI-integrated utilities, and modern responsive web systems with clean architecture."
          icon={FolderGit2}
        />

        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <ProjectsCarousel projects={projectList} />

          {/* GitHub CTA Footer */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border-primary/80 bg-bg-secondary/60 p-6 backdrop-blur-md sm:flex-row sm:p-8">
            <div className="text-center sm:text-left">
              <h4 className="font-display text-base sm:text-lg font-bold text-fg-primary">
                Interested in viewing more repositories &amp; open-source contributions?
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-fg-secondary">
                Explore algorithmic solutions, web experiments, and ongoing open-source work on GitHub.
              </p>
            </div>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold shrink-0 transition-all hover:border-accent-primary"
            >
              <Github className="h-4 w-4" />
              <span>Explore GitHub Profile</span>
              <ExternalLink className="h-3.5 w-3.5 text-accent-primary" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

