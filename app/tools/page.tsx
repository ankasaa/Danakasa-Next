import Link from "next/link";
import type { Metadata } from "next";
import {
  Calculator,
  GraduationCap,
  PiggyBank,
  TrendingUp,
  Wallet,
  Target,
  type LucideIcon,
} from "lucide-react";
import { siteUrl } from "@/lib/site";

type Tool = {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
};

const tools: Tool[] = [
  {
    title: "Kalkulator Dana Darurat",
    description: "Hitung jumlah dana darurat yang pas berdasarkan pengeluaran bulananmu.",
    href: "/tools/dana-darurat",
    Icon: PiggyBank,
  },
  {
    title: "Kalkulator Pendidikan",
    description: "Rencanakan biaya dan tabungan pendidikan untuk masa depan.",
    href: "/tools/pendidikan",
    Icon: GraduationCap,
  },
  {
    title: "Kalkulator Perencanaan Anggaran",
    description: "Susun dan kelola anggaran bulanan dengan lebih bijak.",
    href: "/tools/perencanaan-anggaran",
    Icon: Calculator,
  },
  {
    title: "Kalkulator Investasi",
    description: "Hitung perkembangan investasi dengan return, inflasi, dan durasi.",
    href: "/tools/investasi",
    Icon: TrendingUp,
  },
  {
    title: "Kalkulator Utang & Kredit",
    description: "Hitung cicilan, total bunga, dan bandingkan tenor pinjaman.",
    href: "/tools/utang-kredit",
    Icon: Wallet,
  },
  {
    title: "Kalkulator Pensiun",
    description: "Rencanakan dana pensiun berdasarkan usia dan pengeluaranmu.",
    href: "/tools/pensiun",
    Icon: Target,
  },
];

export const metadata: Metadata = {
  title: "Kalkulator Finansial",
  description:
    "Kalkulator finansial untuk dana darurat, pendidikan, investasi, utang, anggaran, dan pensiun.",
  openGraph: {
    title: "Kalkulator Finansial | DanaKasa",
    description:
      "Kalkulator finansial untuk dana darurat, pendidikan, investasi, utang, anggaran, dan pensiun.",
    url: `${siteUrl}/tools`,
  },
};

export default function ToolsIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="text-center">
        <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
          Alat Bantu Finansial
        </span>
        <h1 className="mt-4 text-3xl font-bold text-ink dark:text-neutral-50 md:text-5xl">
          Kalkulator Finansial
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-500 dark:text-neutral-400">
          Pilih kalkulator yang sesuai kebutuhanmu untuk mulai merencanakan
          keuangan yang lebih sehat.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-neutral-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-neutral-900 dark:ring-neutral-800"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-900/20 dark:text-brand-400">
              <tool.Icon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-ink dark:text-neutral-50">
              {tool.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {tool.description}
            </p>
            <span className="mt-5 inline-block text-sm font-medium text-brand-500 dark:text-brand-400">
              Coba Kalkulator →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
