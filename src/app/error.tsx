"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: "var(--color-gold-premium)",
          fontSize: "0.78rem",
          fontWeight: 600,
          marginBottom: "1.25rem",
        }}
      >
        Signal lost
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 8vw, 4rem)",
          color: "#E9C766",
          textTransform: "uppercase",
          lineHeight: 1.05,
          margin: 0,
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          maxWidth: "36ch",
          margin: "1.5rem 0 2.25rem",
          color: "rgba(229, 231, 235, 0.72)",
          fontSize: "1.05rem",
          lineHeight: 1.6,
        }}
      >
        We hit a snag on our end. Try again, or head back to the show.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button type="button" onClick={() => reset()} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-secondary">
          Back to the show
        </Link>
      </div>
    </main>
  );
}
