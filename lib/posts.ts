import {
  AlertTriangle,
  BookOpen,
  Coins,
  GraduationCap,
  PiggyBank,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Category = "Finansial" | "Investasi" | "Keluarga" | "Pemula";

export type Post = {
  id: number;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  imageUrl: string;
  Icon: LucideIcon;
  author: string;
  body: string[];
};

export const posts: Post[] = [
  {
    id: 1,
    title: "Panduan Lengkap Membangun Dana Darurat untuk Pemula",
    excerpt:
      "Dana darurat adalah fondasi keuangan yang sehat. Pelajari cara menghitung kebutuhanmu, mulai menabung secara rutin, dan menghindari jebakan gaya hidup.",
    category: "Finansial",
    date: "28 Jul 2026",
    readTime: "8 menit baca",
    imageUrl: "from-brand-600 to-brand-800",
    Icon: PiggyBank,
    author: "Tim DanaKasa",
    body: [
      "Dana darurat adalah tabungan untuk menghadapi situasi tak terduga. Contohnya kehilangan pekerjaan, sakit, atau biaya perbaikan mendadak. Fungsinya bukan untuk mencari untung, melainkan untuk menjaga keuangan tetap aman saat masa sulit datang.",
      "Tanpa dana darurat, banyak orang terpaksa meminjam uang atau memakai kartu kredit. Akibatnya beban keuangan semakin berat dalam jangka panjang. Karena itu setiap upaya menabung sekarang sangat berharga.",
      "Langkah pertama adalah menentukan angkanya. Aturan sederhananya, siapkan enam sampai dua belas kali pengeluaran bulanan. Jika kamu masih lajang dengan penghasilan stabil, enam kali sudah cukup. Jika kamu menanggung keluarga, jadikan dua belas kali agar lebih aman.",
      "Cara terbaik adalah menyisihkan uang di awal bulan, lalu otomatiskan ke rekening tabungan yang terpisah. Mulai dari nominal kecil dan naikkan secara bertahap. Konsisten menabung lebih penting daripada jumlah besar sekali waktu.",
    ],
  },
  {
    id: 2,
    title: "Cara Memulai Investasi dengan Modal Kecil",
    excerpt:
      "Tidak perlu modal besar untuk mulai berinvestasi. Kenali instrumen yang sederhana dan biasakan menabung yang membawa dampak besar.",
    category: "Investasi",
    date: "15 Jul 2026",
    readTime: "6 menit baca",
    imageUrl: "from-emerald-500 to-teal-800",
    Icon: TrendingUp,
    author: "Tim DanaKasa",
    body: [
      "Banyak orang menunda berinvestasi karena merasa uangnya masih sedikit. Padahal waktu memulai jauh lebih berpengaruh daripada besar kecilnya modal.",
      "Reksa dana adalah jembatan yang baik untuk pemula. Kamu bisa mulai dengan nominal kecil, dan risikonya tersebar ke banyak aset. Semua dikelola oleh manajer profesional sehingga tidak perlu pusing memantau pasar.",
      "Keuntungan terbesar datang dari kebiasaan, bukan dari sekali setoran. Sisihkan sepuluh persen dari gaji setiap bulan, lalu biarkan bertumbuh. Jumlah kecil yang rutin akan tetap menumpuk hasil secara wajar.",
    ],
  },
  {
    id: 3,
    title: "Emas vs Reksa Dana: Mana yang Lebih Cocok untuk Kamu?",
    excerpt:
      "Emas dan reksa dana adalah dua instrumen favorit masyarakat Indonesia. Pahami perbedaan risiko dan potensi hasil sebelum memilih.",
    category: "Investasi",
    date: "2 Jul 2026",
    readTime: "5 menit baca",
    imageUrl: "from-amber-500 to-orange-800",
    Icon: Coins,
    author: "Tim DanaKasa",
    body: [
      "Emas adalah instrumen yang populer untuk berlindung nilai. Nilainya biasanya tetap terjaga saat harga gejolak. Emas juga mudah dibeli dan dijual kapan saja.",
      "Reksa dana menawarkan cara berinvestasi yang lebih praktis. Kamu tidak perlu memilih barang atau saham sendiri. Modal yang dibutuhkan pun kecil, dan sisanya dikelola oleh profesional.",
      "Keduanya tidak harus saling bertentangan. Gabungkan emas sebagai pelindung dan reksa dan sebagai pengembang nilai. Sesuaikan porsinya dengan kondisi dan tujuan keuanganmu.",
    ],
  },
  {
    id: 4,
    title: "Mengatur Keuangan Keluarga di Tengah Tekanan Inflasi",
    excerpt:
      "Inflasi menggerus daya beli. Susun anggaran keluarga yang fleksibel, kurangi pengeluaran boros, dan jaga tabunganmu tetap aman.",
    category: "Keluarga",
    date: "20 Jun 2026",
    readTime: "7 menit baca",
    imageUrl: "from-sky-500 to-blue-800",
    Icon: Users,
    author: "Tim DanaKasa",
    body: [
      "Saat inflasi tinggi, harga kebutuhan pokok terus naik. Keluarga perlu menyesuaikan anggaran bulanan agar keuangan tetap sehat. Membuat anggaran yang jelas adalah langkah awal menghadapi kenaikan harga.",
      "Langkah pertama adalah mencatat semua pengeluaran selama sebulan. Dari catatan itu langsung terlihat mana pengeluaran penting dan mana yang kurang penting. Sisanya dipangkas dan digeser ke pos yang benar.",
      "Kurangi pengeluaran berlebihan, lalu pindahkan sebagian ke tabungan. Jangan pernah menghentikan kebiasaan menabung karena inflasi. Justru saat seperti ini tabungan menjadi penopang yang paling berharga.",
    ],
  },
  {
    id: 5,
    title: "Mempersiapkan Dana Pendidikan Anak Sejak Dini",
    excerpt:
      "Biaya pendidikan selalu naik setiap tahun. Hitung kebutuhan masa depan sejak sekarang untuk masa depan anakmu.",
    category: "Keluarga",
    date: "5 Jun 2026",
    readTime: "6 menit baca",
    imageUrl: "from-rose-500 to-pink-800",
    Icon: GraduationCap,
    author: "Tim DanaKasa",
    body: [
      "Biaya sekolah selalu naik tiap tahun, dari bangku dasar sampai kuliah. Kenaikannya biasanya lebih tinggi dari inflasi umum. Karena itu persiapan dana harus dimulai sejak awal.",
      "Cara menghitungnya mudah. Perkirakan biaya hari ini, lalu dikalikan dengan asumsi inflasi, katakan mendekati sepuluh persen per tahun. Hasil itu dibagi waktu yang tersedia menjadi target tabungan yang harus disisihkan.",
      "Semakin lama waktumu, semakin ringan tabungan bulanan yang harus disiapkan. Pilih instrumen yang sesuai dengan jangka waktu tersebut. Mulailah dengan nominal kecil; yang terpenting segera mulai dan tetap tekun."
    ],
  },
  {
    id: 6,
    title: "Memahami Saham, Obligasi, dan Deposito",
    excerpt:
      "Saham, obligasi, dan deposito adalah alat investasi dasar. Pahami risiko dan keuntungan ketiganya dengan simpel.",
    category: "Pemula",
    date: "24 Mei 2026",
    readTime: "9 menit baca",
    imageUrl: "from-violet-500 to-purple-900",
    Icon: BookOpen,
    author: "Tim DanaKasa",
    body: [
      "Saham berarti kamu memiliki sebagian kecil dari sebuah perusahaan. Nilainya bisa naik turun mengikuti keadaan pasar. Untuk itu saham cocok jika dimiliki dalam jangka panjang.",
      "Obligasi adalah surat pinjaman kepada negara atau perusahaan. Kamu menerima bunga secara rutin sebagai gantinya. Risikonya lebih rendah daripada saham dan cocok untuk jangka menengah.",
      "Deposito adalah tabungan berjangka dengan bunga yang pasti. Risikonya sangat kecil dan hasilnya terjamin sampai jatuh tempo. Cocok untuk dana yang akan dipakai dalam waktu dekat.",
    ],
  },
  {
    id: 7,
    title: "Hindari Kesalahan Keuangan Generasi Muda",
    excerpt:
      "Gaya hidup mewah, utang konsumtif, dan tidak mencatat pengeluaran dapat menggagalkan tujuan keuangan.",
    category: "Pemula",
    date: "10 Mei 2026",
    readTime: "5 menit baca",
    imageUrl: "from-cyan-500 to-teal-900",
    Icon: AlertTriangle,
    author: "Tim DanaKasa",
    body: [
      "Salah satu kesalahan terbesar adalah memaksakan gaya hidup mewah. Gaya hidup sebaiknya mengikuti penghasilan, bukan keinginan. Uang yang terbuang untuk gengsi sebaiknya dipindahkan ke tabungan.",
      "Utang untuk kesenangan sesaat juga sering merugikan. Gunakan kartu kredit dengan bijak dan lunasi penuh setiap bulan. Jangan biarkan cicilan menguras uang yang seharusnya bisa ditabung.",
      "Kesalahan yang paling mendasar adalah tidak pernah mencatat. Tanpa catatan, kamu tidak tahu ke mana uang pergi setiap bulan. Mulailah mencatat tiap pengeluaran, lalu jadikan kebiasaan.",
    ],
  },
  {
    id: 8,
    title: "Strategi Mencapai Kemandirian Finansial di Usia Muda",
    excerpt:
      "Kekayaan tidak dibangun dari gaji besar saja. Butuh kebiasaan konsisten dan strategi berinvestasi yang tepat.",
    category: "Investasi",
    date: "28 Apr 2026",
    readTime: "7 menit baca",
    imageUrl: "from-indigo-600 to-slate-900",
    Icon: Target,
    author: "Tim DanaKasa",
    body: [
      "Kemandirian keuangan tidak datang dengan sendirinya. Butuh tujuan yang jelas, seperti dana rumah, pendidikan, atau pensiun. Pecah tujuan besar menjadi langkah kecil yang mudah dipantau setiap bulannya.",
      "Atur alokasi keuangan dengan cara yang sederhana, seperti metode 50/30/20. Pakai lima puluh persen untuk kebutuhan dan tiga puluh persen untuk keinginan. Sisanya dua puluh persen langsung ditabung dan diinvestasikan.",
      "Yang terakhir adalah konsistensi jangka panjang. Investasi otomatis, evaluasi berkala, dan nikmati proses yang pelan. Kemandirian finansial adalah hasil dari kebiasaan dan kesabaran.",
    ],
  },
];

export function getPostById(id: string | number): Post | undefined {
  return posts.find((post) => post.id === Number(id));
}