import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeftIcon,
  GearIcon,
  WifiIcon,
  BatteryIcon,
  SmartphoneIcon,
  VolumeIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  EditIcon,
  LinkIcon,
  PiggyIcon,
  CoinIcon,
} from "../components/Icons";
import { bg, shadowOut, shadowInset } from "../components/designTokens";

/* ---- Toggle ---- */
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-12 h-8 rounded-full relative transition-colors"
      style={{
        backgroundColor: on ? "#2563EB" : "#e2e6ed",
        boxShadow: shadowInset,
      }}
    >
      <div
        className="absolute top-1 w-5 h-5 rounded-full transition-all"
        style={{
          backgroundColor: bg,
          boxShadow: "2px 2px 5px #d1d9e6",
          left: on ? 24 : 4,
        }}
      />
    </button>
  );
}

/* ---- Slider ---- */
function VolumeSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-3 w-full">
      <VolumeIcon size={16} color="#8a95a5" strokeWidth={1.8} />
      <div className="flex-1 relative">
        <div
          className="w-full h-2 rounded-full"
          style={{ backgroundColor: "#e8ecf2", boxShadow: shadowInset }}
        />
        <div
          className="absolute top-0 left-0 h-2 rounded-full"
          style={{ width: `${value}%`, backgroundColor: "#2563EB" }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
        />
      </div>
      <span className="text-xs min-w-[30px] text-right" style={{ color: "#2d3548", fontWeight: 600 }}>
        {value}%
      </span>
    </div>
  );
}

/* ---- Status Pill ---- */
function StatusPill({ label, ok }: { label: string; ok: boolean }) {
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full"
      style={{
        color: ok ? "#16a34a" : "#dc2626",
        backgroundColor: ok ? "#f0fdf4" : "#fef2f2",
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );
}

/* ---- Section Title ---- */
function SectionTitle({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: color + "12" }}
      >
        {icon}
      </div>
      <p className="text-sm" style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
        {label}
      </p>
    </div>
  );
}

