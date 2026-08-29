import React from 'react';
import { BusinessUnit } from '../types';
import { 
  Building2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  ChevronRight, 
  ArrowUp 
} from 'lucide-react';
import { DZIKRA_OFFICIAL_CONTACT } from '../data/dzikraData';

interface FooterProps {
  units: BusinessUnit[];
  mainLogo?: string;
  onSelectUnit: (unitId: number) => void;
}

export const Footer: React.FC<FooterProps> = ({ units, mainLogo, onSelectUnit }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09090b] text-white/75 border-t border-white/10">
      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {mainLogo ? (
                <div className="w-12 h-12 rounded-2xl bg-[#14121d] border border-[#ffd700]/30 p-1.5 flex items-center justify-center overflow-hidden shadow-lg">
                  <img
                    src={mainLogo}
                    alt="Logo Dzikra Grup"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ffd700] to-[#cca300] text-[#09090b] flex items-center justify-center font-serif font-black text-lg shadow-lg">
                  DZ
                </div>
              )}
              <div>
                <span className="font-serif font-black text-xl text-white block tracking-wide">
                  DZIKRA GRUP
                </span>
                <span className="text-[11px] text-[#ffd700] font-medium font-serif italic">
                  Bersinergi, Berkarya, Bertumbuh Bersama
                </span>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed font-light">
              Holding terintegrasi 10 unit usaha di bawah naungan <strong>KSU Karomah Sinergi Indonesia</strong>. Menghadirkan solusi finansial simpan-pinjam amanah, inovasi teknologi perbankan koperasi, produk olahan cokelat, dan pariwisata terpadu.
            </p>

            <div className="pt-2 space-y-2 text-xs text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ffd700] shrink-0 mt-0.5" />
                <span className="text-[11px] text-white/60 leading-relaxed">
                  {DZIKRA_OFFICIAL_CONTACT.headOffice}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#ffd700] shrink-0" />
                <a href={`https://wa.me/${DZIKRA_OFFICIAL_CONTACT.cleanWA}`} target="_blank" rel="noreferrer" className="text-white hover:text-[#ffd700] font-mono text-xs">
                  WA Hotline: {DZIKRA_OFFICIAL_CONTACT.hotlineWA}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#ffd700]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Badan Hukum Koperasi Resmi Republik Indonesia</span>
            </div>
          </div>

          {/* 10 Unit Usaha Quick Links */}
          <div className="lg:col-span-5">
            <h4 className="font-serif font-bold text-sm text-[#ffd700] mb-4 uppercase tracking-wider">
              10 Unit Usaha Dzikra
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {units.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    onSelectUnit(u.id);
                    const el = document.getElementById('halaman-unit') || document.getElementById('unit');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left py-1 text-white/60 hover:text-[#ffd700] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="text-[10px] font-mono text-white/40 group-hover:text-[#ffd700]">0{u.id}.</span>
                  <span className="truncate">{u.shortName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Navigation & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-sm text-[#ffd700] uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#beranda" className="text-white/60 hover:text-[#ffd700] transition-colors">Beranda</a></li>
              <li><a href="#tentang" className="text-white/60 hover:text-[#ffd700] transition-colors">Tentang Kami & Pilar Nilai</a></li>
              <li><a href="#berita" className="text-white/60 hover:text-[#ffd700] transition-colors">Berita & Kegiatan Dzikra</a></li>
              <li><a href="#simpanpinjam" className="text-white/60 hover:text-[#ffd700] transition-colors">Layanan Simpan Pinjam</a></li>
              <li><a href="#digital" className="text-white/60 hover:text-[#ffd700] transition-colors">Keuangan Digital & Portofolio</a></li>
              <li><a href="#produk" className="text-white/60 hover:text-[#ffd700] transition-colors">Katalog Produk & Merek</a></li>
              <li><a href="#cokusi" className="text-white/60 hover:text-[#ffd700] transition-colors">Cokusi Adventure Cafe</a></li>
              <li><a href="#galeri" className="text-white/60 hover:text-[#ffd700] transition-colors">Galeri Foto & Video</a></li>
              <li><a href="#kontak" className="text-white/60 hover:text-[#ffd700] transition-colors">Kontak & FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#050507] py-5 px-4 border-t border-white/5 text-xs text-white/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span>© 2026 Dzikra Grup & KSU Karomah Sinergi Indonesia. Seluruh hak cipta dilindungi.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center gap-1.5 text-xs transition-colors cursor-pointer border border-white/10"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#ffd700]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
