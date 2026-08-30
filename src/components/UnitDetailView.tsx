import React, { useState } from 'react';
import { BusinessUnit, GalleryMediaItem } from '../types';
import { 
  Building2, 
  Upload, 
  Trash2, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  ExternalLink,
  Tag,
  ShieldCheck
} from 'lucide-react';

interface UnitDetailViewProps {
  unit: BusinessUnit;
  allUnits: BusinessUnit[];
  customLogo?: string;
  unitGallery: GalleryMediaItem[];
  isAdmin?: boolean;
  onUploadLogo: (unitId: number, file: File) => void;
  onAddGalleryMedia: (unitId: number, item: Omit<GalleryMediaItem, 'id' | 'uploadedAt'>) => void;
  onRemoveGalleryMedia: (mediaId: string) => void;
  onSelectUnit: (unitId: number) => void;
  onRequireAdmin?: (reason: string) => void;
}

export const UnitDetailView: React.FC<UnitDetailViewProps> = ({
  unit,
  allUnits,
  customLogo,
  unitGallery,
  isAdmin = false,
  onUploadLogo,
  onAddGalleryMedia,
  onRemoveGalleryMedia,
  onSelectUnit,
  onRequireAdmin,
}) => {
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaCaption, setNewMediaCaption] = useState('');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [newMediaUrl, setNewMediaUrl] = useState('');

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadLogo(unit.id, e.target.files[0]);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (!isAdmin) {
      e.preventDefault();
      onRequireAdmin?.(`mengubah logo resmi unit ${unit.shortName}`);
    }
  };

  const handleAddMediaClick = () => {
    if (!isAdmin) {
      onRequireAdmin?.(`menambahkan foto atau video produk ke unit ${unit.shortName}`);
      return;
    }
    setShowAddMediaModal(true);
  };

  const handleMediaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) {
      onRequireAdmin?.('mengunggah foto produk');
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isVideo = file.type.startsWith('video');
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onAddGalleryMedia(unit.id, {
            unitId: unit.id,
            unitName: unit.name,
            title: newMediaTitle || file.name,
            type: isVideo ? 'video' : 'image',
            url: event.target.result as string,
            caption: newMediaCaption || `Dokumentasi produk ${unit.shortName}`,
          });
          setNewMediaTitle('');
          setNewMediaCaption('');
          setShowAddMediaModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMediaClick = (mediaId: string) => {
    if (!isAdmin) {
      onRequireAdmin?.('menghapus foto/video produk');
      return;
    }
    onRemoveGalleryMedia(mediaId);
  };

  const handleAddMediaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl) return;

    onAddGalleryMedia(unit.id, {
      unitId: unit.id,
      unitName: unit.name,
      title: newMediaTitle || `Media ${unit.shortName}`,
      type: newMediaType,
      url: newMediaUrl,
      caption: newMediaCaption,
    });
    setNewMediaTitle('');
    setNewMediaCaption('');
    setNewMediaUrl('');
    setShowAddMediaModal(false);
  };

  const currentIndex = allUnits.findIndex((u) => u.id === unit.id);
  const prevUnit = currentIndex > 0 ? allUnits[currentIndex - 1] : allUnits[allUnits.length - 1];
  const nextUnit = currentIndex < allUnits.length - 1 ? allUnits[currentIndex + 1] : allUnits[0];

  return (
    <section id="halaman-unit" className="py-16 bg-[#09090b] text-[#f4efe8] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Selector Bar between 10 units */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-[#14121d] p-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <a
              href="#unit"
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/90 text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Kembali ke Beranda</span>
            </a>

            <span className="text-xs font-bold font-mono text-[#ffd700] uppercase tracking-wider hidden sm:inline">
              Unit {unit.id} dari {allUnits.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectUnit(prevUnit.id)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#ffd700] hover:text-[#09090b] text-xs font-semibold text-white/90 border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sebelumnya: {prevUnit.shortName}</span>
              <span className="sm:hidden">Sebelumnya</span>
            </button>
            <button
              onClick={() => onSelectUnit(nextUnit.id)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#ffd700] hover:text-[#09090b] text-xs font-semibold text-white/90 border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="hidden sm:inline">Selanjutnya: {nextUnit.shortName}</span>
              <span className="sm:hidden">Selanjutnya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Unit Main Header Card */}
        <div className="bg-[#14121d] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffd700]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">
            {/* Big Unit Logo */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl border-2 border-white/15 bg-[#09090b] flex items-center justify-center p-4 overflow-hidden shadow-xl relative group">
                {customLogo ? (
                  <img
                    id="logo-unit-besar"
                    src={customLogo}
                    alt={`Logo ${unit.name}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-2">
                    <Building2 className="w-12 h-12 text-[#ffd700] mb-2" />
                    <span className="text-xs font-bold text-white font-serif uppercase">
                      {unit.shortName}
                    </span>
                    <span className="text-[10px] text-white/50 font-mono mt-0.5">
                      Logo Standar Unit
                    </span>
                  </div>
                )}
              </div>

              {/* Ganti Logo Unit Button (Admin Gated) */}
              <label 
                onClick={handleLogoClick}
                className="mt-3.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-[#ffd700] text-xs font-bold transition-all border border-white/10 cursor-pointer flex items-center gap-1.5"
                title={isAdmin ? "Unggah file logo unit baru" : "Akses Khusus Administrator"}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isAdmin ? '📁 Ganti Logo Unit' : '📁 Ganti Logo Unit (Admin)'}</span>
                {isAdmin && (
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoFileChange}
                  />
                )}
              </label>
            </div>

            {/* Unit Details & Narrative */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#ffd700]/15 border border-[#ffd700]/40 text-[#ffd700] font-bold text-xs uppercase font-mono tracking-wider">
                  {unit.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-semibold">
                  Unit ID #{unit.id}
                </span>
              </div>

              <h2 id="nama-unit" className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-white">
                {unit.name}
              </h2>

              <h3 id="bidang-unit" className="text-sm sm:text-base font-semibold text-[#ffd700] font-mono mt-1">
                Bidang: {unit.bidang}
              </h3>

              {unit.slogan && (
                <p className="text-xs sm:text-sm text-white/80 italic mt-1 font-serif">
                  "{unit.slogan}"
                </p>
              )}

              <p id="deskripsi-unit" className="text-sm sm:text-base text-white/75 mt-4 leading-relaxed font-light">
                {unit.longDescription || unit.description}
              </p>

              {/* Highlights & Services */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {unit.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#ffd700] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Unit Contact Bar */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-white/70">
                {unit.contact.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#ffd700]" />
                    <span>{unit.contact.phone}</span>
                  </div>
                )}
                {unit.contact.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#ffd700]" />
                    <span>{unit.contact.email}</span>
                  </div>
                )}
                {unit.contact.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ffd700]" />
                    <span>{unit.contact.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products/Services of this Unit */}
        {unit.products && unit.products.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  Katalog & Produk Unggulan {unit.shortName}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 mt-0.5">
                  Daftar layanan dan produk yang diproduksi atau dikelola oleh unit ini.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {unit.products.map((prod, idx) => (
                <div
                  key={idx}
                  className="bg-[#14121d] rounded-3xl p-5 border border-white/10 shadow-lg flex flex-col justify-between hover:border-[#ffd700]/50 transition-all"
                >
                  <div>
                    {prod.tag && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#ffd700] text-[10px] font-bold uppercase font-mono mb-2.5">
                        {prod.tag}
                      </span>
                    )}
                    <h4 className="font-serif font-bold text-base text-white">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-white/70 mt-2 leading-relaxed font-light">
                      {prod.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    {prod.price ? (
                      <span className="font-serif font-black text-sm text-[#ffd700]">
                        {prod.price}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-[#ffd700]">Layanan Resmi</span>
                    )}

                    <a
                      href={`https://wa.me/6281312271662?text=Halo%20Admin%20Dzikra%20Group,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(prod.name)}%20dari%20unit%20${encodeURIComponent(unit.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-white/90 hover:text-[#ffd700] flex items-center gap-1"
                    >
                      <span>Pesan / Info</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Galeri Foto & Video Unit */}
        <div id="galeri-unit" className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif font-black text-2xl text-white flex items-center gap-2">
                <span>📸 Galeri Dokumentasi Produk — {unit.shortName}</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Portofolio foto produk dan video operasional resmi unit ini.
              </p>
            </div>

            <button
              onClick={handleAddMediaClick}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] text-xs font-bold shadow-md transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAdmin ? 'Tambah Foto/Video Produk' : 'Tambah Foto Produk (Admin)'}</span>
            </button>
          </div>

          {/* Gallery Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" id="galeri">
            {unitGallery.map((media) => (
              <div
                key={media.id}
                className="gallery-card bg-[#14121d] rounded-2xl overflow-hidden border border-white/10 shadow-lg flex flex-col justify-between group hover:border-[#ffd700]/40 transition-all"
              >
                {/* Media Box */}
                <div className="gallery-media relative h-48 bg-black/60 flex items-center justify-center overflow-hidden">
                  {media.type === 'video' ? (
                    <div className="w-full h-full flex items-center justify-center relative">
                      <video
                        src={media.url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <img
                      src={media.url}
                      alt={media.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[#ffd700] text-[10px] font-mono border border-[#ffd700]/30">
                    {media.type === 'video' ? '🎬 Video' : '📷 Foto'}
                  </span>
                </div>

                {/* Caption info */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="font-serif font-bold text-xs sm:text-sm text-white line-clamp-1">
                      {media.title}
                    </h5>
                    {media.caption && (
                      <p className="text-[11px] text-white/60 mt-1 line-clamp-2">
                        {media.caption}
                      </p>
                    )}
                  </div>

                  {/* Actions for Admin */}
                  {isAdmin && (
                    <div className="gallery-actions mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                      <label 
                        className="px-2.5 py-1 rounded-md bg-emerald-700/80 hover:bg-emerald-600 text-white text-[11px] font-semibold cursor-pointer flex items-center gap-1"
                      >
                        <span>Ganti</span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={handleMediaFileChange}
                        />
                      </label>

                      <button
                        onClick={() => handleRemoveMediaClick(media.id)}
                        className="px-2.5 py-1 rounded-md bg-red-700/80 hover:bg-red-600 text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Add Card Slot (Admin Gated) */}
            {isAdmin && (
              <div
                onClick={handleAddMediaClick}
                className="gallery-card add-card border-2 border-dashed border-white/20 hover:border-[#ffd700] bg-[#14121d]/50 hover:bg-[#1a1726] rounded-2xl flex flex-col items-center justify-center p-6 min-h-[220px] cursor-pointer transition-all text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-[#ffd700] text-white group-hover:text-[#09090b] flex items-center justify-center mb-3 transition-colors shadow-xs">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="font-serif font-bold text-sm text-white">
                  Tambah Media Produk
                </span>
                <span className="text-[11px] text-white/50 mt-1">
                  Unggah file baru ke unit ini
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal for Adding New Media */}
        {showAddMediaModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#14121d] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#ffd700]/30 shadow-2xl text-white">
              <h3 className="font-serif font-bold text-xl text-white mb-2">
                Unggah Foto / Video ke Unit {unit.shortName}
              </h3>
              <p className="text-xs text-white/60 mb-5">
                Pilih file lokal dari komputer/HP atau masukkan URL gambar / video online.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Judul Media
                  </label>
                  <input
                    type="text"
                    value={newMediaTitle}
                    onChange={(e) => setNewMediaTitle(e.target.value)}
                    placeholder="Contoh: Kemasan Baru Cokusi Dark 75%"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Deskripsi / Catatan Singkat
                  </label>
                  <input
                    type="text"
                    value={newMediaCaption}
                    onChange={(e) => setNewMediaCaption(e.target.value)}
                    placeholder="Contoh: Dokumentasi proses produksi higienis"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Opsi 1: Unggah File dari Perangkat
                  </label>
                  <label className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-[#ffd700]/40 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-xs font-bold text-[#ffd700] cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-[#ffd700]" />
                    <span>Pilih Foto (JPG/PNG) atau Video (MP4)</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleMediaFileChange}
                    />
                  </label>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-3 text-xs text-white/50 font-mono">ATAU URL WEB</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Opsi 2: Masukkan URL Gambar Online
                  </label>
                  <input
                    type="url"
                    value={newMediaUrl}
                    onChange={(e) => setNewMediaUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddMediaModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80"
                  >
                    Batal
                  </button>
                  {newMediaUrl && (
                    <button
                      type="button"
                      onClick={handleAddMediaSubmit}
                      className="px-4 py-2 rounded-xl bg-[#ffd700] hover:bg-[#e6c200] text-xs font-bold text-[#09090b]"
                    >
                      Simpan URL
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
