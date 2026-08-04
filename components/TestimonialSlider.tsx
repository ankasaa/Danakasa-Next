"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/data";

const AUTOPLAY_INTERVAL = 5000;

const getPerView = (width: number) => {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TestimonialSlider() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [interactionKey, setInteractionKey] = useState(0);

  const windowCount = Math.max(1, testimonials.length - perView + 1);
  const maxIndex = windowCount - 1;
  const activeIndex = Math.min(index, maxIndex);

  const goTo = (next: number, dir: number) => {
    setDirection(dir);
    setIndex(((next % windowCount) + windowCount) % windowCount);
    setInteractionKey((current) => current + 1);
  };

  const goNext = () => goTo(activeIndex + 1, 1);
  const goPrev = () => goTo(activeIndex - 1, -1);

  useEffect(() => {
    const measure = () => {
      const width = stageRef.current?.offsetWidth ?? 0;
      const nextPerView = getPerView(width);
      setPerView(nextPerView);
      setIndex((current) =>
        Math.min(current, Math.max(0, testimonials.length - nextPerView)),
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const intervalId = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % windowCount);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(intervalId);
  }, [isPaused, interactionKey, windowCount]);

  const visibleTestimonials = Array.from({ length: perView }, (_, offset) => {
    const itemIndex = (activeIndex + offset) % testimonials.length;
    return testimonials[itemIndex];
  });

  const handlePause = () => {
    hoveringRef.current = true;
    setIsPaused(true);
  };

  const handleResume = () => {
    hoveringRef.current = false;
    setIsPaused(false);
  };

  return (
    <section
      className="mx-auto max-w-6xl px-6 py-16 md:py-24"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocusCapture={handlePause}
      onBlurCapture={handleResume}
    >
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-500 dark:text-brand-400">
          Testimonials
        </p>
        <h2 className="mt-3 text-3xl font-bold text-ink dark:text-neutral-50 md:text-4xl">
          Real Stories from Our Students
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-500 dark:text-neutral-400">
          Dari membangun kepercayaan diri hingga menguasai keterampilan baru,
          platform kami telah membantu banyak orang mencapai tujuan finansial
          mereka.
        </p>
      </div>

      <div ref={stageRef} className="mt-12 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ x: direction * 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -80, opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.7, ease: EASE }}
            drag="x"
            dragElastic={0.12}
            dragSnapToOrigin
            onDragStart={() => setIsPaused(true)}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -400) {
                goNext();
              } else if (info.offset.x > 60 || info.velocity.x > 400) {
                goPrev();
              }
              setIsPaused(hoveringRef.current);
            }}
            className="flex"
          >
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="w-full shrink-0 px-3 sm:w-1/2 lg:w-1/3"
              >
                <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-md shadow-neutral-900/5 ring-1 ring-neutral-100 transition-transform duration-300 hover:-translate-y-1 dark:bg-neutral-900 dark:ring-neutral-800">
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
                            : "h-4 w-4 text-neutral-200 dark:text-neutral-700"
                        }
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
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
                      <strong className="block text-sm text-ink dark:text-neutral-50">
                        {testimonial.name}
                      </strong>
                      <span className="block text-xs text-neutral-400 dark:text-neutral-500">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Sebelumnya"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-neutral-100 transition-all duration-200 hover:scale-110 hover:bg-neutral-50 dark:bg-neutral-900 dark:ring-neutral-800 dark:hover:bg-neutral-800"
        >
          <ChevronLeft className="h-5 w-5 text-ink dark:text-neutral-50" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: windowCount }).map((_, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            return (
              <button
                key={dotIndex}
                type="button"
                onClick={() =>
                  goTo(
                    dotIndex,
                    dotIndex === activeIndex
                      ? 0
                      : dotIndex > activeIndex
                        ? 1
                        : -1,
                  )
                }
                aria-label={`Ke slide ${dotIndex + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-brand-500"
                    : "w-3 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Berikutnya"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-neutral-100 transition-all duration-200 hover:scale-110 hover:bg-neutral-100 dark:bg-neutral-900 dark:ring-neutral-800 dark:hover:bg-neutral-800"
        >
          <ChevronRight className="h-6 w-6 text-ink dark:text-neutral-50" />
        </button>
      </div>
    </section>
  );
}
