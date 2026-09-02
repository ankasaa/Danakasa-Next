"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { handlePrintPDF } from "@/lib/calculator-utils";

type PrintButtonProps = {
  elementId: string;
  filename: string;
  disabled?: boolean;
};

export default function PrintButton({
  elementId,
  filename,
  disabled = false,
}: PrintButtonProps) {
  const [printing, setPrinting] = useState(false);

  const handlePrint = async () => {
    if (printing || disabled) return;
    setPrinting(true);
    try {
      await handlePrintPDF(elementId, filename);
    } catch (err) {
      console.error("Gagal mencetak PDF:", err);
    } finally {
      setPrinting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      disabled={disabled || printing}
      className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition-all hover:bg-white/20 hover:ring-white/30 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {printing ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {printing ? "Mencetak..." : "Cetak PDF"}
    </button>
  );
}
