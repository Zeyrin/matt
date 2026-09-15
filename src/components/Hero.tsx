import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import Caustics from './Caustics';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const lineWrap: Variants = { hidden: {}, show: (d: number = 0) => ({ transition: { staggerChildren: 0.045, delayChildren: d } }) };
const letter: Variants = { hidden: { y: '115%', rotate: 5, opacity: 0 }, show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 1.1, ease: EASE } } };

function StaggerLine({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <motion.span className={`block overflow-hidden pb-[0.08em] ${className ?? ''}`} variants={lineWrap} initial="hidden" animate="show" custom={delay}>
      {text.split('').map((ch, i) => (
        <motion.span key={i} variants={letter} className="inline-block will-change-transform">{ch === ' ' ? '\u00A0' : ch}</motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-38%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Don't keep decoding the loop once the hero is scrolled out of view.
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY, scale: bgScale }}>
        <video ref={videoRef} className="h-full w-full object-cover" src="/video/hero.mp4" poster="/img/hero-poster.jpg" autoPlay muted loop playsInline />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/80 via-abyss/25 to-abyss" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_40%,rgba(1,10,19,0.55)_100%)]" />
      <div className="absolute -top-40 left-1/2 h-[28rem] w-[140%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(70,212,195,0.16),rgba(70,212,195,0.05)_45%,transparent_70%)]" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {[12, 30, 52, 74].map((left, i) => (
          <div key={left} className="animate-ray absolute top-[-10%] h-[75%] w-32 will-change-transform bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,rgba(159,240,226,0.22),rgba(70,212,195,0.07)_55%,transparent_100%)]" style={{ left: `${left}%`, animationDelay: `${i * 1.7}s` }} />
        ))}
      </div>
      <Caustics id="hero" opacity={0.55} />
      <motion.div style={{ y: contentY, opacity: fade }} className="relative z-10 flex h-full flex-col justify-end pb-10 will-change-transform md:pb-14">
        <div className="mx-auto w-full max-w-[1500px] px-5 md:px-10">
          {ready && (
            <>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: EASE }} className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.4em] text-aqua">
                <span className="flex items-center gap-2"><MapPin size={13} /> Sail Rock, Gulf of Thailand — 9°58′N</span>
                <span className="hidden h-px w-16 bg-aqua/50 sm:block" />
                <span className="text-foam/70">Koh Tao season · 2026</span>
              </motion.div>
              <h1 className="font-display font-black leading-[0.84] tracking-tight">
                <StaggerLine text="BENEATH" delay={0.25} className="text-[clamp(3.4rem,13vw,11.5rem)] text-foam [text-shadow:0_10px_40px_rgba(0,0,0,0.6)]" />
                <StaggerLine text="THE SURFACE" delay={0.55} className="text-outline text-[clamp(3.4rem,13vw,11.5rem)]" />
              </h1>
              <div className="mt-7 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.15, ease: EASE }} className="font-display max-w-md text-xl font-light italic leading-relaxed text-foam/85 md:text-2xl">
                  Films and portraits of divers, shot where the light turns to liquid — yours to keep before you surface.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.3, ease: EASE }} className="flex items-center gap-5">
                  <a href="#work" data-hover className="group relative overflow-hidden rounded-full bg-foam px-8 py-4 text-[12px] font-bold uppercase tracking-[0.25em] text-abyss transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(233,245,241,0.4)]">
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-foam">Enter the blue</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-teal via-aqua to-teal transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  </a>
                  <a href="#book" className="hidden rounded-full border border-foam/30 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.25em] text-foam/85 transition-all duration-500 hover:border-aqua hover:text-aqua sm:block">Book a shoot</a>
                </motion.div>
              </div>
            </>
          )}
        </div>
        <div className="mx-auto mt-10 flex w-full max-w-[1500px] items-end justify-between px-5 md:px-10">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-mist">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-foam/20"><ArrowDown size={15} className="animate-float-y text-aqua" /></span>
            <span className="hidden sm:block">Descend<br />to explore</span>
          </div>
          <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.35em] text-mist md:flex">
            <span>15+ years filming</span>
            <span className="h-1 w-1 rounded-full bg-aqua" />
            <span>80k+ views on YouTube</span>
            <span className="h-1 w-1 rounded-full bg-aqua" />
            <span className="tabular-nums">−18 m</span>
          </div>
          <div className="h-16 w-px overflow-hidden bg-foam/10"><div className="animate-scroll-cue h-full w-full bg-aqua" /></div>
        </div>
      </motion.div>
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 items-center gap-3 xl:flex">
        <span className="text-[10px] uppercase tracking-[0.5em] text-foam/40">vdomatt — Koh Tao · Red Sea</span>
      </div>
    </section>
  );
}
