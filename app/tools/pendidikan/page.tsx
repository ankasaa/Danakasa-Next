import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PendidikanCalculator from "@/components/calculators/PendidikanCalculator";

export const metadata = {
  title: "Kalkulator Pendidikan — DanaKasa",
  description:
    "Hitung perkiraan biaya pendidikan di masa depan dan tabungan bulanan yang perlu kamu sisihkan.",
};

export default function PendidikanPage() {
  return (
    <>
      <Navbar />
      <main>
        <PendidikanCalculator />
      </main>
      <Footer />
    </>
  );
}