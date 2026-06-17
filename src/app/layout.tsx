import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SOCIAL } from "@/lib/social";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://www.vegasupnowradio.com";
const DESCRIPTION =
  "Vegas Up Now radio on Hot 702.5 FM in Las Vegas, hosted by BONAFIED100. Hip-hop, R&B, pop, and talk. Live Saturdays 12PM PST.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vegas Up Now - Hot 702.5 FM | Saturdays 12PM PST",
  description: DESCRIPTION,
  applicationName: "Vegas Up Now",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Vegas Up Now",
    title: "Vegas Up Now - Hot 702.5 FM",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vegas Up Now - Hot 702.5 FM",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RadioStation",
      "@id": `${SITE_URL}/#station`,
      name: "Vegas Up Now",
      alternateName: "Hot 702.5 FM",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-full.jpg`,
      description: DESCRIPTION,
      areaServed: { "@type": "City", name: "Las Vegas" },
      sameAs: [SOCIAL.youtube, SOCIAL.facebook, SOCIAL.instagram, SOCIAL.tiktok],
    },
    {
      "@type": "Person",
      name: "BONAFIED100",
      jobTitle: "Host",
      worksFor: { "@id": `${SITE_URL}/#station` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="global-vegas-background" />
        {children}
        <div className="cinema-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
