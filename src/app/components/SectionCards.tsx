import { BikeIcon, GamepadIcon, BookIcon, TrendUpIcon } from "./Icons";
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
        className="rounded-3xl p-5 text-left flex flex-col justify-between group cursor-pointer transition-transform active:scale-[0.97]"
        style={{ backgroundColor: bg, boxShadow: shadowOut, minHeight: 185 }}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: bg }}
            >
              <TrendUpIcon size={20} color="#FF7849" strokeWidth={2} />
            </div>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform"
              style={{ backgroundColor: "#FF784910" }}
            >
              <TrendUpIcon size={13} color="#FF7849" strokeWidth={2} />
            </div>
          </div>
          <p
            className="text-sm mb-1"
            style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Monitorear
          </p>
          <p className="text-xs" style={{ color: "#8a95a5", fontWeight: 400, lineHeight: 1.4 }}>
            Progreso y evolución de Sofi
          </p>
        </div>

        {/* Mini preview */}
        <div className="flex items-center gap-1.5 mt-3">
          <div className="flex gap-1">
            {[
              { Icon: BikeIcon, color: "#2563EB" },
              { Icon: GamepadIcon, color: "#FF7849" },
            ].map((g, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ backgroundColor: bg, boxShadow: "2px 2px 5px #d1d9e6, -2px -2px 5px #ffffff" }}
              >
                <g.Icon size={11} color={g.color} strokeWidth={2.2} />
              </div>
            ))}
          </div>
          <span className="text-xs" style={{ color: "#b0b8c4", fontWeight: 500 }}>2 metas</span>
        </div>
      </button>

      {/* Enseñar */}
      <button
        onClick={onTeach}
        className="rounded-3xl p-5 text-left flex flex-col justify-between group cursor-pointer transition-transform active:scale-[0.97]"
        style={{ backgroundColor: bg, boxShadow: shadowOut, minHeight: 185 }}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: bg }}
            >
              <BookIcon size={20} color="#7C3AED" strokeWidth={2} />
            </div>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform"
              style={{ backgroundColor: "#7C3AED10" }}
            >
              <BookIcon size={13} color="#7C3AED" strokeWidth={2} />
            </div>
          </div>
          <p
            className="text-sm mb-1"
            style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Enseñar
          </p>
          <p className="text-xs" style={{ color: "#8a95a5", fontWeight: 400, lineHeight: 1.4 }}>
            Tips y actividades financieras
          </p>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-1.5 mt-3">
          <div
            className="rounded-full px-2.5 py-1 flex items-center gap-1"
            style={{
              backgroundColor: "#FF7849",
              boxShadow: "2px 2px 6px rgba(255,120,73,0.3), -2px -2px 4px #ffffff",
            }}
          >
            <span className="text-[11px] text-white" style={{ fontWeight: 600 }}>3 nuevos</span>
          </div>
        </div>
      </button>
    </div>
  );
}