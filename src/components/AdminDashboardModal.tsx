import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Building2, 
  Upload, 
  Trash2, 
  Plus, 
  Users, 
  Coins, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  RefreshCw, 
  Check, 
  Camera, 
  LogOut,
  Sparkles,
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  Edit3,
  UserPlus,
  Wallet,
  CreditCard,
  UserCheck,
  Pin
} from 'lucide-react';
import { BusinessUnit, GalleryMediaItem, MemberAccountDemo, NewsArticle } from '../types';
import { DZIKRA_OFFICIAL_LOGO_SVG, DZIKRA_OFFICIAL_LOGO_LIGHT_SVG } from '../assets/dzikraLogo';

interface LoanApplicationRecord {
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
}

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  mainLogo?: string;
  onUploadMainLogo: (file: File) => void;
  onSetMainLogoDataUrl?: (dataUrl: string) => void;
  onResetMainLogo: () => void;
  units: BusinessUnit[];
  unitLogos: Record<number, string>;
  galleryItems: GalleryMediaItem[];
  memberAccounts: Record<string, MemberAccountDemo>;
  loanApplications: LoanApplicationRecord[];
  newsArticles: NewsArticle[];
  onUploadLogo: (unitId: number, file: File) => void;
  onResetLogo: (unitId: number) => void;
  onAddGalleryMedia: (item: Omit<GalleryMediaItem, 'id' | 'uploadedAt'>) => void;
  onRemoveGalleryMedia: (id: string) => void;
  onUpdateMemberAccount: (memberNo: string, updated: Partial<MemberAccountDemo>) => void;
  onAddMemberAccount: (account: MemberAccountDemo) => void;
  onDeleteMemberAccount?: (memberNo: string) => void;
  onUpdateLoanStatus: (appId: string, newStatus: 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak') => void;
  onAddNewsArticle: (article: NewsArticle) => void;
  onUpdateNewsArticle?: (article: NewsArticle) => void;
  onDeleteNewsArticle: (id: string) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  mainLogo,
  onUploadMainLogo,
  onSetMainLogoDataUrl,
  onResetMainLogo,
  units,
  unitLogos,
  galleryItems,
  memberAccounts,
  loanApplications,
  newsArticles,
  onUploadLogo,
  onResetLogo,
  onAddGalleryMedia,
  onRemoveGalleryMedia,
  onUpdateMemberAccount,
  onAddMemberAccount,
  onDeleteMemberAccount,
  onUpdateLoanStatus,
  onAddNewsArticle,
  onUpdateNewsArticle,
  onDeleteNewsArticle,
}) => {
  const [activeTab, setActiveTab] = useState<'logos' | 'news' | 'gallery' | 'members' | 'loans'>('news');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Member Form state (Recruitment & Registration)
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMemberNo, setNewMemberNo] = useState(`DZ-${Math.floor(10000 + Math.random() * 90000)}`);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberNik, setNewMemberNik] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [newMemberAddress, setNewMemberAddress] = useState('');
  const [newSimpananPokok, setNewSimpananPokok] = useState('100000');
  const [newSimpananWajib, setNewSimpananWajib] = useState('50000');
  const [newSimpananSukarela, setNewSimpananSukarela] = useState('250000');
  const [memberSearchQuery, setMemberSearchQuery] = useState('');

  // Media Form state
  const [showAddMediaForm, setShowAddMediaForm] = useState(false);
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaUnitId, setNewMediaUnitId] = useState<number>(3);
  const [newMediaCaption, setNewMediaCaption] = useState('');

  // News Form state
  const [showAddNewsForm, setShowAddNewsForm] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('Koperasi & Finansial');
  const [newsUnitTag, setNewsUnitTag] = useState('Dzikra Grup Holding');
  const [newsAuthor, setNewsAuthor] = useState('Sekretariat Dzikra Grup');
  const [newsDate, setNewsDate] = useState('');
  const [newsReadTime, setNewsReadTime] = useState('3 menit baca');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsImageUrl, setNewsImageUrl] = useState('');
  const [newsTags, setNewsTags] = useState('DzikraGrup, Kegiatan, Berita');
  const [newsIsPinned, setNewsIsPinned] = useState(false);

  // Logo URL state
  const [customLogoUrl, setCustomLogoUrl] = useState('');

  if (!isOpen) return null;

  const triggerSuccess = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  const handleMainLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadMainLogo(e.target.files[0]);
      triggerSuccess('Logo Resmi Dzikra Grup berhasil diunggah dan diterapkan ke seluruh website!');
    }
  };

  const handleApplyLogoUrl = () => {
    if (!customLogoUrl.trim()) return;
    if (onSetMainLogoDataUrl) {
      onSetMainLogoDataUrl(customLogoUrl.trim());
      setCustomLogoUrl('');
      triggerSuccess('Tautan logo Dzikra Grup berhasil disetel dan diterapkan!');
    } else {
      triggerSuccess('Tautan logo Dzikra Grup berhasil disetel!');
    }
  };

  const handleLogoUpload = (unitId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadLogo(unitId, e.target.files[0]);
      triggerSuccess(`Logo untuk Unit Usaha #${unitId} berhasil diperbarui!`);
    }
  };

  const handleNewsImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewsImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenEditNews = (article: NewsArticle) => {
    setEditingNewsId(article.id);
    setNewsTitle(article.title);
    setNewsCategory(article.category);
    setNewsUnitTag(article.unitTag);
    setNewsAuthor(article.author);
    setNewsDate(article.date);
    setNewsReadTime(article.readTime);
    setNewsSummary(article.summary);
    setNewsContent(article.content);
    setNewsImageUrl(article.imageUrl);
    setNewsTags(article.tags ? article.tags.join(', ') : '');
    setNewsIsPinned(Boolean(article.isPinned));
    setShowAddNewsForm(true);
  };

  const handleCreateOrUpdateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsSummary.trim() || !newsContent.trim()) {
      alert('Mohon lengkapi Judul, Ringkasan, dan Isi Liputan Berita!');
      return;
    }

    const payload: NewsArticle = {
      id: editingNewsId || `news-${Date.now()}`,
      title: newsTitle.trim(),
      category: newsCategory,
      unitTag: newsUnitTag,
      author: newsAuthor.trim() || 'Admin Dzikra Grup',
      date: newsDate || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      readTime: newsReadTime || '3 menit baca',
      summary: newsSummary.trim(),
      content: newsContent.trim(),
      imageUrl: newsImageUrl || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      isPinned: newsIsPinned,
      tags: newsTags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    if (editingNewsId && onUpdateNewsArticle) {
      onUpdateNewsArticle(payload);
      triggerSuccess(`Berita "${payload.title}" berhasil diperbarui!`);
    } else {
      onAddNewsArticle(payload);
      triggerSuccess(`Berita "${payload.title}" berhasil dipublikasikan ke beranda!`);
    }

    setShowAddNewsForm(false);
    setEditingNewsId(null);
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setNewsImageUrl('');
    setNewsIsPinned(false);
  };

  const handleMediaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isVideo = file.type.startsWith('video');
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const unit = units.find((u) => u.id === newMediaUnitId);
          onAddGalleryMedia({
            unitId: newMediaUnitId,
            unitName: unit?.name || 'Dzikra Grup',
            title: newMediaTitle || file.name,
            type: isVideo ? 'video' : 'image',
            url: event.target.result as string,
            caption: newMediaCaption || `Dokumentasi resmi ${unit?.shortName}`,
          });
          setShowAddMediaForm(false);
          setNewMediaTitle('');
          setNewMediaCaption('');
          triggerSuccess('Foto/Video berhasil ditambahkan ke Galeri Dzikra!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberNo || !newMemberName) return;

    const newAcc: MemberAccountDemo = {
      memberNo: newMemberNo.toUpperCase().trim(),
      fullName: newMemberName.trim(),
      joinedDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      status: 'Aktif — Terverifikasi Pengurus',
      totalSimpananPokok: Number(newSimpananPokok) || 100000,
      totalSimpananWajib: Number(newSimpananWajib) || 50000,
      totalSimpananSukarela: Number(newSimpananSukarela) || 0,
      totalSimpananBerjangka: 0,
      pinjamanAktif: null,
      estimasiSHU: Math.round((Number(newSimpananWajib) + Number(newSimpananSukarela)) * 0.085),
      transaksiTerakhir: [
        {
          id: `TRX-${Date.now().toString().slice(-4)}`,
          tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
          keterangan: 'Penerimaan Anggota Baru & Setoran Awal',
          jenis: 'kredit',
          nominal: (Number(newSimpananPokok) || 0) + (Number(newSimpananWajib) || 0) + (Number(newSimpananSukarela) || 0),
        },
      ],
    };

    onAddMemberAccount(newAcc);
    setShowAddMemberForm(false);
    setNewMemberNo(`DZ-${Math.floor(10000 + Math.random() * 90000)}`);
    setNewMemberName('');
    setNewMemberNik('');
    setNewMemberPhone('');
    setNewMemberAddress('');
    triggerSuccess(`Pengrekrutan Anggota ${newAcc.fullName} (${newAcc.memberNo}) Berhasil Didaftarkan!`);
  };

  const formatRupiah = (num: number) => 'Rp ' + num.toLocaleString('id-ID');

  // Member statistics
  const memberList = Object.values(memberAccounts) as MemberAccountDemo[];
  const filteredMembers = memberList.filter((m) => 
    m.fullName.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
    m.memberNo.toLowerCase().includes(memberSearchQuery.toLowerCase())
  );

  const totalKasSimpanan = memberList.reduce((acc, m) => 
    acc + m.totalSimpananPokok + m.totalSimpananWajib + m.totalSimpananSukarela + m.totalSimpananBerjangka, 0
  );
  const totalPinjamanBeredar = memberList.reduce((acc, m) => 
    acc + (m.pinjamanAktif?.sisaPokok || 0), 0
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-[#121118] rounded-3xl max-w-5xl w-full max-h-[94vh] border border-[#ffd700]/30 shadow-2xl relative my-4 text-[#f4efe8] flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-[#181722] text-white p-5 sm:px-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ffd700] to-[#e6a800] text-[#09090b] flex items-center justify-center font-bold font-serif text-lg shadow-md">
              ADM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-xl text-white">
                  Pusat Pengelolaan Administrator
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono border border-emerald-500/30">
                  SESI PENGURUS AKTIF
                </span>
              </div>
              <span className="text-xs text-[#ffd700] font-mono">
                Dzikra Grup Holding & KSU Karomah Sinergi Indonesia
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-rose-900/80 text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Keluar Admin</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
              title="Tutup Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#09090b] px-4 sm:px-8 border-b border-white/10 flex flex-wrap gap-2 pt-3">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2.5 rounded-t-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
              activeTab === 'news'
                ? 'bg-[#121118] text-[#ffd700] border-white/10 shadow-xs -mb-[1px]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4 text-[#ffd700]" />
            <span>Warta & Berita Kegiatan ({newsArticles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2.5 rounded-t-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
              activeTab === 'members'
                ? 'bg-[#121118] text-[#ffd700] border-white/10 shadow-xs -mb-[1px]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-[#ffd700]" />
            <span>Koperasi: Anggota & Rekrutmen ({memberList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('loans')}
            className={`px-4 py-2.5 rounded-t-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
              activeTab === 'loans'
                ? 'bg-[#121118] text-[#ffd700] border-white/10 shadow-xs -mb-[1px]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            <Coins className="w-4 h-4 text-[#ffd700]" />
            <span>Pengajuan Pinjaman ({loanApplications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logos')}
            className={`px-4 py-2.5 rounded-t-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
              activeTab === 'logos'
                ? 'bg-[#121118] text-[#ffd700] border-white/10 shadow-xs -mb-[1px]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#ffd700]" />
            <span>Logo Grup & Unit Usaha</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-t-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
              activeTab === 'gallery'
                ? 'bg-[#121118] text-[#ffd700] border-white/10 shadow-xs -mb-[1px]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4 text-[#ffd700]" />
            <span>Galeri Foto & Video ({galleryItems.length})</span>
          </button>
        </div>

        {/* Floating Success Notice */}
        {successNotice && (
          <div className="mx-6 mt-4 p-3.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Tab Body */}
        <div className="p-5 sm:p-7 flex-1 overflow-y-auto">
          {/* TAB 1: NEWS & ACTIVITIES */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181722] p-5 rounded-3xl border border-white/10">
                <div>
                  <h4 className="font-serif font-black text-lg text-white">
                    Penerbitan & Pengelolaan Warta Dzikra Grup
                  </h4>
                  <p className="text-xs text-white/60 mt-0.5">
                    Publikasikan dokumentasi kegiatan, program koperasi, peresmian cafe, dan rilis resmi agar tampil di beranda publik.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingNewsId(null);
                    setNewsTitle('');
                    setNewsSummary('');
                    setNewsContent('');
                    setNewsImageUrl('');
                    setNewsIsPinned(false);
                    setShowAddNewsForm(!showAddNewsForm);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-lg hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tulis / Terbitkan Berita Baru</span>
                </button>
              </div>

              {/* Create/Edit News Form */}
              {showAddNewsForm && (
                <form onSubmit={handleCreateOrUpdateNews} className="p-6 rounded-3xl bg-[#181722] border-2 border-[#ffd700]/40 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h5 className="font-serif font-black text-base text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#ffd700]" />
                      <span>{editingNewsId ? 'Edit Warta & Berita Kegiatan' : 'Formulir Berita / Rilis Baru'}</span>
                    </h5>
                    <button
                      type="button"
                      onClick={() => setShowAddNewsForm(false)}
                      className="text-xs text-white/50 hover:text-white"
                    >
                      Tutup Form
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-bold text-[#ffd700] font-mono uppercase mb-1">
                        Judul Berita / Kegiatan *
                      </label>
                      <input
                        type="text"
                        required
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        placeholder="Contoh: Rapat Anggota Tahunan KSU Karomah Sinergi 2026..."
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Kategori
                      </label>
                      <select
                        value={newsCategory}
                        onChange={(e) => setNewsCategory(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white"
                      >
                        <option value="Koperasi & Finansial">Koperasi & Finansial</option>
                        <option value="Produk & Hilirisasi">Produk & Hilirisasi</option>
                        <option value="Inovasi Digital">Inovasi Digital</option>
                        <option value="Wisata & Komunitas">Wisata & Komunitas</option>
                        <option value="Pemberdayaan Umat">Pemberdayaan Umat</option>
                        <option value="Pengumuman Resmi">Pengumuman Resmi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Unit Usaha Terkait
                      </label>
                      <select
                        value={newsUnitTag}
                        onChange={(e) => setNewsUnitTag(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white"
                      >
                        <option value="Dzikra Grup Holding">Dzikra Grup Holding</option>
                        {units.map((u) => (
                          <option key={u.id} value={u.name}>
                            {u.shortName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Penulis / Humas
                      </label>
                      <input
                        type="text"
                        value={newsAuthor}
                        onChange={(e) => setNewsAuthor(e.target.value)}
                        placeholder="Sekretariat Dzikra Grup"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Durasi Baca
                      </label>
                      <input
                        type="text"
                        value={newsReadTime}
                        onChange={(e) => setNewsReadTime(e.target.value)}
                        placeholder="3 menit baca"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#ffd700] font-mono uppercase mb-1">
                      Ringkasan Singkat (Lead Paragraph) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={newsSummary}
                      onChange={(e) => setNewsSummary(e.target.value)}
                      placeholder="Ringkasan 1-2 kalimat dari inti kegiatan..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#ffd700] font-mono uppercase mb-1">
                      Isi Lengkap Berita (Gunakan enter dua kali untuk paragraf baru) *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      placeholder="Tuliskan detail kegiatan secara lengkap..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Foto Sampul Berita (Unggah File dari Perangkat)
                      </label>
                      <label className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#ffd700]/40 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-xs text-[#ffd700] cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Pilih Foto Sampul (JPG/PNG/WebP)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleNewsImageFileChange}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Atau Masukkan URL Gambar
                      </label>
                      <input
                        type="url"
                        value={newsImageUrl}
                        onChange={(e) => setNewsImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white"
                      />
                    </div>
                  </div>

                  {newsImageUrl && (
                    <div className="h-28 rounded-xl overflow-hidden bg-black/50 border border-white/10 max-w-sm">
                      <img src={newsImageUrl} alt="Pratinjau Foto" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsIsPinned}
                        onChange={(e) => setNewsIsPinned(e.target.checked)}
                        className="w-4 h-4 rounded text-[#ffd700] accent-[#ffd700]"
                      />
                      <span className={newsIsPinned ? 'text-[#ffd700] font-bold' : 'text-white/70'}>
                        Sematkan sebagai Berita Utama (Pinned Banner)
                      </span>
                    </label>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddNewsForm(false)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/70 cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#ffd700] hover:bg-[#ffe066] text-[#09090b] text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{editingNewsId ? 'Simpan Perubahan Berita' : 'Publikasikan Berita Sekarang'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* News Articles List */}
              <div className="divide-y divide-white/10 border border-white/10 rounded-3xl overflow-hidden bg-[#181722]">
                <div className="p-4 bg-[#09090b] border-b border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#ffd700] uppercase">
                    Daftar Seluruh Berita Publik ({newsArticles.length} Artikel)
                  </span>
                  <span className="text-[11px] text-white/50">
                    Klik Edit untuk merevisi konten atau Hapus untuk mencabut rilis
                  </span>
                </div>

                {newsArticles.map((article) => (
                  <div key={article.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-start gap-4">
                      {article.imageUrl && (
                        <div className="w-20 h-20 rounded-2xl bg-black overflow-hidden shrink-0 border border-white/10">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-[#ffd700]/15 text-[#ffd700] text-[10px] font-bold font-mono">
                            {article.category}
                          </span>
                          {article.isPinned && (
                            <span className="px-2 py-0.5 rounded-md bg-[#ffd700] text-[#09090b] text-[10px] font-bold font-mono flex items-center gap-1">
                              <Pin className="w-2.5 h-2.5" />
                              <span>UTAMA</span>
                            </span>
                          )}
                          <span className="text-[11px] text-white/50 font-mono">
                            {article.date}
                          </span>
                          <span className="text-[11px] text-[#ffd700]">
                            • {article.unitTag}
                          </span>
                        </div>
                        <h5 className="font-serif font-bold text-sm sm:text-base text-white line-clamp-1">
                          {article.title}
                        </h5>
                        <p className="text-xs text-white/60 mt-1 line-clamp-2">
                          {article.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenEditNews(article)}
                        className="px-3.5 py-2 rounded-xl bg-[#ffd700] hover:bg-[#ffe066] text-[#09090b] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Hapus artikel berita "${article.title}"?`)) {
                            onDeleteNewsArticle(article.id);
                            triggerSuccess(`Berita "${article.title}" berhasil dihapus.`);
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-300" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MEMBERS & COOPERATIVE RECRUITMENT */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              {/* Financial & Recruitment Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#181722] border border-[#ffd700]/30 shadow-md">
                  <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                    <span>Total Anggota Resmi</span>
                    <Users className="w-4 h-4 text-[#ffd700]" />
                  </div>
                  <span className="font-serif font-black text-2xl text-white">
                    {memberList.length} Orang
                  </span>
                  <span className="text-[10px] text-emerald-400 block mt-1 font-mono">
                    ✓ Terverifikasi KSU Karomah
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#181722] border border-[#ffd700]/30 shadow-md">
                  <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                    <span>Total Kas Simpanan</span>
                    <Wallet className="w-4 h-4 text-[#ffd700]" />
                  </div>
                  <span className="font-mono font-bold text-xl text-[#ffd700]">
                    {formatRupiah(totalKasSimpanan)}
                  </span>
                  <span className="text-[10px] text-white/50 block mt-1 font-mono">
                    Pokok, Wajib & Sukarela
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#181722] border border-[#ffd700]/30 shadow-md">
                  <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                    <span>Pinjaman Beredar</span>
                    <CreditCard className="w-4 h-4 text-rose-400" />
                  </div>
                  <span className="font-mono font-bold text-xl text-rose-300">
                    {formatRupiah(totalPinjamanBeredar)}
                  </span>
                  <span className="text-[10px] text-white/50 block mt-1 font-mono">
                    Pembiayaan Produktif & Multiguna
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#181722] border border-[#ffd700]/30 shadow-md">
                  <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                    <span>Status Rekrutmen</span>
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="font-serif font-black text-base text-emerald-400">
                    Penerimaan Terbuka
                  </span>
                  <span className="text-[10px] text-white/50 block mt-1">
                    Gelombang 2026 Aktif
                  </span>
                </div>
              </div>

              {/* Action and Search Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181722] p-5 rounded-3xl border border-white/10">
                <div>
                  <h4 className="font-serif font-black text-lg text-white">
                    Penerimaan, Rekrutmen & Buku Tabungan Koperasi
                  </h4>
                  <p className="text-xs text-white/60 mt-0.5">
                    Kelola pendaftaran anggota baru, mutasi simpanan pokok/wajib/sukarela, serta pembagian SHU.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative w-48 sm:w-60">
                    <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={memberSearchQuery}
                      onChange={(e) => setMemberSearchQuery(e.target.value)}
                      placeholder="Cari nama atau No. KTA..."
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>

                  <button
                    onClick={() => setShowAddMemberForm(!showAddMemberForm)}
                    className="px-4 py-2 rounded-xl bg-[#ffd700] hover:bg-[#ffe066] text-[#09090b] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>+ Rekrut Anggota Baru</span>
                  </button>
                </div>
              </div>

              {/* Add Member / Recruitment Form Drawer */}
              {showAddMemberForm && (
                <form onSubmit={handleCreateMember} className="p-6 rounded-3xl bg-[#181722] border-2 border-[#ffd700]/40 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h5 className="font-serif font-black text-base text-white flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-[#ffd700]" />
                      <span>Formulir Rekrutmen & Registrasi Anggota Koperasi Baru</span>
                    </h5>
                    <button
                      type="button"
                      onClick={() => setShowAddMemberForm(false)}
                      className="text-xs text-white/50 hover:text-white"
                    >
                      Tutup
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#ffd700] font-mono uppercase mb-1">
                        Nomor Anggota (ID / KTA) *
                      </label>
                      <input
                        type="text"
                        required
                        value={newMemberNo}
                        onChange={(e) => setNewMemberNo(e.target.value)}
                        placeholder="DZ-09920"
                        className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Nama Lengkap Sesuai KTP *
                      </label>
                      <input
                        type="text"
                        required
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        placeholder="Contoh: Budi Santoso, S.Kom"
                        className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        NIK KTP (16 Digit)
                      </label>
                      <input
                        type="text"
                        value={newMemberNik}
                        onChange={(e) => setNewMemberNik(e.target.value)}
                        placeholder="320501xxxxxxxxxx"
                        className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        No. HP / WhatsApp Aktif
                      </label>
                      <input
                        type="tel"
                        value={newMemberPhone}
                        onChange={(e) => setNewMemberPhone(e.target.value)}
                        placeholder="0813xxxxxxxx"
                        className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs font-mono"
                      />
                    </div>

                    <div className="md:col-span-4">
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Alamat Domisili Anggota
                      </label>
                      <input
                        type="text"
                        value={newMemberAddress}
                        onChange={(e) => setNewMemberAddress(e.target.value)}
                        placeholder="Kadungora, Garut, Jawa Barat..."
                        className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Simpanan Pokok Awal (Rp)
                      </label>
                      <input
                        type="number"
                        value={newSimpananPokok}
                        onChange={(e) => setNewSimpananPokok(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Simpanan Wajib Pertama (Rp)
                      </label>
                      <input
                        type="number"
                        value={newSimpananWajib}
                        onChange={(e) => setNewSimpananWajib(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Setoran Tabungan Sukarela Awal (Rp)
                      </label>
                      <input
                        type="number"
                        value={newSimpananSukarela}
                        onChange={(e) => setNewSimpananSukarela(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#09090b] text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setShowAddMemberForm(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white/70 text-xs font-bold cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#ffd700] hover:bg-[#ffe066] text-[#09090b] text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Terbitkan KTA & Simpan Anggota</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Members Table */}
              <div className="border border-white/10 rounded-3xl overflow-hidden shadow-lg bg-[#181722]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#09090b] text-[#ffd700] font-mono border-b border-white/10">
                      <tr>
                        <th className="p-3.5">No. Anggota</th>
                        <th className="p-3.5">Nama Anggota</th>
                        <th className="p-3.5">Simpanan Pokok</th>
                        <th className="p-3.5">Simpanan Wajib</th>
                        <th className="p-3.5">Tabungan Sukarela</th>
                        <th className="p-3.5">Pinjaman Aktif</th>
                        <th className="p-3.5">Estimasi SHU</th>
                        <th className="p-3.5 text-right">Aksi Transaksi Admin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredMembers.map((acc) => (
                        <tr key={acc.memberNo} className="hover:bg-white/5">
                          <td className="p-3.5 font-mono font-bold text-[#ffd700]">
                            {acc.memberNo}
                          </td>
                          <td className="p-3.5 font-semibold text-white">
                            {acc.fullName}
                            <span className="block text-[10px] text-white/50 font-normal font-mono">
                              Bergabung: {acc.joinedDate}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-white/80">
                            {formatRupiah(acc.totalSimpananPokok)}
                          </td>
                          <td className="p-3.5 font-mono text-white/80">
                            {formatRupiah(acc.totalSimpananWajib)}
                          </td>
                          <td className="p-3.5 font-mono font-bold text-[#ffd700]">
                            {formatRupiah(acc.totalSimpananSukarela)}
                          </td>
                          <td className="p-3.5 font-mono">
                            {acc.pinjamanAktif ? (
                              <span className="text-rose-300 font-bold">
                                {formatRupiah(acc.pinjamanAktif.sisaPokok)} ({acc.pinjamanAktif.sisaBulan} bln)
                              </span>
                            ) : (
                              <span className="text-white/40 text-[10px]">Tidak ada pinjaman</span>
                            )}
                          </td>
                          <td className="p-3.5 font-mono font-bold text-emerald-400">
                            {formatRupiah(acc.estimasiSHU)}
                          </td>
                          <td className="p-3.5 text-right space-x-1.5">
                            <button
                              onClick={() => {
                                const nominal = prompt(`Tambah Setoran Tabungan untuk ${acc.fullName} (Rp):`, '100000');
                                if (nominal && !isNaN(Number(nominal))) {
                                  const addNum = Number(nominal);
                                  onUpdateMemberAccount(acc.memberNo, {
                                    totalSimpananSukarela: acc.totalSimpananSukarela + addNum,
                                    transaksiTerakhir: [
                                      {
                                        id: `TRX-${Date.now().toString().slice(-4)}`,
                                        tanggal: 'Hari ini',
                                        keterangan: 'Setoran Tunai via Loket Kasir',
                                        jenis: 'kredit',
                                        nominal: addNum,
                                      },
                                      ...acc.transaksiTerakhir,
                                    ],
                                  });
                                  triggerSuccess(`Berhasil menambah tabungan Rp ${addNum.toLocaleString('id-ID')} untuk ${acc.fullName}!`);
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#ffd700] hover:text-[#09090b] text-[#ffd700] text-[11px] font-bold border border-white/10 transition-colors cursor-pointer"
                              title="Tambah Simpanan"
                            >
                              + Setor
                            </button>

                            <button
                              onClick={() => {
                                const nominal = prompt(`Tarik Tabungan Sukarela ${acc.fullName} (Maks ${formatRupiah(acc.totalSimpananSukarela)}):`, '50000');
                                if (nominal && !isNaN(Number(nominal))) {
                                  const tarikNum = Number(nominal);
                                  if (tarikNum > acc.totalSimpananSukarela) {
                                    alert('Saldo tabungan sukarela tidak mencukupi!');
                                    return;
                                  }
                                  onUpdateMemberAccount(acc.memberNo, {
                                    totalSimpananSukarela: acc.totalSimpananSukarela - tarikNum,
                                    transaksiTerakhir: [
                                      {
                                        id: `TRX-${Date.now().toString().slice(-4)}`,
                                        tanggal: 'Hari ini',
                                        keterangan: 'Penarikan Sukarela via Admin',
                                        jenis: 'debit',
                                        nominal: tarikNum,
                                      },
                                      ...acc.transaksiTerakhir,
                                    ],
                                  });
                                  triggerSuccess(`Berhasil memproses penarikan Rp ${tarikNum.toLocaleString('id-ID')} untuk ${acc.fullName}!`);
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-600 hover:text-white text-white/70 text-[11px] font-semibold border border-white/10 transition-colors cursor-pointer"
                              title="Tarik Tabungan"
                            >
                              - Tarik
                            </button>

                            {onDeleteMemberAccount && (
                              <button
                                onClick={() => {
                                  if (confirm(`Hapus data anggota ${acc.fullName} (${acc.memberNo})?`)) {
                                    onDeleteMemberAccount(acc.memberNo);
                                    triggerSuccess(`Anggota ${acc.fullName} telah dinonaktifkan.`);
                                  }
                                }}
                                className="p-1 rounded-lg text-rose-400 hover:bg-rose-900/50 cursor-pointer"
                                title="Hapus Anggota"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOAN APPLICATIONS */}
          {activeTab === 'loans' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-[#181722] p-5 rounded-3xl border border-white/10">
                <div>
                  <h4 className="font-serif font-black text-lg text-white">
                    Antrean Permohonan Pinjaman Masuk (Simpan Pinjam)
                  </h4>
                  <p className="text-xs text-white/60">
                    Tinjau data pengajuan anggota, kesanggupan angsuran, dan putuskan status persetujuan pengurus.
                  </p>
                </div>
              </div>

              {loanApplications.length === 0 ? (
                <div className="text-center py-12 bg-[#181722] rounded-3xl border border-dashed border-white/20">
                  <Coins className="w-10 h-10 text-[#ffd700] mx-auto mb-2" />
                  <h5 className="font-serif font-bold text-sm text-white">
                    Belum Ada Pengajuan Pinjaman Baru
                  </h5>
                  <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto">
                    Formulir pinjaman yang dikirimkan oleh pemohon di portal koperasi akan otomatis masuk ke tabel ini untuk diproses.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/10 border border-white/10 rounded-3xl overflow-hidden bg-[#181722]">
                  {loanApplications.map((app) => (
                    <div key={app.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-serif font-bold text-sm text-white">
                            {app.fullName}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                            app.status === 'Disetujui'
                              ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/40'
                              : app.status === 'Ditolak'
                              ? 'bg-rose-900/80 text-rose-300 border border-rose-500/40'
                              : 'bg-amber-900/80 text-amber-300 border border-amber-500/40'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-white/80">
                          <strong>{app.loanType}</strong> • Plafon: <strong className="font-mono text-[#ffd700]">{formatRupiah(app.amount)}</strong> ({app.tenure} Bulan)
                        </p>
                        <p className="text-[11px] text-white/50 font-mono mt-1">
                          NIK: {app.nik} • WA: {app.phone} • Tanggal Pengajuan: {app.date}
                        </p>
                        {app.purpose && (
                          <p className="text-[11px] text-white/65 italic mt-0.5">
                            Tujuan Pembiayaan: "{app.purpose}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            onUpdateLoanStatus(app.id, 'Disetujui');
                            triggerSuccess(`Permohonan ${app.fullName} sebesar ${formatRupiah(app.amount)} telah DISETUJUI!`);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Setujui Pinjaman</span>
                        </button>
                        <button
                          onClick={() => {
                            onUpdateLoanStatus(app.id, 'Ditolak');
                            triggerSuccess(`Permohonan ${app.fullName} DITOLAK.`);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-800 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Tolak</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: LOGOS (MAIN LOGO + 10 UNITS) */}
          {activeTab === 'logos' && (
            <div className="space-y-8">
              {/* SECTION: MAIN DZIKRA GROUP LOGO */}
              <div className="p-6 rounded-3xl bg-[#181722] border border-[#ffd700]/30 shadow-xl">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#ffd700]/50 bg-[#09090b] flex items-center justify-center p-2 overflow-hidden shadow-inner shrink-0">
                      {mainLogo ? (
                        <img
                          src={mainLogo}
                          alt="Logo Dzikra Grup"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#ffd700] to-[#e6a800] text-[#09090b] flex items-center justify-center font-serif font-black text-2xl">
                          DZ
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-black text-lg text-white">
                          Logo Resmi Dzikra Grup (Holding)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#ffd700]/15 text-[#ffd700] text-[10px] font-bold font-mono">
                          LOGO UTAMA WEBSITE
                        </span>
                      </div>
                      <p className="text-xs text-white/70 mt-1 max-w-lg leading-relaxed">
                        Logo ini otomatis diterapkan pada Header Navbar, bagian Hero, Footer, Kartu e-KTA anggota, dan dokumen resmi. Format yang didukung: PNG transparan, JPG, SVG, WebP.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6a800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2 hover:scale-105">
                      <Upload className="w-4 h-4 text-[#09090b]" />
                      <span>Unggah File Logo Baru</span>
                      <input
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        onChange={handleMainLogoChange}
                      />
                    </label>

                    {mainLogo && (
                      <button
                        type="button"
                        onClick={() => {
                          onResetMainLogo();
                          triggerSuccess('Logo Utama Dzikra Grup dikembalikan ke lambang standar.');
                        }}
                        className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-rose-900/60 text-white/80 text-xs font-semibold border border-white/10 cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#ffd700]" />
                        <span>Reset ke Logo Resmi</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Additional URL & Preset Options */}
                <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* URL Input */}
                  <div className="p-3.5 rounded-2xl bg-[#0e0d14] border border-white/10 space-y-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                      Ganti via Tautan Gambar (URL)
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={customLogoUrl}
                        onChange={(e) => setCustomLogoUrl(e.target.value)}
                        placeholder="https://domain.com/logo.png"
                        className="flex-1 px-3 py-1.5 rounded-xl bg-[#181722] border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-hidden focus:border-[#ffd700]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyLogoUrl}
                        disabled={!customLogoUrl.trim()}
                        className="px-3 py-1.5 rounded-xl bg-[#ffd700] hover:bg-[#ffe066] disabled:opacity-40 text-[#09090b] text-xs font-bold transition-colors cursor-pointer"
                      >
                        Terapkan
                      </button>
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="p-3.5 rounded-2xl bg-[#0e0d14] border border-white/10 space-y-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#ffd700]" />
                      Pilihan Varian Resmi (Vektor SVG Asli)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (onSetMainLogoDataUrl) onSetMainLogoDataUrl(DZIKRA_OFFICIAL_LOGO_SVG);
                          triggerSuccess('Preset Resmi Emas & Teks Terang diterapkan!');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#181722] hover:bg-[#ffd700]/20 text-[#ffd700] text-xs font-bold border border-[#ffd700]/30 transition-colors cursor-pointer"
                      >
                        Varian Emas (Gelap)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (onSetMainLogoDataUrl) onSetMainLogoDataUrl(DZIKRA_OFFICIAL_LOGO_LIGHT_SVG);
                          triggerSuccess('Preset Resmi Emas & Teks Kontras diterapkan!');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#181722] hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors cursor-pointer"
                      >
                        Varian Kontras (Terang)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: 10 UNIT LOGOS */}
              <div>
                <div className="mb-4">
                  <h4 className="font-serif font-black text-lg text-white">
                    Logo 10 Unit Usaha Dzikra Grup
                  </h4>
                  <p className="text-xs text-white/60">
                    Ganti atau perbarui logo khusus untuk masing-masing unit usaha di bawah ini.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {units.map((unit) => {
                    const customLogo = unitLogos[unit.id];
                    return (
                      <div
                        key={unit.id}
                        className="p-4 rounded-2xl bg-[#181722] border border-white/10 flex flex-col justify-between hover:border-[#ffd700]/30 transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="w-5 h-5 rounded-full bg-[#ffd700] text-[#09090b] font-mono text-[10px] font-black flex items-center justify-center">
                              {unit.id}
                            </span>
                            <span className="text-[9px] font-mono font-bold text-[#ffd700] uppercase bg-white/5 px-1.5 py-0.5 rounded border border-white/10 truncate max-w-[100px]">
                              {unit.shortName}
                            </span>
                          </div>

                          {/* Logo Preview */}
                          <div className="w-20 h-20 mx-auto rounded-xl border border-dashed border-white/20 bg-[#09090b] flex items-center justify-center p-1.5 overflow-hidden mb-3">
                            {customLogo ? (
                              <img
                                src={customLogo}
                                alt={unit.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="text-center text-white/50 p-1">
                                <Building2 className="w-6 h-6 mx-auto mb-1 text-[#ffd700]" />
                                <span className="text-[8px] block font-mono text-white/70">Bawaan</span>
                              </div>
                            )}
                          </div>

                          <h5 className="font-serif font-bold text-xs text-white text-center line-clamp-1">
                            {unit.name}
                          </h5>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-col gap-1.5">
                          <label className="w-full text-center text-[11px] font-bold py-1.5 px-2 rounded-lg bg-white/5 hover:bg-[#ffd700] hover:text-[#09090b] text-[#ffd700] border border-white/10 transition-colors cursor-pointer flex items-center justify-center gap-1 font-mono">
                            <Upload className="w-3 h-3" />
                            <span>Ganti Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleLogoUpload(unit.id, e)}
                            />
                          </label>

                          {customLogo && (
                            <button
                              type="button"
                              onClick={() => {
                                onResetLogo(unit.id);
                                triggerSuccess(`Logo Unit #${unit.id} dikembalikan ke default.`);
                              }}
                              className="text-[10px] text-rose-400 hover:underline text-center cursor-pointer"
                            >
                              Reset ke Bawaan
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY & PRODUCT PHOTOS */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181722] p-5 rounded-3xl border border-white/10">
                <div>
                  <h4 className="font-serif font-black text-lg text-white">
                    Katalog Foto & Video Dokumentasi Produk
                  </h4>
                  <p className="text-xs text-white/60">
                    Tambah foto produk baru, perbarui media, atau hapus media yang sudah tidak relevan.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddMediaForm(!showAddMediaForm)}
                  className="px-4 py-2 rounded-xl bg-[#ffd700] hover:bg-[#e6c200] text-[#09090b] text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Media Produk</span>
                </button>
              </div>

              {/* Add Media Form Drawer */}
              {showAddMediaForm && (
                <div className="p-5 rounded-3xl bg-[#181722] border border-[#ffd700]/30 space-y-4">
                  <h5 className="font-serif font-bold text-sm text-white">
                    Unggah Media Baru ke Galeri
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Pilih Unit Usaha Terkait
                      </label>
                      <select
                        value={newMediaUnitId}
                        onChange={(e) => setNewMediaUnitId(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-white/15 text-xs bg-[#09090b] text-white"
                      >
                        {units.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.id}. {u.shortName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Judul Foto / Video
                      </label>
                      <input
                        type="text"
                        value={newMediaTitle}
                        onChange={(e) => setNewMediaTitle(e.target.value)}
                        placeholder="Contoh: Kemasan Cokelat Organik"
                        className="w-full px-3 py-2 rounded-xl border border-white/15 text-xs bg-[#09090b] text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Keterangan Singkat
                      </label>
                      <input
                        type="text"
                        value={newMediaCaption}
                        onChange={(e) => setNewMediaCaption(e.target.value)}
                        placeholder="Contoh: Panen kebun kakao mitra"
                        className="w-full px-3 py-2 rounded-xl border border-white/15 text-xs bg-[#09090b] text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-[#ffd700]/40 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-xs font-bold text-[#ffd700] cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Pilih Berkas Foto (JPG/PNG) atau Video (MP4) dari Komputer</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={handleMediaFileChange}
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Gallery Items Table/Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-[#181722] rounded-3xl border border-white/10 shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-36 rounded-2xl overflow-hidden bg-black mb-2.5 relative">
                        {item.type === 'video' ? (
                          <video src={item.url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-[#ffd700] text-[9px] font-mono border border-[#ffd700]/30">
                          {item.type === 'video' ? '🎬 Video' : '📷 Foto'}
                        </span>
                      </div>
                      <h5 className="font-serif font-bold text-xs text-white line-clamp-1">
                        {item.title}
                      </h5>
                      <span className="text-[10px] text-[#ffd700] font-mono block">
                        {item.unitName || 'Dzikra'}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => {
                          onRemoveGalleryMedia(item.id);
                          triggerSuccess(`Media "${item.title}" berhasil dihapus.`);
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus Media</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#181722] px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Seluruh perubahan data tersimpan langsung ke sistem Dzikra Grup.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#ffd700] text-[#09090b] font-bold text-xs hover:bg-[#ffe066] transition-colors cursor-pointer"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
};
