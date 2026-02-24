"use client"

import type { DadosCaptura } from "@/lib/nutriplan-types"
import { Mail, UserCircle, ShieldCheck } from "lucide-react"

interface CaptureFormProps {
  data: DadosCaptura
  onChange: (data: DadosCaptura) => void
  onContinue: () => void
}

export function CaptureForm({ data, onChange, onContinue }: CaptureFormProps) {
  const isValid = data.nome.trim() !== "" && data.email.trim().includes("@")

  return (
    <div className="flex flex-col items-center px-4 py-8 max-w-lg mx-auto min-h-[60vh] justify-center">
      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
        <ShieldCheck className="w-7 h-7 text-primary" />
      </div>
      <h2 className="text-xl font-bold text-foreground text-center mb-2 text-balance leading-relaxed">
        Quase pronto!
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Para onde enviamos seu plano de 12 Semanas?
      </p>

      <div className="w-full flex flex-col gap-4">
        <div className="relative">
          <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Seu nome"
            value={data.nome}
            onChange={(e) => onChange({ ...data, nome: e.target.value })}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors text-base"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors text-base"
          />
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!isValid}
        className={`
          w-full mt-8 py-4 rounded-2xl text-base font-semibold transition-all duration-200
          ${isValid
            ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25"
            : "bg-muted text-muted-foreground cursor-not-allowed"
          }
        `}
      >
        Gerar Minha Dieta
      </button>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Seus dados estao protegidos e nao serao compartilhados.
      </p>
    </div>
  )
}
