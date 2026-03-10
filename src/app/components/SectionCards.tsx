import { BookIcon, TrendUpIcon } from "./Icons";
import { bg, shadowOut } from "./designTokens";

interface Props {
  onMonitor?: () => void;
  onTeach?: () => void;
}

export function SectionCards({ onMonitor, onTeach }: Props) {
  return (
    <div
      className="grid grid-cols-2 gap-4"
    >
      {/* Monitorear */}
      <button
        onClick={onMonitor}
        className="rounded-3xl p-5 text-left flex items-center gap-3 group cursor-pointer transition-transform active:scale-[0.97]"
        style={{ backgroundColor: bg, boxShadow: shadowOut }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: bg }}
        >
          <TrendUpIcon size={20} color="#FF7849" strokeWidth={2} />
        </div>
        <div>
          <p
            className="text-sm"
            style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Monitorear
          </p>
          <p className="text-xs" style={{ color: "#8a95a5", fontWeight: 400, lineHeight: 1.4 }}>
            Evolución de Sofi
          </p>
        </div>
      </button>

      {/* Enseñar */}
      <button
        onClick={onTeach}
        className="rounded-3xl p-5 text-left flex items-center gap-3 group cursor-pointer transition-transform active:scale-[0.97]"
        style={{ backgroundColor: bg, boxShadow: shadowOut }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: bg }}
        >
          <BookIcon size={20} color="#7C3AED" strokeWidth={2} />
        </div>
        <div>
          <p
            className="text-sm"
            style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Enseñar
          </p>
          <p className="text-xs" style={{ color: "#8a95a5", fontWeight: 400, lineHeight: 1.4 }}>
            Actividades financieras
          </p>
        </div>
      </button>
    </div>
  );
}
