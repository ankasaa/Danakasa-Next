"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Baby,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  PiggyBank,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
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
const MAX_TANGGUNGAN = 10;
const MAX_TARGET_MONTHS = 120;

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

function clampDigits(value: string, max: number): string {
  const cleaned = value.replace(/\D/g, "");
  if (!cleaned) return "";
  const parsed = Number.parseInt(cleaned, 10);
  if (!Number.isFinite(parsed)) return "";
  return String(Math.min(parsed, max));
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
  nama: string;
  status: string;
  tanggungan: string;
  pekerjaan: string;
  penghasilan: string;
  pengeluaran: string;
  tabungan: string;
  targetWaktu: string;
};

const defaultForm: FormState = {
  nama: "",
  status: "lajang",
  tanggungan: "",
  pekerjaan: "tetap",
  penghasilan: "",
  pengeluaran: "",
  tabungan: "",
  targetWaktu: "",
};

const exampleForm: FormState = {
  nama: "Budi Santoso",
  status: "menikah",
  tanggungan: "2",
  pekerjaan: "freelancer",
  penghasilan: "12000000",
  pengeluaran: "8000000",
  tabungan: "25000000",
  targetWaktu: "12",
};

const statusLabels: Record<string, string> = {
  lajang: "Lajang",
  menikah: "Menikah",
};

const pekerjaanLabels: Record<string, string> = {
  tetap: "Pegawai Tetap",
  kontrak: "Pekerja Kontrak",
  freelancer: "Freelancer / Pengusaha",
};

const statusOptions = [
  { value: "lajang", label: "Lajang" },
  { value: "menikah", label: "Menikah" },
];

const pekerjaanOptions = [
  { value: "tetap", label: "Pegawai Tetap" },
  { value: "kontrak", label: "Pekerja Kontrak" },
  { value: "freelancer", label: "Freelancer / Pengusaha" },
];

type FieldConfig = {
  key: keyof FormState;
  id: string;
  label: string;
  Icon: LucideIcon;
  type: "text" | "number" | "select" | "currency";
  options?: { value: string; label: string }[];
  placeholder?: string;
  hint?: string;
  max?: number;
};

const fields: FieldConfig[] = [
  {
    key: "nama",
    id: "darurat-nama",
    label: "Nama",
    Icon: User,
    type: "text",
    placeholder: "contoh: Budi Santoso",
  },
  {
    key: "status",
    id: "darurat-status",
    label: "Status",
    Icon: Users,
    type: "select",
    options: statusOptions,
  },
  {
    key: "tanggungan",
    id: "darurat-tanggungan",
    label: "Jumlah Tanggungan",
    Icon: Baby,
    type: "number",
    placeholder: "contoh: 2",
    hint: "Anak atau keluarga yang menjadi tanggunganmu.",
    max: MAX_TANGGUNGAN,
  },
  {
    key: "pekerjaan",
    id: "darurat-pekerjaan",
    label: "Jenis Pekerjaan",
    Icon: Briefcase,
    type: "select",
    options: pekerjaanOptions,
  },
  {
    key: "penghasilan",
    id: "darurat-penghasilan",
    label: "Penghasilan Bulanan (Rp)",
    Icon: Wallet,
    type: "currency",
    placeholder: "contoh: 12.000.000",
  },
  {
    key: "pengeluaran",
    id: "darurat-pengeluaran",
    label: "Pengeluaran Bulanan Rata-rata (Rp)",
    Icon: TrendingUp,
    type: "currency",
    placeholder: "contoh: 8.000.000",
    hint: "Rata-rata pengeluaran per bulan, termasuk tagihan dan cicilan.",
  },
  {
    key: "tabungan",
    id: "darurat-tabungan",
    label: "Tabungan Saat Ini (Rp)",
    Icon: PiggyBank,
    type: "currency",
    placeholder: "contoh: 25.000.000",
  },
  {
    key: "targetWaktu",
    id: "darurat-target-waktu",
    label: "Target Waktu Mencapai Dana Darurat (Bulan)",
    Icon: CalendarClock,
    type: "number",
    placeholder: "contoh: 12",
    hint: "Misalnya 12 bulan atau 1 tahun.",
    max: MAX_TARGET_MONTHS,
  },
];

type ResultData = {
  nama: string;
  status: string;
  tanggungan: number;
  pekerjaan: string;
  baseMultiplier: number;
  riskMonths: number;
  totalMultiplier: number;
  pengeluaran: number;
  target: number;
  tabungan: number;
  defisit: number;
  bulananDibutuhkan: number;
  targetWaktu: number;
  tercapai: boolean;
};

const inputClasses =
  "w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-ink transition placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const primaryButtonClasses =
  "flex-1 rounded-2xl bg-brand-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-700 hover:shadow-brand-500/40 active:scale-[0.98]";
const secondaryButtonClasses =
  "flex items-center justify-center gap-2 rounded-2xl bg-brand-50 px-6 py-3.5 text-base font-semibold text-brand-700 transition-all hover:bg-brand-100 active:scale-[0.98] dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/30";
const smallResetButtonClasses =
  "inline-flex items-center gap-1.5 rounded-lg bg-transparent px-3 py-1.5 text-xs font-semibold text-neutral-500 ring-1 ring-neutral-200 transition-colors duration-300 hover:bg-neutral-50 active:scale-[0.98] dark:text-neutral-400 dark:ring-neutral-800 dark:hover:bg-neutral-800";

