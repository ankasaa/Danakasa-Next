import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Kalkulator Pendidikan — DanaKasa",
};

export default function PendidikanPage() {
  return (
    <>
      <Navbar />
      <main>
        <ComingSoon
          title="Kalkulator Pendidikan"
          description="Rencanakan biaya dan tabungan pendidikan untuk masa depan."
        />
      </main>
      <Footer />
    </>
  );
}