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
        <p className="font-medium text-brand-600 dark:text-brand-400">About us</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-2 text-3xl font-bold text-ink dark:text-neutral-50 md:text-5xl">
          Belajar Finansial skill
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:gap-12">
        <Reveal className="w-full lg:w-1/2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg shadow-neutral-900/10">
            <Image
              src="/img/g2.jpg"
              alt="Belajar mengelola keuangan"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="w-full text-left lg:w-1/2">
          <Reveal>
            <p className="text-neutral-600 dark:text-neutral-400">
              Danakasa berdiri untuk mengedukasi masyarakat agar melek tentang
              finansial.
            </p>
          </Reveal>

          <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1}>
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-neutral-900 dark:ring-neutral-800">
                  <h3 className="text-xl font-bold text-ink dark:text-neutral-50 md:text-2xl">
                    {stat.value}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 md:text-sm">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-6 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Link
                href="/tools"
                className="w-full rounded-full bg-neutral-900 px-6 py-3 text-center font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 sm:w-auto dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Explore content
              </Link>
              <Link
                href="/#contact"
                className="w-full rounded-full border-2 border-neutral-300 px-6 py-3 text-center font-medium text-neutral-900 transition-all duration-300 hover:bg-neutral-50 sm:w-auto dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
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