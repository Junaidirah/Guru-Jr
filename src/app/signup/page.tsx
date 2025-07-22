import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/inputIcon";

export default function SignUpPage() {
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
        <div className="space-y-6 pb-10">
          <InputWithIcon
            id="name"
            type="text"
            placeholder="Name"
            icon="material-symbols:person-rounded"
            required
          />
          <InputWithIcon
            id="school"
            type="text"
            placeholder="School"
            icon="teenyicons:school-outline"
            required
          />
          <InputWithIcon
            id="email"
            type="email"
            placeholder="Email"
            icon="ic:outline-email"
            required
          />
          <InputWithIcon
            id="password"
            type="password"
            placeholder="Password"
            icon="mdi:password-outline"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full h-[58px] rounded-[25px] bg-primary-button text-white text-lg font-light  shadow-md hover:bg-primary-button/90"
        >
          Sign Up
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
