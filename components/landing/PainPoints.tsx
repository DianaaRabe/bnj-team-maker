"use client";

import { motion } from "framer-motion";
import { Timer, Banknote, UserX, RefreshCcw } from "lucide-react";
import type { LandingPageData } from "@/lib/types";

const PAIN_ICONS: Record<string, React.ReactNode> = {
  dev: [
    <Timer key="t" className="h-6 w-6 text-red-400" />,
    <Banknote key="b" className="h-6 w-6 text-red-400" />,
    <UserX key="u" className="h-6 w-6 text-red-400" />,
    <RefreshCcw key="r" className="h-6 w-6 text-red-400" />,
  ],
  sdr: [
    <Timer key="t" className="h-6 w-6 text-red-400" />,
    <Banknote key="b" className="h-6 w-6 text-red-400" />,
    <RefreshCcw key="r" className="h-6 w-6 text-red-400" />,
    <UserX key="u" className="h-6 w-6 text-red-400" />,
  ],
  rh: [
    <UserX key="u" className="h-6 w-6 text-red-400" />,
    <Timer key="t" className="h-6 w-6 text-red-400" />,
    <RefreshCcw key="r" className="h-6 w-6 text-red-400" />,
    <Banknote key="b" className="h-6 w-6 text-red-400" />,
  ],
};

interface PainPointsProps {
  data: LandingPageData["painPoints"];
  variant?: LandingPageData["variant"];
}

export default function PainPoints({ data, variant = "dev" }: PainPointsProps) {
  const icons = PAIN_ICONS[variant] as React.ReactNode[];

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
          <h2 className="font-monument text-3xl font-black text-white md:text-5xl">
            {data.title}
            <br />
            <span className="text-[#c069ee]">{data.subtitle}</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {data.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-white/8 bg-white/3 p-6 transition-all hover:border-white/15 hover:bg-white/5"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
                {icons[i]}
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
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
            {data.transition}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-[#feb527] font-semibold">
            <span className="h-px w-8 bg-[#feb527]" />
            C&apos;est exactement ce que fait BNJ Team Maker.
            <span className="h-px w-8 bg-[#feb527]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
