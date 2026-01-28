"use client";

import { cn } from "../lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

interface OurStoryProps {
  className?: string;
}

export default function OurStory({ className }: OurStoryProps) {
  return (
    <section
      className={cn(
        "bg-cream w-full min-h-screen overflow-y-auto py-16 md:py-24",
        className
      )}
    >
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
                      <feColorMatrix type="saturate" values="0" />
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
                      <feColorMatrix type="saturate" values="0" />
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
                      <feColorMatrix type="saturate" values="0" />
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
            Alara and Yannis first met in 2021, at the quiet end of the
            pandemic. When the world was slowly finding its rhythm again, they
            found each other.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            Through lots of memories, special moments, and laughter, they slowly
            grew into a life they love sharing and building together. They
            taught each other how to love, how to laugh, and how to embrace the
            moments in between. Throughout the years, Alara tried to keep up
            with Yannis&apos; ever-growing list of restaurants and recipes,
            knowing full well they would likely never reach the end. And Yannis
            came to love that Alara&apos;s stories always take the scenic route
            — filled with every possible detour and absolutely no hurry to reach
            the end.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            In May 2025 Yannis planned a trip that brought them back to their
            first holiday together - Edinburgh.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            As they embarked on a trip around the Scottish Highlands by train,
            Yannis had planned to make an already sentimental place even more
            special. On the very first day of their trip (because he
            couldn&apos;t wait), standing in the rain on the cobbled steps of
            Edinburgh&apos;s Old Town, overlooking the city below, Yannis asked
            Alara to marry him…
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            … and she said yes!
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-primary leading-relaxed">
            And so, with full hearts and a story that feels like it&apos;s only
            just beginning, we move onto the next chapter of our lives. And we
            would love for you all to be a part of it!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
