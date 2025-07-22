"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ProfileImageContextType {
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
}

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(
  undefined
);

export function ProfileImageProvider({ children }: { children: ReactNode }) {
  const [profileImageUrl, setProfileImageUrl] =
    useState<string>("/images/cimong.png");

  return (
    <ProfileImageContext.Provider
      value={{ profileImageUrl, setProfileImageUrl }}
    >
      {children}
    </ProfileImageContext.Provider>
  );
}

export function useProfileImage() {
  const context = useContext(ProfileImageContext);
  if (context === undefined) {
    throw new Error(
      "useProfileImage must be used within a ProfileImageProvider"
    );
  }
  return context;
}
