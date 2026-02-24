import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { IMAGES } from "../assets";

type NavItem = {
  name: string;
  href?: string;
  submenu?: { name: string; href: string }[];
};

const navigation: NavItem[] = [
  { name: "Beranda", href: "/" },
  { name: "Profil Desa", href: "/profildesa" },
  { name: "UMKM",  
    submenu: [
      { name: "UMKM MOMS G_SIT", href: "/UMKM" },
      { name: "FANINDITA FLORIST", href: "/UMKM2" },
    ],
  },
  {
    name: "Informasi",
    submenu: [{ name: "Pengumuman", href: "/informasi/event" }],
  },
  { name: "Pelaporan", href: "/pelaporan" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string>("");
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const location = useLocation();
  const dropdownRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      Object.entries(dropdownRef.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(target)) {
          setActiveDropdown((prev) => (prev === key ? "" : prev));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown("");
    setMobileDropdowns({});
  }, [location.pathname]);

  const isActive = (item: NavItem) => {
    if (item.href) return location.pathname === item.href;
    return item.submenu?.some((sub) => location.pathname.startsWith(sub.href));
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-green-600 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div className="flex items-center space-x-2">
            <img src={IMAGES.image} alt="Logo Desa" className="h-10 w-auto" />
            <Link to="/" className="text-xl font-bold text-white">
              Desa Kota Agung
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            {navigation.map((item) =>
              item.submenu ? (
                <div
                  key={item.name}
                  ref={(el) => (dropdownRef.current[item.name] = el)}
                  className="relative"
                >
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === item.name ? "" : item.name
                      )
                    }
                    className={`flex items-center text-sm font-semibold ${
                      isActive(item) || activeDropdown === item.name
                        ? "text-pink-200"
                        : "text-white hover:text-pink-200"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`ml-1 transition-transform ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {activeDropdown === item.name && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className={`block px-4 py-2 text-sm ${
                            location.pathname.startsWith(sub.href)
                              ? "bg-pink-50 text-pink-600 font-semibold"
                              : "text-gray-700 hover:bg-pink-100"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href!}
                  className={`text-sm font-semibold ${
                    location.pathname === item.href
                      ? "text-pink-200"
                      : "text-white hover:text-pink-200"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-pink-600">
            {navigation.map((item) =>
              item.submenu ? (
                <div key={item.name}>
                  <button
                    onClick={() =>
                      setMobileDropdowns((prev) => ({
                        ...prev,
                        [item.name]: !prev[item.name],
                      }))
                    }
                    className="flex w-full justify-between text-white"
                  >
                    {item.name}
                    <ChevronDown />
                  </button>

                  {mobileDropdowns[item.name] && (
                    <div className="pl-4 mt-2 space-y-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block text-pink-100"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href!}
                  className="block text-white"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
