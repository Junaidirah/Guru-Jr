import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import type { ReactElement } from "react";

interface ActivityCardProps {
  icon: string | ReactElement;
  title: string;
  href: string;
}

export function ActivityCard({ icon, title, href }: ActivityCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-6 bg-dashboardHeaderBg rounded-3xl p-6 shadow-card mx-4",
        "hover:bg-dashboardHeaderBg/80 transition-colors duration-200"
      )}
    >
      {typeof icon === "string" ? (
        <Icon icon={icon} className="w-20 h-20 text-dashboardIconBlue" />
      ) : (
        icon
      )}
      <span className="text-lg font-semibold text-dashboardTextPrimary">
        {title}
      </span>
    </Link>
  );
}
