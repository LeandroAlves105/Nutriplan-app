"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

const LOADING_STEPS = [
  "Analisando seu perfil...",
  "Calculando macronutrientes...",
  "Gerando seu cardapio...",
  "Personalizando gramaturas...",
  "Montando plano de 12 semanas...",
]

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 400)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) =>
        prev < LOADING_STEPS.length - 1 ? prev + 1 : prev
      )
    }, 700)
    return () => clearInterval(stepInterval)
  }, [])

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="relative w-32 h-32 mb-8">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-muted"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            className="text-primary transition-all duration-200"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{progress}%</span>
        </div>
      </div>

      <p className="text-base font-medium text-foreground text-center mb-2 h-6">
        {LOADING_STEPS[currentStepIndex]}
      </p>
      <p className="text-sm text-muted-foreground text-center">
        Aguarde enquanto preparamos tudo para voce
      </p>
    </div>
  )
}
