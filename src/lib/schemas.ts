import { z } from "zod";

export const newReportSchema = z.object({
  date: z.string().min(1, "Tanggal tidak boleh kosong."),
  activity: z.string().min(1, "Aktivitas tidak boleh kosong."),
  location: z.string().min(1, "Lokasi tidak boleh kosong."),
  detailActivity: z.string().min(1, "Detail aktivitas tidak boleh kosong."),
  media: z
    .any()
    .refine((file) => file instanceof File, "Media harus berupa file.")
    .refine((file) => file.size > 0, "File media tidak boleh kosong.")
    .refine((file) => file.size <= 5 * 1024 * 1024, "Ukuran file maksimal 5MB.")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Hanya format JPG, PNG, atau WEBP yang diizinkan."
    ),
});

export type NewReportFormSchema = z.infer<typeof newReportSchema>;
