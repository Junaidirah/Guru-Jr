"use server";

// import { redirect } from "next/navigation" // No longer redirecting directly

export async function logout() {
  console.log("User logged out (simulated).");

  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true, message: "Logout successful." };
}
