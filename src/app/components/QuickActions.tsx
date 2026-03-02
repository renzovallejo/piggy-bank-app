import { motion } from "motion/react";
import { CoinIcon } from "./Icons";
import { shadowBlue } from "./designTokens";

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <button
        className="w-full rounded-3xl p-5 flex items-center justify-between group cursor-pointer transition-transform active:scale-[0.98]"
        style={{
          backgroundColor: "#2563EB",
          boxShadow: shadowBlue,
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.12), inset -3px -3px 6px rgba(255,255,255,0.08)",
            }}
          >
            <CoinIcon size={26} color="white" strokeWidth={1.8} />
          </div>
          <div className="text-left">
            <p
              className="text-white text-lg"
              style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}
            >
              Cargar dinero
            </p>
            <p className="text-blue-200 text-[13px]" style={{ fontWeight: 400 }}>
              Transferencia · Tarjeta · Efectivo
            </p>
          </div>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform"
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
        >
          <CoinIcon size={18} color="white" strokeWidth={1.8} />
        </div>
      </button>
    </motion.div>
  );
}