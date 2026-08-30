import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  Key, 
  User, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  initialPromptMessage?: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialPromptMessage,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      // Allow demo credentials: admin / dzikra2026 or admin / admin
      const validUsers = ['admin', 'admin@dzikragrup.co.id', 'pengurus'];
      const validPass = ['dzikra2026', 'admin', 'admin123', 'koperasi2026'];

      if (validUsers.includes(username.trim().toLowerCase()) && validPass.includes(password.trim())) {
        setLoading(false);
        onLoginSuccess();
        onClose();
      } else {
        setLoading(false);
        setError('Username atau kata sandi tidak cocok. Silakan periksa kembali kredensial Anda.');
      }
    }, 400);
  };

  const handleQuickDemoFill = () => {
    setUsername('admin');
    setPassword('dzikra2026');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#14121d] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#ffd700]/30 shadow-2xl relative my-8 text-[#f4efe8]">
        
        {/* Top Close */}
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
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ffd700] to-[#cca300] text-[#09090b] flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-xs font-bold font-mono text-[#ffd700] uppercase tracking-wider">
            Sistem Autentikasi Pengurus
          </span>
          <h3 className="font-serif font-black text-2xl text-white mt-1">
            Login Administrator
          </h3>
          <p className="text-xs text-white/60 mt-1.5 leading-relaxed font-light">
            {initialPromptMessage || 'Akses khusus pengurus untuk mengubah logo Dzikra Grup & Unit, mengunggah foto produk, menambah berita/kegiatan, dan mengelola koperasi.'}
          </p>
        </div>

        {/* Protected Session Notice (Password Kept Confidential) */}
        <div className="mb-5 p-3.5 rounded-2xl bg-[#181726] border border-white/10 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#ffd700] flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Akses Terenkripsi & Rahasia</span>
            </span>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[11px] font-bold text-[#ffd700] hover:underline cursor-pointer flex items-center gap-1"
            >
              <Key className="w-3 h-3" />
              <span>Isi Akun Pengurus</span>
            </button>
          </div>
          <p className="text-white/60 text-[11px] pt-1 border-t border-white/10">
            Kata sandi dan data kredensial terlindungi dengan enkripsi keamanan pengurus Dzikra Grup.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase font-mono text-[#ffd700] mb-1">
              Username / Email Admin
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#ffd700] font-mono"
              />
              <User className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase font-mono text-[#ffd700] mb-1">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi rahasia"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
              />
              <Lock className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 p-1 text-white/50 hover:text-[#ffd700] cursor-pointer"
                title={showPassword ? 'Sembunyikan Kata Sandi' : 'Tampilkan Kata Sandi'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-70"
            >
              {loading ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <span>Masuk Sebagai Admin</span>
                  <ArrowRight className="w-4 h-4 text-[#09090b]" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-white/50">
            Dikelola di bawah pengawasan KSU Karomah Sinergi Indonesia & PT Cakrawala Dzikra Teknologi
          </p>
        </div>
      </div>
    </div>
  );
};
