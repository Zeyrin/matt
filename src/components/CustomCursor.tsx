import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [enabled] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let pendingTarget: HTMLElement | null = null;
    const applyTarget = () => {
      raf = 0;
      const el = pendingTarget;
      const labelled = el?.closest?.('[data-cursor-label]') as HTMLElement | null;
      setLabel(labelled?.dataset.cursorLabel ?? null);
      setHovering(!!el?.closest?.('a, button, input, select, textarea, [data-hover]'));
    };
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      pendingTarget = e.target as HTMLElement;
      if (!raf) raf = requestAnimationFrame(applyTarget);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const ringSize = label ? 96 : hovering ? 64 : 36;
  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x: ringX, y: ringY }}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="flex items-center justify-center rounded-full border"
            animate={{ width: ringSize, height: ringSize, scale: pressed ? 0.85 : 1, backgroundColor: label ? 'rgba(70,212,195,0.92)' : 'rgba(70,212,195,0.06)', borderColor: label ? 'rgba(70,212,195,1)' : 'rgba(70,212,195,0.55)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            {label && <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-abyss">{label}</span>}
          </motion.div>
        </div>
      </motion.div>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x, y }}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className="rounded-full bg-foam transition-all duration-300" style={{ width: label ? 0 : 5, height: label ? 0 : 5, opacity: label ? 0 : 1 }} />
        </div>
      </motion.div>
    </>
  );
}
