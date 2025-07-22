"use client";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export function TitleHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center px-4 py-8 bg-dashboardHeaderBg rounded-b-3xl -mt-4 pb-12 w-full">
      <button
        onClick={() => router.back()}
        className="text-dashboardTextPrimary bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm transform translate-y-4"
      >
        <Icon icon="weui:back-filled" className="w-6 h-6" />
      </button>

      <div className="flex-1 text-center text-dashboardTextPrimary transform translate-y-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <div className="w-8 h-8"></div>
    </div>
  );
}
