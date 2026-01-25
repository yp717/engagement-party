"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
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
            Contact
          </h2>
          <div className="w-24 h-px bg-[#1a1a1a]/20 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-8"
        >
          <p className="text-lg md:text-xl text-[#1a1a1a]/70 font-light leading-relaxed max-w-2xl mx-auto">
            If you have any questions or need assistance, please don't hesitate
            to reach out to us.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 pt-8">
            <motion.a
              href="mailto:contact@example.com"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-light">Email Us</span>
            </motion.a>

            <motion.a
              href="tel:+1234567890"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-light">Call Us</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-[#1a1a1a]/10 text-center space-y-2"
        >
          <p className="text-sm text-[#1a1a1a]/50 font-light">
            © {new Date().getFullYear()} Yannis & Alara. All rights reserved.
          </p>
          <p className="text-xs text-[#1a1a1a]/40 font-light italic">
            Website built by Yannis. All supervision done by Alara.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
