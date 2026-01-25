"use client";

import { motion } from "framer-motion";

const faqs = [
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
    question: "What if I have dietary restrictions?",
    answer:
      "Please indicate any dietary restrictions or allergies when you RSVP, and we will inform the venue to accommodate your needs.",
  },
  {
    question: "What is the dress code?",
    answer:
      "The dress code Cocktail Formal. Please see the Dress Code section for more information and inspiration. (If in doubt, ask Alara - that's what Yannis always does)",
  },
  {
    question: "Are children allowed at the venue?",
    answer:
      "While we love having children around, unfortunately the venue does not permit entry for anyone under the age of 12. For all invited guests names please refer to your invitation.",
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
                  <div className="w-full max-w-md border-t-1 border border-cream/40" ></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
