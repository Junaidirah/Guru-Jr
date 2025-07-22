import { z } from "zod";

export const newReportSchema = z.object({
  date: z.string().min(1, "Tanggal tidak boleh kosong."),
  activity: z.string().min(1, "Aktivitas tidak boleh kosong."),
  location: z.string().min(1, "Lokasi tidak boleh kosong."),
  detailActivity: z.string().min(1, "Detail aktivitas tidak boleh kosong."),
  media: z
    .instanceof(File, { message: "Media harus berupa file." })
    .refine((file) => file.size > 0, "File media tidak boleh kosong.")
    .refine((file) => file.size <= 5 * 1024 * 1024, "Ukuran file maksimal 5MB.")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Hanya format JPG, PNG, atau WEBP yang diizinkan."
    )
    .optional(),
});

export type NewReportFormSchema = z.infer<typeof newReportSchema>;

export const profileFormSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong."),
  school: z.string().min(1, "Sekolah tidak boleh kosong."),
  email: z
    .string()
    .min(1, "Email tidak boleh kosong.")
    .email("Format email tidak valid."),
  password: z
    .string()
    .optional()
    .refine((val) => {
      if (val && val.length > 0) {
        return val.length >= 6;
      }
      return true;
    }, "Password minimal 6 karakter jika diisi."),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
