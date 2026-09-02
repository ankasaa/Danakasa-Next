import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteUrl, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const defaultDescription =
  "Platform edukasi finansial dengan kalkulator dana darurat, perencanaan pendidikan, pengelolaan anggaran, serta artikel blog seputar keuangan.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Solusi Cerdas Finansial untuk Semua`,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  icons: {
    icon: "/logo/danakasa-icon.png?v=3",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Solusi Cerdas Finansial untuk Semua`,
    description: defaultDescription,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — Solusi Cerdas Finansial`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Solusi Cerdas Finansial untuk Semua`,
    description: defaultDescription,
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}