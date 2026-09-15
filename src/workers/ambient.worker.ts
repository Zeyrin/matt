type Bubble = { x: number; y: number; r: number; speed: number; wobble: number; phase: number; stroke: string; fill: string };
type Mote = { x: number; y: number; r: number; dx: number; dy: number; fill: string };

let canvas: OffscreenCanvas | null = null;
let ctx: OffscreenCanvasRenderingContext2D | null = null;
let w = 0, h = 0, dpr = 1;
let bubbles: Bubble[] = [];
let motes: Mote[] = [];
let raf = 0;
let skip = false;

function seed() {
  const area = (w * h) / (1440 * 800);
  const nb = Math.round(18 * Math.max(0.5, area));
  const nm = Math.round(45 * Math.max(0.5, area));
  bubbles = Array.from({ length: nb }, () => {
    const alpha = 0.12 + Math.random() * 0.4;
    return { x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 5.5, speed: 0.25 + Math.random() * 0.9, wobble: 0.4 + Math.random() * 1.4, phase: Math.random() * Math.PI * 2, stroke: `rgba(159,240,226,${alpha})`, fill: `rgba(233,245,241,${Math.min(0.85, alpha + 0.25)})` };
  });
  motes = Array.from({ length: nm }, () => {
    const alpha = 0.06 + Math.random() * 0.22;
    return { x: Math.random() * w, y: Math.random() * h, r: 0.4 + Math.random() * 1.4, dx: (Math.random() - 0.5) * 0.22, dy: (Math.random() - 0.5) * 0.16, fill: `rgba(159,240,226,${alpha})` };
  });
}

function resize(width: number, height: number) {
  w = width; h = height;
  if (canvas) { canvas.width = w * dpr; canvas.height = h * dpr; }
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  seed();
}

function tick() {
  raf = requestAnimationFrame(tick);
  skip = !skip;
  if (skip || !ctx) return;
  ctx.clearRect(0, 0, w, h);
  for (const m of motes) {
    m.x += m.dx * 2; m.y += m.dy * 2;
    if (m.x < -10) m.x = w + 10;
    if (m.x > w + 10) m.x = -10;
    if (m.y < -10) m.y = h + 10;
    if (m.y > h + 10) m.y = -10;
    ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.fillStyle = m.fill; ctx.fill();
  }
  for (const b of bubbles) {
    b.y -= b.speed * 2; b.phase += 0.04;
    const x = b.x + Math.sin(b.phase) * b.wobble * 8;
    if (b.y < -12) { b.y = h + 12; b.x = Math.random() * w; }
    ctx.beginPath(); ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
    ctx.strokeStyle = b.stroke; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.arc(x - b.r * 0.3, b.y - b.r * 0.3, Math.max(0.4, b.r * 0.22), 0, Math.PI * 2);
    ctx.fillStyle = b.fill; ctx.fill();
  }
}

type InitMsg = { type: 'init'; canvas: OffscreenCanvas; width: number; height: number; dpr: number };
type ResizeMsg = { type: 'resize'; width: number; height: number };

self.onmessage = (e: MessageEvent<InitMsg | ResizeMsg>) => {
  const msg = e.data;
  if (msg.type === 'init') {
    canvas = msg.canvas;
    ctx = canvas.getContext('2d');
    dpr = msg.dpr;
    resize(msg.width, msg.height);
    if (!raf) raf = requestAnimationFrame(tick);
  } else if (msg.type === 'resize') {
    resize(msg.width, msg.height);
  }
};
