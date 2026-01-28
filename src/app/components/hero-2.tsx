"use client";

import { useRef, useEffect } from "react";

/**
 * Hero2 Component - Continuous Video Loop
 *
 * Displays a video that plays continuously in a loop.
 * Features curved "We're Engaged" text above the video.
 */
export default function Hero2() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // Handle autoplay restrictions gracefully
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  const videoPath = "/photos/engagi-video.MOV";

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Container */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          src={videoPath}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          style={{
            filter: "grayscale(100%) brightness(0.9) contrast(1.05)",
          }}
        >
          Your browser does not support the video tag.
        </video>

        {/* Analog Film Grain Layers - Multiple layers for depth */}
        {/* Coarse grain layer */}
        <div className="absolute inset-0 z-[5] pointer-events-none opacity-25 mix-blend-mode-overlay">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="grainCoarse">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.7"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect
              width="100%"
              height="100%"
              filter="url(#grainCoarse)"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Fine grain layer */}
        <div className="absolute inset-0 z-[5] pointer-events-none opacity-20 mix-blend-mode-overlay">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="grainFine">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="1.2"
                  numOctaves="5"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect
              width="100%"
              height="100%"
              filter="url(#grainFine)"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Medium grain layer */}
        <div className="absolute inset-0 z-[5] pointer-events-none opacity-15 mix-blend-mode-soft-light">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="grainMedium">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.95"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect
              width="100%"
              height="100%"
              filter="url(#grainMedium)"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Subtle Vignette */}
        <div
          className="absolute inset-0 z-[6] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.3) 100%)",
          }}
        />

        {/* Curved Text - Positioned on top of video */}
        <div className="absolute top-64 md:top-0 left-0 right-0 z-10 pointer-events-none">
          <svg
            viewBox="0 0 500 150"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
            style={{ marginTop: "10%" }}
          >
            <defs>
              {/* Arc path for the curved text */}
              <path id="textArc" d="M 30 120 Q 250 20, 470 120" fill="none" />
            </defs>
            <text
              className="fill-cream"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "42px",
                fontWeight: 400,
                letterSpacing: "0.15em",
              }}
            >
              <textPath href="#textArc" startOffset="50%" textAnchor="middle">
                WE&apos;RE ENGAGED
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
