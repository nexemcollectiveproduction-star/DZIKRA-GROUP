import React from 'react';
import { 
  Compass, 
  Coffee, 
  Mountain, 
  MapPin, 
  Clock, 
  Phone, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ExternalLink 
} from 'lucide-react';

interface CokusiAdventureSectionProps {
  onSelectUnit: (unitId: number) => void;
}

export const CokusiAdventureSection: React.FC<CokusiAdventureSectionProps> = ({
  onSelectUnit,
}) => {
  const adventureFeatures = [
    {
      title: 'Nuansa Petualangan Tropis',
      desc: 'Area duduk outdoor di bawah rindang pepohonan dan interior rustic kayu jati yang asri.',
    },
    {
      title: 'Menu Cokelat & Kopi Khas',
      desc: 'Paduan minuman cokelat Cokusi Kameumeut dan racikan biji kopi pilihan Cafe Sepertiga Malam.',
    },
    {
      title: 'Showroom Produk Dzikra Mart',
      desc: 'Beli langsung oleh-oleh cokelat, biji kopi, batik/busana Dzi, dan aromaterapi Lervara.',
    },
    {
      title: 'Paket Gathering & Outbound',
      desc: 'Fasilitas sound system, proyektor, area camping & glamping bersama CV. Karomah Indonesia.',
    },
  ];

  return (
    <section id="cokusi" className="py-24 bg-[#09090b] text-[#f4efe8] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffd700]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8c5b36]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffd700]/15 border border-[#ffd700]/30 text-[#ffd700] text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Destinasi & Ruang Kolaborasi</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white mt-1">
            Cokusi Adventure Cafe & Wisata
          </h2>
          <div className="w-20 h-1 bg-[#ffd700] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Tempat menikmati hidangan nikmat, berkumpul bersama keluarga atau rekan kerja, berbagi cerita inspiratif, sekaligus pusat etalase produk unggulan 10 unit Dzikra Group.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Card Info */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-white leading-snug">
              Tempat Bertemunya Ide, Cita Rasa, dan Keindahan Alam
            </h3>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed font-light">
              Cokusi Adventure didesain sebagai ekosistem pertemuan terpadu. Dari secangkir cokelat hangat asli kebun kakao lokal hingga ruang rapat komunitas lengkap, kami menyambut Anda dengan kehangatan kekeluargaan koperasi.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {adventureFeatures.map((f, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#14121d] border border-white/10 shadow-lg">
                  <div className="flex items-center gap-2 font-serif font-bold text-sm text-white mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#ffd700] shrink-0" />
                    <span>{f.title}</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="https://wa.me/6281312271662?text=Halo%20Admin%20Cokusi%20Adventure,%20saya%20ingin%20reservasi%20tempat%20/%20tanya%20paket%20gathering."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#09090b]" />
                <span>Reservasi Tempat / Gathering</span>
              </a>

              <button
                onClick={() => onSelectUnit(4)}
                className="px-5 py-3.5 rounded-2xl bg-[#14121d] hover:bg-[#1a1726] text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Lihat Profil Unit Cafe (Unit #4)</span>
              </button>
            </div>
          </div>

          {/* Right Showcase Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#181726] to-[#09090b] p-6 sm:p-8 rounded-3xl border border-[#ffd700]/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-serif font-bold text-base text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ffd700]" />
                <span>Jam Operasional & Lokasi</span>
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#ffd700]/20 text-[#ffd700] px-2 py-0.5 rounded-md font-bold">
                Buka Setiap Hari
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/60">Senin — Jumat:</span>
                <strong className="text-white font-mono">10.00 — 22.00 WIB</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/60">Sabtu — Minggu:</span>
                <strong className="text-[#ffd700] font-mono">08.00 — 23.00 WIB</strong>
              </div>
              <div className="flex items-start gap-2 pt-2 text-white/80">
                <MapPin className="w-4 h-4 text-[#ffd700] shrink-0 mt-0.5" />
                <span className="text-xs">Kawasan Wisata Terpadu Dzikra, Jl. Puncak Hijau No. 12</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-[#ffd700] block">
                ⭐ Promo Spesial Anggota Koperasi
              </span>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Dapatkan diskon 10% untuk seluruh menu makanan & minuman dengan menunjukkan kartu e-KTA KSU Karomah Sinergi Indonesia di kasir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
