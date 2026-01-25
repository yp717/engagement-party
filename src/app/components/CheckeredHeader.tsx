"use client";

import { motion } from "framer-motion";

interface CheckeredHeaderProps {
  title: string;
}

export default function CheckeredHeader({ title }: CheckeredHeaderProps) {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Checkered Pattern Background - Diamond Pattern */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              var(--primary) 0px,
              var(--primary) 28.28px,
              var(--cream) 28.28px,
              var(--cream) 56.56px
            ),
            repeating-linear-gradient(
              -45deg,
              var(--primary) 0px,
              var(--primary) 28.28px,
              var(--cream) 28.28px,
              var(--cream) 56.56px
            )
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      />

      {/* Central Oval with Text */}
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
            
              {/* Bow/Ribbon Icon */}
              <div className="relative flex flex-col items-center">
                <svg
                  className="w-7 h-7 md:w-9 md:h-9 mb-3 text-cream"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Left bow loop */}
                  <path d="M8 6C6 6 4 8 4 10C4 12 6 14 8 14" />
                  {/* Right bow loop */}
                  <path d="M16 6C18 6 20 8 20 10C20 12 18 14 16 14" />
                  {/* Center knot */}
                  <circle cx="12" cy="10" r="1.5" fill="currentColor" />
                  {/* Left ribbon tail */}
                  <path d="M4 10L5 13L4 16" />
                  {/* Right ribbon tail */}
                  <path d="M20 10L19 13L20 16" />
                </svg>
              
              {/* Text */}
              <h2 className="font-pinyon text-2xl md:text-3xl lg:text-4xl text-cream relative z-10">
                {title}
              </h2>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
