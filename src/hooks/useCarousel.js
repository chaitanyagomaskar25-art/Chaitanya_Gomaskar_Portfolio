import { useCallback, useEffect, useState } from 'react';

export function useCarousel({
  totalItems,
  desktopItemsPerView,
  mobileItemsPerView,
  mobileBreakpoint = 768,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [mobileBreakpoint]);

  const itemsPerView = isMobile ? mobileItemsPerView : desktopItemsPerView;
  const totalPages = Math.ceil(totalItems / itemsPerView);
  const maxIndex = Math.max(0, totalPages - 1);

  const clampIndex = useCallback(
    (i) => Math.min(Math.max(0, i), maxIndex),
    [maxIndex]
  );

  useEffect(() => {
    setIndex((prev) => clampIndex(prev));
  }, [clampIndex]);

  const next = useCallback(() => setIndex((i) => clampIndex(i + 1)), [clampIndex]);
  const prev = useCallback(() => setIndex((i) => clampIndex(i - 1)), [clampIndex]);
  const goTo = useCallback((i) => setIndex(clampIndex(i)), [clampIndex]);

  const canNext = index < maxIndex;
  const canPrev = index > 0;

  const visibleItems = Array.from(
    { length: itemsPerView },
    (_, i) => index * itemsPerView + i
  ).filter((i) => i < totalItems);

  const currentPage = index + 1;
  const paddedPage = String(currentPage).padStart(2, '0');
  const paddedTotal = String(totalPages).padStart(2, '0');

  return {
    index,
    isMobile,
    itemsPerView,
    totalPages,
    maxIndex,
    next,
    prev,
    goTo,
    canNext,
    canPrev,
    visibleItems,
    pageIndicator: `${paddedPage} / ${paddedTotal}`,
  };
}
