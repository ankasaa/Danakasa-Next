"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarClock,
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
  AnimatedValue,
} from "@/lib/calculator-utils";
import PrintButton from "@/components/calculators/PrintButton";

type FormState = {
  usiaSaatIni: string;
  usiaPensiun: string;
  pengeluaranBulanan: string;
  inflasi: string;
  returnInvestasi: string;
  danaSaatIni: string;
};

const defaultForm: FormState = {
  usiaSaatIni: "",
  usiaPensiun: "",
  pengeluaranBulanan: "",
  inflasi: "",
  returnInvestasi: "",
  danaSaatIni: "",
};

const exampleForm: FormState = {
  usiaSaatIni: "30",
  usiaPensiun: "55",
  pengeluaranBulanan: "10000000",
  inflasi: "5",
  returnInvestasi: "10",
  danaSaatIni: "50000000",
};

type FieldConfig = {
  key: keyof FormState;
  id: string;
  label: string;
  Icon: LucideIcon;
  type: "number" | "currency" | "percent";
  placeholder?: string;
  hint?: string;
  max?: number;
};

const fields: FieldConfig[] = [
  {
    key: "usiaSaatIni",
    id: "pensiun-usia",
    label: "Usia Saat Ini",
    Icon: Target,
    type: "number",
    placeholder: "contoh: 30",
    hint: "Usia kamu sekarang dalam tahun.",
    max: 80,
  },
  {
    key: "usiaPensiun",
    id: "pensiun-usia-pensiun",
    label: "Usia Pensiun",
    Icon: CalendarClock,
    type: "number",
    placeholder: "contoh: 55",
    hint: "Usia di mana kamu berencana pensiun.",
    max: 80,
  },
  {
    key: "pengeluaranBulanan",
    id: "pensiun-pengeluaran",
    label: "Pengeluaran Bulanan Saat Ini (Rp)",
    Icon: TrendingUp,
    type: "currency",
    placeholder: "contoh: 10.000.000",
    hint: "Rata-rata pengeluaranmu per bulan saat ini.",
  },
  {
    key: "inflasi",
    id: "pensiun-inflasi",
    label: "Inflasi (%/tahun)",
    Icon: TrendingUp,
    type: "percent",
    placeholder: "contoh: 5",
    hint: "Rata-rata inflasi tahunan yang diantisipasi.",
    max: 30,
  },
  {
    key: "returnInvestasi",
    id: "pensiun-return",
    label: "Return Investasi (%/tahun)",
    Icon: TrendingUp,
    type: "percent",
    placeholder: "contoh: 10",
    hint: "Proyeksi return tahunan dari investasi.",
    max: 50,
  },
  {
    key: "danaSaatIni",
    id: "pensiun-dana",
    label: "Dana Saat Ini (tabungan existing) (Rp)",
    Icon: PiggyBank,
    type: "currency",
    placeholder: "contoh: 50.000.000",
    hint: "Total tabungan atau investasi yang sudah dimiliki.",
  },
];

