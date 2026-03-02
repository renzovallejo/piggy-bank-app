import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useMissions } from "./MissionContext";
import {
  CheckCircleIcon,
  CompassIcon,
  SparklesIcon,
  StarIcon,
  HeartHandIcon,
  ClockIcon,
} from "./Icons";
import { bg, shadowOut, shadowOutSm, shadowInset } from "./designTokens";

const feedbackOptions = [
  { id: "loved", label: "Le encantó", color: "#FF7849" },
  { id: "learned", label: "Aprendió algo nuevo", color: "#2563EB" },
  { id: "repeat", label: "Quiere repetirla", color: "#7C3AED" },
  { id: "hard", label: "Fue difícil", color: "#f59e0b" },
  { id: "bonded", label: "Nos acercó como familia", color: "#22c55e" },
  { id: "surprise", label: "Nos sorprendió", color: "#ec4899" },
];

/**
 * Compact active mission card for the Home page.
 * Shows when there is a mission in progress with quick feedback options.
 */
export function ActiveMissionCard() {
  const { activeMission, completeMission, dismissMission } = useMissions();
  const [showFeedback, setShowFeedback] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastXp, setLastXp] = useState(0);

  if (!activeMission && !showSuccess) return null;

  const toggleFeedback = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleComplete = () => {
    const feedbackLabels = feedbackOptions
      .filter((f) => selected.has(f.id))
      .map((f) => f.label);
    setLastXp(activeMission?.xp || 25);
    completeMission(feedbackLabels);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
    setShowFeedback(false);
    setSelected(new Set());
  };

  return (
    <AnimatePresence>
      {showSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#22c55e" }}>
            <SparklesIcon size={20} color="white" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-sm" style={{ color: "#166534", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
              Misión completada
            </p>
            <p className="text-xs" style={{ color: "#22c55e" }}>
              +{lastXp} XP para Sofi
            </p>
          </div>
        </motion.div>
      ) : activeMission ? (
        <motion.div
          key="active"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: bg, boxShadow: shadowOut }}
        >
          {/* Mission header */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ backgroundColor: activeMission.color, opacity: 0.15 }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center relative z-10" style={{ backgroundColor: `${activeMission.color}12` }}>
                  <activeMission.Icon size={20} color={activeMission.color} strokeWidth={1.8} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <CompassIcon size={10} color={activeMission.color} strokeWidth={2} />
                  <span className="text-[11px] uppercase tracking-wider" style={{ color: activeMission.color, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                    Misión activa
                  </span>
                </div>
                <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>{activeMission.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1">
                    <ClockIcon size={9} color="#b0b8c4" strokeWidth={1.8} />
                    <span className="text-[11px]" style={{ color: "#b0b8c4" }}>{activeMission.time}</span>
                  </div>
                  <span className="text-[11px]" style={{ color: activeMission.color, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                    +{activeMission.xp} XP
                  </span>
                </div>
              </div>
              <button
                onClick={dismissMission}
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#f0f2f5" }}
              >
                <X size={12} color="#b0b8c4" strokeWidth={2} />
              </button>
            </div>

            {/* Action buttons */}
            {!showFeedback ? (
              <motion.button
                onClick={() => setShowFeedback(true)}
                whileTap={{ scale: 0.97 }}
                className="mt-3 w-full rounded-xl py-2.5 flex items-center justify-center gap-2 transition-all"
                style={{
                  backgroundColor: activeMission.color,
                  boxShadow: `3px 3px 8px ${activeMission.color}35, -2px -2px 6px #ffffff`,
                }}
              >
                <CheckCircleIcon size={15} color="white" strokeWidth={2} />
                <span className="text-xs text-white" style={{ fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
                  Sofi completó esta misión
                </span>
              </motion.button>
            ) : null}
          </div>

          {/* Feedback section */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4" style={{ borderTop: "1px solid #f0f2f5" }}>
                  <p className="text-[11px] uppercase tracking-wider mt-3 mb-2.5" style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
                    ¿Cómo les fue?
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {feedbackOptions.map((f) => {
                      const isSelected = selected.has(f.id);
                      return (
                        <motion.button
                          key={f.id}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleFeedback(f.id)}
                          className="rounded-full px-3 py-1.5 text-xs transition-all"
                          style={{
                            backgroundColor: isSelected ? f.color : bg,
                            color: isSelected ? "white" : f.color,
                            boxShadow: isSelected ? `0 2px 8px ${f.color}35` : shadowOutSm,
                            fontWeight: 600,
                          }}
                        >
                          {f.label}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => { setShowFeedback(false); setSelected(new Set()); }}
                      className="flex-1 rounded-xl py-2.5 text-xs"
                      style={{ backgroundColor: bg, boxShadow: shadowOutSm, color: "#8a95a5", fontWeight: 600 }}
                    >
                      Cancelar
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleComplete}
                      disabled={selected.size === 0}
                      className="flex-[2] rounded-xl py-2.5 text-xs flex items-center justify-center gap-1.5 transition-all"
                      style={{
                        backgroundColor: selected.size > 0 ? activeMission.color : "#e0e4ea",
                        color: "white",
                        fontWeight: 600,
                        fontFamily: "'Nunito Sans', sans-serif",
                        boxShadow: selected.size > 0 ? `3px 3px 8px ${activeMission.color}35` : "none",
                      }}
                    >
                      <StarIcon size={13} color="white" strokeWidth={2} />
                      Completar misión
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}