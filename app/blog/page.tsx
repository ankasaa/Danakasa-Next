import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog & Wawasan Finansial",
  description:
    "Temukan tips, trik, dan wawasan terbaru seputar pengelolaan keuangan, investasi, dan perencanaan masa depan.",
  openGraph: {
    title: "Blog & Wawasan Finansial | DanaKasa",
    description:
      "Temukan tips, trik, dan wawasan terbaru seputar pengelolaan keuangan, investasi, dan perencanaan masa depan.",
  },
};

export default function BlogPage() {
  return (
    <main>
      <BlogContent />
    </main>
  );
}
