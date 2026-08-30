import React from 'react';
import { 
  Building2, 
  Wallet, 
  Coins, 
  Layers, 
  Smartphone, 
  Award,
  CheckCircle2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const StatsSection: React.FC = () => {
  const statsRows = [
    { label: 'Unit Usaha Terafiliasi', value: '10 Unit', desc: 'Sinergi multi-sektor teknologi, kuliner, wisata, fashion & logistik', icon: Building2, highlight: true },
    { label: 'Jenis Rekening & Simpanan', value: '8 Jenis', desc: 'Simpanan Pokok, Wajib, Sukarela Harian hingga Berjangka Berkah', icon: Wallet, highlight: false },
    { label: 'Jenis Pinjaman & Pembiayaan', value: '6 Jenis', desc: 'Modal Usaha, Produktif, Darurat dengan jasa ringan berkeadilan', icon: Coins, highlight: false },
    { label: 'Kelompok Layanan Lengkap', value: '5 Bidang', desc: 'Finansial, Teknologi, F&B, Pariwisata/Jasa, dan Manufaktur', icon: Layers, highlight: false },
    { label: 'Fitur Keuangan Digital', value: '12+ Fitur', desc: 'Mobile app, Cek Saldo, QRIS, PPOB, Autodebet & E-Statement', icon: Smartphone, highlight: false },
    { label: 'Produk & Merek Unggulan', value: '5+ Merek', desc: 'Cokusi Kameumeut, Kopi Sepertiga Malam, Lervara, Dzi Collection', icon: Award, highlight: false },
  ];

  return (
    <section className="py-20 bg-[#09090b] border-y border-white/5 text-[#f4efe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700] font-mono">
            Transparansi & Skala Operasional
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white mt-2 relative inline-block">
            Data Singkat Dzikra Group
          </h2>
          <div className="w-20 h-1 bg-[#ffd700] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Ringkasan kapabilitas menyeluruh ekosistem Dzikra Group dan KSU Karomah Sinergi Indonesia dalam melayani kebutuhan anggota dan masyarakat.
          </p>
        </div>

        {/* Highlight Stats Table Card */}
        <div className="max-w-4xl mx-auto bg-[#14121d] rounded-3xl shadow-xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 bg-[#181726] text-[#ffd700] flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2 font-serif font-bold text-base sm:text-lg">
              <ShieldCheck className="w-5 h-5 text-[#ffd700]" />
              <span>Tabel Statistik & Jangkauan Layanan</span>
            </div>
            <span className="text-xs text-white/60 font-mono">Update 2026</span>
          </div>

          <div className="divide-y divide-white/5">
            {statsRows.map((row, idx) => {
              const IconComp = row.icon;
              return (
                <div 
                  key={idx} 
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition-colors ${
                    row.highlight ? 'bg-white/[0.02]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 ${
                      row.highlight ? 'bg-[#ffd700]/15 text-[#ffd700]' : 'bg-white/5 text-white/80'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-white">
                        {row.label}
                      </h4>
                      <p className="text-xs text-white/60 mt-0.5 font-light">
                        {row.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center sm:justify-end shrink-0 pl-13 sm:pl-0">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-[#ffd700] text-[#09090b] shadow-md font-mono">
                      {row.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
