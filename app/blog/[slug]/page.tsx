import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, Clock, Tag, User } from "lucide-react";
import { posts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";
import { generateArticleJsonLd } from "@/lib/seo";
import { Markdown } from "./markdown";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang kamu cari tidak tersedia.",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "DanaKasa",
      authors: [post.author],
      images: [
        {
          url: "/og-default.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/og-default.png"],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const relatedPosts = post ? getRelatedPosts(post, 3) : [];

  const articleJsonLd = post ? generateArticleJsonLd(post) : null;

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd),
          }}
        />
      )}
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
              Sepertinya artikel yang kamu cari sudah tidak tersedia
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

              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 ring-1 ring-brand-100 dark:bg-brand-900/20 dark:text-brand-400 dark:ring-brand-900/50"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8 space-y-6">
                {post.body.map((paragraph, index) => (
                  <Markdown key={index} content={paragraph} />
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

              {relatedPosts.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-ink dark:text-neutral-50">
                    Artikel Terkait
                  </h2>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        href={`/blog/${related.slug}`}
                        className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-900 dark:ring-neutral-800"
                      >
                        <div
                          className={`flex h-32 items-center justify-center bg-gradient-to-br ${related.imageUrl}`}
                        >
                          <related.Icon className="h-10 w-10 text-white/25 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-sm font-bold text-ink dark:text-neutral-50 line-clamp-2">
                            {related.title}
                          </h3>
                          <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-2">
                            {related.excerpt}
                          </p>
                          <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500">
                            <span>{related.date}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {related.readTime}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

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
    </>
  );
}
