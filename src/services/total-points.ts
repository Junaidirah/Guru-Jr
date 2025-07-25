/**
 * Mengambil total poin pengguna.
 * fungsi ini akan mengambil data dari API backend.
 */
export async function getTotalPoints(): Promise<number> {
  // Simulasi penundaan jaringan
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Saat ini mengembalikan data mock
  return 400; // Contoh total poin

  // Contoh :
  /*
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/points`); // Asumsi ada endpoint ini
  if (!response.ok) {
    throw new Error('Failed to fetch total points');
  }
  const data = await response.json();
  return data.points;
  */
}
