import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronDown, ChevronUp, ChevronRight, Plus, Minus, X } from "lucide-react";
import {
  CompassIcon,
  MapPinIcon,
  SeedlingIcon,
  StarIcon,
  CoinIcon,
  LightbulbIcon,
  CheckCircleIcon,
  FamilyIcon,
  BookIcon,
  TargetIcon,
  BikeIcon,
  GamepadIcon,
  GiftIcon,
  SparklesIcon,
  ClockIcon,
  HeartHandIcon,
  PuzzleIcon,
  PiggyIcon,
  EditIcon,
} from "./Icons";
import type { IconProps } from "./Icons";
import type { ComponentType } from "react";
import { useMissions } from "./MissionContext";
import { bg, shadowOut, shadowOutSm, shadowInset } from "./designTokens";

interface Mission {
  id: number;
  methodology: string;
  methodologyTag: string;
  title: string;
  desc: string;
  parentTip: string;
  steps: string[];
  Icon: ComponentType<IconProps>;
  time: string;
  xp: number;
  color: string;
  difficulty: "Fácil" | "Media";
}

const missions: Mission[] = [
  {
    id: 1,
    methodology: "Reggio Emilia",
    methodologyTag: "Exploración guiada",
    title: "Exploradores del mercado",
    desc: "Lleva a Sofi al mercado. Que observe, toque y pregunte sobre los precios. Ella elige 3 productos y compara cuál cuesta más.",
    parentTip: "No corrijas si se equivoca con los precios. Deja que descubra sola y pregúntale: \"¿Tú qué crees?\"",
    steps: [
      "Visiten juntos un mercado o bodega",
      "Sofi elige 3 productos que le llamen la atención",
      "Comparen precios: ¿cuál es más caro?",
      "Decidan juntos qué comprar con S/ 5",
    ],
    Icon: MapPinIcon,
    time: "30 min",
    xp: 25,
    color: "#2563EB",
    difficulty: "Fácil",
  },
  {
    id: 2,
    methodology: "Aprendizaje Colaborativo",
    methodologyTag: "Trabajo en equipo",
    title: "Lista de compras familiar",
    desc: "En familia, planifiquen la compra de la semana. Sofi propone lo que quiere y juntos deciden qué entra en el presupuesto.",
    parentTip: "Dale a Sofi el rol de \"apuntadora oficial\". Sentirse importante la motiva a participar.",
    steps: [
      "Reúnanse con papel y colores",
      "Cada uno propone 2 cosas para comprar",
      "Sofi dibuja cada ítem de la lista",
      "Decidan juntos qué entra en el presupuesto",
    ],
    Icon: FamilyIcon,
    time: "20 min",
    xp: 30,
    color: "#7C3AED",
    difficulty: "Fácil",
  },
  {
    id: 3,
    methodology: "Reggio Emilia",
    methodologyTag: "Aprender haciendo",
    title: "La tiendita de casa",
    desc: "Monten una tiendita con juguetes y objetos de casa. Sofi pone precios, cobra y da vuelto con monedas reales o de papel.",
    parentTip: "Usa monedas reales de baja denominación. Tocar el dinero real hace la experiencia más memorable.",
    steps: [
      "Junten 8-10 objetos o juguetes de casa",
      "Sofi les pone precio con etiquetas",
      "Jueguen a comprar y vender por turnos",
      "Cuenten juntos cuánto \"ganó\" la tiendita",
    ],
    Icon: CoinIcon,
    time: "25 min",
    xp: 35,
    color: "#FF7849",
    difficulty: "Fácil",
  },
  {
    id: 4,
    methodology: "Reggio Emilia",
    methodologyTag: "Observación activa",
    title: "Diario del dinero",
    desc: "Durante 5 días, Sofi dibuja o pega stickers cada vez que ve dinero en acción: en la bodega, el taxi, la panadería.",
    parentTip: "Al final de la semana, miren los dibujos juntos. Pregunta: \"¿A dónde fue el dinero?\" - la reflexión fija el aprendizaje.",
    steps: [
      "Dale a Sofi un cuadernito decorado especial",
      "Cada vez que vea una compra, la dibuja",
      "Al final de la semana, revisen juntos",
      "Conversen: ¿a dónde va el dinero?",
    ],
    Icon: SeedlingIcon,
    time: "5 días",
    xp: 40,
    color: "#7C3AED",
    difficulty: "Media",
  },
];

/* ── Goal tips & ideas ── */

interface GoalTip {
  id: number;
  title: string;
  desc: string;
  Icon: ComponentType<IconProps>;
  color: string;
}

