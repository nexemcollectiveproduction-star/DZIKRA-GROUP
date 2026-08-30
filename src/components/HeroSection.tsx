import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Coins, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  Layers, 
  Newspaper,
  ChevronDown,
  Edit3,
  Image as ImageIcon,
  Star
} from 'lucide-react';

interface HeroSectionProps {
  mainLogo?: string;
  isAdmin?: boolean;
  onOpenEditLogo: () => void;
  onOpenLoanModal: () => void;
  onOpenMemberModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  mainLogo,
  isAdmin,
  onOpenEditLogo,
  onOpenLoanModal,
  onOpenMemberModal,
}) => {
  return (
    <section id="beranda" className="relative bg-[#09090b] text-[#f4efe8] overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Decorative Gold & Obsidian Glows */}
      <div className="absolute top-0 left-1/3 w-[32rem] h-[32rem] bg-[#ffd700]/12 rounded-full blur-[100px] pointer-events-none animate-pulse-gold" />
      <div className="absolute bottom-0 right-1/4 w-[38rem] h-[38rem] bg-[#8c5b36]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Animated Main Dzikra Group Official Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 flex flex-col items-center group relative"
          >
            {/* Elegant Floating Wrapper with Continuous Gentle Motion */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 0.8, -0.8, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="relative cursor-pointer"
            >
              {/* Rotating Gold Halo Aura */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-tr from-[#ffd700]/40 via-[#ffe57f]/10 to-[#e6a800]/40 blur-xl -z-10 pointer-events-none"
              />

              {/* Pulsing Backlight Ring */}
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-[#ffd700]/50 via-[#ffe066]/30 to-[#d4af37]/50 blur-sm -z-5 animate-pulse-gold pointer-events-none" />

              {/* Floating Sparkle Accents */}
              <motion.div 
                animate={{ 
                  scale: [0.85, 1.25, 0.85],
                  opacity: [0.5, 1, 0.5],
                  rotate: [0, 45, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 text-[#ffd700] z-20 pointer-events-none drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>

              <motion.div 
                animate={{ 
                  scale: [1, 0.8, 1],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-2 -left-2 text-[#ffd700] z-20 pointer-events-none drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]"
              >
                <Star className="w-4 h-4 fill-[#ffd700]" />
              </motion.div>

              {mainLogo ? (
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-[#14121d] border-2 border-[#ffd700]/60 p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(255,215,0,0.25)] overflow-hidden flex items-center justify-center relative backdrop-blur-xl">
                  {/* Diagonal Light Shimmer Reflection */}
                  <motion.div 
                    animate={{
                      x: ['-120%', '200%']
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-10"
                  />
                  <img
                    id="logo-dzikra-utama"
                    src={mainLogo}
                    alt="Logo Resmi Dzikra Group"
                    className="w-full h-full object-contain filter drop-shadow-md relative z-5"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-[#ffd700] via-[#ffe066] to-[#d4af37] text-[#09090b] flex items-center justify-center font-serif font-black text-3xl sm:text-4xl shadow-[0_12px_36px_rgba(0,0,0,0.7),0_0_28px_rgba(255,215,0,0.4)] border-2 border-white/40 relative overflow-hidden">
                  <motion.div 
                    animate={{
                      x: ['-120%', '200%']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none z-10"
                  />
                  DZ
                </div>
              )}

              {/* Quick Action Button to Edit/Change Logo (Only visible to authenticated Administrator) */}
              {isAdmin && (
                <button
                  type="button"
                  onClick={onOpenEditLogo}
                  className="absolute -bottom-2 -right-2 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#cca300] hover:from-[#ffe066] hover:to-[#b38f00] text-[#09090b] text-[11px] font-extrabold shadow-xl border border-white/30 flex items-center gap-1.5 cursor-pointer hover:scale-110 active:scale-95 transition-all z-30"
                  title="Edit dan Ganti Logo Dzikra Group"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#09090b]" />
                  <span>Ganti Logo</span>
                </button>
              )}
            </motion.div>

            {isAdmin && (
              <button
                type="button"
                onClick={onOpenEditLogo}
                className="mt-3 text-xs text-[#ffd700]/80 hover:text-[#ffd700] font-semibold flex items-center gap-1.5 cursor-pointer hover:underline"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>Kelola / Ganti Logo Dzikra & Unit Usaha</span>
              </button>
            )}
          </motion.div>

          {/* Official Badge with Subtle Glow & Sparkle */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181722]/90 border border-[#ffd700]/40 text-[#ffd700] text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md mb-6 shadow-[0_4px_16px_rgba(255,215,0,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-[#ffd700]" />
            <span>Ekosistem Terintegrasi 10 Unit Usaha & Koperasi</span>
          </motion.div>

          {/* Animated Main Title (DZIKRA GROUP - Moving Liquid Gold & Prestigious Motion) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.12] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <span className="inline-block hover:scale-[1.02] transition-transform duration-300">
                DZIKRA
              </span>{' '}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ffffff] via-[#ffe066] to-[#f39c12] bg-[length:250%_250%] animate-gold-shimmer drop-shadow-[0_4px_24px_rgba(255,215,0,0.4)] hover:scale-[1.02] transition-transform duration-300">
                GROUP
              </span>
            </h1>

            {/* Glowing Golden Accent Line Under Title */}
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#ffd700]/70 to-[#ffd700]" />
              <div className="w-2 h-2 rounded-full bg-[#ffd700] shadow-[0_0_8px_#ffd700] animate-pulse-gold" />
              <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#ffd700]/70 to-[#ffd700]" />
            </div>
          </motion.div>

          {/* Slogan with Animated Elegant Entrance */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-5 text-lg sm:text-xl md:text-2xl text-[#ffd700] font-serif italic max-w-3xl leading-relaxed drop-shadow-md"
          >
            "Bersinergi, Berkarya, Bertumbuh Bersama — Mewujudkan Kesejahteraan Secara Bersama"
          </motion.p>

          {/* Descriptive Text */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 text-sm sm:text-base md:text-lg text-white/80 max-w-3xl leading-relaxed font-light"
          >
            Dzikra Group adalah wadah persatuan <strong className="text-white font-semibold">10 unit usaha</strong> dan layanan keuangan berbasis prinsip koperasi. Menyediakan layanan simpan-pinjam lengkap, perbankan digital, perdagangan, produk unggulan, kuliner, pariwisata, serta kegiatan sosial untuk kemajuan bersama seluruh anggota dan masyarakat.
          </motion.p>

          {/* 4 Main Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full"
          >
            <a
              href="#berita"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] font-bold text-sm sm:text-base shadow-[0_4px_20px_rgba(255,215,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,215,0,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group"
            >
              <Newspaper className="w-4 h-4 text-[#09090b] group-hover:scale-110 transition-transform" />
              <span>Berita & Kegiatan Terkini</span>
            </a>

            <a
              href="#unit"
              className="px-6 py-3.5 rounded-2xl bg-[#14121d] hover:bg-[#1a1726] text-white font-semibold text-sm sm:text-base border border-white/15 backdrop-blur-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2 shadow-lg"
            >
              <Building2 className="w-4 h-4 text-[#ffd700]" />
              <span>10 Unit Usaha</span>
            </a>

            <a
              href="#simpanpinjam"
              className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/90 font-medium text-sm sm:text-base border border-white/10 transition-all flex items-center gap-2"
            >
              <Coins className="w-4 h-4 text-[#ffd700]" />
              <span>Layanan Koperasi</span>
            </a>

            <a
              href="#kontak"
              className="px-5 py-3.5 rounded-2xl bg-transparent hover:bg-white/5 text-white/90 font-medium text-sm sm:text-base border border-dashed border-white/20 transition-all flex items-center gap-2"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-4 h-4 text-[#ffd700]" />
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-14 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl"
          >
            <div className="p-5 rounded-3xl bg-[#14121d]/90 border border-white/10 flex flex-col items-center shadow-lg hover:border-[#ffd700]/30 transition-all">
              <span className="font-serif font-black text-2xl sm:text-3xl text-[#ffd700]">10</span>
              <span className="text-xs text-white/60 font-medium mt-1">Unit Usaha Sinergi</span>
            </div>
            <div className="p-5 rounded-3xl bg-[#14121d]/90 border border-white/10 flex flex-col items-center shadow-lg hover:border-[#ffd700]/30 transition-all">
              <span className="font-serif font-black text-2xl sm:text-3xl text-[#ffd700]">8</span>
              <span className="text-xs text-white/60 font-medium mt-1">Jenis Rekening Simpanan</span>
            </div>
            <div className="p-5 rounded-3xl bg-[#14121d]/90 border border-white/10 flex flex-col items-center shadow-lg hover:border-[#ffd700]/30 transition-all">
              <span className="font-serif font-black text-2xl sm:text-3xl text-[#ffd700]">6</span>
              <span className="text-xs text-white/60 font-medium mt-1">Skema Pinjaman Produktif</span>
            </div>
            <div className="p-5 rounded-3xl bg-[#14121d]/90 border border-white/10 flex flex-col items-center shadow-lg hover:border-[#ffd700]/30 transition-all">
              <span className="font-serif font-black text-2xl sm:text-3xl text-[#ffd700]">100%</span>
              <span className="text-xs text-white/60 font-medium mt-1">Transparansi Koperasi</span>
            </div>
          </motion.div>

          {/* Scroll down indicator */}
          <a 
            href="#tentang" 
            className="mt-12 text-white/40 hover:text-[#ffd700] transition-colors flex flex-col items-center gap-1 text-xs"
          >
            <span>Gulir untuk eksplorasi</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
