import { useState, useEffect } from 'react';
import {
  Search,
  Code2,
  Terminal,
  FolderGit2,
  Cpu,
  Mail,
  Download,
  Moon,
  Sun,
  Shield,
  Sparkles,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { profile } from '@/data/profile';
import { useTheme } from '@/hooks/useTheme';

export function CommandPalette({ isOpen, onClose, onOpenTerminal, onOpenAdmin, onOpenApiTester }) {
  const [query, setQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (id) => {
    onClose(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResume = () => {
    onClose(false);
    const link = document.createElement('a');
    link.href = profile.resumePath;
    link.download = 'Chaitanya_Gomaskar_FSDI_Resume.pdf';
    link.click();
  };

  const items = [
    {
      group: 'Interactive Tools',
      actions: [
        {
          id: 'terminal',
          title: 'Open Developer Terminal (CLI)',
          subtitle: 'Interactive shell with custom commands and telemetry',
          icon: Terminal,
          badge: 'Shell',
          run: () => {
            onClose(false);
            onOpenTerminal();
          },
        },
        {
          id: 'api-tester',
          title: 'Live MERN API Playground',
          subtitle: 'Test live endpoints, query params, and responses',
          icon: Cpu,
          badge: 'Live API',
          run: () => {
            onClose(false);
            onOpenApiTester();
          },
        },
        {
          id: 'admin',
          title: 'MERN Admin Console',
          subtitle: 'Review visitor submissions stored in MongoDB',
          icon: Shield,
          badge: 'Passcode: admin123',
          run: () => {
            onClose(false);
            onOpenAdmin();
          },
        },
      ],
    },
    {
      group: 'Quick Navigation',
      actions: [
        { id: 'home', title: 'Home & Hero', subtitle: 'Overview, availability and bio', icon: Code2, run: () => navigateTo('home') },
        { id: 'about', title: 'About Me', subtitle: 'Background and software philosophy', icon: Sparkles, run: () => navigateTo('about') },
        { id: 'skills', title: 'Skills & Tech Stack', subtitle: 'Interactive stack & proficiencies', icon: Cpu, run: () => navigateTo('skills') },
        { id: 'projects', title: 'Featured Projects', subtitle: 'MERN stack solutions and live demos', icon: FolderGit2, run: () => navigateTo('projects') },
        { id: 'testimonials', title: 'Endorsements', subtitle: 'Social proof & community reviews', icon: Sparkles, run: () => navigateTo('testimonials') },
        { id: 'contact', title: 'Get In Touch', subtitle: 'Direct contact form to MongoDB', icon: Mail, run: () => navigateTo('contact') },
      ],
    },
    {
      group: 'Quick Actions',
      actions: [
        {
          id: 'resume',
          title: 'Download Resume PDF',
          subtitle: 'Chaitanya_Gomaskar_FSDI_Resume.pdf',
          icon: Download,
          run: handleResume,
        },
        {
          id: 'theme',
          title: `Toggle Theme (Current: ${theme})`,
          subtitle: 'Switch between light and dark visual aesthetics',
          icon: theme === 'dark' ? Sun : Moon,
          run: () => {
            toggleTheme();
            onClose(false);
          },
        },
        {
          id: 'email',
          title: 'Copy Email Address',
          subtitle: profile.email,
          icon: Mail,
          run: () => {
            navigator.clipboard.writeText(profile.email);
            onClose(false);
            alert('Email copied to clipboard!');
          },
        },
      ],
    },
  ];

  const filteredItems = items
    .map((grp) => ({
      ...grp,
      actions: grp.actions.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.subtitle.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((grp) => grp.actions.length > 0);

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => onClose(false)} />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border-primary bg-bg-secondary shadow-2xl animate-scale-in">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border-primary px-4 py-3 bg-bg-elevated/70">
          <Search className="h-5 w-5 text-accent-primary" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to... (e.g. projects, terminal, api, resume)"
            className="w-full bg-transparent text-sm text-fg-primary outline-none placeholder:text-fg-tertiary"
          />
          <kbd className="hidden rounded-lg border border-border-primary bg-bg-tertiary px-2 py-0.5 text-[10px] font-mono text-fg-tertiary sm:inline-block">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-fg-tertiary">
              No matching commands found for "{query}".
            </div>
          ) : (
            filteredItems.map((grp) => (
              <div key={grp.group} className="mb-3">
                <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-fg-tertiary">
                  {grp.group}
                </p>
                <div className="space-y-1">
                  {grp.actions.map((act) => {
                    const Icon = act.icon;
                    return (
                      <button
                        key={act.id}
                        onClick={act.run}
                        className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all hover:bg-accent-soft hover:text-accent-primary"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg-tertiary text-fg-secondary transition-colors group-hover:bg-accent-primary group-hover:text-white">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-fg-primary group-hover:text-accent-primary">
                              {act.title}
                            </p>
                            <p className="text-[11px] text-fg-tertiary">{act.subtitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {act.badge && (
                            <span className="rounded-md border border-border-primary bg-bg-tertiary px-2 py-0.5 text-[10px] font-medium text-fg-secondary">
                              {act.badge}
                            </span>
                          )}
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-border-primary/80 bg-bg-elevated/40 px-4 py-2 text-[11px] text-fg-tertiary">
          <span>Navigation: <kbd className="font-mono text-fg-secondary">↑ ↓</kbd> to cycle</span>
          <span>Open: <kbd className="font-mono text-fg-secondary">Enter</kbd></span>
        </div>
      </div>
    </div>
  );
}
