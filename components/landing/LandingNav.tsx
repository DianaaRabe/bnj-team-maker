"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Menu, X } from "lucide-react";
import { BRAND } from "@/lib/constants";

interface LandingNavProps {
  ctaLabel: string;
  onOpenModal: () => void;
}

const NAV_LINKS = [
  { label: "Pourquoi BNJ", href: "#pourquoi" },
  { label: "Notre process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export default function LandingNav({ ctaLabel, onOpenModal }: LandingNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "linear-gradient(to bottom, rgba(8,5,15,0.95) 0%, rgba(8,5,15,0) 100%)" }}
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-12 xl:px-20">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND.logo.white} alt="BNJ Team Maker" style={{ height: "2rem", width: "auto" }} />

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={onOpenModal}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#feb527] px-5 py-2.5 text-sm font-semibold text-[#08050f] transition-all hover:bg-[#ffc94d] hover:scale-105 active:scale-95"
          >
            {ctaLabel}
          </button>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenModal}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#590293] text-white"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mb-3 rounded-2xl border border-white/10 bg-[#0f0a1a]/95 backdrop-blur-md overflow-hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-5 py-4 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white border-b border-white/5 last:border-0"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
