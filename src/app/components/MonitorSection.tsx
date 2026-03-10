import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import {
  FlameIcon,
  BikeIcon,
  GamepadIcon,
  CheckCircleIcon,
  TrendUpIcon,
  CoinIcon,
  StarIcon,
  SeedlingIcon,
  LightbulbIcon,
  ChildIcon,
  BookIcon,
  PiggyIcon,
  TargetIcon,
  CartIcon,
  ClipboardIcon,
  LemonIcon,
  GiftIcon,
  MedalIcon,
} from "./Icons";
import type { IconProps } from "./Icons";
import type { ComponentType, ReactNode } from "react";
import { MissionFeedbackLog } from "./MissionFeedbackLog";
import { bg, shadowOut, shadowOutSm } from "./designTokens";

/* ── Mock raw data ── */
const rawData = {
  deposits: { thisMonth: 8, lastMonth: 5, totalPEN: 42, avgPEN: 5.25 },
  interactions: { thisWeek: 14, lastWeek: 9, daysActive: 5, avgPerDay: 2.8 },
  missions: { completed: 12, thisMonth: 4, lastMonth: 3, streak: 5 },
  stories: { listened: 18, thisWeek: 5, lastWeek: 3, favorites: 3 },
};

/* ── Insights ── */
const insights = [
  {
    id: 1,
    IconA: BookIcon,
    IconB: PiggyIcon,
    colorA: "#7C3AED",
    colorB: "#FF7849",
    text: "Las semanas que Sofi escucha más cuentos, ahorra un 40% más",
    detail: `${rawData.stories.thisWeek} cuentos esta semana · ${rawData.deposits.thisMonth} depósitos este mes`,
    color: "#2563EB",
    bgTint: "#eff6ff",
    sources: ["cuentos", "ingresos"],
  },
  {
    id: 2,
    IconA: TargetIcon,
    IconB: CoinIcon,
    colorA: "#2563EB",
    colorB: "#FF7849",
    text: "Después de completar misiones, Sofi deposita monedas al día siguiente",
    detail: `${rawData.missions.thisMonth} misiones este mes · interacción +55% post-misión`,
    color: "#7C3AED",
    bgTint: "#f5f3ff",
    sources: ["misiones", "interacciones"],
  },
  {
    id: 3,
    IconA: PiggyIcon,
    IconB: StarIcon,
    colorA: "#FF7849",
    colorB: "#FF7849",
    text: "Sofi interactúa 3x más con su chanchito que el mes pasado",
    detail: `${rawData.interactions.thisWeek} veces esta semana vs ${rawData.interactions.lastWeek} la anterior`,
    color: "#FF7849",
    bgTint: "#fff7ed",
    sources: ["interacciones"],
  },
  {
    id: 4,
    IconA: TrendUpIcon,
    IconB: SeedlingIcon,
    colorA: "#2563EB",
    colorB: "#22c55e",
    text: "Su hábito de ahorro mejoró: deposita más seguido y en montos menores",
    detail: `Promedio S/ ${rawData.deposits.avgPEN.toFixed(2)} por depósito · ${rawData.deposits.thisMonth} depósitos`,
    color: "#2563EB",
    bgTint: "#eff6ff",
    sources: ["ingresos", "interacciones"],
  },
  {
    id: 5,
    IconA: BookIcon,
    IconB: TargetIcon,
    colorA: "#7C3AED",
    colorB: "#2563EB",
    text: "Sofi completa misiones más rápido las semanas que escucha cuentos financieros",
    detail: `${rawData.stories.favorites} cuentos favoritos · racha de ${rawData.missions.streak} semanas`,
    color: "#7C3AED",
    bgTint: "#f5f3ff",
    sources: ["cuentos", "misiones"],
  },
];

/* ── Goals ── */
const goals: {
  name: string;
  Icon: ComponentType<IconProps>;
  percent: number;
  color: string;
  saved: string;
  target: string;
}[] = [
  {
    name: "Bicicleta",
    Icon: BikeIcon,
    percent: 54,
    color: "#2563EB",
    saved: "S/ 18.70",
    target: "S/ 35.00",
  },
  {
    name: "Videojuego",
    Icon: GamepadIcon,
    percent: 73,
    color: "#FF7849",
    saved: "S/ 21.90",
    target: "S/ 30.00",
  },
];

