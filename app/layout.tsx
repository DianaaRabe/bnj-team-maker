import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans } from "next/font/google";
import "./globals.css";

/* Mesure d'audience — mêmes conteneurs que le site principal, pour que les
   landings remontent dans les mêmes rapports et que les conversions Google
   Ads leur soient attribuées. Sans ça, le trafic payant envoyé sur /dev,
   /rh et /offshore n'est mesuré nulle part.

   ⚠ Le site principal charge aussi Axeptio (bandeau de consentement), mais
   son `clientId` y vaut encore « TON_CLIENT_ID_AXEPTIO » : le bandeau ne
   fonctionne pas. Le recueil du consentement est donc à reprendre à
   l'échelle du site — ces balises devront y être soumises. */
const GTM_ID = "GTM-KKNKHNZQ";
const GA4_ID = "G-Q5QBMMY5SZ";

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
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
      </Script>
      <body
        className="min-h-full flex flex-col bg-[#08050f] text-[#f0ecf8] antialiased"
        style={{ fontFamily: "inherit" }}
      >
        {/* Repli GTM sans JavaScript — même conteneur que le site. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
