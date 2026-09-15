import { useEffect, useState } from 'react';

export default function DepthGauge() {
  const [depth, setDepth] = useState(0);
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setDepth(Math.round(p * 40));
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex" aria-hidden>
      <span className="text-[10px] tabular-nums tracking-[0.2em] text-aqua">−{depth}m</span>
      <div className="relative h-44 w-px bg-foam/15">
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-aqua to-teal transition-all duration-150" style={{ height: `${(depth / 40) * 100}%` }} />
        <span className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-aqua shadow-[0_0_10px_rgba(70,212,195,1)] transition-all duration-150" style={{ top: `calc(${(depth / 40) * 100}% - 4px)` }} />
      </div>
      <span className="text-[9px] uppercase tracking-[0.35em] text-mist" style={{ writingMode: 'vertical-rl' }}>Depth</span>
    </div>
  );
}
