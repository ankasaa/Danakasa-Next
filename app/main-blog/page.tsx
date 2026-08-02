import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Main Blog — DanaKasa",
  description: "Konten edukasi finansial utama dari DanaKasa.",
};

export default function MainBlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <ComingSoon
          title="Main Blog"
          description="Artikel dan konten edukasi finansial utama dari DanaKasa — segera hadir."
        />
      </main>
      <Footer />
    </>
  );
}