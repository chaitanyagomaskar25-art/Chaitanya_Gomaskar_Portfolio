import { useState, useMemo } from 'react';
import { Layout, Server, Database, Wrench, Brain, Check, Code2, Sparkles, Terminal, Shield, Laptop } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { skillCategories } from '@/data/skills';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const techColors = {
  'HTML5': '#e34f26',
  'CSS3': '#1572b6',
  'JavaScript (ES6+)': '#f7df1e',
  'React': '#38bdf8',
  'Tailwind CSS': '#06b6d4',
  'Responsive Web Design': '#6366f1',
  'Accessibility': '#8b5cf6',
  'Python': '#3776ab',
  'Node.js': '#22c55e',
  'Express.js': '#f59e0b',
  'REST API Development': '#0891b2',
  'Authentication & Authorization': '#ef4444',
  'MongoDB': '#10b981',
  'SQL': '#e38900',
  'Git': '#f05032',
  'GitHub': '#8b949e',
  'npm': '#cb3837',
  'VS Code': '#0078d4',
  'Postman': '#ff6c37',
  'Browser DevTools': '#14b8a6',
  'Data Structures & Algorithms': '#8b5cf6',
  'Problem Solving': '#0891b2',
  'Debugging': '#f43f5e',
  'API Integration': '#38bdf8',
  'Deployment & Hosting': '#6366f1',
};

const categoryTabs = [
  { id: 'all', label: 'All Technologies' },
  { id: 'Frontend Development', label: 'Frontend', icon: Layout },
  { id: 'Backend Development', label: 'Backend', icon: Server },
  { id: 'Databases', label: 'Databases', icon: Database },
  { id: 'Development Tools', label: 'Tools', icon: Wrench },
  { id: 'Additional Skills', label: 'Core CS', icon: Brain },
];

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const { ref, visible } = useScrollReveal();

  const displayedCategories = useMemo(() => {
    if (activeTab === 'all') return skillCategories;
    return skillCategories.filter((cat) => cat.title === activeTab);
  }, [activeTab]);

  return (
    <section id="skills" className="relative py-20 sm:py-28 bg-bg-secondary/20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--orb-1)' }} />
        <div className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ background: 'var(--orb-2)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills &amp; Technologies"
          title="Technical Expertise"
          subtitle="A comprehensive inventory of languages, frameworks, databases, and tooling I use to architect full-stack software."
          icon={Code2}
        />

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedSkill(null);
                }}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'btn-primary shadow-md'
                    : 'border border-border-primary bg-bg-secondary text-fg-secondary hover:border-accent-primary hover:text-accent-primary'
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skill Groups Bento Grid */}
        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''} space-y-8`}>
          {displayedCategories.map((cat) => (
            <div key={cat.title} className="bento-card p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between border-b border-border-primary/60 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-primary">
                    <Code2 className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-fg-primary">
                    {cat.title}
                  </h3>
                </div>
                <span className="rounded-full bg-bg-tertiary px-2.5 py-0.5 text-xs font-medium text-fg-tertiary">
                  {cat.skills.length} skills
                </span>
              </div>

              {/* Skills Pill Cluster */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {cat.skills.map((skill) => {
                  const color = techColors[skill.name] || '#6366f1';
                  const isSelected = selectedSkill === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                      className={`group cursor-pointer rounded-xl border p-3 transition-all ${
                        isSelected
                          ? 'border-accent-primary bg-accent-soft/20 shadow-sm'
                          : 'border-border-primary/70 bg-bg-tertiary/40 hover:border-accent-primary/50 hover:bg-bg-tertiary'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs font-bold text-fg-primary truncate">
                          {skill.name}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-fg-tertiary">
                        Production Ready
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
