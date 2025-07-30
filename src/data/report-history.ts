export interface ReportHistoryEntry {
  id: string; // ID laporan
  userId: string; // ID pengguna
  content: string; // Detail aktivitas dari backend
  location?: string; // Lokasi
  activity?: string; // Aktivitas
  media?: string; // URL media
  date: string; // Tanggal laporan (string yang diformat untuk tampilan, berasal dari createdAt)
  createdAt: string; // Timestamp pembuatan
  updatedAt: string; // Timestamp pembaruan
}

export const reportHistoryData: ReportHistoryEntry[] = [
  {
    id: "report1",
    userId: "cmdgpwmw70002h0gpi96h9pwg",
    content: "Sosialisasi pentingnya keselamatan berkendara di sekolah dasar.",
    location: "SD Sarijadi Selatan",
    activity: "Sosialisasi",
    media: "/placeholder.svg",
    date: "2025-07-20T10:00:00Z",
    createdAt: "2025-07-20T10:00:00Z",
    updatedAt: "2025-07-20T10:00:00Z",
  },
  {
    id: "report2",
    userId: "cmdgpwmw70002h0gpi96h9pwg",
    content: "Penyuluhan bahaya narkoba di lingkungan masyarakat.",
    location: "Balai Warga RW 05",
    activity: "Penyuluhan",
    media: "/placeholder.svg",
    date: "2025-07-18T14:30:00Z",
    createdAt: "2025-07-18T14:30:00Z",
    updatedAt: "2025-07-18T14:30:00Z",
  },
  {
    id: "report3",
    userId: "cmdgpwmw70002h0gpi96h9pwg",
    content: "Kegiatan bersih-bersih lingkungan bersama warga.",
    location: "Taman Kota",
    activity: "Kerja Bakti",
    media: "/placeholder.svg",
    date: "2025-07-15T08:00:00Z",
    createdAt: "2025-07-15T08:00:00Z",
    updatedAt: "2025-07-15T08:00:00Z",
  },
];
