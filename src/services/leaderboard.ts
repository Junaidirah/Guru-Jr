import {
  leaderboardData,
  type LeaderboardEntry,
} from "@/data/leaderboard-data";

/**
 * Mengambil data leaderboard.
 * fungsi ini akan mengambil data dari API backend.
 */
export async function getLeaderboardData(): Promise<LeaderboardEntry[]> {
  // Simulasi penundaan jaringan
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Saat ini mengembalikan data mock
  return leaderboardData;

  // Contoh bagaimana ini akan berubah untuk integrasi backend:
  /*
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/leaderboard`);
  if (!response.ok) {
    throw new Error('Failed to fetch leaderboard data');
  }
  const data = await response.json();
  return data;
  */
}
