"use client";

import { useState, useEffect, ReactNode } from "react";

const CORRECT_PASSWORD = "GREENPARK";
const STORAGE_KEY = "engagement-party-auth";

interface PasswordProtectionProps {
  children: ReactNode;
}

export default function PasswordProtection({
  children,
}: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.toUpperCase() === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
    }
  };

  // Show nothing while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show content if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Show password screen
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Decorative element */}
        <div className="mb-8">
          <div className="inline-block">
            <div className="w-16 h-[1px] bg-primary/30 mx-auto mb-4" />
            <span className="font-pinyon text-4xl text-primary/80">Y & A</span>
            <div className="w-16 h-[1px] bg-primary/30 mx-auto mt-4" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl md:text-3xl text-primary tracking-wide mb-2">
          Engagement Party
        </h1>
        <p className="font-serif text-sm text-primary/60 mb-10 tracking-wider uppercase">
          Please enter the password to continue
        </p>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`relative ${shake ? "password-shake" : ""}`}>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              className={`
                w-full px-6 py-4 
                bg-white/50 backdrop-blur-sm
                border-2 ${error ? "border-red-400" : "border-primary/20"}
                rounded-none
                font-serif text-center text-lg tracking-widest
                text-primary placeholder:text-primary/40
                focus:outline-none focus:border-primary/50
                transition-colors duration-300
              `}
              autoFocus
              autoComplete="off"
            />
            {error && (
              <p className="absolute -bottom-6 left-0 right-0 text-red-500 text-xs font-serif tracking-wide">
                Incorrect password, please try again
              </p>
            )}
          </div>

          <button
            type="submit"
            className="
              w-full px-8 py-4
              bg-primary text-cream
              font-serif text-sm tracking-[0.2em] uppercase
              hover:bg-primary/90
              transition-colors duration-300
            "
          >
            Enter
          </button>
        </form>

        {/* Footer decoration */}
        <div className="mt-16 flex items-center justify-center gap-4 text-primary/30">
          <div className="w-12 h-[1px] bg-current" />
          <span className="font-serif text-xs tracking-widest">2026</span>
          <div className="w-12 h-[1px] bg-current" />
        </div>
      </div>
    </div>
  );
}
