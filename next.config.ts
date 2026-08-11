import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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

  async redirects() {
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
