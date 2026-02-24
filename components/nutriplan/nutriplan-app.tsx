"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "./header"
import { ProgressBar } from "./progress-bar"
import { QuizStep } from "./quiz-step"
import { BiometricForm } from "./biometric-form"
import { FoodSelection } from "./food-selection"
import { CaptureForm } from "./capture-form"
import { LoadingScreen } from "./loading-screen"
import { Paywall } from "./paywall"
import { DietView } from "./diet-view"
import { generateDiet } from "@/lib/diet-generator"
import {
  INITIAL_USER_DATA,
  type UserData,
  type Objetivo,
  type Impedimento,
  type FaixaPeso,
  type Cansaco,
  type DadosBiometricos,
  type DadosCaptura,
} from "@/lib/nutriplan-types"

const STORAGE_KEY = "nutriplan_user_data"
const TOTAL_QUIZ_STEPS = 7 // Q1-Q4 + Biometrics + Food + Capture

function loadFromStorage(): UserData | null {
  if (typeof window === "undefined") return null
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved) as UserData
  } catch {
    // ignore
  }
  return null
}

function saveToStorage(data: UserData) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export function NutriPlanApp() {
  const searchParams = useSearchParams()
  const [userData, setUserData] = useState<UserData>(INITIAL_USER_DATA)
  const [showLoading, setShowLoading] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadFromStorage()
    if (saved) {
      setUserData(saved)
    }
    setIsHydrated(true)
  }, [])

  // Check URL for ?status=paid
  useEffect(() => {
    if (!isHydrated) return
    const status = searchParams.get("status")
    if (status === "paid" && !userData.unlocked) {
      setUserData((prev) => {
        const updated = { ...prev, unlocked: true }
        // If we have a diet, keep it; if not, generate it
        if (!updated.dietaGerada && updated.alimentosSelecionados.length > 0 && updated.objetivo) {
          updated.dietaGerada = generateDiet(updated.alimentosSelecionados, updated.objetivo)
        }
        // Move to the final step
        updated.currentStep = 8
        saveToStorage(updated)
        return updated
      })
    }
  }, [searchParams, isHydrated, userData.unlocked])

  // Save to localStorage whenever userData changes
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(userData)
    }
  }, [userData, isHydrated])

  const update = useCallback((partial: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...partial }))
  }, [])

  const goToStep = useCallback((step: number) => {
    update({ currentStep: step })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [update])

  const handleReset = useCallback(() => {
    setUserData(INITIAL_USER_DATA)
    localStorage.removeItem(STORAGE_KEY)
    window.scrollTo({ top: 0 })
  }, [])

  // Paid user: go to step 0 (home) without erasing data
  const handleGoHome = useCallback(() => {
    update({ currentStep: 0 })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [update])

  // Paid user: jump straight to diet view
  const handleGoToDiet = useCallback(() => {
    if (userData.unlocked && userData.dietaGerada) {
      update({ currentStep: 8 })
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [userData.unlocked, userData.dietaGerada, update])

  // Paid user: new calc - reset quiz data but keep unlocked status
  const handleNewCalc = useCallback(() => {
    setUserData((prev) => ({
      ...INITIAL_USER_DATA,
      unlocked: prev.unlocked,
      captura: prev.captura, // keep name/email
    }))
    window.scrollTo({ top: 0 })
  }, [])

  // Quiz handlers
  const handleObjetivo = (value: string) => {
    update({ objetivo: value as Objetivo })
    setTimeout(() => goToStep(1), 300)
  }

  const handleImpedimento = (value: string) => {
    update({ impedimento: value as Impedimento })
    setTimeout(() => goToStep(2), 300)
  }

  const handleFaixaPeso = (value: string) => {
    update({ faixaPeso: value as FaixaPeso })
    setTimeout(() => goToStep(3), 300)
  }

  const handleCansaco = (value: string) => {
    update({ cansaco: value as Cansaco })
    setTimeout(() => goToStep(4), 300)
  }

  const handleBiometricos = (data: DadosBiometricos) => {
    update({ biometricos: data })
  }

  const handleBiometricosContinue = () => {
    goToStep(5)
  }

  const handleToggleFood = (foodId: string) => {
    setUserData((prev) => {
      const current = prev.alimentosSelecionados
      const updated = current.includes(foodId)
        ? current.filter((id) => id !== foodId)
        : [...current, foodId]
      return { ...prev, alimentosSelecionados: updated }
    })
  }

  const handleFoodContinue = () => {
    goToStep(6)
  }

  const handleCaptura = (data: DadosCaptura) => {
    update({ captura: data })
  }

  const handleCapturaContinue = () => {
    // Generate the diet
    if (userData.objetivo && userData.alimentosSelecionados.length > 0) {
      const diet = generateDiet(userData.alimentosSelecionados, userData.objetivo)
      update({ dietaGerada: diet, currentStep: 7 })
      setShowLoading(true)
    }
  }

  const handleLoadingComplete = useCallback(() => {
    setShowLoading(false)
    goToStep(8) // Go to paywall/diet view
  }, [goToStep])

  // Don't render until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  const { currentStep } = userData

  // Determine which step question we show
  const getQ3Question = () => {
    if (userData.objetivo === "emagrecer") return "Quantos kg deseja eliminar?"
    if (userData.objetivo === "ganhar_massa") return "Quantos kg deseja ganhar?"
    return "Quantos kg deseja ajustar?"
  }

  // Get visual progress (1-7 range for the progress bar)
  const getVisualStep = () => {
    if (currentStep <= 6) return currentStep + 1
    return TOTAL_QUIZ_STEPS
  }

  const showProgressBar = currentStep < 7 && !showLoading

  return (
    <div className="min-h-screen bg-background">
      <Header
        isUnlocked={userData.unlocked}
        onReset={handleReset}
        onGoHome={handleGoHome}
        onGoToDiet={handleGoToDiet}
        onNewCalc={handleNewCalc}
      />

      {showProgressBar && (
        <ProgressBar currentStep={getVisualStep()} totalSteps={TOTAL_QUIZ_STEPS} />
      )}

      <main>
        {showLoading ? (
          <LoadingScreen onComplete={handleLoadingComplete} />
        ) : (
          <>
            {/* Step 0: Objetivo */}
            {currentStep === 0 && (
              <QuizStep
                question="Qual o seu principal objetivo?"
                subtitle="Escolha a opcao que mais se encaixa no seu momento"
                options={[
                  { value: "emagrecer", label: "Emagrecer" },
                  { value: "ganhar_massa", label: "Ganhar Massa Muscular" },
                  { value: "manter_saude", label: "Manter a Saude" },
                ]}
                selectedValue={userData.objetivo}
                onSelect={handleObjetivo}
              />
            )}

            {/* Step 1: Impedimento */}
            {currentStep === 1 && (
              <QuizStep
                question="O que mais te impede de ter resultados?"
                subtitle="Identificar barreiras e fundamental para seu sucesso"
                options={[
                  { value: "falta_tempo", label: "Falta de tempo" },
                  { value: "nao_sei_comer", label: "Nao sei o que comer" },
                  { value: "dietas_restritivas", label: "Dietas restritivas" },
                  { value: "efeito_sanfona", label: "Efeito sanfona" },
                ]}
                selectedValue={userData.impedimento}
                onSelect={handleImpedimento}
              />
            )}

            {/* Step 2: Faixa de Peso (bifurcation) */}
            {currentStep === 2 && (
              <QuizStep
                question={getQ3Question()}
                options={[
                  { value: "2-4kg", label: "2 a 4 kg" },
                  { value: "5-7kg", label: "5 a 7 kg" },
                  { value: "8-10kg", label: "8 a 10 kg" },
                  { value: "10kg+", label: "Mais de 10 kg" },
                ]}
                selectedValue={userData.faixaPeso}
                onSelect={handleFaixaPeso}
              />
            )}

            {/* Step 3: Cansaco */}
            {currentStep === 3 && (
              <QuizStep
                question="Sente cansaco durante o dia?"
                subtitle="Isso nos ajuda a ajustar nutrientes do seu plano"
                options={[
                  { value: "sim", label: "Sim, frequentemente" },
                  { value: "as_vezes", label: "As vezes" },
                  { value: "nao", label: "Nao" },
                ]}
                selectedValue={userData.cansaco}
                onSelect={handleCansaco}
              />
            )}

            {/* Step 4: Biometrics */}
            {currentStep === 4 && (
              <BiometricForm
                data={userData.biometricos}
                onChange={handleBiometricos}
                onContinue={handleBiometricosContinue}
              />
            )}

            {/* Step 5: Food Selection */}
            {currentStep === 5 && (
              <FoodSelection
                selectedFoods={userData.alimentosSelecionados}
                onToggleFood={handleToggleFood}
                onContinue={handleFoodContinue}
              />
            )}

            {/* Step 6: Capture */}
            {currentStep === 6 && (
              <CaptureForm
                data={userData.captura}
                onChange={handleCaptura}
                onContinue={handleCapturaContinue}
              />
            )}

            {/* Step 8: Paywall or Diet View */}
            {currentStep === 8 && (
              <>
                {userData.unlocked && userData.dietaGerada ? (
                  <DietView
                    diet={userData.dietaGerada}
                    userName={userData.captura.nome}
                    userEmail={userData.captura.email}
                  />
                ) : (
                  <Paywall
                    diet={userData.dietaGerada}
                    userName={userData.captura.nome}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}
