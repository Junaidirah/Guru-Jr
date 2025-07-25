import {
  educationMaterials,
  type EducationMaterial,
} from "@/data/education-materi";

/**
 * Mengambil daftar materi edukasi.
 * fungsi ini akan mengambil data dari API backend.
 */
export async function getEducationMaterials(): Promise<EducationMaterial[]> {
  // Simulasi penundaan jaringan
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Saat ini mengembalikan data mock
  return educationMaterials;

  // Contoh :
  /*
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/education-materials`);
  if (!response.ok) {
    throw new Error('Failed to fetch education materials');
  }
  const data = await response.json();
  return data;
  */
}
