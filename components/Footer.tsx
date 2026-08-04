import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/SocialIcon";
import { navLinks, site } from "@/lib/site";

type Social = {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const socials: Social[] = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "Twitter", Icon: TwitterIcon },
  { label: "LinkedIn", Icon: LinkedinIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              aria-label="DanaKasa — Beranda"
              className="-ml-2 inline-flex items-center transition-opacity duration-200 hover:opacity-80 md:-ml-4"
            >
              <Image
                src="/logo/danakasa-hitam.png"
                alt="DanaKasa"
                width={192}
                height={48}
                className="block h-12 w-auto object-contain transform scale-[3] origin-left md:h-16 md:scale-[3.5] dark:hidden"
              />
              <Image
                src="/logo/danakasa-putih.png"
                alt="DanaKasa"
                width={192}
                height={48}
                className="hidden h-12 w-auto object-contain transform scale-[3] origin-left md:h-16 md:scale-[3.5] dark:block"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {site.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <span
                  key={social.label}
                  role="img"
                  aria-label={`${social.label} — segera hadir`}
                  title="Segera Hadir"
                  className="flex h-10 w-10 cursor-default items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm ring-1 ring-neutral-200 transition-all duration-200 hover:-translate-y-1 hover:bg-neutral-200 hover:text-brand-600 hover:ring-neutral-300 dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-brand-400 dark:hover:ring-neutral-600"
                >
                  <social.Icon className="h-[18px] w-[18px]" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-ink dark:text-white">Navigation</h4>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors duration-200 hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-ink dark:text-white">Information</h4>
            <div className="mt-6 space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <p className="transition-colors duration-200 hover:text-brand-600 dark:hover:text-brand-400">
                {site.phone}
              </p>
              <p className="transition-colors duration-200 hover:text-brand-600 dark:hover:text-brand-400">
                {site.email}
              </p>
              <p>
                {site.address.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < site.address.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        <div className="my-10 border-t border-neutral-200 dark:border-neutral-800" />

        <div className="text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Finansial website. Designed by{" "}
          <Link
            href="/"
            className="font-medium text-brand-600 transition-colors duration-200 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            DanaKasa
          </Link>
        </div>
      </div>
    </footer>
  );
}