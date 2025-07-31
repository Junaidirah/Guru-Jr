import { TitleHeader } from "@/components/layout/title-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { getEducationMaterialByVideoId } from "@/services/education";
import { VideoPlayerClient } from "@/components/education/video-player";

interface VideoPageProps {
  params: Promise<{
    videoId: string;
  }>;
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { videoId } = await params;

  const material = await getEducationMaterialByVideoId(videoId);

  if (!material) {
    return (
      <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
        <TitleHeader title="Video Not Found" />
        <main className="flex-1 py-6 px-4 flex flex-col items-center justify-center text-dashboardTextPrimary">
          <p className="text-lg font-semibold">Video tidak ditemukan.</p>
          <p className="text-sm text-dashboardTextSecondary mt-2">
            Materi edukasi untuk video ID ini tidak tersedia.
          </p>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title={material.title} />
      <main className="flex-1 py-6 px-4 flex flex-col items-center justify-center">
        <VideoPlayerClient
          videoId={material.videoId}
          points={material.points}
        />

        <p className="mt-4 text-dashboardTextPrimary text-center">
          Menonton video ini akan memberikan Anda +{material.points} poin!
        </p>
      </main>
      <BottomNavigation />
    </div>
  );
}
