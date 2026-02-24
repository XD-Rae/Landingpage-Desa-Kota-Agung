import React from "react";
import { Calendar, MapPinned, Megaphone } from "lucide-react";
import { usePublicCampusData } from "../../contexts/PublicCampusDataContext";
import placeholderImg from "../../assets/placeholder.webp";

export default function EventPage() {
  const { events, loading, error } = usePublicCampusData();

  return (
    <div className="pt-24 pb-20 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">

        {/* ===== HEADER ===== */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 text-white p-4 rounded-full">
              <Megaphone size={28} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Pengumuman Kegiatan Desa
          </h1>

          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Informasi resmi mengenai kegiatan, rapat, dan agenda penting
            Desa Kota Agung yang perlu diketahui oleh seluruh masyarakat.
          </p>
        </div>

        {/* ===== LOADING ===== */}
        {loading && (
          <p className="text-center text-slate-500">
            Memuat pengumuman kegiatan...
          </p>
        )}

        {/* ===== ERROR ===== */}
        {error && (
          <p className="text-center text-red-500">
            {error}
          </p>
        )}

        {/* ===== EMPTY ===== */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center text-slate-500 bg-white p-8 rounded-xl shadow">
            Belum ada pengumuman kegiatan desa.
          </div>
        )}

        {/* ===== EVENT LIST ===== */}
        {!loading && !error && events.length > 0 && (
          <div className="space-y-8">
            {events.map((event) => {
              const imageSrc =
                event.foto && event.foto.startsWith("data:image")
                  ? event.foto
                  : placeholderImg;

              return (
                <div
                  key={event._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
                >
                  {/* ===== GAMBAR FULL LANDSCAPE ===== */}
                  <img
                    src={imageSrc}
                    alt={event.nama}
                    className="w-full h-64 md:h-72 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = placeholderImg;
                    }}
                  />

                  {/* ===== ISI PENGUMUMAN ===== */}
                  <div className="p-6 md:p-8">

                    {/* JENIS */}
                    {event.jenis && (
                      <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                        {event.jenis}
                      </span>
                    )}

                    {/* JUDUL */}
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                      {event.nama}
                    </h2>

                    {/* INFO */}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-5">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{event.tanggal || "-"}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPinned size={16} />
                        <span>{event.lokasi || "-"}</span>
                      </div>
                    </div>

                    {/* DESKRIPSI */}
                    <p className="text-slate-700 leading-relaxed">
                      {event.deskripsi}
                    </p>

                    {/* PENUTUP RESMI */}
                    <p className="mt-6 text-sm text-slate-500 italic">
                      Demikian pengumuman ini disampaikan. Atas perhatian masyarakat,
                      kami ucapkan terima kasih.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

