"use client";

import { motion } from "framer-motion";
import RibbonSketch from "./ribbon-sketch";
import Footer from "./footer";

export default function RSVP() {
  const scrollToTop = () => {
    const element = document.getElementById("hero");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="h-screen relative flex items-center justify-center py-16 md:py-24 px-2 sm:px-4 bg-primary overflow-hidden">
      {/* Footer positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Footer />
      </div>
      <div className="relative w-full max-w-3xl">
        {/* White Oval Frame - More oval on mobile */}
        <div className="relative w-full min-w-[90vw] sm:min-w-0 aspect-[2.5/1] sm:aspect-[2.2/1] flex items-center justify-center">
          {/* Oval Border */}
          <div
            className="absolute inset-0 rounded-full border-12 border-cream"
            style={{
              borderRadius: "50%",
            }}
          />

          {/* Content inside oval */}
          <div className="relative z-10 text-center px-8 md:px-16 py-8 md:py-10 flex flex-col items-center justify-center">
            {/* Ribbon Sketch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="-mb-8"
            >
              <RibbonSketch className="text-cream w-32 md:w-40 lg:w-48" />
            </motion.div>

            {/* Main Question */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-cream mb-6 md:mb-8"
            >
              Will you be joining us?
            </motion.h2>

            {/* RSVP Button */}
            <motion.a
              href="/rsvp"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-serif text-lg md:text-xl text-cream tracking-[0.3em] uppercase mb-4 md:mb-6 hover:text-cream/80 transition-colors cursor-pointer"
            >
              RSVP HERE
            </motion.a>

            {/* Back to Top Link */}
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-serif text-sm md:text-base text-cream tracking-[0.3em] uppercase underline hover:text-cream/80 transition-colors"
            >
              BACK TO TOP
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