/* ---- Setting Row ---- */
function SettingRow({
  icon,
  iconColor,
  label,
  description,
  right,
}: {
  icon: React.ReactNode;
  iconColor: string;
  label: string;
  description?: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-3.5">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconColor + "12" }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>{label}</p>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: "#8a95a5", fontWeight: 400, lineHeight: 1.4 }}>
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

/* ============ MAIN ============ */
export function SettingsPage() {
  const navigate = useNavigate();

  /* Device state (simulated) */
  const batteryLevel = 78;
  const wifiConnected = true;
  const wifiName = "Casa_Rios_5G";

  /* Settings state */
  const [phonePaired, setPhonePaired] = useState(true);
  const [piggyName, setPiggyName] = useState("Alcancita de Sofi");
  const [editingName, setEditingName] = useState(false);
  const [volume, setVolume] = useState(65);

  /* Data collection toggles */
  const [collectHabits, setCollectHabits] = useState(true);
  const [collectProgress, setCollectProgress] = useState(true);
  const [collectInteractions, setCollectInteractions] = useState(false);

  /* Payment methods state */
  const [bcpLinked, setBcpLinked] = useState(true);
  const [yapeLinked, setYapeLinked] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bg, boxShadow: shadowOut }}
        >
          <ChevronLeftIcon size={18} color="#2d3548" strokeWidth={2} />
        </button>
        <div className="flex-1">
          <p style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
            Configuración
          </p>
          <p className="text-xs" style={{ color: "#8a95a5", fontWeight: 500 }}>
            Alcancía de Sofi
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "#2563EB12" }}
        >
          <GearIcon size={18} color="#2563EB" strokeWidth={1.8} />
        </div>
      </div>

      {/* ======= DEVICE STATUS ======= */}
      <div
        className="rounded-3xl p-5"
        style={{ backgroundColor: bg, boxShadow: shadowOut }}
      >
        <SectionTitle
          icon={<PiggyIcon size={18} color="#2563EB" strokeWidth={2} />}
          label="Estado de la alcancía"
          color="#2563EB"
        />

        {/* Battery */}
        <div className="flex items-center gap-3 py-3 border-b" style={{ borderColor: "#f0f2f5" }}>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: batteryLevel > 20 ? "#f0fdf4" : "#fef2f2" }}
          >
            <BatteryIcon size={18} color={batteryLevel > 20 ? "#16a34a" : "#dc2626"} strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>Batería</p>
            <p className="text-xs" style={{ color: "#8a95a5", fontWeight: 400 }}>
              Última carga: hace 3 días
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Mini battery bar */}
            <div className="w-16 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "#e8ecf2" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${batteryLevel}%`,
                  backgroundColor: batteryLevel > 50 ? "#16a34a" : batteryLevel > 20 ? "#f59e0b" : "#dc2626",
                }}
              />
            </div>
            <span className="text-xs" style={{ color: "#2d3548", fontWeight: 700 }}>
              {batteryLevel}%
            </span>
          </div>
        </div>

        {/* WiFi */}
        <div className="flex items-center gap-3 py-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: wifiConnected ? "#f0fdf4" : "#fef2f2" }}
          >
            <WifiIcon size={18} color={wifiConnected ? "#16a34a" : "#dc2626"} strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>Conexión WiFi</p>
            <p className="text-xs" style={{ color: "#8a95a5", fontWeight: 400 }}>
              {wifiConnected ? wifiName : "Sin conexión"}
            </p>
          </div>
          <StatusPill label={wifiConnected ? "Conectado" : "Desconectado"} ok={wifiConnected} />
        </div>
      </div>

      {/* ======= DEVICE SETTINGS ======= */}
      <div
        className="rounded-3xl p-5"
        style={{ backgroundColor: bg, boxShadow: shadowOut }}
      >
        <SectionTitle
          icon={<GearIcon size={18} color="#7C3AED" strokeWidth={2} />}
          label="Configuración del dispositivo"
          color="#7C3AED"
        />

        {/* Phone pairing */}
        <div className="border-b" style={{ borderColor: "#f0f2f5" }}>
          <SettingRow
            icon={<SmartphoneIcon size={18} color="#7C3AED" strokeWidth={1.8} />}
            iconColor="#7C3AED"
            label="Enlace al celular"
            description={phonePaired ? "Vinculado con iPhone de María Elena" : "No vinculado"}
            right={<Toggle on={phonePaired} onToggle={() => setPhonePaired(!phonePaired)} />}
          />
        </div>

        {/* Piggy name */}
        <div className="border-b" style={{ borderColor: "#f0f2f5" }}>
          <div className="flex items-center gap-3 py-3.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#FF784912" }}
            >
              <PiggyIcon size={18} color="#FF7849" strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>Nombre de la alcancía</p>
              {editingName ? (
                <input
                  type="text"
                  value={piggyName}
                  onChange={(e) => setPiggyName(e.target.value)}
                  onBlur={() => setEditingName(false)}
                  onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
                  autoFocus
                  className="text-xs mt-1 w-full px-3 py-1.5 rounded-lg outline-none"
                  style={{
                    color: "#2d3548",
                    fontWeight: 500,
                    backgroundColor: bg,
                    boxShadow: shadowInset,
                    border: "none",
                  }}
                />
              ) : (
                <p className="text-xs mt-0.5" style={{ color: "#8a95a5", fontWeight: 400 }}>
                  {piggyName}
                </p>
              )}
            </div>
            <button
              onClick={() => setEditingName(!editingName)}
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: bg, boxShadow: shadowOut }}
            >
              <EditIcon size={16} color="#8a95a5" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Volume */}
        <div className="py-3.5">
          <p className="text-sm mb-3" style={{ color: "#2d3548", fontWeight: 600 }}>
            Volumen de la alcancía
          </p>
          <VolumeSlider value={volume} onChange={setVolume} />
        </div>
      </div>

      {/* ======= PAYMENT METHODS ======= */}
      <div
        className="rounded-3xl p-5"
        style={{ backgroundColor: bg, boxShadow: shadowOut }}
      >
        <SectionTitle
          icon={<CoinIcon size={18} color="#2563EB" strokeWidth={2} />}
          label="Medios de pago"
          color="#2563EB"
        />

        <p className="text-[13px] mb-4" style={{ color: "#8a95a5", lineHeight: 1.5 }}>
          Cuentas vinculadas para cargar dinero.
        </p>

        {/* BCP */}
        <div
          className="rounded-2xl p-4 mb-3"
          style={{ backgroundColor: bcpLinked ? bg : "#f8f9fb", boxShadow: bcpLinked ? shadowOut : "none" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: bcpLinked ? "#2563EB" : "#e2e6ed" }}
            >
              <BankIconSmall color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>Transferencia BCP</p>
                <StatusPill label={bcpLinked ? "Vinculado" : "Desvinculado"} ok={bcpLinked} />
              </div>
              <p className="text-xs mt-0.5" style={{ color: "#8a95a5" }}>Cuenta Ahorros Soles</p>
            </div>
          </div>

          {bcpLinked && (
            <div className="rounded-xl px-3.5 py-3 mb-3" style={{ backgroundColor: "#f8f9fb" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: "#8a95a5" }}>Titular</span>
                <span className="text-xs" style={{ color: "#2d3548", fontWeight: 600 }}>María Elena Ríos</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: "#8a95a5" }}>Cuenta</span>
                <span className="text-xs tracking-wide" style={{ color: "#2d3548", fontWeight: 600, fontFamily: "monospace" }}>191-2634****-0-53</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "#8a95a5" }}>Banco</span>
                <span className="text-xs" style={{ color: "#2563EB", fontWeight: 600 }}>BCP</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            {bcpLinked && (
              <button
                className="flex-1 rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-xs transition-all active:scale-[0.97]"
                style={{ backgroundColor: bg, boxShadow: shadowOut, color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}
              >
                <EditIcon size={14} color="#8a95a5" strokeWidth={1.8} />
                Modificar
              </button>
            )}
            <button
              onClick={() => setBcpLinked(!bcpLinked)}
              className="flex-1 rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-xs transition-all active:scale-[0.97]"
              style={{
                backgroundColor: bcpLinked ? "#fef2f2" : "#2563EB",
                color: bcpLinked ? "#dc2626" : "white",
                fontWeight: 600,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              <LinkIcon size={14} color={bcpLinked ? "#dc2626" : "white"} strokeWidth={1.8} />
              {bcpLinked ? "Desvincular" : "Vincular"}
            </button>
          </div>
        </div>

        {/* Yape */}
        <div
          className="rounded-2xl p-4"
          style={{ backgroundColor: yapeLinked ? bg : "#f8f9fb", boxShadow: yapeLinked ? shadowOut : "none" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: yapeLinked ? "#7C3AED" : "#e2e6ed" }}
            >
              <SmartphoneIcon size={18} color="white" strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm" style={{ color: "#2d3548", fontWeight: 600 }}>Yape</p>
                <StatusPill label={yapeLinked ? "Vinculado" : "Desvinculado"} ok={yapeLinked} />
              </div>
              <p className="text-xs mt-0.5" style={{ color: "#8a95a5" }}>Celular asociado</p>
            </div>
          </div>

          {yapeLinked && (
            <div className="rounded-xl px-3.5 py-3 mb-3" style={{ backgroundColor: "#f8f9fb" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: "#8a95a5" }}>Titular</span>
                <span className="text-xs" style={{ color: "#2d3548", fontWeight: 600 }}>María Elena Ríos</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: "#8a95a5" }}>Celular</span>
                <span className="text-xs tracking-wide" style={{ color: "#2d3548", fontWeight: 600, fontFamily: "monospace" }}>987 *** 412</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "#8a95a5" }}>Servicio</span>
                <span className="text-xs" style={{ color: "#7C3AED", fontWeight: 600 }}>Yape</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            {yapeLinked && (
              <button
                className="flex-1 rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-xs transition-all active:scale-[0.97]"
                style={{ backgroundColor: bg, boxShadow: shadowOut, color: "#2d3548", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}
              >
                <EditIcon size={14} color="#8a95a5" strokeWidth={1.8} />
                Modificar
              </button>
            )}
            <button
              onClick={() => setYapeLinked(!yapeLinked)}
              className="flex-1 rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-xs transition-all active:scale-[0.97]"
              style={{
                backgroundColor: yapeLinked ? "#fef2f2" : "#7C3AED",
                color: yapeLinked ? "#dc2626" : "white",
                fontWeight: 600,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              <LinkIcon size={14} color={yapeLinked ? "#dc2626" : "white"} strokeWidth={1.8} />
              {yapeLinked ? "Desvincular" : "Vincular"}
            </button>
          </div>
        </div>

        {/* Add new method hint */}
        <button
          className="w-full mt-4 rounded-xl py-3 flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.97]"
          style={{ backgroundColor: bg, boxShadow: shadowInset, color: "#8a95a5", fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}
        >
          <CoinIcon size={14} color="#8a95a5" strokeWidth={1.8} />
          Agregar otro medio de pago
        </button>
      </div>

      {/* ======= DATA COLLECTION ======= */}
      <div
        className="rounded-3xl p-5"
        style={{ backgroundColor: bg, boxShadow: shadowOut }}
      >
        <SectionTitle
          icon={<DatabaseIcon size={18} color="#FF7849" strokeWidth={2} />}
          label="Datos a recolectar"
          color="#FF7849"
        />

        <p className="text-[13px] mb-4" style={{ color: "#8a95a5", lineHeight: 1.5 }}>
          Datos que registra la alcancía para personalizar la experiencia de Sofi.
        </p>

        <div className="border-b" style={{ borderColor: "#f0f2f5" }}>
          <SettingRow
            icon={<FlameIconSmall />}
            iconColor="#FF7849"
            label="Hábitos de ahorro"
            description="Frecuencia y montos de depósitos"
            right={<Toggle on={collectHabits} onToggle={() => setCollectHabits(!collectHabits)} />}
          />
        </div>

        <div className="border-b" style={{ borderColor: "#f0f2f5" }}>
          <SettingRow
            icon={<TargetIconSmall />}
            iconColor="#2563EB"
            label="Progreso en metas"
            description="Avance hacia objetivos de ahorro"
            right={<Toggle on={collectProgress} onToggle={() => setCollectProgress(!collectProgress)} />}
          />
        </div>

        <SettingRow
          icon={<LinkIcon size={18} color="#7C3AED" strokeWidth={1.8} />}
          iconColor="#7C3AED"
          label="Interacciones con la alcancía"
          description="Toques, sacudidas y uso de botones"
          right={<Toggle on={collectInteractions} onToggle={() => setCollectInteractions(!collectInteractions)} />}
        />
      </div>

      {/* ======= SECURITY & PRIVACY ======= */}
      <div
        className="rounded-3xl p-5"
        style={{ backgroundColor: bg, boxShadow: shadowOut }}
      >
        <SectionTitle
          icon={<ShieldCheckIcon size={18} color="#16a34a" strokeWidth={2} />}
          label="Seguridad y privacidad"
          color="#16a34a"
        />

        {/* Certificates */}
        <div
          className="rounded-2xl p-4 mb-4"
          style={{ backgroundColor: "#f0fdf4" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "#dcfce7" }}>
              <ShieldCheckIcon size={17} color="#16a34a" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-sm mb-1" style={{ color: "#15803d", fontWeight: 700 }}>
                Certificado de seguridad activo
              </p>
              <p className="text-[13px]" style={{ color: "#22c55e", lineHeight: 1.5, fontWeight: 500 }}>
                Conexión cifrada TLS 1.3. Los datos viajan protegidos.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy info items */}
        <div className="space-y-3">
          <PrivacyItem
            title="Uso exclusivamente educativo"
            description="Los datos mejoran la experiencia educativa de Sofi. No se comparten con terceros."
          />
          <PrivacyItem
            title="Sin datos personales sensibles"
            description="No se recolectan nombres, direcciones, fotos ni datos biométricos. Solo patrones de ahorro anonimizados."
          />
          <PrivacyItem
            title="Control total para los padres"
            description="Desactiva la recolección en cualquier momento. Los datos se eliminan al hacerlo."
          />
          <PrivacyItem
            title="Almacenamiento local seguro"
            description="Datos cifrados en el dispositivo. Sincronización con encriptación de extremo a extremo."
          />
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap gap-2 mt-5">
          {["COPPA", "GDPR-K", "ISO 27001", "Cifrado AES-256"].map((badge) => (
            <span
              key={badge}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                color: "#16a34a",
                backgroundColor: "#f0fdf4",
                fontWeight: 600,
                border: "1px solid #dcfce7",
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}

/* Small inline icon wrappers to avoid importing more from Icons */
function FlameIconSmall() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2c0 4-4 6-4 10a6 6 0 0 0 12 0c0-4-4-6-4-10-1 2-3 3-4 3s-3-1-4-3z" stroke="#FF7849" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22a3 3 0 0 1-3-3c0-2 3-4 3-4s3 2 3 4a3 3 0 0 1-3 3z" stroke="#FF7849" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TargetIconSmall() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#2563EB" strokeWidth={1.8}/>
      <circle cx="12" cy="12" r="5" stroke="#2563EB" strokeWidth={1.8}/>
      <circle cx="12" cy="12" r="1.5" fill="#2563EB"/>
    </svg>
  );
}

function PrivacyItem({ title, description }: { title: string; description: string }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ backgroundColor: "#f8f9fb" }}
    >
      <p className="text-sm mb-1" style={{ color: "#2d3548", fontWeight: 600 }}>
        {title}
      </p>
      <p className="text-[13px]" style={{ color: "#8a95a5", lineHeight: 1.55 }}>
        {description}
      </p>
    </div>
  );
}

function BankIconSmall({ color }: { color: string }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}