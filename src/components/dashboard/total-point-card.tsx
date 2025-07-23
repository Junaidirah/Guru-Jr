"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { getTotalPoints } from "@/services/total-points";

export function TotalPointCard() {
  const [totalPoints, setTotalPoints] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalPoints = async () => {
      try {
        setIsLoading(true);
        const points = await getTotalPoints();
        setTotalPoints(points);
      } catch (err) {
        setError("Failed to load total points.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTotalPoints();
  }, []);

  if (isLoading) {
    return (
      <div className="relative bg-dashboardTotalPointsBg text-white rounded-[10px] h-[80px] mx-4 flex flex-col items-center justify-center shadow-card">
        <span className="text-xl font-bold">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative bg-red-500 text-white rounded-[10px] h-[80px] mx-4 flex flex-col items-center justify-center shadow-card">
        <span className="text-xl font-bold">Error!</span>
        <span className="text-xs font-light">{error}</span>
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
      <span className="text-4xl font-bold">{totalPoints}</span>
      <span className="text-xs font-light">Total Point</span>
    </div>
  );
}
