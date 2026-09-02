export const siteUrl = "https://danakasa.vercel.app";

export const site = {
  name: "DanaKasa",
  description:
    "DanaKasa adalah sebuah tempat dimana kita bisa belajar finansial secara gratis, serta menyajikan konten yang uptodate dan sesuai dengan kebutuhan masyarakat agar masyarakat bisa melek tentang finansial keuangan",
  email: "danakasafins@gmail.com",
  phone: "+628182299930",
  address: ["Finansial Learning,", "Jalan Karang annyar,", "Badung, Bali"],
};

export const socials = {
  instagram: "#",
  twitter: "#",
  linkedin: "#",
};

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Alat", href: "/tools" },
  { label: "Kontak", href: "/#contact" },
];