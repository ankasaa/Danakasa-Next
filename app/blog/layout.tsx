import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Wawasan Finansial | DanaKasa",
  description:
    "Temukan tips, trik, dan wawasan terbaru seputar pengelolaan keuangan, investasi, dan perencanaan masa depan.",
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}