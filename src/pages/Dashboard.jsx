import { useState, useEffect } from "react";

/* ================= STATUS STYLE ================= */
const statusColor = {
  OPEN: "bg-blue-100 text-blue-700",
  PROGRESS: "bg-yellow-100 text-yellow-800",
  CLOSED: "bg-green-100 text-green-700",
};

/* ================= DATA SISTEM PAKAR ================= */
const gangguanData = {
  G001: {
    nama: "Akses Internet Error",
    rules: [
      {
        p: "DNS modem atau perangkat pelanggan gagal melakukan resolusi domain akibat cache corrupt atau konfigurasi DNS tidak sesuai standar ISP.",
        s: "Lakukan flush DNS, restart modem ONT, dan pastikan DNS menggunakan DNS ISP atau DNS publik resmi.",
      },
      {
        p: "Bandwidth overload karena banyak perangkat aktif bersamaan.",
        s: "Batasi perangkat aktif dan edukasi manajemen jaringan rumah.",
      },
    ],
  },
  G002: {
    nama: "Lampu Internet Mati",
    rules: [
      {
        p: "Kabel fiber optik longgar atau terlepas dari port modem/ODP.",
        s: "Instruksikan pemasangan ulang kabel fiber dengan benar.",
      },
      {
        p: "Gangguan dari sisi sentral atau port OLT.",
        s: "Cek NMS dan eskalasi ke tim NOC.",
      },
    ],
  },
  G003: {
    nama: "Bandwidth Hilang",
    rules: [
      {
        p: "Profil pelanggan tidak sinkron di BRAS.",
        s: "Refresh dan sinkronisasi ulang profil pelanggan.",
      },
    ],
  },
  G004: {
    nama: "Patchcore Putus",
    rules: [
      {
        p: "Patchcore rusak akibat tekukan tajam atau usia pakai.",
        s: "Ganti patchcore sesuai standar fiber optik.",
      },
    ],
  },
  G005: {
    nama: "Modem Tereset",
    rules: [
      {
        p: "Tegangan listrik tidak stabil.",
        s: "Sarankan penggunaan stabilizer atau UPS.",
      },
    ],
  },
  G006: {
    nama: "Lampu WLAN Mati",
    rules: [
      {
        p: "WiFi dinonaktifkan di konfigurasi modem.",
        s: "Aktifkan WiFi melalui halaman konfigurasi modem.",
      },
    ],
  },
  G007: {
    nama: "Lampu Kuning Berkedip",
    rules: [
      {
        p: "Perangkat sedang sinkronisasi jaringan.",
        s: "Tunggu 5–10 menit atau restart modem.",
      },
    ],
  },
  G008: {
    nama: "Lampu Merah Menyala",
    rules: [
      {
        p: "Loss signal pada jalur fiber optik.",
        s: "Eskalasi teknisi lapangan untuk pengecekan jalur.",
      },
    ],
  },
  G009: {
    nama: "Modem Tidak Menyala",
    rules: [
      {
        p: "Adaptor modem rusak atau tidak ada daya.",
        s: "Ganti adaptor dan pastikan sumber listrik aktif.",
      },
    ],
  },
  G010: {
    nama: "Bandwidth Tidak Stabil",
    rules: [
      {
        p: "Interferensi WiFi lingkungan sekitar.",
        s: "Ubah channel WiFi dan posisi modem.",
      },
    ],
  },
  G011: {
    nama: "Maintenance Jaringan",
    rules: [
      {
        p: "Sedang dilakukan pemeliharaan jaringan.",
        s: "Informasikan jadwal maintenance ke pelanggan.",
      },
    ],
  },
  G012: {
    nama: "Bandwidth Tidak Naik",
    rules: [
      {
        p: "Upgrade paket belum sinkron.",
        s: "Refresh profil dan verifikasi ulang layanan.",
      },
    ],
  },
  G013: {
    nama: "SSID Tidak Muncul",
    rules: [
      {
        p: "SSID disembunyikan di pengaturan modem.",
        s: "Aktifkan broadcast SSID.",
      },
    ],
  },
  G014: {
    nama: "Kerusakan Kabel",
    rules: [
      {
        p: "Kabel rusak akibat faktor lingkungan.",
        s: "Ganti kabel dengan jalur baru.",
      },
    ],
  },
  G015: {
    nama: "UseeTV Blank",
    rules: [
      {
        p: "STB hang atau gagal sinkronisasi.",
        s: "Restart STB dan pairing ulang.",
      },
    ],
  },
};

