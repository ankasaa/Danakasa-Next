import type { Metadata } from "next";
import PensiunCalculator from "@/components/calculators/PensiunCalculator";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kalkulator Pensiun",
  description:
    "Rencanakan dana pensiun kamu berdasarkan usia, pengeluaran, dan target masa depan.",
  openGraph: {
    title: "Kalkulator Pensiun | DanaKasa",
    description:
      "Rencanakan dana pensiun kamu berdasarkan usia, pengeluaran, dan target masa depan.",
    url: `${siteUrl}/tools/pensiun`,
  },
};

export default function PensiunPage() {
  return (
    <main>
      <PensiunCalculator />
    </main>
  );
}
