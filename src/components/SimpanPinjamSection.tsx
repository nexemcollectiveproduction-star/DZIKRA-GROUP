import React, { useState } from 'react';
import { SavingsProduct, LoanProduct } from '../types';
import { 
  Coins, 
  Wallet, 
  Calculator, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Info, 
  Percent, 
  Calendar,
  Send,
  FileCheck,
  TrendingUp,
  Download
} from 'lucide-react';

interface SimpanPinjamSectionProps {
  savingsList: SavingsProduct[];
  loansList: LoanProduct[];
  onOpenApplyLoanModal: (loanName?: string) => void;
}

export const SimpanPinjamSection: React.FC<SimpanPinjamSectionProps> = ({
  savingsList,
  loansList,
  onOpenApplyLoanModal,
}) => {
  const [activeTab, setActiveTab] = useState<'simpanan' | 'pinjaman' | 'kalkulator'>('simpanan');

  // Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(10000000);
  const [loanTenure, setLoanTenure] = useState<number>(12); // months
  const [loanRatePerMonth, setLoanRatePerMonth] = useState<number>(0.9); // percent per month
  const [selectedLoanType, setSelectedLoanType] = useState<string>('Pinjaman Modal Usaha');

  // Calculation formulas (Flat rate koperasi)
  const monthlyPrincipal = Math.round(loanAmount / loanTenure);
  const monthlyInterest = Math.round((loanAmount * (loanRatePerMonth / 100)));
  const totalMonthlyInstallment = monthlyPrincipal + monthlyInterest;
  const totalRepayment = totalMonthlyInstallment * loanTenure;
  const totalInterestPaid = monthlyInterest * loanTenure;

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  return (
    <section id="simpanpinjam" className="py-24 bg-[#09090b] text-[#f4efe8] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700] font-mono">
            KSU Karomah Sinergi Indonesia
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white mt-2 relative inline-block">
            Layanan Simpan Pinjam Koperasi
          </h2>
          <div className="w-20 h-1 bg-[#ffd700] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Layanan keuangan lengkap, aman, terpercaya, berprinsip koperasi — bunga/margin rendah, SHU dibagikan setiap tahun, tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Tab Toggle Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#14121d] p-1.5 rounded-2xl border border-white/10 shadow-lg flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('simpanan')}
              className={`px-5 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'simpanan'
                  ? 'bg-gradient-to-r from-[#ffd700] to-[#e6b800] text-[#09090b] shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>8 Jenis Simpanan</span>
            </button>

            <button
              onClick={() => setActiveTab('pinjaman')}
              className={`px-5 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'pinjaman'
                  ? 'bg-gradient-to-r from-[#ffd700] to-[#e6b800] text-[#09090b] shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>6 Jenis Pinjaman</span>
            </button>

            <button
              onClick={() => setActiveTab('kalkulator')}
              className={`px-5 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'kalkulator'
                  ? 'bg-gradient-to-r from-[#ffd700] to-[#e6b800] text-[#09090b] shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Kalkulator Simulasi</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 8 JENIS SIMPANAN */}
        {activeTab === 'simpanan' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-[#14121d] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    Daftar 8 Jenis Simpanan Anggota
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 mt-1">
                    Semua simpanan berhak atas bagi hasil Sisa Hasil Usaha (SHU) tahunan secara adil dan transparan.
                  </p>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-[#ffd700]/15 text-[#ffd700] text-xs font-bold font-mono border border-[#ffd700]/30">
                  Bebas Biaya Admin Bulanan
                </span>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#181726] text-[#ffd700] text-xs font-mono uppercase tracking-wider border-b border-white/10">
                      <th className="p-3.5 rounded-tl-xl">No</th>
                      <th className="p-3.5">Jenis Simpanan</th>
                      <th className="p-3.5">Sifat & Ketentuan</th>
                      <th className="p-3.5">Manfaat & Keunggulan</th>
                      <th className="p-3.5 rounded-tr-xl">Bagi Hasil / Syarat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                    {savingsList.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-bold font-mono text-[#ffd700]">
                          0{item.id}
                        </td>
                        <td className="p-3.5 font-semibold text-white">
                          <div>{item.name}</div>
                          <span className="text-[10px] text-[#ffd700]/70 font-mono font-normal">
                            {item.type}
                          </span>
                        </td>
                        <td className="p-3.5 text-white/80">
                          <span className="font-medium text-white">{item.nature}</span>
                          <div className="text-[11px] text-white/60 mt-0.5">{item.withdrawalTerms}</div>
                        </td>
                        <td className="p-3.5 text-white/75 leading-relaxed font-light">
                          {item.benefits}
                        </td>
                        <td className="p-3.5">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-white/10 text-[#ffd700] font-bold text-xs font-mono border border-white/10">
                            {item.interestRate}
                          </span>
                          <div className="text-[10px] text-white/50 mt-1 font-mono">{item.minDeposit}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 6 JENIS PINJAMAN */}
        {activeTab === 'pinjaman' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-[#14121d] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    Daftar 6 Jenis Pinjaman & Pembiayaan
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 mt-1">
                    Proses cepat, syarat mudah, margin berkeadilan untuk mendukung kesejahteraan dan modal usaha anggota.
                  </p>
                </div>
                <button
                  onClick={() => onOpenApplyLoanModal()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] text-[#09090b] text-xs font-bold shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Formulir Pengajuan Online</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#181726] text-[#ffd700] text-xs font-mono uppercase tracking-wider border-b border-white/10">
                      <th className="p-3.5 rounded-tl-xl">No</th>
                      <th className="p-3.5">Jenis Pinjaman</th>
                      <th className="p-3.5">Tujuan Utama</th>
                      <th className="p-3.5">Jangka Waktu (Tenor)</th>
                      <th className="p-3.5">Keunggulan & Jasa</th>
                      <th className="p-3.5 rounded-tr-xl text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                    {loansList.map((loan) => (
                      <tr key={loan.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-bold font-mono text-[#ffd700]">
                          0{loan.id}
                        </td>
                        <td className="p-3.5 font-semibold text-white">
                          <div>{loan.name}</div>
                          <span className="text-[10px] text-[#ffd700]/70 font-mono font-normal">
                            Plafon: {loan.maxAmount}
                          </span>
                        </td>
                        <td className="p-3.5 text-white/75 leading-relaxed font-light">
                          {loan.purpose}
                        </td>
                        <td className="p-3.5 text-white/80">
                          <span className="font-semibold">{loan.tenure}</span>
                        </td>
                        <td className="p-3.5 text-white/80 leading-relaxed">
                          <span className="text-[#ffd700] font-bold font-mono">{loan.interestRate}</span>
                          <div className="text-xs text-white/60 mt-0.5">{loan.advantages}</div>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              setSelectedLoanType(loan.name);
                              setActiveTab('kalkulator');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#ffd700] hover:text-[#09090b] text-[#ffd700] text-xs font-bold transition-colors whitespace-nowrap border border-white/10 cursor-pointer"
                          >
                            Simulasi
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KALKULATOR SIMULASI PINJAMAN INTERAKTIF */}
        {activeTab === 'kalkulator' && (
          <div className="bg-[#14121d] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd700]/15 text-[#ffd700] text-xs font-bold font-mono mb-2 border border-[#ffd700]/30">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Kalkulator Transparan KSU Karomah Sinergi</span>
                </div>
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-white">
                  Simulasi Angsuran Pinjaman
                </h3>
                <p className="text-xs sm:text-sm text-white/60 mt-1">
                  Hitung perkiraan angsuran bulanan, porsi pokok, dan jasa koperasi secara akurat.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Left */}
                <div className="lg:col-span-6 space-y-5 bg-[#181722] p-6 rounded-3xl border border-white/10">
                  <div>
                    <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1.5">
                      1. Pilih Jenis Pinjaman
                    </label>
                    <select
                      value={selectedLoanType}
                      onChange={(e) => setSelectedLoanType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#09090b] text-xs sm:text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                    >
                      {loansList.map((l) => (
                        <option key={l.id} value={l.name}>
                          {l.name} ({l.maxAmount})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#ffd700] uppercase font-mono">
                        2. Jumlah Pinjaman (Plafon)
                      </label>
                      <span className="font-serif font-black text-sm text-[#ffd700]">
                        {formatRupiah(loanAmount)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1000000}
                      max={100000000}
                      step={500000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full accent-[#ffd700] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-white/50 font-mono mt-1">
                      <span>Rp 1 Juta</span>
                      <span>Rp 50 Juta</span>
                      <span>Rp 100 Juta</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#ffd700] uppercase font-mono">
                        3. Jangka Waktu (Tenor)
                      </label>
                      <span className="font-serif font-bold text-sm text-[#ffd700]">
                        {loanTenure} Bulan
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[3, 6, 12, 24, 36, 48, 60].map((months) => (
                        <button
                          key={months}
                          type="button"
                          onClick={() => setLoanTenure(months)}
                          className={`py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                            loanTenure === months
                              ? 'bg-[#ffd700] text-[#09090b] shadow-md font-black'
                              : 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {months} Bln
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#ffd700] uppercase font-mono">
                        4. Estimasi Jasa Pinjaman
                      </label>
                      <span className="font-mono font-bold text-xs text-[#ffd700]">
                        {loanRatePerMonth}% / bulan
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[0.75, 0.85, 0.9, 1.0, 1.2].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setLoanRatePerMonth(rate)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                            loanRatePerMonth === rate
                              ? 'bg-[#ffd700] text-[#09090b] font-bold'
                              : 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {rate}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calculation Summary Right */}
                <div className="lg:col-span-6 bg-gradient-to-br from-[#181726] to-[#09090b] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#ffd700]/30 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-[#ffd700] font-mono font-bold uppercase tracking-wider block mb-1">
                      Estimasi Rincian Angsuran
                    </span>
                    <h4 className="font-serif font-black text-3xl sm:text-4xl text-[#ffd700] mt-1">
                      {formatRupiah(totalMonthlyInstallment)}
                      <span className="text-xs text-white/70 font-sans font-normal ml-2">/ bulan</span>
                    </h4>

                    <div className="mt-6 space-y-3.5 text-xs sm:text-sm border-t border-white/15 pt-5">
                      <div className="flex justify-between text-white/80">
                        <span>Plafon Pinjaman:</span>
                        <strong className="text-white font-mono">{formatRupiah(loanAmount)}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Pokok per Bulan:</span>
                        <strong className="text-white font-mono">{formatRupiah(monthlyPrincipal)}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Jasa Koperasi per Bulan ({loanRatePerMonth}%):</span>
                        <strong className="text-[#ffd700] font-mono">{formatRupiah(monthlyInterest)}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Total Pengembalian ({loanTenure} bln):</span>
                        <strong className="text-white font-mono">{formatRupiah(totalRepayment)}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Estimasi Porsi SHU Anggota:</span>
                        <strong className="text-emerald-400 font-mono">Kembali ke Anggota</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/15 space-y-3">
                    <button
                      onClick={() => onOpenApplyLoanModal(selectedLoanType)}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#09090b]" />
                      <span>Ajukan Pinjaman Ini Sekarang</span>
                    </button>
                    <p className="text-[11px] text-white/50 text-center">
                      *Hasil simulasi bersifat estimasi acuan. Syarat & persetujuan final mengacu pada verifikasi pengurus KSU Karomah Sinergi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
