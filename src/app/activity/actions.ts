"use server";

import { revalidatePath } from "next/cache";
import { newReportSchema } from "@/lib/schemas";

export interface UploadReportState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function uploadReport(
  prevState: UploadReportState | null,
  formData: FormData
): Promise<UploadReportState> {
  const date = formData.get("date");
  const activity = formData.get("activity");
  const location = formData.get("location");
  const detailActivity = formData.get("detailActivity");
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
    date,
    activity,
    location,
    detailActivity,
    media: mediaFile,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    console.error("Validation failed on server:", parsed.error);
    return {
      success: false,
      message: "Validasi gagal. Periksa kembali input Anda.",
      errors: errors,
    };
  }

  const { data } = parsed;

  if (data.media) {
    console.log(
      `Uploading file: ${data.media.name}, type: ${data.media.type}, size: ${data.media.size} bytes`
    );
  } else {
    console.log("No media file uploaded.");
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log({
    date: data.date,
    activity: data.activity,
    location: data.location,
    detailActivity: data.detailActivity,
    mediaFileName: data.media ? data.media.name : "No file",
  });

  revalidatePath("/activity/report-history");

  return { success: true, message: "Laporan berhasil dikirim! +50 poin" };
}
