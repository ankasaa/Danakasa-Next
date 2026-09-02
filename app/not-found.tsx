import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  description: "Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
        Error 404
      </span>
      <h1 className="mt-4 text-4xl font-bold text-ink dark:text-neutral-50 md:text-6xl">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-neutral-500 dark:text-neutral-400">
        Sepertinya halaman yang kamu cari sudah tidak ada atau alamatnya salah.
        Yuk kembali beranda untuk melanjutkan perjalanan finansialmu.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-2xl bg-brand-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5 hover:bg-brand-700 active:scale-[0.98]"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}