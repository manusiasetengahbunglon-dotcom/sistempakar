import { motion } from "framer-motion";

export default function Home() {
  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage: "url('/bg1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#061a2e]/80"></div>

      {/* Garis dekoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-24 top-0 h-full w-px bg-white/10"></div>
        <div className="absolute right-24 top-0 h-full w-px bg-white/10"></div>
        <div className="absolute top-28 left-0 w-full h-px bg-white/10"></div>
        <div className="absolute bottom-24 left-0 w-full h-px bg-white/10"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="max-w-2xl mt-24"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          {/* JUDUL UTAMA */}
          <h1 className="text-3xl md:text-5xl font-normal leading-tight text-white mb-6">
            Sistem Pakar Menggunakan Metode <br />
            <span className="italic">Forward Chaining</span> Untuk Mendeteksi
            Kerusakan Jaringan Internet
          </h1>

          {/* JUDUL KECIL */}
          <p className="text-sm tracking-[0.3em] text-white/70">
            Studi Kasus PT XL AXIATA TBK
          </p>

          {/* Garis aksen */}
          <div className="mt-10 h-px w-36 bg-blue-400/60"></div>
        </motion.div>
      </div>
    </section>
  );
}
