import { Outlet, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useRef, useEffect } from "react";
import {
  HomeIcon,
  CoinIcon,
  TrendUpIcon,
  BookIcon,
} from "./Icons";
import { bg, shadowOut, shadowInset } from "./designTokens";

type Tab = "home" | "cargar" | "monitorear" | "ensenar";

const navItems: { Icon: typeof HomeIcon; tab: Tab; path: string }[] = [
  { Icon: HomeIcon, tab: "home", path: "/" },
  { Icon: CoinIcon, tab: "cargar", path: "/cargar" },
  { Icon: TrendUpIcon, tab: "monitorear", path: "/monitorear" },
  { Icon: BookIcon, tab: "ensenar", path: "/ensenar" },
];

const tabOrder: Tab[] = ["home", "cargar", "monitorear", "ensenar"];

function getActiveTab(pathname: string): Tab {
  if (pathname.startsWith("/cargar")) return "cargar";
  if (pathname.startsWith("/monitorear")) return "monitorear";
  if (pathname.startsWith("/ensenar")) return "ensenar";
  return "home";
}

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = getActiveTab(location.pathname);
  const currentIdx = tabOrder.indexOf(activeTab);
  const prevIdx = useRef(currentIdx);

  const direction = currentIdx >= prevIdx.current ? 1 : -1;

  // Update ref in effect to avoid mutation during render
  useEffect(() => {
    prevIdx.current = currentIdx;
  });

  return (
    <div
      className="min-h-screen flex justify-center"
      style={{ backgroundColor: bg, fontFamily: "'Nunito Sans', sans-serif" }}
    >
      <div className="w-full max-w-md mx-auto pb-28">
        <div className="h-12" />

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 * direction, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 * direction, scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className={activeTab !== "home" ? "px-5" : ""}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-5 pt-2 z-50">
          <div
            className="rounded-2xl px-4 py-3 flex items-center justify-around"
            style={{ backgroundColor: bg, boxShadow: shadowOut }}
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => navigate(item.path)}
                  className="flex items-center justify-center w-12 h-12 rounded-xl transition-all"
                  style={{
                    backgroundColor: bg,
                    boxShadow: isActive ? shadowInset : "none",
                  }}
                >
                  <item.Icon
                    size={22}
                    color={isActive ? "#2563EB" : "#8a95a5"}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}