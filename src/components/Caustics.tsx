import { useRef } from 'react';
import { useOffscreenPause } from '../hooks/useOffscreenPause';

// One transform-animated gradient layer, promoted to the compositor once
// (will-change) so the animation is a single GPU quad draw per frame.
// No blend mode, no filters, no second layer — those were what made the
// old version expensive.
export default function Caustics({ className = '', opacity = 0.5 }: { className?: string; opacity?: number; id?: string }) {
  const causticRef = useRef<HTMLDivElement>(null);
  useOffscreenPause(causticRef);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        ref={causticRef}
        className="animate-caustic absolute inset-0 will-change-transform"
        style={{
          opacity,
          background: `
            repeating-linear-gradient(115deg, transparent 0 34px, rgba(120,230,215,0.10) 34px 36px, transparent 36px 90px),
            repeating-linear-gradient(64deg, transparent 0 52px, rgba(159,240,226,0.12) 52px 54px, transparent 54px 120px),
            radial-gradient(60% 45% at 30% 20%, rgba(70,212,195,0.22), transparent 70%),
            radial-gradient(55% 45% at 72% 65%, rgba(14,124,134,0.30), transparent 70%)
          `,
        }}
      />
    </div>
  );
}
