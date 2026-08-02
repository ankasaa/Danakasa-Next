import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Kalkulator Perencanaan Anggaran — DanaKasa",
};

export default function PerencanaanAnggaranPage() {
  return (
    <>
      <Navbar />
      <main>
        <ComingSoon
          title="Kalkulator Perencanaan Anggaran"
          description="Susun dan kelola anggaran bulanan dengan lebih bijak."
        />
      </main>
      <Footer />
    </>
  );
}