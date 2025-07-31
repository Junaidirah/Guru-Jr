import {
  educationMaterials,
  type EducationMaterial,
} from "@/data/education-materi";

export async function getEducationMaterials(): Promise<EducationMaterial[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return educationMaterials;
}

export async function getEducationMaterialByVideoId(
  videoId: string
): Promise<EducationMaterial | null> {
  return educationMaterials.find((m) => m.videoId === videoId) || null;
}
