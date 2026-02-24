import type { Objetivo, GeneratedDiet, DietPhase, MealPlan } from "./nutriplan-types"
import { FOOD_DATA } from "./nutriplan-types"

// ---------------------------------------------------------------------------
// 1. SEASONING PROFILES  (Salgado vs Doce - NEVER mix)
// ---------------------------------------------------------------------------

const TEMPERO_SALGADO = [
  "com sal, pimenta-do-reino e azeite",
  "temperado com alho e cebola",
  "com ervas finas (salsa, cebolinha, oregano)",
  "ao molho de tomate caseiro com manjericao",
  "com um fio de azeite e oregano",
  "ao alho e oleo leve",
  "com cheiro-verde e cebola",
  "temperado com alho, sal e limao",
  "com oregano, tomate e azeite",
  "com manjericao fresco e azeite",
]

const TEMPERO_DOCE = [
  "com canela e mel",
  "com granola",
  "com iogurte natural e granola",
  "com aveia e canela",
  "puro ou com mel",
  "com coco ralado e canela",
  "com mel e canela",
  "com granola e mel",
]

// ---------------------------------------------------------------------------
// 2. COOKING VARIATIONS PER PHASE (3 phases x preparation styles)
// ---------------------------------------------------------------------------

type CookingMap = Record<string, [string, string, string]>

// [Fase 1, Fase 2, Fase 3] - varied cooking for the same protein
const COOKING_VARIATIONS: CookingMap = {
  peito_frango: ["Peito de Frango Grelhado", "Iscas de Frango Salteadas", "Frango Desfiado ao Forno"],
  sobrecoxa: ["Sobrecoxa Assada (sem pele)", "Sobrecoxa Grelhada (sem pele)", "Sobrecoxa Cozida (sem pele)"],
  patinho_moido: ["Patinho Moido Refogado", "Bolinho de Carne de Patinho", "Patinho Moido ao Molho"],
  file_alcatra: ["File de Alcatra Grelhado", "Alcatra em Tiras ao Alho", "Alcatra Assada ao Forno"],
  tilapia: ["Tilapia Grelhada", "Tilapia ao Forno com Ervas", "Tilapia Empanada Fit"],
  salmao: ["Salmao Grelhado", "Salmao ao Forno com Limao", "Salmao Assado com Ervas"],
  atum_lata: ["Atum em Lata Escorrido", "Patinho de Atum (escorrido)", "Salada de Atum"],
  tofu: ["Tofu Grelhado", "Tofu Salteado com Legumes", "Tofu Assado com Especiarias"],
  ovos: ["Ovos Mexidos", "Omelete de Legumes", "Ovos Cozidos"],
  file_mignon: ["File Mignon Grelhado", "Medalhao de File Mignon", "File Mignon ao Forno"],
  picanha: ["Picanha Grelhada (sem gordura)", "Picanha Assada (sem gordura)", "Tiras de Picanha ao Alho"],
  contra_file: ["Contra File Grelhado", "Contra File Acebolado", "Contra File ao Forno"],
  acem_moido: ["Acem Moido Refogado", "Bolinho de Acem", "Acem Moido ao Molho"],
  file_costela: ["File de Costela Grelhado", "File de Costela Assado", "File de Costela ao Alho"],
  lombo_suino: ["Lombo Suino Assado", "Lombo Suino Grelhado", "Lombo Suino ao Forno com Ervas"],
  // Carbs
  batata_doce: ["Batata Doce Cozida", "Batata Doce Assada", "Pure de Batata Doce"],
  batata_inglesa: ["Batata Inglesa Cozida", "Batata Inglesa Assada", "Pure de Batata Inglesa"],
  batata_baroa: ["Batata Baroa Cozida", "Batata Baroa Assada", "Pure de Batata Baroa"],
  mandioca: ["Mandioca Cozida", "Mandioca Assada", "Pure de Mandioca"],
  cuscuz: ["Cuscuz no Vapor", "Cuscuz com Ovo", "Cuscuz com Queijo Coalho"],
  tapioca: ["Tapioca com Recheio Salgado", "Tapioca com Recheio Doce", "Tapioca Crocante"],
  macarrao_integral: ["Macarrao Integral ao Sugo", "Macarrao Integral ao Alho e Oleo", "Macarrao Integral com Legumes"],
  macarrao_comum: ["Macarrao ao Sugo", "Macarrao ao Alho e Oleo", "Macarrao com Legumes"],
}

