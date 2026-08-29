import React, { useState } from 'react';
import { GalleryMediaItem, BusinessUnit } from '../types';
import { 
  Plus, 
  Upload, 
  Trash2, 
  Play, 
  Image as ImageIcon, 
  ZoomIn, 
  X, 
  Check, 
  ExternalLink,
  Film
} from 'lucide-react';

interface GallerySectionProps {
  galleryItems: GalleryMediaItem[];
  units: BusinessUnit[];
  isAdmin?: boolean;
  onAddMedia: (item: Omit<GalleryMediaItem, 'id' | 'uploadedAt'>) => void;
  onRemoveMedia: (id: string) => void;
  onUpdateMediaUrl: (id: string, newUrl: string, newType?: 'image' | 'video') => void;
  onRequireAdmin?: (reason: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  galleryItems,
  units,
  isAdmin = false,
  onAddMedia,
  onRemoveMedia,
  onUpdateMediaUrl,
  onRequireAdmin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeLightboxMedia, setActiveLightboxMedia] = useState<GalleryMediaItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newUnitId, setNewUnitId] = useState<number>(3);
  const [newType, setNewType] = useState<'image' | 'video'>('image');
  const [newUrl, setNewUrl] = useState('');

  const filteredItems = selectedCategory === 'Semua'
    ? galleryItems
    : galleryItems.filter((item) => {
        const u = units.find((x) => x.id === item.unitId);
        return u?.shortName === selectedCategory || item.unitName === selectedCategory;
      });

  const handleOpenAddModal = () => {
    if (!isAdmin) {
      onRequireAdmin?.('menambahkan foto atau video produk ke galeri');
      return;
    }
    setIsAddModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetItemId?: string) => {
    if (!isAdmin) {
      onRequireAdmin?.('mengunggah foto atau video produk');
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isVideo = file.type.startsWith('video');
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          if (targetItemId) {
            // Replace existing item
            onUpdateMediaUrl(targetItemId, dataUrl, isVideo ? 'video' : 'image');
          } else {
            // Create new
            const unit = units.find((u) => u.id === newUnitId);
            onAddMedia({
              unitId: newUnitId,
              unitName: unit?.name || 'Dzikra Grup',
              title: newTitle || file.name,
              type: isVideo ? 'video' : 'image',
              url: dataUrl,
              caption: newCaption || 'Foto dokumentasi produk Dzikra Grup',
            });
            setIsAddModalOpen(false);
            setNewTitle('');
            setNewCaption('');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMediaClick = (id: string) => {
    if (!isAdmin) {
      onRequireAdmin?.('menghapus foto atau video dari galeri');
      return;
    }
    onRemoveMedia(id);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    const unit = units.find((u) => u.id === newUnitId);
    onAddMedia({
      unitId: newUnitId,
      unitName: unit?.name || 'Dzikra Grup',
      title: newTitle || 'Media Baru Dzikra',
      type: newType,
      url: newUrl,
      caption: newCaption,
    });
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewCaption('');
    setNewUrl('');
  };

  return (
    <section id="galeri" className="py-24 bg-[#09090b] text-[#f4efe8] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700] font-mono">
            Dokumentasi & Produk
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white mt-2 relative inline-block">
            Galeri Foto & Video Dzikra Grup
          </h2>
          <div className="w-20 h-1 bg-[#ffd700] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Pengelola dan anggota dapat mengunggah foto produk (JPG/PNG) atau video (MP4/Tautan) untuk memamerkan ragam aktivitas, kualitas produk, dan suasana kafe wisata.
          </p>
        </div>

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory('Semua')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'Semua'
                  ? 'bg-[#ffd700] text-[#09090b] shadow-md'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
            >
              Semua Foto & Video ({galleryItems.length})
            </button>
            {units.slice(0, 6).map((u) => (
              <button
                key={u.id}
                onClick={() => setSelectedCategory(u.shortName)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === u.shortName
                    ? 'bg-[#ffd700] text-[#09090b] shadow-md'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                }`}
              >
                {u.shortName}
              </button>
            ))}
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] text-[#09090b] text-xs font-bold shadow-md transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#09090b]" />
            <span>Tambah Foto / Video {isAdmin ? '' : '(Admin)'}</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gallery-card bg-[#14121d] rounded-3xl overflow-hidden border border-white/10 shadow-lg flex flex-col justify-between group hover:border-[#ffd700]/40 transition-all"
            >
              {/* Media Preview Frame */}
              <div 
                onClick={() => setActiveLightboxMedia(item)}
                className="gallery-media relative h-48 bg-black flex items-center justify-center overflow-hidden cursor-pointer group/media"
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover/media:bg-black/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[#ffd700] text-[#09090b] flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-300"
                  />
                )}

                {/* Badge top */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[#ffd700] text-[10px] font-mono border border-white/10">
                    {item.type === 'video' ? '🎬 Video' : '📷 Foto'}
                  </span>
                  {item.unitName && (
                    <span className="px-2 py-0.5 rounded-md bg-[#ffd700] text-[#09090b] font-bold text-[9px] font-mono truncate max-w-[120px]">
                      {item.unitName}
                    </span>
                  )}
                </div>

                {/* Zoom overlay hint */}
                <div className="absolute top-2 right-2 opacity-0 group-hover/media:opacity-100 transition-opacity bg-black/60 p-1.5 rounded-lg text-white">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Media Title & Description */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-white line-clamp-1 group-hover:text-[#ffd700] transition-colors">
                    {item.title}
                  </h4>
                  {item.caption && (
                    <p className="text-[11px] text-white/60 mt-1 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>

                {/* Action Buttons (Unggah Pengganti & Hapus) */}
                <div className="gallery-actions mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                  <label 
                    onClick={(e) => {
                      if (!isAdmin) {
                        e.preventDefault();
                        onRequireAdmin?.('mengunggah pengganti foto/video produk');
                      }
                    }}
                    className="btn-sm px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#ffd700] hover:text-[#09090b] text-[#ffd700] text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1 border border-white/10"
                  >
                    <span>Unggah</span>
                    {isAdmin && (
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, item.id)}
                      />
                    )}
                  </label>

                  <button
                    onClick={() => handleRemoveMediaClick(item.id)}
                    className="btn-sm px-3 py-1.5 rounded-xl bg-rose-900/40 hover:bg-rose-700 text-rose-300 hover:text-white text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer border border-rose-500/20"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add card box */}
          <div
            onClick={handleOpenAddModal}
            className="gallery-card add-card border-2 border-dashed border-white/20 hover:border-[#ffd700]/60 bg-[#14121d]/50 hover:bg-[#181726] rounded-3xl flex flex-col items-center justify-center p-6 min-h-[220px] cursor-pointer transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-[#ffd700] text-[#ffd700] group-hover:text-[#09090b] flex items-center justify-center mb-3 transition-colors shadow-md">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-serif font-bold text-sm text-white group-hover:text-[#ffd700] transition-colors">
              Tambah Foto / Video {isAdmin ? '' : '(Admin)'}
            </span>
            <span className="text-[11px] text-white/50 mt-1 max-w-[180px]">
              {isAdmin ? 'Klik untuk memilih berkas atau memasukkan URL' : 'Login sebagai administrator untuk mengunggah'}
            </span>
          </div>
        </div>

        {/* LIGHTBOX MODAL */}
        {activeLightboxMedia && (
          <div
            onClick={() => setActiveLightboxMedia(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#14121d] text-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-[#ffd700]/30 shadow-2xl flex flex-col"
            >
              <div className="p-4 bg-[#181722] border-b border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-white">
                    {activeLightboxMedia.title}
                  </h4>
                  <span className="text-xs text-[#ffd700] font-mono">
                    {activeLightboxMedia.unitName || 'Dzikra Grup'}
                  </span>
                </div>
                <button
                  onClick={() => setActiveLightboxMedia(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-black/90">
                {activeLightboxMedia.type === 'video' ? (
                  <video
                    src={activeLightboxMedia.url}
                    controls
                    autoPlay
                    className="max-h-[70vh] w-auto max-w-full rounded-xl"
                  />
                ) : (
                  <img
                    src={activeLightboxMedia.url}
                    alt={activeLightboxMedia.title}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
                  />
                )}
              </div>

              {activeLightboxMedia.caption && (
                <div className="p-4 bg-[#181722] border-t border-white/10 text-xs sm:text-sm text-white/80">
                  {activeLightboxMedia.caption}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ADD MEDIA MODAL */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#14121d] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#ffd700]/30 shadow-2xl text-[#f4efe8]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <h3 className="font-serif font-bold text-xl text-white">
                  Tambah Foto / Video Baru
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-white/60 hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">
                    Pilih Unit Usaha Terkait
                  </label>
                  <select
                    value={newUnitId}
                    onChange={(e) => setNewUnitId(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  >
                    {units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.id}. {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">
                    Judul Foto / Video
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: Panen Biji Kakao Organik"
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">
                    Keterangan Singkat
                  </label>
                  <input
                    type="text"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Contoh: Proses pengeringan kakao di kebun mitra"
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">
                    Opsi 1: Unggah File dari Komputer / HP
                  </label>
                  <label className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-[#ffd700]/40 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-xs font-bold text-[#ffd700] cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-[#ffd700]" />
                    <span>Pilih Foto (JPG/PNG) atau Video (MP4)</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e)}
                    />
                  </label>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-3 text-xs text-white/50 font-mono">ATAU URL WEB</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">
                    Opsi 2: Masukkan URL Gambar / Video Online
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/70 cursor-pointer"
                  >
                    Batal
                  </button>
                  {newUrl && (
                    <button
                      type="button"
                      onClick={handleUrlSubmit}
                      className="px-4 py-2 rounded-xl bg-[#ffd700] hover:bg-[#e6c200] text-xs font-bold text-[#09090b] cursor-pointer"
                    >
                      Simpan Media
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
