import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eyebrow, Reveal, SplitWords } from './Reveal';

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const ghostX = useTransform(scrollYProgress, [0, 1], ['4%', '-12%']);

  return (
    <section ref={ref} id="story" className="relative overflow-hidden py-20 sm:py-28 md:py-40">
      <motion.span style={{ x: ghostX }} className="text-outline-faint font-display pointer-events-none absolute top-10 left-0 select-none whitespace-nowrap will-change-transform text-[22vw] font-black uppercase leading-none opacity-60" aria-hidden>
        Weightless — Weightless
      </motion.span>
      <div className="relative mx-auto grid max-w-[1500px] gap-12 px-5 md:gap-16 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>The man behind the lens</Eyebrow>
          <h2 className="font-display mt-8 text-3xl font-light leading-[1.12] text-foam sm:text-4xl md:text-6xl">
            <SplitWords text="Thirty metres down, the noise stops. I film divers the way the ocean sees them —" />
            <span className="font-display italic text-aqua"> suspended, weightless, briefly belonging to the blue.</span>
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <Reveal delay={0.1}><p className="text-sm leading-relaxed text-mist">I&apos;m <span className="text-foam">Matt Baer</span> — underwater videographer and dive instructor. Berlin-born, fifteen years behind the lens, from the walls of Ras Mohamed in the Red Sea to my home reef at Sail Rock, Koh Tao. Every morning I descend before the first boat, find the light, and wait for you to fall through it.</p></Reveal>
            <Reveal delay={0.2}><p className="text-sm leading-relaxed text-mist">No posing. No interrupting your dive. Just cathedral light, drifting particles, and <span className="text-foam">you — mid-water, mid-breath</span>. Your gallery is ready before your wetsuit is dry.</p></Reveal>
          </div>
          <Reveal delay={0.25} className="mt-12">
            <div className="flex flex-wrap gap-x-12 gap-y-6 border-t border-foam/10 pt-8">
              {[['15+ yrs', 'Filming underwater'], ['55 films', '80k+ views on YouTube'], ['2 seas', 'Red Sea & Gulf of Thailand']].map(([a, b]) => (
                <div key={a}><p className="font-display text-3xl text-foam">{a}</p><p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-mist">{b}</p></div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="relative lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal delay={0.15}>
              <div className="group relative" data-cursor-label="Matt">
                <div className="absolute -inset-3 rounded-sm border border-aqua/30 transition-transform duration-700 group-hover:-translate-x-2 group-hover:translate-y-2" />
                <div className="relative overflow-hidden rounded-sm">
                  <motion.img src="/img/portrait.jpg" alt="Underwater videographer Matt Baer" loading="lazy" decoding="async" style={{ y: imgY }} className="img-deep h-[420px] w-full scale-110 object-cover will-change-transform sm:h-[540px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                    <div><p className="font-display text-2xl italic text-foam">Matt Baer</p><p className="text-[10px] uppercase tracking-[0.35em] text-aqua">Videographer · Dive instructor · Koh Tao</p></div>
                    <span className="rounded-full border border-aqua/40 bg-abyss/60 px-3 py-1 text-[10px] tabular-nums tracking-widest text-aqua">−24 m</span>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3} className="mt-6">
              <blockquote className="border-l-2 border-coral/70 pl-5 font-display text-lg italic leading-relaxed text-foam/80">
                “He didn&apos;t just film our dive. He filmed the feeling of it.”
                <footer className="mt-2 text-[11px] not-italic uppercase tracking-[0.3em] text-mist">— Fun divers, Sail Rock</footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
