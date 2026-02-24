"use client"

import type { DadosBiometricos, Genero } from "@/lib/nutriplan-types"
import { User, Ruler, Scale, Calendar } from "lucide-react"

interface BiometricFormProps {
  data: DadosBiometricos
  onChange: (data: DadosBiometricos) => void
  onContinue: () => void
}

export function BiometricForm({ data, onChange, onContinue }: BiometricFormProps) {
  const isValid =
    data.idade.trim() !== "" &&
    data.peso.trim() !== "" &&
    data.altura.trim() !== "" &&
    data.genero !== ""

  const updateField = (field: keyof DadosBiometricos, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="flex flex-col items-center px-4 py-8 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-foreground text-center mb-2 text-balance leading-relaxed">
        Seus dados biometricos
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Precisamos dessas informacoes para personalizar sua dieta.
      </p>

      <div className="w-full flex flex-col gap-4">
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="number"
            placeholder="Idade"
            value={data.idade}
            onChange={(e) => updateField("idade", e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors text-base"
          />
        </div>

        <div className="relative">
          <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="number"
            placeholder="Peso atual (kg)"
            value={data.peso}
            onChange={(e) => updateField("peso", e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors text-base"
          />
        </div>

        <div className="relative">
          <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="number"
            placeholder="Altura (cm)"
            value={data.altura}
            onChange={(e) => updateField("altura", e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors text-base"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            Genero
          </p>
          <div className="flex gap-3">
            {(["masculino", "feminino"] as Genero[]).map((g) => (
              <button
                key={g}
                onClick={() => updateField("genero", g)}
                className={`
                  flex-1 py-3.5 rounded-2xl text-sm font-medium border-2 transition-all duration-200
                  ${data.genero === g
                    ? "border-primary bg-secondary text-secondary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                  }
                `}
              >
                {g === "masculino" ? "Masculino" : "Feminino"}
              </button>
            ))}
          </div>
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
        Continuar
      </button>
    </div>
  )
}
