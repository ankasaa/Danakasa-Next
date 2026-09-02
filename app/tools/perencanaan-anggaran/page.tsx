import type { Metadata } from "next";
import PerencanaanAnggaranCalculator from "@/components/calculators/PerencanaanAnggaranCalculator";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kalkulator Perencanaan Anggaran",
  description:
    "Alokasikan pendapatan bulanan dengan metode 50/30/20 untuk mengelola keuangan lebih bijak.",
  openGraph: {
    title: "Kalkulator Perencanaan Anggaran | DanaKasa",
    description:
      "Alokasikan pendapatan bulanan dengan metode 50/30/20 untuk mengelola keuangan lebih bijak.",
    url: `${siteUrl}/tools/perencanaan-anggaran`,
  },
};

export default function PerencanaanAnggaranPage() {
  return (
    <main>
      <PerencanaanAnggaranCalculator />
    </main>
  );
}