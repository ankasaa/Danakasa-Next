"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Baby,
  CheckCircle2,
  PiggyBank,
  Target,
  TrendingUp,
  User,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

type MaritalKey = "single" | "marriedNoKids" | "marriedWithKids";

type MaritalOption = {
  key: MaritalKey;
  label: string;
  hint: string;
  multiplier: number;
  Icon: LucideIcon;
};

const maritalOptions: MaritalOption[] = [
  { key: "single", label: "Lajang", hint: "6x pengeluaran", multiplier: 6, Icon: User },
  {
    key: "marriedNoKids",
    label: "Menikah Tanpa Anak",
    hint: "9x pengeluaran",
    multiplier: 9,
    Icon: Users,
  },
  {
    key: "marriedWithKids",
    label: "Menikah Punya Anak",
    hint: "12x pengeluaran",
    multiplier: 12,
    Icon: Baby,
  },
];

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function AnimatedValue({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="inline-block tabular-nums"
    >
      {formatIDR(value)}
    </motion.span>
  );
}

const inputClasses =
  "w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-ink transition placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

export default function DanaDaruratCalculator() {
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [status, setStatus] = useState<MaritalKey>("single");

  const monthly = toNumber(expenses);
  const currentSavings = toNumber(savings);
  const selectedOption = maritalOptions.find((o) => o.key === status)!;
  const target = monthly * selectedOption.multiplier;
  const hasResult = monthly > 0;
  const deficit = target - currentSavings;
  const isAchieved = hasResult && currentSavings >= target;
  const progress = target > 0 ? Math.min(100, (currentSavings / target) * 100) : 0;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600">
          <PiggyBank className="h-4 w-4" />
          Kalkulator Dana Darurat
        </span>
<h1 className="mt-4 text-3xl font-bold text-ink md:text-5xl">
          Siapkan Jaring Pengaman Finansialmu
        </h1>
        <p className="mt-4 leading-relaxed text-neutral-500">
          Dana darurat adalah tabungan untuk situasi tak terduga. Hitung target
          yang ideal berdasarkan pengeluaran bulanan dan status tanggunganmu.
        </p>
      </div>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
          <h2 className="text-lg font-semibold text-ink">Data Keuangan</h2>

          <div className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="monthly-expenses"
                className="text-sm font-medium text-ink"
              >
                Pengeluaran Bulanan (Rp)
              </label>
              <div className="relative mt-2">
                <Wallet className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400" />
                <input
                  id="monthly-expenses"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  placeholder="contoh: 5000000"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <p className="mt-2 text-xs text-neutral-400">
                Total pengeluaran harian dan bulanan, termasuk tagihan.
              </p>
            </div>

            <fieldset>
              <legend className="text-sm font-medium text-ink">
                Status Tanggungan
              </legend>
              <div className="mt-2 space-y-2">
                {maritalOptions.map((option) => {
                  const selected = status === option.key;
                  return (
                    <label key={option.key} className="flex cursor-pointer">
                      <input
                        type="radio"
                        name="marital-status"
                        value={option.key}
                        checked={selected}
                        onChange={() => setStatus(option.key)}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200 ${
                          selected
                            ? "border-brand-500 bg-brand-50"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                              selected
                                ? "bg-brand-500 text-white"
                                : "bg-neutral-100 text-neutral-500"
                            }`}
                          >
                            <option.Icon className="h-5 w-5" />
                          </span>
                          <span>
                            <span
                              className={`block text-sm font-semibold ${
                                selected ? "text-brand-700" : "text-ink"
                              }`}
                            >
                              {option.label}
                            </span>
                            <span className="block text-xs text-neutral-500">
                              {option.hint}
                            </span>
                          </span>
                        </span>
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            selected ? "border-brand-500" : "border-neutral-300"
                          }`}
                        >
                          {selected && (
                            <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                          )}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="current-savings"
                className="text-sm font-medium text-ink"
              >
                Tabungan Saat Ini (Rp){" "}
                <span className="font-normal text-neutral-400">
                  (opsional)
                </span>
              </label>
              <div className="relative mt-2">
                <TrendingUp className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400" />
                <input
                  id="current-savings"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  placeholder="contoh: 1500000"
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                  className={inputClasses}
                />
              </div>
<p className="mt-2 text-xs text-neutral-400">
                  Dana darurat yang sudah kamu miliki saat ini.
                </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-ink p-6 text-white shadow-lg sm:p-8 lg:sticky lg:top-24">
          <AnimatePresence mode="wait">
            {hasResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2 text-white/60">
                  <Target className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Target Dana Darurat
                  </span>
                </div>
                <div className="mt-2 text-4xl font-bold sm:text-5xl">
                  <AnimatedValue value={target} />
                </div>

                <div className="mt-6 flex items-center justify-between text-xs text-white/60">
                  <span>
                    Tabungan saat ini{" "}
                    <strong className="text-white/90">
                      {formatIDR(currentSavings)}
                    </strong>
                  </span>
                  <span>{Math.round(progress)}% tercapai</span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    className={`h-full rounded-full ${
                      isAchieved
                        ? "bg-emerald-400"
                        : "bg-gradient-to-r from-brand-400 to-brand-600"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>

                <div className="mt-6">
                  {isAchieved ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-start gap-3 rounded-2xl bg-emerald-500/15 p-4 ring-1 ring-emerald-400/30"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-emerald-300">
                          Selamat! Target tercapai 🎉
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-white/70">
                          Tabunganmu sudah melebihi target dana darurat.
                          Pertahankan kebiasaan ini dan lanjutkan ke tujuan
                          finansial lainnya.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-3 rounded-2xl bg-rose-500/15 p-4 ring-1 ring-rose-400/30"
                    >
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                      <div>
                        <p className="font-semibold text-rose-300">
                          Masih kurang {formatIDR(deficit)}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-white/70">
                          Untuk mencapai target {formatIDR(target)}. Mulai
                          sisihkan penghasilan secara rutin setiap bulan.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <PiggyBank className="h-12 w-12 text-white/25" />
                <p className="mt-4 font-semibold text-white/80">
                  Hasil Perhitungan
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/50">
                  Masukkan pengeluaran bulananmu di sebelah kiri untuk melihat
                  target dana darurat yang ideal.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}