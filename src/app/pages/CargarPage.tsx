import { useNavigate } from "react-router";
import { LoadMoneySection } from "../components/LoadMoneySection";

export function CargarPage() {
  const navigate = useNavigate();
  return <LoadMoneySection onBack={() => navigate("/")} />;
}
