"use client"

import { Check } from "lucide-react"

interface QuizOption {
  value: string
  label: string
}

interface QuizStepProps {
  question: string
  subtitle?: string
  options: QuizOption[]
  selectedValue: string | null
  onSelect: (value: string) => void
}

export function QuizStep({ question, subtitle, options, selectedValue, onSelect }: QuizStepProps) {
  return (
    <div className="flex flex-col items-center px-4 py-8 max-w-lg mx-auto min-h-[60vh] justify-center">
      <h2 className="text-xl font-bold text-foreground text-center mb-2 text-balance leading-relaxed">
        {question}
      </h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground text-center mb-8">{subtitle}</p>
      )}
      <div className="w-full flex flex-col gap-3 mt-4">
        {options.map((option) => {
          const isSelected = selectedValue === option.value
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`
                relative w-full py-4 px-5 rounded-2xl text-left text-base font-medium
                transition-all duration-200 border-2
                ${isSelected
                  ? "border-primary bg-secondary text-secondary-foreground shadow-sm"
                  : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted"
                }
              `}
            >
              <span className="pr-8">{option.label}</span>
              {isSelected && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
