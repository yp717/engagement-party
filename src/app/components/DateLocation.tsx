"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import CheckeredHeader from "./CheckeredHeader";

export default function DateLocation() {
  return (
    <section className="">
      <CheckeredHeader title="The Details" />
      <div className="max-w-4xl mx-auto mt-16">

        <div className="space-y-12 md:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8"
          >
            <div className="flex-shrink-0">
              <Calendar className="w-8 h-8 text-[#1a1a1a]/60" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1a1a1a] mb-2">
                Date
              </h3>
              <p className="text-lg md:text-xl text-[#1a1a1a]/70 font-light">
                To be announced
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8"
          >
            <div className="flex-shrink-0">
              <Clock className="w-8 h-8 text-[#1a1a1a]/60" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1a1a1a] mb-2">
                Time
              </h3>
              <p className="text-lg md:text-xl text-[#1a1a1a]/70 font-light">
                To be announced
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8"
          >
            <div className="flex-shrink-0">
              <MapPin className="w-8 h-8 text-[#1a1a1a]/60" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1a1a1a] mb-2">
                Location
              </h3>
              <p className="text-lg md:text-xl text-[#1a1a1a]/70 font-light mb-2">
                The Libertine
              </p>
              <p className="text-base md:text-lg text-[#1a1a1a]/60 font-light">
                London, United Kingdom
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
