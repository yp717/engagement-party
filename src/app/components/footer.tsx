"use client";

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/** Delay (s) and (dx, dy) end offset (px) for each heart – varied angles */
const HEART_BUBBLES: { delay: number; dx: number; dy: number }[] = [
  { delay: 0, dx: 0, dy: -36 },
  { delay: 0.18, dx: 14, dy: -33 },
  { delay: 0.36, dx: -14, dy: -33 },
  { delay: 0.54, dx: 20, dy: -28 },
  { delay: 0.72, dx: -20, dy: -28 },
  { delay: 0.9, dx: 8, dy: -35 },
  { delay: 1.08, dx: -8, dy: -35 },
];

export default function Footer() {
  return (
    <footer className="bg-primary py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Divider */}
        <div className="w-full h-px bg-cream/30 mx-auto mb-8" />

        {/* Message */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 overflow-visible">
          <p className="font-serif text-sm text-cream/50 italic overflow-visible">
            Website built by Yannis / Supervised by{" "}
            <span className="group-heart-bubble relative inline-flex items-baseline">
              <span className="relative cursor-default">Alara</span>
              {/* Hearts container – static heart + bubbling hearts on hover */}
              <span className="relative inline-block ml-0.5 w-4 h-4 align-baseline">
                {/* Default: single heart always visible */}
                <span className="heart-static absolute left-0 bottom-0 pointer-events-none text-cream/80">
                  <HeartIcon className="w-3 h-3" />
                </span>
                {/* Bubbling hearts – animate on hover, reset on leave */}
                {HEART_BUBBLES.map(({ delay, dx, dy }, i) => (
                  <span
                    key={i}
                    className="heart-bubble absolute left-0 bottom-0 pointer-events-none text-cream/80 whitespace-nowrap"
                    style={
                      {
                        animationDelay: `${delay}s`,
                        ["--dx"]: `${dx}px`,
                        ["--dy"]: `${dy}px`,
                      } as React.CSSProperties
                    }
                  >
                    <HeartIcon className="w-3 h-3" />
                  </span>
                ))}
              </span>
              .
            </span>
          </p>
          <p className="font-serif text-sm text-cream/50 italic">
            Established February 2021. Tinder.
          </p>
        </div>
      </div>
    </footer>
  );
}
