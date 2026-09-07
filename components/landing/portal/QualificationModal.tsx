"use client";

import React, { useState, useEffect } from "react";
import { useBooking, type StoredLead } from "./BookingContext";
import { libelleJour } from "./useCalSlots";

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/bj0ww1sxkba49n5lj843k95qe15dgma2";

export default function QualificationModal() {
  const { isModalOpen, closeModal, pendingSlot, onQualified } = useBooking();

  const [projet, setProjet] = useState("recrutement");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const [erreur, setErreur] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statutExclu, setStatutExclu] = useState<string | null>(null);

  // Masquer le champ budget si postuler ou partenariat (comme sur Yield Studio hideBudgetFor)
  const masquerBudget = projet === "postuler" || projet === "partenariat";

  // Réinitialiser les erreurs et le statut à l'ouverture
  useEffect(() => {
    if (isModalOpen) {
      setErreur(null);
      setStatutExclu(null);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur(null);

    // Validation des champs
    if (!prenom.trim() || !nom.trim()) {
      setErreur("Veuillez renseigner votre prénom et votre nom.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErreur("Veuillez saisir une adresse email professionnelle valide.");
      return;
    }
    if (!telephone.trim() || telephone.trim().replace(/\D/g, "").length < 8) {
      setErreur("Veuillez saisir un numéro de téléphone valide.");
      return;
    }
    if (!masquerBudget) {
      if (!entreprise.trim()) {
        setErreur("Veuillez indiquer le nom de votre entreprise.");
        return;
      }
      if (!budget) {
        setErreur("Veuillez sélectionner une tranche budgétaire.");
        return;
      }
    }
    if (!message.trim() || message.trim().length < 8) {
      setErreur("Veuillez préciser en quelques mots votre situation ou votre besoin.");
      return;
    }

    setIsSubmitting(true);

    // Critères d'exclusion des mauvaises cibles
    const estCandidat = projet === "postuler";
    const estPartenariat = projet === "partenariat";
    const estBudgetInsuffisant = !masquerBudget && budget === "moins_1000";
    const estAutre = projet === "autre";

    const estQualifie = !estCandidat && !estPartenariat && !estBudgetInsuffisant && !estAutre;

    const codeStatut = estQualifie
      ? "qualifie"
      : estCandidat
      ? "exclu_candidat"
      : estPartenariat
      ? "exclu_partenariat"
      : estBudgetInsuffisant
      ? "exclu_budget"
      : "exclu_autre";

    const leadData: StoredLead = {
      prenom: prenom.trim(),
      nom: nom.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
      entreprise: entreprise.trim() || (estCandidat ? "Candidat" : "Non renseigné"),
      projet,
      budget: masquerBudget ? "Non applicable" : budget,
      message: message.trim(),
      statut: codeStatut,
    };

    // Envoi au webhook Make (aucun contact n'est perdu)
    try {
      const payload = {
        ...leadData,
        page: typeof window !== "undefined" ? window.location.pathname : "/landing",
        page_url: typeof window !== "undefined" ? window.location.href : "",
        creneau_preselectionne: pendingSlot?.slotIso || pendingSlot?.date || "Aucun",
        created_at: new Date().toISOString(),
      };
      const formData = new URLSearchParams(payload);

      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon(MAKE_WEBHOOK_URL, formData);
      } else {
        fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: formData.toString(),
          mode: "no-cors",
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Échec silencieux
    }

    // Tracking GA4 / GTM
    if (typeof window !== "undefined") {
      const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "qualification_submitted",
        qualification_status: estQualifie ? "qualified" : "disqualified",
        project_type: projet,
        budget: leadData.budget,
      });
    }

    setIsSubmitting(false);

    if (estQualifie) {
      // Passer à l'étape 2 (ouverture Cal.com pré-remplie)
      onQualified(leadData);
    } else {
      // Afficher l'écran d'exclusion dédié
      setStatutExclu(codeStatut);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bnj-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
    >
      {/* Overlay clic pour fermer */}
      <div className="absolute inset-0" onClick={closeModal} />

      {/* Conteneur modale */}
      <div className="relative z-10 w-full max-w-[560px] max-h-[92vh] overflow-y-auto rounded-[22px] border border-white/[0.12] bg-[#120d24] text-white shadow-2xl p-6 sm:p-8">
        {/* Bouton fermer */}
        <button
          type="button"
          onClick={closeModal}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition-colors hover:bg-white/15 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ─── VUE EXCLUSION (Mauvaises cibles) ─── */}
        {statutExclu ? (
          <div className="py-3 text-left">
            {statutExclu === "exclu_candidat" && (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#feb527]/30 bg-[#feb527]/10 px-3 py-1 text-[0.8rem] font-medium text-[#feb527]">
                  <span>💼</span> Espace Candidats & Talents
                </div>
                <h3 className="mt-4 text-[1.45rem] font-semibold text-white leading-snug">
                  Merci pour votre candidature !
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-white/70">
                  Les rendez-vous d&apos;agenda direct sont réservés aux <strong>entreprises et recruteurs</strong> en recherche active de talents.
                </p>
                <div className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-[0.88rem] leading-relaxed text-white/80">
                  <p>
                    Nous recrutons en continu pour notre vivier de plus de 8 000 développeurs et talents francophones.
                    Votre profil nous intéresse : envoyez-nous votre CV ou consultez nos opportunités actuelles.
                  </p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://bnjteammaker.fr/carrieres"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-cta inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[0.88rem] font-medium text-center"
                  >
                    Voir les offres d&apos;emploi →
                  </a>
                  <a
                    href="mailto:rh@bnjteammaker.fr?subject=Candidature%20vivier%20BNJ"
                    className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/[0.04] px-5 py-3 text-[0.88rem] font-medium text-white/85 hover:bg-white/10 text-center"
                  >
                    Envoyer mon CV par email
                  </a>
                </div>
              </>
            )}

            {statutExclu === "exclu_partenariat" && (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c069ee]/30 bg-[#c069ee]/10 px-3 py-1 text-[0.8rem] font-medium text-[#d8b4fe]">
                  <span>🤝</span> Partenariats & Fournisseurs
                </div>
                <h3 className="mt-4 text-[1.45rem] font-semibold text-white leading-snug">
                  Proposition bien enregistrée
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-white/70">
                  L&apos;agenda direct est exclusivement dédié aux <strong>entreprises clientes</strong> ayant un besoin de recrutement ou de staffing.
                </p>
                <div className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-[0.88rem] leading-relaxed text-white/80">
                  <p>
                    Pour toute proposition commerciale, outil ou partenariat externe, merci d&apos;adresser votre documentation par email à{" "}
                    <a href="mailto:contact@bnjteammaker.fr" className="text-[#c069ee] underline">
                      contact@bnjteammaker.fr
                    </a>
                    . Notre équipe l&apos;étudiera et reviendra vers vous si une opportunité se présente.
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-cta w-full justify-center rounded-lg px-5 py-3 text-[0.88rem] font-medium"
                  >
                    Fermer
                  </button>
                </div>
              </>
            )}

            {(statutExclu === "exclu_budget" || statutExclu === "exclu_autre") && (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c069ee]/30 bg-[#c069ee]/10 px-3 py-1 text-[0.8rem] font-medium text-[#d8b4fe]">
                  <span>✉️</span> Demande bien reçue
                </div>
                <h3 className="mt-4 text-[1.45rem] font-semibold text-white leading-snug">
                  Merci pour votre message !
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-white/70">
                  Votre demande a bien été transmise à notre équipe.
                </p>
                <div className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-[0.88rem] leading-relaxed text-white/80">
                  <p>
                    Nos dispositifs de staffing et d&apos;externalisation démarrent à partir de <strong>1 000 € / mois</strong>.
                    Un conseiller va examiner votre dossier et vous contactera sous 24h par email si une formule adaptée peut être mise en place.
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-cta w-full justify-center rounded-lg px-5 py-3 text-[0.88rem] font-medium"
                  >
                    Fermer
                  </button>
                </div>
              </>
            )}

            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => setStatutExclu(null)}
                className="inline-flex items-center gap-1.5 text-[0.82rem] text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                ← Modifier ma saisie
              </button>
            </div>
          </div>
        ) : (
          /* ─── VUE ÉTAPE 1 : QUALIFICATION DU PROJET ─── */
          <div>
            {/* Stepper façon Yield Studio */}
            <div className="mb-6 flex items-center justify-between" role="group" aria-label="Progression du formulaire">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#590293] border border-[#c069ee]/40 text-[0.82rem] font-bold text-white">
                  1
                </div>
                <span className="text-[0.85rem] font-medium text-white">Votre projet</span>
              </div>
              <div className="flex-1 mx-3 h-[2px] bg-white/[0.1] rounded-full overflow-hidden">
                <div className="h-full bg-[#c069ee] w-0 transition-all duration-300" />
              </div>
              <div className="flex items-center gap-2.5 opacity-40">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-[0.82rem] font-medium text-white/60">
                  2
                </div>
                <span className="text-[0.85rem] font-medium text-white/60">Prise de RDV</span>
              </div>
            </div>

            {/* Rappel créneau présélectionné si cliqué depuis le calendrier */}
            {pendingSlot?.date && (
              <div className="mb-5 flex items-center gap-2 rounded-lg border border-[#c069ee]/30 bg-[#590293]/15 px-3.5 py-2 text-[0.82rem] text-[#e3c1fa]">
                <svg viewBox="0 0 16 16" className="h-4 w-4 flex-shrink-0 text-[#c069ee]" fill="none">
                  <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 1.5v3M11 1.5v3M2 6.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>
                  Créneau ciblé : <strong>{libelleJour(pendingSlot.date)}</strong>
                </span>
              </div>
            )}

            <div className="mb-6">
              <h2 id="bnj-modal-title" className="text-[1.35rem] sm:text-[1.5rem] font-semibold text-white tracking-[-0.02em]">
                Cadrons votre besoin en 1 minute
              </h2>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-white/55">
                Renseignez ces quelques éléments pour que Benjamin prépare des profils pertinents lors de votre appel.
              </p>
            </div>

            {erreur && (
              <div className="mb-5 rounded-lg border border-red-500/40 bg-red-500/15 p-3 text-[0.84rem] text-red-200">
                {erreur}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Votre projet */}
              <div>
                <label htmlFor="modal-project" className="block text-[0.8rem] font-medium text-white/80 mb-1.5">
                  Votre situation / Votre projet *
                </label>
                <select
                  id="modal-project"
                  value={projet}
                  onChange={(e) => setProjet(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0d091a] px-3.5 py-2.5 text-[0.9rem] text-white focus:border-[#c069ee] focus:outline-none transition-colors"
                >
                  <option value="recrutement">Recruter un talent ou staffer une équipe (Dev, RH, Sales...)</option>
                  <option value="tech">Renfort technique / Projet digital &amp; automatisation</option>
                  <option value="postuler">Postuler chez BNJ / Rejoindre le vivier de talents</option>
                  <option value="partenariat">Proposer un partenariat / Démarchage commercial</option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>

              {/* Prénom & Nom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-prenom" className="block text-[0.8rem] font-medium text-white/80 mb-1.5">
                    Prénom *
                  </label>
                  <input
                    id="modal-prenom"
                    type="text"
                    required
                    placeholder="Marc"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.12] bg-[#0d091a] px-3.5 py-2.5 text-[0.9rem] text-white placeholder-white/30 focus:border-[#c069ee] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="modal-nom" className="block text-[0.8rem] font-medium text-white/80 mb-1.5">
                    Nom *
                  </label>
                  <input
                    id="modal-nom"
                    type="text"
                    required
                    placeholder="Martin"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.12] bg-[#0d091a] px-3.5 py-2.5 text-[0.9rem] text-white placeholder-white/30 focus:border-[#c069ee] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email & Téléphone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-email" className="block text-[0.8rem] font-medium text-white/80 mb-1.5">
                    Email professionnel *
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="marc@entreprise.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.12] bg-[#0d091a] px-3.5 py-2.5 text-[0.9rem] text-white placeholder-white/30 focus:border-[#c069ee] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="modal-tel" className="block text-[0.8rem] font-medium text-white/80 mb-1.5">
                    Téléphone *
                  </label>
                  <input
                    id="modal-tel"
                    type="tel"
                    required
                    placeholder="06 12 34 56 78"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.12] bg-[#0d091a] px-3.5 py-2.5 text-[0.9rem] text-white placeholder-white/30 focus:border-[#c069ee] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Entreprise & Budget (masqués ou adaptés si candidat/partenariat) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-entreprise" className="block text-[0.8rem] font-medium text-white/80 mb-1.5">
                    Votre entreprise {masquerBudget ? "(optionnel)" : "*"}
                  </label>
                  <input
                    id="modal-entreprise"
                    type="text"
                    placeholder="Acme SAS"
                    value={entreprise}
                    onChange={(e) => setEntreprise(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.12] bg-[#0d091a] px-3.5 py-2.5 text-[0.9rem] text-white placeholder-white/30 focus:border-[#c069ee] focus:outline-none transition-colors"
                  />
                </div>

                {!masquerBudget && (
                  <div>
                    <label htmlFor="modal-budget" className="block text-[0.8rem] font-medium text-white/80 mb-1.5">
                      Un budget en tête ? *
                    </label>
                    <select
                      id="modal-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full rounded-xl border border-white/[0.12] bg-[#0d091a] px-3.5 py-2.5 text-[0.9rem] text-white focus:border-[#c069ee] focus:outline-none transition-colors"
                    >
                      <option value="">Sélectionner un budget...</option>
                      <option value="moins_1000">&lt; 1 000 € / mois (ou sans budget)</option>
                      <option value="1000_2500">1 000 € - 2 500 € / mois</option>
                      <option value="2500_5000">2 500 € - 5 000 € / mois</option>
                      <option value="5000_10000">5 000 € - 10 000 € / mois</option>
                      <option value="plus_10000">&gt; 10 000 € / mois</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="modal-message" className="block text-[0.8rem] font-medium text-white/80 mb-1.5">
                  Décrivez votre situation / vos profils cibles *
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  required
                  placeholder="Ex : Besoin d'un dev React / Node disponible sous 2 semaines pour renforcer notre équipe..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0d091a] px-3.5 py-2.5 text-[0.9rem] text-white placeholder-white/30 focus:border-[#c069ee] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Bouton validation */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-cta w-full justify-center rounded-xl py-3.5 text-[0.92rem] font-medium flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Vérification en cours...</span>
                  ) : (
                    <>
                      <span>Étape suivante</span>
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Note de réassurance */}
              <p className="text-center text-[0.74rem] text-white/40 pt-1 flex items-center justify-center gap-1.5">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 flex-shrink-0 text-white/50" fill="none">
                  <rect x="3" y="6" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5 6V4a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                <span>Données confidentielles. Aucun spam ni revente.</span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
