import { useNavigate } from "react-router";
import { MonitorSection } from "../components/MonitorSection";

export function MonitorearPage() {
  const navigate = useNavigate();
  return <MonitorSection onBack={() => navigate("/")} />;
}
