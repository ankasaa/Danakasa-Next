import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import TestimonialSlider from "@/components/TestimonialSlider";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";
import { siteUrl } from "@/lib/site";
import { generateOrganizationJsonLd, generateFAQJsonLd } from "@/lib/seo";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Beranda",
  openGraph: {
    title: "DanaKasa — Solusi Cerdas Finansial untuk Semua",
    url: siteUrl,
  },
};

export default function Home() {
  const organizationJsonLd = generateOrganizationJsonLd();
  const faqJsonLd = generateFAQJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main>
        <Hero />
        <About />
        <Features />
        <TestimonialSlider />
        <FaqAccordion />
        <ContactForm />
      </main>
    </>
  );
}