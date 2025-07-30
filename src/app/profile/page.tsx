"use client";
import { useEffect } from "react";
import { TitleHeader } from "@/components/layout/title-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { InputWithIcon } from "@/components/ui/inputIcon";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema, type ProfileFormSchema } from "@/lib/schemas";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";

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
  const { toast } = useToast();
  const { user, isLoading, error, setUser, logout } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors, isValid, isSubmitting },
    reset,
    setError,
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: user
      ? {
          name: user.name,
          schools: user.schools,
          email: user.email,
          password: "",
        }
      : undefined,
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        schools: user.schools,
        email: user.email,
        password: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormSchema) => {
    console.log("Pembaruan profil dikirim:", data);
    try {
      const updatePayload: { name?: string } = {};
      if (user && data.name !== user.name) {
        updatePayload.name = data.name;
      }

      if (Object.keys(updatePayload).length > 0) {
        const updatedUser = await apiClient<typeof user>("/user/update", {
          method: "PATCH",
          body: updatePayload,
        });
        setUser(updatedUser);
      }

      toast({
        title: "Profile Updated!",
        description: "Your profile information has been saved.",
        variant: "default",
      });
    } catch (error: unknown) {
      console.error("Profile update failed:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during the profile update.";
      toast({
        title: "Update Failed",
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
            setError(key as keyof ProfileFormSchema, {
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

  const handleLogoutConfirm = async () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have successfully logged out.",
      variant: "default",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-screenBackground flex flex-col items-center justify-center">
        <p className="text-dashboardTextPrimary">Loading profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-screenBackground flex flex-col items-center justify-center">
        <p className="text-red-500">
          Kesalahan: {error || "Data pengguna tidak tersedia."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title="Profil" />
      <main className="flex-1 space-y-6 py-6 px-4 flex flex-col items-center">
        <div className="relative mb-8 mt-4">
          <Avatar className="w-32 h-32 border-4 border-white shadow-md">
            <AvatarImage
              src={user.image || "/placeholder.svg"}
              alt="Avatar Pengguna"
            />{" "}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
              id="schools"
              type="text"
              placeholder="Masukkan Sekolah"
              icon="teenyicons:school-outline"
              {...register("schools")}
              disabled
            />
            {errors.schools && (
              <p className="text-red-500 text-sm mt-1">
                {errors.schools.message}
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
              disabled
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full max-w-sm mt-8">
          {errors.root?.serverError && (
            <p className="text-red-500 text-sm text-center mb-2">
              {errors.root.serverError.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full h-[58px] rounded-[25px] bg-dashboardBlue text-white text-lg font-light shadow-md hover:bg-dashboardBlue/90"
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty || !isValid || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
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
