import React, {useState, useRef, useEffect} from "react";
import {motion} from "framer-motion";
// Pastikan dusunAPI diimport dari services
import {reportAPI, dusunAPI} from "../services/api";

const MAX_IMAGES = 5;

const Pelaporan = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dusun: "",
    rt: "",
    title: "",
    description: "",
    category: "Lainnya",
  });

  // State untuk menyimpan daftar dusun dari API
  const [dusunList, setDusunList] = useState<any[]>([]);

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  );

  // Kamera popup
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // =========================
  // 1. Fetch Data Dusun (Manual Fetch)
  // =========================
  useEffect(() => {
    const fetchDusun = async () => {
      try {
        const data = await dusunAPI.getAll();
        setDusunList(data);
      } catch (err) {
        console.error("Gagal memuat data dusun:", err);
      }
    };

    fetchDusun();
  }, []);

  // =========================
  // Reverse Geocode (Nominatim)
  // =========================
  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        {
          headers: {"User-Agent": "DesaPelaporApp/1.0"},
        },
      );
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  };

  // =========================
  // Kamera Functions
  // =========================
  const openCamera = async () => {
    if (images.length >= MAX_IMAGES) return;

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {facingMode},
        audio: false,
      });

      setStream(mediaStream);
      dialogRef.current?.showModal();

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
    } catch (err) {
      alert("Kamera tidak bisa diakses");
      console.error(err);
    }
  };

  const switchCamera = async () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    setTimeout(() => {
      openCamera();
    }, 100);
  };

  const closeCamera = () => {
    dialogRef.current?.close();
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
  };

  const capturePhoto = () => {
    if (images.length >= MAX_IMAGES) {
      closeCamera();
      return;
    }

    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `photo-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        setImages((prev) => [...prev, file]);
        closeCamera();
      }
    }, "image/jpeg");
  };

  // =========================
  // Submit Handler
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validasi Manual untuk Dropdown
    if (!formData.dusun) {
      setError("Harap pilih lokasi Dusun.");
      setLoading(false);
      return;
    }

    let latitude: number | null = null;
    let longitude: number | null = null;
    let address = "";

    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      latitude = pos.coords.latitude;
      longitude = pos.coords.longitude;

      const g = await reverseGeocode(latitude, longitude);
      address =
        g?.address?.road ||
        g?.address?.village ||
        g?.address?.suburb ||
        g?.display_name ||
        "";
    } catch {
      console.warn("Geolocation ditolak atau tidak tersedia");
    }

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([k, v]) => data.append(k, v as string));

      if (latitude) data.append("location[latitude]", String(latitude));
      if (longitude) data.append("location[longitude]", String(longitude));
      if (address) data.append("location[address]", address);

      images.forEach((img) => data.append("images", img));

      await reportAPI.create(data);

      setSuccess(
        "Laporan berhasil dikirim! Terima kasih atas partisipasi Anda.",
      );

      // Reset Form
      setFormData({
        name: "",
        phone: "",
        dusun: "",
        rt: "",
        title: "",
        description: "",
        category: "Lainnya",
      });
      setImages([]);
    } catch (err: any) {
      console.error("Submit Error:", err);
      // 🔥 TANGKAP PESAN ERROR DARI BACKEND
      const backendMessage =
        err.response?.data?.error ||
        err.message ||
        "Gagal mengirim laporan. Silakan coba lagi.";
      setError(backendMessage);
    }

    setLoading(false);
  };

  // =========================
  // Render
  // =========================
  return (
    <div className="pt-20 bg-gray-50 min-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          className="text-3xl font-bold text-center mb-6 text-gray-800"
        >
          Form Pelaporan Desa Kota Agung
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 space-y-6"
        >
          {/* Notification Messages */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Sukses!</strong>{" "}
              <span className="block sm:inline">{success}</span>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error!</strong>{" "}
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* === DATA PELAPOR === */}
          <div>
            <h2 className="font-semibold text-lg border-b pb-2 mb-4 text-gray-700">
              Data Pelapor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  placeholder="Masukkan nama anda"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({...formData, name: e.target.value})
                  }
                  required
                />
              </div>

              {/* Telepon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. WhatsApp / Telepon
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({...formData, phone: e.target.value})
                  }
                  required
                />
              </div>

              {/* Dropdown Dusun */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lokasi Dusun
                </label>
                <select
                  className="border border-gray-300 p-3 rounded-lg w-full bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.dusun}
                  onChange={(e) =>
                    setFormData({...formData, dusun: e.target.value})
                  }
                  required
                >
                  <option value="">-- Pilih Dusun --</option>
                  {dusunList.map((dusun: any) => (
                    <option
                      key={dusun.idDusun || dusun._id}
                      value={dusun.idDusun}
                    >
                      {dusun.nama_dusun}
                    </option>
                  ))}
                </select>
              </div>

              {/* RT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  RT
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 01"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.rt}
                  onChange={(e) =>
                    setFormData({...formData, rt: e.target.value})
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* === DETAIL LAPORAN === */}
          <div>
            <h2 className="font-semibold text-lg border-b pb-2 mb-4 text-gray-700">
              Detail Laporan
            </h2>

            <div className="space-y-4">
              {/* Judul */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Laporan
                </label>
                <input
                  placeholder="Contoh: Jalan Berlubang di Depan Balai Desa"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({...formData, title: e.target.value})
                  }
                  required
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori Laporan
                </label>
                <select
                  className="border border-gray-300 p-3 rounded-lg w-full bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({...formData, category: e.target.value})
                  }
                >
                  <option>Infrastruktur</option>
                  <option>Keamanan</option>
                  <option>Kesehatan</option>
                  <option>Kebersihan</option>
                  <option>Sosial</option>
                  <option>Bencana</option>
                  <option>Lainnya</option>
                </select>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keterangan Lengkap
                </label>
                <textarea
                  placeholder="Jelaskan detail permasalahan, lokasi spesifik, dan waktu kejadian..."
                  className="border border-gray-300 p-3 rounded-lg w-full h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({...formData, description: e.target.value})
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* === FOTO BUKTI === */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Foto Bukti Kejadian{" "}
              <span className="text-sm font-normal text-gray-500">
                ({images.length}/{MAX_IMAGES})
              </span>
            </label>

            {images.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={openCamera}
                className="flex items-center justify-center gap-2 w-full sm:w-auto mt-2 bg-green-50 border border-green-200 text-green-600 hover:bg-green-100 px-6 py-3 rounded-lg transition-colors font-medium"
              >
                📷{" "}
                {images.length === 0
                  ? "Ambil Foto / Buka Kamera"
                  : "Tambah Foto Lain"}
              </button>
            )}

            {images.length >= MAX_IMAGES && (
              <p className="text-sm text-red-500 mt-2">
                Maksimal {MAX_IMAGES} foto tercapai.
              </p>
            )}

            {/* Preview Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Preview ${i}`}
                      className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, idx) => idx !== i))
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                      title="Hapus foto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className={`w-full text-white font-bold p-4 rounded-lg shadow-md transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sedang Mengirim...
              </span>
            ) : (
              "Kirim Laporan"
            )}
          </button>
        </motion.form>

        {/* POPUP KAMERA MODAL */}
        <dialog
          ref={dialogRef}
          className="rounded-xl p-0 backdrop:bg-black/80 shadow-2xl overflow-hidden w-full max-w-lg"
        >
          <div className="relative bg-black">
            <video
              ref={videoRef}
              className={`w-full h-auto max-h-[70vh] object-cover ${
                facingMode === "user" ? "scale-x-[-1]" : ""
              }`}
              playsInline
            />

            {/* Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex justify-between items-center">
              <button
                type="button"
                onClick={closeCamera}
                className="text-white bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm"
                title="Tutup"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={capturePhoto}
                className="bg-white rounded-full p-1 shadow-lg transform hover:scale-105 transition-transform"
              >
                <div className="bg-white border-4 border-gray-300 h-16 w-16 rounded-full"></div>
              </button>

              <button
                type="button"
                onClick={switchCamera}
                className="text-white bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm"
                title="Ganti Kamera"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </dialog>
      </div>
    </div>
  );
};

export default Pelaporan;
