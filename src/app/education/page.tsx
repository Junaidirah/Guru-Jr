import { TitleHeader } from "@/components/layout/title-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { MaterialCard } from "@/components/education/material-card";
import { getEducationMaterials } from "@/services/education";

export default async function EducationPage() {
  const materials = await getEducationMaterials();

  return (
    <div className="min-h-screen bg-screenBackground flex flex-col pb-20">
      <TitleHeader title="Video Education" />
      <main className="flex-1 space-y-4 py-6 px-4">
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            title={material.title}
            description={material.description}
            thumbnailSrc={material.thumbnailSrc}
            points={material.points}
            videoId={material.videoId}
          />
        ))}
      </main>
      <BottomNavigation />
    </div>
  );
}
