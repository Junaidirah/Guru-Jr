"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getLeaderboardData } from "@/services/leaderboard";
import type { LeaderboardEntry } from "@/data/leaderboard-data";

export function LeaderboardCard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const data = await getLeaderboardData();
        setLeaderboardData(data);
      } catch (err) {
        setError("Failed to load leaderboard data.");
        console.error("Gagal mengambil data leaderboard:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (isLoading) {
    return (
      <div className="relative bg-dashboardBlue rounded-3xl text-dashboardTextPrimary shadow-card overflow-hidden mx-4 p-6 text-center">
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative bg-dashboardBlue rounded-3xl text-red-500 shadow-card overflow-hidden mx-4 p-6 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="relative bg-dashboardBlue rounded-3xl text-dashboardTextPrimary shadow-card overflow-hidden mx-4">
      <div className="absolute top-12 left-0 w-full h-full bg-dashboardHeaderBg rounded-t-3xl z-0"></div>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-3">
        <Icon icon="fluent-emoji-flat:sports-medal" width={100} height={100} />
      </div>

      <div className="relative z-10 space-y-2 px-6 pb-6 pt-20">
        {leaderboardData.map((item) => (
          <div
            key={item.rank}
            className="flex items-center justify-between rounded-lg py-3 px-4 bg-white/10"
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-xl font-bold ${
                  item.rank === 1
                    ? "text-leaderboardGold"
                    : item.rank === 2
                    ? "text-leaderboardSilver"
                    : item.rank === 3
                    ? "text-leaderboardBronze"
                    : "text-gray-700"
                }`}
              >
                {item.rank}
              </span>

              <Image
                src={item.avatar || "/placeholder.svg"}
                alt={item.name}
                width={45}
                height={45}
                className="rounded-full"
              />

              <span
                className={`text-xl font-semibold ${
                  item.rank === 1
                    ? "text-leaderboardGold"
                    : item.rank === 2
                    ? "text-leaderboardSilver"
                    : item.rank === 3
                    ? "text-leaderboardBronze"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </span>
            </div>

            <span
              className={`text-xl font-bold ${
                item.rank === 1
                  ? "text-leaderboardGold"
                  : item.rank === 2
                  ? "text-leaderboardSilver"
                  : item.rank === 3
                  ? "text-leaderboardBronze"
                  : "text-white"
              }`}
            >
              {item.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
