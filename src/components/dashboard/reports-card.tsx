"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { getTotalReportsSubmitted } from "@/services/reports";
import { useAuth } from "@/contexts/auth-context";

export function ReportsCard() {
  const [reportsCount, setReportsCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading: isLoadingAuth } = useAuth();

  useEffect(() => {
    const fetchReportsCount = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const count = await getTotalReportsSubmitted(user.id);
        setReportsCount(count);
      } catch (err) {
        setError("Failed to load report count.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoadingAuth && user?.id) {
      fetchReportsCount();
    }
  }, [user?.id, isLoadingAuth]);

  if (isLoading || isLoadingAuth) {
    return (
      <div className="bg-dashboardHeaderBg rounded-3xl p-6 flex items-center justify-between shadow-card mx-4 text-center">
        <div className="flex flex-col items-center">
          <span className="text-sm text-dashboardTextSecondary">
            Reports Submitted
          </span>
          <span className="text-4xl font-bold text-dashboardTextPrimary">
            Loading...
          </span>
        </div>
        <Icon
          icon="basil:document-solid"
          className="w-24 h-24 text-dashboardIconBlue"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500 text-white rounded-3xl p-6 flex items-center justify-between shadow-card mx-4 text-center">
        <div className="flex flex-col items-center">
          <span className="text-sm">Reports Submitted</span>
          <span className="text-xl font-bold">Error!</span>
          <span className="text-xs font-light">{error}</span>
        </div>
        <Icon icon="basil:document-solid" className="w-24 h-24 text-white" />
      </div>
    );
  }

  return (
    <div className="bg-dashboardHeaderBg rounded-3xl p-6 flex items-center justify-between shadow-card mx-4">
      <div className="flex flex-col items-center">
        <span className="text-sm text-dashboardTextSecondary">
          Reports Submitted
        </span>
        <span className="text-4xl font-bold text-dashboardTextPrimary">
          {reportsCount}
        </span>
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
