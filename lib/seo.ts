import { siteUrl, site, socials } from "./site";

type JsonLdOrganization = {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  telephone: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  sameAs: string[];
};

type JsonLdArticle = {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  author: { "@type": string; name: string };
  publisher: {
    "@type": string;
    name: string;
    logo: { "@type": string; url: string };
  };
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
};

type JsonLdFAQPage = {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
};

export function generateOrganizationJsonLd(): JsonLdOrganization {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/logo/danakasa-icon.png`,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.join(", "),
      addressLocality: "Badung",
      addressCountry: "ID",
    },
    sameAs: Object.values(socials).filter((url) => url !== "#"),
  };
}

export function generateArticleJsonLd(post: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author: string;
}): JsonLdArticle {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo/danakasa-icon.png` },
    },
    datePublished: parseIndonesianDateToISO(post.date),
    dateModified: parseIndonesianDateToISO(post.date),
    image: `${siteUrl}/og-default.png`,
    url: `${siteUrl}/blog/${post.slug}`,
  };
}

export function generateFAQJsonLd(
  items: Array<{ question: string; answer: string }>,
): JsonLdFAQPage {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function parseIndonesianDateToISO(dateStr: string): string {
  const months: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    Mei: "05",
    Jun: "06",
    Jul: "07",
    Ags: "08",
    Sep: "09",
    Okt: "10",
    Nov: "11",
    Des: "12",
  };
  const parts = dateStr.split(" ");
  if (parts.length === 3) {
    const day = parts[0].padStart(2, "0");
    const month = months[parts[1]] || "01";
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return dateStr;
}
