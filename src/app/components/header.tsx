"use client";

import Link from "next/link";
import EllipticalButton from "./elliptical-button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: isMobile ? "auto" : "smooth" });
    }
  };

  const navLinks = [
    { id: "details", label: "Details" },
    { id: "our-story", label: "Our Story" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between min-w-0">
          {/* Desktop: horizontal nav */}
          <div className="hidden md:flex items-center gap-8 md:gap-12 shrink-0">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-lg underline font-light text-cream/80 hover:text-cream transition-colors whitespace-nowrap"
              >
                {label}
              </button>
            ))}
            <Link
              href="/quiz"
              className="text-lg underline font-light text-cream/80 hover:text-cream transition-colors whitespace-nowrap"
            >
              Quiz
            </Link>
          </div>

          {/* Mobile: Radix dropdown (portaled, no scroll/container issues) */}
          <div className="flex flex-1 md:flex-none md:hidden items-center min-w-0 gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="p-2 -m-2 text-cream/90 hover:text-cream transition-colors touch-manipulation rounded-md outline-none focus:ring-2 focus:ring-cream/30 focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Open menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                side="bottom"
                className="min-w-[11rem]"
              >
                {navLinks.map(({ id, label }) => (
                  <DropdownMenuItem
                    key={id}
                    onSelect={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link
                    href="/quiz"
                    className="cursor-default focus:bg-cream/10 focus:text-cream outline-none"
                  >
                    Quiz
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:block shrink-0">
            <EllipticalButton onClick={() => scrollToSection("rsvp")}>
              RSVP
            </EllipticalButton>
          </div>
          <div className="flex md:hidden shrink-0">
            <EllipticalButton onClick={() => scrollToSection("rsvp")}>
              RSVP
            </EllipticalButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
