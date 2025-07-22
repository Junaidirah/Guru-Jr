"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/inputIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema, type SignupFormSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SignupFormSchema) => {
    console.log("Signup data submitted:", data);

    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Sign Up Successful!",
          description: "Your account has been created. Please log in.",
          variant: "default",
        });
        reset();
        router.push("/login");
        resolve(true);
      }, 1500);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 font-sans bg-[#F0F8FF]">
      <div className="w-full max-w-sm mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-[32px] font-extrabold text-[#000000] tracking-tighter leading-tight">
            Welcome Back
          </h1>
          <p className="text-sm font-normal text-[#000000]">
            Please register for login
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-10">
          <div>
            <InputWithIcon
              id="name"
              type="text"
              placeholder="Name"
              icon="material-symbols:person-rounded"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <InputWithIcon
              id="school"
              type="text"
              placeholder="School"
              icon="teenyicons:school-outline"
              {...register("school")}
            />
            {errors.school && (
              <p className="text-red-500 text-sm mt-1">
                {errors.school.message}
              </p>
            )}
          </div>
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
        </form>
        <Button
          type="submit"
          className="w-full h-[58px] rounded-[25px] bg-primary-button text-white text-lg font-light shadow-md hover:bg-primary-button/90"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </Button>

        <div className="text-center text-sm text-black">
          Have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#000000] hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
