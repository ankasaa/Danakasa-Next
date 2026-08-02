export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "50+", label: "Trust" },
  { value: "20", label: "Industry experts" },
  { value: "3", label: "Years in industry" },
];

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: "/icon/ic1.png",
    title: "Ahli Finansial Berpengalaman",
    description:
      "Belajar dari praktisi dan edukator finansial yang paham kebutuhan pengelolaan uang di dunia nyata.",
  },
  {
    icon: "/icon/ic2.png",
    title: "Simulasi & Perhitungan Nyata",
    description:
      "Bangun pemahaman melalui kalkulator interaktif, mulai dari dana darurat hingga rencana pendidikan.",
  },
  {
    icon: "/icon/ic3.png",
    title: "Rencana yang Disesuaikan",
    description:
      "Dapatkan rekomendasi perencanaan keuangan sesuai penghasilan, tujuan, dan gaya hidup Anda.",
  },
  {
    icon: "/icon/ic4.png",
    title: "Terbukti Membantu Ribuan Pengguna",
    description:
      "Lebih dari 1.000 orang sudah terbantu merencanakan keuangan dan mencapai target finansial mereka.",
  },
  {
    icon: "/icon/ic5.png",
    title: "Komunitas Finansial Supportive",
    description:
      "Bergabung dengan komunitas untuk berbagi pengalaman, bertanya, dan mendapatkan saran langsung.",
  },
  {
    icon: "/icon/ic6.png",
    title: "Akses Kapan Saja, Di Mana Saja",
    description:
      "Gunakan semua fitur dan kalkulator dari perangkat apa pun, 24/7, tanpa biaya tambahan.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rachel Adams",
    role: "Freelancer",
    quote:
      "These courses taught me not only technical skills but also how to think like a problem solver. Highly recommend this platform to anyone in tech!",
    image: "https://i.pravatar.cc/100?img=7",
    rating: 5,
  },
  {
    name: "Mia Frey",
    role: "Student at TechPro",
    quote:
      "I was looking for a platform that could take my IT skills to the next level, and this was it! The instructors are knowledgeable and approachable.",
    image: "https://i.pravatar.cc/100?img=8",
    rating: 5,
  },
  {
    name: "Emily Carter",
    role: "Developer at CodeCo",
    quote:
      "The hands-on approach of these courses has completely transformed the way I learn. The lessons are engaging, and the projects are super practical!",
    image: "https://i.pravatar.cc/100?img=9",
    rating: 5,
  },
  {
    name: "Sarah Kim",
    role: "Junior Developer",
    quote: "Great instructors and fantastic content. It helped me land my first job in IT!",
    image: "https://i.pravatar.cc/100?img=10",
    rating: 4,
  },
  {
    name: "Linda Lee",
    role: "Data Analyst",
    quote:
      "Amazing platform! It boosted my confidence and expanded my knowledge greatly.",
    image: "https://i.pravatar.cc/100?img=11",
    rating: 5,
  },
  {
    name: "Carlos Gomez",
    role: "Network Specialist",
    quote:
      "The courses are updated regularly, which keeps me up to date with the latest trends.",
    image: "https://i.pravatar.cc/100?img=12",
    rating: 4,
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Apa saja fitur yang tersedia di website ini?",
    answer:
      "Kami menyediakan berbagai kalkulator finansial seperti kalkulator dana darurat, perencanaan pendidikan, dan pengelolaan anggaran, lengkap dengan panduan cara menggunakannya.",
  },
  {
    question: "Siapa yang bisa menggunakan kalkulator finansial ini?",
    answer:
      "Siapa pun yang ingin mengatur keuangannya—mulai dari pelajar, karyawan, wirausaha, hingga orang tua—bisa menggunakan alat ini secara gratis.",
  },
  {
    question: "Apakah tersedia panduan perencanaan keuangan?",
    answer:
      "Tentu! Kami menyediakan artikel edukasi dan tips praktis seputar perencanaan keuangan, menabung, investasi, dan mengatur anggaran.",
  },
  {
    question: "Apakah website ini gratis?",
    answer:
      "Ya, semua fitur dan kalkulator dapat digunakan secara gratis tanpa biaya tersembunyi.",
  },
  {
    question: "Apakah saya perlu membuat akun untuk menggunakan fitur ini?",
    answer:
      "Tidak perlu. Anda bisa langsung menggunakan semua kalkulator tanpa mendaftar, namun membuat akun akan memudahkan penyimpanan riwayat perhitungan Anda.",
  },
  {
    question: "Apakah saya bisa mencoba materi gratis?",
    answer:
      "Tentu, kami menyediakan beberapa materi gratis agar Anda bisa merasakan manfaatnya sebelum memutuskan untuk belajar lebih lanjut.",
  },
];