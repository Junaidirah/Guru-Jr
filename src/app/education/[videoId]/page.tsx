import { TitleHeader } from "@/components/layout/title-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";

interface VideoPageProps {
  params: Promise<{
    videoId: string;
  }>;
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { videoId } = await params;

  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title="Video Player" />
      <main className="flex-1 py-6 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <p className="mt-4 text-dashboardTextPrimary text-center">
          Menonton video ini akan memberikan Anda +25 poin!
        </p>
      </main>
      <BottomNavigation />
    </div>
  );
}
