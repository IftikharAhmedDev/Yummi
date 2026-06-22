import type { Viewport } from "next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YUMMI — Precision Timer",
  description:
    "Compete in precision timing challenges. Stop the timer, react to signals, hit precision windows. Skill-based competitive multiplayer for web and mobile.",
  keywords: [
    "timer game",
    "reaction time",
    "multiplayer",
    "competitive",
    "esports",
    "precision",
  ],
  openGraph: {
    title: "YUMMI — Real-Time Multiplayer Precision Timer",
    description: "A fast-paced, cyber-neon competitive timing game.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