type ResultData = {
  tahunMenujuPensiun: number;
  pengeluaranPensiun: number;
  totalDanaPensiun: number;
  pertumbuhanDanaSaatIni: number;
  selisih: number;
  tabunganBulanan: boolean;
  usiaSaatIni: number;
  usiaPensiun: number;
  pengeluaranBulanan: number;
  inflasi: number;
  returnInvestasi: number;
  danaSaatIni: number;
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
  const bulananDibutuhkan =
    result.selisih > 0 && result.tahunMenujuPensiun > 0
      ? result.selisih / (result.tahunMenujuPensiun * 12)
      : 0;

  const recommendation =
    result.selisih === 0
      ? `Pertumbuhan dana kamu sudah cukup untuk memenuhi target dana pensiun ${formatIDR(result.totalDanaPensiun)}. Pertahankan kebiasaan menabung dan investasi ini untuk tujuan finansial lainnya.`
      : `Untuk mencapai target dana pensiun sebesar ${formatIDR(result.totalDanaPensiun)}, Anda perlu menyisihkan sebesar ${formatIDR(bulananDibutuhkan)} per bulan selama ${result.tahunMenujuPensiun} tahun. Pertimbangkan untuk meningkatkan return investasi atau mengurangi pengeluaran agar target tercapai lebih cepat.`;

  return (
    <div id="pensiun-print-layout" className="hidden print:block">
      <div className="p-8 text-sm text-neutral-900">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Laporan Kalkulator Pensiun
        </h1>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold border-b pb-1">Data Input</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium w-1/2">Usia Sekarang</td>
                <td className="py-2">{result.usiaSaatIni} tahun</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Usia Pensiun</td>
                <td className="py-2">{result.usiaPensiun} tahun</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Pengeluaran/Bulan</td>
                <td className="py-2">{formatIDR(result.pengeluaranBulanan)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Inflasi</td>
                <td className="py-2">{result.inflasi}%/tahun</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Return Investasi</td>
                <td className="py-2">{result.returnInvestasi}%/tahun</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Dana Saat Ini</td>
                <td className="py-2">{formatIDR(result.danaSaatIni)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold border-b pb-1">Hasil Perhitungan</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium w-1/2">Tahun hingga Pensiun</td>
                <td className="py-2">{result.tahunMenujuPensiun} tahun</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Pengeluaran saat Pensiun</td>
                <td className="py-2">{formatIDR(result.pengeluaranPensiun)}/bulan</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Total Dana Dibutuhkan</td>
                <td className="py-2 font-bold">{formatIDR(result.totalDanaPensiun)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Pertumbuhan Dana</td>
                <td className="py-2">{formatIDR(result.pertumbuhanDanaSaatIni)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Kekurangan</td>
                <td className="py-2">{formatIDR(result.selisih)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Tabungan/Bulan</td>
                <td className="py-2 font-bold">{formatIDR(bulananDibutuhkan)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold border-b pb-1">Rekomendasi</h2>
          <p className="leading-relaxed">{recommendation}</p>
        </div>

        <p className="mt-8 text-xs text-neutral-500 text-center">
          Laporan ini dihasilkan oleh Kalkulator Dana Pensiun
        </p>
      </div>
    </div>
  );
}

export default function PensiunCalculator() {
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

    const usiaSaatIni = Number(form.usiaSaatIni) || 0;
    const usiaPensiun = Number(form.usiaPensiun) || 0;
    const pengeluaranBulanan = Number(form.pengeluaranBulanan.replace(/\D/g, "")) || 0;
    const inflasi = Number(form.inflasi) || 0;
    const returnInvestasi = Number(form.returnInvestasi) || 0;
    const danaSaatIni = Number(form.danaSaatIni.replace(/\D/g, "")) || 0;

    const tahunMenujuPensiun = Math.max(0, usiaPensiun - usiaSaatIni);

    const factorInflasi = Math.pow(1 + inflasi / 100, tahunMenujuPensiun);
    const pengeluaranPensiun = pengeluaranBulanan * factorInflasi;

    const factorReturn = Math.pow(1 + returnInvestasi / 100, tahunMenujuPensiun);
    const totalDanaPensiun = pengeluaranPensiun * 12 * 25;

    const pertumbuhanDanaSaatIni = danaSaatIni * factorReturn;

    const selisih = Math.max(0, totalDanaPensiun - pertumbuhanDanaSaatIni);

    const bulananDibutuhkan = selisih / (tahunMenujuPensiun * 12);
    const tabunganBulanan = bulananDibutuhkan > 0;

    setResult({
      tahunMenujuPensiun,
      pengeluaranPensiun,
      totalDanaPensiun,
      pertumbuhanDanaSaatIni,
      selisih,
      tabunganBulanan,
      usiaSaatIni,
      usiaPensiun,
      pengeluaranBulanan,
      inflasi,
      returnInvestasi,
      danaSaatIni,
    });
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
            <PiggyBank className="h-4 w-4" />
            Kalkulator Dana Pensiun
          </span>
          <h1 className="mt-4 text-3xl font-bold text-ink dark:text-neutral-50 md:text-5xl">
            Rencanakan Masa Pensiunmu dengan Tenang
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
            Hitung berapa besar dana pensiun yang kamu butuhkan, termasuk
            pengaruh inflasi, pertumbuhan investasi, dan tabungan yang sudah
            dimiliki.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 dark:bg-neutral-900 dark:ring-neutral-800 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-ink dark:text-neutral-50">Data Perencana</h2>
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

          <div
            id="pensiun-result"
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
                    <CalendarClock className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Tahun Menuju Pensiun
                    </span>
                  </div>
                  <div className="mt-2 text-3xl font-bold">
                    {result.tahunMenujuPensiun}{" "}
                    <span className="text-base font-medium text-white/60">
                      Tahun
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-white/60">
                    <Target className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Total Dana Pensiun Dibutuhkan
                    </span>
                  </div>
                  <div className="mt-2 w-full text-4xl font-bold sm:text-5xl">
                    <AnimatedValue value={result.totalDanaPensiun} />
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">
                    Berdasarkan 25x pengeluaran tahunan saat pensiun (rumus
                    4% withdrawal rule).
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/60">Pengeluaran Saat Pensiun/bulan</p>
                      <strong className="mt-1 block min-w-0 text-base font-bold break-all">
                        <AnimatedValue value={result.pengeluaranPensiun} />
                      </strong>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/60">Dana Saat Ini → Saat Pensiun</p>
                      <strong className="mt-1 block min-w-0 text-base font-bold break-all">
                        <AnimatedValue value={result.pertumbuhanDanaSaatIni} />
                      </strong>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/60">Dana Terkumpul Saat Ini</p>
                      <strong className="mt-1 block min-w-0 text-base font-bold break-all">
                        <AnimatedValue value={Number(form.danaSaatIni.replace(/\D/g, "")) || 0} />
                      </strong>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/60">Kekurangan (Defisit)</p>
                      <strong className="mt-1 block min-w-0 text-base font-bold break-all">
                        <AnimatedValue value={result.selisih} />
                      </strong>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl bg-white p-5 text-ink dark:bg-neutral-950 dark:text-neutral-50">
                    <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Tabungan Bulanan yang Dibutuhkan
                      </span>
                    </div>
                    <div className="mt-2 w-full text-4xl font-bold text-brand-700 dark:text-brand-400 sm:text-5xl">
                      <AnimatedValue
                        value={
                          result.selisih > 0 && result.tahunMenujuPensiun > 0
                            ? result.selisih / (result.tahunMenujuPensiun * 12)
                            : 0
                        }
                      />
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-neutral-400 dark:text-neutral-500">
                      {result.selisih > 0 && result.tahunMenujuPensiun > 0 ? (
                        <>
                          Jika disisihkan secara rutin setiap bulan selama{" "}
                          <strong className="font-semibold text-neutral-600 dark:text-neutral-300">
                            {result.tahunMenujuPensiun} tahun
                          </strong>
                          .
                        </>
                      ) : (
                        <>
                          Tabunganmu sudah cukup untuk mencapai target dana pensiun.
                        </>
                      )}
                    </p>
                  </div>

                  <div className="mt-6">
                    {!result.tabunganBulanan && result.selisih === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-start gap-3 rounded-2xl bg-emerald-500/15 p-4 ring-1 ring-emerald-400/30"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                        <div>
                          <p className="font-semibold text-emerald-300">
                            Selamat! Target tercapai
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-white/70">
                            Pertumbuhan dana kamu sudah cukup untuk memenuhi target
                            dana pensiun {formatIDR(result.totalDanaPensiun)}.
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
                            Masih kurang {formatIDR(result.selisih)}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-white/70">
                            Untuk mencapai target {formatIDR(result.totalDanaPensiun)}. Mulai
                            sisihkan{" "}
                            {result.tahunMenujuPensiun > 0
                              ? formatIDR(
                                  result.selisih / (result.tahunMenujuPensiun * 12),
                                )
                              : "sebagian"}{" "}
                            setiap bulan agar tercapai tepat waktu.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <PrintButton
                      elementId="pensiun-print-layout"
                      filename="laporan-kalkulator-pensiun"
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
                    Isi data perencanaan di sebelah kiri, lalu tekan{" "}
                    <strong className="font-medium text-white/70">
                      Lihat Hasil
                    </strong>{" "}
                    untuk melihat target dana pensiun yang ideal untukmu.
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
