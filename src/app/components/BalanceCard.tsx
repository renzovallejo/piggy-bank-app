import { useState, useCallback } from "react";
import { motion, useAnimation } from "motion/react";
import { Eye, EyeOff } from "lucide-react";
import { PiggyBankSvg } from "./PiggyBankSvg";
import { bg, shadowOut } from "./designTokens";

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
        className="rounded-3xl p-5 select-none flex gap-3"
        style={{ backgroundColor: bg, boxShadow: shadowOut }}
      >
        {/* Info block — 60% */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          {/* Saldo */}
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-1"
              style={{ color: "#8a95a5", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 500, letterSpacing: "0.15em" }}
            >
              Alcancía de Sofi
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-4xl tracking-tighter"
                  style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "#2d3548" }}
                >
                  {revealed ? "S/ 34.60" : "S/ •••••"}
                </span>
                <span className="text-xs" style={{ color: "#8a95a5", fontWeight: 500 }}>PEN</span>
              </div>
              <button
                onClick={() => setRevealed(!revealed)}
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 cursor-pointer"
                style={{ backgroundColor: "#2563EB10" }}
              >
                {revealed ? (
                  <Eye size={15} color="#8a95a5" strokeWidth={1.8} />
                ) : (
                  <EyeOff size={15} color="#8a95a5" strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Piggy block — 40% */}
        <div
          className="rounded-2xl flex items-center justify-center p-0"
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