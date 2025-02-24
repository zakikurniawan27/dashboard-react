const navigations = [
  { label: "DASHBOARD", type: "label" },
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  { label: "PAGES", type: "label" },
  // {
  //   name: "Session/Auth",
  //   icon: "security",
  //   children: [
  //     { name: "Sign in", iconText: "SI", path: "/session/signin" },
  //     { name: "Sign up", iconText: "SU", path: "/session/signup" },
  //     { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
  //     { name: "Error", iconText: "404", path: "/session/404" }
  //   ]
  // },
  {
    name: "Pengaduan Pegawai",
    icon: "format_quote",
    path: "/session/404"
  },
  {
    name: "Input",
    icon: "menu_open",
    children: [
      { name: "Diklat", iconText: "DI", path: "/session/404" },
      { name: "Izin Praktik", iconText: "IP", path: "/session/404" },
      { name: "Riwayat Pekerjaan/Jabatan", iconText: "RPJ", path: "/session/404" },
      { name: "Tanda Jasa/Penghargaan", iconText: "TJP", path: "/session/404" },
      { name: "Pengalaman", iconText: "P", path: "/session/404" },
      { name: "Keterangan Organisasi", iconText: "KO", path: "/session/404" },
      { name: "E-Kredensial (Perawat/Bidan)", iconText: "EK", path: "/session/404" },
      {
        name: "Form Catatan Edukasi Etik Dan Disiplin Profesi (Perawat/Bidan)",
        iconText: "FCEEDP",
        path: "/session/404"
      }
    ]
  },
  {
    name: "Laporan",
    icon: "summarize",
    children: [
      { name: "Daftar Riwayat Hidup", iconText: "DRH", path: "/session/404" },
      { name: "Cuti/Ijin/Mutasi", iconText: "CIM", path: "/session/404" },
      { name: "Hasil Tes MMPI", iconText: "HTM", path: "/session/404" },
      { name: "Laporan", iconText: "L", path: "/session/404" }
    ]
  },
  {
    name: "Dokumen Rumah Sakit",
    icon: "analytics",
    children: [
      { name: "Dokumen Khusus", iconText: "DK", path: "/session/404" },
      { name: "Dokumen Umum", iconText: "DU", path: "/session/404" }
    ]
  },
  { label: "Master Data Pegawai", type: "label" },
  // {
  //   name: "Components",
  //   icon: "favorite",
  //   badge: { value: "30+", color: "secondary" },
  //   children: [
  //     { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
  //     { name: "Buttons", path: "/material/buttons", iconText: "B" },
  //     { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
  //     { name: "Dialog", path: "/material/dialog", iconText: "D" },
  //     { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
  //     { name: "Form", path: "/material/form", iconText: "F" },
  //     { name: "Icons", path: "/material/icons", iconText: "I" },
  //     { name: "Menu", path: "/material/menu", iconText: "M" },
  //     { name: "Progress", path: "/material/progress", iconText: "P" },
  //     { name: "Radio", path: "/material/radio", iconText: "R" },
  //     { name: "Switch", path: "/material/switch", iconText: "S" },
  //     { name: "Slider", path: "/material/slider", iconText: "S" },
  //     { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
  //     { name: "Table", path: "/material/table", iconText: "T" }
  //   ]
  // },
  {
    name: "Pegawai",
    icon: "badge",
    children: [
      { name: "Pegawai", path: "/session/404", iconText: "P" },
      { name: "Managemen Pengguna", path: "/session/404", iconText: "MP" },
      { name: "Ruangan/Unit", path: "/session/404", iconText: "RU" }
    ]
  },
  {
    name: "Referensi",
    icon: "settings",
    path: "/session/404"
  }
  // {
  //   name: "Documentation",
  //   icon: "launch",
  //   type: "extLink",
  //   path: "http://demos.ui-lib.com/matx-react-doc/"
  // }
];

export default navigations;