/* ================= COMPONENT ================= */
export default function Dashboard() {
  const [menu, setMenu] = useState("dashboard");
  const [tts, setTts] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    kode: "G001",
  });

  useEffect(() => {
    setTts(JSON.parse(localStorage.getItem("tts")) || []);
  }, []);

  const createTT = () => {
    const kodeTT = `TT-XL-${String(tts.length + 1).padStart(3, "0")}`;
    const data = {
      kodeTT,
      ...form,
      status: "OPEN",
      gangguan: gangguanData[form.kode],
    };
    const updated = [...tts, data];
    setTts(updated);
    localStorage.setItem("tts", JSON.stringify(updated));
    setMenu("data");
  };

  const updateStatus = (i, status) => {
    const updated = [...tts];
    updated[i].status = status;
    setTts(updated);
    localStorage.setItem("tts", JSON.stringify(updated));
  };

  /* ================= ANALYTICS ================= */
  const totalTT = tts.length;

  const statusCount = {
    OPEN: tts.filter(t => t.status === "OPEN").length,
    PROGRESS: tts.filter(t => t.status === "PROGRESS").length,
    CLOSED: tts.filter(t => t.status === "CLOSED").length,
  };

  const closedPercentage = totalTT
    ? Math.round((statusCount.CLOSED / totalTT) * 100)
    : 0;

  const gangguanCount = {};
  const penyebabCount = {};
  const solusiCount = {};

  tts.forEach(t => {
    if (!t.gangguan) return;
    gangguanCount[t.gangguan.nama] =
      (gangguanCount[t.gangguan.nama] || 0) + 1;

    t.gangguan.rules.forEach(r => {
      penyebabCount[r.p] = (penyebabCount[r.p] || 0) + 1;
      solusiCount[r.s] = (solusiCount[r.s] || 0) + 1;
    });
  });

  const getTop = obj =>
    Object.keys(obj).length
      ? Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b))
      : "-";

  const gangguanTerbanyak = getTop(gangguanCount);
  const penyebabTerbanyak = getTop(penyebabCount);
  const solusiTerbanyak = getTop(solusiCount);

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-slate-900 via-blue-900 to-indigo-900">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white/95 backdrop-blur-xl p-6 shadow-2xl flex flex-col">
  {/* LOGO */}
  <div className="flex flex-col items-center mb-10">
    <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center shadow-inner">
      <img
        src="/logo.png"
        alt="XL Axiata"
        className="w-16 h-auto"
      />
    </div>
    <h2 className="mt-4 text-lg font-bold text-slate-800 tracking-wide">
      Customer Service
    </h2>
    <p className="text-xs text-slate-500 tracking-widest">
      PT XL AXIATA TBK
    </p>
  </div>

  <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-6" />

  {/* MENU */}
  {[
    ["dashboard", " Dashboard"],
    ["create", "Create Special Request"],
    ["data", "Escalation"],
  ].map(([k, l]) => (
    <button
      key={k}
      onClick={() => setMenu(k)}
      className={`w-full mb-3 px-4 py-3 rounded-xl text-left transition ${
        menu === k
          ? "bg-blue-600 text-white shadow"
          : "hover:bg-blue-100 text-slate-700"
      }`}
    >
      {l}
    </button>
  ))}

  <div className="mt-auto text-center text-xs text-slate-400">
    Internal System v1.0
  </div>