// ---------------------------------------------------------------------------
// 3. PORTION SIZES (by objetivo)
// ---------------------------------------------------------------------------

interface PortionDef {
  emagrecer: string
  ganhar_massa: string
  manter_saude: string
}

const PORTIONS: Record<string, PortionDef> = {
  // Frutas
  banana: { emagrecer: "1 unidade media (90g)", ganhar_massa: "2 unidades (180g)", manter_saude: "1 unidade grande (120g)" },
  maca: { emagrecer: "1 unidade media (100g)", ganhar_massa: "1 unidade grande (150g)", manter_saude: "1 unidade media (120g)" },
  mamao: { emagrecer: "1 fatia media (100g)", ganhar_massa: "2 fatias (200g)", manter_saude: "1 fatia grande (150g)" },
  morango: { emagrecer: "8 unidades (100g)", ganhar_massa: "12 unidades (150g)", manter_saude: "10 unidades (120g)" },
  uva: { emagrecer: "1 cacho pequeno (80g)", ganhar_massa: "1 cacho grande (150g)", manter_saude: "1 cacho medio (100g)" },
  manga: { emagrecer: "1/2 unidade (80g)", ganhar_massa: "1 unidade inteira (160g)", manter_saude: "1/2 unidade grande (120g)" },
  abacaxi: { emagrecer: "2 fatias (100g)", ganhar_massa: "3 fatias (150g)", manter_saude: "2 fatias grandes (120g)" },
  melancia: { emagrecer: "1 fatia media (150g)", ganhar_massa: "2 fatias (300g)", manter_saude: "1 fatia grande (200g)" },
  pera: { emagrecer: "1 unidade media (100g)", ganhar_massa: "1 unidade grande (150g)", manter_saude: "1 unidade (120g)" },
  kiwi: { emagrecer: "1 unidade (75g)", ganhar_massa: "2 unidades (150g)", manter_saude: "1 unidade grande (100g)" },
  laranja: { emagrecer: "1 unidade media (130g)", ganhar_massa: "2 unidades (260g)", manter_saude: "1 unidade grande (170g)" },

  // Proteinas
  peito_frango: { emagrecer: "120g - 1 file pequeno", ganhar_massa: "200g - 1 file grande", manter_saude: "150g - 1 file medio" },
  sobrecoxa: { emagrecer: "100g - 1 unidade", ganhar_massa: "180g - 2 unidades", manter_saude: "140g - 1 a 2 unidades" },
  patinho_moido: { emagrecer: "100g - 4 col. de sopa", ganhar_massa: "180g - 7 col. de sopa", manter_saude: "150g - 6 col. de sopa" },
  file_alcatra: { emagrecer: "100g - 1 bife pequeno", ganhar_massa: "200g - 1 bife grande", manter_saude: "150g - 1 bife medio" },
  tilapia: { emagrecer: "120g - 1 file medio", ganhar_massa: "200g - 1 file grande", manter_saude: "150g - 1 file medio-grande" },
  salmao: { emagrecer: "120g - 1 posta media", ganhar_massa: "200g - 1 posta grande", manter_saude: "150g - 1 posta" },
  atum_lata: { emagrecer: "1 lata pequena escorrida (80g)", ganhar_massa: "1 lata grande escorrida (130g)", manter_saude: "1 lata media escorrida (100g)" },
  ovos: { emagrecer: "2 ovos (100g)", ganhar_massa: "3 a 4 ovos (150-200g)", manter_saude: "2 a 3 ovos (100-150g)" },
  tofu: { emagrecer: "100g - 2 fatias", ganhar_massa: "180g - 4 fatias", manter_saude: "140g - 3 fatias" },
  whey_protein: { emagrecer: "30g - 1 scoop", ganhar_massa: "40g - 1 scoop cheio", manter_saude: "30g - 1 scoop" },
  file_mignon: { emagrecer: "120g - 1 medalhao", ganhar_massa: "200g - 2 medalhoes", manter_saude: "150g - 1 medalhao grande" },
  picanha: { emagrecer: "100g - 1 fatia fina (sem gordura)", ganhar_massa: "180g - 2 fatias (sem gordura)", manter_saude: "140g - 1 fatia media (sem gordura)" },
  contra_file: { emagrecer: "100g - 1 bife pequeno", ganhar_massa: "200g - 1 bife grande", manter_saude: "150g - 1 bife medio" },
  acem_moido: { emagrecer: "100g - 4 col. de sopa", ganhar_massa: "180g - 7 col. de sopa", manter_saude: "150g - 6 col. de sopa" },
  file_costela: { emagrecer: "100g - 1 bife pequeno", ganhar_massa: "200g - 1 bife grande", manter_saude: "150g - 1 bife medio" },
  lombo_suino: { emagrecer: "100g - 2 fatias finas", ganhar_massa: "200g - 3 a 4 fatias", manter_saude: "150g - 3 fatias" },

  // Graos e Carbos
  arroz_branco: { emagrecer: "80g - 2 col. de sopa rasas", ganhar_massa: "160g - 4 col. de sopa cheias", manter_saude: "100g - 3 col. de sopa" },
  arroz_integral: { emagrecer: "80g - 2 col. de sopa rasas", ganhar_massa: "160g - 4 col. de sopa cheias", manter_saude: "100g - 3 col. de sopa" },
  feijao_carioca: { emagrecer: "80g - 1 concha rasa", ganhar_massa: "150g - 1 concha cheia", manter_saude: "100g - 1 concha media" },
  feijao_preto: { emagrecer: "80g - 1 concha rasa", ganhar_massa: "150g - 1 concha cheia", manter_saude: "100g - 1 concha media" },
  feijao_fradinho: { emagrecer: "80g - 1 concha rasa", ganhar_massa: "150g - 1 concha cheia", manter_saude: "100g - 1 concha media" },
  grao_bico: { emagrecer: "80g - 3 col. de sopa", ganhar_massa: "150g - 6 col. de sopa", manter_saude: "100g - 4 col. de sopa" },
  lentilha: { emagrecer: "80g - 3 col. de sopa", ganhar_massa: "150g - 6 col. de sopa", manter_saude: "100g - 4 col. de sopa" },
  macarrao_integral: { emagrecer: "80g - 1 pegador pequeno", ganhar_massa: "150g - 2 pegadores", manter_saude: "100g - 1 pegador medio" },
  macarrao_comum: { emagrecer: "80g - 1 pegador pequeno", ganhar_massa: "150g - 2 pegadores", manter_saude: "100g - 1 pegador medio" },
  batata_doce: { emagrecer: "100g - 1 unidade pequena", ganhar_massa: "200g - 1 unidade grande", manter_saude: "150g - 1 unidade media" },
  batata_inglesa: { emagrecer: "100g - 1 unidade media", ganhar_massa: "200g - 2 unidades", manter_saude: "150g - 1 unidade grande" },
  batata_baroa: { emagrecer: "100g - 1 unidade", ganhar_massa: "200g - 2 unidades", manter_saude: "150g - 1 unidade grande" },
  mandioca: { emagrecer: "80g - 2 pedacos", ganhar_massa: "160g - 4 pedacos", manter_saude: "120g - 3 pedacos" },
  cuscuz: { emagrecer: "100g - 1 fatia pequena", ganhar_massa: "200g - 2 fatias", manter_saude: "150g - 1 fatia grande" },
  aveia: { emagrecer: "30g - 2 col. de sopa", ganhar_massa: "50g - 4 col. de sopa", manter_saude: "40g - 3 col. de sopa" },
  granola: { emagrecer: "25g - 2 col. de sopa", ganhar_massa: "50g - 4 col. de sopa", manter_saude: "35g - 3 col. de sopa" },
  tapioca: { emagrecer: "2 col. de sopa de goma", ganhar_massa: "4 col. de sopa de goma", manter_saude: "3 col. de sopa de goma" },

  // Paes
  pao_frances: { emagrecer: "1 unidade pequena (25g)", ganhar_massa: "2 unidades (50g)", manter_saude: "1 unidade (25g)" },
  pao_integral: { emagrecer: "1 fatia (25g)", ganhar_massa: "2 fatias (50g)", manter_saude: "1 fatia (25g)" },
  pao_forma: { emagrecer: "1 fatia (25g)", ganhar_massa: "2 fatias (50g)", manter_saude: "1 fatia (25g)" },
  pao_sirio: { emagrecer: "1 unidade pequena (30g)", ganhar_massa: "1 unidade grande (60g)", manter_saude: "1 unidade media (40g)" },

  // Vegetais e Saladas
  alface: { emagrecer: "a vontade", ganhar_massa: "porcao generosa", manter_saude: "a vontade" },
  tomate: { emagrecer: "3 fatias (40g)", ganhar_massa: "1 unidade (80g)", manter_saude: "4 fatias (60g)" },
  brocolis: { emagrecer: "100g - 4 floretes", ganhar_massa: "150g - 6 floretes", manter_saude: "120g - 5 floretes" },
  cenoura: { emagrecer: "1 unidade media ralada (60g)", ganhar_massa: "1 unidade grande (100g)", manter_saude: "1 unidade media (80g)" },
  espinafre: { emagrecer: "a vontade (refogado ou cru)", ganhar_massa: "porcao generosa", manter_saude: "a vontade" },
  couve_flor: { emagrecer: "100g - 4 floretes", ganhar_massa: "150g - 6 floretes", manter_saude: "120g - 5 floretes" },
  abobrinha: { emagrecer: "100g - 1/2 unidade", ganhar_massa: "150g - 1 unidade", manter_saude: "120g - 1/2 unidade grande" },
  berinjela: { emagrecer: "100g - 4 fatias", ganhar_massa: "150g - 6 fatias", manter_saude: "120g - 5 fatias" },
  pepino: { emagrecer: "a vontade", ganhar_massa: "porcao generosa", manter_saude: "a vontade" },
  beterraba: { emagrecer: "50g - 3 fatias", ganhar_massa: "100g - 1/2 unidade", manter_saude: "70g - 4 fatias" },
  rucula: { emagrecer: "a vontade", ganhar_massa: "porcao generosa", manter_saude: "a vontade" },

  // Complementos
  iogurte: { emagrecer: "170g - 1 pote desnatado", ganhar_massa: "250g - 1 pote integral", manter_saude: "170g - 1 pote natural" },
  queijo_branco: { emagrecer: "30g - 1 fatia fina", ganhar_massa: "60g - 2 fatias", manter_saude: "40g - 1 fatia media" },
  mix_castanhas: { emagrecer: "20g - 1 punhado pequeno", ganhar_massa: "40g - 1 punhado generoso", manter_saude: "30g - 1 punhado medio" },
  pasta_amendoim: { emagrecer: "15g - 1 col. de sopa rasa", ganhar_massa: "30g - 2 col. de sopa", manter_saude: "20g - 1 col. de sopa cheia" },
  cottage: { emagrecer: "40g - 2 col. de sopa", ganhar_massa: "80g - 4 col. de sopa", manter_saude: "60g - 3 col. de sopa" },
  mel: { emagrecer: "1 col. de cha (5ml)", ganhar_massa: "1 col. de sopa (15ml)", manter_saude: "1 col. de cha cheia (8ml)" },
  doce_de_leite: { emagrecer: "1 col. de cha (10g)", ganhar_massa: "1 col. de sopa (25g)", manter_saude: "1 col. de sobremesa (15g)" },
  chocolate_70: { emagrecer: "1 quadrado (10g)", ganhar_massa: "2 quadrados (20g)", manter_saude: "1 a 2 quadrados (15g)" },
}

