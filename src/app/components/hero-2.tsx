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

        {/* Curved Text - Positioned on top of video */}
        <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
          <svg
            viewBox="0 0 500 150"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
            style={{ marginTop: "10%" }}
          >
            <defs>
              {/* Arc path for the curved text */}
              <path
                id="textArc"
                d="M 30 120 Q 250 20, 470 120"
                fill="none"
              />
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
              <textPath
                href="#textArc"
                startOffset="50%"
                textAnchor="middle"
              >
                WE&apos;RE ENGAGED
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
