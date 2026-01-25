import * as React from "react";

import { cn } from "../lib/utils";

interface TransportationProps {
  className?: string;
}

export default function Transportation({ className }: TransportationProps) {
  return (
    <section className={cn("bg-primary w-full space-y-4", className)}>
      <h3 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-cream">
        Transportation
      </h3>
      <p className="text-md md:text-xl text-cream leading-relaxed">
        Transportation will not be provided to the venue. The venue is easily
        accessible by Tube, Bus, and Taxi. There is no parking available at the
        venue. The nearest Tube Station is <em>Bank Station</em> just 1 minute
        away, and <em>Liverpool Street Station</em> is a 10 minute walk away.
      </p>
    </section>
  );
}
