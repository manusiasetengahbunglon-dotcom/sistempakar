import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "12345") {
      // 🔐 simpan status login
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("role", "admin");

      navigate("/dashboard");
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/bg1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#061a2e]/85"></div>

      {/* Garis dekoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-0 h-full w-px bg-white/10"></div>
        <div className="absolute right-1/3 top-0 h-full w-px bg-white/10"></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-white/10"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-white/10"></div>
      </div>

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-white/95 backdrop-blur-xl p-10 rounded-2xl w-full max-w-md shadow-2xl"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        <h2 className="text-3xl text-center text-[#061a2e] mb-10">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-6 p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-8 p-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 transition"
        />

        {error && (
          <p className="text-red-500 text-sm mb-6 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition text-white font-semibold shadow-lg"
        >
          Masuk
        </button>

        {/* FOOTER */}
        <p className="mt-10 text-center text-sm text-gray-500">
          PT XL Axiata Tbk
        </p>
      </motion.div>
    </section>
  );
}
