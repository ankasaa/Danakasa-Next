import Link from "next/link";
import {
  CheckCircle2,
  PieChart,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";

const valueProps = [
  "Keuangan teratur",
  "Investasi bertumbuh",
  "Tujuan keuangan tercapai",
];

const chartBars = [32, 48, 40, 64, 52, 76, 68, 88];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-brand-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-500/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-24 h-96 w-96 rounded-full bg-purple-500/20 blur-[100px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-20 lg:py-24">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-600/10 px-4 py-1.5 text-sm font-semibold text-brand-700 dark:bg-brand-400/10 dark:text-brand-300">
              <Sparkles className="h-4 w-4" />
              Kelola keuangan pribadi jadi mudah
            </span>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-ink md:text-6xl dark:text-white">
              Kendalikan Keuanganmu.{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                Wujudkan Masa Depan Cerah.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 md:text-xl dark:text-neutral-300">
              Pelajari cara cerdas mengatur anggaran, menyiapkan dana darurat,
              dan merencanakan investasi secara praktis bersama DanaKasa.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-brand-500/40 sm:w-auto"
              >
                Jelajahi Kalkulator
              </Link>
              <Link
                href="/blog"
                className="inline-flex w-full items-center justify-center rounded-2xl border-2 border-brand-200 bg-transparent px-8 py-3.5 font-semibold text-brand-700 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 sm:w-auto dark:border-brand-800 dark:text-brand-300 dark:hover:bg-brand-900/30"
              >
                Baca Blog
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-center justify-center py-14 sm:max-w-lg lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-brand-400 to-purple-400 opacity-30 blur-3xl"
            />

            <div className="relative z-10 w-full rounded-3xl bg-white/40 p-6 shadow-2xl shadow-brand-900/10 ring-1 ring-white/50 backdrop-blur-md dark:bg-white/10 dark:ring-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
                    Total Tabungan
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-ink dark:text-white">
                    Rp 12.500.000
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/30">
                  <Wallet className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 flex h-32 items-end gap-2 sm:gap-2.5">
                {chartBars.map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-t-lg ${
                      i === chartBars.length - 1
                        ? "bg-gradient-to-t from-brand-600 to-brand-400"
                        : "bg-brand-200/80 dark:bg-brand-700/50"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/40 pt-4 dark:border-white/10">
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Dana Darurat
                  </p>
                  <p className="text-sm font-semibold text-ink dark:text-white">
                    Rp 20.000.000
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="absolute -top-2 right-0 z-20 flex items-center gap-3 rounded-2xl bg-white/60 p-4 shadow-2xl ring-1 ring-white/50 backdrop-blur-md sm:-right-6 dark:bg-white/10 dark:ring-white/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
                  Portofolio
                </p>
                <p className="text-base font-bold text-ink dark:text-white">
                  +12,4%
                </p>
              </div>
            </div>

            <div className="absolute bottom-4 -left-2 z-20 rounded-2xl bg-white/60 p-4 shadow-2xl ring-1 ring-white/50 backdrop-blur-md sm:-left-8 dark:bg-white/10 dark:ring-white/10">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
                Alokasi Aset
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/15 text-brand-700 dark:text-brand-300">
                  <PieChart className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    <span className="text-xs font-semibold text-ink dark:text-white">
                      Saat ini 45%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-400" />
                    <span className="text-xs font-semibold text-ink dark:text-white">
                      Target 65%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-6 -left-3 z-20 hidden rounded-2xl bg-white/60 p-3.5 shadow-2xl ring-1 ring-white/50 backdrop-blur-md sm:flex sm:-left-10 dark:bg-white/10 dark:ring-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-600 dark:text-amber-400">
                <Target className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full bg-ink py-5 text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 px-6 md:flex-row md:gap-12">
          {valueProps.map((item) => (
            <div
              key={item}
              className="flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-300" />
              <span className="text-sm font-medium md:text-base">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}