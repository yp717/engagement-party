"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EllipticalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function EllipticalButton({
  children,
  onClick,
  className = "",
}: EllipticalButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-10 py-4 md:px-12 md:py-4 bg-primary text-white font-light text-sm md:text-base tracking-wide uppercase hover:bg-primary/90 transition-colors ${className}`}
      style={{
        clipPath: "ellipse(50% 40% at 50% 50%)",
      }}
    >
      {children}
    </motion.button>
  );
}
