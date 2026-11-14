import { Github, Linkedin, Mail, Code2, ArrowUp, Heart, Sparkles } from 'lucide-react';
import { profile } from '@/data/profile';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border-primary/80 bg-bg-secondary/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Personal Branding & Role (5 Cols) */}
          <div className="lg:col-span-5">
            <button
              onClick={() => handleNav('home')}
              className="group flex items-center gap-3 text-left focus-visible:outline-none"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-md shadow-accent-primary/20 transition-transform duration-300 group-hover:scale-105">
                <Code2 className="h-5 w-5" />
              </span>
              <div>
                <span className="font-display text-lg font-black tracking-tight text-fg-primary group-hover:text-accent-primary transition-colors">
                  {profile.name}
                </span>
                <p className="text-xs font-semibold text-accent-primary">
                  {profile.role}
                </p>
              </div>
            </button>

            <p className="mt-3.5 max-w-sm text-xs sm:text-sm leading-relaxed text-fg-secondary">
              Specialized in building robust, performant full-stack MERN web applications, resilient backend architectures, and clean responsive interfaces.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-fg-tertiary">
                Available for Full-Time Roles &amp; Internships
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Shortcuts (4 Cols) */}
          <div className="lg:col-span-4 lg:justify-self-center">
            <h3 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-fg-tertiary">
              Quick Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className="font-medium text-fg-secondary transition-colors hover:text-accent-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Direct Channels (3 Cols) */}
          <div className="lg:col-span-3 lg:justify-self-end">
            <h3 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-fg-tertiary">
              Connect Directly
            </h3>

            <div className="flex items-center gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                title="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary shadow-sm transition-all duration-300 hover:border-accent-primary hover:text-accent-primary hover:shadow-glow hover:-translate-y-0.5"
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary shadow-sm transition-all duration-300 hover:border-accent-primary hover:text-accent-primary hover:shadow-glow hover:-translate-y-0.5"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href={`mailto:${profile.email}`}
                aria-label="Send direct email"
                title="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary shadow-sm transition-all duration-300 hover:border-accent-primary hover:text-accent-primary hover:shadow-glow hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
              </a>

              <button
                onClick={scrollToTop}
                title="Scroll back to top"
                aria-label="Scroll to top"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary shadow-sm transition-all duration-300 hover:border-accent-primary hover:text-accent-primary hover:shadow-glow hover:-translate-y-0.5"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-3.5 text-xs font-medium text-fg-tertiary">
              {profile.location} • IST (UTC+5:30)
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Architecture */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-primary/60 pt-6 text-xs text-fg-tertiary sm:flex-row">
          <p>
            &copy; {currentYear} <span className="font-semibold text-fg-primary">{profile.name}</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Full-Stack Portfolio built with{' '}
            <span className="font-semibold text-fg-primary">
              React • Node.js • Express • MongoDB
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

