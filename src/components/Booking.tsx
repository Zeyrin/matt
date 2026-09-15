import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Instagram, Facebook, MapPin, Send, Check, Loader2, CalendarDays, Users, Camera } from 'lucide-react';
import { Eyebrow, Reveal } from './Reveal';
import Caustics from './Caustics';

type Pkg = { id: number; name: string; price: number };
const inputWrap = 'group relative';
const labelCls = 'mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-mist transition-colors duration-300 group-focus-within:text-aqua';

export default function Booking({ selectedPackage }: { selectedPackage: string | null }) {
  const [pkgs, setPkgs] = useState<Pkg[]>([]);
  const [form, setForm] = useState({ name: '', email: '', dive_date: '', package: '', divers: '2', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [reference, setReference] = useState('');

  useEffect(() => {
    fetch('/api/packages').then((r) => (r.ok ? r.json() : [])).then((data) => Array.isArray(data) && setPkgs(data)).catch(() => {});
  }, []);
  // Sync the chosen package into the form when it changes (adjusting state during render, per React docs).
  const [syncedPackage, setSyncedPackage] = useState(selectedPackage);
  if (selectedPackage !== syncedPackage) {
    setSyncedPackage(selectedPackage);
    if (selectedPackage) setForm((f) => ({ ...f, package: selectedPackage }));
  }

  const set = (k: string, v: string) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: '' })); };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Tell me your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'A valid email, so your gallery can find you';
    if (!form.dive_date) errs.dive_date = 'Pick your dive day';
    if (!form.package) errs.package = 'Choose a package';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, divers: Number(form.divers) || 1 }) });
      if (!res.ok) throw new Error('failed');
      setReference(`ABY-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
      setStatus('done');
    } catch { setStatus('error'); }
  };

  const today = new Date().toISOString().split('T')[0];
  const pkgOptions = pkgs.length ? pkgs : [{ id: 0, name: 'The Sighting', price: 180 }, { id: 1, name: 'The Descent', price: 340 }, { id: 2, name: 'The Sail Rock', price: 520 }];

  return (
    <section id="book" className="relative overflow-hidden py-20 sm:py-28 md:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-deep/60 to-abyss" />
      <Caustics id="book" opacity={0.4} />
      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <Eyebrow>Reserve your descent</Eyebrow>
        <Reveal><h2 className="font-display mt-8 max-w-4xl text-[clamp(2.4rem,12.5vw,5rem)] font-black leading-[0.95] md:text-8xl">SEE YOU <span className="text-outline">DOWN</span><br /><span className="shimmer-text italic">THERE.</span></h2></Reveal>
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-sm">
              <img src="/img/g7.jpg" alt="Diver in cathedral light" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/55 to-abyss/20" />
              <div className="relative flex h-full min-h-[440px] flex-col justify-between p-6 sm:min-h-[520px] sm:p-8 md:p-10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-aqua">The concierge promise</p>
                  <p className="font-display mt-4 text-2xl font-light leading-snug text-foam sm:text-3xl">One message. I handle the dive shop, the boat, the light — you just show up and breathe.</p>
                </div>
                <div className="space-y-4 border-t border-foam/15 pt-6 text-sm">
                  <a href="https://www.instagram.com/vdomatt/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-foam/85 transition-colors hover:text-aqua"><span className="grid h-10 w-10 place-items-center rounded-full border border-foam/20"><Instagram size={16} /></span>DM @vdomatt on Instagram</a>
                  <a href="https://www.facebook.com/vdomatt/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-foam/85 transition-colors hover:text-aqua"><span className="grid h-10 w-10 place-items-center rounded-full border border-foam/20"><Facebook size={16} /></span>Matt Baer Underwater Videography</a>
                  <p className="flex items-center gap-4 text-foam/85"><span className="grid h-10 w-10 place-items-center rounded-full border border-foam/20"><MapPin size={16} /></span>Koh Tao, Gulf of Thailand · Daily 8:00–17:00</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="glass relative h-full overflow-hidden rounded-sm p-5 sm:p-8 md:p-12">
              <div className="animate-drift-slow pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] will-change-transform bg-[radial-gradient(circle,rgba(70,212,195,0.12),transparent_65%)]" />
              <AnimatePresence mode="wait">
                {status === 'done' ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full min-h-[480px] flex-col items-center justify-center text-center">
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }} className="animate-glow-pulse grid h-20 w-20 place-items-center rounded-full bg-aqua text-abyss"><Check size={34} strokeWidth={3} /></motion.span>
                    <h3 className="font-display mt-8 text-3xl font-light sm:text-4xl">You&apos;re on the manifest.</h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">Request <span className="text-aqua tabular-nums">{reference}</span> received. I&apos;ll confirm your light window within 24 hours — check your inbox (and your spam, the ocean is shy).</p>
                    <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', dive_date: '', package: '', divers: '2', message: '' }); }} className="mt-8 rounded-full border border-foam/25 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:border-aqua hover:text-aqua">Book another diver</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} onSubmit={submit} noValidate className="relative space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className={inputWrap}><label className={labelCls} htmlFor="bk-name">Your name</label><input id="bk-name" className="field" autoComplete="name" placeholder="Jacques Cousteau" value={form.name} onChange={(e) => set('name', e.target.value)} />{errors.name && <Err msg={errors.name} />}</div>
                      <div className={inputWrap}><label className={labelCls} htmlFor="bk-email">Email</label><input id="bk-email" type="email" inputMode="email" autoComplete="email" className="field" placeholder="you@somewhere.blue" value={form.email} onChange={(e) => set('email', e.target.value)} />{errors.email && <Err msg={errors.email} />}</div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      <div className={inputWrap}><label className={labelCls} htmlFor="bk-date"><CalendarDays size={13} /> Dive day</label><input id="bk-date" type="date" min={today} className="field" value={form.dive_date} onChange={(e) => set('dive_date', e.target.value)} />{errors.dive_date && <Err msg={errors.dive_date} />}</div>
                      <div className={inputWrap}><label className={labelCls} htmlFor="bk-divers"><Users size={13} /> Divers</label><select id="bk-divers" className="field" value={form.divers} onChange={(e) => set('divers', e.target.value)}>{[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'diver' : 'divers'}</option>)}</select></div>
                      <div className={`${inputWrap} sm:col-span-2 lg:col-span-1`}><label className={labelCls} htmlFor="bk-pkg"><Camera size={13} /> Package</label><select id="bk-pkg" className="field" value={form.package} onChange={(e) => set('package', e.target.value)}><option value="">Select…</option>{pkgOptions.map((p) => <option key={p.id} value={p.name}>{p.name} — ${p.price}</option>)}</select>{errors.package && <Err msg={errors.package} />}</div>
                    </div>
                    <div className={inputWrap}><label className={labelCls} htmlFor="bk-msg">The shot in your head <span className="text-mist/60 normal-case tracking-normal">(optional)</span></label><textarea id="bk-msg" rows={4} className="field resize-none" placeholder="Silhouette against the cenote beam, turtle optional but encouraged…" value={form.message} onChange={(e) => set('message', e.target.value)} /></div>
                    {status === 'error' && <p className="rounded-sm border border-coral/50 bg-coral/10 px-4 py-3 text-sm text-coral">The signal didn&apos;t reach the surface. Try again — or WhatsApp me directly.</p>}
                    <button type="submit" disabled={status === 'sending'} data-hover className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-foam py-5 text-[13px] font-bold uppercase tracking-[0.3em] text-abyss transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(70,212,195,0.5)] disabled:opacity-70">
                      <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-foam">{status === 'sending' ? (<><Loader2 size={17} className="animate-spin" /> Sending to the deep…</>) : (<>Request this dive <Send size={15} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" /></>)}</span>
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-teal via-aqua to-teal transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    </button>
                    <p className="text-center text-[11px] uppercase tracking-[0.3em] text-mist">No payment now · Free reschedule to 48h before</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Err({ msg }: { msg: string }) {
  return <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-xs text-coral">{msg}</motion.p>;
}
