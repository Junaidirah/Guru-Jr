"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface NavItemProps {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
}

function NavItem({ icon, label, href, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-colors flex-1",
        isActive
          ? "text-dashboardIconBlue"
          : "text-bottomNavIconDefault hover:text-dashboardBlue"
      )}
    >
      <Icon
        icon={icon}
        className={cn("w-10 h-10", isActive && "text-dashboardIconBlue")}
      />
      <span
        className={cn(
          "text-xs whitespace-nowrap text-center",
          isActive ? "font-semibold" : "font-medium"
        )}
      >
        {label}
      </span>
    </Link>
  );
}

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bottomNavBg border-t border-gray-200 shadow-lg px-2 py-2 flex justify-around items-center z-50">
      <NavItem
        icon="material-symbols:home-rounded"
        label="Dashboard"
        href="/dashboard"
        isActive={pathname === "/dashboard"}
      />
      <NavItem
        icon="solar:document-bold"
        label="Activity Report"
        href="/activity"
        isActive={pathname === "/activity"}
      />
      <NavItem
        icon="solar:book-bold"
        label="Video Education"
        href="/education"
        isActive={pathname === "/education"}
      />
      <NavItem
        icon="material-symbols:person-rounded"
        label="Profile"
        href="/profile"
        isActive={pathname === "/profile"}
      />
    </nav>
  );
}
