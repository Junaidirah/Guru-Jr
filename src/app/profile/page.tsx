"use client";
import { useState, useEffect, useRef } from "react";
import type React from "react";
import { useRouter } from "next/navigation";

import { TitleHeader } from "@/components/layout/title-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { InputWithIcon } from "@/components/ui/inputIcon";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema, type ProfileFormSchema } from "@/lib/schemas";

import { useProfileImage } from "@/contexts/profile-image-context";
import { logout } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { currentUserData } from "@/data/current-user";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProfilePage() {
  const { profileImageUrl, setProfileImageUrl } = useProfileImage();
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors, isValid },
    reset,
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: currentUserData,
    mode: "onChange",
  });

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState<string | null>(
    profileImageUrl
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profileImageFile) {
      const url = URL.createObjectURL(profileImageFile);
      setCurrentPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setCurrentPreviewUrl(profileImageUrl);
    }
  }, [profileImageFile, profileImageUrl]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImageFile(event.target.files[0]);
    } else {
      setProfileImageFile(null);
    }
  };

  const handleAddButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: ProfileFormSchema) => {
    console.log("Profile updated:", data);
    if (profileImageFile) {
      console.log("New profile image:", profileImageFile.name);
      console.log(
        "Untuk persistensi, gambar ini perlu diunggah ke backend dan URL permanennya disimpan."
      );
    }
    reset(data);
    setProfileImageUrl(currentPreviewUrl || "/placeholder.svg");
    toast({
      title: "Profile Updated!",
      description: "Your profile information has been saved.",
      variant: "default",
    });
  };

  const handleLogoutConfirm = async () => {
    const result = await logout();

    if (result.success) {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        variant: "default",
      });
      setTimeout(() => {
        router.push("/login");
      }, 300);
    } else {
      toast({
        title: "Logout Failed",
        description: result.message || "An error occurred during logout.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title="Profile" />
      <main className="flex-1 space-y-6 py-6 px-4 flex flex-col items-center">
        <div className="relative mb-8 mt-4">
          <Avatar className="w-32 h-32 border-4 border-white shadow-md">
            <AvatarImage
              src={currentPreviewUrl || "/placeholder.svg"}
              alt="User Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={handleAddButtonClick}
            className="absolute bottom-0 right-0 bg-dashboardBlue text-white rounded-full p-2 shadow-md"
            aria-label="Change profile picture"
          >
            <Icon icon="material-symbols:add-rounded" className="w-6 h-6" />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
          />
        </div>

        <div className="w-full max-w-sm space-y-4">
          <div>
            <InputWithIcon
              id="name"
              type="text"
              placeholder="Masukkan Nama"
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
              placeholder="Masukkan Sekolah"
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
              placeholder="Masukkan Email"
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
              placeholder="*****"
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
        </div>

        <div className="w-full max-w-sm mt-8">
          <Button
            type="submit"
            className="w-full h-[58px] rounded-[25px] bg-dashboardBlue text-white text-lg font-light shadow-md hover:bg-dashboardBlue/90"
            onClick={handleSubmit(onSubmit)}
            disabled={(!isDirty && !profileImageFile) || !isValid}
          >
            Save
          </Button>
        </div>

        <div className="w-full max-w-sm mt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                className="w-full h-[58px] rounded-[25px] bg-red-500 text-white text-lg font-light shadow-md hover:bg-red-600"
              >
                Log Out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="text-dashboardTextPrimary">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will be logged out of your account. You can log back in at
                  any time.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogoutConfirm}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
