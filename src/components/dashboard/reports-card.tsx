import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export function ReportsCard() {
  return (
    <div className="bg-dashboardHeaderBg rounded-3xl p-6 flex items-center justify-between shadow-card mx-4">
      <div className="flex flex-col">
        <span className="text-sm text-dashboardTextSecondary">
          Reports Submitted
        </span>
        <span className="text-4xl font-bold text-dashboardTextPrimary">15</span>

        <Link href="/activity/new-report">
          <Button
            variant="outline"
            className="mt-4 rounded-full px-4 py-2 text-dashboardTextPrimary border-gray-200 hover:bg-gray-100 bg-[#fff]"
          >
            <Icon icon="tabler:plus" className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </Link>
      </div>

      <Icon
        icon="basil:document-solid"
        className="w-24 h-24 text-dashboardIconBlue"
      />
    </div>
  );
}
