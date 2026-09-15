import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Play, Youtube } from 'lucide-react';
import Caustics from './Caustics';

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{val.toLocaleString()}{suffix}</span>;
}

const STATS: [number, string, string][] = [[15, '+', 'years filming underwater'], [55, '', 'films on the channel'], [81, 'k+', 'views on YouTube'], [48, 'h', 'max. gallery delivery']];

// Real films from youtube.com/@mattbaervdomatt609. Thumbnails only — an
// embedded player costs ~1MB of JS per iframe.
const FILMS = [
  { id: 'vgTr-Dl0ldg', title: 'Ras Mohamed & Strait of Tiran', where: 'Red Sea · Sharm El Sheikh', meta: '43k views · Full HD' },
  { id: 'F2HKYfOzn5E', title: 'Sail Rock fish cloud', where: 'Gulf of Thailand · Koh Tao', meta: 'With Max from Koh Tao' },
  { id: 'MytLcVno0_0', title: 'Turtles of Naama Bay', where: 'Red Sea · Sharm El Sheikh', meta: 'With Circle Divers' },
  { id: 'FwLQR0tA18o', title: 'Gordon & Jackson Reef corals', where: 'Strait of Tiran', meta: 'Full HD' },
];

export default function DepthSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);
  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-44">
      <motion.div style={{ y: bgY }} className="absolute -inset-y-[16%] inset-x-0 will-change-transform">
        <img src="/img/g4.jpg" alt="Ocean surface from below" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-abyss/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-transparent to-abyss" />
      <Caustics id="depth" opacity={0.5} />
      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <p className="text-center text-[11px] uppercase tracking-[0.5em] text-aqua">The logbook</p>
        <h2 className="font-display mx-auto mt-6 max-w-4xl text-center text-4xl font-light leading-tight md:text-6xl">Two seas. One lens.<span className="italic text-aqua"> Fifteen years of weightless footage.</span></h2>
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-foam/10 bg-foam/10 lg:grid-cols-4">
          {STATS.map(([n, suffix, label]) => (
            <div key={label} className="group bg-abyss/85 p-8 transition-colors duration-500 hover:bg-deep/90 md:p-10" data-hover>
              <p className="font-display text-4xl text-foam transition-colors duration-500 group-hover:text-aqua md:text-6xl"><CountUp to={n} suffix={suffix} /></p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-mist">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 flex items-center gap-4">
          {['0m', '10m', '20m', '30m', '40m'].map((d, i) => (
            <div key={d} className="flex flex-1 items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <span className={`h-2 w-2 rotate-45 ${i === 2 ? 'bg-aqua shadow-[0_0_12px_rgba(70,212,195,1)]' : 'bg-foam/25'}`} />
                <span className={`text-[10px] tabular-nums tracking-widest ${i === 2 ? 'text-aqua' : 'text-mist'}`}>{d}</span>
              </div>
              {i < 4 && <span className="h-px flex-1 bg-gradient-to-r from-foam/20 to-transparent" />}
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.35em] text-mist">Most frames happen between 12–28 m — Sail Rock, Ras Mohamed, Tiran</p>

        <div className="mt-24 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-aqua">From the channel</p>
            <h3 className="font-display mt-4 text-3xl font-light text-foam md:text-5xl">Watch the water <span className="italic text-aqua">move.</span></h3>
          </div>
          <a href="https://www.youtube.com/@mattbaervdomatt609" target="_blank" rel="noreferrer" data-hover className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-mist transition-colors hover:text-aqua">
            All 55 films on YouTube <Youtube size={16} className="text-aqua transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FILMS.map((f) => (
            <a key={f.id} href={`https://www.youtube.com/watch?v=${f.id}`} target="_blank" rel="noreferrer" data-cursor-label="Play" className="group relative overflow-hidden rounded-[3px] border border-foam/10 bg-abyss/80 transition-colors duration-500 hover:border-aqua/50">
              <div className="relative aspect-video overflow-hidden">
                <img src={`https://i.ytimg.com/vi/${f.id}/hqdefault.jpg`} alt={f.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/10 to-transparent" />
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-foam/40 bg-abyss/60 text-foam transition-all duration-500 group-hover:border-aqua group-hover:bg-aqua group-hover:text-abyss"><Play size={18} className="ml-0.5" fill="currentColor" /></span>
              </div>
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-aqua">{f.where}</p>
                <p className="font-display mt-1 text-xl font-light text-foam">{f.title}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-mist">{f.meta}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
