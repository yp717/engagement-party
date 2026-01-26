"use client";

export default function Footer() {
  return (
    <footer className="bg-primary py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Divider */}
        <div className="w-full h-px bg-cream/30 mx-auto mb-8" />

        {/* Message */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4">

          <p className="font-serif text-sm text-cream/50 italic">
            Website built by Yannis / Supervised by Alara.
          </p>
          <p className="font-serif text-sm text-cream/50 italic">
            Established February 2021. Tinder.
          </p>
        </div>
      </div>
    </footer>
  );
}
