import {
  educationMaterials,
  type EducationMaterial,
} from "@/data/education-materi";

export async function getEducationMaterials(): Promise<EducationMaterial[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return educationMaterials;
}
