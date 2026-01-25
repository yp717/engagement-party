"use client";

import { motion } from "framer-motion";

export default function DressCode() {
  return (
    <section className="py-24 md:py-32 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] mb-4">
            Dress Code
          </h2>
          <div className="w-24 h-px bg-[#1a1a1a]/20 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl font-serif font-light text-[#1a1a1a] mb-6">
            Cocktail Attire
          </p>
          <p className="text-lg md:text-xl text-[#1a1a1a]/70 font-light max-w-2xl mx-auto leading-relaxed">
            We invite you to dress elegantly for the occasion. Think sophisticated
            and refined—cocktail dresses, suits, or your finest evening wear.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
