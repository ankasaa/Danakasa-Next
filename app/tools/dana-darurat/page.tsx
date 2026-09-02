import type { Metadata } from "next";
import DanaDaruratCalculator from "@/components/calculators/DanaDaruratCalculator";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kalkulator Dana Darurat",
  description:
    "Hitung dana darurat yang ideal berdasarkan pengeluaran bulanan dan status tanggunganmu.",
  openGraph: {
    title: "Kalkulator Dana Darurat | DanaKasa",
    description:
      "Hitung dana darurat yang ideal berdasarkan pengeluaran bulanan dan status tanggunganmu.",
    url: `${siteUrl}/tools/dana-darurat`,
  },
};

export default function DanaDaruratPage() {
  return (
    <main>
      <DanaDaruratCalculator />
    </main>
  );
}