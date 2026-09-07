"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ouvrirCal } from "./useCalSlots";

export type StoredLead = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  projet: string;
  budget: string;
  message: string;
  statut: string;
};

type BookingContextType = {
  requestBooking: (date?: string, slotIso?: string) => void;
  isModalOpen: boolean;
  closeModal: () => void;
  pendingSlot: { date?: string; slotIso?: string } | null;
  onQualified: (lead: StoredLead) => void;
};

const BookingContext = createContext<BookingContextType | null>(null);

const STORAGE_KEY = "bnj_lead";

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingSlot, setPendingSlot] = useState<{ date?: string; slotIso?: string } | null>(null);
  const [qualifiedLead, setQualifiedLead] = useState<StoredLead | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.statut === "qualifie") {
          setQualifiedLead(parsed);
        }
      }
    } catch {
      // Storage non disponible
    }
  }, []);

  const requestBooking = useCallback(
    (date?: string, slotIso?: string) => {
      if (qualifiedLead && qualifiedLead.statut === "qualifie") {
        ouvrirCal(date, slotIso, {
          name: `${qualifiedLead.prenom} ${qualifiedLead.nom}`.trim(),
          email: qualifiedLead.email,
        });
        return;
      }
      setPendingSlot({ date, slotIso });
      setIsModalOpen(true);
    },
    [qualifiedLead]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onQualified = useCallback(
    (lead: StoredLead) => {
      setQualifiedLead(lead);
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
      } catch {
        // Ignorer
      }
      setIsModalOpen(false);
      ouvrirCal(pendingSlot?.date, pendingSlot?.slotIso, {
        name: `${lead.prenom} ${lead.nom}`.trim(),
        email: lead.email,
      });
    },
    [pendingSlot]
  );

  return (
    <BookingContext.Provider
      value={{
        requestBooking,
        isModalOpen,
        closeModal,
        pendingSlot,
        onQualified,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking doit être utilisé à l'intérieur de BookingProvider");
  }
  return ctx;
}
