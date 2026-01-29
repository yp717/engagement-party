"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  isAttending: boolean | null;
  dietaryRequirements: string | null;
  rsvpCompletedAt: string | null;
}

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Halal",
  "Kosher",
  "Dairy-free",
  "Nut allergy",
  "Shellfish allergy",
  "Allergens (please specify)",
] as const;

const ALLERGENS_SPECIFY_OPTION = "Allergens (please specify)";

function parseDietaryRequirements(value: string | null): {
  dietarySelections: string[];
  allergenSpecification: string;
} {
  if (!value?.trim()) return { dietarySelections: [], allergenSpecification: "" };
  const parts = value.split(",").map((p) => p.trim());
  const dietarySelections: string[] = [];
  let allergenSpecification = "";
  for (const part of parts) {
    if (part.startsWith("Allergens:")) {
      allergenSpecification = part.replace(/^Allergens:\s*/i, "").trim();
      dietarySelections.push(ALLERGENS_SPECIFY_OPTION);
    } else if (DIETARY_OPTIONS.includes(part as (typeof DIETARY_OPTIONS)[number])) {
      dietarySelections.push(part);
    }
  }
  return { dietarySelections, allergenSpecification };
}

function buildDietaryRequirements(
  dietarySelections: string[],
  allergenSpecification: string
): string {
  const parts = dietarySelections.filter((o) => o !== ALLERGENS_SPECIFY_OPTION);
  if (allergenSpecification.trim()) {
    parts.push(`Allergens: ${allergenSpecification.trim()}`);
  }
  return parts.join(", ");
}

interface GuestResponse {
  guestId: string;
  isAttending: boolean;
  dietaryRequirements: string;
  dietarySelections: string[];
  allergenSpecification: string;
}

type ViewState = "loading" | "lookup" | "form" | "success" | "error";

function RSVPContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [viewState, setViewState] = useState<ViewState>("loading");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [responses, setResponses] = useState<Map<string, GuestResponse>>(
    new Map()
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lookup form state
  const [lookupFirstName, setLookupFirstName] = useState("");
  const [lookupLastName, setLookupLastName] = useState("");
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);

  // Fetch household data when token is present
  const fetchHousehold = useCallback(async (rsvpToken: string) => {
    try {
      const res = await fetch(`/api/rsvp/${rsvpToken}`);
      if (!res.ok) {
        if (res.status === 404) {
          setViewState("lookup");
          return;
        }
        throw new Error("Failed to fetch RSVP data");
      }

      const data = await res.json();
      setGuests(data.guests);

      // Initialize responses with existing data or defaults
      const initialResponses = new Map<string, GuestResponse>();
      data.guests.forEach((guest: Guest) => {
        const { dietarySelections, allergenSpecification } = parseDietaryRequirements(
          guest.dietaryRequirements
        );
        initialResponses.set(guest.id, {
          guestId: guest.id,
          isAttending: guest.isAttending ?? true,
          dietaryRequirements: guest.dietaryRequirements || "",
          dietarySelections,
          allergenSpecification,
        });
      });
      setResponses(initialResponses);
      setViewState("form");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setViewState("error");
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchHousehold(token);
    } else {
      setViewState("lookup");
    }
  }, [token, fetchHousehold]);

  // Handle name lookup
  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    setIsLookingUp(true);

    try {
      const res = await fetch(
        `/api/rsvp/lookup?firstName=${encodeURIComponent(lookupFirstName)}&lastName=${encodeURIComponent(lookupLastName)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setLookupError(data.error);
        return;
      }

      // Redirect to the same page with the token
      router.push(`/rsvp?token=${data.token}`);
    } catch (err) {
      console.error(err);
      setLookupError("Something went wrong. Please try again.");
    } finally {
      setIsLookingUp(false);
    }
  };

  // Update a guest's response
  const updateResponse = (
    guestId: string,
    field: keyof GuestResponse,
    value: boolean | string | string[]
  ) => {
    setResponses((prev) => {
      const updated = new Map(prev);
      const current = updated.get(guestId);
      if (current) {
        updated.set(guestId, { ...current, [field]: value });
      }
      return updated;
    });
  };

  const toggleDietaryOption = (guestId: string, option: string) => {
    setResponses((prev) => {
      const updated = new Map(prev);
      const current = updated.get(guestId);
      if (!current) return prev;
      const selected = current.dietarySelections.includes(option)
        ? current.dietarySelections.filter((o) => o !== option)
        : [...current.dietarySelections, option];
      updated.set(guestId, {
        ...current,
        dietarySelections: selected,
        ...(option === ALLERGENS_SPECIFY_OPTION && !selected.includes(option)
          ? { allergenSpecification: "" }
          : {}),
      });
      return updated;
    });
  };

  // Submit RSVP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = Array.from(responses.values()).map((r) => ({
        guestId: r.guestId,
        isAttending: r.isAttending,
        dietaryRequirements: buildDietaryRequirements(
          r.dietarySelections,
          r.allergenSpecification
        ),
      }));

      const res = await fetch(`/api/rsvp/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses: payload }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit RSVP");
      }

      setViewState("success");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const allAttending = Array.from(responses.values()).every(
    (r) => r.isAttending
  );
  const someAttending = Array.from(responses.values()).some(
    (r) => r.isAttending
  );

  return (
    <main className="min-h-screen bg-cream text-primary overflow-x-hidden">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-serif text-sm tracking-wide text-primary/70 hover:text-primary transition-colors mb-12"
        >
          <span aria-hidden>←</span>
          Back to celebration
        </Link>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-center mb-4"
        >
          RSVP
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-center text-primary/70 mb-12 md:mb-16"
        >
          We can&apos;t wait to celebrate with you.
        </motion.p>

        <AnimatePresence mode="wait">
          {viewState === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
            </motion.div>
          )}

          {viewState === "lookup" && (
            <motion.div
              key="lookup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <form onSubmit={handleLookup} className="space-y-6">
                <p className="font-serif text-center text-primary/80 mb-8">
                  Please enter your name as it appears on your invitation.
                </p>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block font-serif text-sm tracking-wide text-primary/60 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={lookupFirstName}
                      onChange={(e) => setLookupFirstName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/50 border-2 border-primary/20 font-serif text-primary focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="Your first name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block font-serif text-sm tracking-wide text-primary/60 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lookupLastName}
                      onChange={(e) => setLookupLastName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/50 border-2 border-primary/20 font-serif text-primary focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                {lookupError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-600 font-serif text-sm text-center"
                  >
                    {lookupError}
                  </motion.p>
                )}

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isLookingUp}
                    className={cn(
                      "px-10 py-4 md:px-12 md:py-4 bg-primary text-white font-serif text-sm tracking-wide uppercase transition-colors",
                      isLookingUp
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-primary/90"
                    )}
                    style={{ clipPath: "ellipse(50% 40% at 50% 50%)" }}
                  >
                    {isLookingUp ? "Looking up..." : "Find my invitation"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {viewState === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {guests.length > 1 && (
                  <p className="font-serif text-center text-primary/80 mb-8">
                    Please respond for all members of your party.
                  </p>
                )}

                <div className="space-y-8">
                  {guests.map((guest, index) => {
                    const response = responses.get(guest.id);
                    if (!response) return null;

                    return (
                      <motion.div
                        key={guest.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-white/30 border-2 border-primary/10"
                      >
                        <h3 className="font-pinyon text-2xl md:text-3xl text-primary mb-6">
                          {guest.firstName} {guest.lastName}
                        </h3>

                        {/* Attendance */}
                        <div className="mb-6">
                          <p className="font-serif text-sm tracking-wide text-primary/60 mb-3">
                            Will you be attending?
                          </p>
                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={() =>
                                updateResponse(guest.id, "isAttending", true)
                              }
                              className={cn(
                                "flex-1 px-4 py-3 font-serif text-sm border-2 transition-colors",
                                response.isAttending
                                  ? "bg-primary text-white border-primary"
                                  : "bg-white/50 text-primary border-primary/20 hover:border-primary/40"
                              )}
                            >
                              Joyfully accepts
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                updateResponse(guest.id, "isAttending", false)
                              }
                              className={cn(
                                "flex-1 px-4 py-3 font-serif text-sm border-2 transition-colors",
                                !response.isAttending
                                  ? "bg-primary text-white border-primary"
                                  : "bg-white/50 text-primary border-primary/20 hover:border-primary/40"
                              )}
                            >
                              Regretfully declines
                            </button>
                          </div>
                        </div>

                        {/* Dietary requirements - only show if attending */}
                        {response.isAttending && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <p className="font-serif text-sm tracking-wide text-primary/60 mb-3">
                              Dietary requirements (optional)
                            </p>
                            <div className="space-y-2 mb-4">
                              {DIETARY_OPTIONS.map((option) => (
                                <label
                                  key={option}
                                  className={cn(
                                    "flex items-center gap-3 py-2 cursor-pointer group",
                                    "font-serif text-primary"
                                  )}
                                >
                                  <input
                                    type="checkbox"
                                    checked={response.dietarySelections.includes(
                                      option
                                    )}
                                    onChange={() =>
                                      toggleDietaryOption(guest.id, option)
                                    }
                                    className="h-4 w-4 rounded border-2 border-primary/30 text-primary focus:ring-primary/20"
                                  />
                                  <span className="group-hover:text-primary/80">
                                    {option}
                                  </span>
                                </label>
                              ))}
                            </div>
                            {response.dietarySelections.includes(
                              ALLERGENS_SPECIFY_OPTION
                            ) && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  className="mt-3"
                                >
                                  <label
                                    htmlFor={`allergen-${guest.id}`}
                                    className="block font-serif text-sm tracking-wide text-primary/60 mb-2"
                                  >
                                    Please specify your allergy
                                  </label>
                                  <input
                                    type="text"
                                    id={`allergen-${guest.id}`}
                                    value={response.allergenSpecification}
                                    onChange={(e) =>
                                      updateResponse(
                                        guest.id,
                                        "allergenSpecification",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-4 py-3 bg-white/50 border-2 border-primary/20 font-serif text-primary focus:outline-none focus:border-primary/40 transition-colors"
                                    placeholder="e.g., peanuts, shellfish, dairy"
                                  />
                                </motion.div>
                              )}
                          </motion.div>
                        )}

                        {guest.rsvpCompletedAt && (
                          <p className="font-serif text-xs text-primary/50 mt-4">
                            Previously responded on{" "}
                            {new Date(
                              guest.rsvpCompletedAt
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-600 font-serif text-sm text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "px-10 py-4 md:px-12 md:py-4 bg-primary text-white font-serif text-sm tracking-wide uppercase transition-colors",
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-primary/90"
                    )}
                    style={{ clipPath: "ellipse(50% 40% at 50% 50%)" }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit RSVP"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {viewState === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-6xl mb-6"
              >
                {allAttending ? "🎉" : someAttending ? "💌" : "💝"}
              </motion.div>
              <h2 className="font-pinyon text-3xl md:text-4xl text-primary mb-4">
                {allAttending
                  ? "We can't wait to see you!"
                  : someAttending
                    ? "Thank you for your response"
                    : "We'll miss you!"}
              </h2>
              <p className="font-serif text-primary/70 mb-8 max-w-md mx-auto">
                {allAttending
                  ? "Your RSVP has been received. We're so excited to celebrate with you!"
                  : someAttending
                    ? "Your RSVP has been received. We look forward to celebrating with those who can make it."
                    : "Your RSVP has been received. We're sorry you can't make it, but we'll be thinking of you."}
              </p>
              <Link
                href="/"
                className="inline-block px-10 py-4 md:px-12 md:py-4 bg-primary text-white font-serif text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors"
                style={{ clipPath: "ellipse(50% 40% at 50% 50%)" }}
              >
                Back to celebration
              </Link>
            </motion.div>
          )}

          {viewState === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="font-serif text-red-600 mb-8">{error}</p>
              <button
                onClick={() => setViewState("lookup")}
                className="inline-block px-10 py-4 md:px-12 md:py-4 bg-primary text-white font-serif text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors"
                style={{ clipPath: "ellipse(50% 40% at 50% 50%)" }}
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// Loading fallback for Suspense
function RSVPLoading() {
  return (
    <main className="min-h-screen bg-cream text-primary overflow-x-hidden">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-serif text-sm tracking-wide text-primary/70 hover:text-primary transition-colors mb-12"
        >
          <span aria-hidden>←</span>
          Back to celebration
        </Link>

        <h1 className="font-pinyon text-4xl md:text-5xl lg:text-6xl text-center mb-4">
          RSVP
        </h1>
        <p className="font-serif text-center text-primary/70 mb-12 md:mb-16">
          We can&apos;t wait to celebrate with you.
        </p>

        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
        </div>
      </div>
    </main>
  );
}

export default function RSVPPage() {
  return (
    <Suspense fallback={<RSVPLoading />}>
      <RSVPContent />
    </Suspense>
  );
}
