import { useEffect, useRef } from 'react';

type Bubble = { x: number; y: number; r: number; speed: number; wobble: number; phase: number; alpha: number; stroke: string; fill: string };
type Mote = { x: number; y: number; r: number; dx: number; dy: number; alpha: number; fill: string };

export default function AmbientCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create a fresh canvas per effect run (rather than a JSX-rendered node
    // reused via ref) — transferControlToOffscreen() can only be called once
    // per canvas ever, and React StrictMode re-runs this effect on the same
    // DOM node in dev, which would throw on the second run.
    const canvas = document.createElement('canvas');
    canvas.className = 'pointer-events-none absolute inset-0';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);

    const dpr = 1;

    // Prefer running the particle sim in a worker via OffscreenCanvas so it
    // never competes with React renders / scroll animations on the main thread.
    if (typeof canvas.transferControlToOffscreen === 'function') {
      const worker = new Worker(new URL('../workers/ambient.worker.ts', import.meta.url), { type: 'module' });
      const offscreen = canvas.transferControlToOffscreen();
      worker.postMessage({ type: 'init', canvas: offscreen, width: window.innerWidth, height: window.innerHeight, dpr }, [offscreen]);
      const onResize = () => worker.postMessage({ type: 'resize', width: window.innerWidth, height: window.innerHeight });
      window.addEventListener('resize', onResize);
      return () => { window.removeEventListener('resize', onResize); worker.terminate(); canvas.remove(); };
    }

    // Fallback for browsers without OffscreenCanvas support: same sim, main thread.
    const ctx = canvas.getContext('2d');
    if (!ctx) { canvas.remove(); return; }
    let w = 0, h = 0, raf = 0;
    let bubbles: Bubble[] = [];
    let motes: Mote[] = [];
    const seed = () => {
      const area = (w * h) / (1440 * 800);
      const nb = Math.round(18 * Math.max(0.5, area));
      const nm = Math.round(45 * Math.max(0.5, area));
      bubbles = Array.from({ length: nb }, () => {
        const alpha = 0.12 + Math.random() * 0.4;
        return { x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 5.5, speed: 0.25 + Math.random() * 0.9, wobble: 0.4 + Math.random() * 1.4, phase: Math.random() * Math.PI * 2, alpha, stroke: `rgba(159,240,226,${alpha})`, fill: `rgba(233,245,241,${Math.min(0.85, alpha + 0.25)})` };
      });
      motes = Array.from({ length: nm }, () => {
        const alpha = 0.06 + Math.random() * 0.22;
        return { x: Math.random() * w, y: Math.random() * h, r: 0.4 + Math.random() * 1.4, dx: (Math.random() - 0.5) * 0.22, dy: (Math.random() - 0.5) * 0.16, alpha, fill: `rgba(159,240,226,${alpha})` };
      });
    };
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    window.addEventListener('resize', resize);
    let skip = false;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      skip = !skip;
      if (skip) return;
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.dx * 2;
        m.y += m.dy * 2;
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;
        if (m.y < -10) m.y = h + 10;
        if (m.y > h + 10) m.y = -10;
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = m.fill; ctx.fill();
      }
      for (const b of bubbles) {
        b.y -= b.speed * 2; b.phase += 0.04;
        const x = b.x + Math.sin(b.phase) * b.wobble * 8;
        if (b.y < -12) { b.y = h + 12; b.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = b.stroke; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(x - b.r * 0.3, b.y - b.r * 0.3, Math.max(0.4, b.r * 0.22), 0, Math.PI * 2);
        ctx.fillStyle = b.fill; ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); canvas.remove(); };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[4]" aria-hidden />;
}
