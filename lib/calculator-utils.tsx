import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function maskRupiah(digits: string): string {
  const cleaned = digits.replace(/\D/g, "").slice(0, 11);
  if (!cleaned) return "";
  return "Rp " + Number.parseInt(cleaned, 10).toLocaleString("id-ID");
}

export function clampDigits(value: string, max: number): string {
  const cleaned = value.replace(/\D/g, "");
  if (!cleaned) return "";
  const parsed = Number.parseInt(cleaned, 10);
  if (!Number.isFinite(parsed)) return "";
  return String(Math.min(parsed, max));
}

export function toNumber(
  value: string,
  max = Number.POSITIVE_INFINITY,
): number {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return Math.min(parsed, max);
}

export function AnimatedValue({ value }: { value: number }) {
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

export function AnimatedPercent({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="inline-block max-w-full tabular-nums break-all"
    >
      {formatPercent(value)}
    </motion.span>
  );
}

export async function handlePrintPDF(
  elementId: string,
  filename: string,
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) return;

  const originalStyle = element.style.cssText;
  Object.assign(element.style, {
    position: "fixed",
    left: "-9999px",
    top: "0",
    display: "block",
    visibility: "visible",
    opacity: "1",
    width: "794px",
    padding: "40px",
    background: "#ffffff",
    color: "#111111",
    zIndex: "-1",
  });

  try {
    const dataUrl = await toPng(element, {
      width: 794,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });

    const img = new Image();
    img.src = dataUrl;
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (img.height * imgWidth) / img.width;
    let heightLeft = imgHeight;
    let position = 0;

    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = -(imgHeight - heightLeft);
      pdf.addPage();
      pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
  } finally {
    element.style.cssText = originalStyle;
  }
}
