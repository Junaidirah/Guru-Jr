import {
  reportHistoryData,
  type ReportHistoryEntry,
} from "@/data/report-history";

/**
 * Mengambil riwayat laporan aktivitas.
 * fungsi ini akan mengambil data dari API backend.
 */
export async function getReportHistory(): Promise<ReportHistoryEntry[]> {
  // Simulasi penundaan jaringan
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Saat ini mengembalikan data mock
  return reportHistoryData;

  // Contoh :
  /*
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/report-history`);
  if (!response.ok) {
    throw new Error('Failed to fetch report history');
  }
  const data = await response.json();
  return data;
  */
}
