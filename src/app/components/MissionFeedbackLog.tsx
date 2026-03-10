import { motion, AnimatePresence } from "motion/react";
import { useMissions } from "./MissionContext";
import {
  CompassIcon,
  CheckCircleIcon,
  StarIcon,
  SparklesIcon,
  ClockIcon,
} from "./Icons";
import { bg, shadowOut, shadowOutSm } from "./designTokens";

const feedbackColors: Record<string, string> = {
  "Le encantó": "#FF7849",
  "Aprendió algo nuevo": "#2563EB",
  "Quiere repetirla": "#7C3AED",
  "Fue difícil": "#f59e0b",
  "Nos acercó como familia": "#22c55e",
  "Nos sorprendió": "#ec4899",
};

/**
 * Section for MonitorSection showing:
 * - Active mission in progress (if any)
 * - Completed missions with parent feedback
 */
export function MissionFeedbackLog() {
  const { activeMission, completedMissions } = useMissions();

  if (!activeMission && completedMissions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.42 }}
    >
      <p
        className="text-xs tracking-widest uppercase mb-3"
        style={{ color: "#8a95a5", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 500, letterSpacing: "0.15em" }}
      >
        Misiones y feedback
      </p>

      {/* Active mission */}
      {activeMission && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4 mb-3"
          style={{ backgroundColor: bg, boxShadow: shadowOut, border: `1.5px solid ${activeMission.color}20` }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ backgroundColor: activeMission.color, opacity: 0.1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center relative z-10" style={{ backgroundColor: `${activeMission.color}10` }}>
                <activeMission.Icon size={18} color={activeMission.color} strokeWidth={1.8} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: activeMission.color }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs uppercase tracking-wider" style={{ color: activeMission.color, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                  En progreso
                </span>
              </div>
              <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>{activeMission.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <ClockIcon size={14} color="#b0b8c4" strokeWidth={1.8} />
                <span className="text-xs" style={{ color: "#b0b8c4" }}>Iniciada el {activeMission.startedAt}</span>
              </div>
            </div>
            <div className="shrink-0 px-2.5 py-1 rounded-full" style={{ backgroundColor: `${activeMission.color}10` }}>
              <span className="text-xs" style={{ color: activeMission.color, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                +{activeMission.xp} XP
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Completed missions with feedback */}
      {completedMissions.length > 0 && (
        <div className="space-y-3">
          {completedMissions.map((m, i) => (
            <motion.div
              key={`${m.id}-${m.completedAt}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl p-4"
              style={{ backgroundColor: bg, boxShadow: shadowOut }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${m.color}10` }}>
                  <m.Icon size={18} color={m.color} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <CheckCircleIcon size={14} color="#22c55e" strokeWidth={2} />
                    <span className="text-xs" style={{ color: "#22c55e", fontWeight: 600 }}>Completada</span>
                  </div>
                  <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>{m.title}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs" style={{ color: "#b0b8c4" }}>{m.completedAt}</p>
                  <p className="text-xs" style={{ color: m.color, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                    +{m.xp} XP
                  </p>
                </div>
              </div>

              {/* Feedback tags */}
              {m.feedback.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1.5" style={{ color: "#b0b8c4", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
                    Feedback de mamá
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.feedback.map((f, fi) => (
                      <span
                        key={fi}
                        className="text-xs rounded-full px-2.5 py-1"
                        style={{
                          backgroundColor: `${feedbackColors[f] || "#8a95a5"}10`,
                          color: feedbackColors[f] || "#8a95a5",
                          fontWeight: 600,
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}