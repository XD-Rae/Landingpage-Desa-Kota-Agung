import React from "react";
import {
  MapPin,
  Users,
  Landmark,
  Target,
  Leaf,
  Building,
  History,
} from "lucide-react";
import { IMAGES } from "../assets";

export default function ProfilDesa() {
  return (
    <div className="pt-20 bg-gray-100">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm mb-4">
            Profil Resmi Desa
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Desa Kota Agung
          </h1>
          <p className="max-w-3xl mx-auto text-green-100 text-lg">
            Mengenal lebih dekat Desa Kota Agung dari sejarah, kondisi wilayah,
            pemerintahan, hingga potensi unggulan desa.
          </p>
        </div>
      </section>

      {/* ================= QUICK STATS ================= */}
      <section className="-mt-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Penduduk", value: "2.259 Jiwa" },
            { label: "KK", value: "723 KK" },
            { label: "Dusun", value: "6 Dusun" },
            { label: "RT", value: "17 RT" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <p className="text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold text-green-600">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GAMBARAN UMUM ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <img
            src={IMAGES.image}
            alt="Desa Kota Agung"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Gambaran Umum
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Desa Kota Agung merupakan desa yang memiliki komitmen kuat dalam mewujudkan tata kelola
              pemerintahan yang transparan, akuntabel, dan partisipatif. Komitmen tersebut tercermin dalam 
              upaya berkelanjutan pemerintah desa untuk meningkatkan kualitas pelayanan publik yang efektif,
              responsif, dan berorientasi pada kebutuhan masyarakat. Melalui penerapan prinsip keterbukaan informasi,
              optimalisasi kinerja aparatur desa, serta pelibatan aktif masyarakat dalam proses perencanaan dan pengambilan
              keputusan, Desa Kota Agung terus berupaya menciptakan pemerintahan desa yang profesional, berintegritas,
              dan berdaya saing.
            </p>
            <div className="flex items-center gap-3 text-green-600 font-medium">
              <MapPin size={18} />
              Kabupaten Pesawaran
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEJARAH ================= */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <History className="text-green-600" />
              Sejarah Desa
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Desa Kota Agung berdiri pada tahun 1985 dan merupakan pemekaran dari Desa Bumi Agung dengan Kades:<br />
                1. Kepala Desa pertama: Bapak Ismail Batin Singa (2 Periode)<br />
                2. Kepala Desa kedua: Bapak Iwan Ashari (2 Periode)<br />
                3. Kepala Desa ketiga: Bapak Hairul Ahmad, S.H. (2 Periode)<br />
            </p>
          </div>
        </div>
      </section>

      {/* ================= VISI MISI ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-green-600 text-white rounded-3xl p-10 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target />
              Visi Desa
            </h3>
            <p className="text-green-100">
              Terwujudnya Desa Kota Agung yang maju, mandiri, dan sejahtera.
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-10 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Landmark className="text-green-600" />
              Misi Desa
            </h3>
            <ul className="space-y-3 text-gray-600 list-disc list-inside">
              <li>Meningkatkan pelayanan masyarakat</li>
              <li>Mewujudkan pemerintahan transparan</li>
              <li>Mengembangkan potensi ekonomi desa</li>
              <li>Melestarikan nilai sosial budaya</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= POTENSI ================= */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Potensi Unggulan Desa
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "Pertanian",
              "perdagangan",
              "investasi",
            ].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition"
              >
                <Leaf className="mx-auto text-green-600 mb-4" />
                <p className="font-semibold text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SARANA ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Sarana & Prasarana
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Kantor Desa",
              "Tempat Ibadah",
              "Lahan Pertanian",
              "Jalan Desa",
            ].map((item) => (
              <div
                key={item}
                className="bg-gray-50 rounded-xl p-6 shadow text-center"
              >
                <Building className="mx-auto text-green-600 mb-3" />
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
