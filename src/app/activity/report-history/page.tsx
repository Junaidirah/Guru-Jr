import { TitleHeader } from "@/components/layout/title-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { ReportHistoryCard } from "@/components/activity/report-history-card";

export default function ReportHistoryPage() {
  const reports = [
    { id: 1, activity: "Sosialisasi", date: "20/07/2025" },
    { id: 2, activity: "Sosialisasi", date: "20/07/2025" },
    { id: 3, activity: "Sosialisasi", date: "20/07/2025" },
  ];

  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title="History Report" />
      <main className="flex-1 space-y-4 py-6 px-4">
        {reports.map((report) => (
          <ReportHistoryCard
            key={report.id}
            activity={report.activity}
            date={report.date}
          />
        ))}
      </main>
      <BottomNavigation />
    </div>
  );
}
