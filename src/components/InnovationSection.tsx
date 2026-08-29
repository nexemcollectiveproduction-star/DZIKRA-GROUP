import React from 'react';
import { 
  Cpu, 
  Layers, 
  Lock, 
  Smartphone, 
  Database, 
  Cloud, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

interface InnovationSectionProps {
  onSelectUnit: (unitId: number) => void;
}

export const InnovationSection: React.FC<InnovationSectionProps> = ({
  onSelectUnit,
}) => {
  const techPillars = [
    {
      title: 'Cloud Cooperative ERP & Core Banking',
      desc: 'Sistem pembukuan tersentralisasi dengan pencatatan akuntansi ganda otomatis, buku tabungan anggota realtime, dan audit trail per transaksi.',
      icon: Database,
    },
    {
      title: 'Dzikra SuperApp Mobile',
      desc: 'Aplikasi Android & iOS yang memudahkan anggota mengakses informasi simpanan, mengajukan pinjaman kilat, dan belanja antar unit usaha.',
      icon: Smartphone,
    },
    {
      title: 'Standardisasi Enkripsi Keamanan Data',
      desc: 'Perlindungan data nasabah dengan enkripsi SSL 256-bit dan autentikasi multi-faktor (2FA) untuk memastikan keamanan saldo simpanan.',
      icon: Lock,
    },
    {
      title: 'Jaringan POS Kasir & QRIS Nasional',
      desc: 'Integrasi mesin kasir toko dan kafe grup dengan saldo tabungan anggota, mendukung pembayaran QRIS Bank Indonesia.',
      icon: Cpu,
    },
  ];

  return (
    <section id="inovasi" className="py-24 bg-[#09090b] text-[#f4efe8] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700] font-mono">
            Riset, Pengembangan & Digitalisasi
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white mt-2 relative inline-block">
            Inovasi & Teknologi Dzikra
          </h2>
          <div className="w-20 h-1 bg-[#ffd700] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Dipelopori oleh <strong>PT. Cakrawala Dzikra Teknologi</strong>, kami menghadirkan infrastruktur teknologi modern yang menjadikan koperasi berdaya saing global setara lembaga keuangan terkemuka.
          </p>
        </div>

        {/* 4 Tech Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {techPillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#14121d] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg hover:border-[#ffd700]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 text-[#ffd700] group-hover:bg-[#ffd700] group-hover:text-[#09090b] flex items-center justify-center mb-5 transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-black text-lg sm:text-xl text-white mb-2.5 group-hover:text-[#ffd700] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs font-semibold text-[#ffd700]">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  <span>Teknologi Standar Industri</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="bg-gradient-to-r from-[#181726] via-[#121118] to-[#181726] rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-[#ffd700]/30">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider">
              Konsultasi IT & Kemitraan Software
            </span>
            <h3 className="font-serif font-black text-2xl text-white">
              Ingin Menerapkan Sistem Koperasi Digital di Lembaga Anda?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl font-light">
              PT. Cakrawala Dzikra Teknologi membuka layanan implementasi perangkat lunak koperasi, website korporat, dan sistem simpan pinjam untuk koperasi rekanan di seluruh Indonesia.
            </p>
          </div>

          <button
            onClick={() => onSelectUnit(1)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] font-bold text-xs sm:text-sm shadow-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Hubungi Divisi Teknologi</span>
            <ArrowRight className="w-4 h-4 text-[#09090b]" />
          </button>
        </div>
      </div>
    </section>
  );
};
