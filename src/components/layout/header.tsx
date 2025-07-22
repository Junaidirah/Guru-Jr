import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-8 bg-dashboardHeaderBg rounded-b-2xl -mt-4 pb-8 w-full">
      <div className="text-dashboardTextPrimary transform translate-y-4">
        <h1 className="text-2xl font-bold">Hello Cimong</h1>
        <p className="text-sm text-dashboardTextSecondary">
          Great to see you again !
        </p>
      </div>
      <Avatar className="w-14 h-14 border-2 shadow-md transform translate-y-4">
        <AvatarImage src="/images/cimong.png" alt="User Avatar" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
