import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  const [depth, setDepth] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 2000;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDepth(Math.round(eased * 30));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-abyss" exit={{ y: '-100%' }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
      <div className="refraction-bg absolute inset-0 opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-[min(520px,90vw)] w-[min(520px,90vw)] -translate-x-1/2 -translate-y-1/2 opacity-30">
        <div className="animate-spin-slower absolute inset-0 rounded-full border border-dashed border-aqua/40" />
        <div className="animate-spin-slower absolute inset-10 rounded-full border border-aqua/20" style={{ animationDirection: 'reverse', animationDuration: '32s' }} />
        <div className="animate-spin-slower absolute inset-24 rounded-full border border-dotted border-aqua/30" style={{ animationDuration: '18s' }} />
      </div>
      <div className="relative w-full px-6 text-center">
        <p className="mb-3 pl-[0.5em] text-[11px] uppercase tracking-[0.5em] text-aqua">Descending</p>
        <p className="font-display text-6xl font-light tabular-nums text-foam sm:text-7xl md:text-8xl">−{depth}<span className="text-3xl text-mist">m</span></p>
        <div className="mx-auto mt-6 h-px w-56 overflow-hidden bg-foam/10">
          <motion.div className="h-full bg-aqua" animate={{ width: `${(depth / 30) * 100}%` }} transition={{ ease: 'linear' }} />
        </div>
        <p className="mt-4 pl-[0.3em] text-xs uppercase tracking-[0.3em] text-mist">Equalizing pressure</p>
      </div>
    </motion.div>
  );
}
