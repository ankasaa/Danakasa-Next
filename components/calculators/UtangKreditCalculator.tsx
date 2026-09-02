"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Calculator,
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
import PrintLayout from "@/components/calculators/PrintLayout";

const MAX_CURRENCY = 99_999_999_999;
const MAX_BUNGA = 100;
const MAX_TENOR = 360;

type FormState = {
  pinjaman: string;
  bunga: string;
  tenor: string;
};

const defaultForm: FormState = {
  pinjaman: "",
  bunga: "",
  tenor: "",
};

const exampleForm: FormState = {
  pinjaman: "100000000",
  bunga: "8",
  tenor: "24",
};

type FieldConfig = {
  key: keyof FormState;
  id: string;
  label: string;
  Icon: LucideIcon;
  type: "currency" | "number";
  placeholder?: string;
  hint?: string;
  max?: number;
};

const fields: FieldConfig[] = [
  {
    key: "pinjaman",
    id: "utang-pinjaman",
    label: "Total Utang / Pinjaman (Rp)",
    Icon: Target,
    type: "currency",
    placeholder: "contoh: 100.000.000",
  },
  {
    key: "bunga",
    id: "utang-bunga",
    label: "Suku Bunga (%/tahun)",
    Icon: TrendingUp,
    type: "number",
    placeholder: "contoh: 8",
    hint: "Suku bunga efektif per tahun.",
    max: MAX_BUNGA,
  },
  {
    key: "tenor",
    id: "utang-tenor",
    label: "Tenor (bulan)",
    Icon: Calculator,
    type: "number",
    placeholder: "contoh: 24",
    hint: "Jangka waktu pinjaman dalam bulan.",
    max: MAX_TENOR,
  },
];

type ResultData = {
  cicilanPerBulan: number;
  totalPembayaran: number;
  totalBunga: number;
  effectiveRate: number;
  pinjaman: number;
  bunga: number;
  tenor: number;
};

const inputClasses =
  "w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-ink transition placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const primaryButtonClasses =
  "flex-1 rounded-2xl bg-brand-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-700 hover:shadow-brand-500/40 active:scale-[0.98]";
const secondaryButtonClasses =
  "flex items-center justify-center gap-2 rounded-2xl bg-brand-50 px-6 py-3.5 text-base font-semibold text-brand-700 transition-all hover:bg-brand-100 active:scale-[0.98] dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/30";
const smallResetButtonClasses =
  "inline-flex items-center gap-1.5 rounded-lg bg-transparent px-3 py-1.5 text-xs font-semibold text-neutral-500 ring-1 ring-neutral-200 transition-colors duration-300 hover:bg-neutral-50 active:scale-[0.98] dark:text-neutral-400 dark:ring-neutral-800 dark:hover:bg-neutral-800";

