"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Newspaper, Search } from "lucide-react";
import { posts, type Category, type Post } from "@/lib/posts";

const MotionLink = motion.create(Link);

const categories: Array<"Semua" | Category> = [
  "Semua",
  "Finansial",
  "Investasi",
  "Keluarga",
  "Pemula",
];

const searchInputClasses =
  "w-full rounded-full bg-white py-3.5 pl-12 pr-4 text-sm text-ink shadow-sm ring-1 ring-neutral-200 transition placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 dark:bg-neutral-900 dark:text-neutral-50 dark:ring-neutral-800 dark:placeholder:text-neutral-500";

const cardClasses =
  "group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-neutral-900 dark:ring-neutral-800";

function PostImage({
  post,
  tall = false,
}: {
  post: Post;
  tall?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${
        tall ? "h-56 md:h-auto" : "h-48"
      }`}
    >
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${post.imageUrl}`}
      >
        <post.Icon
          className={`h-16 w-16 text-white/25 transition-transform duration-500 group-hover:scale-110 ${
            tall ? "md:h-20 md:w-20" : ""
          }`}
        />
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-600 shadow-sm">
        {post.category}
      </span>
    </div>
  );
}

export default function BlogContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "Semua" | Category
  >("Semua");

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const visiblePosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesCategory =
          selectedCategory === "Semua" || post.category === selectedCategory;
        const matchesQuery =
          trimmedQuery === "" ||
          post.title.toLowerCase().includes(trimmedQuery) ||
          post.excerpt.toLowerCase().includes(trimmedQuery);
        return matchesCategory && matchesQuery;
      }),
    [selectedCategory, trimmedQuery],
  );

  const isDefaultView = trimmedQuery === "" && selectedCategory === "Semua";
  const featuredPost = isDefaultView ? visiblePosts[0] : null;
  const gridPosts = featuredPost ? visiblePosts.slice(1) : visiblePosts;
  const isEmpty = !featuredPost && gridPosts.length === 0;

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
            <Newspaper className="h-4 w-4" />
            Blog DanaKasa
          </span>
          <h1 className="mt-4 text-3xl font-bold text-ink dark:text-neutral-50 md:text-5xl">
            Artikel &amp; Wawasan Finansial
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
            Kumpulan artikel singkat untuk membantumu mengelola keuangan,
            berinvestasi cerdas, dan merencanakan masa depan lebih tenang.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
            <input
              type="search"
              aria-label="Cari artikel"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={searchInputClasses}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={active}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "bg-brand-600 text-white shadow-md shadow-brand-500/25"
                      : "bg-white text-neutral-500 ring-1 ring-neutral-200 hover:text-brand-600 hover:ring-brand-300 dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-800 dark:hover:text-brand-400 dark:hover:ring-brand-700"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <AnimatePresence mode="popLayout">
            {featuredPost ? (
              <MotionLink
                key="featured"
                layout
                href={`/blog/${featuredPost.slug}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-neutral-900 dark:ring-neutral-800 md:grid-cols-2"
              >
                <PostImage post={featuredPost} tall />
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 ring-1 ring-brand-100 dark:bg-brand-900/20 dark:text-brand-400 dark:ring-brand-900/50">
                    <Newspaper className="h-3.5 w-3.5" />
                    Artikel Pilihan
                  </span>
                  <h2 className="mt-4 text-2xl font-bold text-ink dark:text-neutral-50 md:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500">
                    <span>{featuredPost.date}</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </MotionLink>
            ) : null}

            {isEmpty ? (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <Search className="mx-auto h-10 w-10 text-neutral-300 dark:text-neutral-600" />
                <p className="mt-4 font-semibold text-ink dark:text-neutral-50">
                  Tidak ada artikel ditemukan
                </p>
                <p className="mt-1 text-sm text-neutral-400 dark:text-neutral-500">
                  Coba ubah kata kunci pencarian atau pilih kategori lain.
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {gridPosts.length > 0 ? (
            <motion.div
              layout
              className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {gridPosts.map((post) => (
                  <MotionLink
                    layout
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={cardClasses}
                  >
                    <PostImage post={post} />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-ink dark:text-neutral-50 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs text-neutral-400 dark:border-neutral-800 dark:text-neutral-500">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </MotionLink>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : null}
        </div>
      </section>
    </>
  );
}
