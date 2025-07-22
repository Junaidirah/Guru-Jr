"use server";

import { redirect } from "next/navigation";

export async function logout() {
  console.log("User logged out (simulated).");

  await new Promise((resolve) => setTimeout(resolve, 500));

  // Redirect ke halaman login setelah logout
  redirect("/login");
}
