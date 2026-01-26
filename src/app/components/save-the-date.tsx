"use client";

import { motion } from "framer-motion";

export default function SaveTheDate() {
  return (
    <section className="h-screen w-full bg-cream flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-4 sm:py-6 md:py-12 lg:py-16 overflow-visible">
      <div className="relative w-full max-w-4xl sm:max-w-5xl">
        {/* SVG Frame - responsive sizing */}
        <div className="absolute -inset-6 sm:-inset-8 md:-inset-12 lg:-inset-16 xl:-inset-20 flex items-center justify-center pointer-events-none">
          <div
            className="w-full h-full bg-contain bg-center bg-no-repeat opacity-100 frame-responsive"
            style={{
              backgroundImage: "url('/sketches/frame-1-svg.svg')",
              filter: "brightness(0) saturate(100%) invert(10%) sepia(15%) saturate(2000%) hue-rotate(320deg) brightness(0.2)",
            }}
          />
        </div>

        {/* Content positioned inside the frame */}
        <div className="relative z-10 text-center py-8 sm:py-12 md:py-16 lg:py-20 px-6 sm:px-10 md:px-12 lg:px-16">
          {/* Save the Date Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-pinyon text-5xl md:text-6xl lg:text-7xl text-primary mb-6 md:mb-8"
          >
            Save the Date
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-sm md:text-base lg:text-lg text-primary/70 tracking-[0.2em] uppercase mb-12 md:mb-16"
          >
            To Celebrate the Engagement of Alara &amp; Yannis
          </motion.p>

          {/* When and Where */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-2xl mx-auto"
          >
            {/* When */}
            <div className="text-center">
              <h3 className="font-cursive text-3xl md:text-4xl text-primary mb-2">
                When
              </h3>
              <p className="font-serif text-lg md:text-xl text-primary/80">
                11th July 2026
              </p>
            </div>

            {/* Where */}
            <div className="text-center">
              <h3 className="font-cursive text-3xl md:text-4xl text-primary mb-2">
                Where
              </h3>
              <p className="font-serif text-lg md:text-xl text-primary/80">
                The Libertine, London
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
