"use server";

import { revalidatePath } from "next/cache";
import { newReportSchema } from "@/lib/schemas";
import { apiClient } from "@/lib/api";
import { cookies } from "next/headers";
import type { ApiError } from "@/lib/api";

export interface UploadReportState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function uploadReport(
  prevState: UploadReportState | null,
  formData: FormData
): Promise<UploadReportState> {
  const activity = formData.get("activity");
  const location = formData.get("location");
  const content = formData.get("content");
  const mediaFile = formData.get("media");

  console.log("Server Action: uploadReport received formData.");
  console.log("mediaFile type:", typeof mediaFile);
  console.log("mediaFile instanceof File:", mediaFile instanceof File);
  if (mediaFile instanceof File) {
    console.log("mediaFile name:", mediaFile.name);
    console.log("mediaFile type (MIME):", mediaFile.type);
    console.log("mediaFile size:", mediaFile.size);
  } else {
    console.log("mediaFile value:", mediaFile);
  }

  const parsed = newReportSchema.safeParse({
    activity,
    location,
    content,
    media: mediaFile,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    console.error("Validation failed on server:", parsed.error);
    return {
      success: false,
      message: "Validation failed. Please check your input.",
      errors: errors,
    };
  }

  const { data } = parsed;

  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value || null;

  if (!authToken) {
    return {
      success: false,
      message: "You're not logged in. Please sign in again to continue.",
    };
  }

  try {
    await apiClient("/report", {
      method: "POST",
      body: formData,
      isFormData: true,
      token: authToken,
    });

    console.log({
      activity: data.activity,
      location: data.location,
      content: data.content,
      mediaFileName: data.media ? data.media.name : "No file",
    });

    revalidatePath("/activity/report-history");
    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Report submitted successfully! +50 points",
    };
  } catch (error: unknown) {
    console.error("Failed to upload report:", error);
    let errorMessage = "Failed to submit the report. Please try again.";
    let errors: Record<string, string[]> | undefined = undefined;

    if (error instanceof Error) {
      errorMessage = error.message;

      if (
        typeof (error as ApiError).errors === "object" &&
        (error as ApiError).errors !== null
      ) {
        errors = (error as ApiError).errors;
      }
    }

    return {
      success: false,
      message: errorMessage,
      errors: errors,
    };
  }
}
