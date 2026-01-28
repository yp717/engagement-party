"use client";

import { cn } from "../lib/utils";
import Image from "next/image";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import EllipticalButton from "./elliptical-button";
import { useState, useRef, useEffect } from "react";

interface PhotoGalleryProps {
  className?: string;
}

interface DraggableItemProps {
  children: React.ReactNode;
  initial?: any;
  whileInView?: any;
  viewport?: any;
  transition?: any;
  className?: string;
  initialLeft?: string;
  initialRight?: string;
  initialTop?: string;
  position: ItemPosition;
  onDragEnd: (x: number, y: number) => void;
}

function DraggableItem({
  children,
  initial,
  whileInView,
  viewport,
  transition,
  className,
  initialLeft,
  initialRight,
  initialTop,
  position,
  onDragEnd,
}: DraggableItemProps) {
  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);

  // Sync motion values with position state
  useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position.x, position.y, x, y]);

  const handleDragEnd = () => {
    const currentX = x.get();
    const currentY = y.get();
    onDragEnd(currentX, currentY);
  };

  const style: React.CSSProperties = {
    ...(initialLeft !== undefined && { left: initialLeft }),
    ...(initialRight !== undefined && { right: initialRight }),
    ...(initialTop !== undefined && { top: initialTop }),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      className={cn(
        className,
        "cursor-grab active:cursor-grabbing inline-block"
      )}
      style={{
        ...style,
        x,
        y,
        rotate: position.rotate,
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05, zIndex: 1000, cursor: "grabbing" }}
      dragPropagation={false}
      dragConstraints={false}
    >
      {children}
    </motion.div>
  );
}

interface ItemPosition {
  x: number;
  y: number;
  rotate: number;
}

interface ItemPositions {
  photo1: ItemPosition;
  photo2: ItemPosition;
  photo3: ItemPosition;
  matchbox: ItemPosition;
  pearls: ItemPosition;
  seashell: ItemPosition;
  lily1: ItemPosition;
  lily2: ItemPosition;
}

const INITIAL_POSITIONS: ItemPositions = {
  photo1: { x: 0, y: 0, rotate: -12 },
  photo2: { x: 0, y: 0, rotate: 10 },
  photo3: { x: 0, y: 0, rotate: -6 },
  matchbox: { x: 0, y: 0, rotate: -8 },
  pearls: { x: 0, y: 0, rotate: -15 },
  seashell: { x: 0, y: 0, rotate: 12 },
  lily1: { x: 0, y: 0, rotate: 100 },
  lily2: { x: 0, y: 0, rotate: 75 },
};

