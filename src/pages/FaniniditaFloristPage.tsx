import Navbar from "../components/Navbar";
import { User, Phone, MapPin, Flower } from "lucide-react";

export default function FaninditaFloristPage() {
  const phone = "088286042663";
  const whatsappNumber = "62" + phone.slice(1);

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-16 bg-green-50 min-h-screen px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            {/* ================= HEADER ================= */}
            <div className="bg-gradient-to-r from-green-700 to-green-500 p-8 text-white">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Flower /> Fanindita Florist
              </h1>
              <p className="text-green-100 mt-1">
                UMKM Florist & Dekorasi Bunga
              </p>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="p-8 space-y-10">

              {/* PROFIL USAHA */}
              <section>
                <h2 className="text-xl font-semibold text-green-700 mb-3">
                  Profil Usaha
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Fanindita Florist adalah UMKM yang bergerak di bidang florist
                  dan dekorasi bunga. Kami menyediakan berbagai rangkaian bunga
                  segar untuk acara pernikahan, wisuda, ulang tahun, duka cita,
                  dan berbagai momen spesial lainnya. Setiap rangkaian dibuat
                  dengan penuh ketelitian, kreativitas, dan menggunakan bunga
                  berkualitas untuk memberikan kesan terbaik bagi pelanggan.
                </p>
              </section>

              {/* INFORMASI USAHA */}
              <section className="grid sm:grid-cols-2 gap-6">

                {/* PEMILIK */}
                <div className="flex items-center gap-4 border rounded-xl p-5 bg-green-50">
                  <User className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Nama Pemilik</p>
                    <p className="font-semibold text-gray-800">
                      Fanindita Chika Rosha
                    </p>
                  </div>
                </div>

                {/* ALAMAT */}
                <div className="flex items-center gap-4 border rounded-xl p-5 bg-green-50">
                  <MapPin className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Alamat Usaha</p>
                    <p className="font-semibold text-gray-800">
                      Dusun Cimangga, Desa Kota Agung, Kec. Tegineneng, Kab. Pesawaran
                    </p>
                  </div>
                </div>

              </section>

              {/* KONTAK */}
              <section>
                <h2 className="text-xl font-semibold text-green-700 mb-4">
                  Hubungi Kami
                </h2>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl transition"
                >
                  <Phone />
                  <span className="font-semibold">
                    Chat WhatsApp ({phone})
                  </span>
                </a>
              </section>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
