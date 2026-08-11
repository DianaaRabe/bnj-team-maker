import type { NextConfig } from "next";

// `npm run build:static` (STATIC_EXPORT=1) produit `out/` : les trois
// landings en fichiers, destinées au dépôt bnj-sites servi par nginx.
//
// `pageExtensions: ["tsx"]` sort `app/api/cal/slots/route.ts` du build —
// un route handler dynamique est incompatible avec `output: "export"`.
// En statique, ce n'est pas une perte : nginx relaie /api/cal/slots vers
// api.cal.com en injectant la clé (voir nginx.conf de bnj-sites).
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport
    ? { output: "export" as const, pageExtensions: ["tsx"] }
    : {}),

  images: {
    // L'optimiseur d'images de Next suppose un serveur : hors sujet en export.
    unoptimized: staticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // Les redirections sont le fait du serveur : en export, c'est nginx qui
  // les porte (bnj-sites), pas Next.
  async redirects() {
    if (staticExport) return [];
    return [
      // Cette application ne sert QUE /dev, /rh et /offshore : sur le
      // domaine principal, « / » est le site déjà en production sur le
      // VPS et n'arrive jamais jusqu'ici — le serveur web ne relaie que
      // les préfixes des landings. La redirection ne concerne donc que
      // les accès directs au processus Next, pour lesquels la surface
      // générale est la bonne porte d'entrée.
      { source: "/", destination: "/offshore", permanent: false },
      // Ancienne URL de la landing développeurs, quand elle vivait à la
      // racine de son propre sous-domaine.
      { source: "/dev-v2", destination: "/dev", permanent: true },
    ];
  },
};

export default nextConfig;
