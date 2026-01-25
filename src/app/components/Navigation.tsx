"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#1a1a1a]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 md:gap-12">
            <button
              onClick={() => scrollToSection("details")}
              className="text-sm md:text-base font-light text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => scrollToSection("our-story")}
              className="text-sm md:text-base font-light text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollToSection("faqs")}
              className="text-sm md:text-base font-light text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              FAQs
            </button>
          </div>
          <motion.button
            onClick={() => scrollToSection("rsvp")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 md:px-8 md:py-3 bg-[#800020] text-white font-light text-sm md:text-base tracking-wide hover:bg-[#800020]/90 transition-colors"
          >
            RSVP
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
