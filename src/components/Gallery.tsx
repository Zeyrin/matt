import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Eyebrow, Reveal } from './Reveal';

type Item = { id: number; src: string; title: string; location: string; depth: string };
const FALLBACK: Item[] = [
  { id: 1, src: '/img/g1.jpg', title: 'The Drop', location: 'Shark Observatory, Ras Mohamed', depth: '−31 m' },
  { id: 2, src: '/img/g2.jpg', title: 'Reef Drift', location: 'Japanese Gardens, Koh Tao', depth: '−14 m' },
  { id: 3, src: '/img/g3.jpg', title: 'Silver Choir', location: 'Jackson Reef, Tiran', depth: '−22 m' },
  { id: 4, src: '/img/g4.jpg', title: 'Surface Memory', location: 'Sail Rock, Gulf of Thailand', depth: '−6 m' },
  { id: 5, src: '/img/g5.jpg', title: 'Ancient Mariner', location: 'Chumphon Pinnacle, Koh Tao', depth: '−11 m' },
  { id: 6, src: '/img/g6.jpg', title: 'Night Glider', location: 'Naama Bay, Sharm El Sheikh', depth: '−19 m' },
  { id: 7, src: '/img/g7.jpg', title: 'Cathedral Light', location: 'Sail Rock, Gulf of Thailand', depth: '−26 m' },
];
// Separate set of photos for the horizontal reel below the grid, so it
// isn't just the same seven images scrolling past twice.
const REEL_IMAGES = ['/img/r1.jpg', '/img/r2.jpg', '/img/r3.jpg', '/img/r4.jpg', '/img/r5.jpg', '/img/r6.jpg', '/img/r7.jpg'];
const GRID_SPANS = ['md:col-span-7 aspect-[16/10]', 'md:col-span-5 aspect-[4/5] md:mt-32', 'md:col-span-5 aspect-[4/5] md:-mt-40', 'md:col-span-7 aspect-[16/11] md:mt-6', 'md:col-span-4 aspect-[3/4]', 'md:col-span-4 aspect-[3/4] md:mt-24', 'md:col-span-4 aspect-[3/4] md:-mt-10'];
const TILTS = ['md:-rotate-1', 'md:rotate-1', 'md:rotate-[0.6deg]', 'md:-rotate-[0.6deg]', 'md:rotate-1', 'md:-rotate-1', 'md:rotate-[0.8deg]'];

