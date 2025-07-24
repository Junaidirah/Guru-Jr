"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/inputIcon";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormSchema,
} from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    setError,
  } = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordFormSchema) => {
    console.log("Reset password data submitted:", data);

    // Simulate API call
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.email === "notfound@example.com") {
            // Simulasi error dari backend
            reject({
              message: "User not found",
              errors: { email: ["Email tidak terdaftar."] },
            });
          } else {
            resolve(true);
          }
        }, 1500);
      });

      toast({
        title: "Password Reset Successful!",
        description: "Your password has been reset. You can now log in.",
        variant: "default",
      });
      reset();
    } catch (error: unknown) {
      console.error("Password reset failed:", error);
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      toast({
        title: "Password Reset Failed",
        description: errorMessage,
        variant: "destructive",
      });

      if (
        typeof error === "object" &&
        error !== null &&
        "errors" in error &&
        typeof (error as { errors: Record<string, string[]> }).errors ===
          "object"
      ) {
        const apiErrors = (error as { errors: Record<string, string[]> })
          .errors;

        for (const key in apiErrors) {
          if (key in data) {
            setError(key as keyof ForgotPasswordFormSchema, {
              type: "server",
              message: apiErrors[key][0],
            });
          } else if (key === "root") {
            setError("root.serverError", {
              type: "server",
              message: apiErrors[key][0],
            });
          }
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 font-sans bg-[#F0F8FF]">
      <div className="w-full max-w-sm mx-auto space-y-8">
        <div className="space-y-6">
          <Image
            src="/images/gurujr-blue.svg"
            alt="Jasa Raharja Logo"
            width={160}
            height={125}
            className="mx-auto"
            priority
          />
          <div className="space-y-2 text-left pt-10">
            <h1 className="text-[32px] font-extrabold text-[#000000] tracking-tighter leading-tight">
              Reset Password
            </h1>
            <p className="text-sm font-normal text-[#000000]">
              Enter your email and new password to reset.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <InputWithIcon
              id="email"
              type="email"
              placeholder="Email"
              icon="ic:outline-email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <InputWithIcon
              id="newPassword"
              type="password"
              placeholder="New Password"
              icon="mdi:password-outline"
              showPasswordToggle
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          {errors.root?.serverError && (
            <p className="text-red-500 text-sm text-center mt-1">
              {errors.root.serverError.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full h-[58px] rounded-[25px] bg-primary-button font-light text-white text-lg shadow-md hover:bg-primary-button/90"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        <div className="text-center text-sm font-normal text-black">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#000000] hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
