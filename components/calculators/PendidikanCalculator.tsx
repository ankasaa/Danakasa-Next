"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  GraduationCap,
  PiggyBank,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatedValue,
  clampDigits,
  formatIDR,
  maskRupiah,
  toNumber,
} from "@/lib/calculator-utils";
import PrintButton from "@/components/calculators/PrintButton";

const MAX_YEARS = 50;
const MAX_CURRENCY = 99_999_999_999;
const MAX_PERCENT = 100;

type FormState = {
  namaAnak: string;
  jangkaWaktu: string;
  uangPangkal: string;
  sppTahunan: string;
  modalAwal: string;
  investasiBulanan: string;
  inflasi: string;
  imbalHasil: string;
};

const defaultForm: FormState = {
  namaAnak: "",
  jangkaWaktu: "",
  uangPangkal: "",
  sppTahunan: "",
  modalAwal: "",
  investasiBulanan: "",
  inflasi: "7",
  imbalHasil: "10",
};

const exampleForm: FormState = {
  namaAnak: "Aisyah Putri",
  jangkaWaktu: "10",
  uangPangkal: "7500000",
  sppTahunan: "4200000",
  modalAwal: "15000000",
  investasiBulanan: "1000000",
  inflasi: "7",
  imbalHasil: "10",
};

type FieldConfig = {
  key: keyof FormState;
  id: string;
  label: string;
  placeholder: string;
  Icon: LucideIcon;
  type: "text" | "number";
  isCurrency?: boolean;
  max?: number;
  hint?: string;
};

const fields: FieldConfig[] = [
  {
    key: "namaAnak",
    id: "nama-anak",
    label: "Nama Anak",
    placeholder: "contoh: Aisyah Putri",
    Icon: User,
    type: "text",
  },
  {
    key: "jangkaWaktu",
    id: "jangka-waktu",
    label: "Waktu Menabung / Jangka Waktu (Tahun)",
    placeholder: "contoh: 10",
    Icon: Clock,
    type: "number",
    max: MAX_YEARS,
    hint: "Maksimal 50 tahun.",
  },
  {
    key: "uangPangkal",
    id: "uang-pangkal",
    label: "Uang Pangkal / Masuk Saat Ini (Rp)",
    placeholder: "contoh: 7.500.000",
    Icon: GraduationCap,
    type: "number",
    isCurrency: true,
  },
  {
    key: "sppTahunan",
    id: "spp-tahunan",
    label: "Iuran Sekolah / SPP Tahunan Saat Ini (Rp)",
    placeholder: "contoh: 4.200.000",
    Icon: Wallet,
    type: "number",
    isCurrency: true,
  },
  {
    key: "modalAwal",
    id: "modal-awal",
    label: "Modal Awal / Tabungan Saat Ini (Rp)",
    placeholder: "contoh: 15.000.000",
    Icon: PiggyBank,
    type: "number",
    isCurrency: true,
  },
  {
    key: "investasiBulanan",
    id: "investasi-bulanan",
    label: "Investasi Bulanan yang Mampu Disisihkan (Rp)",
    placeholder: "contoh: 1.000.000",
    Icon: Sparkles,
    type: "number",
    isCurrency: true,
  },
  {
    key: "inflasi",
    id: "inflasi",
    label: "Asumsi Inflasi Pendidikan (%/tahun)",
    placeholder: "contoh: 7",
    Icon: TrendingUp,
    type: "number",
    max: MAX_PERCENT,
    hint: "Rata-rata kenaikan biaya pendidikan di Indonesia 7–10% per tahun.",
  },
  {
    key: "imbalHasil",
    id: "imbal-hasil",
    label: "Perkiraan Imbal Hasil Investasi (%/tahun)",
    placeholder: "contoh: 10",
    Icon: TrendingUp,
    type: "number",
    max: MAX_PERCENT,
  },
];