// ---------------------------------------------------------------------------
// 4. HELPERS
// ---------------------------------------------------------------------------

function getFoodById(id: string) {
  return FOOD_DATA.find((f) => f.id === id)
}

function getPortion(id: string, obj: Objetivo): string {
  return PORTIONS[id]?.[obj] ?? ""
}

function getSeasoning(id: string, seed: number): string {
  const food = getFoodById(id)
  if (!food) return ""
  if (food.flavor === "doce") {
    return TEMPERO_DOCE[seed % TEMPERO_DOCE.length]
  }
  if (food.flavor === "salgado") {
    return TEMPERO_SALGADO[seed % TEMPERO_SALGADO.length]
  }
  // neutro: context decides (we default to salgado for meals, doce for snacks)
  return ""
}

function getSeasoningForContext(id: string, context: "refeicao" | "lanche", seed: number): string {
  const food = getFoodById(id)
  if (!food) return ""
  if (food.flavor === "doce") return TEMPERO_DOCE[seed % TEMPERO_DOCE.length]
  if (food.flavor === "salgado") return TEMPERO_SALGADO[seed % TEMPERO_SALGADO.length]
  // neutro
  if (context === "lanche") return TEMPERO_DOCE[seed % TEMPERO_DOCE.length]
  return TEMPERO_SALGADO[seed % TEMPERO_SALGADO.length]
}

