"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/inputIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    setError,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormSchema) => {
    console.log("Login data submitted:", data);

    // Simulasi API call dengan kemungkinan error
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.email === "error@example.com") {
            // Simulasi error dari backend
            reject({
              message: "Invalid credentials",
              errors: { email: ["Email atau password salah."] },
            });
          } else if (
            data.email === "user@example.com" &&
            data.password === "password123"
          ) {
            resolve(true);
          } else {
            reject({
              message: "Invalid credentials",
              errors: { root: ["Email atau password salah."] },
            });
          }
        }, 1500);
      });

      toast({
        title: "Login Successful!",
        description: "You have been successfully logged in.",
        variant: "default",
      });
      router.push("/dashboard");
      reset();
    } catch (error: unknown) {
      console.error("Login failed:", error);
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      toast({
        title: "Login Failed",
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
            setError(key as keyof LoginFormSchema, {
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
              Welcome Back
            </h1>
            <p className="text-sm font-normal text-[#000000]">
              Please Sign in to continue
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
              id="password"
              type="password"
              placeholder="Password"
              icon="mdi:password-outline"
              showPasswordToggle
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="text-sm font-normal text-right text-black pb-10">
            <Link href="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
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
            {isSubmitting ? "Logging In..." : "Log In"}
          </Button>
        </form>

        <div className="text-center text-sm font-normal text-black">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#000000] hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