type ResultData = {
  namaAnak: string;
  jangkaWaktu: number;
  inflasi: number;
  imbalHasil: number;
  futureCost: number;
  targetDefisit: number;
  investasiDibutuhkan: number;
  investasiMampu: number;
  mampuCukup: boolean;
};

const inputClasses =
  "w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-ink transition placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500";

function PrintPendidikan({ result, form }: { result: ResultData; form: FormState }) {
  const inflasiVal = toNumber(form.inflasi, MAX_PERCENT);
  const imbalHasilVal = toNumber(form.imbalHasil, MAX_PERCENT);

  const recommendation = result.mampuCukup
    ? `Investasi bulanan Anda sebesar ${formatIDR(result.investasiMampu)} sudah cukup untuk memenuhi kebutuhan pendidikan ${result.namaAnak ? `anak ${result.namaAnak} ` : ""}sebesar ${formatIDR(result.futureCost)} di masa depan. Pertahankan kebiasaan berinvestasi ini dan pertimbangkan untuk menambah alokasi dana jika diperlukan.`
    : `Untuk memenuhi kebutuhan pendidikan ${result.namaAnak ? `anak ${result.namaAnak} ` : ""}sebesar ${formatIDR(result.futureCost)}, Anda perlu investasi bulanan sebesar ${formatIDR(result.investasiDibutuhkan)}. Saat ini masih kekurangan ${formatIDR(Math.max(0, result.investasiDibutuhkan - result.investasiMampu))} per bulan. Pertimbangkan untuk menambah investasi atau menambah modal awal agar target tercapai tepat waktu.`;

  return (
    <div id="pendidikan-print-layout" className="hidden print:block">
      <div className="p-8 text-sm text-neutral-900">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Laporan Kalkulator Pendidikan
        </h1>

        {result.namaAnak && (
          <p className="mb-4 text-base">
            <span className="font-semibold">Nama Anak:</span> {result.namaAnak}
          </p>
        )}

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold border-b pb-1">Data Input</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium w-1/2">Nama Anak</td>
                <td className="py-2">{result.namaAnak || "-"}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Waktu hingga Kuliah</td>
                <td className="py-2">{result.jangkaWaktu} tahun</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Biaya Kuliah (Uang Pangkal + SPP Tahunan)</td>
                <td className="py-2">{formatIDR(toNumber(form.uangPangkal, MAX_CURRENCY) + toNumber(form.sppTahunan, MAX_CURRENCY))}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">SPP/Tahun</td>
                <td className="py-2">{formatIDR(toNumber(form.sppTahunan, MAX_CURRENCY))}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Tabungan Awal</td>
                <td className="py-2">{formatIDR(toNumber(form.modalAwal, MAX_CURRENCY))}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Investasi/Bulan</td>
                <td className="py-2">{formatIDR(result.investasiMampu)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Inflasi</td>
                <td className="py-2">{inflasiVal}% per tahun</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Return (Imbal Hasil)</td>
                <td className="py-2">{imbalHasilVal}% per tahun</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold border-b pb-1">Hasil Perhitungan</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium w-1/2">Total Dibutuhkan (di Masa Depan)</td>
                <td className="py-2 font-bold">{formatIDR(result.futureCost)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Total Tabungan (Modal Awal di Masa Depan)</td>
                <td className="py-2">{formatIDR(toNumber(form.modalAwal, MAX_CURRENCY) * Math.pow(1 + imbalHasilVal / 100, result.jangkaWaktu))}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Kekurangan (Defisit)</td>
                <td className="py-2">{formatIDR(result.targetDefisit)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Investasi/Bulan Dibutuhkan</td>
                <td className="py-2 font-bold">{formatIDR(result.investasiDibutuhkan)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold border-b pb-1">Rekomendasi</h2>
          <p className="leading-relaxed">{recommendation}</p>
        </div>

        <p className="mt-8 text-xs text-neutral-500 text-center">
          Laporan ini dihasilkan oleh Kalkulator Pendidikan
        </p>
      </div>
    </div>
  );
}

export default function PendidikanCalculator() {
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

    const jangkaWaktu = toNumber(form.jangkaWaktu, MAX_YEARS);
    const inflasi = toNumber(form.inflasi, MAX_PERCENT);
    const imbalHasil = toNumber(form.imbalHasil, MAX_PERCENT);
    const uangPangkal = toNumber(form.uangPangkal, MAX_CURRENCY);
    const sppTahunan = toNumber(form.sppTahunan, MAX_CURRENCY);
    const modalAwal = toNumber(form.modalAwal, MAX_CURRENCY);
    const investasiMampu = toNumber(form.investasiBulanan, MAX_CURRENCY);

    const totalBiaya = uangPangkal + sppTahunan;
    const futureCost =
      jangkaWaktu > 0 ? totalBiaya * Math.pow(1 + inflasi / 100, jangkaWaktu) : totalBiaya;
    const totalModalAwal = modalAwal * Math.pow(1 + imbalHasil / 100, jangkaWaktu);
    const targetDefisit = Math.max(0, futureCost - totalModalAwal);

    const monthlyRate = imbalHasil / 100 / 12;
    const months = jangkaWaktu * 12;
    let investasiDibutuhkan = 0;
    if (months > 0 && targetDefisit > 0) {
      investasiDibutuhkan =
        monthlyRate > 0
          ? (targetDefisit * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
          : targetDefisit / months;
    }

    setResult({
      namaAnak: form.namaAnak.trim(),
      jangkaWaktu,
      inflasi,
      imbalHasil,
      futureCost,
      targetDefisit,
      investasiDibutuhkan,
      investasiMampu,
      mampuCukup: investasiMampu >= investasiDibutuhkan,
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
          <GraduationCap className="h-4 w-4" />
          Kalkulator Pendidikan
        </span>
        <h1 className="mt-4 text-3xl font-bold text-ink dark:text-neutral-50 md:text-5xl">
          Rencanakan Biaya Pendidikan Anak
        </h1>
        <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
          Biaya pendidikan naik setiap tahun. Hitung kebutuhan dana di masa
          depan dan berapa investasi bulanan yang perlu kamu sisihkan untuk
          menutupnya.
        </p>
      </div>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 dark:bg-neutral-900 dark:ring-neutral-800 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-ink dark:text-neutral-50">Data Perencanaan</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg bg-transparent px-3 py-1.5 text-xs font-semibold text-neutral-500 ring-1 ring-neutral-200 transition-colors duration-300 hover:bg-neutral-50 active:scale-[0.98] dark:text-neutral-400 dark:ring-neutral-800 dark:hover:bg-neutral-800"
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
                      type={field.isCurrency ? "text" : field.type}
                      min={
                        !field.isCurrency && field.type === "number" ? 0 : undefined
                      }
                      max={field.max}
                      inputMode="numeric"
                      placeholder={field.placeholder}
                      value={
                        field.isCurrency ? maskRupiah(form[field.key]) : form[field.key]
                      }
                      onChange={(e) =>
                        setField(
                          field.key,
                          field.isCurrency
                            ? e.target.value.replace(/\D/g, "").slice(0, 11)
                            : field.max
                              ? clampDigits(e.target.value, field.max)
                              : e.target.value,
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
              <button
                type="submit"
                className="flex-1 rounded-2xl bg-brand-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-700 hover:shadow-brand-500/40 active:scale-[0.98]"
              >
                Lihat Hasil
              </button>
              <button
                type="button"
                onClick={handleExample}
                className="flex items-center justify-center gap-2 rounded-2xl bg-brand-50 px-6 py-3.5 text-base font-semibold text-brand-700 transition-all hover:bg-brand-100 active:scale-[0.98] dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/30"
              >
                <Sparkles className="h-4 w-4" />
                Contoh Data
              </button>
            </div>
          </form>
        </div>

        <div id="pendidikan-result" className="rounded-3xl bg-ink p-6 text-white shadow-lg dark:bg-neutral-900 sm:p-8 lg:sticky lg:top-24" aria-live="polite">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {result.namaAnak ? (
                  <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                    <User className="h-4 w-4" />
                    Rencana pendidikan untuk {result.namaAnak}
                  </div>
                ) : null}

                <div className="mt-4 flex items-center gap-2 text-white/60">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Biaya Pendidikan di Masa Depan
                  </span>
                </div>
                <div className="mt-2 w-full text-3xl font-bold sm:text-4xl">
                  <AnimatedValue value={result.futureCost} />
                </div>

                <div className="mt-4 flex items-center gap-2 text-white/60">
                  <Target className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Target Dana yang Harus Dikumpulkan
                  </span>
                </div>
                <div className="mt-2 w-full text-2xl font-semibold">
                  <AnimatedValue value={result.targetDefisit} />
                </div>

                <div className="mt-6 rounded-3xl bg-white p-5 text-ink dark:bg-neutral-950 dark:text-neutral-50">
                  <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Investasi Bulanan yang Dibutuhkan
                    </span>
                  </div>
                  <div className="mt-2 w-full text-4xl font-bold text-brand-700 dark:text-brand-400 sm:text-5xl">
                    <AnimatedValue value={result.investasiDibutuhkan} />
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-white/60 p-4 ring-1 ring-neutral-100 dark:bg-neutral-800/60 dark:ring-neutral-800">
                    <span className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <Sparkles className="h-4 w-4" />
                      Investasi yang Mampu Disisihkan
                    </span>
                    <strong className="min-w-0 text-sm font-bold text-ink dark:text-neutral-50 break-all">
                      <AnimatedValue value={result.investasiMampu} />
                    </strong>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-neutral-400 dark:text-neutral-500">
                    Dengan asumsi imbal hasil {result.imbalHasil}% per tahun
                    selama {result.jangkaWaktu} tahun
                    ({result.jangkaWaktu * 12} bulan). Buat dana setelah
                    dikurangi nilai masa depan modal awal.
                  </p>
                </div>

                <div className="mt-6">
                  {result.mampuCukup ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-start gap-3 rounded-2xl bg-emerald-500/15 p-4 ring-1 ring-emerald-400/30"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-emerald-300">
                          Kebutuhan terpenuhi! 🎉
                          {result.investasiDibutuhkan > 0 &&
                            ` Sisihkan ${formatIDR(result.investasiDibutuhkan)} secara rutin.`}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-white/70">
                          Investasi bulananmu cukup untuk menutup selisih biaya
                          pendidikan di masa depan. Pertahankan kebiasaan ini.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-3 rounded-2xl bg-amber-400/10 p-4 ring-1 ring-amber-400/30"
                    >
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                      <div>
                        <p className="font-semibold text-amber-300">
                          Belum cukup, butuh{" "}
                          {formatIDR(
                            Math.max(0, result.investasiDibutuhkan - result.investasiMampu),
                          )}{" "}
                          tambahan per bulan
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-white/70">
                          Naikkan investasi bulanan atau tambah modal awal agar
                          target dana terkumpul tepat waktu.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="mt-6 flex justify-center">
                  <PrintButton
                    elementId="pendidikan-print-layout"
                    filename="laporan-kalkulator-pendidikan"
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
                <GraduationCap className="h-12 w-12 text-white/25" />
                <p className="mt-4 font-semibold text-white/80">
                  Ringkasan Hasil
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/50">
                  Isi data perencanaan di sebelah kiri, lalu tekan{" "}
                  <strong className="font-medium text-white/70">
                    Lihat Hasil Perhitungan
                  </strong>{" "}
                  untuk melihat proyeksi biaya dan investasi bulanan yang
                  dibutuhkan.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {result && <PrintPendidikan result={result} form={form} />}
    </section>
  );
}
