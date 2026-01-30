"use client";

import { motion } from "framer-motion";

export default function Contact() {
  const scrollToRsvp = () => {
    const el = document.getElementById("rsvp");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-primary w-full min-h-screen flex flex-col items-center justify-between py-16 md:py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto text-center flex-1 flex flex-col justify-center"
      >
        <h2 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-cream mb-6 md:mb-8">
          Contact us
        </h2>
        <p className="font-serif text-cream/85 text-base md:text-lg leading-relaxed mb-8">
          For any questions, please contact Alara and Yannis.
        </p>
        <div className="space-y-3 font-serif text-cream/90">
          <p>
            <span className="text-cream/50 text-sm tracking-wide uppercase mr-2">
              Phone / WhatsApp
            </span>
            <a
              href="tel:+447551721858"
              className="underline hover:text-cream transition-colors"
            >
              +44 7551 721 858
            </a>
          </p>
          <p>
            <span className="text-cream/50 text-sm tracking-wide uppercase mr-2">
              Email
            </span>
            <a
              href="mailto:alarakopuz@gmail.com"
              className="underline hover:text-cream transition-colors"
            >
              alarakopuz@gmail.com
            </a>
          </p>
        </div>
      </motion.div>

      {/* Scroll cue for RSVP below */}
      <motion.button
        type="button"
        onClick={scrollToRsvp}
        className="flex flex-col items-center gap-2 text-cream/70 hover:text-cream transition-colors pb-4 md:pb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <span className="font-serif text-xs md:text-sm tracking-[0.2em] uppercase">
          Keep going for the RSVP
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.span>
      </motion.button>
    </section>
  );
}
