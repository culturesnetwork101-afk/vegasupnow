import { ImageResponse } from "next/og";

export const alt = "Vegas Up Now, Hot 702.5 FM, live Saturdays 12PM PST";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social share card. Pure type + shapes so it never depends on an
// external asset and renders identically on every share surface.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050506",
          backgroundImage:
            "radial-gradient(circle at 22% 26%, rgba(220,38,38,0.30), transparent 45%), radial-gradient(circle at 80% 22%, rgba(212,175,55,0.24), transparent 45%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 12,
            color: "#E5C158",
            textTransform: "uppercase",
            marginBottom: 30,
          }}
        >
          The premiere urban frequency
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 138,
            fontWeight: 800,
            letterSpacing: -3,
            color: "#E9C766",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          Vegas Up Now
        </div>
        <div
          style={{
            display: "flex",
            width: 130,
            height: 3,
            backgroundColor: "#D4AF37",
            margin: "44px 0",
          }}
        />
        <div style={{ display: "flex", fontSize: 38, color: "#E5E7EB", letterSpacing: 3 }}>
          Hot 702.5 FM
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 28,
            fontSize: 24,
            color: "#fca5a5",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 14,
              backgroundColor: "#DC2626",
            }}
          />
          Live Saturdays 12PM PST
        </div>
      </div>
    ),
    { ...size }
  );
}
