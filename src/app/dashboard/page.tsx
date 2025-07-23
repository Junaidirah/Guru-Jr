import { DashboardHeader } from "@/components/layout/header";
import { TotalPointCard } from "@/components/dashboard/total-point-card";
import { ReportsCard } from "@/components/dashboard/reports-card";
import { LeaderboardCard } from "@/components/dashboard/leaderboard-card";
import { BottomNavigation } from "@/components/layout/bottom-navigation";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <DashboardHeader />
      <main className="flex-1 space-y-6 py-6 px-4">
        <TotalPointCard />
        <ReportsCard />
        <LeaderboardCard />
      </main>
      <BottomNavigation />
    </div>
  );
}
