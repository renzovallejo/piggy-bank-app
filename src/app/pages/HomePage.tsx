import { useNavigate } from "react-router";
import { BalanceCard } from "../components/BalanceCard";
import { QuickActions } from "../components/QuickActions";
import { SectionCards } from "../components/SectionCards";
import { ActiveMissionCard } from "../components/ActiveMissionCard";
import { RemindersZone } from "../components/RemindersZone";
import { GearIcon, BellIcon } from "../components/Icons";
import { bg, shadowOut } from "../components/designTokens";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs" style={{ color: "#8a95a5", fontWeight: 500 }}>
                Hola de nuevo
              </p>
              <p style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
                Mamá de Sofi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/avisos")}
              className="w-11 h-11 rounded-xl flex items-center justify-center relative"
              style={{ backgroundColor: bg, boxShadow: shadowOut }}
            >
              <BellIcon size={17} color="#2563EB" strokeWidth={1.8} />
              <div
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
                style={{ backgroundColor: "#FF7849", boxShadow: "0 2px 6px rgba(255,120,73,0.5)" }}
              >
                <span className="text-[10px] text-white leading-none" style={{ fontWeight: 700 }}>3</span>
              </div>
            </button>
            <button
              onClick={() => navigate("/configuracion")}
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: bg, boxShadow: shadowOut }}
            >
              <GearIcon size={17} color="#8a95a5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 space-y-7">
        <BalanceCard />
        <ActiveMissionCard />
        <QuickActions onClick={() => navigate("/cargar")} />
        <SectionCards
          onMonitor={() => navigate("/monitorear")}
          onTeach={() => navigate("/ensenar")}
        />
        <RemindersZone />
      </div>
    </>
  );
}
