import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMissions } from "./MissionContext";
import {
  CheckCircleIcon,
  StarIcon,
  SparklesIcon,
  ClockIcon,
  SeedlingIcon,
  BookIcon,
  CoinIcon,
  HeartHandIcon,
  TargetIcon,
  MapPinIcon,
  FamilyIcon,
} from "./Icons";
import type { IconProps } from "./Icons";
import type { ComponentType } from "react";
import { bg, shadowOut, shadowOutSm } from "./designTokens";

interface Reminder {
  id: string;
  text: string;
  subtitle?: string;
  Icon: ComponentType<IconProps>;
  color: string;
  xp: number;
  type: "mission" | "habit" | "savings";
}

/* ── Static daily reminders ── */
const dailyReminders: Reminder[] = [
  {
    id: "habit-1",
    text: "Hablar de dinero con Sofi",
    subtitle: "Aprovecha una situación cotidiana",
    Icon: HeartHandIcon,
    color: "#FF7849",
    xp: 5,
    type: "habit",
  },
  {
    id: "habit-2",
    text: "Leer un cuento financiero",
    subtitle: "5 min antes de dormir",
    Icon: BookIcon,
    color: "#7C3AED",
    xp: 10,
    type: "habit",
  },
  {
    id: "savings-1",
    text: "Revisar la alcancía juntas",
    subtitle: "Contar monedas y celebrar el avance",
    Icon: CoinIcon,
    color: "#2563EB",
    xp: 5,
    type: "savings",
  },
  {
    id: "savings-2",
    text: "Recordar a Sofi su meta",
    subtitle: "Preguntale cómo va su ahorro",
    Icon: TargetIcon,
    color: "#22c55e",
    xp: 5,
    type: "savings",
  },
];

/* ── Sparkle burst particle ── */
function SparkleParticle({
  delay,
  angle,
  color,
  distance,
}: {
  delay: number;
  angle: number;
  color: string;
  distance: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * distance;
  const y = Math.sin(rad) * distance;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 4,
        height: 4,
        backgroundColor: color,
        left: "50%",
        top: "50%",
        marginLeft: -2,
        marginTop: -2,
      }}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, x * 0.5, x],
        y: [0, y * 0.5, y],
        scale: [0, 1.5, 0],
      }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    />
  );
}

/* ── Floating XP badge ── */
function FloatingXP({ xp, color }: { xp: number; color: string }) {
  return (
    <motion.div
      className="absolute -top-1 -right-1 z-20 flex items-center gap-0.5 rounded-full px-2 py-0.5"
      style={{ backgroundColor: color, boxShadow: `0 2px 8px ${color}50` }}
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1, 1, 0], y: [0, -8, -24, -36], scale: [0.5, 1.1, 1, 0.8] }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <StarIcon size={9} color="white" strokeWidth={2.5} />
      <span
        className="text-[11px] text-white"
        style={{ fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
      >
        +{xp} XP
      </span>
    </motion.div>
  );
}

