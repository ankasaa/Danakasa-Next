"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Calculator,
  CheckCircle2,
  PiggyBank,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import {
  formatIDR,
  maskRupiah,
  clampDigits,
  toNumber,
  AnimatedValue,
} from "@/lib/calculator-utils";
import PrintButton from "@/components/calculators/PrintButton";

const MAX_CURRENCY = 99_999_999_999;
const MAX_PERCENT = 100;
const MAX_TAHUN = 50;

type FormState = {
  modalAwal: string;
  investasiBulanan: string;
  returnRate: string;
  inflasi: string;
  durasi: string;
};

const defaultForm: FormState = {
  modalAwal: "",
  investasiBulanan: "",
  returnRate: "",
  inflasi: "",
  durasi: "",
};

const exampleForm: FormState = {
  modalAwal: "10000000",
  investasiBulanan: "2000000",
  returnRate: "10",
  inflasi: "5",
  durasi: "10",
};

type FieldConfig = {
  key: keyof FormState;
  id: string;
  label: string;
  Icon: LucideIcon;
  type: "currency" | "percent" | "number";
  placeholder?: string;
  hint?: string;
  max?: number;
};

const fields: FieldConfig[] = [
  {
    key: "modalAwal",
    id: "investasi-modal-awal",
    label: "Modal Awal (Rp)",
    Icon: PiggyBank,
    type: "currency",
    placeholder: "contoh: 10.000.000",
    hint: "Jumlah uang yang kamu investasikan di awal.",
  },
  {
    key: "investasiBulanan",
    id: "investasi-bulanan",
    label: "Investasi Bulanan (Rp)",
    Icon: TrendingUp,
    type: "currency",
    placeholder: "contoh: 2.000.000",
    hint: "Jumlah yang kamu sisihkan untuk investasi setiap bulan.",
  },
  {
    key: "returnRate",
    id: "investasi-return",
    label: "Return Rate (%/tahun)",
    Icon: Calculator,
    type: "percent",
    placeholder: "contoh: 10",
    hint: "Rata-rata pengembalian investasi per tahun.",
    max: MAX_PERCENT,
  },
  {
    key: "inflasi",
    id: "investasi-inflasi",
    label: "Inflasi (%/tahun)",
    Icon: Target,
    type: "percent",
    placeholder: "contoh: 5",
    hint: "Tingkat inflasi rata-rata per tahun.",
    max: MAX_PERCENT,
  },
  {
    key: "durasi",
    id: "investasi-durasi",
    label: "Durasi (tahun)",
    Icon: ArrowLeft,
    type: "number",
    placeholder: "contoh: 10",
    hint: "Jangka waktu investasi dalam tahun.",
    max: MAX_TAHUN,
  },
];

type ResultData = {
  totalInvestasi: number;
  nilaiMasaDepan: number;
  nilaiRiil: number;
  keuntunganBersih: number;
  modalAwal: number;
  investasiBulanan: number;
  returnRate: number;
  inflasi: number;
  durasi: number;
};

const inputClasses =
  "w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-ink transition placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const primaryButtonClasses =
  "flex-1 rounded-2xl bg-brand-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-700 hover:shadow-brand-500/40 active:scale-[0.98]";
const secondaryButtonClasses =
  "flex items-center justify-center gap-2 rounded-2xl bg-brand-50 px-6 py-3.5 text-base font-semibold text-brand-700 transition-all hover:bg-brand-100 active:scale-[0.98] dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/30";
const smallResetButtonClasses =
  "inline-flex items-center gap-1.5 rounded-lg bg-transparent px-3 py-1.5 text-xs font-semibold text-neutral-500 ring-1 ring-neutral-200 transition-colors duration-300 hover:bg-neutral-50 active:scale-[0.98] dark:text-neutral-400 dark:ring-neutral-800 dark:hover:bg-neutral-800";