function getCookingName(id: string, phase: number): string {
  const variations = COOKING_VARIATIONS[id]
  if (variations) return variations[phase]
  const food = getFoodById(id)
  return food?.name ?? id
}

function hashSeed(a: number, b: number): number {
  return ((a + 1) * 31 + (b + 1) * 17) % 997
}

/** Pick `count` items from arr starting at a deterministic offset */
function pickItems<T>(arr: T[], count: number, offset: number): T[] {
  if (arr.length === 0) return []
  const result: T[] = []
  for (let i = 0; i < Math.min(count, arr.length); i++) {
    result.push(arr[(offset + i) % arr.length])
  }
  return result
}

/** Build a single line: "Peito de Frango Grelhado - 120g (temperado com alho)" */
function buildLine(foodId: string, obj: Objetivo, phase: number, context: "refeicao" | "lanche", seed: number): string {
  const displayName = getCookingName(foodId, phase)
  const portion = getPortion(foodId, obj)
  const seasoning = getSeasoningForContext(foodId, context, seed)
  const parts = [displayName]
  if (portion) parts.push(`- ${portion}`)
  if (seasoning) parts.push(`(${seasoning})`)
  return parts.join(" ")
}

// ---------------------------------------------------------------------------
// 5. MEAL ASSEMBLY
// ---------------------------------------------------------------------------

