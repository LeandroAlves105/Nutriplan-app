export type Objetivo = "emagrecer" | "ganhar_massa" | "manter_saude"
export type Impedimento = "falta_tempo" | "nao_sei_comer" | "dietas_restritivas" | "efeito_sanfona"
export type FaixaPeso = "2-4kg" | "5-7kg" | "8-10kg" | "10kg+"
export type Cansaco = "sim" | "as_vezes" | "nao"
export type Genero = "masculino" | "feminino"

export interface DadosBiometricos {
  idade: string
  peso: string
  altura: string
  genero: Genero | ""
}

export interface DadosCaptura {
  nome: string
  email: string
}

export type FoodCategory =
  | "frutas"
  | "proteinas"
  | "graos_carbos"
  | "paes"
  | "vegetais_saladas"
  | "complementos"

export interface FoodItem {
  id: string
  name: string
  emoji: string
  category: FoodCategory
  /** "doce" = fruit/sweet context, "salgado" = savory context, "neutro" = both */
  flavor: "doce" | "salgado" | "neutro"
}

/** A single saved diet with its own ID, payment status, and generated plan */
export interface SavedDiet {
  id: string
  createdAt: string // ISO date string
  paid: boolean
  objetivo: Objetivo
  impedimento: Impedimento | null
  faixaPeso: FaixaPeso | null
  cansaco: Cansaco | null
  biometricos: DadosBiometricos
  alimentosSelecionados: string[]
  dietaGerada: GeneratedDiet
}

/** The active quiz session (in progress, not yet saved) */
export interface ActiveQuiz {
  sessionId: string // unique ID for this quiz run
  objetivo: Objetivo | null
  impedimento: Impedimento | null
  faixaPeso: FaixaPeso | null
  cansaco: Cansaco | null
  biometricos: DadosBiometricos
  alimentosSelecionados: string[]
  dietaGerada: GeneratedDiet | null
  currentStep: number
}

/** Top-level app store persisted to localStorage */
export interface AppStore {
  captura: DadosCaptura
  diets: SavedDiet[]
  activeQuiz: ActiveQuiz
  /** Which screen are we on: "quiz" | "diet-list" | "diet-view" */
  view: "quiz" | "diet-list" | "diet-view"
  /** ID of the diet currently being viewed */
  viewingDietId: string | null
}

/** Legacy single-diet type (kept for backwards compat reference only) */
export interface UserData {
  objetivo: Objetivo | null
  impedimento: Impedimento | null
  faixaPeso: FaixaPeso | null
  cansaco: Cansaco | null
  biometricos: DadosBiometricos
  captura: DadosCaptura
  alimentosSelecionados: string[]
  dietaGerada: GeneratedDiet | null
  currentStep: number
  unlocked: boolean
}

export interface MealPlan {
  cafeDaManha: string[]
  almoco: string[]
  lancheDaTarde: string[]
  jantar: string[]
}

export interface PhaseWeek {
  weekLabel: string
  meals: MealPlan
}

export interface DietPhase {
  phaseName: string
  phaseLabel: string
  weeks: PhaseWeek[]
}

export interface GeneratedDiet {
  phases: DietPhase[]
  hydrationProtocol: string[]
}

// ---------------------------------------------------------------------------
// EXPANDED FOOD DATABASE (80+ individual items)
// ---------------------------------------------------------------------------

