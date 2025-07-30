"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const { user } = useAuth();
  const router = useRouter();

  const handleAvatarClick = () => {
    router.push("/profile");
  };

  return (
    <div className="flex items-center justify-between px-4 pt-5 pb-2 bg-dashboardHeaderBg rounded-b-3xl w-full">
      <div className="text-dashboardTextPrimary">
        <h1 className="text-2xl font-bold">Hello {user?.name || "Guest"}</h1>
        <p className="text-sm text-dashboardTextSecondary">
          Great to see you again !
        </p>
      </div>
      <button
        onClick={handleAvatarClick}
        className="relative block cursor-pointer"
        aria-label="Pergi ke halaman profil"
      >
        <Avatar className="w-14 h-14 border-2 shadow-md">
          <AvatarImage
            src={user?.image || "/placeholder.svg"}
            alt="Avatar Pengguna"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </button>
    </div>
  );
}
