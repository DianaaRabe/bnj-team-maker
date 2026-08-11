import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

// Une seule famille : la landing n'utilise que DM Sans. Archivo et Work Sans
// ne servaient qu'aux surfaces supprimées — les charger coûterait deux
// téléchargements de police pour rien.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// metadataBase pointe le domaine PUBLIC, pas l'adresse interne du
// processus Next : les pages sont servies sur bnjteammaker.fr, et c'est
// cette adresse que les canoniques et les balises Open Graph doivent
// porter. Sans elle, une URL relative dans `alternates.canonical` fait
// échouer le build.
export const metadata: Metadata = {
  metadataBase: new URL("https://bnjteammaker.fr"),
  title: "BNJ Team Maker",
  description: "Talents francophones qualifiés pour scaler votre équipe rapidement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={dmSans.variable}
      style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', system-ui, sans-serif)" }}
    >
      <head>
        {/* Filet de sécurité : les blocs révélés au défilement sont rendus
            à `opacity:0` côté serveur, et c'est Motion qui les fait
            apparaître. Sans JavaScript, ils resteraient invisibles — la
            page entière serait blanche. Cette règle rétablit leur état
            final. Voir components/landing/portal/Reveal.tsx. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className="min-h-full flex flex-col bg-[#08050f] text-[#f0ecf8] antialiased"
        style={{ fontFamily: "inherit" }}
      >
        {children}
      </body>
    </html>
  );
}
