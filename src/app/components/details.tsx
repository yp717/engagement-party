"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const hotels = [
  { name: "The Ned", time: "3 min walk" },
  { name: "NoMad", time: "15 min drive" },
  { name: "Vintry & Mercer", time: "10 min walk" },
  { name: "Double Tree By Hilton", time: "8 min drive" },
  { name: "Club Quarters", time: "6 min drive" },
  { name: "Bankside Hotel", time: "12 min drive" },
  { name: "Leonardo Royal London St Paul's", time: "9 min drive" },
  { name: "Pan Pacific", time: "7 min drive" },
  { name: "Locke at Broken Wharf", time: "10 min drive" },
];

const detailBlocks = [
  {
    label: "Stay",
    title: "Accommodation",
    children: (
      <>
        <p className="text-cream/85 leading-relaxed mb-4">
          There are a number of wonderful hotels close to the venue. Below are a
          few we recommend — or stay anywhere in London; the venue is easily
          accessible by public transport. Need area or activity recommendations?
          Just ask.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-cream/75 text-sm md:text-base">
          {hotels.map((h) => (
            <li key={h.name} className="flex justify-between gap-2">
              <span className="font-serif">{h.name}</span>
              <span className="text-cream/50 shrink-0">{h.time}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    label: "Getting there",
    title: "Transportation",
    children: (
      <p className="text-cream/85 leading-relaxed">
        The venue is easily accessible by Tube, Bus, and Taxi. The nearest Tube
        is <em className="font-medium text-cream/95">Bank Station</em> (1 min),
        and <em className="font-medium text-cream/95">Liverpool Street</em> is a
        10 minute walk. There is no parking at the venue.
      </p>
    ),
  },
  {
    label: "Attire",
    title: "Dress Code",
    children: (
      <p className="text-cream/85 leading-relaxed">
        <em className="font-medium text-cream/95">Cocktail formal</em> — We
        would love to see our family and friends dressed up with us! The dress
        code is Cocktail Formal. Think suits for men, tie optional, and
        cocktail/floor length dresses for women. The venue will be inside so no
        need to worry about a rainy London summer.
      </p>
    ),
  },
];

export default function Details() {
  return (
    <section className="relative bg-primary w-full min-h-screen flex items-center overflow-hidden">
      {/* Subtle atmosphere: gradient + grain */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(245,243,237,0.15), transparent 50%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(245,243,237,0.08), transparent 50%)",
          }}
        />
        <div className="absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="detailsGrain">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.9"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#detailsGrain)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-serif text-cream/50 text-xs md:text-sm tracking-[0.2em] uppercase mb-2">
            Practical information
          </p>
          <h2 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-cream">
            The Details
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="w-12 h-px bg-cream/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-cream/30" />
            <span className="w-24 h-px bg-cream/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-cream/30" />
            <span className="w-12 h-px bg-cream/20" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-start">
          {/* Left: Image with editorial frame */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 md:order-1"
          >
            <div className="relative aspect-[4/3] w-full">
              {/* Outer frame line */}
              <div className="absolute -inset-[1px] border border-cream/15 rounded-sm" />
              {/* Inner content area */}
              <div className="absolute inset-2 md:inset-3 rounded-sm overflow-hidden border border-cream/10">
                <Image
                  src="/photos/libertine-candellit-2.jpg"
                  alt="The Libertine venue"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
              </div>
              {/* Corner accent */}
              <div
                className="absolute -bottom-2 -right-2 w-16 h-16 md:w-20 md:h-20 border-r border-b border-cream/20 rounded-br-sm pointer-events-none"
                aria-hidden
              />
            </div>
          </motion.div>

          {/* Right: Detail blocks with staggered animation */}
          <div className="space-y-8 md:space-y-10 order-1 md:order-2">
            {detailBlocks.map((block, i) => (
              <motion.article
                key={block.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-5 md:pl-6 border-l border-cream/15"
              >
                <p className="font-serif text-cream/45 text-[11px] md:text-xs tracking-[0.18em] uppercase mb-1.5">
                  {block.label}
                </p>
                <h3 className="font-pinyon text-2xl md:text-3xl text-cream mb-3">
                  {block.title}
                </h3>
                <div className="space-y-1">{block.children}</div>
              </motion.article>
            ))}

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="pt-6 mt-6 border-t border-cream/10"
            >
              <p className="font-serif text-sm text-cream/50 italic">
                More information will be shared closer to the date.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
