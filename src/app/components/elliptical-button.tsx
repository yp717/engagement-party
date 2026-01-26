"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

const buttonClass =
  "inline-flex items-center justify-center px-10 py-4 md:px-12 md:py-4 bg-primary text-white font-light text-sm md:text-base tracking-wide uppercase hover:bg-primary/90 transition-colors";
const buttonStyle = { clipPath: "ellipse(50% 40% at 50% 50%)" as const };

interface EllipticalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function EllipticalButton({
  children,
  onClick,
  href,
  className = "",
}: EllipticalButtonProps) {
  if (href) {
    const MotionLink = motion(Link);
    return (
      <MotionLink
        href={href}
        className={`${buttonClass} ${className}`}
        style={buttonStyle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${buttonClass} ${className}`}
      style={buttonStyle}
    >
      {children}
    </motion.button>
  );
}
