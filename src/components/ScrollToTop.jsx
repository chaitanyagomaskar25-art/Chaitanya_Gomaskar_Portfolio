import { ArrowUp } from 'lucide-react';
import { useScrollToTopVisible } from '@/hooks/useScrollToTop';

export function ScrollToTop() {
  const visible = useScrollToTopVisible();

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary text-white shadow-lg transition-transform hover:scale-110 animate-fade-in"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
