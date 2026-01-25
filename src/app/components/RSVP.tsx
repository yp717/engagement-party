"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "",
    dietary: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission (API route or form service)
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-24 md:py-32 px-4 bg-[#fafafa]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] mb-4">
            RSVP
          </h2>
          <div className="w-24 h-px bg-[#1a1a1a]/20 mx-auto"></div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-light text-[#1a1a1a]/70 mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#1a1a1a]/10 focus:border-[#1a1a1a]/30 focus:outline-none transition-colors font-light text-[#1a1a1a]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-light text-[#1a1a1a]/70 mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#1a1a1a]/10 focus:border-[#1a1a1a]/30 focus:outline-none transition-colors font-light text-[#1a1a1a]"
            />
          </div>

          <div>
            <label
              htmlFor="guests"
              className="block text-sm font-light text-[#1a1a1a]/70 mb-2"
            >
              Number of Guests *
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              required
              min="1"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#1a1a1a]/10 focus:border-[#1a1a1a]/30 focus:outline-none transition-colors font-light text-[#1a1a1a]"
            />
          </div>

          <div>
            <label
              htmlFor="dietary"
              className="block text-sm font-light text-[#1a1a1a]/70 mb-2"
            >
              Dietary Restrictions or Allergies
            </label>
            <textarea
              id="dietary"
              name="dietary"
              rows={3}
              value={formData.dietary}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#1a1a1a]/10 focus:border-[#1a1a1a]/30 focus:outline-none transition-colors font-light text-[#1a1a1a] resize-none"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto px-12 py-4 bg-[#800020] text-white font-light tracking-wider uppercase text-sm hover:bg-[#800020]/90 transition-colors"
          >
            {submitted ? "Thank You!" : "Submit RSVP"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
