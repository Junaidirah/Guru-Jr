import { TitleHeader } from "@/components/layout/title-header";
import { ActivityCard } from "@/components/activity/activity-card";
import { BottomNavigation } from "@/components/layout/bottom-navigation";

export default function ActivityReportPage() {
  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title="Activity Report" />
      <main className="flex-1 space-y-6 py-6 px-4">
        <ActivityCard
          icon="basil:document-solid"
          title="New Report Form"
          href="/activity/new-report"
        />
        <ActivityCard
          icon="icon-park-outline:history-query"
          title="Report History"
          href="/activity/report-history"
        />
      </main>
      <BottomNavigation />
    </div>
  );
}
