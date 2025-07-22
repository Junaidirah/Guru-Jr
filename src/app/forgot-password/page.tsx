"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/inputIcon";

export default function ForgotPasswordPage() {
  const handleResetPassword = () => {
    console.log("Reset password request submitted.");
    // Implementasi pengiriman email reset password ke backend
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 font-sans bg-[#F0F8FF]">
      <div className="w-full max-w-sm mx-auto space-y-8 text-center">
        <div className="space-y-6">
          <Image
            src="/images/gurujr-blue.png"
            alt="Jasa Raharja Logo"
            width={160}
            height={125}
            className="mx-auto"
          />
          <div className="space-y-2 text-left pt-10">
            <h1 className="text-[32px] font-extrabold text-[#000000] tracking-tighter leading-tight">
              Lupa Password?
            </h1>
            <p className="text-sm font-normal text-[#000000]">
              Masukkan email Anda untuk menerima link reset password.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <InputWithIcon
            id="email"
            type="email"
            placeholder="Email"
            icon="ic:outline-email"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full h-[58px] rounded-[25px] bg-primary-button font-light text-white text-lg shadow-md hover:bg-primary-button/90"
          onClick={handleResetPassword}
        >
          Kirim Link Reset
        </Button>

        <div className="text-center text-sm font-normal text-black">
          Ingat password Anda?{" "}
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
