"use client";

export default function StripedDivider() {
  return (
    <div
      className="w-full h-24 md:h-32 lg:h-40"
      style={{
        background: `
          repeating-linear-gradient(
            45deg,
            var(--cream) 0px,
            var(--cream) 10px,
            var(--primary) 10px,
            var(--primary) 20px
          )
        `,
        backgroundColor: "var(--primary)",
      }}
    />
  );
}