/* ── Milestones ── */
const milestones: {
  title: string;
  date: string;
  Icon: ComponentType<IconProps>;
  iconColor: string;
  color: string;
  type: "mission" | "saving";
}[] = [
  { title: "Visita al mercado", date: "27 Feb", Icon: CartIcon, iconColor: "#2563EB", color: "#2563EB", type: "mission" },
  { title: "Ahorró S/ 5 sola", date: "25 Feb", Icon: StarIcon, iconColor: "#FF7849", color: "#FF7849", type: "saving" },
  { title: "Presupuesto familiar", date: "24 Feb", Icon: ClipboardIcon, iconColor: "#7C3AED", color: "#7C3AED", type: "mission" },
  { title: "Tiendita de limonada", date: "20 Feb", Icon: LemonIcon, iconColor: "#FF7849", color: "#FF7849", type: "mission" },
  { title: "Primera meta al 50%", date: "18 Feb", Icon: TargetIcon, iconColor: "#2563EB", color: "#2563EB", type: "saving" },
];

/* ── Reward data ── */
const reward = {
  title: "Mamá comprometida",
  subtitle: "Completaste 10+ misiones con Sofi",
  detail: "Tu dedicación hizo que Sofi ahorrara un 40% más este mes",
};

/* ── Ring progress ── */
function ProgressRing({
  percent,
  color,
  size = 64,
  strokeW = 5,
}: {
  percent: number;
  color: string;
  size?: number;
  strokeW?: number;
}) {
  const r = (size - strokeW) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e8ecf1" strokeWidth={strokeW} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (circ * percent) / 100 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ── Confetti particle ── */
function ConfettiParticle({ delay, color, x, y }: { delay: number; color: string; x: number; y: number }) {
  const rotation = useMemo(() => Math.random() * 360, []);
  const scale = useMemo(() => 0.6 + Math.random() * 0.8, []);
  const shape = useMemo(() => Math.random() > 0.5, []); // true = circle, false = rect

  return (
    <motion.div
      initial={{ opacity: 1, y: 0, x: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [1, 1, 0],
        y: [0, y * 0.6, y],
        x: [0, x * 0.8, x + (Math.random() - 0.5) * 40],
        scale: [0, scale, scale * 0.3],
        rotate: [0, rotation, rotation * 2],
      }}
      transition={{ duration: 2.2, delay, ease: "easeOut" }}
      className="absolute"
      style={{
        left: "50%",
        top: "40%",
        width: shape ? 10 : 8,
        height: shape ? 10 : 14,
        borderRadius: shape ? "50%" : 2,
        backgroundColor: color,
      }}
    />
  );
}

/* ── Celebration overlay ── */
function CelebrationOverlay({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<"enter" | "medal" | "done">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("medal"), 300);
    const t2 = setTimeout(() => setPhase("done"), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const confettiColors = ["#2563EB", "#FF7849", "#7C3AED", "#22c55e", "#facc15", "#f472b6"];
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        delay: Math.random() * 0.6,
        color: confettiColors[i % confettiColors.length],
        x: (Math.random() - 0.5) * 320,
        y: -100 - Math.random() * 300,
      })),
    []
  );

  // Bottom burst
  const burstParticles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i + 100,
        delay: 0.4 + Math.random() * 0.4,
        color: confettiColors[i % confettiColors.length],
        x: (Math.random() - 0.5) * 280,
        y: 80 + Math.random() * 200,
      })),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <ConfettiParticle key={p.id} {...p} />
        ))}
        {burstParticles.map((p) => (
          <ConfettiParticle key={p.id} {...p} />
        ))}
      </div>

      {/* Glow ring pulse */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          backgroundColor: "rgba(255,120,73,0.2)",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 2.5, 3], opacity: [0.8, 0.3, 0] }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          backgroundColor: "rgba(37,99,235,0.15)",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 2, 2.8], opacity: [0.6, 0.2, 0] }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.15 }}
        className="relative rounded-3xl p-8 mx-6 text-center max-w-xs"
        style={{ backgroundColor: bg, boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Medal */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 14, delay: 0.4 }}
          className="mx-auto mb-5 w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "#FF7849",
            boxShadow: "0 8px 30px rgba(255,120,73,0.4)",
          }}
        >
          <MedalIcon size={48} color="white" strokeWidth={1.8} />
        </motion.div>

        {/* Sparkle stars around medal */}
        {[
          { top: "18%", left: "15%", delay: 0.7, size: 14, color: "#facc15" },
          { top: "12%", right: "18%", delay: 0.85, size: 12, color: "#FF7849" },
          { top: "38%", left: "8%", delay: 0.95, size: 10, color: "#2563EB" },
          { top: "35%", right: "10%", delay: 1.05, size: 11, color: "#7C3AED" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: s.top, left: (s as any).left, right: (s as any).right }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.8] }}
            transition={{ delay: s.delay, duration: 0.5, ease: "easeOut" }}
          >
            <StarIcon size={s.size} color={s.color} strokeWidth={2.5} />
          </motion.div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg mb-1"
          style={{
            color: "#2d3548",
            fontWeight: 700,
            fontFamily: "'Nunito Sans', sans-serif",
          }}
        >
          {reward.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xs mb-4"
          style={{ color: "#8a95a5", lineHeight: 1.5 }}
        >
          {reward.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="rounded-xl px-4 py-3 mb-5"
          style={{ backgroundColor: "#fff7ed" }}
        >
          <p className="text-[13px]" style={{ color: "#FF7849", lineHeight: 1.5, fontWeight: 500 }}>
            {reward.detail}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onClose}
          className="rounded-2xl px-6 py-3 w-full"
          style={{
            backgroundColor: "#2563EB",
            color: "white",
            fontWeight: 700,
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: 14,
            boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
          }}
        >
          ¡Seguiré así!
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ── Insights carousel ── */
function InsightsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = insights.length;
  const insight = insights[current];

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-3xl p-5 mb-4"
      style={{ backgroundColor: bg, boxShadow: shadowOut }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LightbulbIcon size={15} color="#FF7849" strokeWidth={2} />
          <p
            className="text-xs"
            style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Insights de Sofi
          </p>
        </div>
        <span className="text-[13px] tabular-nums" style={{ color: "#b0b8c4", fontWeight: 500 }}>
          {current + 1}/{total}
        </span>
      </div>

      <div className="relative overflow-hidden" style={{ minHeight: 130 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl px-4 py-4"
            style={{ backgroundColor: insight.bgTint }}
          >
            {/* Icon pair */}
            <div className="flex items-center gap-1.5 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${insight.colorA}15` }}
              >
                <insight.IconA size={15} color={insight.colorA} strokeWidth={2} />
              </div>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M1 5h10M8 2l3 3-3 3" stroke={insight.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${insight.colorB}15` }}
              >
                <insight.IconB size={15} color={insight.colorB} strokeWidth={2} />
              </div>
            </div>

            <p
              className="text-sm mb-2"
              style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif", lineHeight: 1.45 }}
            >
              {insight.text}
            </p>
            <p className="text-[13px]" style={{ color: insight.color, fontWeight: 500, lineHeight: 1.4 }}>
              {insight.detail}
            </p>

            <div className="flex items-center gap-1.5 mt-3">
              {insight.sources.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${insight.color}12`, color: insight.color, fontWeight: 600 }}
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: bg, boxShadow: shadowOutSm }}
        >
          <ChevronLeft size={16} color="#8a95a5" strokeWidth={2} />
        </button>
        <div className="flex items-center gap-1.5">
          {insights.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all py-3"
              style={{
                width: i === current ? 16 : 6,
                backgroundClip: "content-box",
                backgroundColor: i === current ? insight.color : "#d1d9e6",
                height: 6,
                boxSizing: "content-box",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: bg, boxShadow: shadowOutSm }}
        >
          <ChevronRight size={16} color="#8a95a5" strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Main ── */
interface Props {
  onBack: () => void;
}

export function MonitorSection({ onBack }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const visibleMilestones = showAll ? milestones : milestones.slice(0, 3);

  return (
    <div className="pb-8">
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && <CelebrationOverlay onClose={() => setShowCelebration(false)} />}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-3 mb-5"
      >
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bg }}
        >
          <ArrowLeft size={18} color="#2d3548" />
        </button>
        <div className="flex-1">
          <p style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
            Evolución de Sofi
          </p>
        </div>
        <TrendUpIcon size={18} color="#2563EB" strokeWidth={2} />
      </motion.div>

      {/* ── Hero card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="rounded-3xl p-5 mb-4"
        style={{ backgroundColor: bg, boxShadow: shadowOut }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "#2563EB",
              boxShadow: "4px 4px 12px rgba(37,99,235,0.25)",
            }}
          >
            <ChildIcon size={32} color="white" strokeWidth={1.8} />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="text-sm mb-0.5"
              style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
            >
              Sofi va increíble
            </p>
            <p className="text-xs" style={{ color: "#8a95a5" }}>
              Nivel 3 · Exploradora
            </p>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <FlameIcon size={14} color="#FF7849" strokeWidth={2} />
                <span
                  className="text-xs"
                  style={{ color: "#FF7849", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
                >
                  5 semanas
                </span>
              </div>
              <div className="w-px h-3" style={{ backgroundColor: "#e0e4ea" }} />
              <div className="flex items-center gap-1">
                <CheckCircleIcon size={14} color="#2563EB" strokeWidth={2} />
                <span
                  className="text-xs"
                  style={{ color: "#2563EB", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
                >
                  12 misiones
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl px-4 py-3" style={{ backgroundColor: "#f0f5ff" }}>
          <p className="text-xs" style={{ color: "#2563EB", lineHeight: 1.5 }}>
            <SeedlingIcon size={14} color="#2563EB" strokeWidth={2} className="inline-block mr-1 -mt-0.5" />
            Este mes hizo <strong>{rawData.deposits.thisMonth} depósitos</strong>, escuchó{" "}
            <strong>{rawData.stories.listened} cuentos</strong> y completó{" "}
            <strong>{rawData.missions.thisMonth} misiones</strong>.
          </p>
        </div>
      </motion.div>

      {/* ── Insights carousel ── */}
      <InsightsCarousel />

      {/* ── Savings + Reward row ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="grid grid-cols-2 gap-3 mb-4"
      >
        {/* Total savings */}
        <div className="rounded-3xl p-4" style={{ backgroundColor: bg, boxShadow: shadowOut }}>
          <div className="flex items-center gap-2 mb-3">
            <CoinIcon size={15} color="#FF7849" strokeWidth={2} />
            <span className="text-[13px]" style={{ color: "#8a95a5", fontWeight: 500 }}>
              Ahorro total
            </span>
          </div>
          <p
            className="text-2xl tracking-tighter mb-1"
            style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "#2d3548" }}
          >
            S/ 34.60
          </p>
          <div className="flex items-center gap-1">
            <TrendUpIcon size={14} color="#22c55e" strokeWidth={2.5} />
            <span className="text-xs" style={{ color: "#22c55e", fontWeight: 600 }}>
              +S/ 8.20 este mes
            </span>
          </div>
        </div>

        {/* Reward card */}
        <motion.button
          onClick={() => setShowCelebration(true)}
          whileTap={{ scale: 0.96 }}
          className="rounded-3xl p-4 flex flex-col justify-between text-left relative overflow-hidden"
          style={{
            backgroundColor: "#FF7849",
            boxShadow: "6px 6px 14px rgba(255,120,73,0.25), -6px -6px 14px #ffffff",
          }}
        >
          {/* Subtle shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
            animate={{ opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            >
              <GiftIcon size={18} color="white" strokeWidth={2} />
            </div>
            <p
              className="text-xs mb-0.5"
              style={{ color: "white", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
            >
              Premio listo
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500, lineHeight: 1.4 }}>
              Toca para ver
            </p>
          </div>

          {/* Decorative medal hint */}
          <div className="absolute -bottom-2 -right-2 opacity-15 z-0">
            <MedalIcon size={52} color="white" strokeWidth={1.5} />
          </div>
        </motion.button>
      </motion.div>

      {/* ── Goals ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-4"
      >
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "#8a95a5", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 500, letterSpacing: "0.15em" }}
        >
          Metas de ahorro
        </p>
        <div className="grid grid-cols-2 gap-3">
          {goals.map((g) => (
            <div
              key={g.name}
              className="rounded-2xl p-4 flex flex-col items-center text-center"
              style={{ backgroundColor: bg, boxShadow: shadowOut }}
            >
              <div className="relative mb-2">
                <ProgressRing percent={g.percent} color={g.color} size={68} strokeW={5} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <g.Icon size={22} color={g.color} strokeWidth={2} />
                </div>
              </div>
              <p
                className="text-sm mb-0.5"
                style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}
              >
                {g.name}
              </p>
              <p
                className="text-lg tracking-tight"
                style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: g.color }}
              >
                {g.percent}%
              </p>
              <p className="text-xs" style={{ color: "#8a95a5" }}>
                {g.saved} de {g.target}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Mission Feedback Log ── */}
      <div className="mb-4">
        <MissionFeedbackLog />
      </div>

      {/* ── Milestones ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "#8a95a5", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 500, letterSpacing: "0.15em" }}
        >
          Logros recientes
        </p>

        <div className="relative">
          <div className="absolute left-[19px] top-4 bottom-4 w-px" style={{ backgroundColor: "#e8ecf1" }} />

          <div className="space-y-0">
            {visibleMilestones.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.45 + i * 0.07 }}
                className="flex items-center gap-4 py-3 relative"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative z-10"
                  style={{ backgroundColor: bg, boxShadow: shadowOutSm }}
                >
                  <m.Icon size={17} color={m.iconColor} strokeWidth={2} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: "#2d3548", fontWeight: 600 }}>
                    {m.title}
                  </p>
                  <p className="text-xs" style={{ color: "#8a95a5" }}>
                    {m.date}
                  </p>
                </div>

                <div className="px-2.5 py-1 rounded-full shrink-0" style={{ backgroundColor: `${m.color}10` }}>
                  <span
                    className="text-xs"
                    style={{ color: m.color, fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    {m.type === "mission" ? "Misión" : "Ahorro"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {milestones.length > 3 && (
            <button onClick={() => setShowAll(!showAll)} className="w-full text-center py-3 mt-1">
              <span
                className="text-xs"
                style={{ color: "#2563EB", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}
              >
                {showAll ? "Ver menos" : `Ver todos (${milestones.length})`}
              </span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}