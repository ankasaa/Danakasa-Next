import PerencanaanAnggaranCalculator from "@/components/calculators/PerencanaanAnggaranCalculator";

export const metadata = {
  title: "Kalkulator Perencanaan Anggaran — DanaKasa",
  description:
    "Alokasikan pendapatan bulanan dengan metode 50/30/20 untuk mengelola keuangan lebih bijak.",
};

export default function PerencanaanAnggaranPage() {
  return (
    <main>
      <PerencanaanAnggaranCalculator />
    </main>
  );
}