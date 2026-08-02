import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { stats } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 text-center md:py-24"
    >
      <Reveal>
        <p className="font-medium text-brand-600">About us</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-2 text-3xl font-bold text-ink md:text-5xl">
          Belajar Finansial skill
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-10 md:gap-16">
        <Reveal className="w-full min-w-[280px] flex-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg shadow-neutral-900/10">
            <Image
              src="/img/g2.jpg"
              alt="Belajar mengelola keuangan"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="w-full min-w-[280px] flex-1 text-left">
          <Reveal>
            <p className="text-neutral-600">
              Danakasa berdiri untuk mengedukasi masyarakat agar melek tentang
              finansial.
            </p>
          </Reveal>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1}>
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <h3 className="text-xl font-bold text-ink md:text-2xl">
                    {stat.value}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500 md:text-sm">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/tools"
                className="rounded-full bg-ink px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-700"
              >
                Explore content
              </Link>
              <Link
                href="/#contact"
                className="rounded-full border-2 border-ink px-6 py-3 font-medium text-ink transition-all duration-300 hover:bg-ink hover:text-white"
              >
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}