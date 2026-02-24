"use client"

import { FOOD_DATA, CATEGORY_LABELS, CATEGORY_ORDER, type FoodCategory } from "@/lib/nutriplan-types"
import { Check } from "lucide-react"

interface FoodSelectionProps {
  selectedFoods: string[]
  onToggleFood: (foodId: string) => void
  onContinue: () => void
}

export function FoodSelection({ selectedFoods, onToggleFood, onContinue }: FoodSelectionProps) {
  const hasMinSelection = selectedFoods.length >= 6

  return (
    <div className="flex flex-col px-4 py-6 max-w-lg mx-auto pb-28">
      <h2 className="text-xl font-bold text-foreground text-center mb-2 text-balance leading-relaxed">
        Monte seu cardapio
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Selecione os alimentos que voce gosta. Quanto mais selecionar, mais variada sera sua dieta.
      </p>

      {CATEGORY_ORDER.map((category: FoodCategory) => {
        const foods = FOOD_DATA.filter((f) => f.category === category)
        return (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {CATEGORY_LABELS[category]}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {foods.map((food) => {
                const isSelected = selectedFoods.includes(food.id)
                return (
                  <button
                    key={food.id}
                    onClick={() => onToggleFood(food.id)}
                    className={`
                      relative flex flex-col items-center justify-center py-4 px-2 rounded-2xl
                      border-2 transition-all duration-200 min-h-[90px]
                      ${isSelected
                        ? "border-primary bg-secondary shadow-sm"
                        : "border-border bg-card hover:border-primary/40"
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    <span className="text-2xl mb-1" role="img" aria-label={food.name}>
                      {food.emoji}
                    </span>
                    <span className={`text-xs font-medium text-center leading-tight ${isSelected ? "text-secondary-foreground" : "text-foreground"}`}>
                      {food.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-sm border-t border-border">
        <div className="max-w-lg mx-auto">
          <button
            onClick={onContinue}
            disabled={!hasMinSelection}
            className={`
              w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200
              ${hasMinSelection
                ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25"
                : "bg-muted text-muted-foreground cursor-not-allowed"
              }
            `}
          >
            {hasMinSelection
              ? `Continuar (${selectedFoods.length} selecionados)`
              : `Selecione pelo menos 6 alimentos (${selectedFoods.length}/6)`
            }
          </button>
        </div>
      </div>
    </div>
  )
}
