"use client";

import { motion } from "framer-motion";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export default function SaveTheDate() {
  return (
    <section className="relative min-h-screen w-full bg-cream flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Atmosphere: subtle grain */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(44,2,20,0.04), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 z-[1] opacity-[0.035] mix-blend-multiply">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="saveTheDateGrain">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#saveTheDateGrain)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Invitation card: CSS border frame, fully responsive */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="relative border-2 border-primary/90 bg-cream py-10 sm:py-14 md:py-16 px-6 sm:px-10 md:px-14"
        >
          {/* Inner frame line */}
          <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-primary/15 pointer-events-none rounded-sm" />

          <div className="relative text-center">
            {/* Small lead-in */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: easeOutExpo }}
              className="font-serif text-primary/60 text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 sm:mb-6"
            >
              We hope you can join us
            </motion.p>

            {/* Main title */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: easeOutExpo }}
              className="font-pinyon text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary mb-3 sm:mb-4"
            >
              Save the Date
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35, ease: easeOutExpo }}
              className="font-serif text-sm sm:text-base md:text-lg text-primary/75 tracking-[0.2em] uppercase mb-8 sm:mb-10 md:mb-12"
            >
              To Celebrate the Engagement of <br />Alara &amp; Yannis
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45, ease: easeOutExpo }}
              className="flex items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12"
            >
              <span className="w-8 sm:w-12 h-px bg-primary/25" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <span className="w-16 sm:w-24 h-px bg-primary/25" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <span className="w-8 sm:w-12 h-px bg-primary/25" />
            </motion.div>

            {/* When & Where */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55, ease: easeOutExpo }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 md:gap-16"
            >
              <div className="text-center sm:text-left sm:border-r border-primary/15 sm:pr-8 md:pr-12">
                <p className="font-serif text-primary/50 text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-1.5">
                  When
                </p>
                <p className="font-pinyon text-2xl sm:text-3xl md:text-4xl text-primary">
                  11th July 2026
                </p>
              </div>
              <div className="text-center sm:text-right sm:pl-8 md:pl-12">
                <p className="font-serif text-primary/50 text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-1.5">
                  Where
                </p>
                <p className="font-pinyon text-2xl sm:text-3xl md:text-4xl text-primary">
                  The Libertine, London
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
