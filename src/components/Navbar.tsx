import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Wallet, 
  Calculator, 
  PhoneCall, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  Search,
  Lock,
  LogOut,
  SlidersHorizontal,
  Newspaper
} from 'lucide-react';

interface NavbarProps {
  isAdmin?: boolean;
  mainLogo?: string;
  onOpenMemberModal: () => void;
  onOpenLoanModal: () => void;
  onSelectUnit: (unitId: number) => void;
  onOpenAdminLogin: () => void;
  onOpenAdminDashboard: () => void;
  onAdminLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAdmin = false,
  mainLogo,
  onOpenMemberModal,
  onOpenLoanModal,
  onSelectUnit,
  onOpenAdminLogin,
  onOpenAdminDashboard,
  onAdminLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang Kami', href: '#tentang' },
    { label: '10 Unit Usaha', href: '#unit' },
    { label: 'Berita & Kegiatan', href: '#berita' },
    { label: 'Simpan Pinjam', href: '#simpanpinjam' },
    { label: 'Keuangan Digital', href: '#digital' },
    { label: 'Produk & Merek', href: '#produk' },
    { label: 'Cokusi Adventure', href: '#cokusi' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/95 backdrop-blur-md text-[#f4efe8] shadow-2xl border-b border-white/10">
      {/* Top Banner Notice */}
      <div className="bg-[#121118] py-1.5 px-4 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[#ffd700] font-medium text-[11px] sm:text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ffd700] shrink-0" />
            <span>KSU Karomah Sinergi Indonesia — Badan Hukum Koperasi Resmi & Terpercaya</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-white/80">
            <span className="hidden md:inline">🕒 Kantor Pelayanan: Senin - Sabtu (08.00 - 16.00 WIB)</span>
            
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAdminDashboard}
                  className="px-2.5 py-0.5 rounded-full bg-[#ffd700] text-[#09090b] font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Panel Admin Aktif</span>
                </button>
                <button
                  onClick={onAdminLogout}
                  className="text-red-400 hover:text-red-300 text-[10px] underline cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenAdminLogin}
                className="text-white/80 hover:text-[#ffd700] font-semibold flex items-center gap-1 cursor-pointer"
                title="Login khusus pengurus untuk mengubah logo, foto produk, kelola berita & koperasi"
              >
                <Lock className="w-3 h-3 text-[#ffd700]" />
                <span>Login Pengurus / Admin</span>
              </button>
            )}

            <button 
              onClick={onOpenMemberModal}
              className="text-[#ffd700] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Portal Anggota</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a href="#beranda" className="flex items-center gap-3.5 group">
            {mainLogo ? (
              <div className="w-12 h-12 rounded-2xl bg-[#14121d] border border-[#ffd700]/30 p-1.5 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                <img
                  src={mainLogo}
                  alt="Logo Dzikra Grup"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ffd700] via-[#ffe066] to-[#e6a800] text-[#09090b] flex items-center justify-center font-serif font-black text-xl shadow-lg border border-white/20 group-hover:scale-105 transition-transform">
                DZ
              </div>
            )}
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif font-extrabold text-xl sm:text-2xl tracking-wide text-white group-hover:text-[#ffd700] transition-colors">
                  DZIKRA <span className="text-[#ffd700]">GRUP</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffd700]/15 text-[#ffd700] text-[10px] font-bold uppercase tracking-wider border border-[#ffd700]/30 hidden sm:inline-block font-mono">
                  10 Unit
                </span>
              </div>
              <span className="text-[11px] text-white/60 tracking-tight font-medium line-clamp-1">
                Bersinergi, Berkarya, Bertumbuh Bersama
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-2.5 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-[#ffd700] hover:bg-white/5 transition-all whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {isAdmin ? (
              <button
                onClick={onOpenAdminDashboard}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] text-[#09090b] text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
                title="Kelola Logo Dzikra Grup, Unit, Berita & Koperasi"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Panel Pengelolaan</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Login khusus pengurus"
              >
                <Lock className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>Admin</span>
              </button>
            )}

            <button
              onClick={onOpenLoanModal}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Hitung estimasi cicilan pinjaman"
            >
              <Calculator className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Simulasi</span>
            </button>

            <button
              onClick={onOpenMemberModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] text-xs font-bold shadow-md transition-all flex items-center gap-1.5 hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Wallet className="w-3.5 h-3.5 text-[#09090b]" />
              <span>Cek Saldo</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenMemberModal}
              className="p-2 rounded-xl bg-[#ffd700] text-[#09090b] sm:hidden text-xs font-bold flex items-center gap-1"
            >
              <Wallet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 text-white hover:bg-white/10 border border-white/10 focus:outline-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#121118] border-t border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenMemberModal();
              }}
              className="p-2.5 rounded-xl bg-[#ffd700] text-[#09090b] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              <span>Cek Saldo Anggota</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLoanModal();
              }}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#ffd700]" />
              <span>Kalkulator Pinjaman</span>
            </button>
          </div>

          {isAdmin ? (
            <div className="p-3 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-xl flex items-center justify-between">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdminDashboard();
                }}
                className="text-xs font-bold text-[#ffd700] flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Panel Pengelolaan Admin</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAdminLogout();
                }}
                className="text-xs text-red-400 font-semibold cursor-pointer"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdminLogin();
              }}
              className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/90 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#ffd700]" />
              <span>Login Administrator / Pengurus</span>
            </button>
          )}

          <div className="border-t border-white/10 pt-2 grid grid-cols-2 sm:grid-cols-3 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-medium text-white/80 hover:text-[#ffd700] hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>KSU Karomah Sinergi Indonesia</span>
            <a href="https://wa.me/6281388990012" target="_blank" rel="noreferrer" className="text-[#ffd700] flex items-center gap-1">
              <PhoneCall className="w-3 h-3" />
              <span>WhatsApp Admin</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
