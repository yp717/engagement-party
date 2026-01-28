"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import WineGlass from "./sketches/wine-glass";
import Heart1 from "./sketches/heart-1";
import Heart2 from "./sketches/heart-2";
import Candlestick from "./sketches/candlestick";
import Chandelier from "./sketches/chandelier";
import BubblesTiltLeft from "./sketches/bubbles-tilt-left";
import Bird from "./sketches/bird";
import Heart3 from "./sketches/heart-3";

const faqs = [
  {
    question: "By what date should I RSVP?",
    answer:
      "Please RSVP by the 28th February 2026. If you we don't receive your RSVP by this date, we will assume you are unable to attend.",
  },
  {
    question: "What time should I arrive?",
    answer: "The final time of the event will be announced closer to the date.",
  },
  {
    question: "Is there parking available?",
    answer:
      "There is no parking available at the venue. Please see the Details section for more information.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "We have included the names of all invited guests on the invitations. Unfortunately, due to limited capacity at the venue, we are not able to accommodate any additional guests.",
  },
  {
    question: "Are children allowed at the venue?",
    answer:
      "While we love having children around, unfortunately the venue does not permit entry for anyone under the age of 12. If are any children are invited they will be listed on your invitation. Thank you for your understanding.",
  },
  {
    question: "What if I have dietary restrictions?",
    answer:
      "Please indicate any dietary restrictions or allergies when you RSVP, and we will inform the venue to accommodate your needs.",
  },
  {
    question: "What is the dress code?",
    answer:
      "Please see the Details section for more information and inspiration. (If in doubt, ask Alara - that's what Yannis always does)",
  },
];

export default function FAQs() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for decorative elements
  const wineGlassY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heartY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const heart2Y = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const candlestickY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const chandelierY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const bubblesY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const birdY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const heart3Y = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex items-start py-24 md:py-32 px-4 bg-primary overflow-y-auto"
    >
      {/* Decorative SVG Elements with Parallax */}
      {/* Wine Glass - Top Right */}
      <motion.div
        style={{ y: wineGlassY }}
        className="absolute top-20 right-8 md:right-20 opacity-40 pointer-events-none hidden md:block"
      >
        <WineGlass
          className="w-24 md:w-32 h-auto"
          style={{ color: "var(--cream)" }}
        />
      </motion.div>

      {/* Heart - Middle Left */}
      <motion.div
        style={{ y: heartY }}
        className="absolute top-[650px] left-16 md:left-52 opacity-50 pointer-events-none"
      >
        <Heart1
          className="w-12 md:w-16 h-auto"
          style={{ color: "var(--cream)" }}
        />
      </motion.div>

      {/* Heart 2 - Middle Right */}
      <motion.div
        style={{ y: heart2Y }}
        className="absolute top-[800px] right-8 md:right-20 opacity-40 pointer-events-none hidden md:block"
      >
        <Heart2
          className="w-14 md:w-18 h-auto"
          style={{ color: "var(--cream)" }}
        />
      </motion.div>

      {/* Candlestick - Bottom Right */}
      <motion.div
        style={{ y: candlestickY }}
        className="absolute bottom-32 right-12 md:right-24 opacity-30 pointer-events-none hidden lg:block"
      >
        <Candlestick
          className="w-12 md:w-16 h-auto"
          style={{ color: "var(--cream)" }}
        />
      </motion.div>

      {/* Chandelier - Top Right */}
      <motion.div
        style={{ y: chandelierY }}
        className="absolute top-96 right-6 md:right-64 opacity-40 pointer-events-none hidden lg:block"
      >
        <Chandelier
          className="w-16 md:w-20 h-auto"
          style={{ color: "var(--cream)" }}
        />
      </motion.div>

      {/* Bubbles - Top Left */}
      <motion.div
        style={{ y: bubblesY }}
        className="absolute top-40 left-8 md:left-20 opacity-50 pointer-events-none hidden md:block"
      >
        <BubblesTiltLeft
          className="w-14 md:w-18 h-auto"
          style={{ color: "var(--cream)" }}
        />
      </motion.div>

      {/* Heart 3 - Left, between Bubbles and Bird */}
      <motion.div
        style={{ y: heart3Y }}
        className="absolute top-[1160px] left-20 md:left-40 opacity-45 pointer-events-none hidden md:block"
      >
        <Heart3
          className="w-11 md:w-14 h-auto"
          style={{ color: "var(--cream)" }}
        />
      </motion.div>

      {/* Bird - Bottom Left */}
      <motion.div
        style={{ y: birdY }}
        className="absolute bottom-32 left-8 md:left-20 opacity-40 pointer-events-none hidden md:block"
      >
        <Bird
          className="w-16 md:w-20 h-auto"
          style={{ color: "var(--cream)" }}
        />
      </motion.div>

      <div className="max-w-3xl mx-auto w-full my-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-left mb-16 md:mb-20"
        >
          <h2 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
            You&apos;ve got questions, Alara&apos;s got answers.
          </h2>
        </motion.div>

        {/* FAQ Items - All Expanded */}
        <div className="space-y-8 md:space-y-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-left"
            >
              {/* Question */}
              <h3 className="text-lg md:text-xl lg:text-2xl font-light text-cream uppercase tracking-wide mb-4 md:mb-6">
                {faq.question}
              </h3>

              {/* Answer */}
              <p className="font-serif text-base md:text-lg lg:text-xl text-cream leading-relaxed mb-6 md:mb-8">
                {faq.answer}
              </p>

              {/* Dotted Divider - Only show if not last item */}
              {index < faqs.length - 1 && (
                <div className="flex justify-start pt-4 md:pt-6">
                  <div className="w-full max-w-md border-t-1 border border-cream/40"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
