"use server";

import { revalidatePath } from "next/cache";
import { newReportSchema } from "@/lib/schemas";

export async function uploadReport(prevState: any, formData: FormData) {
  const date = formData.get("date");
  const activity = formData.get("activity");
  const location = formData.get("location");
  const detailActivity = formData.get("detailActivity");
  const mediaFile = formData.get("media");

  // Validasi data menggunakan Zod schema
  const parsed = newReportSchema.safeParse({
    date,
    activity,
    location,
    detailActivity,
    media: mediaFile,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Validasi gagal. Periksa kembali input Anda.",
      errors: errors,
    };
  }

  const { data } = parsed;

  console.log(
    `Uploading file: ${data.media.name}, type: ${data.media.type}, size: ${data.media.size} bytes`
  );

  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log({
    date: data.date,
    activity: data.activity,
    location: data.location,
    detailActivity: data.detailActivity,
    mediaFileName: data.media.name,
  });

  revalidatePath("/activity/report-history");

  return { success: true, message: "Laporan berhasil dikirim! +50 poin" };
}
