"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { GLOBAL_FAQ } from "@/lib/constants";

export default function FAQ() {
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
          <h2 className="font-monument text-3xl font-black text-white md:text-4xl">
            Tout ce que vous
            <br />
            <span className="text-gradient-purple">voulez savoir.</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {GLOBAL_FAQ.map((item, i) => (
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
                  {open === i
                    ? <Minus className="h-3.5 w-3.5" />
                    : <Plus className="h-3.5 w-3.5" />
                  }
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
