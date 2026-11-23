import type Lenis from 'lenis';

/** Singleton handle on the Lenis instance so any component can scroll smoothly. */
let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/** Smoothly scroll to a section, accounting for the sticky header height. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -76, duration: 1.25 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.25 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
