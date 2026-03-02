import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./pages/HomePage";
import { CargarPage } from "./pages/CargarPage";
import { MonitorearPage } from "./pages/MonitorearPage";
import { EnsenarPage } from "./pages/EnsenarPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NotificationsPage } from "./pages/NotificationsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "cargar", Component: CargarPage },
      { path: "monitorear", Component: MonitorearPage },
      { path: "ensenar", Component: EnsenarPage },
      { path: "configuracion", Component: SettingsPage },
      { path: "avisos", Component: NotificationsPage },
      { path: "*", Component: HomePage },
    ],
  },
]);