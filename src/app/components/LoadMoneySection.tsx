import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Building2,
  Check,
  ChevronRight,
  Smartphone,
  Mic,
  Square,
  Send,
  MessageCircle,
  Play,
  Trash2,
  Heart,
} from "lucide-react";
import { PiggyBankSvg } from "./PiggyBankSvg";
import { CoinIcon } from "./Icons";
import { bg, shadowOut, shadowOutSm, shadowInset } from "./designTokens";

const presetAmounts = [5, 10, 20, 50];

const paymentMethods = [
  {
    id: "transfer",
    label: "Transferencia BCP",
    desc: "Cuenta Ahorros Soles",
    Icon: Building2,
    color: "#2563EB",
    account: "María Elena Ríos",
    accountNumber: "191-2634****-0-53",
    bank: "BCP",
  },
  {
    id: "yape",
    label: "Yape",
    desc: "Celular asociado",
    Icon: Smartphone,
    color: "#7C3AED",
    account: "María Elena Ríos",
    accountNumber: "987 *** 412",
    bank: "Yape",
  },
];

const quickReasons = [
  "Para tu bicicleta",
  "Mesada de la semana",
  "Por ayudar en casa",
  "Porque te quiero",
  "Para tu meta",
  "Por tu misión cumplida",
];

/* ── Floating heart for sent screen ── */
function FloatingHeart({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${50 + x}%`, bottom: "35%" }}
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -60, -150, -240],
        scale: [0, 1, 0.8, 0.4],
        x: [0, x * 1.5, x * 3, x * 4],
      }}
      transition={{ duration: 2.4, delay, ease: "easeOut" }}
    >
      <Heart size={16} color="#FF7849" fill="#FF7849" strokeWidth={0} />
    </motion.div>
  );
}

/* ── Pulsing ring around mic ── */
function PulsingRings({ color }: { color: string }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${color}` }}
          initial={{ scale: 1, opacity: 0.35 }}
          animate={{ scale: [1, 1.5 + i * 0.25], opacity: [0.35, 0] }}
          transition={{ duration: 1.4, delay: i * 0.35, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

/* ── Waveform bars ── */
function WaveformBars({ isRecording, seconds, color = "#FF7849", barCount = 36 }: { isRecording: boolean; seconds: number; color?: string; barCount?: number }) {
  return (
    <div className="flex items-center gap-[2.5px] h-12 justify-center px-1">
      {Array.from({ length: barCount }, (_, i) => {
        const baseH = 6 + Math.sin(i * 0.7 + seconds * 4) * 14;
        const h = isRecording ? Math.max(4, baseH + Math.sin(seconds * 6 + i * 1.2) * 8) : 4;
        return (
          <motion.div
            key={i}
            className="rounded-full"
            style={{ width: 2.5, backgroundColor: isRecording ? color : "#d1d9e6" }}
            animate={{ height: h }}
            transition={{ duration: 0.12, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

/* ── Audio preview with simulated playback ── */
function AudioPreview({ seconds, onDelete, onReRecord }: { seconds: number; onDelete: () => void; onReRecord: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const togglePlay = () => {
    if (playing) {
      if (intRef.current) clearInterval(intRef.current);
      setPlaying(false);
    } else {
      setPlaying(true);
      setProgress(0);
      intRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 1) {
            if (intRef.current) clearInterval(intRef.current);
            setPlaying(false);
            return 0;
          }
          return p + 1 / (seconds * 10);
        });
      }, 100);
    }
  };

  useEffect(() => () => { if (intRef.current) clearInterval(intRef.current); }, []);

  const totalBars = 40;
  const filledBars = Math.floor(progress * totalBars);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-5" style={{ backgroundColor: bg, boxShadow: shadowOut }}>
      <div className="flex items-center gap-2 mb-4">
        <Mic size={13} color="#FF7849" strokeWidth={2} />
        <span className="text-[13px]" style={{ color: "#8a95a5", fontWeight: 500 }}>Mensaje de voz grabado</span>
      </div>
      <div className="flex items-center gap-3">
        <motion.button onClick={togglePlay} whileTap={{ scale: 0.9 }} className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#FF7849", boxShadow: "0 4px 16px rgba(255,120,73,0.35)" }}>
          {playing ? <Square size={14} color="white" strokeWidth={2.5} fill="white" /> : <Play size={16} color="white" strokeWidth={2.5} style={{ marginLeft: 2 }} />}
        </motion.button>
        <div className="flex-1 flex items-center gap-[2px] h-8">
          {Array.from({ length: totalBars }, (_, i) => {
            const h = 4 + Math.sin(i * 0.6) * 12 + Math.sin(i * 1.3) * 6;
            return (
              <motion.div
                key={i}
                className="rounded-full"
                style={{ width: 2, height: Math.max(3, h), backgroundColor: i <= filledBars ? "#FF7849" : "#e0e4ea" }}
                animate={playing && i === filledBars ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.2 }}
              />
            );
          })}
        </div>
        <span className="text-xs tabular-nums shrink-0" style={{ color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
          {mins}:{secs.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <button onClick={onReRecord} className="flex-1 rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-xs transition-all active:scale-[0.97]" style={{ backgroundColor: "#f7f8fa", color: "#8a95a5", fontWeight: 600 }}>
          <Mic size={12} strokeWidth={2} />
          Volver a grabar
        </button>
        <button onClick={onDelete} className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-[0.95]" style={{ backgroundColor: "#fef2f2" }}>
          <Trash2 size={14} color="#ef4444" strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Message Composer (full screen) ── */
function MessageComposer({ amount, onSend, onBack }: { amount: string; onSend: () => void; onBack: () => void }) {
  const [tab, setTab] = useState<"text" | "audio">("text");
  const [text, setText] = useState("");
  const [recState, setRecState] = useState<"idle" | "recording" | "recorded">("idle");
  const [recSeconds, setRecSeconds] = useState(0);
  const intRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const startRec = () => { setRecState("recording"); setRecSeconds(0); intRef.current = setInterval(() => setRecSeconds((s) => s + 1), 1000); };
  const stopRec = () => { if (intRef.current) clearInterval(intRef.current); setRecState("recorded"); };
  const deleteRec = () => { setRecSeconds(0); setRecState("idle"); };
  const reRecord = () => { deleteRec(); setTimeout(startRec, 200); };

  useEffect(() => () => { if (intRef.current) clearInterval(intRef.current); }, []);
  useEffect(() => { if (tab === "text") setTimeout(() => taRef.current?.focus(), 200); }, [tab]);

  const canSend = (tab === "text" && text.trim().length > 0) || (tab === "audio" && recState === "recorded");
  const mins = Math.floor(recSeconds / 60);
  const secs = recSeconds % 60;

  return (
    <motion.div key="msg-composer" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
          <ArrowLeft size={18} color="#2d3548" />
        </button>
        <p style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>Mensaje para Sofi</p>
      </div>

      {/* Amount pill */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex justify-center mb-5">
        <div className="rounded-full px-4 py-2 flex items-center gap-2" style={{ backgroundColor: bg, boxShadow: shadowOutSm }}>
          <div className="w-5 h-5"><PiggyBankSvg /></div>
          <span className="text-xs" style={{ color: "#8a95a5" }}>Cargaste</span>
          <span className="text-sm" style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "#2563EB" }}>S/ {parseFloat(amount || "0").toFixed(2)}</span>
        </div>
      </motion.div>

      {/* Prompt */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "#FF7849", boxShadow: "0 8px 24px rgba(255,120,73,0.25)" }}>
          <MessageCircle size={30} color="white" strokeWidth={1.8} />
        </div>
        <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>
          ¿Qué le quieres decir a Sofi?
        </p>
        <p className="text-xs mt-1" style={{ color: "#8a95a5", lineHeight: 1.5 }}>
          Escribe un mensaje o graba un audio con cariño
        </p>
      </motion.div>

      {/* Tab toggle */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-1.5 flex gap-1 mb-5" style={{ backgroundColor: bg, boxShadow: shadowInset }}>
        <button onClick={() => setTab("text")} className="flex-1 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs transition-all" style={{ backgroundColor: tab === "text" ? "#2563EB" : "transparent", color: tab === "text" ? "white" : "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif", boxShadow: tab === "text" ? "0 2px 8px rgba(37,99,235,0.3)" : "none" }}>
          <Send size={13} strokeWidth={2} />
          Escribir
        </button>
        <button onClick={() => setTab("audio")} className="flex-1 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs transition-all" style={{ backgroundColor: tab === "audio" ? "#FF7849" : "transparent", color: tab === "audio" ? "white" : "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif", boxShadow: tab === "audio" ? "0 2px 8px rgba(255,120,73,0.3)" : "none" }}>
          <Mic size={13} strokeWidth={2} />
          Grabar audio
        </button>
      </motion.div>

      {/* ── TEXT TAB ── */}
      <AnimatePresence mode="wait">
        {tab === "text" && (
          <motion.div key="tab-text" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4">
            <div className="rounded-2xl p-4" style={{ backgroundColor: bg, boxShadow: shadowOut }}>
              <textarea
                ref={taRef}
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 200))}
                placeholder="Escribe tu mensaje con cariño..."
                rows={4}
                className="w-full bg-transparent outline-none resize-none text-sm"
                style={{ color: "#2d3548", fontFamily: "'Nunito Sans', sans-serif", lineHeight: 1.6 }}
              />
              <div className="flex items-center justify-between mt-2 pt-2" style={{ borderTop: "1px solid #f0f2f5" }}>
                <div className="flex items-center gap-1.5">
                  <div className="h-1 rounded-full overflow-hidden" style={{ width: 60, backgroundColor: "#e8ecf1" }}>
                    <motion.div className="h-1 rounded-full" style={{ backgroundColor: text.length > 180 ? "#ef4444" : "#2563EB" }} animate={{ width: `${Math.min(100, (text.length / 200) * 100)}%` }} />
                  </div>
                  <span className="text-[11px] tabular-nums" style={{ color: text.length > 180 ? "#ef4444" : "#b0b8c4" }}>{text.length}/200</span>
                </div>
                {text.length > 0 && (
                  <button onClick={() => setText("")} className="text-xs px-2 py-1 rounded-md" style={{ color: "#8a95a5", backgroundColor: "#f7f8fa" }}>
                    Borrar
                  </button>
                )}
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest mb-2.5" style={{ color: "#b0b8c4", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 500, letterSpacing: "0.15em" }}>Ideas rápidas</p>
              <div className="flex flex-wrap gap-2">
                {quickReasons.map((r) => {
                  const active = text === r;
                  return (
                    <motion.button key={r} whileTap={{ scale: 0.95 }} onClick={() => setText(r)} className="rounded-full px-3.5 py-2 text-[13px] transition-all" style={{ backgroundColor: active ? "#2563EB" : bg, boxShadow: active ? "0 2px 8px rgba(37,99,235,0.3)" : shadowOutSm, color: active ? "white" : "#2d3548", fontWeight: 500, fontFamily: "'Nunito Sans', sans-serif" }}>
                      {r}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── AUDIO TAB ── */}
        {tab === "audio" && (
          <motion.div key="tab-audio" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-5">
            {/* Idle */}
            {recState === "idle" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                <div className="rounded-3xl p-8 flex flex-col items-center" style={{ backgroundColor: bg, boxShadow: shadowOut }}>
                  <motion.button onClick={startRec} whileTap={{ scale: 0.92 }} className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#FF7849", boxShadow: "0 8px 28px rgba(255,120,73,0.35)" }}>
                    <Mic size={32} color="white" strokeWidth={1.8} />
                  </motion.button>
                  <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>Toca para grabar</p>
                  <p className="text-[13px] mt-1" style={{ color: "#8a95a5" }}>Graba un mensaje de voz para Sofi</p>
                </div>
              </motion.div>
            )}

            {/* Recording */}
            {recState === "recording" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                <div className="rounded-3xl p-6 w-full flex flex-col items-center" style={{ backgroundColor: bg, boxShadow: shadowOut }}>
                  <div className="flex items-center gap-2 mb-5">
                    <motion.div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                    <span className="text-3xl tabular-nums" style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "#2d3548" }}>
                      {mins}:{secs.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <WaveformBars isRecording seconds={recSeconds} color="#FF7849" barCount={40} />
                  <motion.p className="text-xs mt-4" style={{ color: "#FF7849", fontWeight: 500 }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                    Grabando...
                  </motion.p>
                </div>
                <div className="flex flex-col items-center mt-6">
                  <div className="relative">
                    <PulsingRings color="rgba(239,68,68,0.3)" />
                    <motion.button onClick={stopRec} whileTap={{ scale: 0.88 }} className="rounded-full flex items-center justify-center relative z-10" style={{ width: 72, height: 72, backgroundColor: "#ef4444", boxShadow: "0 8px 28px rgba(239,68,68,0.35)" }}>
                      <Square size={22} color="white" strokeWidth={2.5} fill="white" />
                    </motion.button>
                  </div>
                  <p className="text-xs mt-3" style={{ color: "#b0b8c4" }}>Toca para detener</p>
                </div>
              </motion.div>
            )}

            {/* Recorded */}
            {recState === "recorded" && (
              <>
                <AudioPreview seconds={recSeconds} onDelete={deleteRec} onReRecord={reRecord} />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="rounded-xl px-4 py-3" style={{ backgroundColor: "#fff7ed" }}>
                  <p className="text-[11px] text-center" style={{ color: "#FF7849", lineHeight: 1.5, fontWeight: 500 }}>Sofi escuchará tu mensaje de voz cuando abra su alcancía</p>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Send */}
      <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onClick={canSend ? onSend : undefined} disabled={!canSend} whileTap={canSend ? { scale: 0.97 } : {}} className="mt-6 w-full rounded-2xl p-4 flex items-center justify-center gap-2.5 transition-all" style={{ backgroundColor: canSend ? "#FF7849" : "#e8ecf1", boxShadow: canSend ? "6px 6px 16px rgba(255,120,73,0.3), -4px -4px 12px #ffffff" : "none", cursor: canSend ? "pointer" : "not-allowed" }}>
        <Send size={16} color={canSend ? "white" : "#b0b8c4"} strokeWidth={2} />
        <span style={{ color: canSend ? "white" : "#b0b8c4", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>Enviar mensaje a Sofi</span>
      </motion.button>

      <button onClick={onBack} className="w-full text-center mt-3 py-2">
        <span className="text-xs" style={{ color: "#b0b8c4" }}>Omitir por ahora</span>
      </button>
    </motion.div>
  );
}

/* ── Message sent screen ── */
function MessageSentScreen({ onDone }: { onDone: () => void }) {
  const hearts = Array.from({ length: 12 }, (_, i) => ({ id: i, delay: 0.3 + i * 0.15, x: (Math.random() - 0.5) * 30 }));

  return (
    <motion.div key="msg-sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-[70vh] px-6 relative overflow-hidden">
      {hearts.map((h) => <FloatingHeart key={h.id} delay={h.delay} x={h.x} />)}

      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="absolute rounded-full" style={{ width: 120, height: 120, border: "2px solid #FF7849" }} initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: [0, 3], opacity: [0.5, 0] }} transition={{ duration: 2, delay: 0.4 + i * 0.3, ease: "easeOut" }} />
      ))}

      <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 }} className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 relative" style={{ backgroundColor: "#FF7849", boxShadow: "0 12px 36px rgba(255,120,73,0.35)" }}>
        <MessageCircle size={44} color="white" strokeWidth={1.6} />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.6 }} className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#22c55e", boxShadow: "0 4px 12px rgba(34,197,94,0.35)" }}>
          <Check size={16} color="white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center mb-2">
        <p className="text-xl mb-2" style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "#2d3548" }}>
          ¡Mensaje enviado!
        </p>
        <p className="text-sm" style={{ color: "#8a95a5", lineHeight: 1.6 }}>
          Sofi recibirá tu mensaje con mucho cariño cuando abra su alcancía
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="w-16 h-16 mt-4 mb-6">
        <PiggyBankSvg />
      </motion.div>

      <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} whileTap={{ scale: 0.97 }} onClick={onDone} className="w-full rounded-2xl p-4 flex items-center justify-center gap-2 transition-all" style={{ backgroundColor: "#2563EB", boxShadow: "6px 6px 16px rgba(37,99,235,0.35), -4px -4px 12px #ffffff", cursor: "pointer" }}>
        <span style={{ color: "white", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>Volver al inicio</span>
      </motion.button>
    </motion.div>
  );
}

/* ── Coin animation ── */
function Coin({ delay, startX, startY }: { delay: number; startX: number; startY: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: startX, top: startY, zIndex: 10 }}
      initial={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
      animate={{ y: [0, -30, 120], x: [0, (Math.random() - 0.5) * 40, 0], opacity: [1, 1, 0], scale: [1, 1.1, 0.5], rotate: [0, 180, 360] }}
      transition={{ duration: 1.2, delay, ease: "easeIn", times: [0, 0.3, 1] }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="15" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
        <circle cx="16" cy="16" r="11" fill="none" stroke="#DAA520" strokeWidth="1.5" />
        <text x="16" y="21" textAnchor="middle" fill="#B8860B" fontSize="14" fontWeight="bold" fontFamily="'Nunito Sans', sans-serif">S</text>
      </svg>
    </motion.div>
  );
}

/* ── Success Screen ── */
function SuccessScreen({ amount, onDone }: { amount: string; onDone: () => void }) {
  const [view, setView] = useState<"success" | "message" | "sent">("success");

  const coins = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: 0.3 + i * 0.15,
    startX: 100 + (i % 4) * 45 + (Math.random() - 0.5) * 30,
    startY: -20 - i * 12,
  }));

  if (view === "message") {
    return <MessageComposer amount={amount} onSend={() => setView("sent")} onBack={() => setView("success")} />;
  }
  if (view === "sent") {
    return <MessageSentScreen onDone={onDone} />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-[80vh] px-6 relative">
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="absolute rounded-full" style={{ width: 200 + i * 80, height: 200 + i * 80, border: `2px solid ${["#2563EB", "#FF7849", "#7C3AED"][i]}`, opacity: 0.1 }} initial={{ scale: 0, opacity: 0.3 }} animate={{ scale: [0, 1.5], opacity: [0.3, 0] }} transition={{ duration: 1.8, delay: 0.5 + i * 0.2, ease: "easeOut" }} />
      ))}

      <div className="relative w-52 h-52 mb-6">
        {coins.map((c) => <Coin key={c.id} delay={c.delay} startX={c.startX} startY={c.startY} />)}
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }} className="w-full h-full">
          <PiggyBankSvg />
        </motion.div>
        <motion.div className="absolute inset-0 rounded-full -z-10" style={{ backgroundColor: "rgba(37,99,235,0.08)" }} initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1.1] }} transition={{ duration: 1, delay: 0.3 }} />
      </div>

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.6 }} className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: "#2563EB", boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}>
        <Check size={28} color="white" strokeWidth={3} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-center">
        <p className="text-xl mb-1" style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "#2d3548" }}>¡Carga exitosa!</p>
        <p className="text-sm mb-1" style={{ color: "#8a95a5" }}>Se cargaron</p>
        <motion.p initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, type: "spring", stiffness: 200 }} className="text-4xl tracking-tighter mb-1" style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "#2563EB" }}>
          S/ {parseFloat(amount || "0").toFixed(2)}
        </motion.p>
        <p className="text-sm" style={{ color: "#8a95a5" }}>a la alcancía de Sofi</p>
      </motion.div>

      <motion.div className="mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <p className="text-xs" style={{ color: "#b0b8c4" }}>El saldo se actualizará en breve</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mt-8 w-full space-y-3 relative z-10">
        <button onClick={() => setView("message")} className="w-full rounded-2xl p-4 flex items-center justify-center gap-3 transition-all active:scale-[0.98]" style={{ backgroundColor: "#FF7849", boxShadow: "6px 6px 16px rgba(255,120,73,0.3), -4px -4px 12px #ffffff", cursor: "pointer" }}>
          <MessageCircle size={18} color="white" strokeWidth={2} />
          <span style={{ color: "white", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>Agregar mensaje para Sofi</span>
        </button>
        <button onClick={onDone} className="w-full rounded-2xl p-4 flex items-center justify-center transition-all active:scale-[0.98]" style={{ backgroundColor: bg, boxShadow: shadowOut, cursor: "pointer" }}>
          <span style={{ color: "#2d3548", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>Volver al inicio</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Step dots ── */
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-6">
      {Array.from({ length: total }, (_, i) => (
        <motion.div key={i} animate={{ width: i === current ? 24 : 8, backgroundColor: i <= current ? "#2563EB" : "#d1d9e6", opacity: i <= current ? 1 : 0.5 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="h-2 rounded-full" />
      ))}
    </div>
  );
}

/* ── Step 1: Amount ── */
function StepAmount({ amount, setAmount, onNext, onBack }: { amount: string; setAmount: (v: string) => void; onNext: () => void; onBack: () => void }) {
  const numAmount = parseFloat(amount);
  const isValid = !isNaN(numAmount) && numAmount > 0;

  return (
    <motion.div key="step-amount" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="pb-8">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
          <ArrowLeft size={18} color="#2d3548" />
        </button>
        <div className="flex-1">
          <p style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>Cargar dinero</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center">
          <CoinIcon size={18} color="#2563EB" strokeWidth={1.8} />
        </div>
      </div>

      <StepDots current={0} total={3} />

      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 mb-3"><PiggyBankSvg /></div>
        <p className="text-sm text-center" style={{ color: "#8a95a5", fontFamily: "'Nunito Sans', sans-serif" }}>¿Cuánto quieres cargar a la alcancía de Sofi?</p>
      </div>

      <div className="rounded-3xl p-6 mb-5" style={{ backgroundColor: bg, boxShadow: shadowOut }}>
        <div className="flex items-baseline justify-center gap-1 mb-5">
          <span className="text-xl" style={{ color: "#8a95a5", fontWeight: 500 }}>S/</span>
          <input type="text" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.00" className="text-5xl bg-transparent outline-none text-center tracking-tighter" style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "#2d3548", width: `${Math.max(4, (amount || "0.00").length + 1)}ch`, maxWidth: "100%" }} />
        </div>
        <div className="flex gap-2">
          {presetAmounts.map((val) => {
            const active = amount === val.toString();
            return (
              <button key={val} onClick={() => setAmount(val.toString())} className="flex-1 py-2.5 rounded-xl text-sm transition-all active:scale-[0.96]" style={{ backgroundColor: active ? "#2563EB" : bg, boxShadow: active ? "none" : shadowOutSm, color: active ? "white" : "#8a95a5", fontFamily: "'Nunito Sans', sans-serif", fontWeight: active ? 700 : 500 }}>
                S/{val}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-center mb-6" style={{ color: "#b0b8c4" }}>Elige un monto rápido o escribe uno personalizado</p>

      <button onClick={onNext} disabled={!isValid} className="w-full rounded-2xl p-4 flex items-center justify-center gap-2 transition-all active:scale-[0.98]" style={{ backgroundColor: isValid ? "#2563EB" : "#dde3ec", boxShadow: isValid ? "6px 6px 16px rgba(37,99,235,0.35), -4px -4px 12px #ffffff" : shadowOut, cursor: isValid ? "pointer" : "not-allowed" }}>
        <span style={{ color: isValid ? "white" : "#8a95a5", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>Continuar</span>
        {isValid && <ChevronRight size={18} color="white" />}
      </button>
    </motion.div>
  );
}

/* ── Step 2: Payment method ── */
function StepMethod({ selectedMethod, setSelectedMethod, amount, onNext, onBack }: { selectedMethod: string | null; setSelectedMethod: (v: string) => void; amount: string; onNext: () => void; onBack: () => void }) {
  return (
    <motion.div key="step-method" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="pb-8">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
          <ArrowLeft size={18} color="#2d3548" />
        </button>
        <p style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>Método de pago</p>
      </div>

      <StepDots current={1} total={3} />

      <div className="flex justify-center mb-6">
        <div className="rounded-full px-4 py-2 flex items-center gap-2" style={{ backgroundColor: bg, boxShadow: shadowOutSm }}>
          <span className="text-xs" style={{ color: "#8a95a5" }}>Cargando</span>
          <span className="text-sm" style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "#2563EB" }}>S/ {parseFloat(amount || "0").toFixed(2)}</span>
        </div>
      </div>

      <p className="text-sm text-center mb-5" style={{ color: "#8a95a5", fontFamily: "'Nunito Sans', sans-serif" }}>¿Cómo deseas hacer la carga?</p>

      <div className="space-y-3 mb-8">
        {paymentMethods.map((m) => {
          const active = selectedMethod === m.id;
          return (
            <button key={m.id} onClick={() => { setSelectedMethod(m.id); setTimeout(onNext, 350); }} className="w-full rounded-2xl p-4 text-left transition-all active:scale-[0.98]" style={{ backgroundColor: bg, boxShadow: active ? shadowInset : shadowOut }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: active ? m.color : bg, boxShadow: active ? "none" : shadowOutSm, transition: "all 0.2s" }}>
                  <m.Icon size={22} color={active ? "white" : m.color} strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>{m.label}</p>
                  <p className="text-xs" style={{ color: "#8a95a5" }}>{m.desc}</p>
                </div>
                <ChevronRight size={16} color={active ? m.color : "#d1d9e6"} />
              </div>
              <div className="rounded-xl px-3 py-2.5 flex items-center gap-3" style={{ backgroundColor: "#f7f8fa" }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${m.color}15` }}>
                  <span className="text-[11px]" style={{ color: m.color, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>{m.bank === "BCP" ? "B" : "Y"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs truncate" style={{ color: "#2d3548", fontWeight: 600 }}>{m.account}</p>
                  <p className="text-[11px] tracking-wide" style={{ color: "#8a95a5", fontFamily: "monospace" }}>{m.accountNumber}</p>
                </div>
                <Check size={14} color="#22c55e" strokeWidth={2.5} />
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── Step 3: Confirm ── */
function StepConfirm({ amount, selectedMethod, onConfirm, onBack }: { amount: string; selectedMethod: string; onConfirm: () => void; onBack: () => void }) {
  const method = paymentMethods.find((m) => m.id === selectedMethod);
  if (!method) return null;

  return (
    <motion.div key="step-confirm" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="pb-8">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
          <ArrowLeft size={18} color="#2d3548" />
        </button>
        <p style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>Confirmar</p>
      </div>

      <StepDots current={2} total={3} />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-3xl p-6 mb-6" style={{ backgroundColor: bg, boxShadow: shadowOut }}>
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20"><PiggyBankSvg /></div>
        </div>
        <div className="text-center mb-5">
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#8a95a5", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 500, letterSpacing: "0.15em" }}>Monto a cargar</p>
          <p className="text-4xl tracking-tighter" style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "#2d3548" }}>S/ {parseFloat(amount || "0").toFixed(2)}</p>
        </div>
        <div className="h-px w-full mb-5" style={{ backgroundColor: "#e8ecf1" }} />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#8a95a5" }}>Destino</span>
            <span className="text-sm" style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>Alcancía de Sofi</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#8a95a5" }}>Método</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: method.color }}>
                <method.Icon size={13} color="white" strokeWidth={2} />
              </div>
              <span className="text-sm" style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>{method.label}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#8a95a5" }}>Origen</span>
            <span className="text-sm" style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>{method.account}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#8a95a5" }}>{method.bank === "BCP" ? "Cuenta" : "Celular"}</span>
            <span className="text-sm tracking-wide" style={{ color: "#8a95a5", fontWeight: 500, fontFamily: "monospace" }}>{method.accountNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#8a95a5" }}>Fecha</span>
            <span className="text-sm" style={{ color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>Hoy, {new Date().toLocaleDateString("es-PE", { day: "numeric", month: "short" })}</span>
          </div>
        </div>
      </motion.div>

      <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onClick={onConfirm} className="w-full rounded-2xl p-4 flex items-center justify-center gap-2 transition-all active:scale-[0.98]" style={{ backgroundColor: "#2563EB", boxShadow: "6px 6px 16px rgba(37,99,235,0.35), -4px -4px 12px #ffffff", cursor: "pointer" }}>
        <span style={{ color: "white", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>Confirmar carga</span>
      </motion.button>

      <div className="flex justify-center gap-4 mt-4">
        <button onClick={onBack} className="text-xs underline" style={{ color: "#8a95a5" }}>Cambiar método</button>
      </div>
    </motion.div>
  );
}

/* ── Main component ── */
interface Props {
  onBack: () => void;
}

export function LoadMoneySection({ onBack }: Props) {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleDone = () => {
    setStep(0);
    setAmount("");
    setSelectedMethod(null);
    onBack();
  };

  return (
    <AnimatePresence mode="wait">
      {step === 3 ? (
        <SuccessScreen key="success" amount={amount} onDone={handleDone} />
      ) : step === 0 ? (
        <StepAmount key="s0" amount={amount} setAmount={setAmount} onNext={() => setStep(1)} onBack={onBack} />
      ) : step === 1 ? (
        <StepMethod key="s1" selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} amount={amount} onNext={() => setStep(2)} onBack={() => setStep(0)} />
      ) : (
        <StepConfirm key="s2" amount={amount} selectedMethod={selectedMethod!} onConfirm={() => setStep(3)} onBack={() => setStep(1)} />
      )}
    </AnimatePresence>
  );
}