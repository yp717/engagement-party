"use client";

import { useRef, useEffect } from "react";

/**
 * Hero2 Component - Continuous Video Loop
 *
 * Displays a video that plays continuously in a loop.
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
    <div className="relative w-full bg-transparent overflow-hidden flex items-center justify-center py-8 md:py-12">
      <div className="relative w-[80%] max-w-[800px] aspect-[4/3] border-8 border-white">
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
      </div>
    </div>
  );
}
