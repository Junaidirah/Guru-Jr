"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileImage } from "@/contexts/profile-image-context";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const { profileImageUrl } = useProfileImage();
  const router = useRouter();

  const handleAvatarClick = () => {
    router.push("/profile");
  };

  return (
    <div className="flex items-center justify-between px-4 pt-10 pb-2 bg-dashboardHeaderBg rounded-b-3xl w-full">
      <div className="text-dashboardTextPrimary">
        <h1 className="text-2xl font-bold">Hello Cimong</h1>
        <p className="text-sm text-dashboardTextSecondary">
          Great to see you again !
        </p>
      </div>
      <button
        onClick={handleAvatarClick}
        className="relative block cursor-pointer"
        aria-label="Go to profile page"
      >
        <Avatar className="w-14 h-14 border-2 shadow-md">
          <AvatarImage
            src={profileImageUrl || "/placeholder.svg"}
            alt="User Avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </button>
    </div>
  );
}
