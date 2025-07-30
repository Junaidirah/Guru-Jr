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
      error = "User not authenticated. Please log in.";
    }
  } catch (e) {
    console.error("Failed to load report history:", e);
    error = "Failed to load report history.";
  }

  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title="History Report" />
      <main className="flex-1 space-y-4 py-6 px-4">
        {error ? (
          <div className="text-red-500 text-center mt-4">{error}</div>
        ) : reports.length === 0 ? (
          <div className="text-dashboardTextSecondary text-center mt-4">
            No reports found.
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
