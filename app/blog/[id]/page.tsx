import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts, getPostById } from "@/lib/posts";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan | DanaKasa",
      description: "Artikel yang kamu cari tidak tersedia.",
    };
  }
  return {
    title: `${post.title} | DanaKasa`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const post = getPostById(id);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {!post ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20">
              <User className="h-8 w-8 text-brand-400" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-ink dark:text-neutral-50 md:text-3xl">
              Artikel Tidak Ditemukan
            </h1>
            <p className="mt-3 max-w-md text-neutral-500 dark:text-neutral-400">
              Sepertinya artikel dengan ID &quot;{id}&quot; sudah tidak tersedia
              atau belum pernah ada. Yuk kembali menjelajah artikel lainnya.
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5 hover:bg-brand-700 active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Blog
            </Link>
          </div>
        ) : (
          <article className="mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Blog
            </Link>

            <div
              className={`relative mt-6 flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-8 md:min-h-[380px] md:p-12 ${post.imageUrl}`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/95 px-4 py-1.5 text-sm font-semibold text-brand-600 shadow-sm">
                  {post.category}
                </span>
                <post.Icon className="h-10 w-10 text-white/20 md:h-14 md:w-14" />
              </div>

              <div>
                <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
                  {post.title}
                </h1>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-3xl">
              <p className="text-lg font-medium leading-relaxed text-ink dark:text-neutral-50">
                {post.excerpt}
              </p>
              <div className="mt-8 space-y-6">
                {post.body.map((paragraph, index) => (
                  <p
                    key={index}
                    className="leading-[1.9] text-neutral-600 dark:text-neutral-400"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl bg-white p-6 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:ring-neutral-800 sm:flex-row">
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-ink dark:text-neutral-50">
                    Siap mengatur keuanganmu?
                  </p>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Coba kalkulator finansial kami yang gratis.
                  </p>
                </div>
                <Link
                  href="/tools"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-700"
                >
                  Kunjungi Kalkulator
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-400"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Blog
                </Link>
              </div>
            </div>
          </article>
        )}
      </main>
      <Footer />
    </>
  );
}