"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    question: "What time should I arrive?",
    answer:
      "Please arrive 15 minutes before the event begins to allow time for seating.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Limited parking is available. We recommend using public transportation or ride-sharing services.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "Please check your invitation for the number of guests included. If you need to add additional guests, please contact us.",
  },
  {
    question: "What if I have dietary restrictions?",
    answer:
      "Please indicate any dietary restrictions or allergies when you RSVP, and we will accommodate your needs.",
  },
  {
    question: "What is the dress code?",
    answer:
      "Cocktail attire is requested. Please see the Dress Code section for more details.",
  },
];

export default function FAQs() {
  return (
    <section className="py-24 md:py-32 px-4 bg-primary">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
            We&apos;ve got answer
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
              className="text-center"
            >
              {/* Question */}
              <h3 className="text-lg md:text-xl lg:text-2xl font-light text-cream uppercase tracking-wide mb-4 md:mb-6">
                {faq.question}
              </h3>

              {/* Answer */}
              <p className="font-serif text-base md:text-lg lg:text-xl text-cream leading-relaxed text-left max-w-2xl mx-auto mb-6 md:mb-8">
                {faq.answer}
              </p>

              {/* Dotted Divider - Only show if not last item */}
              {index < faqs.length - 1 && (
                <div className="flex justify-center pt-4 md:pt-6">
                  <div className="w-full max-w-md border-t border-dotted border-cream/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
