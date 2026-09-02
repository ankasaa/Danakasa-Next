import type { Metadata } from "next";
import InvestasiCalculator from "@/components/calculators/InvestasiCalculator";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kalkulator Investasi",
  description:
    "Hitung perkembangan investasi kamu dengan asumsi return, inflasi, dan durasi tertentu.",
  openGraph: {
    title: "Kalkulator Investasi | DanaKasa",
    description:
      "Hitung perkembangan investasi kamu dengan asumsi return, inflasi, dan durasi tertentu.",
    url: `${siteUrl}/tools/investasi`,
  },
};

export default function InvestasiPage() {
  return (
    <main>
      <InvestasiCalculator />
    </main>
  );
}
