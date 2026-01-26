"use client";

import { ReactNode } from "react";

interface DecorativeFrameProps {
  children: ReactNode;
  className?: string;
  lineClassName?: string;
}

export default function DecorativeFrame({
  children,
  className = "",
  lineClassName = "border-white/40",
}: DecorativeFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer frame lines */}
      <div className="absolute inset-4 pointer-events-none">
        {/* Top line */}
        <div
          className={`absolute top-0 left-6 right-6 h-px border-t ${lineClassName}`}
        />
        {/* Bottom line */}
        <div
          className={`absolute bottom-0 left-6 right-6 h-px border-t ${lineClassName}`}
        />
        {/* Left line */}
        <div
          className={`absolute left-0 top-6 bottom-6 w-px border-l ${lineClassName}`}
        />
        {/* Right line */}
        <div
          className={`absolute right-0 top-6 bottom-6 w-px border-l ${lineClassName}`}
        />

        {/* Top-left corner */}
        <svg
          className="absolute -top-px -left-px w-7 h-7"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M 0 28 L 0 6 Q 0 0, 6 0 L 28 0"
            className={`stroke-current ${lineClassName.replace("border-", "text-")}`}
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Top-right corner */}
        <svg
          className="absolute -top-px -right-px w-7 h-7"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M 0 0 L 22 0 Q 28 0, 28 6 L 28 28"
            className={`stroke-current ${lineClassName.replace("border-", "text-")}`}
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Bottom-left corner */}
        <svg
          className="absolute -bottom-px -left-px w-7 h-7"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M 0 0 L 0 22 Q 0 28, 6 28 L 28 28"
            className={`stroke-current ${lineClassName.replace("border-", "text-")}`}
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Bottom-right corner */}
        <svg
          className="absolute -bottom-px -right-px w-7 h-7"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M 28 0 L 28 22 Q 28 28, 22 28 L 0 28"
            className={`stroke-current ${lineClassName.replace("border-", "text-")}`}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 p-10">{children}</div>
    </div>
  );
}
