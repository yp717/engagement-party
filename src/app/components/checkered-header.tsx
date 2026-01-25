"use client";

import { motion } from "framer-motion";

interface CheckeredHeaderProps {
  title?: string;
}

export default function CheckeredHeader({ title }: CheckeredHeaderProps) {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Diamond Pattern Background */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            linear-gradient(135deg, var(--cream) 25%, transparent 25%),
            linear-gradient(225deg, var(--cream) 25%, transparent 25%),
            linear-gradient(315deg, var(--cream) 25%, transparent 25%),
            linear-gradient(45deg, var(--cream) 25%, transparent 25%)
          `,
          backgroundSize: "40px 40px",
          backgroundColor: "var(--primary)",
        }}
      />

      {/* Central Oval with Text */}
      {title && (
        <div className="relative z-10 flex items-center justify-center py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Oval Background */}
            <div className="relative px-12 md:px-16 py-6 md:py-8">
              <div
                className="absolute inset-0 rounded-full border-2"
                style={{
                  backgroundColor: "var(--primary)",
                  borderColor: "var(--cream)",
                }}
              />
              <div className="relative flex flex-col items-center">
                {/* Text */}
                <h2 className="font-pinyon text-2xl md:text-3xl lg:text-4xl text-cream relative z-10">
                  {title}
                </h2>
              </div>
              )
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
