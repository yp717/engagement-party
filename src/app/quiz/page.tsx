"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  QUIZ_QUESTIONS,
  QUIZ_SUCCESS_IMAGE,
  QUIZ_FAILURE_IMAGE,
} from "./questions";
import { cn } from "../lib/utils";

const TOTAL = QUIZ_QUESTIONS.length;

const SUCCESS_STICKER = "/success-sticker-img.png";
const FAILURE_STICKER = "/failure-sticker-img.png";

/** Sticker that pops in from the side with a comic speech bubble */
function Sticker({
  type,
  onComplete,
}: {
  type: "success" | "failure";
  onComplete?: () => void;
}) {
  const isSuccess = type === "success";
  const fromRight = isSuccess;
  const caption = isSuccess ? "Great job!" : "Aww...try again!";
  const imageSrc = isSuccess ? SUCCESS_STICKER : FAILURE_STICKER;

  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(onComplete, 1800);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  return (
    <motion.div
      className={cn(
        "fixed z-50 flex items-end gap-3",
        fromRight ? "right-0 bottom-24 md:bottom-32 flex-row-reverse" : "left-0 bottom-24 md:bottom-32 flex-row"
      )}
      initial={{
        x: fromRight ? 200 : -200,
        rotate: fromRight ? 25 : -25,
        opacity: 0,
      }}
      animate={{
        x: fromRight ? -20 : 20,
        rotate: fromRight ? -6 : 6,
        opacity: 1,
      }}
      exit={{
        x: fromRight ? 200 : -200,
        rotate: fromRight ? 25 : -25,
        opacity: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 1,
      }}
    >
      {/* Sticker image with white border effect */}
      <div
        className="relative w-32 h-32 md:w-44 md:h-44"
        style={{
          filter: "drop-shadow(0 0 0 white) drop-shadow(0 0 1px white) drop-shadow(0 0 2px white) drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
        }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 768px) 128px, 176px"
          priority
        />
      </div>

      {/* Comic speech bubble */}
      <motion.div
        className={cn(
          "relative bg-white px-4 py-2 md:px-5 md:py-3 rounded-2xl shadow-lg",
          "font-serif text-sm md:text-base text-primary font-medium"
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
          delay: 0.15,
        }}
      >
        {caption}
        {/* Speech bubble tail */}
        <svg
          className={cn(
            "absolute bottom-2 w-4 h-3 text-white",
            fromRight ? "-right-2.5 scale-x-[-1]" : "-left-2.5"
          )}
          viewBox="0 0 16 12"
          fill="currentColor"
        >
          <path d="M0 0 L16 6 L4 12 Q0 8 0 0Z" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [showingSuccess, setShowingSuccess] = useState(false);

  const question = QUIZ_QUESTIONS[currentIndex];
  const questionsLeft = TOTAL - currentIndex - 1;
  const isComplete = currentIndex >= TOTAL;

  const advanceToNext = useCallback(() => {
    setShowingSuccess(false);
    if (currentIndex + 1 >= TOTAL) {
      setCurrentIndex(TOTAL);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex]);

  const handleAnswer = (selectedIndex: number) => {
    if (wrong || showingSuccess) return;
    if (selectedIndex === question.correctIndex) {
      setWrong(false);
      setShowingSuccess(true);
    } else {
      setWrong(true);
    }
  };

  const handleRestart = () => {
    setWrong(false);
    setShowingSuccess(false);
    setCurrentIndex(0);
  };

  return (
    <main className="min-h-screen bg-cream text-primary overflow-x-hidden">
      {/* Animated stickers */}
      <AnimatePresence>
        {showingSuccess && (
          <Sticker key="success-sticker" type="success" onComplete={advanceToNext} />
        )}
        {wrong && <Sticker key="failure-sticker" type="failure" />}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Back link */}
        <Link
          href="/#photo-gallery"
          className="inline-flex items-center gap-2 font-serif text-sm tracking-wide text-primary/70 hover:text-primary transition-colors mb-12"
        >
          <span aria-hidden>←</span>
          Back to celebration
        </Link>

        {/* Title */}
        <h1 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-center mb-4">
          How well do you know the couple?
        </h1>
        <p className="font-serif text-center text-primary/70 mb-12 md:mb-16">
          One wrong answer and it&apos;s back to the start.
        </p>

        {/* Progress */}
        {!isComplete && !wrong && (
          <div className="flex justify-center mb-10">
            <span className="font-serif text-sm tracking-widest uppercase text-primary/60">
              {questionsLeft === 0
                ? "Last question"
                : `${questionsLeft} question${questionsLeft === 1 ? "" : "s"} left`}
            </span>
          </div>
        )}

        {/* Progress bar */}
        {!isComplete && !wrong && (
          <div className="h-1 bg-primary/10 rounded-full mb-12 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / TOTAL) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {wrong ? (
            <motion.div
              key="wrong"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="text-center py-12"
            >
              <div className="relative w-full max-w-sm aspect-[4/3] mx-auto mb-8 overflow-hidden border-2 border-primary/10">
                <Image
                  src={QUIZ_FAILURE_IMAGE}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 320px, 384px"
                  priority
                />
              </div>
              <p className="font-pinyon text-3xl md:text-4xl text-primary mb-2">
                Not quite!
              </p>
              <p className="font-serif text-primary/70 mb-8">
                One wrong answer means starting over. Better luck this time.
              </p>
              <button
                type="button"
                onClick={handleRestart}
                className="px-10 py-4 md:px-12 md:py-4 bg-primary text-white font-serif text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors"
                style={{ clipPath: "ellipse(50% 40% at 50% 50%)" }}
              >
                Try again
              </button>
            </motion.div>
          ) : isComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="relative w-full max-w-sm aspect-[4/3] mx-auto mb-8 overflow-hidden border-2 border-primary/10">
                <Image
                  src={QUIZ_SUCCESS_IMAGE}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 320px, 384px"
                  priority
                />
              </div>
              <p className="font-pinyon text-4xl md:text-5xl text-primary mb-4">
                You know them well!
              </p>
              <p className="font-serif text-lg text-primary/80 mb-10 max-w-md mx-auto">
                You&apos;ve made it through every question. We can&apos;t wait
                to celebrate with you.
              </p>
              <Link
                href="/#photo-gallery"
                className="inline-block px-10 py-4 md:px-12 md:py-4 bg-primary text-white font-serif text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors"
                style={{ clipPath: "ellipse(50% 40% at 50% 50%)" }}
              >
                Back to celebration
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {question.image ? (
                <div className="relative w-full max-w-md aspect-[4/3] mx-auto mb-8 overflow-hidden border-2 border-primary/10">
                  <Image
                    src={question.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 448px"
                  />
                </div>
              ) : null}
              <h2 className="font-serif text-xl md:text-2xl text-primary mb-8 text-center">
                {question.question}
              </h2>
              <ul className="space-y-4">
                {question.options.map((opt, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => handleAnswer(i)}
                      className={cn(
                        "w-full text-left px-6 py-4 md:px-8 md:py-5",
                        "font-serif text-base md:text-lg",
                        "border-2 border-primary/20 bg-white/50",
                        "hover:border-primary/40 hover:bg-white",
                        "focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-cream",
                        "transition-colors duration-200"
                      )}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
