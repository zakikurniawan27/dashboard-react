import Loadable from "app/components/Loadable";
import { lazy } from "react";

const DokumenKhusus = Loadable(lazy(() => import("./dokumenkhusus/DokumenKhusus")));
const DokumenUmum = Loadable(lazy(() => import("./dokumenumum/DokumenUmum")));

const DokumenRoute = [
  { path: "/dokumen-khusus", element: <DokumenKhusus /> },
  { path: "/dokumen-umum", element: <DokumenUmum /> }
];

export default DokumenRoute;
