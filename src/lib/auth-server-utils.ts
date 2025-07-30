import { cookies } from "next/headers";
import { apiClient } from "./api";

interface UserData {
  id: string;
  email: string;
  name: string;
  schools: string;
  points: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getServerCurrentUser(): Promise<UserData | null> {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value || null;

    if (!authToken) {
      return null;
    }

    const user = await apiClient<UserData>("/user/me", { token: authToken });
    return user;
  } catch (error) {
    console.error("Failed to fetch current user data on the server:", error);
    return null;
  }
}
