import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode, ComponentType } from "react";
import type { IconProps } from "./Icons";

export interface ActiveMission {
  id: number;
  title: string;
  methodologyTag: string;
  color: string;
  Icon: ComponentType<IconProps>;
  time: string;
  xp: number;
  startedAt: string;
}

export interface CompletedMission {
  id: number;
  title: string;
  color: string;
  Icon: ComponentType<IconProps>;
  xp: number;
  completedAt: string;
  feedback: string[];
  note?: string;
}

interface MissionContextType {
  activeMission: ActiveMission | null;
  completedMissions: CompletedMission[];
  startMission: (mission: Omit<ActiveMission, "startedAt">) => void;
  completeMission: (feedback: string[], note?: string) => void;
  dismissMission: () => void;
}

const MissionContext = createContext<MissionContextType | null>(null);

export function MissionProvider({ children }: { children: ReactNode }) {
  const [activeMission, setActiveMission] = useState<ActiveMission | null>(null);
  const [completedMissions, setCompletedMissions] = useState<CompletedMission[]>([
    // Pre-seed with one completed for demo
  ]);

  const startMission = useCallback((mission: Omit<ActiveMission, "startedAt">) => {
    setActiveMission({
      ...mission,
      startedAt: new Date().toLocaleDateString("es-PE", { day: "numeric", month: "short" }),
    });
  }, []);

  const completeMission = useCallback((feedback: string[], note?: string) => {
    if (!activeMission) return;
    setCompletedMissions((prev) => [
      {
        id: activeMission.id,
        title: activeMission.title,
        color: activeMission.color,
        Icon: activeMission.Icon,
        xp: activeMission.xp,
        completedAt: new Date().toLocaleDateString("es-PE", { day: "numeric", month: "short" }),
        feedback,
        note,
      },
      ...prev,
    ]);
    setActiveMission(null);
  }, [activeMission]);

  const dismissMission = useCallback(() => {
    setActiveMission(null);
  }, []);

  return (
    <MissionContext.Provider
      value={{ activeMission, completedMissions, startMission, completeMission, dismissMission }}
    >
      {children}
    </MissionContext.Provider>
  );
}

export function useMissions() {
  const ctx = useContext(MissionContext);
  if (!ctx) throw new Error("useMissions must be used within MissionProvider");
  return ctx;
}