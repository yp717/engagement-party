"use client";

import Image from "next/image";
import { useState, useRef } from "react";

/**
 * Hero2 Component - Live Photo Effect
 *
 * Displays a static image that transitions to a video on hover,
 * creating an iPhone Live Photo-like experience.
 */
export default function Hero2() {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((error) => {
        // Handle autoplay restrictions gracefully
        console.log("Video autoplay prevented:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const staticImagePath = "/photos/istanbul-couple.jpg";
  const videoPath = "/photos/engagi-video.MOV";

  return (
    <div className="relative w-full bg-transparent overflow-hidden flex items-center justify-center py-8 md:py-12">
      <div
        className="relative w-[80%] max-w-[800px] aspect-[4/3] cursor-pointer border-8 border-white"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Static Image - Always visible, fades out on hover */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isHovering ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={staticImagePath}
            alt="Yannis and Alara in Istanbul"
            fill
            className="object-cover grayscale brightness-90 contrast-105"
            priority
            sizes="(max-width: 768px) 80vw, 600px"
            quality={90}
          />
        </div>

        {/* Video - Plays on hover, fades in */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            filter: "grayscale(100%) brightness(0.9) contrast(1.05)",
          }}
        >
          <video
            ref={videoRef}
            src={videoPath}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
