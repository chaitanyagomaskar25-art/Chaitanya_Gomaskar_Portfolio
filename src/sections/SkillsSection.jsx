import { useState, useMemo } from 'react';
import { Layout, Server, Database, Wrench, Brain, Check } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { skillCategories } from '@/data/skills';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const iconMap = {
  Layout,
  Server,
  Database,
  Wrench,
  Brain,
};

// Brand colors for recognizable technologies
const techColors = {
  'HTML5': '#e34f26',
  'CSS3': '#1572b6',
  'JavaScript (ES6+)': '#f7df1e',
  'React': '#61dafb',
  'Tailwind CSS': '#06b6d4',
  'Responsive Web Design': '#3b82f6',
  'Accessibility': '#8b5cf6',
  'Python': '#3776ab',
  'Node.js': '#339933',
  'Express.js': '#4a4a4a',
  'REST API Development': '#0891b2',
  'Authentication & Authorization': '#dc2626',
  'MongoDB': '#47a248',
  'SQL': '#e38900',
  'PostgreSQL': '#4169e1',
  'Database Design': '#0ea5e9',
  'Git': '#f05032',
  'GitHub': '#8b949e',
  'npm': '#cb3837',
  'VS Code': '#0078d4',
  'Postman': '#ff6c37',
  'Browser DevTools': '#22c55e',
  'Data Structures & Algorithms': '#7c3aed',
  'Problem Solving': '#0891b2',
  'Debugging': '#ef4444',
  'API Integration': '#0ea5e9',
  'Deployment & Hosting': '#6366f1',
};

const filters = [
  { id: 'all', label: 'All' },
  { id: 'Frontend Development', label: 'Frontend' },
  { id: 'Backend Development', label: 'Backend' },
  { id: 'Databases', label: 'Database' },
  { id: 'Development Tools', label: 'Tools' },
  { id: 'Additional Skills', label: 'Practices' },
];

// Flatten all skills with their category metadata
const allSkills = skillCategories.flatMap((cat) =>
  cat.skills.map((skill) => ({
    ...skill,
    categoryTitle: cat.title,
    categoryIcon: cat.icon,
  }))
);

function getInitials(name) {
  const words = name.replace(/[()&]/g, '').trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function SkillTile({ skill, index, visible }) {
  const color = techColors[skill.name] ?? 'var(--accent-primary)';

  return (
    <div
      className="group/skill relative flex flex-col items-center gap-2.5 rounded-2xl px-4 py-5 text-center transition-all duration-300 hover:bg-bg-secondary hover:shadow-md"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
        transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease, box-shadow 0.3s ease',
        transitionDelay: visible ? `${index * 35}ms` : '0ms',
      }}
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold transition-transform duration-300 group-hover/skill:scale-110"
        style={{
          backgroundColor: `${color}18`,
          color: color,
        }}
      >
        {getInitials(skill.name)}
      </span>
      <span className="text-xs font-medium leading-tight text-fg-secondary transition-colors duration-300 group-hover/skill:text-fg-primary sm:text-sm">
        {skill.name}
      </span>
      {/* Accent underline on hover */}
      <span
        className="absolute bottom-2 left-4 right-4 h-0.5 rounded-full opacity-0 transition-opacity duration-300 group-hover/skill:opacity-100"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { ref, visible } = useScrollReveal();

  // For "All" — one unified grid of every skill, no category headers
  // For a specific filter — only that category's skills
  const displayedSkills = useMemo(() => {
    if (activeFilter === 'all') return allSkills;
    const cat = skillCategories.find((c) => c.title === activeFilter);
    if (!cat) return [];
    return cat.skills.map((skill) => ({
      ...skill,
      categoryTitle: cat.title,
      categoryIcon: cat.icon,
    }));
  }, [activeFilter]);

  const activeCategory = activeFilter !== 'all'
    ? skillCategories.find((c) => c.title === activeFilter)
    : null;

  return (
    <section id="skills" className="relative py-20 sm:py-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--orb-1)' }} />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full opacity-15 blur-3xl" style={{ background: 'var(--orb-2)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Technical Expertise"
          subtitle="Technologies and tools I work with across the stack."
          icon={Layout}
        />

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-md'
                  : 'text-fg-secondary hover:text-fg-primary'
              }`}
            >
              {activeFilter === filter.id && <Check className="h-3.5 w-3.5" />}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Skills grid — unified for "All", single-category otherwise */}
        <div ref={ref} className="mx-auto max-w-5xl">
          {activeFilter === 'all' ? (
            // Unified grid — no category separation
            <div
              key="all-grid"
              className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 animate-fade-in"
            >
              {displayedSkills.map((skill, idx) => (
                <SkillTile
                  key={skill.name}
                  skill={skill}
                  index={idx}
                  visible={visible}
                />
              ))}
            </div>
          ) : (
            // Single category — with a subtle category header
            <div key={activeFilter} className="animate-fade-in">
              {activeCategory && (
                <div className="mb-6 flex items-center gap-3">
                  {(() => {
                    const Icon = iconMap[activeCategory.icon] ?? Layout;
                    return (
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                    );
                  })()}
                  <h3 className="text-base font-bold text-fg-primary">
                    {activeCategory.title}
                  </h3>
                  <span className="ml-1 text-xs font-medium text-fg-tertiary">
                    {activeCategory.skills.length} skills
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-border-primary to-transparent" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {displayedSkills.map((skill, idx) => (
                  <SkillTile
                    key={skill.name}
                    skill={skill}
                    index={idx}
                    visible={visible}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
