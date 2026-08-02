"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/data";

const getPerView = (width: number) => {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
};

export default function TestimonialSlider() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [perView, setPerView] = useState(3);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, testimonials.length - perView);

  useEffect(() => {
    const measure = () => {
      const width = stageRef.current?.offsetWidth ?? 0;
      const nextPerView = getPerView(width);
      setPerView(nextPerView);
      setSlideWidth(width / nextPerView);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const effectiveIndex = Math.min(index, maxIndex);

  const goPrev = () => setIndex((current) => Math.max(0, current - 1));
  const goNext = () =>
    setIndex((current) => Math.min(maxIndex, current + 1));

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">
          Testimonials
        </p>
        <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
          Real Stories from Our Students
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-500">
          Dari membangun kepercayaan diri hingga menguasai keterampilan baru,
          platform kami telah membantu banyak orang mencapai tujuan finansial
          mereka.
        </p>
      </div>

      <div ref={stageRef} className="mt-12 overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: -(effectiveIndex * slideWidth) }}
          transition={{ type: "tween", duration: 0.55, ease: "easeInOut" }}
          drag="x"
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            const threshold = slideWidth / 4;
            if (info.offset.x < -threshold) goNext();
            else if (info.offset.x > threshold) goPrev();
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="shrink-0 px-3"
              style={{ width: `${100 / perView}%` }}
            >
              <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-md shadow-neutral-900/5 ring-1 ring-neutral-100 transition-transform duration-300 hover:-translate-y-1">
                <div
                  className="mb-4 flex gap-0.5 text-amber-400"
                  aria-label={`Rating ${testimonial.rating} dari 5 bintang`}
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={
                        starIndex < testimonial.rating
                          ? "h-4 w-4 fill-current"
                          : "h-4 w-4 text-neutral-200"
                      }
                    />
                  ))}
                </div>
                <p className="flex-1 text-[15px] leading-relaxed text-neutral-700">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt={`Foto ${testimonial.name}`}
                    width={45}
                    height={45}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <strong className="block text-sm text-ink">
                      {testimonial.name}
                    </strong>
                    <span className="block text-xs text-neutral-400">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={effectiveIndex === 0}
          aria-label="Sebelumnya"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-neutral-100 transition-all duration-200 hover:scale-110 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          <ChevronLeft className="h-5 w-5 text-ink" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Ke slide ${dotIndex + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                dotIndex === effectiveIndex
                  ? "w-6 bg-brand-500"
                  : "w-2.5 bg-neutral-200 hover:bg-neutral-300"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={effectiveIndex === maxIndex}
          aria-label="Berikutnya"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-neutral-100 transition-all duration-200 hover:scale-110 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          <ChevronRight className="h-6 w-6 text-ink" />
        </button>
      </div>
    </section>
  );
}