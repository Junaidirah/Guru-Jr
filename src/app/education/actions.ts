"use server";

import { revalidatePath } from "next/cache";
import { apiClient } from "@/lib/api";
import { cookies } from "next/headers";
import { getServerCurrentUser } from "@/lib/auth-server-utils";

export interface AddPointsState {
  success: boolean;
  message: string;
}

export async function addPoints(
  videoId: string,
  points: number
): Promise<AddPointsState> {
  console.log(
    `Server Action: addPoints called for videoId: ${videoId}, points: ${points}`
  );

  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value || null;

  if (!authToken) {
    return {
      success: false,
      message: "Pengguna tidak terotentikasi. Silakan masuk kembali.",
    };
  }

  const currentUser = await getServerCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      message: "Gagal mendapatkan data pengguna. Silakan masuk kembali.",
    };
  }

  try {
    // TODO: perlu mengimplementasikan endpoint ini di backend.
    // Endpoint ini harus menerima userId, videoId, dan points,
    // lalu memperbarui poin pengguna di database.
    // Backend juga harus memastikan bahwa poin hanya ditambahkan sekali per video per pengguna.
    await apiClient("/user/add-points", {
      method: "POST",
      body: { userId: currentUser.id, videoId, points },
      token: authToken,
    });

    revalidatePath("/dashboard");
    revalidatePath("/education");
    return { success: true, message: `Anda mendapatkan ${points} poin!` };
  } catch (error: unknown) {
    console.error("Gagal menambah poin:", error);
    let errorMessage = "Gagal menambah poin. Silakan coba lagi.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
