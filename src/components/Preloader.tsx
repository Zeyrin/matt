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
    <motion.div className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-abyss" exit={{ y: '-100%' }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
      <div className="refraction-bg absolute inset-0 opacity-40" />
      <div className="absolute h-[520px] w-[520px] opacity-30">
        <div className="animate-spin-slower absolute inset-0 rounded-full border border-dashed border-aqua/40" />
        <div className="animate-spin-slower absolute inset-10 rounded-full border border-aqua/20" style={{ animationDirection: 'reverse', animationDuration: '32s' }} />
        <div className="animate-spin-slower absolute inset-24 rounded-full border border-dotted border-aqua/30" style={{ animationDuration: '18s' }} />
      </div>
      <div className="relative text-center">
        <p className="mb-3 text-[11px] uppercase tracking-[0.5em] text-aqua">Descending</p>
        <p className="font-display text-7xl font-light tabular-nums text-foam md:text-8xl">−{depth}<span className="text-3xl text-mist">m</span></p>
        <div className="mx-auto mt-6 h-px w-56 overflow-hidden bg-foam/10">
          <motion.div className="h-full bg-aqua" animate={{ width: `${(depth / 30) * 100}%` }} transition={{ ease: 'linear' }} />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-mist">Equalizing pressure</p>
      </div>
    </motion.div>
  );
}
