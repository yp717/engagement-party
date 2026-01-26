"use client";

import { cn } from "../lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

interface OurStoryProps {
  className?: string;
}

export default function OurStory({ className }: OurStoryProps) {
  return (
    <section className={cn("bg-cream w-full min-h-screen overflow-y-auto py-16 md:py-24", className)}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
            Our Story
          </h2>
        </motion.div>

        {/* Centered Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12 md:mb-16"
        >
          <div className="relative bg-white p-1 md:p-1.5 shadow-lg">
            <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[533px] lg:w-[500px] lg:h-[667px] overflow-hidden">
              <Image
                src="/photos/black-and-white-post-engagement.jpeg"
                alt="Yannis and Alara"
                fill
                className="object-cover"
                style={{
                  filter: "grayscale(100%) brightness(0.9) contrast(1.05)",
                }}
                sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
                quality={90}
                priority
              />
              
              {/* Analog Film Grain Layers - Multiple layers for depth */}
              {/* Coarse grain layer */}
              <div className="absolute inset-0 z-[5] pointer-events-none opacity-25 mix-blend-overlay">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="grainCoarseStory">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.7"
                        numOctaves="3"
                        stitchTiles="stitch"
                      />
                      <feColorMatrix
                        type="saturate"
                        values="0"
                      />
                    </filter>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    filter="url(#grainCoarseStory)"
                    opacity="0.5"
                  />
                </svg>
              </div>

              {/* Fine grain layer */}
              <div className="absolute inset-0 z-[5] pointer-events-none opacity-20 mix-blend-overlay">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="grainFineStory">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="1.2"
                        numOctaves="5"
                        stitchTiles="stitch"
                      />
                      <feColorMatrix
                        type="saturate"
                        values="0"
                      />
                    </filter>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    filter="url(#grainFineStory)"
                    opacity="0.3"
                  />
                </svg>
              </div>

              {/* Medium grain layer */}
              <div className="absolute inset-0 z-[5] pointer-events-none opacity-15 mix-blend-soft-light">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="grainMediumStory">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.95"
                        numOctaves="4"
                        stitchTiles="stitch"
                      />
                      <feColorMatrix
                        type="saturate"
                        values="0"
                      />
                    </filter>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    filter="url(#grainMediumStory)"
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
            </div>
          </div>
        </motion.div>

        {/* Story Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-6 md:space-y-8"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            Alara and Yannis first met in 2020, at the quiet end of the
            pandemic. When the world was slowly finding its rhythm again they
            found each other.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            Over the years, they shared places, moments, and ordinary days that
            slowly grew into something steady and lasting. They taught each
            other how to love, how to care, and how to be patient. Alara tried
            to keep up with Yannis&apos; ever-growing list of restaurants and
            recipes, and Yannis learned that Alara&apos;s stories always take
            the scenic route, with every possible detour and no particular rush
            to end.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            Their engagement brought them back to where it all began.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            In May 2025, Yannis planned a trip to Scotland — their first trip
            together, years earlier, and a place that had always held a quiet
            significance for them. They travelled by sleeper train to Edinburgh,
            then on through the Highlands, letting the landscape unfold slowly
            around them.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            On the very first day, standing in the rain on the cobbled steps of
            Edinburgh’s Old Town, overlooking the city below, Yannis asked Alara
            to marry him.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            She said yes.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            And so, with full hearts and a story that feels beautifully
            complete, they begin their next chapter. And we would like you to be
            a part of it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
