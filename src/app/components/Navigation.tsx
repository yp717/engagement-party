"use client";

import EllipticalButton from "./elliptical-button";

export default function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 md:gap-12">
            <button
              onClick={() => scrollToSection("details")}
              className="text-sm md:text-base font-light text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => scrollToSection("our-story")}
              className="text-sm md:text-base font-light text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollToSection("faqs")}
              className="text-sm md:text-base font-light text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              FAQs
            </button>
          </div>
          <EllipticalButton onClick={() => scrollToSection("rsvp")}>
            RSVP
          </EllipticalButton>
        </div>
      </div>
    </nav>
  );
}
