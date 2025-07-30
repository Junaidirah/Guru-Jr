"use client";

import { Icon } from "@iconify/react";
import { useAuth } from "@/contexts/auth-context";

export function TotalPointCard() {
  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <div className="relative bg-dashboardTotalPointsBg text-white rounded-[10px] h-[80px] mx-4 flex flex-col items-center justify-center shadow-card">
        <span className="text-xl font-bold">Loading...</span>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="relative bg-red-500 text-white rounded-[10px] h-[80px] mx-4 flex flex-col items-center justify-center shadow-card">
        <span className="text-xl font-bold">Error!</span>
        <span className="text-xs font-light">
          {error || "Data pengguna tidak tersedia."}
        </span>
      </div>
    );
  }

  return (
    <div className="relative bg-dashboardTotalPointsBg text-white rounded-[10px] h-[80px] mx-4 flex flex-col items-center justify-center shadow-card">
      <Icon
        icon="solar:star-bold"
        className="absolute w-8 h-8 text-dashboardStarYellow top-[-10px] left-[35px] rotate-[-17.23deg]"
        color="#FCD53F"
      />
      <Icon
        icon="solar:star-bold"
        className="absolute w-8 h-8 text-dashboardStarYellow top-[60px] right-[40px] rotate-[18.19deg]"
        color="#FCD53F"
      />
      <span className="text-4xl font-bold">{user.points}</span>{" "}
      <span className="text-xs font-light">Total Point</span>
    </div>
  );
}
