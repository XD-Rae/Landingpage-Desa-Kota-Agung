import React from "react";
import { MapPin } from "lucide-react";
import { IMAGES } from "../assets";

const aparatur = [
  {
    name: "Andari",
    jabatan: "Sekertaris Desa",
    image: IMAGES.image2,
  },
  {
    name: "Hairul Ahmad, S.H",
    jabatan: "Kepala Desa",
    image: IMAGES.image1,
  },
  {
    name: "Arifiyatunisa",
    jabatan: "Bendahara Desa",
    image: IMAGES.image3,
  },
];

export default function Home() {
  return (
    <div className="pt-20">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Website Pelaporan Desa Kota Agung
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-green-100">
            Media resmi pelaporan dan pelayanan masyarakat Desa Kota Agung
            untuk menciptakan pemerintahan desa yang transparan dan responsif.
          </p>
        </div>
      </section>

      {/* ================= PROFIL DESA ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tentang Desa Kota Agung
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Desa Kota Agung merupakan desa yang berkomitmen memberikan
              pelayanan terbaik bagi masyarakat. Melalui website ini,
              masyarakat dapat menyampaikan laporan, pengaduan, dan aspirasi
              secara cepat dan transparan.
            </p>
          </div>
          <div>
            <img
              src={IMAGES.image}
              alt="Desa Kota Agung"
              className="rounded-xl shadow-md w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Peta Desa Kota Agung"
              src="https://www.google.com/maps?q=Kota%20Agung&output=embed"
              className="w-full h-[400px] border-0"
              loading="lazy"
            />
            <a
              href="https://share.google/72jF8RaguMttmkX76"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full shadow flex items-center gap-2 text-green-700 font-semibold"
            >
              <MapPin size={18} />
              Buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ================= APARATUR ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Aparatur Desa
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {aparatur.map((item) => (
              <div
                key={item.name}
                className="bg-gray-50 rounded-xl shadow p-6 hover:shadow-lg transition"
              >
                {/* FOTO FULL (TIDAK TERPOTONG) */}
                <div className="w-40 h-40 mx-auto bg-white rounded-lg border shadow-sm flex items-center justify-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <h3 className="text-lg font-bold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-black-600 font-medium">
                  {item.jabatan}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
