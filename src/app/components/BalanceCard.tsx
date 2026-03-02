import { useState, useCallback } from "react";
import { motion, useAnimation } from "motion/react";
import { TargetIcon, BikeIcon, GamepadIcon } from "./Icons";
import { PiggyBankSvg } from "./PiggyBankSvg";
import { bg, shadowOut, shadowOutSm } from "./designTokens";

const goalIcons = [
  { Icon: TargetIcon, color: "#2563EB" },
  { Icon: BikeIcon, color: "#FF7849" },
  { Icon: GamepadIcon, color: "#7C3AED" },
];

export function BalanceCard() {
  const [revealed, setRevealed] = useState(true);
  const piggyControls = useAnimation();
  const [bouncing, setBouncing] = useState(false);

  const handlePiggyTap = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      if (bouncing) return;
      setBouncing(true);
      piggyControls
        .start({
          y: [0, -18, 0, -10, 0, -5, 0],
          scale: [1, 1.15, 0.92, 1.1, 0.96, 1.04, 1],
          rotate: [0, -6, 5, -4, 3, -1, 0],
          transition: {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.15, 0.32, 0.48, 0.62, 0.8, 1],
          },
        })
        .then(() => setBouncing(false));
    },
    [bouncing, piggyControls]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div
        className="rounded-3xl p-4 cursor-pointer select-none flex gap-3"
        style={{ backgroundColor: bg, boxShadow: shadowOut }}
        onClick={() => setRevealed(!revealed)}
      >
        {/* Info block — 60% */}
        <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
          {/* Saldo */}
          <div>
            <p
              className="text-[11px] tracking-widest uppercase mb-1"
              style={{ color: "#8a95a5", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 500, letterSpacing: "0.15em" }}
            >
              Alcancía de Sofi
            </p>
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-4xl tracking-tighter"
                style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "#2d3548" }}
              >
                {revealed ? "S/ 34.60" : "S/ •••••"}
              </span>
              <span className="text-xs" style={{ color: "#8a95a5", fontWeight: 500 }}>PEN</span>
            </div>
          </div>

          {/* Metas */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-1.5">
              {goalIcons.map((item, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: bg, boxShadow: shadowOutSm }}
                >
                  <item.Icon size={12} color={item.color} strokeWidth={2.2} />
                </div>
              ))}
            </div>
            <span className="text-xs" style={{ color: "#8a95a5", fontWeight: 500 }}>
              3 metas
            </span>
          </div>
        </div>

        {/* Piggy block — 40% */}
        <div
          className="rounded-2xl flex items-center justify-center p-3"
          style={{
            width: "40%",
            flexShrink: 0,
          }}
        >
          <motion.div
            className="w-[120%] cursor-pointer"
            animate={piggyControls}
            whileHover={{ scale: 1.04 }}
            onClick={handlePiggyTap}
            style={{ originX: 0.5, originY: 1 }}
          >
            <PiggyBankSvg />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}