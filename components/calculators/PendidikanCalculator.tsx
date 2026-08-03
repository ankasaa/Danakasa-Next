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

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const MAX_YEARS = 50;
const MAX_CURRENCY = 99_999_999_999;
const MAX_PERCENT = 100;

function toNumber(value: string, max = Number.POSITIVE_INFINITY): number {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return Math.min(parsed, max);
}

function maskRupiah(digits: string): string {
  const cleaned = digits.replace(/\D/g, "");
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
                            ? e.target.value.replace(/\D/g, "")
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

        <div className="rounded-3xl bg-ink p-6 text-white shadow-lg dark:bg-neutral-900 sm:p-8 lg:sticky lg:top-24">
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
    </section>
  );
}