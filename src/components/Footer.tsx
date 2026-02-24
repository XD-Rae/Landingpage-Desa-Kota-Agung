import React from "react";
import {Link} from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {MdEmail} from "react-icons/md";
import {FaTiktok, FaWhatsapp} from "react-icons/fa";
import { BsTiktok } from "react-icons/bs";
import { GrTiktok } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Desa Kota Agung</h3>
            <p className="text-gray-400 mb-4">
              Desa Kota Agung merupakan desa yang terletak di Kecamatan Tegineneng, Kabupaten Pesawaran, Provinsi Lampung. 
              Desa ini memiliki potensi sumber daya alam yang melimpah serta lingkungan yang asri. Masyarakatnya dikenal ramah,
              menjunjung tinggi nilai kebersamaan, dan terbuka dalam menyambut pengunjung.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.tiktok.com/@kota.agung.offici?_r=1&_t=ZS-93DbGr8Hxsl" 
                className="text-gray-400 hover:text-white"
              >
                <FaTiktok size={20} />
              </a>
              <a
                href="https://www.instagram.com/munggukgacor_?igsh=dW9hYXk4cW9semEx"
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={20} />
              </a>
              {/* <a
                href="https://wa.me/qr/O4IAPRULLQYDC1"
                className="text-gray-400 hover:text-white"
              >
                <FaWhatsapp size={20} />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/profil" className="text-gray-400 hover:text-white">
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Informasi
                </Link>
              </li>
               <li>
                <Link to="/pelaporan" className="text-gray-400 hover:text-white">
                  Pelaporan
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-4">Program</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                Pembangunan Jalan 
              </li>
              <li className="text-gray-400">
                Drainase
              </li>
              <li className="text-gray-400">Pelatihan SDM</li>
              <li className="text-gray-400">Posyandu</li>
              <li className="text-gray-400">Sanitasi</li>
              <li className="text-gray-400">Bedah Rumah</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <MapPin size={50} className="mr-2" />
                Jl. Lintas Sumatera No.KM 39, Kota Agung, Kec. Tegineneng, Kabupaten Pesawaran, Lampung 35363
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={20} className="mr-2" />
                +62 852 7924 6456
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={20} className="mr-2" />
                desakotaagung.psw@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} By -@DesaKoaAgung All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
