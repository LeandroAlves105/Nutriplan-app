"use client"

import { useState, useEffect, useCallback } from "react"
import type { GeneratedDiet } from "@/lib/nutriplan-types"
import { ChevronDown, ChevronRight, Droplets, Download, Coffee, UtensilsCrossed, Cookie, Moon, BookOpen, Mail, Check, Loader2 } from "lucide-react"

interface DietViewProps {
  diet: GeneratedDiet
  userName: string
  userEmail?: string
}

const MEAL_ICONS = {
  cafeDaManha: Coffee,
  almoco: UtensilsCrossed,
  lancheDaTarde: Cookie,
  jantar: Moon,
}

const MEAL_LABELS = {
  cafeDaManha: "Cafe da Manha",
  almoco: "Almoco",
  lancheDaTarde: "Lanche da Tarde",
  jantar: "Jantar",
}

function buildPlainText(diet: GeneratedDiet, userName: string): string {
  const lines: string[] = []
  lines.push("========================================")
  lines.push("       NUTRIPLAN - PLANO PERSONALIZADO")
  lines.push("========================================")
  lines.push("")
  lines.push(`Paciente: ${userName || "---"}`)
  lines.push(`Data de geracao: ${new Date().toLocaleDateString("pt-BR")}`)
  lines.push("")
  lines.push("----------------------------------------")

  for (const phase of diet.phases) {
    lines.push("")
    lines.push(`== ${phase.phaseName}: ${phase.phaseLabel} ==`)
    lines.push("")

    for (const week of phase.weeks) {
      lines.push(`  --- ${week.weekLabel} ---`)
      lines.push("")

      const mealKeys = ["cafeDaManha", "almoco", "lancheDaTarde", "jantar"] as const
      for (const key of mealKeys) {
        const label = MEAL_LABELS[key]
        const items = week.meals[key]
        lines.push(`    ${label}:`)
        if (items && items.length > 0) {
          for (const item of items) {
            lines.push(`      - ${item}`)
          }
        }
        lines.push("")
      }
    }
  }

  lines.push("========================================")
  lines.push("   PROTOCOLO DE HIDRATACAO")
  lines.push("========================================")
  lines.push("")
  for (const item of diet.hydrationProtocol) {
    lines.push(`  - ${item}`)
  }
  lines.push("")
  lines.push("========================================")
  lines.push("  Gerado por NutriPlan | nutriplan.app")
  lines.push("========================================")

  return lines.join("\n")
}

