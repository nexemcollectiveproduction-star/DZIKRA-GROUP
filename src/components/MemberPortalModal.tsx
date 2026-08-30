import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  QrCode, 
  Printer, 
  ShieldCheck, 
  TrendingUp, 
  ArrowDownLeft, 
  ArrowUpRight, 
  User, 
  Calendar,
  Sparkles,
  CreditCard,
  Home,
  ArrowLeft
} from 'lucide-react';
import { DEMO_MEMBER_ACCOUNTS } from '../data/dzikraData';
import { MemberAccountDemo } from '../types';

interface MemberPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberAccounts?: Record<string, MemberAccountDemo>;
  mainLogo?: string;
}

export const MemberPortalModal: React.FC<MemberPortalModalProps> = ({
  isOpen,
  onClose,
  memberAccounts,
  mainLogo,
}) => {
  const accountsSource = memberAccounts || DEMO_MEMBER_ACCOUNTS;
  const availableIds = Object.keys(accountsSource);
  const [selectedId, setSelectedId] = useState<string>(availableIds[0] || 'DZ-08812');
  const account: MemberAccountDemo = accountsSource[selectedId] || accountsSource['DZ-08812'] || Object.values(accountsSource)[0];

  if (!isOpen || !account) return null;

  const formatRupiah = (num: number) => 'Rp ' + (num || 0).toLocaleString('id-ID');

  const handleReturnHome = () => {
    onClose();
    const beranda = document.getElementById('beranda');
    if (beranda) {
      beranda.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#14121d] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#ffd700]/30 shadow-2xl relative my-8 text-[#f4efe8]">
        
        {/* Top Header Actions (Kembali ke Beranda & Close Button) */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <button
            onClick={handleReturnHome}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#ffd700] hover:text-[#09090b] text-white text-xs font-bold transition-all border border-white/10 flex items-center gap-1.5 cursor-pointer shadow-md"
            title="Kembali ke Halaman Beranda Utama"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Member Selector & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-bold font-mono text-[#ffd700] uppercase tracking-wider">
              Portal Keanggotaan Koperasi
            </span>
            <h3 className="font-serif font-black text-2xl text-white">
              e-KTA & Buku Tabungan Digital
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-white/60">Pilih Akun:</span>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-white/15 bg-[#09090b] font-bold text-[#ffd700] focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
            >
              {availableIds.map((id) => (
                <option key={id} value={id}>
                  {id} ({accountsSource[id]?.fullName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Digital e-KTA Card */}
        <div className="my-6 p-6 rounded-3xl bg-gradient-to-br from-[#181726] via-[#121118] to-[#09090b] text-white shadow-2xl border border-[#ffd700]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#ffd700]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10 mb-6">
            <div className="flex items-center gap-3">
              {mainLogo ? (
                <div className="w-11 h-11 rounded-2xl bg-[#0d0c13] border border-[#ffd700]/30 p-1 flex items-center justify-center shadow-md overflow-hidden">
                  <img
                    src={mainLogo}
                    alt="Logo Dzikra Group"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ffd700] to-[#cca300] text-[#09090b] flex items-center justify-center font-serif font-black text-lg shadow-md">
                  DZ
                </div>
              )}
              <div>
                <h4 className="font-serif font-black text-lg text-white">
                  KSU KAROMAH SINERGI INDONESIA
                </h4>
                <span className="text-[10px] text-[#ffd700] font-mono tracking-widest uppercase">
                  Dzikra Group Holding
                </span>
              </div>
            </div>

            <div className="p-2 bg-white/10 rounded-2xl border border-white/15">
              <QrCode className="w-9 h-9 text-[#ffd700]" />
            </div>
          </div>

          <div className="relative z-10 space-y-1">
            <span className="text-[10px] text-white/50 font-mono uppercase">Nama Pemilik e-KTA</span>
            <h5 className="font-serif font-bold text-xl text-white tracking-wide">
              {account.fullName}
            </h5>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono relative z-10">
            <div>
              <span className="text-white/50 block text-[9px]">NOMOR ANGGOTA</span>
              <strong className="text-[#ffd700] font-bold text-sm">{account.memberNo}</strong>
            </div>
            <div>
              <span className="text-white/50 block text-[9px]">BERGABUNG SEJAK</span>
              <span className="text-white">{account.joinedDate}</span>
            </div>
            <div>
              <span className="text-white/50 block text-[9px]">STATUS</span>
              <span className="text-emerald-400 font-bold">AKTIF</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-[#181722] border border-white/5">
            <span className="text-[10px] text-white/50 font-mono block">Simpanan Pokok</span>
            <strong className="font-serif font-bold text-sm text-white">
              {formatRupiah(account.totalSimpananPokok)}
            </strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#181722] border border-white/5">
            <span className="text-[10px] text-white/50 font-mono block">Simpanan Wajib</span>
            <strong className="font-serif font-bold text-sm text-white">
              {formatRupiah(account.totalSimpananWajib)}
            </strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#181722] border border-white/5">
            <span className="text-[10px] text-white/50 font-mono block">Tabungan Sukarela</span>
            <strong className="font-serif font-bold text-sm text-[#ffd700]">
              {formatRupiah(account.totalSimpananSukarela)}
            </strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#181722] border border-white/5">
            <span className="text-[10px] text-white/50 font-mono block">Estimasi SHU</span>
            <strong className="font-serif font-bold text-sm text-emerald-400">
              {formatRupiah(account.estimasiSHU)}
            </strong>
          </div>
        </div>

        {/* Transaction Ledger Table */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-serif font-bold text-sm text-white">
              Mutasi Rekening Terakhir
            </h5>
            <span className="text-[11px] text-[#ffd700]/70 font-mono">Tervalidasi Sistem Digital</span>
          </div>

          <div className="border border-white/10 rounded-2xl overflow-hidden text-xs bg-[#181722]">
            <div className="divide-y divide-white/5">
              {(account.transaksiTerakhir || []).map((trx) => (
                <div key={trx.id} className="p-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      trx.jenis === 'kredit' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {trx.jenis === 'kredit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="font-semibold text-white block">{trx.keterangan}</span>
                      <span className="text-[10px] text-white/50 font-mono">{trx.tanggal} • {trx.id}</span>
                    </div>
                  </div>
                  <strong className={`font-mono ${trx.jenis === 'kredit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {trx.jenis === 'kredit' ? '+' : '-'}{formatRupiah(trx.nominal)}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Bar (Kembali ke Beranda & Cetak Rekening Koran) */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleReturnHome}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5 text-[#09090b]" />
              <span>Cetak Rekening Koran</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
