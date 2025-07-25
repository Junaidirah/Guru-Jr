import { currentUserData } from "@/data/current-user";

/**
 * Mengambil data pengguna saat ini.
 * fungsi ini akan mengambil data dari API backend (misalnya, endpoint /me).
 */
export async function getCurrentUser(): Promise<typeof currentUserData> {
  // Simulasi penundaan jaringan
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Saat ini mengembalikan data mock
  return currentUserData;

  // Contoh :
  /*
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${yourAuthToken}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch current user data');
  }
  const data = await response.json();
  return data;
  */
}
