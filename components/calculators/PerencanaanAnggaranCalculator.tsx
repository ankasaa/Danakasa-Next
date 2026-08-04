"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  Heart,
  PiggyBank,
  RotateCcw,
  ShoppingCart,
  Sparkles,
  Target,
  Wallet,
  type LucideIcon,
} from "lucide-react";

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const MAX_CURRENCY = 99_999_999_999;

function toNumber(value: string, max = Number.POSITIVE_INFINITY): number {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return Math.min(parsed, max);
}

function maskRupiah(digits: string): string {
  const cleaned = digits.replace(/\D/g, "").slice(0, 11);
  if (!cleaned) return "";
  return "Rp " + Number.parseInt(cleaned, 10).toLocaleString("id-ID");
}

function AnimatedValue({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="inline-block max-w-full tabular-nums break-all"
    >
      {formatIDR(value)}
    </motion.span>
  );
}

type FormState = {
  penghasilan: string;
  kebutuhan: string;
  keinginan: string;
  tabungan: string;
  lainnya: string;
};

const defaultForm: FormState = {
  penghasilan: "",
  kebutuhan: "",
  keinginan: "",
  tabungan: "",
  lainnya: "",
};

const exampleForm: FormState = {
  penghasilan: "10000000",
  kebutuhan: "5000000",
  keinginan: "3000000",
  tabungan: "2000000",
  lainnya: "500000",
};

type FieldConfig = {
  key: keyof FormState;
  id: string;
  label: string;
  placeholder: string;
  Icon: LucideIcon;
  hint?: string;
  fullWidth?: boolean;
};

const fields: FieldConfig[] = [
  {
    key: "penghasilan",
    id: "anggaran-penghasilan",
    label: "Penghasilan Bulanan",
    placeholder: "contoh: 10.000.000",
    Icon: Wallet,
    fullWidth: true,
  },
  {
    key: "kebutuhan",
    id: "anggaran-kebutuhan",
    label: "Kebutuhan Dasar",
    placeholder: "contoh: 5.000.000",
    Icon: ShoppingCart,
    hint: "Makan, transportasi, sewa, tagihan, dan kebutuhan pokok lainnya.",
  },
  {
    key: "keinginan",
    id: "anggaran-keinginan",
    label: "Keinginan",
    placeholder: "contoh: 3.000.000",
    Icon: Heart,
    hint: "Hiburan, belanja, dan gaya hidup.",
  },
  {
    key: "tabungan",
    id: "anggaran-tabungan",
    label: "Tabungan & Investasi",
    placeholder: "contoh: 2.000.000",
    Icon: PiggyBank,
  },
  {
    key: "lainnya",
    id: "anggaran-lainnya",
    label: "Pengeluaran Lainnya",
    placeholder: "contoh: 500.000",
    Icon: Calculator,
    fullWidth: true,
  },
];

type ResultData = {
  penghasilan: number;
  kebutuhan: number;
  keinginan: number;
  tabungan: number;
  lainnya: number;
  totalPengeluaran: number;
  balance: number;
  pctKebutuhan: number;
  pctKeinginan: number;
  pctTabungan: number;
};

type BarData = {
  key: string;
  label: string;
  ideal: number;
  actual: number;
  Icon: LucideIcon;
  status: "good" | "warn" | "bad";
  statusLabel: string;
  gradient: string;
};

const inputClasses =
  "w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-ink transition placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const primaryButtonClasses =
  "flex-1 rounded-2xl bg-brand-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-700 hover:shadow-brand-500/40 active:scale-[0.98]";
const secondaryButtonClasses =
  "flex items-center justify-center gap-2 rounded-2xl bg-brand-50 px-6 py-3.5 text-base font-semibold text-brand-700 transition-all hover:bg-brand-100 active:scale-[0.98] dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/30";
const smallResetButtonClasses =
  "inline-flex items-center gap-1.5 rounded-lg bg-transparent px-3 py-1.5 text-xs font-semibold text-neutral-500 ring-1 ring-neutral-200 transition-colors duration-300 hover:bg-neutral-50 active:scale-[0.98] dark:text-neutral-400 dark:ring-neutral-800 dark:hover:bg-neutral-800";

