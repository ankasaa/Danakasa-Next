import Image from "next/image";
import Reveal from "@/components/Reveal";
import { features } from "@/lib/data";

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-center md:py-24">
      <Reveal>
        <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
          Kita berbeda
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 text-3xl font-bold text-ink dark:text-neutral-50 md:text-5xl">
          Solusi Cerdas Finansial <br className="hidden sm:block" /> untuk
          Semua Orang
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.08} className="h-full">
            <article className="flex h-full flex-col rounded-3xl bg-white p-8 text-left shadow-sm ring-1 ring-neutral-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-neutral-900 dark:ring-neutral-800">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={45}
                height={45}
                className="mb-5 h-[45px] w-[45px] object-contain"
              />
              <h3 className="text-lg font-semibold text-ink dark:text-neutral-50">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {feature.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}