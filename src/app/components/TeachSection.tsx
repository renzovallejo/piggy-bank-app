import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
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
                    <span className="text-[11px] uppercase tracking-wider" style={{ color: m.color, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                      {m.methodologyTag}
                    </span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${difficultyColors[m.difficulty]}15`, color: difficultyColors[m.difficulty], fontWeight: 600 }}>
                      {m.difficulty}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>{m.title}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1" style={{ color: "#a0aab8" }}>
                      <ClockIcon size={10} color="#a0aab8" />
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

                      <p className="text-[11px] uppercase tracking-wider mb-2" style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
                        Pasos de la misión
                      </p>
                      <div className="space-y-2 mb-3">
                        {m.steps.map((step, si) => (
                          <div key={si} className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: `${m.color}10`, fontSize: 11, color: m.color, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                              {si + 1}
                            </div>
                            <p className="text-xs" style={{ color: "#5a7094", lineHeight: 1.5 }}>{step}</p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl p-3 mb-3 flex items-start gap-2.5" style={{ backgroundColor: "#fffbeb" }}>
                        <HeartHandIcon size={16} color="#FF7849" strokeWidth={1.8} className="shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "#FF7849", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                            Tip para ti
                          </p>
                          <p className="text-[13px]" style={{ color: "#92400e", lineHeight: 1.5 }}>{m.parentTip}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1 rounded-full px-2.5 py-1 flex items-center gap-1" style={{ backgroundColor: `${m.color}08` }}>
                          <span className="text-[11px]" style={{ color: m.color, fontWeight: 600 }}>{m.methodology}</span>
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

/* ── Goals Tab (educational + create) ── */
function GoalsTab() {
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
        <p className="text-[11px] uppercase tracking-wider mb-3" style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.12em" }}>
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
        <p className="text-[11px] uppercase tracking-wider mb-3" style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.12em" }}>
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
                <ClockIcon size={9} color="#b0b8c4" strokeWidth={1.8} />
                <span className="text-[11px]" style={{ color: "#b0b8c4" }}>{idea.time}</span>
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
        <p className="text-[11px] uppercase tracking-wider mb-3" style={{ color: "#FF7849", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.12em" }}>
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
                style={{ backgroundColor: "#FF7849", fontSize: 11, color: "white", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
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
                  <span className="text-[11px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${story.color}12`, color: story.color, fontWeight: 600 }}>
                    {story.ageTag}
                  </span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#f0f2f5", color: "#8a95a5", fontWeight: 500 }}>
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
                <LightbulbIcon size={12} color={story.color} strokeWidth={1.8} className="shrink-0 mt-0.5" />
                <p className="text-xs" style={{ color: "#5a7094", lineHeight: 1.4 }}>{story.lesson}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1" style={{ color: "#b0b8c4" }}>
                  <ClockIcon size={10} color="#b0b8c4" strokeWidth={1.8} />
                  <span className="text-xs" style={{ fontWeight: 500 }}>{story.duration}</span>
                </div>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-[0.93]"
                  style={{ backgroundColor: story.color, boxShadow: `2px 2px 6px ${story.color}35` }}>
                  <ChevronRight size={14} color="white" strokeWidth={2.5} />
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

  return (
    <div className="pb-8">
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
          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "#d97706", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
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
        {activeTab === "metas" && <GoalsTab key="metas" />}
        {activeTab === "cuentos" && <StoriesTab key="cuentos" />}
      </AnimatePresence>
    </div>
  );
}