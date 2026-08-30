import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Save, 
  Calendar, 
  User, 
  Clock, 
  Building2, 
  FileText, 
  Tag 
} from 'lucide-react';
import { NewsArticle, BusinessUnit } from '../types';

interface NewsEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleToEdit?: NewsArticle | null;
  units: BusinessUnit[];
  onSave: (articleData: NewsArticle) => void;
}

export const NewsEditorModal: React.FC<NewsEditorModalProps> = ({
  isOpen,
  onClose,
  articleToEdit,
  units,
  onSave,
}) => {
  const isEditing = Boolean(articleToEdit);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Koperasi & Finansial');
  const [unitTag, setUnitTag] = useState('KSU Karomah Sinergi Indonesia');
  const [author, setAuthor] = useState('Sekretariat Dzikra Group');
  const [date, setDate] = useState('');
  const [readTime, setReadTime] = useState('3 menit baca');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('DzikraGroup, Kegiatan, Berita');
  const [isPinned, setIsPinned] = useState(false);
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');

  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title || '');
      setCategory(articleToEdit.category || 'Koperasi & Finansial');
      setUnitTag(articleToEdit.unitTag || 'Dzikra Group Holding');
      setAuthor(articleToEdit.author || 'Sekretariat Dzikra Group');
      setDate(articleToEdit.date || '');
      setReadTime(articleToEdit.readTime || '3 menit baca');
      setSummary(articleToEdit.summary || '');
      setContent(articleToEdit.content || '');
      setImageUrl(articleToEdit.imageUrl || '');
      setTagsInput(articleToEdit.tags ? articleToEdit.tags.join(', ') : '');
      setIsPinned(Boolean(articleToEdit.isPinned));
    } else {
      setTitle('');
      setCategory('Koperasi & Finansial');
      setUnitTag('KSU Karomah Sinergi Indonesia');
      setAuthor('Sekretariat Dzikra Group');
      setDate(new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }));
      setReadTime('3 menit baca');
      setSummary('');
      setContent('');
      setImageUrl('');
      setTagsInput('DzikraGroup, Kegiatan, Pemberdayaan');
      setIsPinned(false);
    }
  }, [articleToEdit, isOpen]);

  if (!isOpen) return null;

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim()) {
      alert('Mohon lengkapi Judul, Ringkasan, dan Isi Liputan Berita!');
      return;
    }

    const payload: NewsArticle = {
      id: articleToEdit ? articleToEdit.id : `news-${Date.now()}`,
      title: title.trim(),
      category: category,
      unitTag: unitTag,
      author: author.trim() || 'Admin Dzikra Group',
      date: date || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      readTime: readTime || '3 menit baca',
      summary: summary.trim(),
      content: content.trim(),
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      isPinned: isPinned,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
    };

    onSave(payload);
    onClose();
  };

  const categories = [
    'Koperasi & Finansial',
    'Inovasi Digital',
    'Produk & Hilirisasi',
    'Wisata & Komunitas',
    'Pemberdayaan Umat',
    'Pengumuman Resmi',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#12111a] border border-[#ffd700]/30 rounded-3xl shadow-2xl overflow-hidden text-[#f5f0e8] my-6 max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#191724] flex items-center justify-between gap-3 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ffd700]/15 text-[#ffd700] flex items-center justify-center border border-[#ffd700]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-black text-lg text-white">
                {isEditing ? 'Edit Warta & Berita Kegiatan' : 'Tulis Berita / Kegiatan Baru'}
              </h3>
              <p className="text-xs text-white/60">
                Publikasikan dokumentasi kegiatan resmi Dzikra Group & unit usaha
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/80 hover:text-red-300 transition-colors border border-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          {/* Judul Berita */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider mb-1.5">
              Judul Berita / Kegiatan *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Rapat Anggota Tahunan KSU Karomah Sinergi..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090b] border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]"
            />
          </div>

          {/* Kategori, Unit Tag, dan Status Pinned */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/70 uppercase mb-1">
                Kategori Berita
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#ffd700]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 uppercase mb-1">
                Unit Usaha Terkait
              </label>
              <select
                value={unitTag}
                onChange={(e) => setUnitTag(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#ffd700]"
              >
                <option value="Dzikra Group Holding">Dzikra Group Holding</option>
                {units.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.shortName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 uppercase mb-1">
                Sorotan Utama (Pinned)
              </label>
              <div className="flex items-center gap-3 pt-1.5">
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="w-4 h-4 rounded text-[#ffd700] accent-[#ffd700] bg-black border-white/20"
                  />
                  <span className={isPinned ? 'text-[#ffd700] font-bold' : 'text-white/60'}>
                    Jadikan Berita Utama
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Penulis, Tanggal, dan Durasi Baca */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/70 uppercase mb-1">
                Penulis / Editor
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Sekretariat Dzikra Group"
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#ffd700]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 uppercase mb-1">
                Tanggal Publikasi
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="29 Agustus 2026"
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#ffd700]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 uppercase mb-1">
                Estimasi Durasi Baca
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="3 menit baca"
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#ffd700]"
              />
            </div>
          </div>

          {/* Foto Sampul / Cover Image */}
          <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#ffd700] uppercase">
                Foto Sampul Berita
              </span>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    imageTab === 'upload' ? 'bg-[#ffd700] text-[#09090b] font-bold' : 'bg-white/5 text-white/70'
                  }`}
                >
                  Upload File Foto
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    imageTab === 'url' ? 'bg-[#ffd700] text-[#09090b] font-bold' : 'bg-white/5 text-white/70'
                  }`}
                >
                  Gunakan URL Gambar
                </button>
              </div>
            </div>

            {imageTab === 'upload' ? (
              <div className="border border-dashed border-white/20 rounded-xl p-4 text-center hover:border-[#ffd700]/50 transition-colors">
                <input
                  type="file"
                  id="news-cover-upload"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="news-cover-upload"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <Upload className="w-7 h-7 text-[#ffd700]" />
                  <span className="text-xs text-white font-medium">
                    Klik untuk memilih foto dokumentasi kegiatan (PNG, JPG, WebP)
                  </span>
                  <span className="text-[11px] text-white/40">Maksimal 5MB</span>
                </label>
              </div>
            ) : (
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#ffd700]"
              />
            )}

            {imageUrl && (
              <div className="relative rounded-xl overflow-hidden border border-white/15 h-36 bg-black flex items-center justify-center">
                <img src={imageUrl} alt="Pratinjau Foto" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-red-400 hover:text-red-300 hover:bg-black text-xs cursor-pointer"
                >
                  Hapus Foto
                </button>
              </div>
            )}
          </div>

          {/* Ringkasan Singkat (Lead / Summary) */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider mb-1.5">
              Ringkasan Singkat (Lead Summary) *
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Deskripsi singkat yang memikat mengenai intisari kegiatan/berita..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]"
            />
          </div>

          {/* Isi Liputan Lengkap */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider mb-1.5">
              Isi Liputan Lengkap Berita (Paragraf) *
            </label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan isi berita secara lengkap di sini. Gunakan baris baru (enter dua kali) untuk memisahkan paragraf..."
              className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]"
            />
            <span className="text-[11px] text-white/40 mt-1 block">
              Tips: Beri jarak baris kosong untuk membedakan paragraf.
            </span>
          </div>

          {/* Kata Kunci / Tags */}
          <div>
            <label className="block text-xs font-mono text-white/70 uppercase mb-1">
              Kata Kunci / Tag (pisahkan dengan koma)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Koperasi, Rapat Anggota, SHU, Ekosistem"
              className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#ffd700]"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#cca300] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Simpan Perubahan Berita' : 'Terbitkan Berita Sekarang'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
