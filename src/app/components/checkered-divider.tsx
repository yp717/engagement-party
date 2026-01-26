"use client";

export default function CheckeredDivider() {
  return (
    <div
      className="w-full h-24 md:h-32 lg:h-40"
      style={{
        background: `
          linear-gradient(135deg, var(--cream) 25%, transparent 25%),
          linear-gradient(225deg, var(--cream) 25%, transparent 25%),
          linear-gradient(315deg, var(--cream) 25%, transparent 25%),
          linear-gradient(45deg, var(--cream) 25%, transparent 25%)
        `,
        backgroundSize: "40px 40px",
        backgroundColor: "var(--primary)",
      }}
    />
  );
}
