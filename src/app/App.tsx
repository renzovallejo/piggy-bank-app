import { RouterProvider } from "react-router";
import { router } from "./routes";
import { MissionProvider } from "./components/MissionContext";

export default function App() {
  return (
    <MissionProvider>
      <RouterProvider router={router} />
    </MissionProvider>
  );
}