import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Link as LinkIcon, 
  Image as ImageIcon,
  ShieldCheck,
  Building2,
  Lock,
  Layers
} from 'lucide-react';
import { DZIKRA_OFFICIAL_LOGO_SVG, DZIKRA_OFFICIAL_LOGO_LIGHT_SVG } from '../assets/dzikraLogo';
import { BusinessUnit } from '../types';

interface EditLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onRequireAdmin: (actionText?: string) => void;
  mainLogo?: string;
  onUploadMainLogo: (file: File) => void;
  onSetMainLogoDataUrl: (dataUrl: string) => void;
  onResetMainLogo: () => void;
  units: BusinessUnit[];
  unitLogos: Record<number, string>;
  onUploadUnitLogo: (unitId: number, file: File) => void;
  onResetUnitLogo: (unitId: number) => void;
}

export const EditLogoModal: React.FC<EditLogoModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onRequireAdmin,
  mainLogo,
  onUploadMainLogo,
  onSetMainLogoDataUrl,
  onResetMainLogo,
  units,
  unitLogos,
  onUploadUnitLogo,
  onResetUnitLogo,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'main' | 'units' | 'presets'>('main');
  const [customUrl, setCustomUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) {
      onRequireAdmin('mengubah logo Dzikra Group');
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onUploadMainLogo(file);
      showToast('Logo resmi Dzikra Group berhasil diperbarui!');
    }
  };

  const handleApplyUrl = () => {
    if (!isAdmin) {
      onRequireAdmin('mengubah logo Dzikra Group');
      return;
    }
    if (!customUrl.trim()) return;
    onSetMainLogoDataUrl(customUrl.trim());
    setCustomUrl('');
    setPreviewUrl(null);
    showToast('Tautan logo Dzikra Group berhasil diterapkan!');
  };

  const handlePresetSelect = (presetSvg: string, name: string) => {
    if (!isAdmin) {
      onRequireAdmin('menerapkan preset logo resmi Dzikra Group');
      return;
    }
    onSetMainLogoDataUrl(presetSvg);
    showToast(`Preset "${name}" berhasil diterapkan!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-[#121118] border border-[#ffd700]/30 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#ffd700]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-white/10 flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ffd700] to-[#cca300] text-[#09090b] flex items-center justify-center font-bold shadow-lg shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-black text-xl sm:text-2xl text-white">
                  Kelola & Ganti Logo Dzikra
                </h3>
                {isAdmin ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    ADMIN AKTIF
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    MODE LIHAT
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-white/60 mt-0.5">
                Sesuaikan logo resmi Dzikra Group (holding) dan logo khusus 10 unit usaha
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Notification */}
        {notification && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2.5 shadow-lg animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {!isAdmin && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#ffd700] shrink-0" />
              <span>Anda melihat pratinjau. Masuk sebagai Administrator untuk mengganti logo.</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onRequireAdmin('mengubah logo Dzikra');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#ffd700] text-[#09090b] text-xs font-bold hover:bg-[#ffe066] transition-colors cursor-pointer shrink-0"
            >
              Login Admin
            </button>
          </div>
        )}

        {/* Tab Selection */}
        <div className="px-6 pt-4 flex items-center gap-2 border-b border-white/10">
          <button
            onClick={() => setActiveSubTab('main')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-t border-x ${
              activeSubTab === 'main'
                ? 'bg-[#181722] text-[#ffd700] border-[#ffd700]/30 -mb-[1px]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Logo Utama Dzikra Group</span>
          </button>

          <button
            onClick={() => setActiveSubTab('presets')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-t border-x ${
              activeSubTab === 'presets'
                ? 'bg-[#181722] text-[#ffd700] border-[#ffd700]/30 -mb-[1px]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Preset Resmi</span>
          </button>

          <button
            onClick={() => setActiveSubTab('units')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-t border-x ${
              activeSubTab === 'units'
                ? 'bg-[#181722] text-[#ffd700] border-[#ffd700]/30 -mb-[1px]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Logo 10 Unit Usaha</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[60vh] overflow-y-auto space-y-6">
          {/* TAB 1: MAIN DZIKRA GROUP LOGO */}
          {activeSubTab === 'main' && (
            <div className="space-y-6">
              {/* Preview Card */}
              <div className="p-6 rounded-2xl bg-[#181722] border border-white/10 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-36 h-36 rounded-2xl bg-[#09090b] border-2 border-dashed border-[#ffd700]/50 p-3 flex items-center justify-center overflow-hidden shadow-inner shrink-0 relative group">
                  {mainLogo ? (
                    <img
                      src={mainLogo}
                      alt="Pratinjau Logo Dzikra"
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#ffd700] to-[#cca300] text-[#09090b] flex items-center justify-center font-serif font-black text-3xl">
                      DZ
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-serif font-black text-lg text-white">
                      Pratinjau Logo Aktif Saat Ini
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#ffd700]/15 text-[#ffd700] text-[10px] font-mono font-bold">
                      LIVE DI SELURUH HALAMAN
                    </span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Logo ini langsung tampil pada <strong>Navbar Utama</strong>, <strong>Hero Header</strong>, <strong>Footer Situs</strong>, dan <strong>Kartu Tanda Anggota (e-KTA)</strong> Dzikra Group.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.svg"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!isAdmin) {
                          onRequireAdmin('mengunggah logo Dzikra Group');
                          return;
                        }
                        fileInputRef.current?.click();
                      }}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#cca300] hover:from-[#ffe066] hover:to-[#b38f00] text-[#09090b] text-xs font-extrabold shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                    >
                      <Upload className="w-4 h-4 text-[#09090b]" />
                      <span>Pilih File Logo dari Perangkat</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!isAdmin) {
                          onRequireAdmin('mereset logo Dzikra Group');
                          return;
                        }
                        onResetMainLogo();
                        showToast('Logo resmi standar Dzikra Group telah dipulihkan.');
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-xs font-semibold border border-white/10 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#ffd700]" />
                      <span>Pulihkan Logo Resmi Asli</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Option 2: Upload via URL */}
              <div className="p-5 rounded-2xl bg-[#181722] border border-white/10 space-y-3">
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-[#ffd700]" />
                  <h5 className="font-serif font-bold text-sm text-white">
                    Atau Masukkan Tautan / URL Gambar Logo
                  </h5>
                </div>
                <p className="text-xs text-white/60">
                  Gunakan URL gambar online (HTTPS) berformat PNG transparan, JPG, SVG, atau WebP.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://contoh.com/logo-dzikra-group.png"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09090b] border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-hidden focus:border-[#ffd700]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    disabled={!customUrl.trim()}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#ffd700] hover:bg-[#ffe066] disabled:opacity-40 disabled:hover:bg-[#ffd700] text-[#09090b] text-xs font-bold whitespace-nowrap cursor-pointer transition-all shrink-0"
                  >
                    Terapkan URL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OFFICIAL PRESETS */}
          {activeSubTab === 'presets' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#181722] border border-white/10">
                <h4 className="font-serif font-black text-sm text-white mb-1">
                  Pilihan Varian Logo Resmi Dzikra Group
                </h4>
                <p className="text-xs text-white/60">
                  Pilih varian lambang resmi resolusi tinggi vektor berkualitas tinggi dengan teks semboyan <em>"Satu Atap, Berjuta Karya"</em>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Preset 1: Gold on Dark Text */}
                <div 
                  onClick={() => handlePresetSelect(DZIKRA_OFFICIAL_LOGO_SVG, 'Varian Emas & Teks Terang')}
                  className="p-5 rounded-2xl bg-[#181722] border border-[#ffd700]/30 hover:border-[#ffd700] flex flex-col items-center text-center cursor-pointer transition-all hover:scale-[1.02] group shadow-lg"
                >
                  <div className="w-28 h-28 p-2 rounded-xl bg-[#09090b] border border-[#ffd700]/20 flex items-center justify-center mb-3">
                    <img 
                      src={DZIKRA_OFFICIAL_LOGO_SVG} 
                      alt="Logo Emas Dzikra" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h5 className="font-serif font-bold text-sm text-[#ffd700] group-hover:underline">
                    Varian Emas & Teks Terang (Resmi)
                  </h5>
                  <p className="text-[11px] text-white/60 mt-1">
                    Optimal untuk latar belakang gelap dan tampilan navbar obsidian.
                  </p>
                  <span className="mt-3 px-3 py-1 rounded-full bg-[#ffd700]/20 text-[#ffd700] text-[10px] font-bold">
                    Gunakan Preset Ini
                  </span>
                </div>

                {/* Preset 2: Gold on Light Contrast Text */}
                <div 
                  onClick={() => handlePresetSelect(DZIKRA_OFFICIAL_LOGO_LIGHT_SVG, 'Varian Emas & Teks Kontras')}
                  className="p-5 rounded-2xl bg-[#181722] border border-white/15 hover:border-[#ffd700] flex flex-col items-center text-center cursor-pointer transition-all hover:scale-[1.02] group shadow-lg"
                >
                  <div className="w-28 h-28 p-2 rounded-xl bg-white border border-black/10 flex items-center justify-center mb-3">
                    <img 
                      src={DZIKRA_OFFICIAL_LOGO_LIGHT_SVG} 
                      alt="Logo Kontras Dzikra" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h5 className="font-serif font-bold text-sm text-[#ffd700] group-hover:underline">
                    Varian Emas & Teks Gelap
                  </h5>
                  <p className="text-[11px] text-white/60 mt-1">
                    Optimal untuk dokumen cetak, nota resmi, atau latar terang.
                  </p>
                  <span className="mt-3 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold">
                    Gunakan Preset Ini
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 10 UNIT LOGOS */}
          {activeSubTab === 'units' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#181722] border border-white/10">
                <h4 className="font-serif font-black text-sm text-white mb-1">
                  Kelola Logo 10 Unit Usaha Dzikra
                </h4>
                <p className="text-xs text-white/60">
                  Setiap unit usaha memiliki logo khusus yang tampil di kartu unit, katalog, dan profil unit.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {units.map((unit) => {
                  const customLogo = unitLogos[unit.id];
                  return (
                    <div 
                      key={unit.id}
                      className="p-4 rounded-2xl bg-[#181722] border border-white/10 flex items-center justify-between gap-3 hover:border-[#ffd700]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-[#09090b] border border-[#ffd700]/30 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          {customLogo ? (
                            <img src={customLogo} alt={unit.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="font-serif font-bold text-[#ffd700] text-xs">
                              U-{unit.id}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h6 className="font-serif font-bold text-xs text-white truncate">
                            {unit.name}
                          </h6>
                          <span className="text-[10px] text-[#ffd700]/80 block truncate">
                            {unit.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <label className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-[#ffd700] hover:text-[#09090b] text-white text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1">
                          <Upload className="w-3 h-3" />
                          <span>Ganti</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (!isAdmin) {
                                onRequireAdmin(`mengubah logo unit ${unit.name}`);
                                return;
                              }
                              if (e.target.files && e.target.files[0]) {
                                onUploadUnitLogo(unit.id, e.target.files[0]);
                                showToast(`Logo ${unit.name} berhasil diperbarui!`);
                              }
                            }}
                          />
                        </label>

                        {customLogo && (
                          <button
                            type="button"
                            onClick={() => {
                              if (!isAdmin) {
                                onRequireAdmin(`mereset logo unit ${unit.name}`);
                                return;
                              }
                              onResetUnitLogo(unit.id);
                              showToast(`Logo ${unit.name} dikembalikan ke bawaan.`);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-900/40 text-white/60 hover:text-rose-300 text-[11px] transition-colors"
                            title="Reset logo"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#0e0d14] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-white/50">
            Perubahan logo langsung tersimpan dan aktif secara instan.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
