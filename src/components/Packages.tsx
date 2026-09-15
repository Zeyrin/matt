import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Eyebrow, Reveal } from './Reveal';

type Pkg = { id: number; name: string; price: number; tagline: string; features: string[]; highlight: boolean };
const FALLBACK: Pkg[] = [
  { id: 1, name: 'The Sighting', price: 180, tagline: 'One dive, distilled to its best seconds.', features: ['1 guided fun dive shadowed', '10 edited portraits', 'Private online gallery', '48-hour delivery'], highlight: false },
  { id: 2, name: 'The Descent', price: 340, tagline: 'The full arc of a two-tank morning.', features: ['2 dives shadowed', '25 edited portraits', '1 vertical video clip for socials', 'Same-evening delivery', 'Priority light planning'], highlight: true },
  { id: 3, name: 'The Sail Rock', price: 520, tagline: 'A whole day in the blue, cinema-grade.', features: ['Full day · all dives', '60+ edited portraits', 'Edited 4K dive film (3–5 min)', 'Fine-art A3 print included', 'Sunset longtail session free'], highlight: false },
];

export default function Packages({ selected, onSelect }: { selected: string | null; onSelect: (name: string) => void }) {
  const [pkgs, setPkgs] = useState<Pkg[]>(FALLBACK);
  useEffect(() => {
    fetch('/api/packages').then((r) => (r.ok ? r.json() : null)).then((data) => { if (Array.isArray(data) && data.length) setPkgs(data); }).catch(() => {});
  }, []);
  const choose = (name: string) => { onSelect(name); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <section id="packages" className="relative py-28 md:py-40">
      <div className="animate-drift-slow pointer-events-none absolute left-[-15%] top-[10%] h-[760px] w-[760px] will-change-transform bg-[radial-gradient(circle,rgba(14,124,134,0.28),rgba(14,124,134,0.08)_40%,transparent_68%)]" />
      <div className="animate-drift-slow pointer-events-none absolute right-[-12%] top-[45%] h-[700px] w-[700px] will-change-transform bg-[radial-gradient(circle,rgba(10,74,99,0.5),rgba(10,74,99,0.15)_40%,transparent_68%)]" style={{ animationDelay: '-9s' }} />
      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <Eyebrow>Packages</Eyebrow>
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal><h2 className="font-display text-5xl font-black leading-[0.95] md:text-7xl">OWN THE <span className="text-outline-aqua">BLUE</span></h2></Reveal>
          <Reveal delay={0.15}><p className="max-w-xs text-sm leading-relaxed text-mist">Transparent pricing, no per-photo upsells. Every package includes full-resolution downloads with printing rights.</p></Reveal>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pkgs.map((p, i) => {
            const active = selected === p.name;
            return (
              <Reveal key={p.id} delay={i * 0.12} className={p.highlight ? 'lg:-mt-6' : ''}>
                <motion.article whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} data-hover onClick={() => choose(p.name)}
                  className={`group relative overflow-hidden rounded-sm p-8 md:p-10 ${p.highlight ? 'border border-aqua/60 bg-gradient-to-b from-ocean/80 to-deep/90 shadow-[0_0_80px_rgba(70,212,195,0.15)]' : 'glass'} ${active ? 'ring-2 ring-aqua' : ''}`}>
                  {p.highlight && <div className="absolute inset-x-0 top-0 flex items-center justify-center gap-2 bg-aqua py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-abyss"><Sparkles size={12} /> Most chosen <Sparkles size={12} /></div>}
                  <div className={p.highlight ? 'pt-6' : ''}>
                    <h3 className="font-display text-3xl font-light text-foam">{p.name}</h3>
                    <p className="mt-2 min-h-[40px] text-sm italic text-mist">{p.tagline}</p>
                    <p className="mt-6 flex items-baseline gap-2"><span className="text-sm text-mist">from</span><span className={`font-display text-6xl font-black ${p.highlight ? 'shimmer-text' : 'text-foam'}`}>${p.price}</span></p>
                    <ul className="mt-8 space-y-3.5 border-t border-foam/10 pt-8">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-foam/80">
                          <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${p.highlight ? 'bg-aqua text-abyss' : 'border border-aqua/50 text-aqua'}`}><Check size={12} strokeWidth={3} /></span>{f}
                        </li>
                      ))}
                    </ul>
                    <span className={`mt-10 block rounded-full py-4 text-center text-[12px] font-bold uppercase tracking-[0.28em] transition-all duration-500 ${p.highlight ? 'bg-aqua text-abyss group-hover:shadow-[0_0_40px_rgba(70,212,195,0.6)]' : 'border border-foam/25 text-foam group-hover:border-aqua group-hover:bg-aqua group-hover:text-abyss'}`}>{active ? 'Selected ✓' : 'Choose this dive'}</span>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.2} className="mt-10"><p className="text-center text-xs uppercase tracking-[0.3em] text-mist">All dives include tanks, weights &amp; marine-park fees handled · Groups of 4+ save 15%</p></Reveal>
      </div>
    </section>
  );
}
