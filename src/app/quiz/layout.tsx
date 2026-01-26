import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz | Yannis & Alara",
  description: "How well do you know the couple? Take the quiz.",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
