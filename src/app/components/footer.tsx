"use client";

export default function Footer() {
  return (
    <footer className="bg-primary py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Names */}
        <h3 className="font-pinyon text-3xl md:text-4xl text-cream mb-4">
          Alara &amp; Yannis
        </h3>

        {/* Date */}
        <p className="font-serif text-sm md:text-base text-cream/70 tracking-wider mb-8">
          11th July 2026
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-cream/30 mx-auto mb-8" />

        {/* Message */}
        <p className="font-serif text-sm text-cream/50 italic">
          Made with love for our celebration
        </p>
      </div>
    </footer>
  );
}
