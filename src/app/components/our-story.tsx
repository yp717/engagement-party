"use client";

import { cn } from "../lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

interface OurStoryProps {
  className?: string;
}

const photos = [
  {
    src: "/photos/black-and-white-post-engagement.jpeg",
    alt: "Post engagement",
    rotate: 0,
    top: "15%",
    left: "5%",
    zIndex: 3,
    width: { mobile: 140, tablet: 180, desktop: 220 },
    height: { mobile: 180, tablet: 230, desktop: 280 },
  },
  {
    src: "/photos/scotland-analog.jpeg",
    alt: "Scotland",
    rotate: 0,
    top: "5%",
    left: "24%",
    zIndex: 3,
    width: { mobile: 180, tablet: 240, desktop: 450 },
    height: { mobile: 130, tablet: 170, desktop: 315 },
  },
  {
    src: "/photos/alaras-birthday.jpeg",
    alt: "Alara's Birthday",
    rotate: 0,
    top: "35%",
    left: "16%",
    zIndex: 4,
    width: { mobile: 130, tablet: 170, desktop: 200 },
    height: { mobile: 170, tablet: 220, desktop: 260 },
  },
  {
    src: "/photos/alara-yannis-at-zaika.jpeg",
    alt: "At Zaika",
    rotate: 0,
    top: "25%",
    left: "55%",
    zIndex: 0,
    width: { mobile: 200, tablet: 260, desktop: 320 },
    height: { mobile: 140, tablet: 180, desktop: 220 },
  },
];

export default function OurStory({ className }: OurStoryProps) {
  return (
    <section className={cn("bg-cream w-full py-16 md:py-24", className)}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
            Our Story
          </h2>
        </motion.div>

        {/* Photo Collage */}
        <div className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
          <style>
            {photos.map(
              (photo, index) => `
              .photo-frame-${index} {
                width: ${photo.width.mobile}px;
                height: ${photo.height.mobile}px;
              }
              @media (min-width: 768px) {
                .photo-frame-${index} {
                  width: ${photo.width.tablet}px;
                  height: ${photo.height.tablet}px;
                }
              }
              @media (min-width: 1024px) {
                .photo-frame-${index} {
                  width: ${photo.width.desktop}px;
                  height: ${photo.height.desktop}px;
                }
              }
            `
            )}
          </style>
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: photo.rotate }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="absolute"
              style={{
                top: photo.top,
                left: photo.left,
                transform: `rotate(${photo.rotate}deg)`,
                zIndex: photo.zIndex,
              }}
            >
              {/* Photo Frame with White Border */}
              <div className="relative bg-white p-1 md:p-1.5 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`relative overflow-hidden photo-frame-${index}`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover sepia-[60%] brightness-90 contrast-105"
                    sizes={`(max-width: 768px) ${photo.width.mobile}px, (max-width: 1024px) ${photo.width.tablet}px, ${photo.width.desktop}px`}
                    quality={85}
                  />
                  {/* Sepia overlay for warmer tone */}
                  <div className="absolute inset-0 bg-[#704214]/10 mix-blend-multiply" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
