import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary transition-all hover:border-accent-primary hover:text-accent-primary"
    >
      <span className="absolute inset-0 rounded-xl bg-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative transition-transform duration-500 hover:scale-110">
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 transition-transform duration-500 rotate-0" />
        ) : (
          <Moon className="h-5 w-5 transition-transform duration-500 rotate-0" />
        )}
      </span>
    </button>
  );
}