function getSelectedByCategories(selectedIds: string[]) {
  const frutas = selectedIds.filter((id) => getFoodById(id)?.category === "frutas")
  const proteinas = selectedIds.filter((id) => getFoodById(id)?.category === "proteinas")
  const graos = selectedIds.filter((id) => getFoodById(id)?.category === "graos_carbos")
  const paes = selectedIds.filter((id) => getFoodById(id)?.category === "paes")
  const vegetais = selectedIds.filter((id) => getFoodById(id)?.category === "vegetais_saladas")
  const complementos = selectedIds.filter((id) => getFoodById(id)?.category === "complementos")
  return { frutas, proteinas, graos, paes, vegetais, complementos }
}

function generateWeekMeals(
  selectedIds: string[],
  obj: Objetivo,
  weekIndex: number,
  phaseIndex: number,
): MealPlan {
  const cats = getSelectedByCategories(selectedIds)
  const w = weekIndex
  const p = phaseIndex
  const seed = hashSeed(w, p)

  // ── Cafe da Manha ──
  const cafe: string[] = []
  // 1 pao or tapioca/cuscuz
  const carbCafe = [...cats.paes, ...cats.graos.filter((id) => ["tapioca", "cuscuz", "aveia", "granola"].includes(id))]
  if (carbCafe.length > 0) {
    const pick = carbCafe[(seed + w) % carbCafe.length]
    cafe.push(buildLine(pick, obj, p, "refeicao", seed))
  }
  // 1 protein (eggs, whey, cheese)
  const protCafe = selectedIds.filter((id) => ["ovos", "queijo_branco", "cottage", "whey_protein"].includes(id))
  if (protCafe.length > 0) {
    const pick = protCafe[(seed + w + 1) % protCafe.length]
    cafe.push(buildLine(pick, obj, p, "refeicao", seed + 1))
  }
  // 1 fruit (sweet context)
  if (cats.frutas.length > 0) {
    const pick = cats.frutas[(seed + w + 2) % cats.frutas.length]
    cafe.push(buildLine(pick, obj, p, "lanche", seed + 2))
  }
  // optional complement
  const compDoceCafe = cats.complementos.filter((id) => {
    const f = getFoodById(id)
    return f && f.flavor === "doce"
  })
  if (compDoceCafe.length > 0 && cafe.length < 4) {
    const pick = compDoceCafe[(seed + w) % compDoceCafe.length]
    if (!cafe.some((line) => line.includes(getFoodById(pick)?.name ?? ""))) {
      cafe.push(buildLine(pick, obj, p, "lanche", seed + 3))
    }
  }

  // ── Almoco ──
  const almoco: string[] = []
  // 1 arroz/carb
  const carbAlmoco = cats.graos.filter((id) =>
    ["arroz_branco", "arroz_integral", "macarrao_integral", "macarrao_comum", "batata_doce", "batata_inglesa", "batata_baroa", "mandioca"].includes(id)
  )
  if (carbAlmoco.length > 0) {
    const pick = carbAlmoco[(seed + w) % carbAlmoco.length]
    almoco.push(buildLine(pick, obj, p, "refeicao", seed + 10))
  }
  // 1 feijao/leguminosa
  const leguminosas = cats.graos.filter((id) =>
    ["feijao_carioca", "feijao_preto", "feijao_fradinho", "grao_bico", "lentilha"].includes(id)
  )
  if (leguminosas.length > 0) {
    const pick = leguminosas[(seed + w + 1) % leguminosas.length]
    almoco.push(buildLine(pick, obj, p, "refeicao", seed + 11))
  }
  // 1-2 proteins
  const protSalgado = cats.proteinas.filter((id) => {
    const f = getFoodById(id)
    return f && f.flavor === "salgado"
  })
  if (protSalgado.length > 0) {
    const picked = pickItems(protSalgado, Math.min(1, protSalgado.length), seed + w + 2)
    picked.forEach((id, i) => almoco.push(buildLine(id, obj, p, "refeicao", seed + 12 + i)))
  }
  // 1-2 vegetais
  if (cats.vegetais.length > 0) {
    const picked = pickItems(cats.vegetais, Math.min(2, cats.vegetais.length), seed + w + 4)
    picked.forEach((id, i) => almoco.push(buildLine(id, obj, p, "refeicao", seed + 14 + i)))
  }

  // ── Lanche da Tarde ──
  const lanche: string[] = []
  // 1 fruit
  if (cats.frutas.length > 0) {
    const pick = cats.frutas[(seed + w + 5) % cats.frutas.length]
    lanche.push(buildLine(pick, obj, p, "lanche", seed + 20))
  }
  // 1 complement/protein doce
  const lancheExtras = [...cats.complementos, ...selectedIds.filter((id) => id === "whey_protein")]
  if (lancheExtras.length > 0) {
    const pick = lancheExtras[(seed + w + 3) % lancheExtras.length]
    if (!lanche.some((l) => l.includes(getFoodById(pick)?.name ?? ""))) {
      lanche.push(buildLine(pick, obj, p, "lanche", seed + 21))
    }
  }
  // optional nuts
  if (selectedIds.includes("mix_castanhas") && lanche.length < 3) {
    if (!lanche.some((l) => l.includes("Castanhas"))) {
      lanche.push(buildLine("mix_castanhas", obj, p, "lanche", seed + 22))
    }
  }

  // ── Jantar ──
  const jantar: string[] = []
  // lighter carb option or vegetable base
  if (carbAlmoco.length > 0) {
    // pick a different carb than lunch when possible
    const pick = carbAlmoco[(seed + w + 3) % carbAlmoco.length]
    jantar.push(buildLine(pick, obj, p, "refeicao", seed + 30))
  }
  // 1 protein (rotate differently from lunch)
  if (protSalgado.length > 0) {
    const pick = protSalgado[(seed + w + 4) % protSalgado.length]
    jantar.push(buildLine(pick, obj, p, "refeicao", seed + 31))
  }
  // 1-2 vegetais
  if (cats.vegetais.length > 0) {
    const picked = pickItems(cats.vegetais, Math.min(2, cats.vegetais.length), seed + w + 6)
    picked.forEach((id, i) => jantar.push(buildLine(id, obj, p, "refeicao", seed + 32 + i)))
  }

  return {
    cafeDaManha: cafe.length > 0 ? cafe : ["Cafe conforme preferencia"],
    almoco: almoco.length > 0 ? almoco : ["Almoco conforme preferencia"],
    lancheDaTarde: lanche.length > 0 ? lanche : ["Lanche conforme preferencia"],
    jantar: jantar.length > 0 ? jantar : ["Jantar conforme preferencia"],
  }
}

