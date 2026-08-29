import React, { useState } from 'react';
import { 
  X, 
  Coins, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Calculator, 
  User, 
  Phone, 
  CreditCard, 
  Building,
  ArrowLeft,
  Home
} from 'lucide-react';
import { LOAN_PRODUCTS } from '../data/dzikraData';

interface LoanApplicationModalProps {
  isOpen: boolean;
  defaultLoanType?: string;
  onClose: () => void;
  onSubmitLoan?: (application: {
    id: string;
    fullName: string;
    nik: string;
    phone: string;
    loanType: string;
    amount: number;
    tenure: number;
    purpose: string;
    date: string;
    status: 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak';
  }) => void;
}

export const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({
  isOpen,
  defaultLoanType,
  onClose,
  onSubmitLoan,
}) => {
  const [loanType, setLoanType] = useState(defaultLoanType || 'Pinjaman Modal Usaha');
  const [fullName, setFullName] = useState('');
  const [nik, setNik] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('10000000');
  const [tenure, setTenure] = useState('12');
  const [purpose, setPurpose] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const appRecord = {
      id: `LOAN-${Date.now().toString().slice(-5)}`,
      fullName: fullName.trim(),
      nik: nik.trim(),
      phone: phone.trim(),
      loanType,
      amount: Number(amount) || 10000000,
      tenure: Number(tenure) || 12,
      purpose: purpose.trim() || 'Modal Usaha',
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Menunggu Persetujuan' as const,
    };

    onSubmitLoan?.(appRecord);

    const waText = `Halo Pengurus KSU Karomah Sinergi Indonesia (Dzikra Grup), saya ingin mengajukan pembiayaan/pinjaman:
- ID Pengajuan: ${appRecord.id}
- Jenis Pinjaman: ${loanType}
- Nama: ${fullName}
- NIK: ${nik}
- No. HP: ${phone}
- Plafon Pengajuan: Rp ${Number(amount).toLocaleString('id-ID')}
- Tenor: ${tenure} Bulan
- Keperluan: ${purpose || 'Modal Usaha'}`;

    window.open(`https://wa.me/6281388990012?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#14121d] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#ffd700]/30 shadow-2xl relative my-8 text-[#f4efe8]">
        
        {/* Top bar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/90 text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Kembali</span>
          </button>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-white">
              Pengajuan Telah Diterima!
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-md mx-auto font-light">
              Data permohonan pinjaman <strong>{loanType}</strong> sebesar <strong>Rp {Number(amount).toLocaleString('id-ID')}</strong> telah diteruskan ke komite kredit KSU Karomah Sinergi.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] text-[#09090b] text-xs font-bold cursor-pointer shadow-md"
              >
                Tutup & Kembali ke Beranda
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#ffd700] uppercase tracking-wider mb-1">
              <Coins className="w-4 h-4" />
              <span>KSU Karomah Sinergi Indonesia</span>
            </div>
            <h3 className="font-serif font-black text-2xl text-white">
              Formulir Pengajuan Pinjaman
            </h3>
            <p className="text-xs text-white/60 mt-1 mb-6 font-light">
              Isi data permohonan dengan benar. Proses verifikasi berkas cepat (1-3 hari kerja).
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                  Pilih Skema Pinjaman *
                </label>
                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs sm:text-sm bg-[#09090b] text-white focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                >
                  {LOAN_PRODUCTS.map((l) => (
                    <option key={l.id} value={l.name}>
                      {l.name} — Tenor s.d. {l.tenure}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                    Nama Lengkap Pemohon *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sesuai KTP"
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                    Nomor NIK KTP *
                  </label>
                  <input
                    type="text"
                    required
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="16 digit NIK"
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs sm:text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08123456789"
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs sm:text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                    Tenor (Bulan)
                  </label>
                  <select
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  >
                    <option value="6">6 Bulan</option>
                    <option value="12">12 Bulan</option>
                    <option value="24">24 Bulan</option>
                    <option value="36">36 Bulan</option>
                    <option value="60">60 Bulan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                  Jumlah Plafon Pengajuan (Rp) *
                </label>
                <input
                  type="number"
                  step="500000"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Contoh: 10000000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs sm:text-sm font-mono font-bold focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                  Tujuan Penggunaan Dana Pinjaman
                </label>
                <textarea
                  rows={2}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Contoh: Penambahan stok barang dagangan toko kelontong"
                  className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#09090b]" />
                  <span>Kirim Berkas Pengajuan</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
