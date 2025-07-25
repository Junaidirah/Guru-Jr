"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ProfileImageProvider } from "@/contexts/profile-image-context";
import type { ThemeProviderProps } from "next-themes";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ProfileImageProvider>{children}</ProfileImageProvider>
    </NextThemesProvider>
  );
}
