import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ClipboardCheck, Waves, Images } from 'lucide-react';
import { Eyebrow, Reveal } from './Reveal';

const STEPS = [
  { n: '01', icon: ClipboardCheck, title: 'The briefing', body: 'Book in 60 seconds. Tell me your dive site, your level, and the shot living in your head — I plan the light around your profile, not the other way round.', meta: '2 min · on the boat or online' },
  { n: '02', icon: Waves, title: 'The descent', body: 'I shadow your group like a third buddy — silent, streamlined, out of your bubbles. You dive normally. I find the beams, the schooling fish, the exact second you forget the camera.', meta: '1–2 dives · zero posing' },
  { n: '03', icon: Images, title: 'The reveal', body: 'Same evening: a private gallery hits your inbox — culled, colour-graded, print-ready. Pick your favourites, download everything, order museum prints if you fall in love.', meta: 'Same day · before dinner' },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  return (
    <section id="process" className="relative overflow-hidden py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <Eyebrow>How it works</Eyebrow>
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal><h2 className="font-display max-w-2xl text-[clamp(2rem,10.5vw,4.5rem)] font-black leading-[0.95] md:text-7xl">DIVE. <span className="text-outline">DRIFT.</span><br /><span className="shimmer-text italic">TAKE IT HOME.</span></h2></Reveal>
          <Reveal delay={0.15}><p className="max-w-xs text-sm leading-relaxed text-mist">Built for divers, not models. The whole experience bends around your dive plan — you barely notice I&apos;m there.</p></Reveal>
        </div>
        <div ref={ref} className="relative mt-14 md:mt-20">
          <div className="absolute bottom-8 left-[27px] top-8 hidden w-px bg-foam/10 md:block">
            <motion.div className="h-full w-full origin-top bg-gradient-to-b from-aqua via-teal to-coral" style={{ scaleY: scrollYProgress }} />
          </div>
          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <article data-hover className="group relative grid gap-6 rounded-sm border border-foam/10 bg-deep/30 p-6 transition-all sm:p-7 duration-500 hover:border-aqua/40 hover:bg-deep/60 hover:shadow-[0_0_60px_rgba(70,212,195,0.08)] md:grid-cols-12 md:items-center md:p-10 md:pl-24">
                  <span className="font-display text-outline-faint absolute right-4 top-3 text-6xl font-black sm:right-6 sm:top-4 sm:text-7xl transition-all duration-700 group-hover:text-transparent md:text-8xl" aria-hidden>{s.n}</span>
                  <span className="absolute left-0 top-1/2 hidden h-3 w-3 -translate-y-1/2 translate-x-[21px] rotate-45 border border-aqua bg-abyss transition-all duration-500 group-hover:bg-aqua group-hover:shadow-[0_0_16px_rgba(70,212,195,1)] md:block" />
                  <div className="md:col-span-1"><span className="grid h-14 w-14 place-items-center rounded-full border border-aqua/30 bg-abyss/60 text-aqua transition-all duration-500 group-hover:rotate-12 group-hover:border-aqua group-hover:shadow-[0_0_24px_rgba(70,212,195,0.5)]"><s.icon size={22} /></span></div>
                  <div className="md:col-span-4"><p className="text-[11px] uppercase tracking-[0.4em] text-aqua">Step {s.n}</p><h3 className="font-display mt-2 text-2xl font-light text-foam sm:text-3xl md:text-4xl">{s.title}</h3></div>
                  <p className="text-sm leading-relaxed text-mist md:col-span-5">{s.body}</p>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-sand/80 md:col-span-2 md:text-right">{s.meta}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
