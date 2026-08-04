"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar,
  CheckCircle,
  Clock,
  Shield,
  Users,
  Crown,
  Menu,
  X,
  Briefcase,
  Handshake,
  Network,
  Database,
  Target,
  Coins,
  FileSignature,
  Search,
  Wallet,
  TrendingUp,
  Award,
  Plus,
  Minus,
  Ban,
  MapPin,
  Wrench,
} from "lucide-react";
import { BRAND } from "@/lib/constants";

// ─────────────────────────────────────────────────────────────
//  Landing « Agent de Talent » — page isolée du programme
//  partenaire (réseau BNJ). Design identique aux landings /dev,
//  /rh, /sdr (mêmes classes, mêmes couleurs, même illustration),
//  seul le contenu change. Aucun composant partagé n'est touché.
//  CTA principal : rejoindre le réseau (interne /mlm/join).
//  CTA secondaire : échanger via Calendly.
// ─────────────────────────────────────────────────────────────

const CONTACT_HREF = "https://bnjteammaker.fr/contact";

function FadeUp({
  delay = 0,
  children,
  className,
}: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── NAV ───────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Deux profils", href: "#profils" },
  { label: "La plateforme", href: "#plateforme" },
  { label: "Commissions", href: "#commissions" },
  { label: "FAQ", href: "#faq" },
];

function AgentNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "linear-gradient(to bottom, rgba(8,5,15,0.95) 0%, rgba(8,5,15,0) 100%)" }}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-12 xl:px-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BRAND.logo.white} alt="BNJ Team Maker" style={{ height: "2rem", width: "auto" }} />

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

        <a
          href={BRAND.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#feb527] px-5 py-2.5 text-sm font-semibold text-[#08050f] transition-all hover:bg-[#ffc94d] hover:scale-105 active:scale-95"
        >
          Discuter du programme →
        </a>

        <div className="md:hidden flex items-center gap-2">
          <a
            href={BRAND.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#590293] text-white"
            aria-label="Discuter du programme"
          >
            <Calendar className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
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
  );
}

// ─── HERO ──────────────────────────────────────────────────────
const HERO_STATS = [
  { value: "30 → 50%", label: "De commission par contrat", sublabel: "Selon votre rang dans le réseau" },
  { value: "8 000+", label: "Talents dans la base BNJ", sublabel: "À placer chez vos clients" },
  { value: "Mini-CRM", label: "Leads & pipeline inclus", sublabel: "Fournis pour les agents de talent" },
  { value: "100%", label: "À distance, à votre rythme", sublabel: "Depuis n'importe où" },
];

const HERO_TRUST = [
  { icon: <CheckCircle className="h-3.5 w-3.5 text-green-400" />, label: "Inscription gratuite" },
  { icon: <Clock className="h-3.5 w-3.5 text-[#feb527]" />, label: "Accès immédiat à la plateforme" },
  { icon: <Shield className="h-3.5 w-3.5 text-[#c069ee]" />, label: "Commissions garanties par contrat" },
];

function AgentHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid noise-overlay px-6 pt-28 pb-16 md:px-12 xl:px-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-[#590293] opacity-20 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-[#c069ee] opacity-10 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 h-[300px] w-[300px] rounded-full bg-[#590293] opacity-15 blur-[80px]" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#feb527] opacity-5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <div className="flex flex-col items-start">
            <FadeUp delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#590293]/40 bg-[#590293]/10 px-4 py-2 text-sm font-medium text-[#c069ee] backdrop-blur-sm mb-7">
                <Sparkles className="h-3.5 w-3.5" />
                Programme partenaire · Réseau BNJ
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-monument text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl xl:text-6xl mb-5">
                Devenez agent de talent.
                <br />
                <span className="text-gradient-gold">Gagnez à chaque contrat signé.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="max-w-lg text-base leading-8 text-[#a898c0] md:text-lg mb-9">
                Rejoignez le réseau BNJ, connectez nos entreprises clientes aux meilleurs
                talents de notre base, et touchez une commission à chaque contrat. Une
                plateforme complète, des leads, un mini-CRM — vous n&apos;avez plus qu&apos;à closer.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={BRAND.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#590293] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-900/40 active:scale-95 glow-purple"
                >
                  Discuter du programme
                </a>
                <a
                  href={CONTACT_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 whitespace-nowrap backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
                >
                  Nous contacter →
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="mt-8 flex flex-col gap-2.5 text-sm text-[#a898c0] sm:flex-row sm:flex-wrap sm:gap-5">
                {HERO_TRUST.map((b) => (
                  <span key={b.label} className="flex items-center gap-1.5">
                    {b.icon}
                    {b.label}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — avatar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[420px] w-[420px] rounded-full bg-[#590293] opacity-15 blur-[80px]" />
            </div>

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="absolute -inset-6 rounded-full border border-[#feb527]/10" />
              <div className="absolute -inset-12 rounded-full border border-[#590293]/10" />

              <Image
                src="/images/avatar.png"
                alt="BNJ Team Maker — Programme agent de talent"
                width={460}
                height={540}
                className="relative z-10 w-[300px] drop-shadow-2xl md:w-[380px] lg:w-[440px]"
                priority
              />

              {/* Floating badge 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="absolute -left-8 top-16 rounded-2xl border border-white/10 bg-glass px-4 py-3 backdrop-blur-md hidden sm:block"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Coins className="h-3.5 w-3.5 text-[#feb527]" />
                  <div className="font-monument text-xl font-semibold text-[#feb527]">50%</div>
                </div>
                <div className="text-xs text-[#a898c0]">De commission max</div>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="absolute -right-6 bottom-24 rounded-2xl border border-white/10 bg-glass px-4 py-3 backdrop-blur-md hidden sm:block"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Users className="h-3.5 w-3.5 text-[#feb527]" />
                  <div className="font-monument text-xl font-semibold text-[#feb527]">8 000+</div>
                </div>
                <div className="text-xs text-[#a898c0]">Talents à placer</div>
              </motion.div>

              {/* Floating badge 3 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
                className="absolute -right-4 top-8 rounded-2xl border border-[#590293]/30 bg-[#590293]/15 px-3 py-2 backdrop-blur-md hidden sm:block"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  Réseau ouvert
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* STATS */}
        <FadeUp delay={0.55}>
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-glass p-5 text-center transition-all hover:bg-glass-purple"
              >
                <div className="font-monument text-2xl font-semibold text-[#feb527] md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-white">{stat.label}</div>
                <div className="mt-0.5 text-xs text-[#a898c0]">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── OPPORTUNITÉ (pain → transition) ───────────────────────────
const OPP_ITEMS = [
  {
    icon: <MapPin className="h-6 w-6 text-red-400" />,
    title: "Un revenu bloqué par votre zone",
    description:
      "Vendre en solo, c'est dépendre de votre carnet d'adresses local. Peu de contacts, peu de deals, un plafond vite atteint.",
  },
  {
    icon: <Search className="h-6 w-6 text-red-400" />,
    title: "Pas de leads sous la main",
    description:
      "Trouver des prospects qualifiés prend un temps fou. Sans flux entrant, vous prospectez dans le vide au lieu de closer.",
  },
  {
    icon: <Wrench className="h-6 w-6 text-red-400" />,
    title: "Aucun outil pour suivre",
    description:
      "Tableurs éparpillés, relances oubliées, deals perdus. Sans CRM, difficile de piloter votre activité sérieusement.",
  },
  {
    icon: <Ban className="h-6 w-6 text-red-400" />,
    title: "Une commission unique, puis plus rien",
    description:
      "La plupart des programmes vous paient une fois, sans récurrence ni progression. Votre effort ne se capitalise jamais.",
  },
];

function AgentOpportunity() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-red-900/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-monument text-3xl font-semibold text-white md:text-5xl">
            Vendre seul, sans réseau,
            <br />
            <span className="text-[#c069ee]">c&apos;est se battre à mains nues.</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {OPP_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-white/8 bg-white/3 p-6 transition-all hover:border-white/15 hover:bg-white/5"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
                {item.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-7 text-[#a898c0]">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-3xl border border-[#590293]/30 bg-gradient-to-br from-[#590293]/15 to-[#c069ee]/5 p-8 text-center md:p-12"
        >
          <p className="text-lg leading-8 text-white/90 md:text-xl md:leading-9 font-medium">
            Et si vous rejoigniez un réseau qui vous fournit les talents, les leads, les outils
            et une commission qui grandit avec votre rang ?
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-[#feb527] font-semibold">
            <span className="h-px w-8 bg-[#feb527]" />
            C&apos;est exactement ce que propose le réseau BNJ.
            <span className="h-px w-8 bg-[#feb527]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TOPIC 1 : DEUX PROFILS ────────────────────────────────────
const PROFILES = [
  {
    icon: <Briefcase className="h-5 w-5 text-[#feb527]" />,
    name: "Agent de Talent",
    tagline: "Membre interne du réseau",
    description:
      "Vous accédez au CRM des prospects existants de BNJ pour placer des talents de notre base et toucher des commissions récurrentes.",
    points: [
      "Accès au vivier de leads BNJ (mini-CRM partagé)",
      "Vous placez nos talents chez nos clients",
      "Commissions récurrentes sur les contrats",
    ],
    highlight: true,
  },
  {
    icon: <Handshake className="h-5 w-5 text-[#c069ee]" />,
    name: "Apporteur d'affaires",
    tagline: "Partenaire externe",
    description:
      "Vous apportez vos propres prospects à BNJ et touchez une commission fixe une fois le contrat conclu avec un talent placé.",
    points: [
      "Vous gérez vos propres prospects",
      "Commission fixe au closing du contrat",
      "Liberté totale, sans engagement de volume",
    ],
    highlight: false,
  },
];

function TwoProfiles() {
  return (
    <section id="profils" className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#590293] opacity-10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-[#590293]/40 bg-[#590293]/10 px-4 py-1.5 text-sm font-medium text-[#c069ee] mb-4">
            Deux façons de rejoindre
          </span>
          <h2 className="font-monument text-3xl font-semibold text-white md:text-5xl">
            Choisissez votre profil
            <br />
            <span className="text-gradient-purple">dans le réseau.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#a898c0]">
            À l&apos;inscription, vous choisissez comment vous voulez travailler avec BNJ. Deux
            rôles, deux modèles de rémunération — la même plateforme.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {PROFILES.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl border p-8 transition-all ${
                p.highlight
                  ? "border-[#feb527]/30 bg-gradient-to-br from-[#feb527]/8 to-[#590293]/5"
                  : "border-white/8 bg-white/3 hover:border-[#c069ee]/30 hover:bg-[#c069ee]/5"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-[#feb527] px-3 py-1 text-xs font-semibold text-[#08050f]">
                  Accès aux leads BNJ
                </span>
              )}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#590293]/20">
                {p.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{p.name}</h3>
              <p className="mt-1 text-sm font-medium text-[#a898c0]">{p.tagline}</p>
              <p className="mt-4 text-sm leading-7 text-[#a898c0]">{p.description}</p>
              <ul className="mt-6 space-y-3">
                {p.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-white/85">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#feb527]" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TOPIC 2 : LA PLATEFORME ───────────────────────────────────
const PLATFORM_FEATURES = [
  {
    icon: <Network className="h-5 w-5 text-[#c069ee]" />,
    title: "Marketing de réseau",
    description:
      "Parrainez d'autres agents, construisez votre équipe et bénéficiez de la dynamique collective du réseau BNJ.",
  },
  {
    icon: <Database className="h-5 w-5 text-[#c069ee]" />,
    title: "Mini-CRM intégré",
    description:
      "Un pipeline complet pour suivre vos prospects — de « nouveau » à « gagné » — avec relances et statuts en un coup d'œil.",
  },
  {
    icon: <Target className="h-5 w-5 text-[#c069ee]" />,
    title: "Des leads fournis",
    description:
      "Agent de talent, vous accédez au vivier de prospects BNJ. Apporteur d'affaires, vous gérez les vôtres dans le même outil.",
  },
  {
    icon: <Coins className="h-5 w-5 text-[#c069ee]" />,
    title: "Commissions par rang",
    description:
      "Vous êtes payé à la commission selon votre rang dans le réseau. Plus vous montez, plus votre taux augmente.",
  },
  {
    icon: <Award className="h-5 w-5 text-[#c069ee]" />,
    title: "Académie & formation",
    description:
      "Des modules pour monter en compétence : approche client, closing, placement de talents. Vous n'êtes jamais seul.",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-[#c069ee]" />,
    title: "Suivi de vos gains",
    description:
      "Tableau de bord commissions, historique des transactions, progression de rang : votre activité, transparente et en temps réel.",
  },
];

function Platform() {
  return (
    <section id="plateforme" className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[#0f0a1a]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-[#feb527]/30 bg-[#feb527]/10 px-4 py-1.5 text-sm font-medium text-[#feb527] mb-4">
            La plateforme
          </span>
          <h2 className="font-monument text-3xl font-semibold text-white md:text-5xl">
            Tout pour vendre,
            <br />
            <span className="text-gradient-gold">réuni au même endroit.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#a898c0]">
            Le réseau BNJ n&apos;est pas qu&apos;un programme d&apos;affiliation. C&apos;est une
            plateforme complète de marketing de réseau, avec les outils et les leads pour closer.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_FEATURES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-white/8 bg-white/3 p-6 transition-all hover:border-[#590293]/40 hover:bg-[#590293]/8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#590293]/20 transition-all group-hover:bg-[#590293]/30">
                {item.icon}
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-7 text-[#a898c0]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TOPIC 3 : LE RÔLE DE L'AGENT ──────────────────────────────
const ROLE_STEPS = [
  {
    step: "01",
    icon: <Search className="h-5 w-5 text-[#c069ee]" />,
    title: "Vous identifiez un client",
    description:
      "Un prospect du vivier BNJ ou un client que vous apportez : une entreprise qui a besoin de talents pour scaler.",
  },
  {
    step: "02",
    icon: <Users className="h-5 w-5 text-[#c069ee]" />,
    title: "Vous proposez les talents BNJ",
    description:
      "Vous puisez dans notre base de 8 000+ talents qualifiés et présentez les profils qui collent au besoin du client.",
  },
  {
    step: "03",
    icon: <FileSignature className="h-5 w-5 text-[#c069ee]" />,
    title: "Vous faites signer le contrat Client ↔ Talent",
    description:
      "Votre mission clé : conclure le contrat entre le client et le(s) talent(s) de la base BNJ. C'est l'acte qui déclenche votre commission.",
  },
  {
    step: "04",
    icon: <Wallet className="h-5 w-5 text-[#c069ee]" />,
    title: "Vous touchez votre commission",
    description:
      "Dès le contrat signé, votre commission est créditée — selon votre rang. Récurrente pour l'agent de talent, fixe pour l'apporteur.",
  },
];

function AgentRole() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-[#590293]/40 bg-[#590293]/10 px-4 py-1.5 text-sm font-medium text-[#c069ee] mb-4">
            Votre rôle
          </span>
          <h2 className="font-monument text-3xl font-semibold text-white md:text-5xl">
            Une mission claire :
            <br />
            <span className="text-gradient-gold">faire signer le contrat.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#a898c0]">
            Client ↔ Talent(s) de la base BNJ. C&apos;est tout ce que vous avez à orchestrer —
            la plateforme s&apos;occupe du reste.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#590293] via-[#c069ee] to-transparent hidden md:block" />

          <div className="space-y-8">
            {ROLE_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-6 md:gap-10"
              >
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#590293] bg-[#08050f] font-monument text-lg font-semibold text-[#feb527]">
                    {step.step}
                  </div>
                </div>

                <div className="flex-1 rounded-2xl border border-white/8 bg-white/3 p-6 transition-all hover:border-[#590293]/30 hover:bg-[#590293]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#590293]/20">
                      {step.icon}
                    </div>
                    <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-[#a898c0]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── RANGS & COMMISSIONS ───────────────────────────────────────
const RANKS = [
  {
    label: "Bronze",
    rate: "30%",
    description: "Votre rang de départ, dès votre premier contrat signé.",
    color: "#cd7f32",
  },
  {
    label: "Argent",
    rate: "40%",
    description: "En développant votre volume et votre équipe dans le réseau.",
    color: "#c0c0c0",
  },
  {
    label: "Or · Legacy · Diamant",
    rate: "50%",
    description: "Les rangs sommet du réseau : votre taux de commission maximal.",
    color: "#feb527",
  },
];

function Ranks() {
  return (
    <section id="commissions" className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#feb527] opacity-5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#feb527]/30 bg-[#feb527]/10 px-4 py-1.5 text-sm font-medium text-[#feb527] mb-4">
            <Crown className="h-3.5 w-3.5" />
            Rangs & commissions
          </span>
          <h2 className="font-monument text-3xl font-semibold text-white md:text-5xl leading-tight">
            Plus vous montez,
            <br />
            <span className="text-gradient-gold">plus vous gagnez.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#a898c0]">
            Votre taux de commission progresse avec votre rang dans le réseau. Chaque contrat
            signé vous rapproche du palier suivant.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {RANKS.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-white/8 bg-white/3 p-8 text-center transition-all hover:border-[#feb527]/30 hover:bg-[#feb527]/5"
            >
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `${r.color}22`, color: r.color }}
              >
                <Award className="h-6 w-6" />
              </div>
              <div className="font-monument text-4xl font-semibold text-[#feb527]">{r.rate}</div>
              <div className="mt-2 text-lg font-semibold text-white">{r.label}</div>
              <p className="mt-3 text-sm leading-7 text-[#a898c0]">{r.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center text-sm text-[#a898c0]/70"
        >
          Les paliers et taux exacts vous sont détaillés lors de votre entrée dans le réseau.
        </motion.p>
      </div>
    </section>
  );
}

// ─── FAQ (orientée agent) ──────────────────────────────────────
const AGENT_FAQ = [
  {
    question: "Quelle est la différence entre agent de talent et apporteur d'affaires ?",
    answer:
      "L'agent de talent est un membre interne : il accède au CRM des prospects existants de BNJ pour placer nos talents et touche des commissions récurrentes. L'apporteur d'affaires est un partenaire externe : il apporte ses propres prospects et touche une commission fixe une fois le contrat conclu avec un talent placé.",
  },
  {
    question: "Combien puis-je gagner ?",
    answer:
      "Vous êtes payé à la commission selon votre rang dans le réseau — de 30% au rang Bronze jusqu'à 50% aux rangs les plus élevés. Plus vous signez de contrats et développez votre réseau, plus votre taux augmente. Aucun plafond n'est imposé.",
  },
  {
    question: "Ai-je besoin de trouver mes propres clients ?",
    answer:
      "Pas nécessairement. En tant qu'agent de talent, vous accédez au vivier de leads BNJ via le mini-CRM. En tant qu'apporteur d'affaires, vous apportez vos propres prospects — mais vous les gérez dans le même outil, avec le même accompagnement.",
  },
  {
    question: "Concrètement, quel est mon rôle ?",
    answer:
      "Votre mission est de faire signer un contrat entre un client et un ou plusieurs talents de la base BNJ. Vous identifiez le besoin, vous proposez les bons profils, et vous concluez. Le contrat signé déclenche votre commission.",
  },
  {
    question: "Combien coûte l'inscription au réseau ?",
    answer:
      "L'inscription est gratuite. Vous créez votre compte, vous choisissez votre profil (agent de talent ou apporteur d'affaires), et vous accédez immédiatement à la plateforme : CRM, leads, académie et suivi des commissions.",
  },
  {
    question: "De quels outils est-ce que je dispose ?",
    answer:
      "Une plateforme complète : un mini-CRM pour piloter vos prospects, l'accès aux talents à placer, une académie de formation, des ressources marketing, et un tableau de bord de vos commissions et de votre progression de rang.",
  },
];

function AgentFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[#0a0714]" />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-[#590293]/40 bg-[#590293]/10 px-4 py-1.5 text-sm font-medium text-[#c069ee] mb-4">
            Questions fréquentes
          </span>
          <h2 className="font-monument text-3xl font-semibold text-white md:text-4xl">
            Tout ce que vous
            <br />
            <span className="text-gradient-purple">voulez savoir.</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {AGENT_FAQ.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-white/4"
              >
                <span className="text-base font-semibold text-white">{item.question}</span>
                <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-[#c069ee] transition-colors hover:border-[#c069ee]/40">
                  {open === i ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-sm leading-7 text-[#a898c0]">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ─────────────────────────────────────────────────
function AgentFinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#08050f] via-[#0d0520] to-[#08050f]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[#590293] opacity-15 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-[#c069ee] opacity-10 blur-[80px]" />
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-[#feb527] opacity-5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAND.logo.white}
            alt="BNJ Team Maker"
            style={{ height: "2.25rem", width: "auto", opacity: 0.85 }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-monument text-4xl font-semibold text-white md:text-6xl leading-[1.1] mb-6"
        >
          Prêt à rejoindre
          <br />
          <span className="text-gradient-gold">le réseau BNJ ?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-xl text-lg leading-8 text-[#a898c0] mb-10"
        >
          Discutons de votre place dans le réseau BNJ. Réservez un échange, ou laissez-nous
          un message via notre formulaire de contact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href={BRAND.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#feb527] px-10 py-5 text-base font-semibold text-[#08050f] transition-all hover:scale-105 hover:bg-[#ffc94d] active:scale-95 glow-gold"
          >
            Discuter du programme
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href={CONTACT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-10 py-5 text-base font-medium text-white/80 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
          >
            Nous contacter →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-[#a898c0]"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Inscription gratuite
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Accès immédiat à la plateforme
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Commission jusqu&apos;à 50%
          </span>
        </motion.div>

        <div className="mt-20 border-t border-white/8 pt-8 flex flex-col items-center gap-2 text-xs text-[#a898c0]/60">
          <p>© {new Date().getFullYear()} BNJ Team Maker. Tous droits réservés.</p>
          <p>{BRAND.email}</p>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────
export default function AgentLandingPage() {
  return (
    <main
      className="flex flex-col min-h-screen bg-[#08050f]"
      style={{ fontFamily: "var(--font-work-sans, 'Work Sans', system-ui, sans-serif)" }}
    >
      <AgentNav />
      <AgentHero />
      <AgentOpportunity />
      <TwoProfiles />
      <Platform />
      <AgentRole />
      <Ranks />
      <AgentFAQ />
      <AgentFinalCTA />
    </main>
  );
}