function PrintLayout({ result }: { result: ResultData }) {
  const recommendation =
    result.keuntunganBersih > 0
      ? `Investasimu tumbuh sebesar ${formatIDR(result.keuntunganBersih)} dari total modal ${formatIDR(result.totalInvestasi)}. Dengan return rate ${result.returnRate}%/tahun dan inflasi ${result.inflasi}%/tahun, investasi ini menguntungkan. Pertahankan konsistensi investasimu!`
      : `Investasimu belum menunjukkan keuntungan. Coba tingkatkan return rate atau durasi investasi untuk hasil yang lebih baik.`;

  return (
    <div id="investasi-print-layout" className="hidden print:block">
      <div className="p-8 text-sm text-neutral-900">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Laporan Kalkulator Investasi
        </h1>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold border-b pb-1">Data Input</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium w-1/2">Modal Awal</td>
                <td className="py-2">{formatIDR(result.modalAwal)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Investasi/Bulan</td>
                <td className="py-2">{formatIDR(result.investasiBulanan)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Return Rate</td>
                <td className="py-2">{result.returnRate}%/tahun</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Inflasi</td>
                <td className="py-2">{result.inflasi}%/tahun</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Durasi</td>
                <td className="py-2">{result.durasi} tahun</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold border-b pb-1">
            Hasil Perhitungan
          </h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium w-1/2">Total Investasi</td>
                <td className="py-2">{formatIDR(result.totalInvestasi)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Nilai Masa Depan</td>
                <td className="py-2 font-bold">
                  {formatIDR(result.nilaiMasaDepan)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Nilai Riil (Daya Beli)</td>
                <td className="py-2 font-bold">
                  {formatIDR(result.nilaiRiil)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Keuntungan Bersih</td>
                <td className="py-2 font-bold">
                  {formatIDR(result.keuntunganBersih)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold border-b pb-1">Rekomendasi</h2>
          <p className="leading-relaxed">{recommendation}</p>
        </div>

        <p className="mt-8 text-xs text-neutral-500 text-center">
          Laporan ini dihasilkan oleh Kalkulator Investasi
        </p>
      </div>
    </div>
  );
}

export default function InvestasiCalculator() {
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

    const modalAwal = toNumber(form.modalAwal, MAX_CURRENCY);
    const investasiBulanan = toNumber(form.investasiBulanan, MAX_CURRENCY);
    const returnRate = toNumber(form.returnRate, MAX_PERCENT);
    const inflasi = toNumber(form.inflasi, MAX_PERCENT);
    const durasi = Math.floor(toNumber(form.durasi, MAX_TAHUN));

    if (durasi <= 0) return;

    const bulanTotal = durasi * 12;
    const bulananReturn = returnRate / 100 / 12;

    let nilaiMasaDepan = modalAwal;
    for (let i = 0; i < bulanTotal; i++) {
      nilaiMasaDepan = nilaiMasaDepan * (1 + bulananReturn) + investasiBulanan;
    }

    const totalInvestasi = modalAwal + investasiBulanan * bulanTotal;
    const nilaiRiil = nilaiMasaDepan / Math.pow(1 + inflasi / 100, durasi);
    const keuntunganBersih = nilaiMasaDepan - totalInvestasi;

    setResult({
      totalInvestasi,
      nilaiMasaDepan,
      nilaiRiil,
      keuntunganBersih,
      modalAwal,
      investasiBulanan,
      returnRate,
      inflasi,
      durasi,
    });
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
            <TrendingUp className="h-4 w-4" />
            Kalkulator Investasi
          </span>
          <h1 className="mt-4 text-3xl font-bold text-ink dark:text-neutral-50 md:text-5xl">
            Wujudkan Tujuan Finansialmu dengan Investasi
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
            Hitung proyeksi nilai investasi masa depanmu dengan mempertimbangkan
            return rate dan dampak inflasi terhadap daya beli.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 dark:bg-neutral-900 dark:ring-neutral-800 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-ink dark:text-neutral-50">
                Data Investasi
              </h2>
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
                  <div key={field.key}>
                    <label
                      htmlFor={field.id}
                      className="text-sm font-medium text-ink dark:text-neutral-50"
                    >
                      {field.label}
                    </label>
                    <div className="relative mt-2">
                      <field.Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                      <input
                        id={field.id}
                        type="text"
                        inputMode="numeric"
                        placeholder={field.placeholder}
                        value={
                          field.type === "currency"
                            ? maskRupiah(form[field.key])
                            : form[field.key]
                        }
                        onChange={(e) =>
                          setField(
                            field.key,
                            field.type === "currency"
                              ? e.target.value.replace(/\D/g, "").slice(0, 11)
                              : clampDigits(
                                  e.target.value,
                                  field.max ?? Number.MAX_SAFE_INTEGER,
                                ),
                          )
                        }
                        className={inputClasses}
                      />
                    </div>
                    {field.hint ? (
                      <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                        {field.hint}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button type="submit" className={primaryButtonClasses}>
                  Hitung Investasi
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

          <div
            id="investasi-result"
            className="rounded-3xl bg-ink p-6 text-white shadow-lg dark:bg-neutral-900 sm:p-8 lg:sticky lg:top-24"
            aria-live="polite"
          >
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
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Proyeksi Investasi
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/60">Total Investasi</p>
                      <strong className="mt-1 block min-w-0 text-base font-bold break-all">
                        <AnimatedValue value={result.totalInvestasi} />
                      </strong>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/60">Keuntungan Bersih</p>
                      <strong className="mt-1 block min-w-0 text-base font-bold break-all text-emerald-400">
                        <AnimatedValue value={result.keuntunganBersih} />
                      </strong>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="rounded-3xl bg-white p-5 text-ink dark:bg-neutral-950 dark:text-neutral-50">
                      <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                        <Target className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">
                          Nilai Masa Depan
                        </span>
                      </div>
                      <div className="mt-2 w-full text-4xl font-bold text-brand-700 dark:text-brand-400 sm:text-5xl">
                        <AnimatedValue value={result.nilaiMasaDepan} />
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-neutral-400 dark:text-neutral-500">
                        Setelah {result.durasi} tahun dengan return{" "}
                        {result.returnRate}%/tahun dan inflasi{" "}
                        {result.inflasi}%/tahun.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-3xl bg-white p-5 text-ink dark:bg-neutral-950 dark:text-neutral-50">
                    <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                      <Calculator className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Nilai Riil (Daya Beli)
                      </span>
                    </div>
                    <div className="mt-2 w-full text-3xl font-bold text-brand-700 dark:text-brand-400 sm:text-4xl">
                      <AnimatedValue value={result.nilaiRiil} />
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-neutral-400 dark:text-neutral-500">
                      Nilai setelah disesuaikan dengan inflasi. Ini adalah daya
                      beli riil dari investasimu di masa depan.
                    </p>
                  </div>

                  <div className="mt-6">
                    {result.keuntunganBersih > 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-start gap-3 rounded-2xl bg-emerald-500/15 p-4 ring-1 ring-emerald-400/30"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                        <div>
                          <p className="font-semibold text-emerald-300">
                            Investasi menguntungkan!
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-white/70">
                            Investasimu tumbuh sebesar{" "}
                            {formatIDR(result.keuntunganBersih)} dari total modal{" "}
                            {formatIDR(result.totalInvestasi)}. Pertahankan
                            konsistensi investasimu!
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
                            Perlu optimasi
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-white/70">
                            Investasimu belum menunjukkan keuntungan. Coba
                            tingkatkan return rate atau durasi investasi.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <PrintButton
                      elementId="investasi-print-layout"
                      filename="laporan-kalkulator-investasi"
                      disabled={!result}
                    />
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
                    Ringkasan Hasil
                  </p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/50">
                    Isi data investasi di sebelah kiri, lalu tekan{" "}
                    <strong className="font-medium text-white/70">
                      Hitung Investasi
                    </strong>{" "}
                    untuk melihat proyeksi nilai investasi masa depanmu.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {result && <PrintLayout result={result} />}
    </>
  );
}
