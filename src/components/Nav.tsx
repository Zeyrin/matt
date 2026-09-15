import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Waves, Menu, X, ArrowUpRight } from 'lucide-react';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#story', label: 'Story' },
  { href: '#process', label: 'Process' },
  { href: '#packages', label: 'Packages' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const compute = () => { setScrolled(window.scrollY > 50); raf = 0; };
    const onScroll = () => { if (raf) return; raf = requestAnimationFrame(compute); };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="group flex items-center gap-3" data-hover>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-aqua/40 bg-deep/60 transition-all duration-500 group-hover:rotate-180 group-hover:border-aqua group-hover:shadow-[0_0_24px_rgba(70,212,195,0.5)]">
              <Waves size={18} className="text-aqua" />
            </span>
            <span className="leading-none">
              <span className="font-display block text-xl font-semibold tracking-wide">VDOMATT</span>
              <span className="hidden text-[9px] uppercase tracking-[0.4em] text-mist sm:block">Matt Baer · Underwater video</span>
            </span>
          </a>
          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="group relative text-[12px] font-medium uppercase tracking-[0.3em] text-foam/70 transition-colors duration-300 hover:text-foam">
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-aqua transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(70,212,195,0.9)]" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#book" className="group hidden items-center gap-2 rounded-full border border-aqua/50 bg-aqua/10 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.25em] text-foam transition-all duration-500 hover:bg-aqua hover:text-abyss hover:shadow-[0_0_36px_rgba(70,212,195,0.6)] sm:flex">
              Book a dive
              <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
            </a>
            <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-foam/20 text-foam transition-colors hover:border-aqua lg:hidden" aria-label="Open menu">
              <Menu size={19} />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, clipPath: 'circle(0% at 92% 5%)' }} animate={{ opacity: 1, clipPath: 'circle(150% at 92% 5%)' }} exit={{ opacity: 0, clipPath: 'circle(0% at 92% 5%)' }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-deep/95">
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display text-xl">VDOMATT</span>
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-foam/20" aria-label="Close menu">
                <X size={19} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-3 px-6 py-6 sm:px-8">
              {[...LINKS, { href: '#book', label: 'Book a dive' }].map((l, i) => (
                <motion.a key={l.href + l.label} href={l.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="font-display text-4xl font-light leading-tight text-foam/90 transition-colors hover:text-aqua sm:text-5xl">
                  <span className="mr-4 text-sm text-aqua">0{i + 1}</span>{l.label}
                </motion.a>
              ))}
            </nav>
            <p className="px-6 pb-8 text-[11px] sm:px-8 uppercase tracking-[0.35em] text-mist">Koh Tao · Sail Rock · Red Sea</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
