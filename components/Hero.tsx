import Image from "next/image";
import Link from "next/link";

const heroImage =
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg";

export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <Image
        src={heroImage}
        alt="Belajar mengelola keuangan"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/30" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
          Temukan Cara Mengatur Keuangan yang Baik dan Benar Lewat Website Kami
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
          Pelajari perencanaan keuangan, coba kalkulator interaktif, dan baca
          artikel edukasi untuk bikin keputusan finansial yang lebih cerdas.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/tools"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
          >
            Jelajahi Kalkulator
          </Link>
          <Link
            href="/#contact"
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-white px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-ink sm:w-auto"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
}