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
    <section className="h-screen flex items-center justify-center py-16 md:py-24 px-4 bg-cream">
      <div className="max-w-xl w-full mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
            RSVP
          </h2>
          <p className="font-serif text-sm md:text-base text-primary/60 tracking-wider">
            Please let us know if you can attend
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-serif text-primary/70 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-primary/20 focus:border-primary/50 focus:outline-none transition-colors font-serif text-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-serif text-primary/70 mb-2"
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
              className="w-full px-4 py-3 bg-white border border-primary/20 focus:border-primary/50 focus:outline-none transition-colors font-serif text-primary"
            />
          </div>

          {/* Number of Guests */}
          <div>
            <label
              htmlFor="guests"
              className="block text-sm font-serif text-primary/70 mb-2"
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
              className="w-full px-4 py-3 bg-white border border-primary/20 focus:border-primary/50 focus:outline-none transition-colors font-serif text-primary"
            />
          </div>

          {/* Dietary Requirements */}
          <div>
            <label
              htmlFor="dietary"
              className="block text-sm font-serif text-primary/70 mb-2"
            >
              Dietary Requirements or Allergies
            </label>
            <textarea
              id="dietary"
              name="dietary"
              rows={3}
              value={formData.dietary}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-primary/20 focus:border-primary/50 focus:outline-none transition-colors font-serif text-primary resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-primary text-cream font-serif text-sm tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
          >
            {submitted ? "Thank You!" : "Submit RSVP"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
