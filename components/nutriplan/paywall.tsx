"use client"

import { useState } from "react"
import { Lock, Star, Shield, Clock, Zap, X } from "lucide-react"
import type { GeneratedDiet } from "@/lib/nutriplan-types"

interface PaywallProps {
  diet: GeneratedDiet | null
  userName: string
}

const TESTIMONIALS = [
  {
    name: "Camila R.",
    initials: "CR",
    rating: 5,
    text: "Perdi 8kg em 10 semanas! As receitas sao simples e deliciosas. Nunca senti fome durante a dieta.",
  },
  {
    name: "Rafael S.",
    initials: "RS",
    rating: 5,
    text: "Ganhei 5kg de massa muscular. O plano e super detalhado com gramaturas exatas. Recomendo!",
  },
  {
    name: "Juliana M.",
    initials: "JM",
    rating: 5,
    text: "Finalmente uma dieta que cabe na minha rotina. As opcoes de preparo diferentes mantem tudo variado.",
  },
]

const HOTMART_URL = "https://pay.hotmart.com/V104587905E?off=pv18aha6"

export function Paywall({ diet, userName }: PaywallProps) {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  const handlePurchase = () => {
    setShowCheckoutModal(true)
  }

  return (
    <>
      <div className="flex flex-col px-4 py-6 max-w-lg mx-auto pb-32">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2 text-balance">
            {userName ? `${userName}, seu plano esta pronto!` : "Seu plano esta pronto!"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Desbloqueie acesso completo ao seu plano de 12 semanas
          </p>
        </div>

        {/* Blurred diet preview */}
        <div className="relative rounded-2xl border-2 border-border bg-card p-5 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-card/60 backdrop-blur-md z-10 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border shadow-sm">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Conteudo bloqueado</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 rounded-full bg-muted w-3/4" />
            <div className="h-4 rounded-full bg-muted w-full" />
            <div className="h-4 rounded-full bg-muted w-5/6" />
            <div className="h-4 rounded-full bg-muted w-2/3" />
            <div className="h-8 my-2" />
            <div className="h-4 rounded-full bg-muted w-full" />
            <div className="h-4 rounded-full bg-muted w-4/5" />
            <div className="h-4 rounded-full bg-muted w-3/4" />
            <div className="h-4 rounded-full bg-muted w-full" />
            <div className="h-4 rounded-full bg-muted w-2/3" />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {[
            { icon: Clock, text: "Plano completo de 12 semanas (3 fases)" },
            { icon: Zap, text: "Gramaturas e medidas caseiras exatas" },
            { icon: Shield, text: "Protocolo de hidratacao incluso" },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3 py-3 px-4 rounded-xl bg-secondary">
              <Icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-secondary-foreground">{text}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          O que estao dizendo
        </h3>
        <div className="flex flex-col gap-3 mb-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-4 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>

        {/* Fixed CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-sm border-t border-border z-50">
          <div className="max-w-lg mx-auto">
            <button
              onClick={handlePurchase}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground text-base font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              DESBLOQUEAR PLANO DE 12 SEMANAS AGORA
            </button>
          </div>
        </div>
      </div>

      {/* Hotmart Checkout Modal (iframe) */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-foreground/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg h-[90vh] sm:h-[85vh] bg-card rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
              <span className="text-sm font-semibold text-foreground">Finalizar Compra</span>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Fechar checkout"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            {/* Iframe */}
            <iframe
              src={HOTMART_URL}
              title="Checkout Hotmart"
              className="flex-1 w-full border-0"
              allow="payment"
            />
          </div>
        </div>
      )}
    </>
  )
}