export function DietView({ diet, userName, userEmail }: DietViewProps) {
  const [openPhases, setOpenPhases] = useState<Record<number, boolean>>({ 0: true })
  const [openWeeks, setOpenWeeks] = useState<Record<string, boolean>>({ "0-0": true })
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent">("idle")

  const togglePhase = (index: number) => {
    setOpenPhases((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const toggleWeek = (phaseIndex: number, weekIndex: number) => {
    const key = `${phaseIndex}-${weekIndex}`
    setOpenWeeks((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleDownloadTxt = useCallback(() => {
    const text = buildPlainText(diet, userName)
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `NutriPlan_${userName.replace(/\s+/g, "_") || "plano"}_12semanas.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [diet, userName])

  const handleSendEmail = useCallback(() => {
    if (emailState !== "idle") return
    setEmailState("sending")
  }, [emailState])

  useEffect(() => {
    if (emailState === "sending") {
      const timer = setTimeout(() => {
        setEmailState("sent")
      }, 3000)
      return () => clearTimeout(timer)
    }
    if (emailState === "sent") {
      const timer = setTimeout(() => {
        setEmailState("idle")
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [emailState])

  return (
    <div className="flex flex-col px-4 py-6 max-w-lg mx-auto pb-8">
      {/* "Minhas Dietas" tab header */}
      <div className="flex items-center gap-2 mb-6 py-3 px-4 rounded-2xl bg-secondary border border-border">
        <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
        <span className="text-sm font-bold text-secondary-foreground">Minhas Dietas</span>
        <span className="ml-auto text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          Ativo
        </span>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1 text-balance">
          {userName ? `Plano de ${userName}` : "Seu Plano Personalizado"}
        </h2>
        <p className="text-sm text-muted-foreground">
          12 semanas de dieta personalizada
        </p>
      </div>

      {/* Phases Accordion */}
      {diet.phases.map((phase, phaseIndex) => (
        <div key={phaseIndex} className="mb-4">
          <button
            onClick={() => togglePhase(phaseIndex)}
            className="w-full flex items-center justify-between py-4 px-4 rounded-2xl bg-card border-2 border-border hover:border-primary/40 transition-colors"
          >
            <div className="flex flex-col items-start">
              <span className="text-base font-bold text-foreground">{phase.phaseName}</span>
              <span className="text-xs text-muted-foreground">{phase.phaseLabel}</span>
            </div>
            {openPhases[phaseIndex] ? (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {openPhases[phaseIndex] && (
            <div className="mt-2 flex flex-col gap-2 pl-2">
              {phase.weeks.map((week, weekIndex) => {
                const weekKey = `${phaseIndex}-${weekIndex}`
                return (
                  <div key={weekIndex} className="border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleWeek(phaseIndex, weekIndex)}
                      className="w-full flex items-center justify-between py-3 px-4 bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <span className="text-sm font-semibold text-foreground">
                        {week.weekLabel}
                      </span>
                      {openWeeks[weekKey] ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>

                    {openWeeks[weekKey] && (
                      <div className="p-4 flex flex-col gap-4 bg-card">
                        {(Object.keys(MEAL_LABELS) as Array<keyof typeof MEAL_LABELS>).map((mealKey) => {
                          const Icon = MEAL_ICONS[mealKey]
                          const items = week.meals[mealKey]
                          if (!items || items.length === 0) return null
                          return (
                            <div key={mealKey}>
                              <div className="flex items-center gap-2 mb-2">
                                <Icon className="w-4 h-4 text-primary" />
                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                  {MEAL_LABELS[mealKey]}
                                </span>
                              </div>
                              <ul className="flex flex-col gap-1.5">
                                {items.map((item, i) => (
                                  <li key={i} className="text-sm text-foreground leading-relaxed pl-6 relative before:content-[''] before:absolute before:left-1.5 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/40">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ))}

      {/* Hydration Protocol */}
      <div className="mt-4 p-4 rounded-2xl border-2 border-border bg-card">
        <div className="flex items-center gap-2 mb-3">
          <Droplets className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold text-foreground">Protocolo de Hidratacao</h3>
        </div>
        <ul className="flex flex-col gap-2">
          {diet.hydrationProtocol.map((item, i) => (
            <li key={i} className="text-sm text-foreground leading-relaxed pl-6 relative before:content-[''] before:absolute before:left-1.5 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/40">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Download TXT */}
      <button
        onClick={handleDownloadTxt}
        className="mt-6 w-full py-4 rounded-2xl bg-primary text-primary-foreground text-base font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        BAIXAR PLANO EM TXT
      </button>

      {/* Send Email (simulated) */}
      <button
        onClick={handleSendEmail}
        disabled={emailState !== "idle"}
        className={`mt-3 w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 border-2 ${
          emailState === "sent"
            ? "border-primary bg-secondary text-primary"
            : emailState === "sending"
              ? "border-border bg-muted text-muted-foreground cursor-wait"
              : "border-border bg-card text-foreground hover:border-primary/40"
        }`}
      >
        {emailState === "sending" && (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        )}
        {emailState === "sent" && (
          <>
            <Check className="w-5 h-5" />
            {`Enviado com sucesso para ${userEmail || "seu e-mail"}!`}
          </>
        )}
        {emailState === "idle" && (
          <>
            <Mail className="w-5 h-5" />
            Enviar por E-mail
          </>
        )}
      </button>
    </div>
  )
}
