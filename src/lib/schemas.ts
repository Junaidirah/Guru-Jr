import { z } from "zod";

export const newReportSchema = z.object({
  date: z.string().min(1, "Tanggal tidak boleh kosong."),
  activity: z.string().min(1, "Aktivitas tidak boleh kosong."),
  location: z.string().min(1, "Lokasi tidak boleh kosong."),
  detailActivity: z.string().min(1, "Detail aktivitas tidak boleh kosong."),
  media: z
    .any()
    .transform((val) => (val instanceof File && val.size > 0 ? val : undefined))
    .refine(
      (file) =>
        file === undefined ||
        ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Hanya format JPG, PNG, atau WEBP yang diizinkan."
    )
    .refine(
      (file) => file === undefined || file.size <= 5 * 1024 * 1024,
      "Ukuran file maksimal 5MB."
    )
    .optional(),
});

export type NewReportFormSchema = z.infer<typeof newReportSchema>;

export const profileFormSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter."),
  school: z.string().min(2, "Sekolah minimal 2 karakter."),
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

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email tidak boleh kosong.")
    .email("Format email tidak valid."),
  newPassword: z.string().min(6, "Password baru minimal 6 karakter."),
});

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>;

export const signupFormSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter."),
  school: z.string().min(2, "Nama sekolah minimal 2 karakter."),
  email: z
    .string()
    .email("Format email tidak valid.")
    .min(1, "Email tidak boleh kosong."),
  password: z.string().min(6, "Password minimal 6 karakter."),
});

export type SignupFormSchema = z.infer<typeof signupFormSchema>;

export const loginFormSchema = z.object({
  email: z
    .string()
    .email("Format email tidak valid.")
    .min(1, "Email tidak boleh kosong."),
  password: z.string().min(6, "Password minimal 6 karakter."),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
