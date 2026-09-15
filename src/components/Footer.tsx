import { useRef } from 'react';
import { ArrowUp, Instagram, Youtube, Facebook } from 'lucide-react';
import { Reveal } from './Reveal';
import { useOffscreenPause } from '../hooks/useOffscreenPause';

export default function Footer() {
  const refractionRef = useRef<HTMLDivElement>(null);
  useOffscreenPause(refractionRef);

  return (
    <footer className="relative overflow-hidden border-t border-aqua/15">
      <div ref={refractionRef} className="refraction-bg absolute inset-0 opacity-25" />
      <div className="absolute -bottom-60 left-1/2 h-[30rem] w-[150%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(14,124,134,0.22),rgba(14,124,134,0.06)_45%,transparent_70%)]" />
      <div className="relative mx-auto max-w-[1500px] px-5 pb-10 pt-20 md:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <h2 className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-black leading-[0.9]">DON&apos;T JUST<br /><span className="text-outline">DIVE IT.</span> <span className="italic text-aqua">KEEP IT.</span></h2>
            <a href="#book" data-hover className="group flex shrink-0 items-center gap-3 rounded-full bg-aqua px-8 py-4 text-[12px] font-bold uppercase tracking-[0.25em] text-abyss transition-all duration-500 hover:shadow-[0_0_50px_rgba(70,212,195,0.7)]">
              Book your shoot
              <span className="grid h-6 w-6 place-items-center rounded-full bg-abyss text-aqua transition-transform duration-500 group-hover:-translate-y-1"><ArrowUp size={14} className="rotate-45" /></span>
            </a>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-10 border-t border-foam/10 pt-10 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl">VDOMATT</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-mist">Matt Baer · Underwater videography · Koh Tao & Red Sea</p>
            <div className="mt-5 flex gap-3">
              {[[Instagram, 'https://www.instagram.com/vdomatt/', 'Instagram @vdomatt'], [Youtube, 'https://www.youtube.com/@mattbaervdomatt609', 'YouTube — Matt Baer vdomatt'], [Facebook, 'https://www.facebook.com/vdomatt/', 'Facebook — Matt Baer Underwater Videography']].map(([Icon, href, label]) => (
                <a key={label as string} href={href as string} target="_blank" rel="noreferrer" aria-label={label as string} className="grid h-10 w-10 place-items-center rounded-full border border-foam/20 text-foam/70 transition-all duration-500 hover:-translate-y-1 hover:border-aqua hover:text-aqua hover:shadow-[0_0_20px_rgba(70,212,195,0.4)]"><Icon size={16} /></a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-aqua">Dive sites</p>
            <ul className="mt-4 space-y-2 text-sm text-foam/70"><li>Sail Rock · Gulf of Thailand</li><li>Chumphon Pinnacle · Koh Tao</li><li>Ras Mohamed · Red Sea</li><li>Strait of Tiran · Red Sea</li></ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-aqua">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-foam/70">
              <li><a href="#work" className="transition-colors hover:text-aqua">Selected work</a></li>
              <li><a href="#story" className="transition-colors hover:text-aqua">About Matt</a></li>
              <li><a href="#process" className="transition-colors hover:text-aqua">Process</a></li>
              <li><a href="#packages" className="transition-colors hover:text-aqua">Packages</a></li>
              <li><a href="https://www.youtube.com/@mattbaervdomatt609" target="_blank" rel="noreferrer" className="transition-colors hover:text-aqua">Films on YouTube</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-between gap-6 md:items-end">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-hover className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-mist transition-colors hover:text-aqua">
              Surface
              <span className="grid h-12 w-12 place-items-center rounded-full border border-foam/20 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-aqua"><ArrowUp size={17} /></span>
            </button>
            <p className="text-[11px] uppercase tracking-[0.3em] text-mist/60 md:text-right">© 2026 Matt Baer · vdomatt<br />Berlin roots · Koh Tao waters · never in a pool</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
