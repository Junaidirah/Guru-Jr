import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface ActivityCardProps {
  icon: string | React.ElementType;
  title: string;
  href: string;
}

export function ActivityCard({ icon, title, href }: ActivityCardProps) {
  const IconComponent = typeof icon === "string" ? Icon : icon;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-10 bg-dashboardHeaderBg rounded-3xl p-6 shadow-card mx-4",
        "hover:bg-dashboardHeaderBg/80 transition-colors duration-200"
      )}
    >
      {typeof icon === "string" ? (
        <IconComponent
          icon={icon}
          className="w-24 h-24 text-dashboardIconBlue"
        />
      ) : (
        <IconComponent className="w-24 h-24 text-dashboardIconBlue" />
      )}
      <span className="text-lg font-semibold text-dashboardTextPrimary">
        {title}
      </span>
    </Link>
  );
}
