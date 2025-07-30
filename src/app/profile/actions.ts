"use server";

import { apiClient } from "@/lib/api";
import { cookies } from "next/headers";

export async function logout() {
  console.log("Pengguna keluar...");

  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value || null;

    if (!authToken) {
      return { success: false, message: "Tidak ada sesi aktif untuk keluar." };
    }

    await apiClient("/user/logout", { method: "POST", token: authToken });

    console.log("Logout backend berhasil.");
    return { success: true, message: "Logout berhasil." };
  } catch (error) {
    console.error("Logout gagal:", error);

    return { success: false, message: "Terjadi kesalahan selama logout." };
  }
}
