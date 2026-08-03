import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PerencanaanAnggaranCalculator from "@/components/calculators/PerencanaanAnggaranCalculator";

export const metadata = {
  title: "Kalkulator Perencanaan Anggaran — DanaKasa",
  description:
    "Alokasikan pendapatan bulanan dengan metode 50/30/20 untuk mengelola keuangan lebih bijak.",
};

export default function PerencanaanAnggaranPage() {
  return (
    <>
      <Navbar />
      <main>
        <PerencanaanAnggaranCalculator />
      </main>
      <Footer />
    </>
  );
}