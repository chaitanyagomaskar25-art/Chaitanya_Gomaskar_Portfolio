import { useState, useEffect } from 'react';
import { Menu, X, Download, Code2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { profile } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

const sectionIds = navLinks.map((l) => l.id);

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResume = () => {
    if (profile.resumeAvailable) {
      const link = document.createElement('a');
      link.href = profile.resumePath;
      link.download = 'Full-Stack-Developer-Resume.pdf';
      link.click();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'glass-strong border-border-primary shadow-sm'
          : 'border-transparent'
      }`}
      style={{ backgroundColor: scrolled ? 'var(--header-bg)' : 'transparent' }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5 font-bold text-fg-primary"
          aria-label="Go to home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-md transition-transform group-hover:scale-105">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">{profile.name}</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className={`nav-underline rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'nav-active text-accent-primary'
                    : 'text-fg-secondary hover:text-fg-primary'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResume}
            disabled={!profile.resumeAvailable}
            className="group btn-lift hidden items-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-2 text-sm font-semibold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:flex"
            title={profile.resumeAvailable ? 'Download Resume' : 'Add your resume PDF to enable download'}
          >
            <Download className="h-4 w-4" />
            Resume
          </button>
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-primary transition-colors hover:border-accent-primary hover:text-accent-primary lg:hidden"
          >
            <span className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-border-primary bg-bg-secondary/95 glass lg:hidden transition-all duration-300 ease-out ${
          menuOpen ? 'max-h-[500px] border-t opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className={`block w-full rounded-xl px-4 py-3 text-left text-base font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-accent-soft text-accent-primary'
                    : 'text-fg-secondary hover:bg-bg-tertiary hover:text-fg-primary'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <button
              onClick={() => {
                setMenuOpen(false);
                handleResume();
              }}
              disabled={!profile.resumeAvailable}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-3 text-base font-semibold text-white shadow-md disabled:opacity-50"
            >
              <Download className="h-5 w-5" />
              Download Resume
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
