import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import sessionRoutes from "./views/sessions/session-routes";
// import materialRoutes from "app/views/material-kit/MaterialRoutes";
import DokumenRoute from "./views/dokumenrs/DokumenRoute";

// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
const Dashboard = Loadable(lazy(() => import("app/views/dashboard/Dashboard")));

const routes = [
  { path: "/", element: <Navigate to="dashboard/default" /> },
  //route dashboard with auth guard
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      // ...materialRoutes,
      // dashboard route
      { path: "/dashboard/default", element: <Dashboard />, auth: authRoles.admin },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor },
      // dokumen rs route
      ...DokumenRoute
    ]
  },

  // session pages route
  ...sessionRoutes
];

export default routes;