export default function DanaDaruratCalculator() {
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

    const status = form.status;
    const pekerjaan = form.pekerjaan;
    const tanggungan = Math.floor(toNumber(form.tanggungan, MAX_TANGGUNGAN));
    const pengeluaran = toNumber(form.pengeluaran, MAX_CURRENCY);
    const tabungan = toNumber(form.tabungan, MAX_CURRENCY);
    const targetWaktu = Math.floor(toNumber(form.targetWaktu, MAX_TARGET_MONTHS));

    const baseMultiplier = status === "lajang" ? 6 : tanggungan > 0 ? 12 : 9;
    const riskMonths =
      pekerjaan === "tetap" ? 0 : pekerjaan === "kontrak" ? 3 : 6;
    const totalMultiplier = baseMultiplier + riskMonths;
    const target = pengeluaran * totalMultiplier;
    const defisit = Math.max(0, target - tabungan);
    const bulananDibutuhkan =
      defisit > 0 && targetWaktu > 0 ? defisit / targetWaktu : 0;

    setResult({
      nama: form.nama.trim(),
      status,
      tanggungan,
      pekerjaan,
      baseMultiplier,
      riskMonths,
      totalMultiplier,
      pengeluaran,
      target,
      tabungan,
      defisit,
      bulananDibutuhkan,
      targetWaktu,
      tercapai: tabungan >= target && pengeluaran > 0,
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
          <ShieldCheck className="h-4 w-4" />
          Kalkulator Dana Darurat
        </span>
        <h1 className="mt-4 text-3xl font-bold text-ink dark:text-neutral-50 md:text-5xl">
          Rencanakan Jaring Pengaman Finansialmu
        </h1>
        <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
          Hitung target dana darurat yang ideal berdasarkan status, jumlah
          tanggungan, dan tingkat risiko pekerjaanmu.
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
                    {field.type === "select" ? (
                      <select
                        id={field.id}
                        value={form[field.key]}
                        onChange={(e) => setField(field.key, e.target.value)}
                        className={inputClasses}
                      >
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value} className="bg-white text-ink dark:bg-neutral-900 dark:text-neutral-100">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={field.id}
                        type="text"
                        inputMode={
                          field.type === "text" ? undefined : "numeric"
                        }
                        placeholder={field.placeholder}
                        value={
                          field.type === "currency"
                            ? maskRupiah(form[field.key])
                            : form[field.key]
                        }
                        onChange={(e) =>
                          setField(
                            field.key,
                            field.type === "text"
                              ? e.target.value
                              : field.type === "number"
                                ? clampDigits(
                                    e.target.value,
                                    field.max ?? Number.MAX_SAFE_INTEGER,
                                  )
                                : e.target.value.replace(/\D/g, "").slice(0, 11),
                          )
                        }
                        className={inputClasses}
                      />
                    )}
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
                {result.nama ? (
                  <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                    <User className="h-4 w-4" />
                    Rencana dana darurat untuk {result.nama}
                  </div>
                ) : null}

                <div className="mt-4 flex items-center gap-2 text-white/60">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Total Pengali (Multiplier)
                  </span>
                </div>
                <div className="mt-2 text-3xl font-bold">
                  {result.totalMultiplier}x{" "}
                  <span className="text-base font-medium text-white/60">
                    Pengeluaran Bulanan
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-white/50">
                  Berdasarkan status {statusLabels[result.status]}
                  {result.tanggungan > 0
                    ? ` dengan ${result.tanggungan} tanggungan`
                    : ""}{" "}
                  dan pekerjaan {pekerjaanLabels[result.pekerjaan]}.
                </p>

                <div className="mt-6 flex items-center gap-2 text-white/60">
                  <Target className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Target Dana Darurat
                  </span>
                </div>
                <div className="mt-2 w-full text-4xl font-bold sm:text-5xl">
                  <AnimatedValue value={result.target} />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-xs text-white/60">Dana Terkumpul Saat Ini</p>
                    <strong className="mt-1 block min-w-0 text-base font-bold break-all">
                      <AnimatedValue value={result.tabungan} />
                    </strong>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-xs text-white/60">Kekurangan (Defisit)</p>
                    <strong className="mt-1 block min-w-0 text-base font-bold break-all">
                      <AnimatedValue value={result.defisit} />
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
                    <AnimatedValue value={result.bulananDibutuhkan} />
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-400 dark:text-neutral-500">
                    Jika ditabung secara rutin setiap bulan selama{" "}
                    {result.targetWaktu > 0 ? (
                      <strong className="font-semibold text-neutral-600 dark:text-neutral-300">
                        {result.targetWaktu} bulan
                      </strong>
                    ) : (
                      <strong className="font-semibold text-neutral-600 dark:text-neutral-300">
                        periode yang kamu tentukan
                      </strong>
                    )}
                    .
                  </p>
                </div>

                <div className="mt-6">
                  {result.tercapai ? (
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
                          Tabunganmu sudah memenuhi target dana darurat
                          {formatIDR(result.target)}. Pertahankan kebiasaan ini
                          untuk tujuan finansial lainnya.
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
                          Masih kurang {formatIDR(result.defisit)}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-white/70">
                          Untuk mencapai target {formatIDR(result.target)}. Mulai
                          sisihkan{" "}
                          {result.targetWaktu > 0
                            ? formatIDR(result.bulananDibutuhkan)
                            : "sebagian"}{" "}
                          setiap bulan agar tercapai tepat waktu.
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
                  Ringkasan Hasil
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/50">
                  Isi data perencanaan di sebelah kiri, lalu tekan{" "}
                  <strong className="font-medium text-white/70">
                    Lihat Hasil
                  </strong>{" "}
                  untuk melihat target dana darurat yang ideal untukmu.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}