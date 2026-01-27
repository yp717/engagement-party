"use client";

import { cn } from "../lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import EllipticalButton from "./elliptical-button";

interface PhotoGalleryProps {
  className?: string;
}

export default function PhotoGallery({ className }: PhotoGalleryProps) {
  return (
    <section className={cn("bg-cream w-full min-h-screen overflow-y-auto py-16 md:py-24", className)}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 w-full">
        {/* Photo Gallery on Metal Plate */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-5xl aspect-[4/3]">
            {/* Metal Plate Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-[1000px] max-h-[750px] md:max-w-[1200px] md:max-h-[900px]">
                <Image
                  src="/photos/metal-plate.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 600px, (max-width: 1024px) 1000px, 1200px"
                  quality={90}
                />
              </div>
            </div>

            {/* Polaroid Photos */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Photo 1 - Scotland Analog (back layer, rotated left) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute z-10"
                style={{
                  left: "15%",
                  top: "20%",
                  transform: "rotate(-12deg)",
                }}
              >
                <div className="relative bg-white p-2 md:p-3 shadow-2xl">
                  <div className="relative w-[180px] h-[240px] md:w-[220px] md:h-[293px] overflow-hidden">
                    <Image
                      src="/photos/scotland-analog.jpeg"
                      alt="Scotland"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 180px, 220px"
                      quality={90}
                    />
                    {/* Film grain overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Photo 2 - Core Clare Smyth (middle layer, rotated right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 10 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute z-20"
                style={{
                  left: "35%",
                  top: "15%",
                  transform: "rotate(10deg)",
                }}
              >
                <div className="relative bg-white p-2 md:p-3 shadow-2xl">
                  <div className="relative w-[200px] h-[267px] md:w-[240px] md:h-[320px] overflow-hidden">
                    <Image
                      src="/photos/core-clare-smyth.jpeg"
                      alt="Core Clare Smyth"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 200px, 240px"
                      quality={90}
                    />
                    {/* Film grain overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Photo 3 - Yannis and Alara at LAL's Birthday (front layer, rotated left) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute z-30"
                style={{
                  left: "65%",
                  top: "25%",
                  transform: "rotate(-6deg)",
                }}
              >
                <div className="relative bg-white p-2 md:p-3 shadow-2xl">
                  <div className="relative w-[190px] h-[253px] md:w-[230px] md:h-[307px] overflow-hidden">
                    <Image
                      src="/photos/yannis-and-alara-lals-birthday.jpeg"
                      alt="Yannis and Alara"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 190px, 230px"
                      quality={90}
                    />
                    {/* Film grain overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Matchbox - Top of the tray */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="absolute z-[40]"
                style={{
                  right: "50%",
                  left: "auto",
                  top: "50%",
                  transform: "rotate(-8deg)",
                }}
              >
                <div className="relative w-[120px] h-[160px] md:w-[180px] md:h-[248px]">
                  <Image
                    src="/photos/matchbox.png"
                    alt="Matchbox"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100px, 120px"
                    quality={90}
                  />
                </div>
              </motion.div>

              {/* Pearls - Bottom left of the tray */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -15 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute z-[45]"
                style={{
                  left: "5%",
                  top: "53%",
                  transform: "rotate(-15deg)",
                }}
              >
                <div className="relative w-[280px] h-[200px] md:w-[360px] md:h-[260px]">
                  <Image
                    src="/pearls.png"
                    alt="Pearls"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 280px, 360px"
                    quality={90}
                  />
                </div>
              </motion.div>

              {/* Seashell - Bottom right of the tray */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.95 }}
                className="absolute z-[100]"
                style={{
                  right: "30%",
                  left: "auto",
                  top: "68%",
                  transform: "rotate(12deg)",
                }}
              >
                <div className="relative w-[180px] h-[140px] md:w-[220px] md:h-[100px]">
                  <Image
                    src="/photos/seashell.png"
                    alt="Seashell"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 180px, 220px"
                    quality={90}
                  />
                </div>
              </motion.div>

              {/* Kalla Lilies - Decorative trinkets on the tray */}
              {/* First Lily (back layer) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 100 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 100 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute z-[50]"
                style={{
                  left: "35%",
                  top: "45%",
                  transform: "rotate(100deg)",
                }}
              >
                <div className="relative w-[576px] h-[288px] md:w-[720px] md:h-[360px]">
                  <Image
                    src="/photos/kalla-lily.png"
                    alt="Kalla Lily"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 576px, 720px"
                    quality={90}
                  />
                </div>
              </motion.div>

              {/* Second Lily (front layer, stacked on top) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 75 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 75 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute z-[55]"
                style={{
                  left: "30%",
                  top: "38%",
                  transform: "rotate(75deg)",
                }}
              >
                <div className="relative w-[648px] h-[324px] md:w-[792px] md:h-[396px]">
                  <Image
                    src="/photos/kalla-lily.png"
                    alt="Kalla Lily"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 648px, 792px"
                    quality={90}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-center font-pinyon text-5xl">
          How well do you know the couple?
        </h3>
        <p>
          Can't get enough? Take the quiz to test just how well you know us!
        </p>
        <EllipticalButton href="/quiz">Take the quiz</EllipticalButton>
      </div>
    </section>
  );
}
