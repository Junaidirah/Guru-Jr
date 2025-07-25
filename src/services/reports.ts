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

/**
 * Mengambil jumlah total laporan yang diajukan.
 * Fungsi ini akan mengambil data dari API backend.
 */
export async function getTotalReportsSubmitted(): Promise<number> {
  // Simulasi penundaan jaringan
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Saat ini mengembalikan data mock (misalnya, jumlah laporan dari data history)
  return reportHistoryData.length;

  // Contoh :
  /*
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reports/count`); // Asumsi ada endpoint ini
  if (!response.ok) {
    throw new Error('Failed to fetch total reports submitted');
  }
  const data = await response.json();
  return data.count;
  */
}
