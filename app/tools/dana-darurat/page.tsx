import DanaDaruratCalculator from "@/components/calculators/DanaDaruratCalculator";

export const metadata = {
  title: "Kalkulator Dana Darurat — DanaKasa",
  description:
    "Hitung dana darurat yang ideal berdasarkan pengeluaran bulanan dan status tanggunganmu.",
};

export default function DanaDaruratPage() {
  return (
    <main>
      <DanaDaruratCalculator />
    </main>
  );
}