// ---------------------------------------------------------------------------
// 6. MAIN EXPORT
// ---------------------------------------------------------------------------

export function generateDiet(selectedFoods: string[], objetivo: Objetivo): GeneratedDiet {
  const phases: DietPhase[] = [
    { phaseName: "Fase 1", phaseLabel: "Semanas 1-4 \u2014 Adaptacao", weeks: [] },
    { phaseName: "Fase 2", phaseLabel: "Semanas 5-8 \u2014 Progressao", weeks: [] },
    { phaseName: "Fase 3", phaseLabel: "Semanas 9-12 \u2014 Consolidacao", weeks: [] },
  ]

  phases.forEach((phase, phaseIndex) => {
    for (let w = 0; w < 4; w++) {
      const weekNum = phaseIndex * 4 + w + 1
      phase.weeks.push({
        weekLabel: `Semana ${weekNum}`,
        meals: generateWeekMeals(selectedFoods, objetivo, w, phaseIndex),
      })
    }
  })

  const hydrationProtocol = [
    "Ao acordar: 1 copo de agua morna (200ml)",
    "Antes do cafe: 1 copo de agua (200ml)",
    "Manha (10h): 1 garrafa de agua (500ml)",
    "Antes do almoco: 1 copo de agua (200ml)",
    "Tarde (15h): 1 garrafa de agua (500ml)",
    "Antes do jantar: 1 copo de agua (200ml)",
    "Noite: 1 copo de agua ou cha sem acucar (200ml)",
    `Meta diaria: ${objetivo === "ganhar_massa" ? "3 a 4 litros" : "2 a 3 litros"}`,
  ]

  return { phases, hydrationProtocol }
}
