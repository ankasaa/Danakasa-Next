import Link from "next/link";

type ComingSoonProps = {
  title: string;
  description: string;
};

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600">
        Segera Hadir
      </span>
      <h1 className="mt-6 text-3xl font-bold text-ink md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-lg leading-relaxed text-neutral-500">
        {description}
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-700"
      >
        Kembali ke Beranda
      </Link>
    </section>
  );
}