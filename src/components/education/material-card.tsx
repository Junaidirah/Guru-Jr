import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MaterialCardProps {
  title: string;
  description: string;
  thumbnailSrc: string;
  points: number;
  videoId: string;
}

export function MaterialCard({
  title,
  description,
  thumbnailSrc,
  points,
  videoId,
}: MaterialCardProps) {
  return (
    <div
      className={cn(
        "flex bg-dashboardHeaderBg rounded-3xl p-4 shadow-card mx-4",
        "text-dashboardTextPrimary",
        "flex-col sm:flex-row gap-4"
      )}
    >
      <div className="relative w-full h-40 sm:w-40 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200">
        <Image
          src={thumbnailSrc || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm text-dashboardTextSecondary line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex justify-end mt-4 sm:mt-0">
          <Link href={`/education/${videoId}`}>
            {" "}
            <Button className="bg-dashboardBlue text-[#FCD53F] rounded-full px-4 py-2 text-sm font-light shadow-md hover:bg-dashboardBlue/90">
              Play +{points}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
