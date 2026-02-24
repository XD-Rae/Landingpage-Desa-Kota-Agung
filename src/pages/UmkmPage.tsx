import Navbar from "../components/Navbar";
import { User, Phone, MapPin } from "lucide-react";

/* ================= HELPER ================= */
const formatWhatsappNumber = (phone: string): string => {
  let number = phone.replace(/\D/g, "");

  if (number.startsWith("0")) {
    number = "62" + number.slice(1);
  }

  return number;
};

/* ================= COMPONENT ================= */
export default function UmkmPage() {
  const phone = "0823-7783-3293";
  const whatsappNumber = formatWhatsappNumber(phone);

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-16 bg-green-50 min-h-screen px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-green-700 to-green-500 p-8 text-white">
              <h1 className="text-3xl font-bold">UMKM MOMS G_SIT</h1>
              <p className="text-green-100 mt-1">
                Usaha Mikro Kecil dan Menengah
              </p>
            </div>

            {/* CONTENT */}
            <div className="p-8 space-y-10">

              {/* PROFIL USAHA */}
              <section>
                <h2 className="text-xl font-semibold text-green-700 mb-3">
                  Profil Usaha
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  UMKM Mom G_Sit merupakan usaha makanan rumahan yang menyediakan
                  berbagai olahan masakan rumahan dan aneka keripik dengan cita
                  rasa khas. Setiap produk dibuat dari bahan-bahan pilihan,
                  diolah secara higienis, dan tetap mempertahankan rasa autentik
                  masakan rumah. Mom G_Sit hadir sebagai solusi makanan praktis,
                  lezat, dan terjangkau untuk kebutuhan sehari-hari maupun
                  camilan keluarga.
                </p>
              </section>

              {/* INFORMASI USAHA */}
              <section className="grid sm:grid-cols-2 gap-6">

                {/* NAMA PEMILIK */}
                <div className="flex items-center gap-4 border rounded-xl p-5 bg-green-50">
                  <User className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Nama Pemilik</p>
                    <p className="font-semibold text-gray-800">
                      Desita Asmalia
                    </p>
                  </div>
                </div>

                {/* ALAMAT USAHA */}
                <div className="flex items-center gap-4 border rounded-xl p-5 bg-green-50">
                  <MapPin className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Alamat Usaha</p>
                    <p className="font-semibold text-gray-800">
                      Dusun Bernai, Desa Kota Agung, Kec. Tegineneng, Kab. Pesawaran
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
