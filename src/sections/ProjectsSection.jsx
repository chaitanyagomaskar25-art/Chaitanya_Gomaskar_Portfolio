import { FolderGit2 } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { projects } from '@/data/projects';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function ProjectsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: 'var(--orb-1)' }} />
        <div className="absolute left-1/4 bottom-1/4 h-64 w-64 rounded-full opacity-25 blur-3xl" style={{ background: 'var(--orb-3)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects"
          subtitle="A selection of projects showcasing my full-stack development capabilities."
          icon={FolderGit2}
        />

        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <ProjectsCarousel projects={projects} />
        </div>
      </div>
    </section>
  );
}
