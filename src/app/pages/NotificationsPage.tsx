import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeftIcon,
  BellIcon,
  CoinIcon,
  StarIcon,
  LightbulbIcon,
  ShieldCheckIcon,
  PiggyIcon,
  TargetIcon,
} from "../components/Icons";
import { bg, shadowOut } from "../components/designTokens";

interface Notification {
  id: string;
  type: "deposito" | "logro" | "tip" | "sistema" | "meta";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "deposito",
    title: "Depósito recibido",
    message: "Se registraron S/ 5.00 en la alcancía de Sofi. Total acumulado: S/ 47.50",
    time: "Hace 2 horas",
    read: false,
  },
  {
    id: "2",
    type: "logro",
    title: "Misión completada",
    message: "Sofi completó la misión \"Separar monedas por tamaño\". Ganó 15 puntos de experiencia.",
    time: "Hace 5 horas",
    read: false,
  },
  {
    id: "3",
    type: "tip",
    title: "Tip del día",
    message: "Deja que Sofi cuente las monedas contigo. Contar dinero real refuerza el aprendizaje numérico.",
    time: "Hoy, 8:00 AM",
    read: false,
  },
  {
    id: "4",
    type: "meta",
    title: "Meta casi lista",
    message: "La meta \"Bicicleta nueva\" está al 85%. Faltan solo S/ 22.50 para completarla.",
    time: "Ayer",
    read: true,
  },
  {
    id: "5",
    type: "sistema",
    title: "Batería baja",
    message: "La alcancía tiene 15% de batería. Conéctala para que siga registrando los ahorros de Sofi.",
    time: "Ayer",
    read: true,
  },
  {
    id: "6",
    type: "deposito",
    title: "Depósito recibido",
    message: "Se registraron S/ 2.00 en la alcancía de Sofi. Total acumulado: S/ 42.50",
    time: "Hace 2 días",
    read: true,
  },
  {
    id: "7",
    type: "logro",
    title: "Racha de 5 días",
    message: "Sofi lleva 5 días seguidos ahorrando. Su constancia es admirable.",
    time: "Hace 3 días",
    read: true,
  },
  {
    id: "8",
    type: "tip",
    title: "Nuevo cuento disponible",
    message: "\"El jardín mágico de las monedas\" ya está listo para leer con Sofi antes de dormir.",
    time: "Hace 3 días",
    read: true,
  },
];

const typeConfig: Record<
  Notification["type"],
  { icon: typeof CoinIcon; color: string; bg: string }
> = {
  deposito: { icon: CoinIcon, color: "#16a34a", bg: "#f0fdf4" },
  logro: { icon: StarIcon, color: "#FF7849", bg: "#FFF7ED" },
  tip: { icon: LightbulbIcon, color: "#7C3AED", bg: "#F5F3FF" },
  sistema: { icon: ShieldCheckIcon, color: "#dc2626", bg: "#fef2f2" },
  meta: { icon: TargetIcon, color: "#2563EB", bg: "#eff6ff" },
};

type FilterTab = "todas" | "no-leidas";

export function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<FilterTab>("todas");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered =
    filter === "no-leidas"
      ? notifications.filter((n) => !n.read)
      : notifications;

  function markAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bg, boxShadow: shadowOut }}
        >
          <ChevronLeftIcon size={18} color="#2d3548" strokeWidth={2} />
        </button>
        <div className="flex-1">
          <p style={{ color: "#2d3548", fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>
            Avisos
          </p>
          <p className="text-xs" style={{ color: "#8a95a5", fontWeight: 500 }}>
            {unreadCount > 0
              ? `${unreadCount} sin leer`
              : "Todo al día"}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center relative"
          style={{ backgroundColor: "#2563EB12" }}
        >
          <BellIcon size={18} color="#2563EB" strokeWidth={1.8} />
          {unreadCount > 0 && (
            <div
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#FF7849" }}
            >
              <span className="text-[10px] text-white" style={{ fontWeight: 700 }}>
                {unreadCount}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filter tabs + Mark all */}
      <div className="flex items-center justify-between">
        <div
          className="flex rounded-xl p-1"
          style={{ backgroundColor: "#f0f2f5" }}
        >
          {(["todas", "no-leidas"] as FilterTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="px-4 py-1.5 rounded-lg text-xs transition-all"
              style={{
                fontWeight: 600,
                color: filter === tab ? "#2d3548" : "#8a95a5",
                backgroundColor: filter === tab ? bg : "transparent",
                boxShadow: filter === tab ? shadowOut : "none",
              }}
            >
              {tab === "todas" ? "Todas" : "Sin leer"}
            </button>
          ))}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs px-3 py-1.5 rounded-lg"
            style={{ color: "#2563EB", fontWeight: 600, backgroundColor: "#eff6ff" }}
          >
            Marcar todo
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div
            className="rounded-3xl p-8 flex flex-col items-center justify-center"
            style={{ backgroundColor: bg, boxShadow: shadowOut }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              <BellIcon size={24} color="#b0b8c4" strokeWidth={1.5} />
            </div>
            <p className="text-sm mb-1" style={{ color: "#2d3548", fontWeight: 600 }}>
              Sin avisos pendientes
            </p>
            <p className="text-xs text-center" style={{ color: "#8a95a5", lineHeight: 1.5 }}>
              Cuando haya novedades sobre Sofi y su alcancía, aparecerán aquí.
            </p>
          </div>
        ) : (
          filtered.map((notif) => {
            const cfg = typeConfig[notif.type];
            const Icon = cfg.icon;
            return (
              <button
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className="w-full rounded-2xl p-4 text-left transition-transform active:scale-[0.98]"
                style={{
                  backgroundColor: bg,
                  boxShadow: shadowOut,
                }}
              >
                <div className="flex gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: cfg.bg }}
                  >
                    <Icon size={18} color={cfg.color} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p
                        className="text-sm flex-1"
                        style={{ color: "#2d3548", fontWeight: notif.read ? 500 : 700 }}
                      >
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: "#2563EB" }}
                        />
                      )}
                    </div>
                    <p
                      className="text-[13px] mb-2"
                      style={{
                        color: notif.read ? "#b0b8c4" : "#6b7280",
                        lineHeight: 1.45,
                      }}
                    >
                      {notif.message}
                    </p>
                    <p className="text-xs" style={{ color: "#b0b8c4", fontWeight: 500 }}>
                      {notif.time}
                    </p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}