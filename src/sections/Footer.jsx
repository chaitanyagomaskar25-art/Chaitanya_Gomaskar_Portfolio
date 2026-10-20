import { Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';
import { profile } from '@/data/profile';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary text-white">
                <Code2 className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold text-fg-primary">{profile.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-fg-secondary">
              {profile.role} building responsive, user-friendly web applications and
              reliable backend systems.
            </p>
          </div>

          <div className="lg:justify-self-center">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className="text-sm text-fg-secondary transition-colors hover:text-accent-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:justify-self-end">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-tertiary text-fg-secondary transition-all hover:text-accent-primary"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-tertiary text-fg-secondary transition-all hover:text-accent-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-tertiary text-fg-secondary transition-all hover:text-accent-primary"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border-primary pt-6 sm:flex-row">
          <p className="text-sm text-fg-tertiary">
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-fg-tertiary">
            Built with <Heart className="h-4 w-4 text-red-500" /> using React &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
