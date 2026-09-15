import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 48, className = '', style }: { children: ReactNode; delay?: number; y?: number; className?: string; style?: CSSProperties }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SplitWords({ text, className = '', stagger = 0.028 }: { text: string; className?: string; stagger?: number }) {
  const words = text.split(' ');
  return (
    <motion.span className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}>
      {words.map((w, i) => (
        <motion.span key={i} className="inline-block" variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}>
          {w}{i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Reveal y={20}>
      <div className="flex items-center gap-4">
        <span className="h-px w-12 bg-aqua/70" />
        <span className="text-[11px] font-medium uppercase tracking-[0.42em] text-aqua">{children}</span>
      </div>
    </Reveal>
  );
}
