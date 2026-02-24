"use client"

import { useState } from "react"
import { Leaf, BookOpen } from "lucide-react"

interface HeaderProps {
  isUnlocked: boolean
  onReset: () => void
  onGoHome: () => void
  onGoToDiet: () => void
  onNewCalc: () => void
}

export function Header({ isUnlocked, onReset, onGoHome, onGoToDiet, onNewCalc }: HeaderProps) {
  const [showResetModal, setShowResetModal] = useState(false)
  const [showNewCalcModal, setShowNewCalcModal] = useState(false)

  const handleLogoClick = () => {
    if (isUnlocked) {
      // Paid user: just go home without erasing data
      onGoHome()
    } else {
      // Free user: confirm reset
      setShowResetModal(true)
    }
  }

  const handleNewCalcClick = () => {
    if (isUnlocked) {
      setShowNewCalcModal(true)
    } else {
      setShowResetModal(true)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 focus:outline-none"
          aria-label="NutriPlan - Inicio"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">
            NutriPlan
          </span>
        </button>

        <div className="flex items-center gap-2">
          {isUnlocked && (
            <button
              onClick={onGoToDiet}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Minha Dieta
            </button>
          )}
        </div>
      </header>

      {/* Reset modal (non-paid users or logo click when not paid) */}
      {showResetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-4">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Refazer o quiz?
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Deseja refazer o quiz e perder o progresso atual?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowResetModal(false)
                  onReset()
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Sim, refazer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Calc modal (paid users) */}
      {showNewCalcModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-4">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Criar nova dieta?
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Voce ja possui uma dieta ativa. Deseja criar uma nova e substituir a atual?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewCalcModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowNewCalcModal(false)
                  onNewCalc()
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Sim, criar nova
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
