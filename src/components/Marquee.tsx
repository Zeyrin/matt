export default function Marquee({ items, fast = false, outline = false }: { items: string[]; fast?: boolean; outline?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-aqua/15 bg-deep/40 py-5">
      <div className={`${fast ? 'animate-marquee-fast' : 'animate-marquee'} flex w-max items-center gap-10 whitespace-nowrap pr-10 will-change-transform`}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={`font-display text-3xl font-light uppercase tracking-wide md:text-4xl ${outline ? 'text-outline-faint' : i % 2 ? 'text-foam/85' : 'shimmer-text'}`}>{item}</span>
            <span className="h-2 w-2 rotate-45 bg-aqua/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
