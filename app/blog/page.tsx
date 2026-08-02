import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Blog — DanaKasa",
  description: "Artikel edukasi finansial dari DanaKasa.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <ComingSoon
          title="Blog DanaKasa"
          description="Kumpulan artikel edukasi finansial — segera hadir."
        />
      </main>
      <Footer />
    </>
  );
}