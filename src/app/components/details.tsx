"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Details() {
  return (
    <section className="bg-cream w-full h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
            The Details
          </h2>
          <div className="w-24 h-px bg-primary/20 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] w-full"
          >
            <div className="relative w-full h-full border-4 border-primary/20">
              <Image
                src="/photos/libertine-candellit-2.jpg"
                alt="The Libertine venue"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
            </div>
          </motion.div>

          {/* Right Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Transportation */}
            <div className="space-y-3">
              <h3 className="font-cursive text-2xl md:text-3xl text-primary">
                Transportation
              </h3>
              <p className="text-base md:text-lg text-primary/80 leading-relaxed">
                The venue is easily accessible by Tube, Bus, and Taxi. The
                nearest Tube Station is <em className="font-medium">Bank Station</em> just
                1 minute away, and <em className="font-medium">Liverpool Street Station</em> is
                a 10 minute walk. There is no parking available at the venue.
              </p>
            </div>

            {/* Dress Code */}
            <div className="space-y-3">
              <h3 className="font-cursive text-2xl md:text-3xl text-primary">
                Dress Code
              </h3>
              <p className="text-base md:text-lg text-primary/80 leading-relaxed">
                The dress code is <em className="font-medium">cocktail formal</em>. We
                kindly request that men attend in suits and women in dresses.
              </p>
            </div>

            {/* Additional Note */}
            <div className="pt-4 border-t border-primary/10">
              <p className="text-sm md:text-base text-primary/60 italic">
                More information will be shared closer to the date.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