export default function PhotoGallery({ className }: PhotoGalleryProps) {
  const [positions, setPositions] = useState<ItemPositions>(INITIAL_POSITIONS);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if any items have been moved from their initial position
  const hasItemsMoved = Object.values(positions).some(
    (pos) => pos.x !== 0 || pos.y !== 0
  );

  const handleReset = () => {
    setPositions(INITIAL_POSITIONS);
  };

  const updatePosition = (key: keyof ItemPositions, x: number, y: number) => {
    setPositions((prev) => ({
      ...prev,
      [key]: { ...prev[key], x, y },
    }));
  };

  return (
    <section
      className={cn(
        "bg-cream w-full min-h-screen overflow-y-auto py-16 md:py-24",
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8 w-full">
        {/* Photo Gallery on Metal Plate */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div
            ref={containerRef}
            className="relative w-full max-w-5xl aspect-[4/3]"
          >
            {/* Metal Plate Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-[1000px] max-h-[750px] md:max-w-[1200px] md:max-h-[900px]">
                <Image
                  src="/photos/metal-plate.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 600px, (max-width: 1024px) 1000px, 1200px"
                  quality={90}
                />

                {/* Engraved Text - Green Park 2021 - Lowest z-index so it's behind everything */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
                  <div className="text-center relative">
                    {/* Engraved text effect using multiple shadows */}
                    <p
                      className="font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-wider relative"
                      style={{
                        color: "#2a2a2a",
                        textShadow: `
                          0 1px 0 rgba(255, 255, 255, 0.1),
                          0 -1px 0 rgba(0, 0, 0, 0.3),
                          0 2px 2px rgba(0, 0, 0, 0.4),
                          inset 0 1px 1px rgba(255, 255, 255, 0.15),
                          inset 0 -1px 1px rgba(0, 0, 0, 0.5)
                        `,
                        letterSpacing: "0.15em",
                        filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
                        WebkitTextStroke: "0.3px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Green Park 2021
                    </p>
                    <p
                      className="font-serif text-xl md:text-2xl lg:text-3xl font-light tracking-wider relative mt-2 md:mt-3"
                      style={{
                        color: "#2a2a2a",
                        textShadow: `
                          0 1px 0 rgba(255, 255, 255, 0.1),
                          0 -1px 0 rgba(0, 0, 0, 0.3),
                          0 2px 2px rgba(0, 0, 0, 0.4),
                          inset 0 1px 1px rgba(255, 255, 255, 0.15),
                          inset 0 -1px 1px rgba(0, 0, 0, 0.5)
                        `,
                        letterSpacing: "0.15em",
                        filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
                        WebkitTextStroke: "0.3px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Yannis & Alara Forever
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Polaroid Photos */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Photo 1 - Scotland Analog (back layer, rotated left) */}
              <DraggableItem
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute z-10 touch-none"
                initialLeft="15%"
                initialTop="20%"
                position={positions.photo1}
                onDragEnd={(x, y) => updatePosition("photo1", x, y)}
              >
                <div className="relative bg-white p-2 md:p-3 shadow-2xl pointer-events-none">
                  <div className="relative w-[180px] h-[240px] md:w-[220px] md:h-[293px] overflow-hidden pointer-events-none">
                    <Image
                      src="/photos/scotland-analog.jpeg"
                      alt="Scotland"
                      fill
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 180px, 220px"
                      quality={90}
                    />
                    {/* Film grain overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                </div>
              </DraggableItem>

              {/* Photo 2 - Core Clare Smyth (middle layer, rotated right) */}
              <DraggableItem
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute z-20 touch-none"
                initialLeft="35%"
                initialTop="15%"
                position={positions.photo2}
                onDragEnd={(x, y) => updatePosition("photo2", x, y)}
              >
                <div className="relative bg-white p-2 md:p-3 shadow-2xl pointer-events-none">
                  <div className="relative w-[200px] h-[267px] md:w-[240px] md:h-[320px] overflow-hidden pointer-events-none">
                    <Image
                      src="/photos/core-clare-smyth.jpeg"
                      alt="Core Clare Smyth"
                      fill
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 200px, 240px"
                      quality={90}
                    />
                    {/* Film grain overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                </div>
              </DraggableItem>

              {/* Photo 3 - Yannis and Alara at LAL's Birthday (front layer, rotated left) */}
              <DraggableItem
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute z-30 touch-none"
                initialLeft="65%"
                initialTop="25%"
                position={positions.photo3}
                onDragEnd={(x, y) => updatePosition("photo3", x, y)}
              >
                <div className="relative bg-white p-2 md:p-3 shadow-2xl pointer-events-none">
                  <div className="relative w-[190px] h-[253px] md:w-[230px] md:h-[307px] overflow-hidden pointer-events-none">
                    <Image
                      src="/photos/yannis-and-alara-lals-birthday.jpeg"
                      alt="Yannis and Alara"
                      fill
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 190px, 230px"
                      quality={90}
                    />
                    {/* Film grain overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                </div>
              </DraggableItem>

              {/* Matchbox - Top of the tray */}
              <DraggableItem
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="absolute z-40 touch-none"
                initialRight="50%"
                initialTop="50%"
                position={positions.matchbox}
                onDragEnd={(x, y) => updatePosition("matchbox", x, y)}
              >
                <div className="relative w-[120px] h-[160px] md:w-[180px] md:h-[248px] pointer-events-none">
                  <Image
                    src="/photos/matchbox.png"
                    alt="Matchbox"
                    fill
                    className="object-contain pointer-events-none"
                    sizes="(max-width: 768px) 100px, 120px"
                    quality={90}
                  />
                </div>
              </DraggableItem>

              {/* Pearls - Bottom left of the tray */}
              <DraggableItem
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute z-[50] touch-none"
                initialLeft="5%"
                initialTop="53%"
                position={positions.pearls}
                onDragEnd={(x, y) => updatePosition("pearls", x, y)}
              >
                <div
                  className="relative pointer-events-none"
                  style={{ width: "fit-content", height: "fit-content" }}
                >
                  <Image
                    src="/pearls.png"
                    alt="Pearls"
                    width={360}
                    height={260}
                    className="pointer-events-none"
                    sizes="(max-width: 768px) 280px, 360px"
                    quality={90}
                  />
                </div>
              </DraggableItem>

              {/* Seashell - Bottom right of the tray */}
              <DraggableItem
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.95 }}
                className="absolute z-[60] touch-none"
                initialRight="30%"
                initialTop="68%"
                position={positions.seashell}
                onDragEnd={(x, y) => updatePosition("seashell", x, y)}
              >
                <div
                  className="relative pointer-events-none"
                  style={{ width: "fit-content", height: "fit-content" }}
                >
                  <Image
                    src="/photos/seashell.png"
                    alt="Seashell"
                    width={120}
                    height={55}
                    className="pointer-events-none"
                    sizes="(max-width: 768px) 100px, 120px"
                    quality={90}
                  />
                </div>
              </DraggableItem>

              {/* Kalla Lilies - Decorative trinkets on the tray */}
              {/* First Lily (back layer) */}
              <DraggableItem
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute z-[70] touch-none"
                initialLeft="80%"
                initialTop="45%"
                position={positions.lily1}
                onDragEnd={(x, y) => updatePosition("lily1", x, y)}
              >
                <div
                  className="relative w-[576px] h-[288px] md:w-[720px] md:h-[360px] pointer-events-none"
                  style={{ width: "fit-content", height: "fit-content" }}
                >
                  <Image
                    src="/photos/kalla-lily.png"
                    alt="Kalla Lily"
                    width={576}
                    height={288}
                    className="object-contain pointer-events-none w-auto h-auto"
                    sizes="(max-width: 768px) 576px, 720px"
                    quality={90}
                  />
                </div>
              </DraggableItem>

              {/* Second Lily (front layer, stacked on top) */}
              <DraggableItem
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute z-[80] touch-none"
                initialLeft="75%"
                initialTop="42%"
                position={positions.lily2}
                onDragEnd={(x, y) => updatePosition("lily2", x, y)}
              >
                <div
                  className="relative w-[648px] h-[324px] md:w-[792px] md:h-[396px] pointer-events-none"
                  style={{ width: "fit-content", height: "fit-content" }}
                >
                  <Image
                    src="/photos/kalla-lily.png"
                    alt="Kalla Lily"
                    width={648}
                    height={324}
                    className="object-contain pointer-events-none w-auto h-auto"
                    sizes="(max-width: 768px) 648px, 792px"
                    quality={90}
                  />
                </div>
              </DraggableItem>
            </div>
          </div>
        </motion.div>

        {/* Reset Button - Show below metal plate only when items have been moved */}
        <AnimatePresence>
          {hasItemsMoved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center -mt-8"
            >
              <motion.button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs md:text-sm text-[#4a4a4a] font-light uppercase tracking-wider border border-[#4a4a4a]/20 hover:border-[#4a4a4a]/40 hover:bg-[#4a4a4a]/8 transition-all bg-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <h3 className="text-center font-pinyon text-5xl">
          How well do you know the couple?
        </h3>
        <p>
          Can't get enough? Take the quiz to test just how well you know us!
        </p>
        <EllipticalButton href="/quiz">Take the quiz</EllipticalButton>
      </div>
    </section>
  );
}
