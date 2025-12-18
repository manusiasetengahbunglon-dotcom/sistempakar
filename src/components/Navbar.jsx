import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const menus = [
    "Profil",
    "Fitur",
    "Panduan",
    "Kontak",
    "Investor",
    "Layanan",
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#f9fafb]/95 backdrop-blur-md">
      {/* garis bawah navbar */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#061a2e]/10"></div>

      <div
        className="max-w-7xl mx-auto px-10 py-5 flex items-center justify-between"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        {/* LOGO */}
        <div className="flex items-center">
          <img
            src="/21.png"
            alt="XL"
            className="h-14 md:h-16 w-auto"
          />
        </div>

        {/* MENU */}
        <ul className="flex items-center gap-12 text-[17px] text-[#061a2e]/75">
          {menus.map((item) => (
            <li
              key={item}
              className="relative group cursor-pointer transition-colors duration-300 hover:text-[#0b5ed7]"
            >
              {item}

              {/* hover underline */}
              <span className="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#0b5ed7]/70 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </li>
          ))}
        </ul>

        {/* LOGIN (SAMA DENGAN MENU) */}
        <button
          onClick={() => navigate("/login")}
          className="relative group text-[17px] text-[#061a2e]/75 hover:text-[#0b5ed7] transition-colors duration-300"
        >
          Login
          <span className="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#0b5ed7]/70 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </button>
      </div>
    </nav>
  );
}
