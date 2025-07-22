import { cn } from "@/lib/utils";

interface ReportHistoryCardProps {
  activity: string;
  date: string;
}

export function ReportHistoryCard({ activity, date }: ReportHistoryCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between bg-dashboardHeaderBg rounded-3xl p-6 shadow-card mx-4",
        "text-dashboardTextPrimary",
        "transition-all duration-200 ease-in-out",
        "hover:bg-dashboardHeaderBg/80 hover:shadow-around"
      )}
    >
      <span className="text-lg font-semibold">{activity}</span>
      <span className="text-sm text-dashboardTextSecondary">{date}</span>
    </div>
  );
}
