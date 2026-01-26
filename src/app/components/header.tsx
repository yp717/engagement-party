"use client";

import Link from "next/link";
import EllipticalButton from "./elliptical-button";

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 md:gap-12">
            <button
              onClick={() => scrollToSection("details")}
              className="text-lg underline font-light text-cream/80 hover:text-cream transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => scrollToSection("our-story")}
              className="text-lg underline font-light text-cream/80 hover:text-cream transition-colors"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollToSection("faqs")}
              className="text-lg underline font-light text-cream/80 hover:text-cream transition-colors"
            >
              FAQs
            </button>
            <Link
              href="/quiz"
              className="text-lg underline font-light text-cream/80 hover:text-cream transition-colors"
            >
              Quiz
            </Link>
          </div>
          <EllipticalButton onClick={() => scrollToSection("rsvp")}>
            RSVP
          </EllipticalButton>
        </div>
      </div>
    </nav>
  );
}
