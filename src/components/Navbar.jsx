import { useState, useEffect } from 'react';
import { Menu, X, Download, Code2, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { profile } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResume = () => {
    if (profile.resumeAvailable) {
      const link = document.createElement('a');
      link.href = profile.resumePath;
      link.download = 'Chaitanya_Gomaskar_FSDI_Resume.pdf';
      link.click();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border-primary bg-bg-primary/85 backdrop-blur-md shadow-sm'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5 font-bold text-fg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-lg py-1 px-1.5"
          aria-label="Go to home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-md shadow-accent-primary/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-glow">
            <Code2 className="h-5 w-5" />
          </span>
          <div className="flex flex-col text-left">
            <span className="font-display text-base font-extrabold tracking-tight text-fg-primary group-hover:text-accent-primary transition-colors">
              {profile.name}
            </span>
            <span className="text-[10px] font-medium tracking-wider uppercase text-fg-muted">
              Portfolio
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-1 md:flex rounded-full border border-border-primary/60 bg-bg-secondary/60 px-3 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-fg-secondary hover:text-fg-primary hover:bg-bg-tertiary/70'
                  }`}
                >
                  {/* Active Pill Background */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary shadow-sm" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right Actions: Resume Button, Theme Toggle, Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleResume}
            disabled={!profile.resumeAvailable}
            className="group btn-lift hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-glow disabled:opacity-50 sm:flex"
            title={profile.resumeAvailable ? 'Download Resume' : 'Resume unavailable'}
          >
            <Download className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            <span>CV</span>
          </button>

          <ThemeToggle />

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-primary transition-colors hover:border-accent-primary md:hidden"
          >
            <span className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop & Menu */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`border-b border-border-primary bg-bg-secondary/95 p-6 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="space-y-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-accent-soft text-accent-primary font-bold'
                        : 'text-fg-secondary hover:bg-bg-tertiary hover:text-fg-primary'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-accent-primary shadow-glow" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 border-t border-border-primary/80 pt-4">
            <button
              onClick={() => {
                setMenuOpen(false);
                handleResume();
              }}
              disabled={!profile.resumeAvailable}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-glow disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Download Resume (CV)
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

