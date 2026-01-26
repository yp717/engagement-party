"use client";

export default function CheckeredDividerNarrow() {
  return (
    <div
      className="w-full h-32 md:h-40 lg:h-48 relative z-10"
      style={{
        background: `
          repeating-linear-gradient(
            90deg,
            var(--cream) 0px,
            var(--cream) 24px,
            var(--primary) 24px,
            var(--primary) 48px
          )
        `,
        backgroundColor: "var(--primary)",
        marginBottom: "-80px",
      }}
    />
  );
}
