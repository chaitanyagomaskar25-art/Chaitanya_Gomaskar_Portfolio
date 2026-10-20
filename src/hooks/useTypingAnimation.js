import { useEffect, useState } from 'react';

export function useTypingAnimation(words, options = {}) {
  const {
    typeSpeed = 100,
    deleteSpeed = 50,
    pauseDuration = 2000,
  } = options;

  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayed(words[0]);
      return;
    }

    const currentWord = words[wordIndex];

    let timeout;
    if (!isDeleting && displayed.length < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length + 1));
      }, typeSpeed);
    } else if (!isDeleting && displayed.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length - 1));
      }, deleteSpeed);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseDuration]);

  return displayed;
}
