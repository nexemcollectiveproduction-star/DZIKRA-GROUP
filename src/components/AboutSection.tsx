import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  HeartHandshake, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Building, 
  Sparkles,
  Layers,
  Scale,
  Crown,
  Briefcase,
  Palette,
  Package,
  Megaphone,
  MapPin,
  Phone
} from 'lucide-react';
import { DZIKRA_MANAGEMENT_TEAM, DZIKRA_OFFICIAL_CONTACT } from '../data/dzikraData';

export const AboutSection: React.FC = () => {
  const pilarLayanan = [
    {
      title: '1. Layanan Keuangan & Koperasi',
      desc: 'Pengelolaan simpan-pinjam, pembiayaan produktif, investasi berjangka, dan pembagian SHU adil di bawah KSU Karomah Sinergi Indonesia.',
    },
    {
      title: '2. Teknologi & Inovasi Digital',
      desc: 'Pengembangan sistem perbankan digital, software core cooperative, QRIS, POS kasir, dan aplikasi mobile oleh PT. Cakrawala Dzikra Teknologi.',
    },
    {
      title: '3. Kuliner, Kopi & Produk Olahan',
      desc: 'Olahan cokelat asli Cokusi Kameumeut, kedai Cokusi Adventure Cafe, dan racikan kopi nusantara Cafe Sepertiga Malam.',
    },
    {
      title: '4. Pariwisata & Pemberdayaan Jasa',
      desc: 'Destinasi wisata alam, outbound, glamping, serta program bina desa terpadu oleh CV. Karomah Indonesia.',
    },
    {
      title: '5. Perdagangan, Gaya Hidup & Rantai Pasok',
      desc: 'Pemasaran B2B CV. Sinergi Dzikra, butik Dzi Collection, gaya hidup modern Lervara, dan Unit Produksi & Distribusi terpusat.',
    },
  ];

  return (
    <section id="tentang" className="py-24 bg-[#09090b] text-[#f4efe8] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700] font-mono">
            Mengenal Lebih Dekat
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white mt-2 relative inline-block">
            Tentang Dzikra Group
          </h2>
          <div className="w-20 h-1 bg-[#ffd700] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-base text-white/70 leading-relaxed font-light">
            Menyatukan kekuatan 10 unit usaha dengan landasan prinsip koperasi gotong royong, menghadirkan ekosistem ekonomi mandiri yang menyejahterakan bersama.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700] text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Visi, Misi & Falsafah Dasar</span>
            </div>

            <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-white leading-tight">
              Membangun Kemandirian Ekonomi Berbasis Kepercayaan & Nilai Luhur
            </h3>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed font-light">
              Dzikra Group lahir dari semangat persaudaraan dan kebersamaan untuk menciptakan ekosistem bisnis yang tidak hanya berorientasi pada keuntungan materi, melainkan mengedepankan keberkahan, keadilan pembagian hasil usaha (SHU), dan pemberdayaan nyata bagi seluruh anggota.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#14121d] border border-white/10 shadow-lg">
                <div className="flex items-center gap-2.5 text-[#ffd700] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#ffd700]" />
                  <span>Badan Hukum Koperasi Resmi</span>
                </div>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  Dikelola secara sah di bawah KSU Karomah Sinergi Indonesia dengan pengawasan berkala dan audit transparan.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#14121d] border border-white/10 shadow-lg">
                <div className="flex items-center gap-2.5 text-[#ffd700] font-bold text-sm">
                  <Scale className="w-4 h-4 text-[#ffd700]" />
                  <span>Prinsip Bagi Hasil Berkah</span>
                </div>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  Keuntungan usaha dikembalikan kepada anggota dalam bentuk Sisa Hasil Usaha (SHU) dan peningkatan fasilitas.
                </p>
              </div>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#181726] to-[#0d0c13] text-white p-8 rounded-3xl shadow-2xl border border-[#ffd700]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#ffd700]/10 rounded-full blur-2xl pointer-events-none" />
            
            <span className="text-[#ffd700] text-xs font-mono font-bold uppercase tracking-widest block mb-2">
              Prinsip Kerja Sama
            </span>
            <h4 className="font-serif font-black text-2xl text-white mb-5">
              4 Pilar Nilai Dzikra
            </h4>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-[#ffd700] text-[#09090b] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-white block font-semibold">Bersinergi</strong>
                  <span className="text-xs text-white/70">Menggabungkan potensi 10 unit usaha agar saling menguatkan rantai nilai.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-[#ffd700] text-[#09090b] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-white block font-semibold">Berkarya</strong>
                  <span className="text-xs text-white/70">Menghasilkan produk berkualitas, inovasi teknologi, dan layanan bermutu tinggi.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-[#ffd700] text-[#09090b] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-white block font-semibold">Bertumbuh Bersama</strong>
                  <span className="text-xs text-white/70">Kemajuan usaha dinikmati seluruh anggota melalui pembagian SHU dan program sosial.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-[#ffd700] text-[#09090b] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <strong className="text-white block font-semibold">Kesejahteraan Berkelanjutan</strong>
                  <span className="text-xs text-white/70">Menciptakan lapangan kerja, edukasi bisnis, dan ketahanan finansial keluarga.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Struktur Organisasi & Manajemen Resmi */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700] font-mono">
              Kepemimpinan & Tata Kelola
            </span>
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-white mt-1">
              Struktur Kepengurusan & Tim Manajemen Resmi
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-2">
              Jajaran kepengurusan dan divisi pelaksana profesional yang mengawal tata kelola Dzikra Group & KSU Karomah Sinergi Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DZIKRA_MANAGEMENT_TEAM.map((member, idx) => {
              const isOwner = member.role.includes('OWNER');
              const isDirector = member.role.includes('DIREKTUR');
              
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isOwner
                      ? 'bg-gradient-to-br from-[#231f13] via-[#191624] to-[#12101b] border-2 border-[#ffd700] shadow-xl md:col-span-2 lg:col-span-1'
                      : isDirector
                      ? 'bg-gradient-to-br from-[#1a1728] to-[#13111d] border border-[#ffd700]/50 shadow-lg'
                      : 'bg-[#14121d] border border-white/10 hover:border-[#ffd700]/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                        isOwner
                          ? 'bg-[#ffd700] text-[#09090b]'
                          : isDirector
                          ? 'bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40'
                          : 'bg-white/5 text-white/70 border border-white/10'
                      }`}>
                        {member.badge}
                      </span>
                      {isOwner && <Crown className="w-4 h-4 text-[#ffd700]" />}
                      {isDirector && <Briefcase className="w-4 h-4 text-[#ffd700]" />}
                    </div>

                    <span className="text-xs font-mono font-semibold text-[#ffd700] uppercase block">
                      {member.role}
                    </span>

                    <h4 className={`font-serif font-black text-lg mt-1 text-white leading-snug ${
                      isOwner ? 'text-xl text-[#ffd700]' : ''
                    }`}>
                      {member.name}
                    </h4>

                    {member.description && (
                      <p className="text-xs text-white/65 mt-2.5 leading-relaxed font-light">
                        {member.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40 font-mono">
                    <span>Divisi {member.category}</span>
                    <span className="text-[#ffd700]">Dzikra Group</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Head Office Banner */}
          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-[#171522] to-[#100f18] border border-[#ffd700]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700] flex items-center justify-center shrink-0 mt-1">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#ffd700] font-bold uppercase tracking-wider block">
                  Kantor Pusat Resmi (Head Office)
                </span>
                <p className="text-xs sm:text-sm text-white/85 font-normal mt-0.5 leading-relaxed">
                  {DZIKRA_OFFICIAL_CONTACT.headOffice}
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${DZIKRA_OFFICIAL_CONTACT.cleanWA}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-[#ffd700] text-[#09090b] font-bold text-xs flex items-center gap-2 hover:bg-[#ffe066] transition-all shrink-0 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline {DZIKRA_OFFICIAL_CONTACT.hotlineWA}</span>
            </a>
          </div>
        </div>

        {/* 5 Kelompok Layanan Lengkap */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
              5 Kelompok Layanan Terpadu
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Cakupan sektor usaha yang saling terintegrasi dalam satu wadah manajemen Dzikra Group.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pilarLayanan.map((pilar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#14121d] border border-white/10 shadow-lg hover:border-[#ffd700]/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold font-mono text-[#ffd700] uppercase tracking-wider">
                    Sektor 0{idx + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#ffd700] group-hover:scale-125 transition-transform" />
                </div>
                <h4 className="font-serif font-bold text-base text-white mb-2 group-hover:text-[#ffd700] transition-colors">
                  {pilar.title}
                </h4>
                <p className="text-xs text-white/65 leading-relaxed font-light">
                  {pilar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