const goalTips: GoalTip[] = [
  {
    id: 1,
    title: "Que Sofi elija la meta",
    desc: "Preguntale: \"Si pudieras ahorrar para algo especial, ¿qué sería?\" Cuando ella decide, el compromiso es real.",
    Icon: StarIcon,
    color: "#FF7849",
  },
  {
    id: 2,
    title: "Metas pequeñas primero",
    desc: "A los 6 años, una meta de S/ 10 a S/ 30 es ideal. Que pueda lograrlo en 2-4 semanas para que no pierda la motivación.",
    Icon: SeedlingIcon,
    color: "#22c55e",
  },
  {
    id: 3,
    title: "Hazla visible",
    desc: "Dibujen juntos un termómetro de ahorro y péguenlo en la nevera. Cada vez que Sofi ahorre, colorea el avance.",
    Icon: TargetIcon,
    color: "#2563EB",
  },
  {
    id: 4,
    title: "Celebra el proceso",
    desc: "Cada vez que deposite algo, dile lo orgullosa que estás. El hábito vale más que la meta en sí.",
    Icon: SparklesIcon,
    color: "#7C3AED",
  },
];

interface GoalIdea {
  id: number;
  label: string;
  amount: string;
  Icon: ComponentType<IconProps>;
  color: string;
  time: string;
}

const goalIdeas: GoalIdea[] = [
  { id: 1, label: "Juguete favorito", amount: "S/ 15 - 30", Icon: GamepadIcon, color: "#7C3AED", time: "2-3 semanas" },
  { id: 2, label: "Libro o cuento", amount: "S/ 10 - 20", Icon: BookIcon, color: "#2563EB", time: "1-2 semanas" },
  { id: 3, label: "Regalo para alguien", amount: "S/ 15 - 25", Icon: GiftIcon, color: "#FF7849", time: "2-3 semanas" },
  { id: 4, label: "Paseo o experiencia", amount: "S/ 20 - 40", Icon: BikeIcon, color: "#22c55e", time: "3-4 semanas" },
];

const goalSteps = [
  { num: 1, text: "Siéntate con Sofi y pregúntale para qué le gustaría ahorrar" },
  { num: 2, text: "Juntos decidan cuánto necesitan y en cuánto tiempo" },
  { num: 3, text: "Crea la meta en la app y ella verá su progreso" },
  { num: 4, text: "Cada vez que ahorre, celebren el avance juntos" },
];

/* ── Stories ── */

interface Story {
  id: number;
  title: string;
  subtitle: string;
  lesson: string;
  duration: string;
  color: string;
  Icon: ComponentType<IconProps>;
  ageTag: string;
  chapters: number;
}

const stories: Story[] = [
  {
    id: 1,
    title: "La moneda que viajó por todo el barrio",
    subtitle: "Sofi encuentra una moneda y descubre todo lo que puede hacer con ella.",
    lesson: "Las monedas pasan de mano en mano y ayudan a las personas",
    duration: "5 min",
    color: "#FF7849",
    Icon: CoinIcon,
    ageTag: "Para Sofi",
    chapters: 3,
  },
  {
    id: 2,
    title: "El árbol que daba soles",
    subtitle: "Un árbol mágico enseña a Sofi que hay que regar (ahorrar) para que crezcan frutos.",
    lesson: "Si guardas un poquito cada vez, al final tendrás mucho",
    duration: "6 min",
    color: "#22c55e",
    Icon: SeedlingIcon,
    ageTag: "Para Sofi",
    chapters: 4,
  },
  {
    id: 3,
    title: "La alcancía que soñaba despierta",
    subtitle: "La alcancía de Sofi le cuenta sobre todas las cosas bonitas que van a lograr juntas.",
    lesson: "Tener una meta hace que ahorrar sea divertido",
    duration: "4 min",
    color: "#7C3AED",
    Icon: StarIcon,
    ageTag: "Para Sofi",
    chapters: 3,
  },
  {
    id: 4,
    title: "El mercado de los animales",
    subtitle: "Los animales del bosque tienen un mercado. Sofi les ayuda a decidir qué necesitan y qué pueden esperar.",
    lesson: "Diferenciar lo que necesitamos de lo que queremos",
    duration: "7 min",
    color: "#2563EB",
    Icon: PuzzleIcon,
    ageTag: "Para Sofi",
    chapters: 5,
  },
];

const dailyTips = [
  {
    text: "Cuando Sofi pida algo en la tienda, en vez de decir \"no\", pregúntale: \"¿Lo necesitas o lo quieres?\" Esa sola pregunta enseña más que cualquier charla.",
    source: "Tip de hoy",
  },
];

const difficultyColors: Record<string, string> = {
  "Fácil": "#22c55e",
  "Media": "#FF7849",
};

/* ══════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════ */

type TabId = "misiones" | "metas" | "cuentos";

const tabs: { id: TabId; label: string; Icon: ComponentType<IconProps>; color: string }[] = [
  { id: "misiones", label: "Misiones", Icon: CompassIcon, color: "#2563EB" },
  { id: "metas", label: "Metas", Icon: TargetIcon, color: "#FF7849" },
  { id: "cuentos", label: "Cuentos", Icon: BookIcon, color: "#7C3AED" },
];

