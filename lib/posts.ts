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
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: string[];
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
    slug: "panduan-lengkap-membangun-dana-darurat-untuk-pemula",
    title: "Panduan Lengkap Membangun Dana Darurat untuk Pemula",
    excerpt:
      "Dana darurat adalah fondasi keuangan yang sehat. Pelajari cara menghitung kebutuhanmu, mulai menabung secara rutin, dan menghindari jebakan gaya hidup.",
    category: "Finansial",
    tags: ["dana darurat", "menabung", "perencanaan keuangan"],
    date: "28 Jul 2026",
    readTime: "8 menit baca",
    imageUrl: "from-brand-600 to-brand-800",
    Icon: PiggyBank,
    author: "Tim DanaKasa",
    body: [
      `## Panduan Lengkap Membangun Dana Darurat untuk Pemula

Dana darurat (*emergency fund*) adalah pilar paling fundamental dalam piramida perencanaan keuangan yang sehat. Secara definisi, dana ini adalah simpanan uang tunai yang sengaja dipisahkan untuk menghadapi situasi krisis atau pengeluaran mendesak yang tidak terduga. 

Contoh situasi darurat meliputi pemutusan hubungan kerja (PHK), biaya medis mendadak, atau perbaikan aset krusial seperti kendaraan dan rumah. Perlu dipahami bahwa fungsi utama dana darurat bukanlah untuk mencari imbal hasil (*return*) atau keuntungan investasi, melainkan untuk menyediakan likuiditas (uang tunai yang cepat cair) dan jaring pengaman (*safety net*) saat masa sulit datang.

### Mengapa Dana Darurat Sangat Krusial?
Tanpa adanya alokasi dana darurat, seseorang akan sangat rentan terhadap guncangan ekonomi. Ketika krisis terjadi, mereka sering kali terpaksa mengambil keputusan finansial yang merugikan, seperti mencairkan investasi saat harganya sedang turun, meminjam uang kepada kerabat, atau lebih buruk lagi, terjebak pada jeratan utang berbunga tinggi seperti pinjaman *online* atau kartu kredit. Memiliki dana darurat berarti Anda membeli ketenangan pikiran (*peace of mind*) dan mencegah masalah jangka pendek berubah menjadi beban finansial jangka panjang.

### Berapa Idealnya Jumlah Dana Darurat?
Langkah pertama untuk memulai adalah menghitung target angkanya. Target ini dihitung berdasarkan **pengeluaran rutin bulanan** (kebutuhan pokok, cicilan tetap, tagihan), bukan berdasarkan pendapatan total. Aturan standar perencana keuangan merekomendasikan:
- **3 hingga 6 Bulan Pengeluaran:** Sangat ideal bagi mereka yang masih lajang, tidak memiliki tanggungan, dan berstatus sebagai karyawan tetap dengan arus kas yang stabil.
- **9 hingga 12 Bulan Pengeluaran:** Diwajibkan bagi mereka yang sudah berkeluarga, memiliki anak, atau berprofesi sebagai pekerja lepas (*freelancer*) dan pengusaha yang arus kas bulanannya cenderung berfluktuasi.

### Dimana Sebaiknya Menyimpan Dana Darurat?
Karena fungsinya untuk keadaan darurat, dana ini harus disimpan pada instrumen yang sangat likuid (mudah ditarik kapan saja) dan rendah risiko. Hindari menyimpan dana darurat di saham atau kripto karena volatilitasnya tinggi. Pilihan terbaik adalah:
1. Rekening tabungan bank terpisah (hindari penggunaan kartu debit harian).
2. Rekening Tabungan Bunga Tinggi (*High-Yield Savings Account*).
3. Reksadana Pasar Uang (RDPU) karena risikonya sangat rendah dan pencairannya relatif cepat.

### Langkah Memulai Menabung
Membangun dana darurat tidak harus dilakukan dalam semalam. Cara paling efektif adalah dengan **otomatisasi**. Sisihkan minimal 10% hingga 20% dari pendapatan Anda tepat di awal bulan (saat gajian), lalu transfer secara otomatis ke rekening khusus. Konsistensi menabung jauh lebih krusial daripada besaran nominal sesaat. Selalu ingat untuk mengontrol inflasi gaya hidup agar target keamanan finansial Anda lebih cepat tercapai.`,
    ],
  },
  {
    id: 2,
    slug: "cara-memulai-investasi-dengan-modal-kecil",
    title: "Cara Memulai Investasi dengan Modal Kecil",
    excerpt:
      "Tidak perlu modal besar untuk mulai berinvestasi. Kenali instrumen yang sederhana dan biasakan menabung yang membawa dampak besar.",
    category: "Investasi",
    tags: ["investasi", "pemula", "reksa dana"],
    date: "15 Jul 2026",
    readTime: "6 menit baca",
    imageUrl: "from-emerald-500 to-teal-800",
    Icon: TrendingUp,
    author: "Tim DanaKasa",
    body: [
      `## Cara Memulai Investasi dengan Modal Kecil

Banyak orang menunda berinvestasi karena merasa uangnya masih sedikit. Padahal waktu memulai jauh lebih berpengaruh daripada besar kecilnya modal. Yang terpenting adalah **konsistensi**, bukan nominal.

### Mengapa Waktu Lebih Penting dari Modal?
Bayangkan dua orang. Orang A mulai investasi Rp500.000/bulan sejak usia 25 tahun. Orang B baru mulai di usia 35 tahun dengan Rp1.500.000/bulan. Dengan asumsi return 10% per tahun, Orang A justru memiliki lebih banyak di usia 55 tahun karena waktu compounding yang lebih lama.

> "Waktu di pasar (*time in the market*) lebih penting daripada waktu yang tepat (*timing the market*)."

### Instrumen Investasi untuk Pemula

**1. Reksa Dana Pasar Uang (RDPU)**
Cocok untuk dana darurat atau jangka pendek (1-12 bulan). Risiko sangat rendah, return lebih tinggi dari tabungan biasa. Modal mulai dari Rp10.000.

**2. Reksa Dana Pendapatan Tetap (RDPT)**
Cocok untuk jangka menengah (1-3 tahun). Return lebih tinggi dari RDPU dengan risiko sedang. Cocok untuk dana liburan atau beli kendaraan.

**3. Reksa Dana Campuran**
Menggabungkan saham dan obligasi. Cocok untuk jangka menengah-panjang (3-5 tahun). Risiko dan return seimbang.

**4. Reksa Dana Saham**
Cocok untuk jangka panjang (5+ tahun). Return paling tinggi tapi volatilitas juga tinggi. Jangan panik saat pasar turun.

### Langkah Memulai
1. **Tentukan tujuan** — Untuk apa investasi ini? Dana darurat, pendidikan, atau pensiun?
2. **Pilih platform** — Aplikasi seperti Bareksa, Bibit, atau StockBit memudahkan pemula.
3. **Mulai kecil** — Sisihkan 10% dari gaji. Tidak harus besar, yang penting rutin.
4. **Otomatisasi** — Atur auto-debit agar tidak tergoda untuk membelanjakan uangnya.

Kebiasaan kecil yang dilakukan secara konsisten akan menghasilkan dampak besar dalam jangka panjang.`,
    ],
  },
  {
    id: 3,
    slug: "emas-vs-reksa-dana-mana-yang-lebih-cocok-untuk-kamu",
    title: "Emas vs Reksa Dana: Mana yang Lebih Cocok untuk Kamu?",
    excerpt:
      "Emas dan reksa dana adalah dua instrumen favorit masyarakat Indonesia. Pahami perbedaan risiko dan potensi hasil sebelum memilih.",
    category: "Investasi",
    tags: ["emas", "reksa dana", "perbandingan investasi"],
    date: "2 Jul 2026",
    readTime: "5 menit baca",
    imageUrl: "from-amber-500 to-orange-800",
    Icon: Coins,
    author: "Tim DanaKasa",
    body: [
      `## Emas vs Reksa Dana: Mana yang Lebih Cocok untuk Kamu?

Emas dan reksa dana adalah dua instrumen investasi paling populer di Indonesia. Keduanya memiliki kelebihan dan kekurangan masing-masing. Pemilihan yang tepat tergantung pada tujuan, jangka waktu, dan profil risiko kamu.

### Emas: Pelindung Nilai Tradisional

Emas telah digunakan sebagai penyimpan nilai selama ribuan tahun. Keunggulan utama emas adalah:

- **Anti inflasi** — Nilai emas cenderung naik seiring waktu, melindungi daya beli uang kamu.
- **Likuid tinggi** — Mudah dijual kapan saja ke toko emas atau pegadaian.
- **Tidak bergantung pasar** — Nilai emas tidak terpengaruh langsung oleh kondisi pasar saham.

Namun, emas juga memiliki kelemahan:
- Tidak menghasilkan *passive income* (dividen atau bunga).
- Harga bisa stagnan dalam jangka pendek.
- Butuh penyimpanan fisik yang aman.

### Reksa Dana: Investasi Modern yang Praktis

Reksa dana mengumpulkan uang dari banyak investor untuk diinvestasikan oleh manajer profesional. Keunggulannya:

- **Dikelola profesional** — Tidak perlu paham analisis pasar sendiri.
- **Diversifikasi otomatis** — Uangmu tersebar di banyak aset.
- **Modal kecil** — Mulai dari Rp10.000.
- **Bisa auto-invest** — Atur investasi bulanan secara otomatis.

Kekurangannya:
- Ada biaya manajemen (meski kecil).
- Nilai bisa turun dalam jangka pendek.
- Tidak se-likuid emas (butuh 1-3 hari pencairan).

### Kapan Pilih Emas?
- Kamu ingin penyimpan nilai jangka panjang.
- Kamu tidak ingin bergantung pada platform digital.
- Kamu suka memiliki aset fisik.

### Kapan Pilih Reksa Dana?
- Kamu ingin investasi praktis dan terdiversifikasi.
- Kamu ingin memanfaatkan *compounding* dengan auto-invest.
- Kamu memiliki tujuan keuangan spesifik (pendidikan, pensiun).

### Strategi: Gabungkan Keduanya!
Kamu tidak harus memilih salah satu. Strategi yang bijak adalah mengalokasikan:
- **60% Reksa Dana** — Untuk pertumbuhan nilai jangka panjang.
- **40% Emas** — Sebagai pelindung nilai dan diversifikasi.

Sesuaikan porsi dengan kondisi dan tujuan keuanganmu.`,
    ],
  },
  {
    id: 4,
    slug: "mengatur-keuangan-keluarga-di-tengah-tekanan-inflasi",
    title: "Mengatur Keuangan Keluarga di Tengah Tekanan Inflasi",
    excerpt:
      "Inflasi menggerus daya beli. Susun anggaran keluarga yang fleksibel, kurangi pengeluaran boros, dan jaga tabunganmu tetap aman.",
    category: "Keluarga",
    tags: ["keluarga", "inflasi", "anggaran"],
    date: "20 Jun 2026",
    readTime: "7 menit baca",
    imageUrl: "from-sky-500 to-blue-800",
    Icon: Users,
    author: "Tim DanaKasa",
    body: [
      `## Mengatur Keuangan Keluarga di Tengah Tekanan Inflasi

Saat inflasi tinggi, harga kebutuhan pokok terus naik. Keluarga perlu menyesuaikan anggaran bulanan agar keuangan tetap sehat. Membuat anggaran yang jelas adalah langkah awal menghadapi kenaikan harga.

### Langkah 1: Catat Semua Pengeluaran
Langkah pertama adalah mencatat semua pengeluaran selama sebulan. Dari catatan itu langsung terlihat mana pengeluaran penting dan mana yang kurang penting. Gunakan aplikasi seperti Money Manager atau catat manual di spreadsheet.

### Langkah 2: Pisahkan Kebutuhan dan Keinginan
Setelah mencatat, kelompokkan menjadi dua kategori:
- **Kebutuhan (Needs):** Makanan, listrik, air, transportasi, cicilan rumah.
- **Keinginan (Wants):** Jalan-jalan, makan di restoran, belanja online.

Kurangi pos "Keinginan" dan alihkan ke tabungan atau investasi.

### Langkah 3: Gunakan Aturan 50/30/20
Metode sederhana yang bisa diterapkan:
- **50% untuk kebutuhan** — Makanan, transportasi, tagihan.
- **30% untuk keinginan** — Hiburan, belanja, gaya hidup.
- **20% untuk tabungan & investasi** — Dana darurat, reksa dana, emas.

### Langkah 4: Siapkan Dana Darurat
Sisihkan minimal 3-6 bulan pengeluaran keluarga sebagai dana darurat. Ini jaring pengaman jika terjadi PHK atau pengeluaran medis mendadak.

### Tips Menghadapi Inflasi
1. **Beli dalam jumlah besar** — Produk kebutuhan pokok yang tahan lama bisa dibeli saat diskon.
2. **Kurangi jajan di luar** — Masak di rumah jauh lebih hemat.
3. **Manfaatkan promo** — Gunakan cashback dan diskon yang tersedia.
4. **Evaluasi berkala** — Tinjau anggaran setiap 3 bulan sekali.

Jangan pernah menghentikan kebiasaan menabung karena inflasi. Justru saat seperti ini tabungan menjadi penopang yang paling berharga.`,
    ],
  },
  {
    id: 5,
    slug: "mempersiapkan-dana-pendidikan-anak-sejak-dini",
    title: "Mempersiapkan Dana Pendidikan Anak Sejak Dini",
    excerpt:
      "Biaya pendidikan selalu naik setiap tahun. Hitung kebutuhan masa depan sekarang untuk masa depan anakmu.",
    category: "Keluarga",
    tags: ["pendidikan", "anak", "tabungan pendidikan"],
    date: "5 Jun 2026",
    readTime: "6 menit baca",
    imageUrl: "from-rose-500 to-pink-800",
    Icon: GraduationCap,
    author: "Tim DanaKasa",
    body: [
      `## Mempersiapkan Dana Pendidikan Anak Sejak Dini

Biaya sekolah selalu naik tiap tahun, dari bangku dasar sampai kuliah. Kenaikannya biasanya lebih tinggi dari inflasi umum. Karena itu persiapan dana harus dimulai sejak awal.

### Mengapa Penting Memulai Sejak Dini?
Biaya pendidikan di Indonesia naik rata-rata 10-15% per tahun. Jika biaya S1 saat ini Rp100 juta, dalam 18 tahun lagi biayanya bisa mencapai Rp1,2 miliar! Semakin cepat kamu memulai, semakin ringan beban bulanannya berkat *compounding*.

### Cara Menghitung Target Dana Pendidikan
1. **Tentukan biaya hari ini** — Berapa biaya sekolah/kuliah yang diinginkan?
2. **Hitung inflasi pendidikan** — Asumsi 10% per tahun.
3. **Kalikan dengan jangka waktu** — Berapa tahun lagi hingga anak masuk sekolah?
4. **Bagi dengan jangka waktu menabung** — Hasilnya adalah target tabungan bulanan.

Contoh: Biaya kuliah hari ini Rp100 juta. Anak baru kuliah 15 tahun lagi. Dengan inflasi 10%, biaya masa depan = Rp100 juta x (1,10)^15 = Rp417 juta. Jika menabung selama 15 tahun, butuh Rp2,3 juta/bulan.

### Instrumen yang Cocok
- **Tabungan pendidikan** — Beberapa bank menawarkan produk khusus dengan bunga tetap.
- **Reksa Dana Saham** — Untuk jangka panjang (10+ tahun), return lebih tinggi.
- **Asuransi pendidikan** — Sekaligus memberikan perlindungan jiwa.
- **Sukuk/Deposito** — Untuk jangka menengah (5-10 tahun), risiko rendah.

### Tips Praktis
- Mulai segera, meski dengan nominal kecil.
- Atur auto-debit agar konsisten.
- Evaluasi setiap tahun dan tambahkan nominal sesuai inflasi.
- Libatkan pasangan dalam perencanaan.`,
    ],
  },
  {
    id: 6,
    slug: "memahami-saham-obligasi-dan-deposito",
    title: "Memahami Saham, Obligasi, dan Deposito",
    excerpt:
      "Saham, obligasi, dan deposito adalah alat investasi dasar. Pahami risiko dan keuntungan ketiganya dengan simpel.",
    category: "Pemula",
    tags: ["saham", "obligasi", "deposito", "pemula"],
    date: "24 Mei 2026",
    readTime: "9 menit baca",
    imageUrl: "from-violet-500 to-purple-900",
    Icon: BookOpen,
    author: "Tim DanaKasa",
    body: [
      `## Memahami Saham, Obligasi, dan Deposito

Ketiga instrumen ini adalah pilihan utama masyarakat Indonesia untuk mengembangkan uang. Memahami perbedaannya adalah langkah pertama menjadi investor yang bijak.

### Saham: Kepemilikan Perusahaan

Saham berarti kamu memiliki sebagian kecil dari sebuah perusahaan. Nilainya bisa naik turun mengikuti keadaan pasar.

**Kelebihan:**
- Potensi return paling tinggi (rata-rata 10-15% per tahun)
- Bisa mendapat dividen (bagian keuntungan perusahaan)
- Bisa dijual kapan saja saat pasar buka

**Kekurangan:**
- Risiko tinggi — harga bisa turun drastis
- Butuh pemahaman analisis fundamental
- Cocok untuk jangka panjang (5+ tahun)

**Tips untuk pemula:** Mulai dengan reksa dana saham sebelum beli saham langsung. Diversifikasi ke banyak perusahaan.

### Obligasi: Surat Utang

Obligasi adalah surat pinjaman kepada negara atau perusahaan. Kamu menerima bunga secara rutin sebagai gantinya.

**Kelebihan:**
- Return lebih stabil dari saham (6-10% per tahun)
- Bunga dibayarkan secara berkala (biasanya tiap bulan)
- Risiko lebih rendah dari saham

**Kekurangan:**
- Return lebih rendah dari saham
- Harga obligasi bisa turun jika suku bunga naik
- Butuh modal lebih besar untuk beli langsung

**Tips untuk pemula:** Gunakan reksa dana obligasi (RDPT) untuk mulai berinvestasi di obligasi dengan modal kecil.

### Deposito: Tabungan Berjangka

Deposito adalah tabungan berjangka dengan bunga yang pasti. Risikonya sangat kecil dan hasilnya terjamin sampai jatuh tempo.

**Kelebihan:**
- Dijamin LPS (Lembaga Penjamin Simpanan) hingga Rp2 miliar
- Return pasti dan diketahui di awal
- Tidak ada risiko kerugian

**Kekurangan:**
- Return paling rendah (4-6% per tahun)
- Uang terkunci sampai jatuh tempo
- Tidak fleksibel

### Kesimpulan
Pilih instrumen yang sesuai dengan tujuan dan jangka waktu kamu. Untuk jangka panjang, saham atau reksa dana saham. Untuk menengah, obligasi atau reksa dana obligasi. Untuk pendek, deposito atau reksa dana pasar uang.`,
    ],
  },
  {
    id: 7,
    slug: "hindari-kesalahan-keuangan-generasi-muda",
    title: "Hindari Kesalahan Keuangan Generasi Muda",
    excerpt:
      "Gaya hidup mewah, utang konsumtif, dan tidak mencatat pengeluaran dapat menggagalkan tujuan keuangan.",
    category: "Pemula",
    tags: ["kesalahan keuangan", "gaya hidup", "pemula"],
    date: "10 Mei 2026",
    readTime: "5 menit baca",
    imageUrl: "from-cyan-500 to-teal-900",
    Icon: AlertTriangle,
    author: "Tim DanaKasa",
    body: [
      `## Hindari Kesalahan Keuangan Generasi Muda

Generasi muda sering kali terjebak dalam perilaku keuangan yang merugikan masa depan. Berikut adalah kesalahan umum dan cara menghindarinya.

### Kesalahan 1: Gaya Hidup Melebihi Penghasilan

Salah satu kesalahan terbesar adalah memaksakan gaya hidup mewah. Gaya hidup sebaiknya mengikuti penghasilan, bukan keinginan. Uang yang terbuang untuk gengsi sebaiknya dipindahkan ke tabungan.

**Solusi:** Terapkan aturan 50/30/20. Pastikan kebutuhan pokok terpenuhi sebelum menghabiskan uang untuk keinginan.

### Kesalahan 2: Utang Konsumtif

Utang untuk kesenangan sesaat juga sering merugikan. Gunakan kartu kredit dengan bijak dan lunasi penuh setiap bulan. Jangan biarkan cicilan menguras uang yang seharusnya bisa ditabung.

**Solusi:** Hindari utang yang tidak produktif. Jika harus berutang, pastikan cicilan tidak melebihi 30% penghasilan.

### Kesalahan 3: Tidak Mencatat Pengeluaran

Kesalahan yang paling mendasar adalah tidak pernah mencatat. Tanpa catatan, kamu tidak tahu ke mana uang pergi setiap bulan. Mulailah mencatat tiap pengeluaran, lalu jadikan kebiasaan.

**Solusi:** Gunakan aplikasi pencatat keuangan atau spreadsheet sederhana. Evaluasi setiap akhir bulan.

### Kesalahan 4: Tidak Menyiapkan Dana Darurat

Banyak generasi muda yang tidak memiliki dana darurat. Akibatnya, ketika terjadi musibah, mereka terpaksa berutang.

**Solusi:** Sisihkan minimal 3-6 bulan pengeluaran sebagai dana darurat. Simpan di rekening terpisah yang tidak terganggu.

### Kesalahan 5: Menunda Investasi

Semakin lama menunda investasi, semakin berat beban menabung di masa depan karena efek compounding tidak bekerja untukmu.

**Solusi:** Mulai berinvestasi sekarang, meski dengan nominal kecil. Konsistensi lebih penting daripada nominal.`,
    ],
  },
  {
    id: 8,
    slug: "strategi-mencapai-kemandirian-finansial-di-usia-muda",
    title: "Strategi Mencapai Kemandirian Finansial di Usia Muda",
    excerpt:
      "Kekayaan tidak dibangun dari gaji besar saja. Butuh kebiasaan konsisten dan strategi berinvestasi yang tepat.",
    category: "Investasi",
    tags: ["kemandirian finansial", "strategi", "investasi"],
    date: "28 Apr 2026",
    readTime: "7 menit baca",
    imageUrl: "from-indigo-600 to-slate-900",
    Icon: Target,
    author: "Tim DanaKasa",
    body: [
      `## Strategi Mencapai Kemandirian Finansial di Usia Muda

Kemandirian keuangan tidak datang dengan sendirinya. Butuh tujuan yang jelas, strategi yang tepat, dan eksekusi yang konsisten.

### Apa Itu Kemandirian Finansial?
Kemandirian finansial adalah kondisi di mana penghasilan pasif (investasi, dividen, sewa) cukup untuk memenuhi kebutuhan hidup tanpa harus bekerja aktif. Ini bukan berarti berhenti bekerja, tetapi memiliki kebebasan untuk memilih pekerjaan yang disukai.

### Langkah 1: Tentukan Tujuan yang Jelas
Pecah tujuan besar menjadi langkah kecil yang mudah dipantau:
- Dana rumah tinggal
- Dana pendidikan anak
- Dana pensiun
- Dana darurat 12 bulan

### Langkah 2: Gunakan Metode 50/30/20
Atur alokasi keuangan dengan cara yang sederhana:
- **50% untuk kebutuhan** — Makanan, transportasi, tagihan.
- **30% untuk keinginan** — Hiburan, belanja, gaya hidup.
- **20% untuk tabungan & investasi** — Langsung ditabung dan diinvestasikan.

### Langkah 3: Otomasasi Investasi
Atur auto-debit dari rekening gaji ke rekening investasi. Dengan cara ini, kamu tidak akan tergoda untuk membelanjakan uang yang seharusnya diinvestasikan.

### Langkah 4: Evaluasi Berkala
Tinjau portofolio investasi setiap 3-6 bulan sekali. Sesuaikan alokasi berdasarkan perubahan tujuan dan kondisi pasar.

### Langkah 5: Nikmati Prosesnya
Kemandirian finansial adalah hasil dari kebiasaan dan kesabaran. Jangan terburu-buru atau membandingkan diri dengan orang lain. Fokus pada progressmu sendiri.

> "Kemandirian finansial bukan tentang menjadi kaya raya. Ini tentang memiliki kendali atas waktu dan hidupmu."`,
    ],
  },
];

export function getPostById(id: string | number): Post | undefined {
  return posts.find((post) => post.id === Number(id));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return posts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, limit);
}