export const FOOD_DATA: FoodItem[] = [
  // ── Frutas (11 items) ──
  { id: "banana", name: "Banana", emoji: "\uD83C\uDF4C", category: "frutas", flavor: "doce" },
  { id: "maca", name: "Maca", emoji: "\uD83C\uDF4E", category: "frutas", flavor: "doce" },
  { id: "mamao", name: "Mamao", emoji: "\uD83E\uDD6D", category: "frutas", flavor: "doce" },
  { id: "morango", name: "Morango", emoji: "\uD83C\uDF53", category: "frutas", flavor: "doce" },
  { id: "uva", name: "Uva", emoji: "\uD83C\uDF47", category: "frutas", flavor: "doce" },
  { id: "manga", name: "Manga", emoji: "\uD83E\uDD6D", category: "frutas", flavor: "doce" },
  { id: "abacaxi", name: "Abacaxi", emoji: "\uD83C\uDF4D", category: "frutas", flavor: "doce" },
  { id: "melancia", name: "Melancia", emoji: "\uD83C\uDF49", category: "frutas", flavor: "doce" },
  { id: "pera", name: "Pera", emoji: "\uD83C\uDF50", category: "frutas", flavor: "doce" },
  { id: "kiwi", name: "Kiwi", emoji: "\uD83E\uDD5D", category: "frutas", flavor: "doce" },
  { id: "laranja", name: "Laranja", emoji: "\uD83C\uDF4A", category: "frutas", flavor: "doce" },

  // ── Proteinas (10 items) ──
  { id: "peito_frango", name: "Peito de Frango", emoji: "\uD83C\uDF57", category: "proteinas", flavor: "salgado" },
  { id: "sobrecoxa", name: "Sobrecoxa (sem pele)", emoji: "\uD83C\uDF57", category: "proteinas", flavor: "salgado" },
  { id: "patinho_moido", name: "Patinho Moido", emoji: "\uD83E\uDD69", category: "proteinas", flavor: "salgado" },
  { id: "file_alcatra", name: "File de Alcatra", emoji: "\uD83E\uDD69", category: "proteinas", flavor: "salgado" },
  { id: "tilapia", name: "Tilapia", emoji: "\uD83D\uDC1F", category: "proteinas", flavor: "salgado" },
  { id: "salmao", name: "Salmao", emoji: "\uD83E\uDD69", category: "proteinas", flavor: "salgado" },
  { id: "atum_lata", name: "Atum em Lata", emoji: "\uD83E\uDD6B", category: "proteinas", flavor: "salgado" },
  { id: "ovos", name: "Ovos", emoji: "\uD83E\uDD5A", category: "proteinas", flavor: "neutro" },
  { id: "tofu", name: "Tofu", emoji: "\uD83E\uDDC8", category: "proteinas", flavor: "salgado" },
  { id: "whey_protein", name: "Whey Protein", emoji: "\uD83E\uDD5B", category: "proteinas", flavor: "doce" },
  { id: "file_mignon", name: "File Mignon", emoji: "\uD83E\uDD69", category: "proteinas", flavor: "salgado" },
  { id: "picanha", name: "Picanha (sem gordura)", emoji: "\uD83E\uDD69", category: "proteinas", flavor: "salgado" },
  { id: "contra_file", name: "Contra File", emoji: "\uD83E\uDD69", category: "proteinas", flavor: "salgado" },
  { id: "acem_moido", name: "Acem Moido", emoji: "\uD83E\uDD69", category: "proteinas", flavor: "salgado" },
  { id: "file_costela", name: "File de Costela", emoji: "\uD83E\uDD69", category: "proteinas", flavor: "salgado" },
  { id: "lombo_suino", name: "Lombo Suino", emoji: "\uD83E\uDD69", category: "proteinas", flavor: "salgado" },

  // ── Graos e Carbos (13 items) ──
  { id: "arroz_branco", name: "Arroz Branco", emoji: "\uD83C\uDF5A", category: "graos_carbos", flavor: "salgado" },
  { id: "arroz_integral", name: "Arroz Integral", emoji: "\uD83C\uDF3E", category: "graos_carbos", flavor: "salgado" },
  { id: "feijao_carioca", name: "Feijao Carioca", emoji: "\uD83E\uDED8", category: "graos_carbos", flavor: "salgado" },
  { id: "feijao_preto", name: "Feijao Preto", emoji: "\uD83E\uDED8", category: "graos_carbos", flavor: "salgado" },
  { id: "feijao_fradinho", name: "Feijao Fradinho", emoji: "\uD83E\uDED8", category: "graos_carbos", flavor: "salgado" },
  { id: "grao_bico", name: "Grao de Bico", emoji: "\uD83E\uDED8", category: "graos_carbos", flavor: "salgado" },
  { id: "lentilha", name: "Lentilha", emoji: "\uD83E\uDED8", category: "graos_carbos", flavor: "salgado" },
  { id: "macarrao_integral", name: "Macarrao Integral", emoji: "\uD83C\uDF5D", category: "graos_carbos", flavor: "salgado" },
  { id: "macarrao_comum", name: "Macarrao Comum", emoji: "\uD83C\uDF5D", category: "graos_carbos", flavor: "salgado" },
  { id: "batata_doce", name: "Batata Doce", emoji: "\uD83C\uDF60", category: "graos_carbos", flavor: "salgado" },
  { id: "batata_inglesa", name: "Batata Inglesa", emoji: "\uD83E\uDD54", category: "graos_carbos", flavor: "salgado" },
  { id: "batata_baroa", name: "Batata Baroa", emoji: "\uD83E\uDD54", category: "graos_carbos", flavor: "salgado" },
  { id: "mandioca", name: "Mandioca", emoji: "\uD83E\uDD54", category: "graos_carbos", flavor: "salgado" },
  { id: "cuscuz", name: "Cuscuz", emoji: "\uD83C\uDF5A", category: "graos_carbos", flavor: "salgado" },
  { id: "aveia", name: "Aveia", emoji: "\uD83C\uDF3E", category: "graos_carbos", flavor: "neutro" },
  { id: "granola", name: "Granola", emoji: "\uD83C\uDF3E", category: "graos_carbos", flavor: "doce" },
  { id: "tapioca", name: "Tapioca", emoji: "\uD83E\uDED3", category: "graos_carbos", flavor: "neutro" },

  // ── Paes (4 items) ──
  { id: "pao_frances", name: "Pao Frances", emoji: "\uD83C\uDF5E", category: "paes", flavor: "salgado" },
  { id: "pao_integral", name: "Pao Integral", emoji: "\uD83E\uDD56", category: "paes", flavor: "salgado" },
  { id: "pao_forma", name: "Pao de Forma", emoji: "\uD83C\uDF5E", category: "paes", flavor: "neutro" },
  { id: "pao_sirio", name: "Pao Sirio", emoji: "\uD83E\uDD59", category: "paes", flavor: "salgado" },

  // ── Vegetais e Saladas (11 items) ──
  { id: "alface", name: "Alface", emoji: "\uD83E\uDD57", category: "vegetais_saladas", flavor: "salgado" },
  { id: "tomate", name: "Tomate", emoji: "\uD83C\uDF45", category: "vegetais_saladas", flavor: "salgado" },
  { id: "brocolis", name: "Brocolis", emoji: "\uD83E\uDD66", category: "vegetais_saladas", flavor: "salgado" },
  { id: "cenoura", name: "Cenoura", emoji: "\uD83E\uDD55", category: "vegetais_saladas", flavor: "salgado" },
  { id: "espinafre", name: "Espinafre", emoji: "\uD83E\uDD57", category: "vegetais_saladas", flavor: "salgado" },
  { id: "couve_flor", name: "Couve-flor", emoji: "\uD83E\uDD66", category: "vegetais_saladas", flavor: "salgado" },
  { id: "abobrinha", name: "Abobrinha", emoji: "\uD83E\uDD52", category: "vegetais_saladas", flavor: "salgado" },
  { id: "berinjela", name: "Berinjela", emoji: "\uD83C\uDF46", category: "vegetais_saladas", flavor: "salgado" },
  { id: "pepino", name: "Pepino", emoji: "\uD83E\uDD52", category: "vegetais_saladas", flavor: "salgado" },
  { id: "beterraba", name: "Beterraba", emoji: "\uD83E\uDED1", category: "vegetais_saladas", flavor: "salgado" },
  { id: "rucula", name: "Rucula", emoji: "\uD83C\uDF3F", category: "vegetais_saladas", flavor: "salgado" },

  // ── Complementos (lanche / extras - 6 items) ──
  { id: "iogurte", name: "Iogurte Natural", emoji: "\uD83E\uDD5B", category: "complementos", flavor: "doce" },
  { id: "queijo_branco", name: "Queijo Branco", emoji: "\uD83E\uDDC0", category: "complementos", flavor: "salgado" },
  { id: "mix_castanhas", name: "Mix de Castanhas", emoji: "\uD83E\uDD5C", category: "complementos", flavor: "neutro" },
  { id: "pasta_amendoim", name: "Pasta de Amendoim", emoji: "\uD83E\uDD5C", category: "complementos", flavor: "doce" },
  { id: "cottage", name: "Queijo Cottage", emoji: "\uD83E\uDDC0", category: "complementos", flavor: "salgado" },
  { id: "mel", name: "Mel", emoji: "\uD83C\uDF6F", category: "complementos", flavor: "doce" },
  { id: "doce_de_leite", name: "Doce de Leite", emoji: "\uD83C\uDF6C", category: "complementos", flavor: "doce" },
  { id: "chocolate_70", name: "Chocolate 70%", emoji: "\uD83C\uDF6B", category: "complementos", flavor: "doce" },
]

