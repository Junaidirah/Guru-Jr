"use client";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export function TitleHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center px-4 pt-10 pb-6 bg-dashboardHeaderBg rounded-b-3xl w-full">
      <button
        onClick={() => router.back()}
        className="text-dashboardTextPrimary bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm"
      >
        <Icon icon="weui:back-filled" className="w-6 h-6" />
      </button>
      <div className="flex-1 text-center text-dashboardTextPrimary">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="w-8 h-8"></div>
    </div>
  );
}
