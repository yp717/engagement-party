"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CheckeredHeader from "./checkered-header";

export default function Details() {
  return (
    <section className="bg-primary w-full">
      <CheckeredHeader />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] w-full"
          >
            <div className="relative w-full h-full border-6 border-cream">
              <Image
                src="/photos/libertine-candellit-2.jpg"
                alt="Engagement party venue"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Heading */}
            <h2 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-cream">
              The Details
            </h2>

            {/* Body Text */}
            <div className="space-y-4 md:space-y-6">
              <p className="text-lg md:text-xl text-cream leading-relaxed">
                Join us for an elegant celebration at The Libertine in London.
                We are thrilled to share this special moment with our loved ones
                and look forward to celebrating with you.
              </p>
              <p className="text-lg md:text-xl text-cream leading-relaxed">
                The evening will feature a dinner, drinks, dancing (optional for
                the software engineers), and wonderful company. Your presence
                would make our celebration complete.
              </p>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 border-2 border-cream text-cream text-sm md:text-base tracking-wide uppercase rounded-full hover:bg-cream/10 transition-colors"
            >
              View
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
