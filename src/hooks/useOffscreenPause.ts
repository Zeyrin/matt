import { useEffect, type RefObject } from 'react';

// Pauses a CSS animation on `ref` whenever it's scrolled out of view, so
// continuously-running background-position/transform animations don't keep
// repainting off-screen sections forever.
export function useOffscreenPause(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
