import { z } from "zod";

export const newReportSchema = z.object({
  content: z.string().min(1, "Detail aktivitas tidak boleh kosong."),

  activity: z.string().min(1, "Aktivitas tidak boleh kosong."),
  location: z.string().min(1, "Lokasi tidak boleh kosong."),
  media: z
    .any()
    .transform((val) => (val instanceof File && val.size > 0 ? val : undefined))
    .refine((file) => file !== undefined, "Media tidak boleh kosong.")
    .refine(
      (file) =>
        file === undefined ||
        [
          "image/jpeg",
          "image/png",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Hanya format JPG, PNG, PDF, DOC, atau DOCX yang diizinkan."
    )
    .refine(
      (file) => file === undefined || file.size <= 10 * 1024 * 1024,
      "Ukuran file maksimal 10MB."
    ),
});

export type NewReportFormSchema = z.infer<typeof newReportSchema>;

export const profileFormSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter."),
  schools: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
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
  schools: z.string().min(2, "Nama sekolah minimal 2 karakter."),
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
