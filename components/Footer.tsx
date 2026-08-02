import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import {
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/SocialIcon";
import { navLinks, site } from "@/lib/site";

type Social = {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const socials: Social[] = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
];

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-[#d4e6fa] to-[#e7dff9] text-neutral-800">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-xl font-bold text-ink transition-opacity hover:opacity-70"
            >
              {site.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {site.description}
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-neutral-700 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-brand-500"
                >
                  <social.Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-ink">Navigation</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-700 transition-colors hover:text-brand-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold text-ink">Information</h4>
            <div className="mt-4 space-y-2.5 text-sm text-neutral-700">
              <p>{site.phone}</p>
              <p>{site.email}</p>
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

        <div className="my-10 border-t border-neutral-900/15" />

        <div className="text-center text-sm text-neutral-600">
          © 2025 Finansial website. Designed by{" "}
          <Link href="/" className="font-medium text-brand-500 hover:underline">
            DanaKasa
          </Link>
        </div>
      </div>
    </footer>
  );
}