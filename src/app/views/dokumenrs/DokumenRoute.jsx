import Loadable from "app/components/Loadable";
import { lazy } from "react";

const DokumenKhusus = Loadable(lazy(() => import("./dokumenkhusus/DokumenKhusus")));
const DokumenUmum = Loadable(lazy(() => import("./dokumenumum/DokumenUmum")));

//get token from local storage
const token = localStorage.getItem("accessToken");

const DokumenRoute = [
  { path: "/dokumen-khusus", element: <DokumenKhusus token={token} /> },
  { path: "/dokumen-umum", element: <DokumenUmum token={token} /> }
];

export default DokumenRoute;
