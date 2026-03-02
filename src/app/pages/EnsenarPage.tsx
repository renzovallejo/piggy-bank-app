import { useNavigate } from "react-router";
import { TeachSection } from "../components/TeachSection";

export function EnsenarPage() {
  const navigate = useNavigate();
  return <TeachSection onBack={() => navigate("/")} />;
}
