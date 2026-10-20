import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';
import { CertificateCard } from './CertificateCard';
import { CertificateModal } from './CertificateModal';

export function CertificatesCarousel({ certificates }) {
  const [selected, setSelected] = useState(null);

  const carousel = useCarousel({
    totalItems: certificates.length,
    desktopItemsPerView: 2,
    mobileItemsPerView: 1,
  });

  return (
    <>
      <div>
        {/* Controls */}
        <div className="mb-6 flex items-center justify-between">
          <p className="flex items-center gap-2 font-mono text-sm text-fg-tertiary" aria-live="polite">
            <span className="text-lg font-bold text-accent-primary">
              {String(carousel.index + 1).padStart(2, '0')}
            </span>
            <span className="text-fg-tertiary/50">/</span>
            <span>{String(carousel.totalPages).padStart(2, '0')}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={carousel.prev}
              disabled={!carousel.canPrev}
              aria-label="Previous certificates"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-primary transition-all hover:border-accent-primary hover:text-accent-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={carousel.next}
              disabled={!carousel.canNext}
              aria-label="Next certificates"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-primary transition-all hover:border-accent-primary hover:text-accent-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          key={carousel.index}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-fade-in"
        >
          {carousel.visibleItems.map((i) => (
            <CertificateCard
              key={certificates[i].id}
              certificate={certificates[i]}
              onView={setSelected}
            />
          ))}
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: carousel.totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => carousel.goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                carousel.index === i
                  ? 'w-8 bg-gradient-to-r from-accent-primary to-accent-secondary'
                  : 'w-2 bg-border-secondary hover:bg-fg-tertiary'
              }`}
            />
          ))}
        </div>
      </div>

      <CertificateModal certificate={selected} onClose={() => setSelected(null)} />
    </>
  );
}
