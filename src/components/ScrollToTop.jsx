import { ArrowUp } from 'lucide-react';
import { useScrollToTopVisible } from '@/hooks/useScrollToTop';

export function ScrollToTop() {
  const visible = useScrollToTopVisible();

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl btn-primary shadow-lg transition-transform hover:scale-105 animate-fade-in"
    >
      <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
  );
}
