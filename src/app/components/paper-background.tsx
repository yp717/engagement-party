"use client";

import { PaperTexture } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

export default function PaperBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="">
      <PaperTexture
        width={dimensions.width}
        height={dimensions.height}
        image="/photos/alara-yannis-at-zaika.jpeg"
        colorBack="#fafafa"
        colorFront="#ffffff"
        contrast={0.3}
        roughness={0.4}
        fiber={0.3}
        fiberSize={0.2}
        crumples={0.3}
        crumpleSize={0.35}
        folds={0.65}
        foldCount={5}
        drops={0.2}
        fade={0}
        seed={5.8}
        scale={0.6}
        fit="cover"
      />
    </div>
  );
}
