import * as React from "react";

import { cn } from "../lib/utils";
interface DressCodeProps {
  className?: string;
}
export default function DressCode({ className }: DressCodeProps) {
  return (
    <section className={cn("bg-primary w-full space-y-4", className)}>
      <h3 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-cream">Dress Code</h3>
      <p className="text-md md:text-xl text-cream leading-relaxed">
        The dress code is <em className="font-semibold">cocktail formal</em>. We kindly request that men attend in suits and women in dresses.
        <br />
        We are truly thankful to have you celebrating with us.
      </p>
    </section>
  );
}
