"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dashboardBlue p-4">
      <div className="flex flex-col items-center space-y-6 text-white">
        <Image
          src="/images/gurujr-white.png"
          alt="Guru-JR Logo"
          width={150}
          height={150}
          priority
        />
      </div>
    </div>
  );
}
