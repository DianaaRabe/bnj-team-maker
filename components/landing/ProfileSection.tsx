"use client";

import { motion } from "framer-motion";
import { Monitor, Phone, Users } from "lucide-react";
import type { LandingPageData } from "@/lib/types";

interface ProfileSectionProps {
  data: LandingPageData["profileSection"];
  variant: LandingPageData["variant"];
  onOpenModal: () => void;
}

const variantConfig = {
  dev: {
    icon: <Monitor className="h-4 w-4" />,
    color: "#590293",
    label: "Stack technique",
    bg: "bg-[#590293]/15",
    border: "border-[#590293]/30",
    iconBg: "bg-[#590293]/15",
  },
  sdr: {
    icon: <Phone className="h-4 w-4" />,
    color: "#feb527",
    label: "Compétences commerciales",
    bg: "bg-[#feb527]/10",
    border: "border-[#feb527]/25",
    iconBg: "bg-[#feb527]/10",
  },
  rh: {
    icon: <Users className="h-4 w-4" />,
    color: "#c069ee",
    label: "Expertise RH",
    bg: "bg-[#c069ee]/10",
    border: "border-[#c069ee]/25",
    iconBg: "bg-[#c069ee]/10",
  },
};

export default function ProfileSection({ data, variant, onOpenModal }: ProfileSectionProps) {
  const config = variantConfig[variant];
  const categories = Array.from(new Set(data.skills.map((s) => s.category).filter(Boolean)));

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: config.color }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium mb-6"
              style={{ borderColor: `${config.color}40`, color: config.color, background: `${config.color}10` }}
            >
              {config.icon}
              {config.label}
            </span>
            <h2 className="font-monument text-3xl font-black text-white md:text-4xl leading-tight mb-6">
              {data.title}
              <br />
              <span style={{ color: config.color }}>{data.subtitle}</span>
            </h2>
            <p className="text-base leading-8 text-[#a898c0] mb-8">{data.description}</p>
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:opacity-90 active:scale-95"
              style={{ background: config.color }}
            >
              Voir les profils disponibles →
            </button>
          </motion.div>

          {/* Right — skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {categories.map((cat, ci) => (
              <div key={cat}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#a898c0]">{cat}</p>
                <div className="flex flex-wrap gap-2">
                  {data.skills
                    .filter((s) => s.category === cat)
                    .map((skill, si) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.05 + si * 0.03, duration: 0.3 }}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-medium text-white/90 ${config.bg} ${config.border} transition-all hover:scale-105`}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
