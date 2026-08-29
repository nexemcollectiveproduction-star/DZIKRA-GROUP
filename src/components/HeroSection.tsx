import React from 'react';
import { 
  Building2, 
  Coins, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  Layers, 
  Newspaper,
  ChevronDown,
  Edit3,
  Image as ImageIcon
} from 'lucide-react';

interface HeroSectionProps {
  mainLogo?: string;
  isAdmin?: boolean;
  onOpenEditLogo: () => void;
  onOpenLoanModal: () => void;
  onOpenMemberModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  mainLogo,
  isAdmin,
  onOpenEditLogo,
  onOpenLoanModal,
  onOpenMemberModal,
}) => {
  return (
    <section id="beranda" className="relative bg-[#09090b] text-[#f4efe8] overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Decorative Gold & Obsidian Glows */}
      <div className="absolute top-0 left-1/3 w-[30rem] h-[30rem] bg-[#ffd700]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[36rem] h-[36rem] bg-[#8c5b36]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Main Dzikra Group Official Logo with Direct Edit/Change Button */}
          <div className="mb-6 flex flex-col items-center group relative">
            <div className="relative">
              {mainLogo ? (
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-[#14121d] border-2 border-[#ffd700]/40 p-3.5 shadow-2xl overflow-hidden hover:scale-105 transition-transform flex items-center justify-center">
                  <img
                    id="logo-dzikra-utama"
                    src={mainLogo}
                    alt="Logo Resmi Dzikra Grup"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#ffd700] via-[#ffe066] to-[#d4af37] text-[#09090b] flex items-center justify-center font-serif font-black text-3xl sm:text-4xl shadow-2xl border-2 border-white/20 hover:scale-105 transition-transform">
                  DZ
                </div>
              )}

              {/* Quick Action Button to Edit/Change Logo */}
              <button
                type="button"
                onClick={onOpenEditLogo}
                className="absolute -bottom-2 -right-2 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#cca300] hover:from-[#ffe066] hover:to-[#b38f00] text-[#09090b] text-[11px] font-extrabold shadow-xl border border-white/30 flex items-center gap-1.5 cursor-pointer hover:scale-110 active:scale-95 transition-all"
                title="Edit dan Ganti Logo Dzikra Grup"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#09090b]" />
                <span>Ganti Logo</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenEditLogo}
              className="mt-3 text-xs text-[#ffd700]/80 hover:text-[#ffd700] font-semibold flex items-center gap-1.5 cursor-pointer hover:underline"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Kelola / Ganti Logo Dzikra & Unit Usaha</span>
            </button>
          </div>

          {/* Official Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181722] border border-[#ffd700]/30 text-[#ffd700] text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md mb-6 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ekosistem Terintegrasi 10 Unit Usaha & Koperasi</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.15] drop-shadow-lg">
            DZIKRA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ffe57f] to-[#f39c12]">GRUP</span>
          </h1>

          {/* Slogan */}
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-[#ffd700] font-serif italic max-w-3xl leading-relaxed">
            "Bersinergi, Berkarya, Bertumbuh Bersama — Mewujudkan Kesejahteraan Secara Bersama"
          </p>

          {/* Descriptive Text */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-white/75 max-w-3xl leading-relaxed font-light">
            Dzikra Grup adalah wadah persatuan <strong>10 unit usaha</strong> dan layanan keuangan berbasis prinsip koperasi. Menyediakan layanan simpan-pinjam lengkap, perbankan digital, perdagangan, produk unggulan, kuliner, pariwisata, serta kegiatan sosial untuk kemajuan bersama seluruh anggota dan masyarakat.
          </p>

          {/* 4 Main Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
            <a
              href="#berita"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Newspaper className="w-4 h-4 text-[#09090b]" />
              <span>Berita & Kegiatan Terkini</span>
            </a>

            <a
              href="#unit"
              className="px-6 py-3.5 rounded-2xl bg-[#14121d] hover:bg-[#1a1726] text-white font-semibold text-sm sm:text-base border border-white/15 backdrop-blur-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#ffd700]" />
              <span>10 Unit Usaha</span>
            </a>

            <a
              href="#simpanpinjam"
              className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/90 font-medium text-sm sm:text-base border border-white/10 transition-all flex items-center gap-2"
            >
              <Coins className="w-4 h-4 text-[#ffd700]" />
              <span>Layanan Koperasi</span>
            </a>

            <a
              href="#kontak"
              className="px-5 py-3.5 rounded-2xl bg-transparent hover:bg-white/5 text-white/90 font-medium text-sm sm:text-base border border-dashed border-white/20 transition-all flex items-center gap-2"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-4 h-4 text-[#ffd700]" />
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl">
            <div className="p-5 rounded-3xl bg-[#14121d] border border-white/10 flex flex-col items-center shadow-lg">
              <span className="font-serif font-black text-2xl sm:text-3xl text-[#ffd700]">10</span>
              <span className="text-xs text-white/60 font-medium mt-1">Unit Usaha Sinergi</span>
            </div>
            <div className="p-5 rounded-3xl bg-[#14121d] border border-white/10 flex flex-col items-center shadow-lg">
              <span className="font-serif font-black text-2xl sm:text-3xl text-[#ffd700]">8</span>
              <span className="text-xs text-white/60 font-medium mt-1">Jenis Rekening Simpanan</span>
            </div>
            <div className="p-5 rounded-3xl bg-[#14121d] border border-white/10 flex flex-col items-center shadow-lg">
              <span className="font-serif font-black text-2xl sm:text-3xl text-[#ffd700]">6</span>
              <span className="text-xs text-white/60 font-medium mt-1">Skema Pinjaman Produktif</span>
            </div>
            <div className="p-5 rounded-3xl bg-[#14121d] border border-white/10 flex flex-col items-center shadow-lg">
              <span className="font-serif font-black text-2xl sm:text-3xl text-[#ffd700]">100%</span>
              <span className="text-xs text-white/60 font-medium mt-1">Transparansi Koperasi</span>
            </div>
          </div>

          {/* Scroll down indicator */}
          <a 
            href="#tentang" 
            className="mt-12 text-white/40 hover:text-[#ffd700] transition-colors flex flex-col items-center gap-1 text-xs"
          >
            <span>Gulir untuk eksplorasi</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
