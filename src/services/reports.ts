import {
  reportHistoryData,
  type ReportHistoryEntry,
} from "@/data/report-history";
import { apiClient } from "@/lib/api";

export async function getReportHistory(
  userId: string
): Promise<ReportHistoryEntry[]> {
  try {
    const reports = await apiClient<ReportHistoryEntry[]>(
      `/report?userId=${userId}`
    );

    return reports.map((report) => ({
      ...report,
      date: new Date(report.createdAt).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    }));
  } catch (error) {
    console.error("Gagal mengambil riwayat laporan:", error);

    return reportHistoryData.map((report) => ({
      ...report,
      date: new Date(report.createdAt).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    }));
  }
}

export async function getTotalReportsSubmitted(
  userId: string
): Promise<number> {
  try {
    const reports = await apiClient<ReportHistoryEntry[]>(
      `/report?userId=${userId}`
    );
    return reports.length;
  } catch (error) {
    console.error("Failed to fetch total submitted reports:", error);

    return reportHistoryData.length;
  }
}
