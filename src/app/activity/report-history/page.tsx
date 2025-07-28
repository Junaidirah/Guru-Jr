import { TitleHeader } from "@/components/layout/title-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { ReportHistoryCard } from "@/components/activity/report-history-card";
import { getReportHistory } from "@/services/reports";
import { getServerCurrentUser } from "@/lib/auth-server-utils";
import type { ReportHistoryEntry } from "@/data/report-history";

export default async function ReportHistoryPage() {
  let reports: ReportHistoryEntry[] = [];
  let error: string | null = null;
  let userId: string | null = null;

  try {
    const currentUser = await getServerCurrentUser();
    if (currentUser) {
      userId = currentUser.id;
      reports = await getReportHistory(userId);
    } else {
      error = "Pengguna tidak terotentikasi. Silakan masuk.";
    }
  } catch (e) {
    console.error("Gagal memuat riwayat laporan:", e);
    error = "Gagal memuat riwayat laporan.";
  }

  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title="Riwayat Laporan" />
      <main className="flex-1 space-y-4 py-6 px-4">
        {error ? (
          <div className="text-red-500 text-center mt-4">{error}</div>
        ) : reports.length === 0 ? (
          <div className="text-dashboardTextSecondary text-center mt-4">
            Tidak ada laporan ditemukan.
          </div>
        ) : (
          reports.map((report) => (
            <ReportHistoryCard
              key={report.id}
              activity={report.activity || report.content}
              date={report.date}
            />
          ))
        )}
      </main>
      <BottomNavigation />
    </div>
  );
}