function buildBar(
  key: string,
  label: string,
  ideal: number,
  actual: number,
  Icon: LucideIcon,
): BarData {
  let status: BarData["status"] = "good";
  let statusLabel = `Sesuai ideal ${ideal}%`;
  let gradient = "from-emerald-400 to-emerald-600";

  if (key === "savings") {
    if (actual >= ideal) {
      status = "good";
      statusLabel = `Di atas ideal ${ideal}%`;
    } else if (actual >= ideal * 0.5) {
      status = "warn";
      statusLabel = `Di bawah ideal ${ideal}%`;
      gradient = "from-amber-400 to-amber-500";
    } else {
      status = "bad";
      statusLabel = `Jauh di bawah ideal ${ideal}%`;
      gradient = "from-rose-400 to-rose-500";
    }
  } else if (actual > ideal * 1.3) {
    status = "bad";
    statusLabel = `Jauh melebihi ideal ${ideal}%`;
    gradient = "from-rose-400 to-rose-500";
  } else if (actual > ideal) {
    status = "warn";
    statusLabel = `Melebihi ideal ${ideal}%`;
    gradient = "from-amber-400 to-amber-500";
  }

  return { key, label, ideal, actual, Icon, status, statusLabel, gradient };
}

export default function PerencanaanAnggaranCalculator() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [result, setResult] = useState<ResultData | null>(null);

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setForm(defaultForm);
    setResult(null);
  };

  const handleExample = () => {
    setForm(exampleForm);
    setResult(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const penghasilan = toNumber(form.penghasilan, MAX_CURRENCY);
    const kebutuhan = toNumber(form.kebutuhan, MAX_CURRENCY);
    const keinginan = toNumber(form.keinginan, MAX_CURRENCY);
    const tabungan = toNumber(form.tabungan, MAX_CURRENCY);
    const lainnya = toNumber(form.lainnya, MAX_CURRENCY);

    const totalPengeluaran = kebutuhan + keinginan + tabungan + lainnya;
    const balance = penghasilan - totalPengeluaran;
    const pct = (value: number) =>
      penghasilan > 0 ? (value / penghasilan) * 100 : 0;

    setResult({
      penghasilan,
      kebutuhan,
      keinginan,
      tabungan,
      lainnya,
      totalPengeluaran,
      balance,
      pctKebutuhan: pct(kebutuhan),
      pctKeinginan: pct(keinginan),
      pctTabungan: pct(tabungan),
    });
  };

  const bars: BarData[] = result
    ? [
        buildBar("needs", "Kebutuhan Dasar", 50, result.pctKebutuhan, ShoppingCart),
        buildBar("wants", "Keinginan", 30, result.pctKeinginan, Heart),
        buildBar("savings", "Tabungan & Investasi", 20, result.pctTabungan, PiggyBank),
      ]
    : [];

  const statusColor =
    result && result.balance < 0
      ? { text: "text-rose-300", ring: "ring-rose-400/30", bg: "bg-rose-500/15" }
      : { text: "text-emerald-300", ring: "ring-emerald-400/30", bg: "bg-emerald-500/15" };

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
          <Calculator className="h-4 w-4" />
          Kalkulator Perencanaan Anggaran
        </span>
        <h1 className="mt-4 text-3xl font-bold text-ink dark:text-neutral-50 md:text-5xl">
          Evaluasi Anggaran Bulananmu
        </h1>
        <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
          Bandingkan pengeluaran aktualmu dengan metode ideal 50/30/20 dan
          lihat apakah anggaran bulananmu sehat atau sudah melampaui batas.
        </p>
      </div>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 dark:bg-neutral-900 dark:ring-neutral-800 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-ink dark:text-neutral-50">Data Anggaran Bulanan</h2>
            <button
              type="button"
              onClick={handleReset}
              className={smallResetButtonClasses}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          <form noValidate onSubmit={handleSubmit} className="mt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.key} className={field.fullWidth ? "sm:col-span-2" : ""}>
                  <label htmlFor={field.id} className="text-sm font-medium text-ink dark:text-neutral-50">
                    {field.label} (Rp)
                  </label>
                  <div className="relative mt-2">
                    <field.Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                    <input
                      id={field.id}
                      type="text"
                      inputMode="numeric"
                      placeholder={field.placeholder}
                      value={maskRupiah(form[field.key])}
                      onChange={(e) =>
                        setField(
                          field.key,
                          e.target.value.replace(/\D/g, "").slice(0, 11),
                        )
                      }
                      className={inputClasses}
                    />
                  </div>
                  {field.hint ? (
                    <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">{field.hint}</p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button type="submit" className={primaryButtonClasses}>
                Lihat Hasil
              </button>
              <button
                type="button"
                onClick={handleExample}
                className={secondaryButtonClasses}
              >
                <Sparkles className="h-4 w-4" />
                Contoh Data
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl bg-ink p-6 text-white shadow-lg dark:bg-neutral-900 sm:p-8 lg:sticky lg:top-24" aria-live="polite">
          <AnimatePresence mode="wait">
            {result ? (
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
                    Ringkasan Anggaran Bulanan
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-xs text-white/60">Total Penghasilan</p>
                    <strong className="mt-1 block min-w-0 text-lg font-bold break-all">
                      <AnimatedValue value={result.penghasilan} />
                    </strong>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-xs text-white/60">Total Pengeluaran</p>
                    <strong className="mt-1 block min-w-0 text-lg font-bold break-all">
                      <AnimatedValue value={result.totalPengeluaran} />
                    </strong>
                  </div>
                </div>

                <div
                  className={`mt-4 flex items-start gap-3 rounded-2xl p-4 ring-1 ${statusColor.bg} ${statusColor.ring}`}
                >
                  {result.balance < 0 ? (
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  )}
                  <div>
                    <p className={`font-semibold ${statusColor.text}`}>
                      {result.balance < 0 ? (
                        <>
                          Pengeluaran melebihi pendapatan!{" "}
                          <AnimatedValue value={Math.abs(result.balance)} /> di
                          atas anggaran
                        </>
                      ) : (
                        <>
                          Sisa uang bulan ini{" "}
                          {result.balance === 0 ? (
                            "Rp 0"
                          ) : (
                            <AnimatedValue value={result.balance} />
                          )}
                        </>
                      )}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">
                      {result.balance < 0
                        ? "Kurangi pengeluaran atau tambah penghasilan agar anggaran kembali seimbang."
                        : "Anggaranmu seimbang. Pertahankan kebiasaan menabung ini."}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {bars.map((bar, index) => (
                    <motion.div
                      key={bar.key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
                      className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                            <bar.Icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold">{bar.label}</p>
                            <p className="text-xs text-white/50">
                              {bar.statusLabel}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 text-sm font-bold tabular-nums ${
                            bar.status === "good"
                              ? "text-emerald-300"
                              : bar.status === "warn"
                                ? "text-amber-300"
                                : "text-rose-300"
                          }`}
                        >
                          {Math.round(bar.actual)}%
                        </span>
                      </div>
                      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/15">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${bar.gradient}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, bar.actual)}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-white/40">
                        <span>Aktual</span>
                        <span>Ideal {bar.ideal}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <p className="mt-6 text-xs leading-relaxed text-white/40">
                  Perbandingan dilakukan terhadap metode ideal 50/30/20.
                  Proyeksi ini bersifat estimasi dan dapat disesuaikan dengan
                  kondisi keuanganmu.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <Calculator className="h-12 w-12 text-white/25" />
                <p className="mt-4 font-semibold text-white/80">
                  Ringkasan Hasil
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/50">
                  Isi data anggaran bulanan Anda, lalu tekan{" "}
                  <strong className="font-medium text-white/70">
                    Lihat Ringkasan
                  </strong>{" "}
                  untuk mengevaluasi pengeluaranmu terhadap metode 50/30/20.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}