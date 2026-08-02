export const site = {
  name: "DanaKasa",
  description:
    "Danakasa adalah sebuah tempat dimana kita bisa belajar finansial secara gratis, serta menyajikan konten yang uptodate dan sesuai dengan kebutuhan masyarakat agar masyarakat bisa melek tentang finansial keuangan",
  email: "danakasafins@gmail.com",
  phone: "+628182299930",
  address: ["Finansial Learning,", "Jalan Karang annyar,", "Badung, Bali"],
};

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "/#contact" },
];