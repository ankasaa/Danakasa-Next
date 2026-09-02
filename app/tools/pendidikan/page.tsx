import type { Metadata } from "next";
import PendidikanCalculator from "@/components/calculators/PendidikanCalculator";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kalkulator Pendidikan",
  description:
    "Hitung perkiraan biaya pendidikan di masa depan dan tabungan bulanan yang perlu kamu sisihkan.",
  openGraph: {
    title: "Kalkulator Pendidikan | DanaKasa",
    description:
      "Hitung perkiraan biaya pendidikan di masa depan dan tabungan bulanan yang perlu kamu sisihkan.",
    url: `${siteUrl}/tools/pendidikan`,
  },
};

export default function PendidikanPage() {
  return (
    <main>
      <PendidikanCalculator />
    </main>
  );
}