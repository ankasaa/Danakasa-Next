import type { Metadata } from "next";
import UtangKreditCalculator from "@/components/calculators/UtangKreditCalculator";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kalkulator Utang & Kredit",
  description:
    "Hitung cicilan, total bunga, dan bandingkan tenor pinjaman kamu.",
  openGraph: {
    title: "Kalkulator Utang & Kredit | DanaKasa",
    description:
      "Hitung cicilan, total bunga, dan bandingkan tenor pinjaman kamu.",
    url: `${siteUrl}/tools/utang-kredit`,
  },
};

export default function UtangKreditPage() {
  return (
    <main>
      <UtangKreditCalculator />
    </main>
  );
}
