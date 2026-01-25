"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "/photos/black-and-white-post-engagement.jpeg",
  "/photos/core-clare-smyth.jpeg",
  "/photos/istanbul-bosphorus.jpeg",
  "/photos/alaras-birthday.jpeg",
  "/photos/alara-yannis-at-zaika.jpeg",
  "/photos/scotland-analog.jpeg",
  "/photos/yannis-and-alara-lals-birthday.jpeg",
];

// Duplicate images for seamless infinite scroll
const duplicatedImages = [...images, ...images];

export default function Hero() {
  return (
    <div className="relative w-full bg-white overflow-hidden pt-20">
      {/* Text Above Carousel */}
      <div className="py-12 md:py-16 px-4 text-center">
        <h1 className="font-cursive text-5xl md:text-7xl lg:text-8xl font-normal text-[#1a1a1a] tracking-wide mb-2 lowercase">
          alara and yannis
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light text-[#1a1a1a]/70 tracking-widest lowercase mt-2">
          engagement party
        </p>
      </div>

      {/* Horizontal Scrolling Carousel */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <motion.div
          className="flex h-full items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative flex-shrink-0 w-[50vw] md:w-[40vw] lg:w-[33vw] h-[400px] md:h-[500px] lg:h-[600px]"
            >
              <Image
                src={src}
                alt={`Engagement photo ${(index % images.length) + 1}`}
                fill
                className="object-cover"
                priority={index < 2}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 33vw"
                quality={90}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