/* ── Missions Tab ── */
function MissionsTab() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { activeMission, startMission } = useMissions();

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
      {/* Methodology explainer */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl p-4 mb-4 flex items-start gap-3"
        style={{ backgroundColor: "#2563EB", boxShadow: "6px 6px 16px rgba(37,99,235,0.35), -4px -4px 12px #ffffff" }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
          <LightbulbIcon size={20} color="white" strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-white text-xs mb-1" style={{ fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>Basadas en Reggio Emilia</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
            Sofi aprende tocando, explorando y decidiendo. Tú solo acompañas y preguntas.
          </p>
        </div>
      </motion.div>

      {/* Mission cards */}
      <div className="space-y-3">
        {missions.map((m, i) => {
          const isExpanded = expandedId === m.id;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: bg, boxShadow: shadowOut }}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : m.id)}
                className="w-full p-4 flex items-start gap-3 text-left"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${m.color}10` }}>
                  <m.Icon size={20} color={m.color} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs uppercase tracking-wider" style={{ color: m.color, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                      {m.methodologyTag}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${difficultyColors[m.difficulty]}15`, color: difficultyColors[m.difficulty], fontWeight: 600 }}>
                      {m.difficulty}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>{m.title}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1" style={{ color: "#a0aab8" }}>
                      <ClockIcon size={14} color="#a0aab8" />
                      <span className="text-xs" style={{ fontWeight: 500 }}>{m.time}</span>
                    </div>
                    <span className="text-xs" style={{ color: m.color, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>
                      +{m.xp} XP
                    </span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ backgroundColor: bg }}>
                  {isExpanded ? <ChevronUp size={14} color="#8a95a5" /> : <ChevronDown size={14} color="#8a95a5" />}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <div className="rounded-xl p-3 mb-3" style={{ backgroundColor: bg, boxShadow: shadowInset }}>
                        <p className="text-xs" style={{ color: "#5a7094", lineHeight: 1.6 }}>{m.desc}</p>
                      </div>

                      <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
                        Pasos de la misión
                      </p>
                      <div className="space-y-2 mb-3">
                        {m.steps.map((step, si) => (
                          <div key={si} className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: `${m.color}10`, fontSize: 12, color: m.color, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                              {si + 1}
                            </div>
                            <p className="text-xs" style={{ color: "#5a7094", lineHeight: 1.5 }}>{step}</p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl p-3 mb-3 flex items-start gap-2.5" style={{ backgroundColor: "#fffbeb" }}>
                        <HeartHandIcon size={16} color="#FF7849" strokeWidth={1.8} className="shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#FF7849", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                            Tip para ti
                          </p>
                          <p className="text-[13px]" style={{ color: "#92400e", lineHeight: 1.5 }}>{m.parentTip}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1 rounded-full px-2.5 py-1 flex items-center gap-1" style={{ backgroundColor: `${m.color}08` }}>
                          <span className="text-xs" style={{ color: m.color, fontWeight: 600 }}>{m.methodology}</span>
                        </div>
                        {activeMission?.id === m.id ? (
                          <div className="rounded-xl px-4 py-2.5 flex items-center gap-1.5"
                            style={{ backgroundColor: `${m.color}12`, border: `1.5px solid ${m.color}` }}>
                            <CheckCircleIcon size={14} color={m.color} strokeWidth={2} />
                            <span className="text-xs" style={{ color: m.color, fontWeight: 600 }}>En progreso</span>
                          </div>
                        ) : (
                          <button
                            className="rounded-xl px-4 py-2.5 flex items-center gap-1.5 transition-all active:scale-[0.97]"
                            style={{ backgroundColor: m.color, boxShadow: `3px 3px 8px ${m.color}40, -2px -2px 6px #ffffff`, opacity: activeMission ? 0.5 : 1 }}
                            disabled={!!activeMission}
                            onClick={() => {
                              startMission({
                                id: m.id,
                                title: m.title,
                                methodologyTag: m.methodologyTag,
                                color: m.color,
                                Icon: m.Icon,
                                time: m.time,
                                xp: m.xp,
                              });
                              setExpandedId(null);
                            }}
                          >
                            <CheckCircleIcon size={14} color="white" strokeWidth={2} />
                            <span className="text-xs text-white" style={{ fontWeight: 600 }}>Iniciar misión</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   CREATE SAVINGS GOAL FLOW
   ══════════════════════════════════════════ */

interface GoalCategory {
  id: string;
  label: string;
  emoji: string;
  Icon: ComponentType<IconProps>;
  color: string;
  suggestedMin: number;
  suggestedMax: number;
  suggestedWeeks: number;
}

const goalCategories: GoalCategory[] = [
  { id: "toy", label: "Juguete", emoji: "🎮", Icon: GamepadIcon, color: "#7C3AED", suggestedMin: 15, suggestedMax: 30, suggestedWeeks: 3 },
  { id: "book", label: "Libro", emoji: "📖", Icon: BookIcon, color: "#2563EB", suggestedMin: 10, suggestedMax: 20, suggestedWeeks: 2 },
  { id: "gift", label: "Regalo", emoji: "🎁", Icon: GiftIcon, color: "#FF7849", suggestedMin: 15, suggestedMax: 25, suggestedWeeks: 3 },
  { id: "trip", label: "Paseo", emoji: "🚲", Icon: BikeIcon, color: "#22c55e", suggestedMin: 20, suggestedMax: 40, suggestedWeeks: 4 },
  { id: "custom", label: "Otra meta", emoji: "✨", Icon: StarIcon, color: "#f59e0b", suggestedMin: 10, suggestedMax: 50, suggestedWeeks: 3 },
];

const weekOptions = [1, 2, 3, 4, 5, 6, 7, 8];

function CreateGoalFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory | null>(null);
  const [customName, setCustomName] = useState("");
  const [amount, setAmount] = useState(20);
  const [weeks, setWeeks] = useState(3);
  const [goalCreated, setGoalCreated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const goalName = selectedCategory?.id === "custom"
    ? (customName || "Mi meta especial")
    : (selectedCategory?.label ?? "");

  const weeklyDeposit = Math.ceil(amount / weeks);
  const accentColor = selectedCategory?.color ?? "#FF7849";

  function handleNext() {
    if (step < 3) setStep(step + 1);
    else {
      setGoalCreated(true);
      setStep(4);
    }
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  const canProceed =
    (step === 1 && selectedCategory !== null && (selectedCategory.id !== "custom" || customName.trim().length > 0)) ||
    (step === 2 && amount >= 1) ||
    (step === 3);

  // ── Step 1: Choose what to save for ──
  function Step1() {
    return (
      <motion.div
        key="step1"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.25 }}
      >
        {/* Question */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: "#FF784910", boxShadow: shadowOutSm }}
          >
            <PiggyIcon size={32} color="#FF7849" strokeWidth={1.6} />
          </motion.div>
          <p className="text-sm" style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
            ¿Para qué quiere ahorrar Sofi?
          </p>
          <p className="text-xs mt-1" style={{ color: "#8a95a5" }}>
            Elige una categoría o crea una propia
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {goalCategories.slice(0, 4).map((cat, i) => {
            const selected = selectedCategory?.id === cat.id;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSelectedCategory(cat); setAmount(cat.suggestedMin); setWeeks(cat.suggestedWeeks); }}
                className="rounded-2xl p-3 flex flex-col items-center gap-2 transition-all"
                style={{
                  backgroundColor: selected ? `${cat.color}12` : bg,
                  boxShadow: selected ? `0 0 0 2px ${cat.color}, ${shadowOutSm}` : shadowOutSm,
                }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: selected ? cat.color : `${cat.color}10` }}>
                  <cat.Icon size={20} color={selected ? "white" : cat.color} strokeWidth={1.8} />
                </div>
                <span className="text-xs" style={{ color: selected ? cat.color : "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
                  {cat.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Custom goal button */}
        {(() => {
          const custom = goalCategories[4];
          const selected = selectedCategory?.id === "custom";
          return (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedCategory(custom);
                setAmount(custom.suggestedMin);
                setWeeks(custom.suggestedWeeks);
                setTimeout(() => inputRef.current?.focus(), 100);
              }}
              className="w-full rounded-2xl p-3.5 flex items-center gap-3 transition-all"
              style={{
                backgroundColor: selected ? `${custom.color}12` : bg,
                boxShadow: selected ? `0 0 0 2px ${custom.color}, ${shadowOutSm}` : shadowOutSm,
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: selected ? custom.color : `${custom.color}10` }}>
                <EditIcon size={18} color={selected ? "white" : custom.color} strokeWidth={1.8} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs" style={{ color: selected ? custom.color : "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
                  Escribir mi propia meta
                </p>
                <p className="text-xs" style={{ color: "#b0b8c4" }}>Sofi elige para qué ahorrar</p>
              </div>
              <SparklesIcon size={14} color={selected ? custom.color : "#b0b8c4"} strokeWidth={1.8} />
            </motion.button>
          );
        })()}

        {/* Custom name input */}
        <AnimatePresence>
          {selectedCategory?.id === "custom" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-2xl p-3" style={{ backgroundColor: bg, boxShadow: shadowInset }}>
                <label className="text-xs uppercase tracking-wider block mb-2"
                  style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.12em" }}>
                  ¿Para qué quiere ahorrar?
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Ej: Patines, peluche, crayones..."
                  maxLength={40}
                  className="w-full bg-transparent text-sm outline-none"
                  style={{ color: "#2d3548", fontWeight: 500, fontFamily: "'Nunito Sans', sans-serif" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // ── Step 2: Set amount ──
  function Step2() {
    const minAmount = 5;
    const maxAmount = 100;

    return (
      <motion.div
        key="step2"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.25 }}
      >
        <div className="text-center mb-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: `${accentColor}10`, boxShadow: shadowOutSm }}
          >
            {selectedCategory && <selectedCategory.Icon size={32} color={accentColor} strokeWidth={1.6} />}
          </motion.div>
          <p className="text-sm" style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
            ¿Cuánto cuesta {goalName.toLowerCase()}?
          </p>
          <p className="text-xs mt-1" style={{ color: "#8a95a5" }}>
            Puedes ajustarlo después
          </p>
        </div>

        {/* Amount display */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl p-5 mb-4 text-center"
          style={{ backgroundColor: bg, boxShadow: shadowOut }}
        >
          <div className="flex items-center justify-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setAmount(Math.max(minAmount, amount - 5))}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}10` }}
            >
              <Minus size={18} color={accentColor} strokeWidth={2.5} />
            </motion.button>

            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
                Meta de ahorro
              </p>
              <p className="text-3xl" style={{ color: accentColor, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                S/ {amount}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setAmount(Math.min(maxAmount, amount + 5))}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}10` }}
            >
              <Plus size={18} color={accentColor} strokeWidth={2.5} />
            </motion.button>
          </div>

          {/* Slider */}
          <div className="mt-4 px-2">
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${accentColor} ${((amount - minAmount) / (maxAmount - minAmount)) * 100}%, #e5e7eb ${((amount - minAmount) / (maxAmount - minAmount)) * 100}%)`,
              }}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-xs" style={{ color: "#b0b8c4" }}>S/ {minAmount}</span>
              <span className="text-xs" style={{ color: "#b0b8c4" }}>S/ {maxAmount}</span>
            </div>
          </div>
        </motion.div>

        {/* Quick amounts */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <p className="text-xs uppercase tracking-wider mb-2.5" style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.12em" }}>
            Montos sugeridos
          </p>
          <div className="flex gap-2">
            {[10, 20, 30, 50].map((val) => (
              <motion.button
                key={val}
                whileTap={{ scale: 0.93 }}
                onClick={() => setAmount(val)}
                className="flex-1 rounded-xl py-2.5 text-xs transition-all"
                style={{
                  backgroundColor: amount === val ? accentColor : bg,
                  color: amount === val ? "white" : "#5a7094",
                  fontWeight: 600,
                  fontFamily: "'Nunito Sans', sans-serif",
                  boxShadow: amount === val ? `0 4px 12px ${accentColor}40` : shadowOutSm,
                }}
              >
                S/ {val}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // ── Step 3: Set timeframe ──
  function Step3() {
    return (
      <motion.div
        key="step3"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.25 }}
      >
        <div className="text-center mb-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: `${accentColor}10`, boxShadow: shadowOutSm }}
          >
            <ClockIcon size={32} color={accentColor} strokeWidth={1.6} />
          </motion.div>
          <p className="text-sm" style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
            ¿En cuántas semanas lo lograremos?
          </p>
          <p className="text-xs mt-1" style={{ color: "#8a95a5" }}>
            Un poquito cada semana
          </p>
        </div>

        {/* Week selector */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl p-4 mb-4"
          style={{ backgroundColor: bg, boxShadow: shadowOut }}
        >
          <div className="grid grid-cols-4 gap-2 mb-4">
            {weekOptions.map((w) => (
              <motion.button
                key={w}
                whileTap={{ scale: 0.93 }}
                onClick={() => setWeeks(w)}
                className="rounded-xl py-3 flex flex-col items-center gap-1 transition-all"
                style={{
                  backgroundColor: weeks === w ? accentColor : bg,
                  boxShadow: weeks === w ? `0 4px 12px ${accentColor}40` : shadowOutSm,
                }}
              >
                <span className="text-lg" style={{ color: weeks === w ? "white" : "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                  {w}
                </span>
                <span className="text-xs" style={{ color: weeks === w ? "rgba(255,255,255,0.8)" : "#b0b8c4", fontWeight: 500 }}>
                  {w === 1 ? "semana" : "semanas"}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Weekly deposit summary */}
          <div className="rounded-xl p-3.5" style={{ backgroundColor: `${accentColor}08`, border: `1.5px dashed ${accentColor}30` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CoinIcon size={16} color={accentColor} strokeWidth={1.8} />
                <span className="text-xs" style={{ color: "#5a7094", fontWeight: 500 }}>Ahorro semanal</span>
              </div>
              <span className="text-sm" style={{ color: accentColor, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                S/ {weeklyDeposit}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Visual timeline preview */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-4"
          style={{ backgroundColor: bg, boxShadow: shadowOut }}
        >
          <p className="text-xs uppercase tracking-wider mb-3"
            style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.12em" }}>
            Así se verá el progreso
          </p>
          {/* Progress bar preview */}
          <div className="relative mb-3">
            <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${accentColor}15` }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "30%" }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs" style={{ color: "#b0b8c4" }}>S/ 0</span>
              <span className="text-xs" style={{ color: accentColor, fontWeight: 600 }}>S/ {amount}</span>
            </div>
          </div>
          {/* Week markers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(weeks, 8) }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 400 }}
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: i === 0 ? accentColor : `${accentColor}20`,
                    fontSize: 10,
                    color: i === 0 ? "white" : accentColor,
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </motion.div>
              </div>
            ))}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + weeks * 0.08, type: "spring", stiffness: 400 }}
              className="flex items-center justify-center"
            >
              <SparklesIcon size={14} color={accentColor} strokeWidth={2} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // ── Step 4: Celebration ──
  function Step4() {
    return (
      <motion.div
        key="step4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35 }}
        className="text-center"
      >
        {/* Confetti particles */}
        <div className="relative h-32 mb-2">
          {["🎉", "⭐", "🌟", "💰", "✨", "🎊", "💫", "🪙"].map((emoji, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, x: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [20, -40 - Math.random() * 30, -60 - Math.random() * 30, -80],
                x: [-40 + Math.random() * 80, -60 + Math.random() * 120, -40 + Math.random() * 80],
              }}
              transition={{ duration: 2, delay: i * 0.12, repeat: Infinity, repeatDelay: 2 }}
              className="absolute text-lg"
              style={{ left: `${20 + (i * 8)}%`, top: "60%" }}
            >
              {emoji}
            </motion.span>
          ))}

          {/* Big checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#22c55e", boxShadow: "0 8px 24px rgba(34,197,94,0.4)" }}
          >
            <CheckCircleIcon size={40} color="white" strokeWidth={1.8} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg mb-1" style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
            ¡Meta creada!
          </p>
          <p className="text-xs mb-5" style={{ color: "#8a95a5" }}>
            Sofi ya puede empezar a ahorrar
          </p>
        </motion.div>

        {/* Goal summary card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl p-5 mb-5 text-left"
          style={{ backgroundColor: bg, boxShadow: shadowOut }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: accentColor, boxShadow: `0 4px 12px ${accentColor}35` }}>
              {selectedCategory && <selectedCategory.Icon size={24} color="white" strokeWidth={1.6} />}
            </div>
            <div className="flex-1">
              <p className="text-sm" style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                {goalName}
              </p>
              <p className="text-xs" style={{ color: "#8a95a5" }}>Meta de Sofi</p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Meta", value: `S/ ${amount}`, icon: TargetIcon },
              { label: "Plazo", value: `${weeks} sem.`, icon: ClockIcon },
              { label: "Semanal", value: `S/ ${weeklyDeposit}`, icon: CoinIcon },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="rounded-xl p-2.5 text-center"
                style={{ backgroundColor: `${accentColor}08` }}
              >
                <stat.icon size={14} color={accentColor} strokeWidth={1.8} className="mx-auto mb-1" />
                <p className="text-xs" style={{ color: accentColor, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: "#b0b8c4" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Progress bar at 0% */}
          <div className="mt-4">
            <div className="flex justify-between mb-1.5">
              <span className="text-xs" style={{ color: "#8a95a5", fontWeight: 500 }}>Progreso</span>
              <span className="text-xs" style={{ color: accentColor, fontWeight: 600 }}>0%</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: `${accentColor}15` }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "3%" }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="h-full rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          </div>
        </motion.div>

        {/* Motivational tip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="rounded-2xl p-3.5 mb-5 flex items-start gap-2.5 text-left"
          style={{ backgroundColor: "#fffbeb", border: "1px solid #fef3c7" }}
        >
          <HeartHandIcon size={16} color="#f59e0b" strokeWidth={1.8} className="shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: "#92400e", lineHeight: 1.55 }}>
            Cada depósito mueve la barra. ¡Celebra con Sofi cada avance!
          </p>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="w-full rounded-2xl p-4 flex items-center justify-center gap-2.5"
          style={{ backgroundColor: "#22c55e", boxShadow: "6px 6px 16px rgba(34,197,94,0.3), -4px -4px 12px #ffffff" }}
        >
          <SparklesIcon size={18} color="white" strokeWidth={1.8} />
          <span style={{ color: "white", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>
            ¡Vamos a lograrlo, Sofi!
          </span>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      {step < 4 && (
        <div className="flex items-center gap-3 mb-5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={step === 1 ? onClose : handleBack}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: bg, boxShadow: shadowOutSm }}
          >
            {step === 1 ? <X size={16} color="#8a95a5" /> : <ArrowLeft size={16} color="#8a95a5" />}
          </motion.button>
          <div className="flex-1">
            <p className="text-xs" style={{ color: "#8a95a5", fontWeight: 500 }}>
              Paso {step} de 3
            </p>
          </div>
        </div>
      )}

      {/* Step indicator */}
      {step < 4 && (
        <div className="flex gap-1.5 mb-5">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              className="h-1 rounded-full flex-1"
              style={{ backgroundColor: s <= step ? accentColor : `${accentColor}20` }}
              animate={{ backgroundColor: s <= step ? accentColor : `${accentColor}20` }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </AnimatePresence>

      {/* Next button (steps 1-3) */}
      {step < 4 && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          disabled={!canProceed}
          className="w-full rounded-2xl p-4 flex items-center justify-center gap-2 mt-5 transition-all"
          style={{
            backgroundColor: canProceed ? accentColor : "#e5e7eb",
            boxShadow: canProceed ? `6px 6px 16px ${accentColor}30, -4px -4px 12px #ffffff` : "none",
            opacity: canProceed ? 1 : 0.6,
          }}
        >
          <span style={{ color: "white", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>
            {step === 3 ? "Crear meta" : "Siguiente"}
          </span>
          {step < 3 && <ChevronRight size={16} color="white" strokeWidth={2.5} />}
          {step === 3 && <CheckCircleIcon size={16} color="white" strokeWidth={2} />}
        </motion.button>
      )}
    </motion.div>
  );
}

/* ── Goals Tab (educational + create) ── */
function GoalsTab({ onCreateGoal }: { onCreateGoal: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
      {/* Hero intro */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl p-4 mb-4 flex items-start gap-3"
        style={{ backgroundColor: "#FF7849", boxShadow: "6px 6px 16px rgba(255,120,73,0.3), -4px -4px 12px #ffffff" }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
          <TargetIcon size={20} color="white" strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-white text-xs mb-1" style={{ fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
            ¿Por qué crear metas con Sofi?
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
            Cuando un niño elige para qué ahorrar, aprende paciencia, toma de decisiones y el valor del esfuerzo. Todo sin que se sienta como una lección.
          </p>
        </div>
      </motion.div>

      {/* Tips section */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <p className="text-xs uppercase tracking-wider mb-3" style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.12em" }}>
          Consejos para una buena meta
        </p>
        <div className="space-y-2.5 mb-5">
          {goalTips.map((tip, i) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="rounded-2xl p-3.5 flex items-start gap-3"
              style={{ backgroundColor: bg, boxShadow: shadowOut }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${tip.color}10` }}>
                <tip.Icon size={17} color={tip.color} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs mb-0.5" style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
                  {tip.title}
                </p>
                <p className="text-[13px]" style={{ color: "#8a95a5", lineHeight: 1.5 }}>
                  {tip.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Ideas for Sofi */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <p className="text-xs uppercase tracking-wider mb-3" style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.12em" }}>
          Ideas de metas para Sofi
        </p>
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {goalIdeas.map((idea, i) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              className="rounded-2xl p-3.5 flex flex-col items-center text-center"
              style={{ backgroundColor: bg, boxShadow: shadowOutSm }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: `${idea.color}10` }}>
                <idea.Icon size={20} color={idea.color} strokeWidth={1.8} />
              </div>
              <p className="text-xs mb-0.5" style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
                {idea.label}
              </p>
              <p className="text-xs" style={{ color: idea.color, fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
                {idea.amount}
              </p>
              <div className="flex items-center gap-1 mt-1.5">
                <ClockIcon size={14} color="#b0b8c4" strokeWidth={1.8} />
                <span className="text-xs" style={{ color: "#b0b8c4" }}>{idea.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How to create - steps */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="rounded-2xl p-4 mb-5"
        style={{ backgroundColor: bg, boxShadow: shadowOut }}
      >
        <p className="text-xs uppercase tracking-wider mb-3" style={{ color: "#FF7849", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.12em" }}>
          Cómo crear una meta juntos
        </p>
        <div className="space-y-3">
          {goalSteps.map((s, i) => (
            <div key={s.num} className="flex items-start gap-2.5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08, type: "spring", stiffness: 300 }}
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FF7849", fontSize: 12, color: "white", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
              >
                {s.num}
              </motion.div>
              <p className="text-xs pt-0.5" style={{ color: "#5a7094", lineHeight: 1.5 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA - Create goal */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileTap={{ scale: 0.97 }}
        onClick={onCreateGoal}
        className="w-full rounded-2xl p-4 flex items-center justify-center gap-2.5 transition-all"
        style={{
          backgroundColor: "#FF7849",
          boxShadow: "6px 6px 16px rgba(255,120,73,0.3), -4px -4px 12px #ffffff",
        }}
      >
        <TargetIcon size={18} color="white" strokeWidth={1.8} />
        <span style={{ color: "white", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>
          Crear meta de ahorro con Sofi
        </span>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-[13px] mt-3"
        style={{ color: "#b0b8c4", lineHeight: 1.5 }}
      >
        Sofi verá su progreso con una barra visual y celebrará cada avance contigo
      </motion.p>
    </motion.div>
  );
}

/* ── Stories Tab ── */
function StoriesTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl p-4 mb-4 flex items-start gap-3"
        style={{ backgroundColor: "#7C3AED", boxShadow: "6px 6px 16px rgba(124,58,237,0.3), -4px -4px 12px #ffffff" }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
          <BookIcon size={20} color="white" strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-white text-xs mb-1" style={{ fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>Cuentos para antes de dormir</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
            Cada cuento tiene una lección financiera escondida. Lee uno con Sofi y luego conversen juntos.
          </p>
        </div>
      </motion.div>

      {/* Story cards */}
      <div className="space-y-3">
        {stories.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
            className="rounded-2xl p-4"
            style={{ backgroundColor: bg, boxShadow: shadowOut }}
          >
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: story.color, boxShadow: `0 4px 12px ${story.color}30` }}>
                <story.Icon size={26} color="white" strokeWidth={1.6} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${story.color}12`, color: story.color, fontWeight: 600 }}>
                    {story.ageTag}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#f0f2f5", color: "#8a95a5", fontWeight: 500 }}>
                    {story.chapters} capítulos
                  </span>
                </div>
                <p className="text-sm mb-1" style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>{story.title}</p>
                <p className="text-[13px]" style={{ color: "#8a95a5", lineHeight: 1.5 }}>{story.subtitle}</p>
              </div>
            </div>

            {/* Lesson + CTA */}
            <div className="mt-3 pt-3 flex items-center gap-3" style={{ borderTop: "1px solid #f0f2f5" }}>
              <div className="flex-1 flex items-start gap-1.5">
                <LightbulbIcon size={14} color={story.color} strokeWidth={1.8} className="shrink-0 mt-0.5" />
                <p className="text-xs" style={{ color: "#5a7094", lineHeight: 1.4 }}>{story.lesson}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1" style={{ color: "#b0b8c4" }}>
                  <ClockIcon size={14} color="#b0b8c4" strokeWidth={1.8} />
                  <span className="text-xs" style={{ fontWeight: 500 }}>{story.duration}</span>
                </div>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center transition-all active:scale-[0.93]"
                  style={{ backgroundColor: story.color, boxShadow: `2px 2px 6px ${story.color}35` }}>
                  <ChevronRight size={16} color="white" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */

interface Props {
  onBack: () => void;
}

export function TeachSection({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("misiones");
  const [showCreateGoal, setShowCreateGoal] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {showCreateGoal ? (
        /* ── Full-screen Create Goal Flow ── */
        <motion.div
          key="create-goal-screen"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pb-8"
        >
          {/* Header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-1">
            <button
              onClick={() => setShowCreateGoal(false)}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: bg, boxShadow: shadowOutSm }}
            >
              <ArrowLeft size={18} color="#2d3548" />
            </button>
            <div className="flex-1">
              <p style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>Nueva meta de ahorro</p>
              <p className="text-xs" style={{ color: "#8a95a5" }}>Crea una meta con Sofi</p>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#FF784910" }}>
              <TargetIcon size={18} color="#FF7849" strokeWidth={1.8} />
            </div>
          </motion.div>

          <div className="mt-5">
            <CreateGoalFlow onClose={() => setShowCreateGoal(false)} />
          </div>
        </motion.div>
      ) : (
        /* ── Main Enseñar page ── */
        <motion.div
          key="teach-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="pb-8"
        >
          {/* Header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-1">
            <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
              <ArrowLeft size={18} color="#2d3548" />
            </button>
            <div className="flex-1">
              <p style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>Enseñar a Sofi</p>
              <p className="text-xs" style={{ color: "#8a95a5" }}>6 años - Aprende jugando</p>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <BookIcon size={18} color="#2563EB" strokeWidth={1.8} />
            </div>
          </motion.div>

          {/* Daily parent tip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl p-3.5 my-4 flex items-start gap-2.5"
            style={{ backgroundColor: "#fffbeb", border: "1px solid #fef3c7" }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#fef3c7" }}>
              <HeartHandIcon size={16} color="#f59e0b" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#d97706", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                {dailyTips[0].source}
              </p>
              <p className="text-xs" style={{ color: "#92400e", lineHeight: 1.55 }}>
                {dailyTips[0].text}
              </p>
            </div>
          </motion.div>

          {/* Tab navigation */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-1.5 flex gap-1 mb-5"
            style={{ backgroundColor: bg, boxShadow: shadowInset }}
          >
            {tabs.map((t) => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className="flex-1 rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-xs transition-all"
                  style={{
                    backgroundColor: active ? t.color : "transparent",
                    color: active ? "white" : "#8a95a5",
                    fontWeight: 600,
                    fontFamily: "'Nunito Sans', sans-serif",
                    boxShadow: active ? `0 2px 8px ${t.color}40` : "none",
                  }}
                >
                  <t.Icon size={14} color={active ? "white" : "#8a95a5"} strokeWidth={1.8} />
                  {t.label}
                </button>
              );
            })}
          </motion.div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === "misiones" && <MissionsTab key="misiones" />}
            {activeTab === "metas" && <GoalsTab key="metas" onCreateGoal={() => setShowCreateGoal(true)} />}
            {activeTab === "cuentos" && <StoriesTab key="cuentos" />}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}