/* ── Checkmark draw animation ── */
function AnimatedCheck({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
      />
      <motion.path
        d="M8 12.5l2.5 2.5 5.5-5.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

/* ── Unchecked circle ── */
function UncheckedCircle({ color }: { color: string }) {
  return (
    <div
      className="w-5 h-5 rounded-full"
      style={{
        border: `2px solid ${color}40`,
        backgroundColor: `${color}08`,
      }}
    />
  );
}

/* ── Single Reminder Item ── */
function ReminderItem({
  reminder,
  completed,
  onComplete,
  index,
}: {
  reminder: Reminder;
  completed: boolean;
  onComplete: () => void;
  index: number;
}) {
  const [justCompleted, setJustCompleted] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showXP, setShowXP] = useState(false);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        angle: i * 45 + Math.random() * 20 - 10,
        delay: Math.random() * 0.15,
        distance: 18 + Math.random() * 12,
      })),
    []
  );

  const handleTap = () => {
    if (completed) return;
    setJustCompleted(true);
    setShowSparkles(true);
    setShowXP(true);
    onComplete();

    setTimeout(() => setShowSparkles(false), 800);
    setTimeout(() => setShowXP(false), 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.08 + index * 0.06 }}
    >
      <motion.button
        onClick={handleTap}
        whileTap={!completed ? { scale: 0.97 } : {}}
        animate={
          justCompleted
            ? {
                scale: [1, 1.02, 0.98, 1],
                transition: { duration: 0.4, ease: "easeInOut" },
              }
            : {}
        }
        onAnimationComplete={() => setJustCompleted(false)}
        className="w-full rounded-2xl p-3.5 flex items-center gap-3 text-left transition-all relative"
        style={{
          backgroundColor: completed ? `${reminder.color}06` : bg,
          boxShadow: completed ? "none" : shadowOutSm,
          border: completed ? `1px solid ${reminder.color}15` : "1px solid transparent",
        }}
      >
        {/* Checkbox area */}
        <div className="relative shrink-0">
          <AnimatePresence mode="wait">
            {completed ? (
              <motion.div key="checked">
                <AnimatedCheck color={reminder.color} />
              </motion.div>
            ) : (
              <motion.div
                key="unchecked"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <UncheckedCircle color={reminder.color} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sparkle burst */}
          {showSparkles && (
            <div className="absolute inset-0 pointer-events-none">
              {sparkles.map((s) => (
                <SparkleParticle
                  key={s.id}
                  delay={s.delay}
                  angle={s.angle}
                  color={reminder.color}
                  distance={s.distance}
                />
              ))}
            </div>
          )}
        </div>

        {/* Icon */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            backgroundColor: completed ? `${reminder.color}10` : `${reminder.color}08`,
          }}
        >
          <reminder.Icon
            size={15}
            color={completed ? `${reminder.color}80` : reminder.color}
            strokeWidth={1.8}
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className="text-xs"
            style={{
              color: completed ? "#b0b8c4" : "#2d3548",
              fontWeight: 600,
              fontFamily: "'Nunito Sans', sans-serif",
              textDecorationLine: completed ? "line-through" : "none",
              textDecorationColor: completed ? `${reminder.color}50` : undefined,
              transition: "all 0.3s",
            }}
          >
            {reminder.text}
          </p>
          {reminder.subtitle && (
            <p
              className="text-[11px] mt-0.5"
              style={{
                color: completed ? "#d1d9e6" : "#8a95a5",
                transition: "color 0.3s",
              }}
            >
              {reminder.subtitle}
            </p>
          )}
        </div>

        {/* XP pill */}
        <div
          className="shrink-0 rounded-full px-2 py-0.5 flex items-center gap-0.5"
          style={{
            backgroundColor: completed ? `${reminder.color}08` : `${reminder.color}10`,
          }}
        >
          <StarIcon
            size={9}
            color={completed ? "#d1d9e6" : reminder.color}
            strokeWidth={2}
          />
          <span
            className="text-[11px]"
            style={{
              color: completed ? "#d1d9e6" : reminder.color,
              fontWeight: 700,
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            {reminder.xp}
          </span>
        </div>

        {/* Floating XP animation */}
        <AnimatePresence>{showXP && <FloatingXP xp={reminder.xp} color={reminder.color} />}</AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

/* ── Progress bar with celebration ── */
function ProgressBar({
  completed,
  total,
  totalXP,
}: {
  completed: number;
  total: number;
  totalXP: number;
}) {
  const pct = total > 0 ? (completed / total) * 100 : 0;
  const allDone = completed === total && total > 0;

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "#e8ecf1" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: allDone ? "#22c55e" : "#2563EB" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <span
          className="text-[11px] tabular-nums"
          style={{
            color: allDone ? "#22c55e" : "#8a95a5",
            fontWeight: 600,
            fontFamily: "'Nunito Sans', sans-serif",
          }}
        >
          {completed}/{total}
        </span>
      </div>
    </div>
  );
}

/* ── All-done celebration ── */
function AllDoneCelebration({ totalXP }: { totalXP: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="rounded-2xl p-4 flex items-center gap-3 mt-2"
      style={{
        backgroundColor: "#22c55e",
        boxShadow: "6px 6px 16px rgba(34,197,94,0.3), -4px -4px 12px #ffffff",
      }}
    >
      {/* Animated icon */}
      <motion.div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        animate={{ rotate: [0, -8, 8, -4, 0] }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <SparklesIcon size={22} color="white" strokeWidth={1.8} />
      </motion.div>

      <div className="flex-1">
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="text-sm text-white"
          style={{ fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
        >
          Dia completado
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          Sofi y tú ganaron +{totalXP} XP
        </motion.p>
      </div>

      {/* Bouncing stars */}
      <div className="flex gap-1 shrink-0">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 12,
              delay: 0.4 + i * 0.12,
            }}
          >
            <StarIcon size={14} color="white" strokeWidth={2} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */

export function RemindersZone() {
  const { activeMission } = useMissions();
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  /* Build reminders list: mission step (if active) + daily habits */
  const reminders = useMemo<Reminder[]>(() => {
    const list: Reminder[] = [];

    if (activeMission) {
      list.push({
        id: `mission-${activeMission.id}`,
        text: activeMission.title,
        subtitle: `Misión activa · ${activeMission.time}`,
        Icon: activeMission.Icon,
        color: activeMission.color,
        xp: activeMission.xp,
        type: "mission",
      });
    }

    list.push(...dailyReminders);
    return list;
  }, [activeMission]);

  const handleComplete = useCallback((id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const completedCount = reminders.filter((r) => completedIds.has(r.id)).length;
  const totalXP = reminders
    .filter((r) => completedIds.has(r.id))
    .reduce((sum, r) => sum + r.xp, 0);
  const allDone = completedCount === reminders.length && reminders.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.18 }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#2563EB10" }}
          >
            <ClockIcon size={13} color="#2563EB" strokeWidth={2} />
          </div>
          <p
            className="text-xs tracking-widest uppercase"
            style={{
              color: "#8a95a5",
              fontFamily: "'Nunito Sans', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.15em",
            }}
          >
            Por completar
          </p>
        </div>

        {/* XP earned today */}
        <AnimatePresence>
          {totalXP > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 rounded-full px-2.5 py-1"
              style={{ backgroundColor: "#2563EB10" }}
            >
              <StarIcon size={10} color="#2563EB" strokeWidth={2} />
              <span
                className="text-[11px]"
                style={{
                  color: "#2563EB",
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                +{totalXP} XP
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <ProgressBar completed={completedCount} total={reminders.length} totalXP={totalXP} />
      </div>

      {/* Reminder items */}
      <div className="space-y-2">
        {reminders.map((r, i) => (
          <ReminderItem
            key={r.id}
            reminder={r}
            completed={completedIds.has(r.id)}
            onComplete={() => handleComplete(r.id)}
            index={i}
          />
        ))}
      </div>

      {/* All-done celebration */}
      <AnimatePresence>
        {allDone && <AllDoneCelebration totalXP={totalXP} />}
      </AnimatePresence>
    </motion.div>
  );
}