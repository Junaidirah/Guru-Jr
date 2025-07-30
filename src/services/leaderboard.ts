import {
  leaderboardData,
  type LeaderboardEntry,
} from "@/data/leaderboard-data";
import { apiClient } from "@/lib/api";

export async function getLeaderboardData(): Promise<LeaderboardEntry[]> {
  try {
    const response = await apiClient<LeaderboardEntry[]>("/user/leaderboard");
    return response;
  } catch (error) {
    console.error("Gagal mengambil data leaderboard:", error);

    return leaderboardData;
  }
}
