"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What time should I arrive?",
    answer: "Please arrive 15 minutes before the event begins to allow time for seating.",
  },
  {
    question: "Is there parking available?",
    answer: "Limited parking is available. We recommend using public transportation or ride-sharing services.",
  },
  {
    question: "Can I bring a plus one?",
    answer: "Please check your invitation for the number of guests included. If you need to add additional guests, please contact us.",
  },
  {
    question: "What if I have dietary restrictions?",
    answer: "Please indicate any dietary restrictions or allergies when you RSVP, and we will accommodate your needs.",
  },
  {
    question: "What is the dress code?",
    answer: "Cocktail attire is requested. Please see the Dress Code section for more details.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 px-4 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] mb-4">
            FAQs
          </h2>
          <div className="w-24 h-px bg-[#1a1a1a]/20 mx-auto"></div>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border-b border-[#1a1a1a]/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left hover:text-[#800020] transition-colors"
              >
                <span className="text-lg md:text-xl font-light text-[#1a1a1a]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#1a1a1a]/60 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pb-6"
                >
                  <p className="text-base md:text-lg text-[#1a1a1a]/70 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
