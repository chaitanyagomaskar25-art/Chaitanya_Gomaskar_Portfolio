import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary shadow-sm transition-all duration-300 hover:border-accent-primary hover:text-accent-primary hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${className}`}
    >
      <span className="absolute inset-0 rounded-xl bg-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative h-5 w-5 overflow-hidden">
        {/* Sun Icon (Rotates and scales smoothly) */}
        <Sun
          className={`absolute inset-0 h-5 w-5 text-amber-400 transition-all duration-500 transform ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0'
          }`}
          aria-hidden="true"
        />
        {/* Moon Icon */}
        <Moon
          className={`absolute inset-0 h-5 w-5 text-accent-primary transition-all duration-500 transform ${
            isDark
              ? '-rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
          aria-hidden="true"
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

