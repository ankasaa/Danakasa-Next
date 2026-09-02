import type { Metadata } from "next";

export const metadata: Metadata = {};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}