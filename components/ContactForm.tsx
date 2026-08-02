"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MessageSquare, Phone } from "lucide-react";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success";

const inputClasses =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-ink transition placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => {
      event.currentTarget.reset();
      setStatus("success");
    }, 900);
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-24"
    >
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-ink md:text-5xl">
            Hubungi kami Segera!
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-neutral-500">
            Apa pun yang Anda butuhkan, kapan pun Anda membutuhkannya, tim kami
            siap membantu dan berdedikasi mendukung Anda di setiap langkah.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <MessageSquare className="h-5 w-5" />
              </span>
              <div>
                <h4 className="font-semibold text-ink">Message Us</h4>
                <p className="mt-1 text-sm text-neutral-500">
                  Gunakan sistem obrolan daring kami untuk mengirim pesan
                  kepada kami dan mendapatkan dukungan.
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 inline-block font-medium text-brand-500 hover:underline"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <h4 className="font-semibold text-ink">Call Us</h4>
                <p className="mt-1 text-sm text-neutral-500">
                  Ayo ngobrol - tidak ada yang lebih baik daripada berbicara
                  dengan manusia lain.
                </p>
                <a
                  href={`tel:${site.phone}`}
                  className="mt-2 inline-block font-medium text-brand-500 hover:underline"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-neutral-900/5 ring-1 ring-neutral-100 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className={inputClasses}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className={inputClasses}
              />
            </div>
            <textarea
              name="message"
              placeholder="How Can We Help?"
              required
              rows={6}
              className={`${inputClasses} h-auto resize-none`}
            />
            <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-500">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 text-brand-500 focus:ring-brand-500"
              />
              Subscribe to Newsletter
            </label>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-xl bg-ink py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "submitting" ? "Mengirim..." : "Send Message"}
            </button>
          </form>

          <AnimatePresence>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600"
              >
                <CheckCircle2 className="h-4 w-4" />
                Message sent successfully!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}