export const CATEGORY_LABELS: Record<FoodCategory, string> = {
  frutas: "Frutas",
  proteinas: "Proteinas",
  graos_carbos: "Graos e Carboidratos",
  paes: "Paes",
  vegetais_saladas: "Vegetais e Saladas",
  complementos: "Complementos",
}

export const CATEGORY_ORDER: FoodCategory[] = [
  "frutas",
  "proteinas",
  "graos_carbos",
  "paes",
  "vegetais_saladas",
  "complementos",
]

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

export function createFreshQuiz(): ActiveQuiz {
  return {
    sessionId: generateId(),
    objetivo: null,
    impedimento: null,
    faixaPeso: null,
    cansaco: null,
    biometricos: { idade: "", peso: "", altura: "", genero: "" },
    alimentosSelecionados: [],
    dietaGerada: null,
    currentStep: 0,
  }
}

export const INITIAL_APP_STORE: AppStore = {
  captura: { nome: "", email: "" },
  diets: [],
  activeQuiz: createFreshQuiz(),
  view: "quiz",
  viewingDietId: null,
}

export const INITIAL_USER_DATA: UserData = {
  objetivo: null,
  impedimento: null,
  faixaPeso: null,
  cansaco: null,
  biometricos: { idade: "", peso: "", altura: "", genero: "" },
  captura: { nome: "", email: "" },
  alimentosSelecionados: [],
  dietaGerada: null,
  currentStep: 0,
  unlocked: false,
}
