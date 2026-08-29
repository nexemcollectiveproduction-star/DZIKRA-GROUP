import React, { useState } from 'react';
import { DigitalFeature, MemberAccountDemo } from '../types';
import { DEMO_MEMBER_ACCOUNTS } from '../data/dzikraData';
import { 
  Smartphone, 
  Wallet, 
  FileText, 
  TrendingUp, 
  ArrowLeftRight, 
  QrCode, 
  Zap, 
  DownloadCloud, 
  BellRing, 
  CreditCard, 
  Clock, 
  ShoppingBag, 
  CheckSquare,
  ShieldCheck,
  Search,
  UserCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface DigitalFinanceSectionProps {
  features: DigitalFeature[];
  onOpenMemberModal: () => void;
}

export const DigitalFinanceSection: React.FC<DigitalFinanceSectionProps> = ({
  features,
  onOpenMemberModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('Semua');
  const [memberIdInput, setMemberIdInput] = useState<string>('DZ-08812');
  const [searchedAccount, setSearchedAccount] = useState<MemberAccountDemo | null>(
    DEMO_MEMBER_ACCOUNTS['DZ-08812']
  );

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wallet': return Wallet;
      case 'FileText': return FileText;
      case 'TrendingUp': return TrendingUp;
      case 'ArrowLeftRight': return ArrowLeftRight;
      case 'QrCode': return QrCode;
      case 'Zap': return Zap;
      case 'DownloadCloud': return DownloadCloud;
      case 'BellRing': return BellRing;
      case 'CreditCard': return CreditCard;
      case 'Clock': return Clock;
      case 'ShoppingBag': return ShoppingBag;
      case 'CheckSquare': return CheckSquare;
      default: return Smartphone;
    }
  };

  const handleSearchMember = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = memberIdInput.trim().toUpperCase();
    if (DEMO_MEMBER_ACCOUNTS[cleanId]) {
      setSearchedAccount(DEMO_MEMBER_ACCOUNTS[cleanId]);
    } else {
      // Create a simulated fallback record
      setSearchedAccount({
        memberNo: cleanId || 'DZ-CUSTOM',
        fullName: 'Anggota Koperasi Mitra',
        joinedDate: '01 Januari 2024',
        status: 'Terdaftar — KSU Karomah Sinergi',
        totalSimpananPokok: 100000,
        totalSimpananWajib: 450000,
        totalSimpananSukarela: 1250000,
        totalSimpananBerjangka: 0,
        pinjamanAktif: null,
        estimasiSHU: 240000,
        transaksiTerakhir: [
          { id: 'TRX-901', tanggal: '20 Agu 2026', keterangan: 'Simpanan Sukarela Harian', jenis: 'kredit', nominal: 100000 },
        ],
      });
    }
  };

  const formatRupiah = (num: number) => 'Rp ' + num.toLocaleString('id-ID');

  const categories = ['Semua', 'Rekening', 'Pembiayaan', 'Pembayaran', 'Laporan', 'Keamanan'];
  const filteredFeatures = activeFilter === 'Semua' 
    ? features 
    : features.filter(f => f.category === activeFilter);

  return (
    <section id="digital" className="py-24 bg-[#09090b] text-[#f4efe8] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700] font-mono">
            Teknologi Modern Perbankan Koperasi
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white mt-2 relative inline-block">
            Keuangan Digital Dzikra
          </h2>
          <div className="w-20 h-1 bg-[#ffd700] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Didukung oleh <strong>PT. Cakrawala Dzikra Teknologi</strong>, nikmati kemudahan transaksi setara perbankan modern: cek saldo, bayar tagihan, QRIS, hingga pantau SHU langsung dari genggaman.
          </p>
        </div>

        {/* Interactive Member Portal Demo Bar */}
        <div className="mb-16 bg-gradient-to-br from-[#181726] to-[#09090b] text-white rounded-3xl p-6 sm:p-10 border border-[#ffd700]/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
            <div className="lg:max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd700]/15 text-[#ffd700] text-xs font-mono font-bold mb-3 border border-[#ffd700]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Simulasi Portal Layanan Anggota</span>
              </div>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-white">
                Cek Saldo & Portofolio Koperasi
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed font-light">
                Ketikkan Nomor Anggota Anda untuk simulasi cek saldo simpanan, pinjaman berjalan, dan estimasi pembagian SHU.
              </p>

              {/* Input search */}
              <form onSubmit={handleSearchMember} className="mt-5 flex gap-2">
                <input
                  type="text"
                  value={memberIdInput}
                  onChange={(e) => setMemberIdInput(e.target.value)}
                  placeholder="Contoh: DZ-08812 atau DZ-09551"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#09090b] border border-white/20 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffd700] font-mono"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#ffd700] hover:bg-[#e6c200] text-[#09090b] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Search className="w-4 h-4" />
                  <span>Cek</span>
                </button>
              </form>

              <div className="flex gap-2 mt-2 text-[11px] text-white/50">
                <span>Contoh ID Anggota:</span>
                <button
                  type="button"
                  onClick={() => {
                    setMemberIdInput('DZ-08812');
                    setSearchedAccount(DEMO_MEMBER_ACCOUNTS['DZ-08812']);
                  }}
                  className="text-[#ffd700] hover:underline font-mono cursor-pointer"
                >
                  DZ-08812
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => {
                    setMemberIdInput('DZ-09551');
                    setSearchedAccount(DEMO_MEMBER_ACCOUNTS['DZ-09551']);
                  }}
                  className="text-[#ffd700] hover:underline font-mono cursor-pointer"
                >
                  DZ-09551
                </button>
              </div>
            </div>

            {/* Member Account View Card */}
            {searchedAccount && (
              <div className="w-full lg:flex-1 bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-[#ffd700] font-mono uppercase tracking-wider block">
                      ID Anggota: {searchedAccount.memberNo}
                    </span>
                    <h4 className="font-serif font-bold text-lg sm:text-xl text-white mt-0.5">
                      {searchedAccount.fullName}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono border border-emerald-500/40">
                    {searchedAccount.status}
                  </span>
                </div>

                {/* Savings balances grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-white/60 block">Simpanan Pokok</span>
                    <strong className="text-xs sm:text-sm text-white font-mono">
                      {formatRupiah(searchedAccount.totalSimpananPokok)}
                    </strong>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-white/60 block">Simpanan Wajib</span>
                    <strong className="text-xs sm:text-sm text-white font-mono">
                      {formatRupiah(searchedAccount.totalSimpananWajib)}
                    </strong>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-white/60 block">Tabungan Sukarela</span>
                    <strong className="text-xs sm:text-sm text-[#ffd700] font-mono">
                      {formatRupiah(searchedAccount.totalSimpananSukarela)}
                    </strong>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-white/60 block">Estimasi SHU Tahun Ini</span>
                    <strong className="text-xs sm:text-sm text-emerald-400 font-mono">
                      {formatRupiah(searchedAccount.estimasiSHU)}
                    </strong>
                  </div>
                </div>

                {/* Pinjaman status if any */}
                {searchedAccount.pinjamanAktif ? (
                  <div className="p-3 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-xl text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="font-bold text-[#ffd700]">Pinjaman Aktif: </span>
                      <span>{searchedAccount.pinjamanAktif.jenis}</span>
                    </div>
                    <div className="font-mono text-white/90">
                      Sisa Pokok: {formatRupiah(searchedAccount.pinjamanAktif.sisaPokok)} ({searchedAccount.pinjamanAktif.sisaBulan} bln lagi)
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-white/5 rounded-xl text-xs text-white/70 border border-white/5">
                    Tidak ada kewajiban pinjaman aktif saat ini. Anda berhak mengajukan pembiayaan baru.
                  </div>
                )}

                {/* Action button */}
                <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                  <button
                    onClick={onOpenMemberModal}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    <span>Buka Rincian Lengkap e-KTA</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ffd700]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 12+ Features Grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="font-serif font-bold text-2xl text-white">
              12+ Fitur Unggulan Ekosistem Keuangan Digital
            </h3>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-[#ffd700] text-[#09090b] font-bold shadow-sm'
                      : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredFeatures.map((feat) => {
              const IconComp = getFeatureIcon(feat.icon);
              return (
                <div
                  key={feat.id}
                  className="bg-[#14121d] rounded-3xl p-5 border border-white/10 shadow-lg flex flex-col justify-between hover:border-[#ffd700]/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-white/5 group-hover:bg-[#ffd700] text-[#ffd700] group-hover:text-[#09090b] flex items-center justify-center transition-all">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        feat.status === 'Aktif'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {feat.status}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-white group-hover:text-[#ffd700] transition-colors">
                      {feat.title}
                    </h4>

                    <p className="text-xs text-white/65 mt-2 leading-relaxed font-light">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#ffd700]/70">
                    <span>Kategori: {feat.category}</span>
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
