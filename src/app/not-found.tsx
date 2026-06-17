import Link from "next/link";

export default function NotFound() {
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
        Off air
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 16vw, 9rem)",
          color: "#E9C766",
          textTransform: "uppercase",
          lineHeight: 1,
          margin: 0,
        }}
      >
        404
      </h1>
      <p
        style={{
          maxWidth: "34ch",
          margin: "1.5rem 0 2.25rem",
          color: "rgba(229, 231, 235, 0.72)",
          fontSize: "1.05rem",
          lineHeight: 1.6,
        }}
      >
        That page is not on the dial. Let us get you back to the show.
      </p>
      <Link href="/" className="btn btn-secondary">
        Back to the show
      </Link>
    </main>
  );
}
