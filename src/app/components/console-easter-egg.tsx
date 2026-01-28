"use client";

import { useEffect } from "react";

export function ConsoleEasterEgg() {
  useEffect(() => {
    const asciiArt = `
    ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡
    ♡                               ♡
    ♡   Yannis  &  Alara            ♡
    ♡   ─────────────────           ♡
    ♡   engagement party 2026       ♡
    ♡                               ♡
    ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡
    `;

    const styles = [
      "color: #c9a0a0",
      "font-size: 12px",
      "font-family: monospace",
      "line-height: 1.4",
    ].join(";");

    console.log("%c" + asciiArt, styles);
    console.log(
      "%cWhat are you doing here? 👀\n\nThis is my little engineering corner.\n\nIf you're reading this, you're one of the curious ones — and we like that.\n\nHere's a secret: building this site was a labour of love. Every pixel, every animation, every line of code... all for one very special day.\n\nSo from our hearts to yours: thanks for peeking. Now go enjoy the party (and maybe don't tell everyone you found the secret message). 💕\n\n— Y & A",
      "color: #8b7355; font-size: 13px; line-height: 1.6; font-family: Georgia, serif;"
    );
  }, []);

  return null;
}
