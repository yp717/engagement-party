"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS } from "./questions";
import { cn } from "../lib/utils";

const TOTAL = QUIZ_QUESTIONS.length;

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrong, setWrong] = useState(false);

  const question = QUIZ_QUESTIONS[currentIndex];
  const questionsLeft = TOTAL - currentIndex - 1;
  const isComplete = currentIndex >= TOTAL;

  const handleAnswer = (selectedIndex: number) => {
    if (wrong) return;
    if (selectedIndex === question.correctIndex) {
      setWrong(false);
      if (currentIndex + 1 >= TOTAL) {
        setCurrentIndex(TOTAL);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    } else {
      setWrong(true);
    }
  };

  const handleRestart = () => {
    setWrong(false);
    setCurrentIndex(0);
  };

  return (
    <main className="min-h-screen bg-cream text-primary">
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
        {!isComplete && (
          <div className="flex justify-center mb-10">
            <span className="font-serif text-sm tracking-widest uppercase text-primary/60">
              {questionsLeft === 0
                ? "Last question"
                : `${questionsLeft} question${questionsLeft === 1 ? "" : "s"} left`}
            </span>
          </div>
        )}

        {/* Progress bar */}
        {!isComplete && (
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
