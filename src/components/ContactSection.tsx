import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  ShieldCheck 
} from 'lucide-react';
import { BusinessUnit } from '../types';
import { DZIKRA_OFFICIAL_CONTACT } from '../data/dzikraData';

interface ContactSectionProps {
  units: BusinessUnit[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ units }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [interestType, setInterestType] = useState('Pendaftaran Anggota Koperasi');
  const [selectedUnit, setSelectedUnit] = useState('KSU Karomah Sinergi Indonesia');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana cara bergabung menjadi Anggota KSU Karomah Sinergi Indonesia?',
      a: 'Sangat mudah! Anda cukup mengisi formulir online di portal ini atau datang langsung ke kantor pusat dengan membawa KTP dan menyetorkan Simpanan Pokok awal sebesar Rp 100.000,- (sekali seumur hidup) serta Simpanan Wajib bulanan. Anda langsung mendapatkan e-KTA dan hak atas bagi hasil SHU.',
    },
    {
      q: 'Apakah non-anggota bisa memesan produk atau berkunjung ke Cokusi Cafe?',
      a: 'Tentu saja! Seluruh unit ritel seperti Cokusi Kameumeut, Cokusi Adventure Cafe, Cafe Sepertiga Malam, Dzi Collection, dan wisata terbuka untuk masyarakat umum. Namun anggota koperasi mendapatkan keuntungan tambahan berupa diskon khusus dan poin SHU.',
    },
    {
      q: 'Bagaimana transparansi pembagian Sisa Hasil Usaha (SHU)?',
      a: 'SHU dihitung berdasarkan proporsi keaktifan simpanan dan transaksi pembiayaan anggota dalam 1 tahun buku. Laporan keuangan diaudit secara berkala dan dipertanggungjawabkan dalam Rapat Anggota Tahunan (RAT) terbuka.',
    },
    {
      q: 'Bagaimana perusahaan atau instansi mengajukan kerjasama B2B dengan Dzikra Grup?',
      a: 'Silakan gunakan formulir kontak di bawah atau hubungi hotline WhatsApp resmi kami. Tim kemitraan Dzikra Grup siap melayani pengadaan seragam, suvenir cokelat korporat, paket wisata gathering, hingga sistem IT koperasi.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitted(true);

    const textMessage = `Halo Admin Dzikra Grup & KSU Karomah Sinergi, saya ingin mengajukan kerjasama / layanan:
- Nama: ${fullName}
- No. HP: ${phone}
- Kategori: ${interestType}
- Unit Tujuan: ${selectedUnit}
- Pesan: ${message || '-'}`;

    const waUrl = `https://wa.me/${DZIKRA_OFFICIAL_CONTACT.cleanWA}?text=${encodeURIComponent(textMessage)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="kontak" className="py-24 bg-[#09090b] text-[#f4efe8] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700] font-mono">
            Pusat Komunikasi & Kemitraan
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white mt-2 relative inline-block">
            Kontak & Pengajuan Kerjasama
          </h2>
          <div className="w-20 h-1 bg-[#ffd700] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Hubungi kami untuk informasi keanggotaan koperasi, konsultasi pinjaman, pemesanan produk, reservasi kafe wisata, atau kemitraan bisnis strategis.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Contact Details & Office */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#14121d] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg space-y-5">
              <h3 className="font-serif font-bold text-xl text-white">
                Kantor Pusat Dzikra Grup
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                Pusat administrasi terpadu KSU Karomah Sinergi Indonesia dan seluruh holding unit usaha.
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-white/80 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 text-[#ffd700] flex items-center justify-center shrink-0 border border-white/10 mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white">Alamat Kantor Pusat (Head Office):</strong>
                    <span className="text-white/75 text-xs leading-relaxed block mt-0.5">
                      {DZIKRA_OFFICIAL_CONTACT.headOffice}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 text-[#ffd700] flex items-center justify-center shrink-0 border border-white/10">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white">Hotline / WhatsApp Gateway Server:</strong>
                    <a href={`https://wa.me/${DZIKRA_OFFICIAL_CONTACT.cleanWA}`} target="_blank" rel="noreferrer" className="text-[#ffd700] hover:underline font-mono font-bold">
                      {DZIKRA_OFFICIAL_CONTACT.hotlineWA}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 text-[#ffd700] flex items-center justify-center shrink-0 border border-white/10">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white">Email Resmi:</strong>
                    <span className="font-mono text-xs text-white/60">{DZIKRA_OFFICIAL_CONTACT.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 text-[#ffd700] flex items-center justify-center shrink-0 border border-white/10">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white">Jam Pelayanan Kantor:</strong>
                    <span className="text-white/60 text-xs">{DZIKRA_OFFICIAL_CONTACT.officeHours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#ffd700] font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Koperasi Berbadan Hukum Resmi & Terdaftar</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Form */}
          <div className="lg:col-span-7 bg-[#14121d] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-lg">
            <div className="mb-6">
              <span className="text-xs font-bold text-[#ffd700] font-mono uppercase tracking-wider block mb-1">
                Formulir Online
              </span>
              <h3 className="font-serif font-black text-2xl text-white">
                Kirim Pesan / Pengajuan Kerjasama
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1 font-light">
                Isi formulir berikut dan tim kami akan segera menghubungi Anda kembali melalui WhatsApp atau Email.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-white">
                  Terima Kasih, Pengajuan Anda Telah Terkirim!
                </h4>
                <p className="text-xs text-white/70 leading-relaxed max-w-md mx-auto font-light">
                  Data Anda telah kami catat dan pesan WhatsApp konfirmasi telah dibuka. Petugas kami akan membalas dalam kurun waktu 1x24 jam kerja.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#ffd700] text-[#09090b] text-xs font-bold cursor-pointer shadow-md"
                >
                  Kirim Pengajuan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#09090b] text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                      Nomor WhatsApp / HP *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08123456789"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#09090b] text-xs sm:text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                      Kategori Minat / Keperluan
                    </label>
                    <select
                      value={interestType}
                      onChange={(e) => setInterestType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                    >
                      <option value="Pendaftaran Anggota Koperasi">Pendaftaran Anggota Koperasi</option>
                      <option value="Pengajuan Pinjaman Modal Usaha">Pengajuan Pinjaman Modal Usaha</option>
                      <option value="Pemesanan Produk Grosir B2B">Pemesanan Produk Grosir B2B</option>
                      <option value="Reservasi Cokusi Adventure Cafe">Reservasi Cokusi Adventure Cafe</option>
                      <option value="Konsultasi IT & Koperasi Digital">Konsultasi IT & Koperasi Digital</option>
                      <option value="Kemitraan Usaha & Investasi">Kemitraan Usaha & Investasi</option>
                      <option value="Lainnya">Pertanyaan Umum / Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                      Unit Usaha Tujuan
                    </label>
                    <select
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                    >
                      <option value="Semua Unit Dzikra Grup">Semua Unit Dzikra Grup</option>
                      {units.map((u) => (
                        <option key={u.id} value={u.name}>
                          Unit #{u.id}: {u.shortName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#ffd700] uppercase font-mono mb-1">
                    Pesan / Keterangan Kebutuhan
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Jelaskan kebutuhan, pertanyaan, atau rencana kerjasama Anda secara singkat..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#09090b] text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#09090b]" />
                    <span>Kirim Pengajuan Sekarang</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-[#14121d] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#ffd700] font-mono uppercase tracking-wider">
              Tanya Jawab Populer
            </span>
            <h3 className="font-serif font-black text-2xl text-white mt-1">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h3>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-white/10">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-3 focus:outline-none cursor-pointer"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#ffd700] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <p className="mt-2.5 text-xs sm:text-sm text-white/70 leading-relaxed font-light pr-6 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
