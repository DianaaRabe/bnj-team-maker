"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { BRAND } from "@/lib/constants";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/bj0ww1sxkba49n5lj843k95qe15dgma2";
const LEAD_STORE = "bnj_lead";
const STORE_KEY = "bnj_utm";

function getStoredLead() {
  if (typeof window === "undefined") return null;
  try {
    const s = sessionStorage.getItem(LEAD_STORE);
    return s ? JSON.parse(s) : null;
  } catch (e) {
    return null;
  }
}

function getUtmParams() {
  if (typeof window === "undefined") {
    return { utm_source: "bnjteammaker.fr", utm_medium: "site", utm_campaign: "", utm_content: "" };
  }
  const params = new URLSearchParams(window.location.search);
  let saved: Record<string, string> = {};
  try {
    const s = sessionStorage.getItem(STORE_KEY);
    if (s) saved = JSON.parse(s);
  } catch (e) {}

  return {
    utm_source: params.get("utm_source") || saved.utm_source || "bnjteammaker.fr",
    utm_medium: params.get("utm_medium") || saved.utm_medium || "site",
    utm_campaign: params.get("utm_campaign") || saved.utm_campaign || "",
    utm_content: params.get("utm_content") || saved.utm_content || window.location.pathname,
  };
}

function sendLeadToMake(leadName: string, leadEmail: string) {
  if (!MAKE_WEBHOOK_URL || typeof window === "undefined") return;
  const utm = getUtmParams();
  const payload = {
    email: leadEmail,
    nom: leadName,
    page: window.location.pathname,
    page_url: window.location.href,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_content: utm.utm_content,
    booked_at: new Date().toISOString(),
  };

  const form = new URLSearchParams(payload);
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(MAKE_WEBHOOK_URL, form)) {
      return;
    }
    fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: form.toString(),
      keepalive: true,
      mode: "no-cors",
    }).catch(() => {});
  } catch (e) {}
}

export default function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const [step, setStep] = useState<"gate" | "calendar">("gate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const checkLeadState = useCallback(() => {
    const lead = getStoredLead();
    if (lead && lead.email && lead.name) {
      setName(lead.name);
      setEmail(lead.email);
      setStep("calendar");
    } else {
      setStep("gate");
      setName("");
      setEmail("");
      setError("");
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      checkLeadState();
    }
  }, [isOpen, checkLeadState]);

  // Handle ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Listen to Calendly scheduled event to trigger Make Webhook
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        e.data &&
        typeof e.data === "object" &&
        e.data.event === "calendly.event_scheduled"
      ) {
        const lead = getStoredLead() || { name, email };
        sendLeadToMake(lead.name || name, lead.email || email);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [name, email]);

  const handleSubmitGate = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Merci d'indiquer votre nom.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Adresse email invalide.");
      return;
    }

    setError("");
    const lead = {
      name: trimmedName,
      email: trimmedEmail,
      page: typeof window !== "undefined" ? window.location.pathname : "",
    };

    try {
      sessionStorage.setItem(LEAD_STORE, JSON.stringify(lead));
      (window as any).__bnjLead = lead;
    } catch (e2) {}

    setStep("calendar");
  };

  const calendlySrc = `${BRAND.calendly}?hide_gdpr_banner=1&background_color=0f0a1a&text_color=f0eaf8&primary_color=590293${
    name ? `&name=${encodeURIComponent(name)}` : ""
  }${email ? `&email=${encodeURIComponent(email)}` : ""}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[111] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0f0a1a] shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: "calc(100vh - 2rem)", minHeight: "520px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/8 px-6 py-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#feb527]" />
                  <span className="text-base font-bold text-white font-monument">
                    Prendre rendez-vous
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all hover:border-white/30 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="relative flex-1 overflow-y-auto flex flex-col justify-center">
                {step === "gate" ? (
                  <form
                    onSubmit={handleSubmitGate}
                    className="p-8 flex flex-col gap-5 max-w-md mx-auto w-full"
                  >
                    <div className="text-center space-y-2">
                      <h4 className="text-xl font-bold text-white">
                        Avant de choisir votre créneau
                      </h4>
                      <p className="text-sm text-[#a898c0]">
                        Vos coordonnées pour recevoir la confirmation par email.
                      </p>
                    </div>

                    <div className="space-y-4 mt-2">
                      <div>
                        <label
                          htmlFor="gateName"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#d8d2ea] mb-1.5"
                        >
                          Nom complet
                        </label>
                        <input
                          id="gateName"
                          type="text"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex: Jean Dupont"
                          className="w-full rounded-xl border border-white/15 bg-[#161129] px-4 py-3 text-white placeholder-white/30 focus:border-[#c069ee] focus:outline-none transition-colors text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="gateEmail"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#d8d2ea] mb-1.5"
                        >
                          Adresse email
                        </label>
                        <input
                          id="gateEmail"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jean@entreprise.com"
                          className="w-full rounded-xl border border-white/15 bg-[#161129] px-4 py-3 text-white placeholder-white/30 focus:border-[#c069ee] focus:outline-none transition-colors text-sm"
                          required
                        />
                      </div>

                      {error && (
                        <p className="text-xs font-medium text-red-400">{error}</p>
                      )}

                      <button
                        type="submit"
                        className="w-full mt-2 rounded-xl bg-[#590293] py-3.5 px-6 text-sm font-semibold text-white transition-all hover:bg-[#6b12ac] hover:scale-[1.01] active:scale-95 glow-purple"
                      >
                        Continuer vers le calendrier →
                      </button>
                    </div>
                  </form>
                ) : (
                  <iframe
                    src={calendlySrc}
                    className="w-full h-full min-h-[550px] border-0"
                    title="Calendly Scheduling"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