</aside>


      {/* CONTENT */}
      <main className="flex-1 p-10 bg-white/90 rounded-l-3xl">
        {menu === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Trouble Ticket
            </h1>

           <div className="grid md:grid-cols-3 gap-6 mb-10">
  {[
    { k: "OPEN", icon: "📂" },
    { k: "PROGRESS", icon: "⚙️" },
    { k: "CLOSED", icon: "✅" },
  ].map(({ k, icon }) => (
    <div
      key={k}
      className={`relative p-6 rounded-2xl shadow-xl ${statusColor[k]}`}
    >
      <div className="absolute top-4 right-4 text-3xl opacity-20">
        {icon}
      </div>

      <p className="text-sm font-semibold tracking-widest">{k}</p>
      <h2 className="text-5xl font-bold mt-2">
        {statusCount[k]}
      </h2>

      {k === "CLOSED" && (
        <p className="mt-3 text-sm font-semibold">
          {closedPercentage}% TT selesai
        </p>
      )}
    </div>
  ))}
</div>


           <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-8">
  <h3 className="text-xl font-bold text-slate-800 mb-6">
    Insight Sistem Pakar
  </h3>

  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="p-4 text-left">Parameter</th>
          <th className="p-4 text-left">Hasil Analisis</th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-b">
          <td className="p-4 font-semibold text-slate-700">
            Gangguan Terbanyak
          </td>
          <td className="p-4">{gangguanTerbanyak}</td>
        </tr>

        <tr className="border-b bg-slate-50">
          <td className="p-4 font-semibold text-slate-700">
            Penyebab Dominan
          </td>
          <td className="p-4">{penyebabTerbanyak}</td>
        </tr>

        <tr className="border-b">
          <td className="p-4 font-semibold text-slate-700">
            Solusi Terbanyak
          </td>
          <td className="p-4">{solusiTerbanyak}</td>
        </tr>

        <tr className="bg-slate-50">
          <td className="p-4 font-semibold text-slate-700">
            Tingkat Penyelesaian
          </td>
          <td className="p-4">
            {closedPercentage}% Trouble Ticket selesai
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p className="mt-4 text-xs text-slate-400">
     <b>Forward Chaining (Rule-Based Expert System)</b>
  </p>
</div>

          </>
        )}

         {menu === "create" && (
  <div className="max-w-5xl">

    <h1 className="text-2xl font-bold mb-6">
      Create Trouble Ticket
    </h1>

    <div className="grid md:grid-cols-2 gap-8">

      {/* ===== FORM INPUT ===== */}
      <div className="bg-white p-6 rounded-xl shadow border">

        <h2 className="font-semibold text-slate-800 mb-4">
          Data Pelanggan
        </h2>

        <div className="space-y-4">

          <div>
            <label className="text-sm text-slate-600">
              Nama Customer
            </label>
            <input
              className="w-full mt-1 p-2.5 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Nama lengkap pelanggan"
              value={form.nama}
              onChange={e =>
                setForm({ ...form, nama: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">
              Alamat
            </label>
            <textarea
              className="w-full mt-1 p-2.5 border rounded focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Alamat lengkap pelanggan"
              value={form.alamat}
              onChange={e =>
                setForm({ ...form, alamat: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">
              Jenis Gangguan
            </label>
            <select
              className="w-full mt-1 p-2.5 border rounded focus:ring-2 focus:ring-blue-500"
              value={form.kode}
              onChange={e =>
                setForm({ ...form, kode: e.target.value })
              }
            >
              {Object.keys(gangguanData).map(k => (
                <option key={k} value={k}>
                  {k} — {gangguanData[k].nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-600">
              Prioritas
            </label>
            <select
              className="w-full mt-1 p-2.5 border rounded"
              onChange={e =>
                setForm({ ...form, prioritas: e.target.value })
              }
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-600">
              Catatan CS (Opsional)
            </label>
            <textarea
              className="w-full mt-1 p-2.5 border rounded"
              rows={2}
              placeholder="Contoh: pelanggan WFH, minta diprioritaskan"
              onChange={e =>
                setForm({ ...form, catatan: e.target.value })
              }
            />
          </div>

        </div>

        <button
          onClick={createTT}
          disabled={!form.nama || !form.alamat}
          className="mt-6 w-full bg-blue-600 text-white py-2.5 rounded font-semibold disabled:opacity-50"
        >
          Create Trouble Ticket
        </button>
      </div>

      {/* ===== ANALISA SISTEM PAKAR ===== */}
      <div className="bg-slate-50 p-6 rounded-xl border">

        <h2 className="font-semibold text-slate-800 mb-4">
          Analisa Sistem Pakar
        </h2>

        <p className="text-sm text-slate-600 mb-4">
          Berdasarkan gangguan yang dipilih, sistem menganalisa
          penyebab dan solusi berikut:
        </p>

        <div className="space-y-4">
          {gangguanData[form.kode].rules.map((r, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg border"
            >
              <p className="text-xs text-slate-500 mb-1">
                Rule {i + 1}
              </p>

              <p className="text-sm">
                <b>Penyebab:</b> {r.p}
              </p>

              <p className="text-sm mt-2">
                <b>Solusi:</b> {r.s}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-xs text-slate-500">
          Metode inferensi: <b>Forward Chaining</b>
        </div>
      </div>

    </div>
  </div>
)}


       {menu === "data" && (
          <table className="w-full bg-white rounded shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                {["TT", "Nama", "Alamat", "Gangguan", "Penyebab", "Solusi", "Status"].map(h => (
                  <th key={h} className="p-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tts.map((tt, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{tt.kodeTT}</td>
                  <td className="p-2">{tt.nama}</td>
                  <td className="p-2">{tt.alamat}</td>
                  <td className="p-2">{tt.gangguan.nama}</td>
                  <td className="p-2">{tt.gangguan.rules[0].p}</td>
                  <td className="p-2">{tt.gangguan.rules[0].s}</td>
                  <td className="p-2">
                    <select
                      value={tt.status}
                      onChange={e => updateStatus(i, e.target.value)}
                    >
                      <option>OPEN</option>
                      <option>PROGRESS</option>
                      <option>CLOSED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}