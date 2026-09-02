type PrintLayoutProps = {
  id: string;
  title: string;
  name?: string;
  children: React.ReactNode;
};

export default function PrintLayout({
  id,
  title,
  name,
  children,
}: PrintLayoutProps) {
  return (
    <div
      id={id}
      className="hidden print:block print:bg-white print:p-0"
      style={{ width: "210mm" }}
    >
      {/* Header */}
      <div
        className="border-b-4 border-[#6D28D9] pb-6"
        style={{ padding: "20mm 15mm 10mm 15mm" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6D28D9] text-xl font-bold text-white">
            D
          </div>
          <div>
            <h1
              className="text-2xl font-bold text-[#6D28D9]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              DANAKASA
            </h1>
            <p className="text-xs text-neutral-500">
              Solusi Cerdas Finansial untuk Semua
            </p>
          </div>
        </div>
      </div>

      {/* Title + Meta */}
      <div style={{ padding: "8mm 15mm" }}>
        <h2
          className="text-xl font-bold text-ink"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {title}
        </h2>
        <div className="mt-3 flex gap-6 text-sm text-neutral-600">
          <span>
            📅{" "}
            {new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          {name && <span>👤 {name}</span>}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 15mm 10mm 15mm" }}>{children}</div>

      {/* Footer */}
      <div
        className="border-t border-neutral-200 pt-4"
        style={{ padding: "0 15mm 20mm 15mm" }}
      >
        <div className="text-xs leading-relaxed text-neutral-400">
          <p className="font-medium text-neutral-500">Catatan Penting</p>
          <p className="mt-1">
            Hasil perhitungan ini bersifat edukatif dan bukan nasihat keuangan
            profesional. Konsultasikan dengan perencana keuangan bersertifikat
            untuk keputusan finansial yang lebih tepat.
          </p>
          <p className="mt-3">
            © {new Date().getFullYear()} DanaKasa — danakasa.vercel.app
          </p>
        </div>
      </div>
    </div>
  );
}