export default function Gallery() {
  const [items, setItems] = useState<Item[]>(FALLBACK);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/gallery').then((r) => (r.ok ? r.json() : null)).then((data) => { if (Array.isArray(data) && data.length) setItems(data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);
  const reelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: reelRef });
  // Measure the track so the reel always ends exactly on the last card,
  // whatever the viewport width (a fixed % overshoots on desktop and cuts
  // the CTA off on phones).
  const [travel, setTravel] = useState(0);
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 800); // fonts / images settling
    return () => { window.removeEventListener('resize', measure); clearTimeout(t); };
  }, [items]);
  const x = useTransform(scrollYProgress, (p) => -travel * p);

  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <Eyebrow>Selected work</Eyebrow>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal><h2 className="font-display text-[clamp(2.4rem,12.5vw,5rem)] font-black leading-[0.95] md:text-8xl">DIVERS,<br /><span className="text-outline-aqua">SUSPENDED</span></h2></Reveal>
          <Reveal delay={0.15} className="max-w-sm"><p className="text-sm leading-relaxed text-mist">From the Red Sea walls of Ras Mohamed to the fish clouds of Sail Rock — every frame is an ordinary fun dive, shot candidly, delivered same-day. This could be you, mid-water, mid-breath.</p></Reveal>
        </div>
      </div>
      <div className="mx-auto mt-16 grid max-w-[1500px] grid-cols-1 gap-8 px-5 md:grid-cols-12 md:gap-6 md:px-10">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 0.1} className={GRID_SPANS[i % GRID_SPANS.length]}>
            <figure data-cursor-label="View" className={`group relative overflow-hidden rounded-[3px] bg-deep ${TILTS[i % TILTS.length]} transition-transform duration-700 ease-out hover:rotate-0 hover:z-10`}>
              <div className="h-full w-full overflow-hidden">
                {loading ? <div className="refraction-bg h-full min-h-[300px] w-full animate-pulse" /> : <img src={item.src} alt={item.title} loading="lazy" decoding="async" className="img-deep h-full w-full object-cover" />}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
              <span className="absolute right-4 top-4 rounded-full border border-foam/25 bg-abyss/55 px-3 py-1 text-[10px] tabular-nums tracking-[0.2em] text-foam transition-colors duration-500 group-hover:border-aqua group-hover:text-aqua">{item.depth}</span>
              <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 md:p-6">
                <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-aqua">{item.location}</p>
                  <p className="font-display mt-1 text-2xl font-light text-foam md:text-3xl">{item.title}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-foam/30 text-foam opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:bg-aqua group-hover:text-abyss group-hover:border-aqua"><ArrowUpRight size={17} /></span>
              </figcaption>
              <span className="pointer-events-none absolute inset-0 border border-aqua/0 transition-all duration-700 group-hover:border-aqua/40" />
            </figure>
          </Reveal>
        ))}
      </div>
      <div ref={reelRef} className="relative mt-20 h-[280vh] md:mt-28 md:h-[340vh]">
        <div className="h-viewport sticky top-0 flex flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-8 flex w-full max-w-[1500px] items-center justify-between px-5 md:px-10">
            <p className="text-[11px] uppercase tracking-[0.4em] text-aqua">Keep scrolling — drift with it</p>
            <p className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-mist md:flex">The reel <ArrowRight size={14} className="text-aqua" /></p>
          </div>
          <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-6 px-5 will-change-transform md:gap-10 md:px-10">
            <div className="w-[72vw] shrink-0 md:w-[34vw]">
              <p className="font-display text-3xl font-light leading-tight text-foam sm:text-4xl md:text-6xl">One dive.<br /><span className="italic text-aqua">Forty frames</span> of you flying.</p>
            </div>
            {items.map((item, i) => (
              <figure key={`reel-${item.id}`} data-cursor-label="Drift" className={`group relative shrink-0 overflow-hidden rounded-[3px] ${i % 2 ? 'mt-10 w-[64vw] sm:mt-20 sm:w-[70vw] md:w-[26vw]' : 'w-[64vw] sm:w-[70vw] md:w-[30vw]'}`}>
                <img src={REEL_IMAGES[i % REEL_IMAGES.length]} alt={item.title} loading="lazy" decoding="async" className="img-deep aspect-[4/5] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 p-5">
                  <p className="font-display text-xl text-foam">{item.title}</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-aqua">{item.depth} · {item.location}</p>
                </figcaption>
                <span className="font-display text-outline-faint absolute right-3 top-2 text-6xl font-black">0{i + 1}</span>
              </figure>
            ))}
            <div className="flex w-[64vw] shrink-0 items-center justify-center sm:w-[70vw] md:w-[26vw]">
              <a href="#book" className="group flex h-44 w-44 flex-col sm:h-52 sm:w-52 items-center justify-center gap-2 rounded-full border border-aqua/50 text-center transition-all duration-500 hover:bg-aqua hover:shadow-[0_0_80px_rgba(70,212,195,0.5)]">
                <span className="font-display text-2xl italic text-foam group-hover:text-abyss">Your turn</span>
                <ArrowRight size={20} className="text-aqua transition-transform duration-500 group-hover:translate-x-1 group-hover:text-abyss" />
              </a>
            </div>
          </motion.div>
          <div className="mx-auto mt-10 w-full max-w-[1500px] px-5 md:px-10">
            <div className="h-px w-full bg-foam/10"><motion.div className="h-full origin-left bg-aqua" style={{ scaleX: scrollYProgress }} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
