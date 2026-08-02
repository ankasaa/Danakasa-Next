import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DanaDaruratCalculator from "@/components/calculators/DanaDaruratCalculator";

export const metadata = {
  title: "Kalkulator Dana Darurat — DanaKasa",
  description:
    "Hitung dana darurat yang ideal berdasarkan pengeluaran bulanan dan status tanggunganmu.",
};

export default function DanaDaruratPage() {
  return (
    <>
      <Navbar />
      <main>
        <DanaDaruratCalculator />
      </main>
      <Footer />
    </>
  );
}