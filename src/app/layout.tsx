import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vegas Up Now - Hot 702.5 FM | Saturdays 12PM PST",
  description: "Vegas Up Now radio show on Hot 702.5 FM in Las Vegas, hosted by BONAFIED100. Hip-Hop, R&B, Pop, and Risky Talk Shows. Saturdays at 12PM PST. Watch live on YouTube.",
  keywords: "Vegas Up Now, Hot 702.5 FM, BONAFIED100, Las Vegas radio, hip-hop, R&B, pop music, talk radio, live streaming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="global-vegas-background" />
        {children}
      </body>
    </html>
  );
}
