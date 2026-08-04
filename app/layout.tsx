import type { Metadata } from "next";
import { DM_Sans, Work_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BNJ Team Maker",
  description: "Talents francophones qualifiés pour scaler votre équipe rapidement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${workSans.variable}`} style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', system-ui, sans-serif)" }}>
      <body
        className="min-h-full flex flex-col bg-[#08050f] text-[#f0ecf8] antialiased"
        style={{ fontFamily: "inherit" }}
      >
        {children}
      </body>
    </html>
  );
}