function UtangPrintLayout({ result }: { result: ResultData }) {
  const recommendation =
    result.effectiveRate > 0.5
      ? `Total bunga efektif sebesar ${(result.effectiveRate * 100).toFixed(1)}% dari pokok pinjaman tergolong tinggi. Pertimbangkan untuk mencari alternatif pembiayaan dengan suku bunga lebih rendah atau memperpanjang tenor guna mengurangi beban cicilan bulanan.`
      : `Total bunga efektif sebesar ${(result.effectiveRate * 100).toFixed(1)}% dari pokok pinjaman tergolong terjangkau. Pastikan cicilan bulanan sebesar ${formatIDR(result.cicilanPerBulan)} sesuai dengan kemampuan keuangan Anda.`;

  return (
    <PrintLayout
      id="utang-print-layout"
      title="Laporan Kalkulator Utang & Kredit"
    >
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-bold border-b pb-1">Data Input</h2>
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium w-1/2">Total Pinjaman</td>
              <td className="py-2">{formatIDR(result.pinjaman)}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Suku Bunga</td>
              <td className="py-2">{result.bunga}%/tahun</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Tenor</td>
              <td className="py-2">{result.tenor} bulan</td>
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
              <td className="py-2 font-medium w-1/2">Cicilan per Bulan</td>
              <td className="py-2 font-bold">
                {formatIDR(result.cicilanPerBulan)}
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Total Pembayaran</td>
              <td className="py-2">{formatIDR(result.totalPembayaran)}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Total Bunga</td>
              <td className="py-2">{formatIDR(result.totalBunga)}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Effective Rate</td>
              <td className="py-2 font-bold">
                {(result.effectiveRate * 100).toFixed(1)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-lg font-bold border-b pb-1">Rekomendasi</h2>
        <p className="leading-relaxed">{recommendation}</p>
      </div>
    </PrintLayout>
  );
}

export default function UtangKreditCalculator() {
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

    const pinjaman = toNumber(form.pinjaman, MAX_CURRENCY);
    const bungaTahunan = toNumber(form.bunga, MAX_BUNGA);
    const tenor = Math.floor(toNumber(form.tenor, MAX_TENOR));

    if (pinjaman <= 0 || bungaTahunan <= 0 || tenor <= 0) return;

    const r = bungaTahunan / 100 / 12;
    const n = tenor;

    let cicilanPerBulan: number;
    if (r === 0) {
      cicilanPerBulan = pinjaman / n;
    } else {
      const factor = Math.pow(1 + r, n);
      cicilanPerBulan = (pinjaman * r * factor) / (factor - 1);
    }

    const totalPembayaran = cicilanPerBulan * n;
    const totalBunga = totalPembayaran - pinjaman;
    const effectiveRate = totalBunga / pinjaman;

    setResult({
      cicilanPerBulan,
      totalPembayaran,
      totalBunga,
      effectiveRate,
      pinjaman,
      bunga: bungaTahunan,
      tenor,
    });
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
            <Calculator className="h-4 w-4" />
            Kalkulator Utang & Kredit
          </span>
          <h1 className="mt-4 text-3xl font-bold text-ink dark:text-neutral-50 md:text-5xl">
            Pahami Beban Cicilanmu dengan Jelas
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
            Hitung cicilan bulanan, total bunga, dan total pembayaran pinjamanmu
            sebelum mengambil keputusan.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 dark:bg-neutral-900 dark:ring-neutral-800 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-ink dark:text-neutral-50">Data Pinjaman</h2>
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
                    <label htmlFor={field.id} className="text-sm font-medium text-ink dark:text-neutral-50">
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
                      <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">{field.hint}</p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button type="submit" className={primaryButtonClasses}>
                  Hitung Cicilan
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
            id="utang-result"
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
                  <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                    <Calculator className="h-4 w-4" />
                    Ringkasan Pinjaman
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-white/60">
                    <Target className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Cicilan per Bulan
                    </span>
                  </div>
                  <div className="mt-2 text-3xl font-bold">
                    <AnimatedValue value={result.cicilanPerBulan} />
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">
                    Tenor {result.tenor} bulan dengan bunga {result.bunga}%/tahun.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/60">Total Pembayaran</p>
                      <strong className="mt-1 block min-w-0 text-base font-bold break-all">
                        <AnimatedValue value={result.totalPembayaran} />
                      </strong>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/60">Total Bunga</p>
                      <strong className="mt-1 block min-w-0 text-base font-bold break-all">
                        <AnimatedValue value={result.totalBunga} />
                      </strong>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl bg-white p-5 text-ink dark:bg-neutral-950 dark:text-neutral-50">
                    <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Total Bunga Efektif
                      </span>
                    </div>
                    <div className="mt-2 text-4xl font-bold text-brand-700 dark:text-brand-400 sm:text-5xl">
                      {(result.effectiveRate * 100).toFixed(1)}%
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-neutral-400 dark:text-neutral-500">
                      Dari pokok pinjaman {formatIDR(result.pinjaman)} selama{" "}
                      <strong className="font-semibold text-neutral-600 dark:text-neutral-300">
                        {result.tenor} bulan
                      </strong>.
                    </p>
                  </div>

                  <div className="mt-6">
                    {result.effectiveRate > 0.5 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-start gap-3 rounded-2xl bg-rose-500/15 p-4 ring-1 ring-rose-400/30"
                      >
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                        <div>
                          <p className="font-semibold text-rose-300">
                            Peringatan: Bunga relatif tinggi
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-white/70">
                            Total bunga efektif melebihi 50% dari pokok pinjaman.
                            Pertimbangkan alternatif pembiayaan lain.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-start gap-3 rounded-2xl bg-emerald-500/15 p-4 ring-1 ring-emerald-400/30"
                      >
                        <PiggyBank className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                        <div>
                          <p className="font-semibold text-emerald-300">
                            Bunga terjangkau
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-white/70">
                            Total bunga efektif di bawah 50% dari pokok pinjaman.
                            Pastikan cicilan bulanan sesuai kemampuanmu.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <PrintButton
                      elementId="utang-print-layout"
                      filename="laporan-utang-kredit"
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
                    Isi data pinjaman di sebelah kiri, lalu tekan{" "}
                    <strong className="font-medium text-white/70">
                      Hitung Cicilan
                    </strong>{" "}
                    untuk melihat rincian cicilanmu.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {result && <UtangPrintLayout result={result} />}
    </>
  );
}
