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
  Pin,
  Eye,
  Lock,
  Phone,
  MapPin,
  FileCheck,
  DollarSign
} from 'lucide-react';
import { BusinessUnit, GalleryMediaItem, MemberAccountDemo, NewsArticle } from '../types';
import { DZIKRA_OFFICIAL_LOGO_SVG, DZIKRA_OFFICIAL_LOGO_LIGHT_SVG } from '../assets/dzikraLogo';

export interface LoanApplicationRecord {
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
  onDeleteLoanApplication?: (appId: string) => void;
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
  onDeleteLoanApplication,
  onAddNewsArticle,
  onUpdateNewsArticle,
  onDeleteNewsArticle,
}) => {
  const [activeTab, setActiveTab] = useState<'members' | 'loans' | 'news' | 'logos' | 'gallery'>('members');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // In-UI Delete Confirmation Dialog State (Fixes iframe sandbox window.confirm blocking)
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    type: 'member' | 'loan' | 'news' | 'media';
    id: string;
    title: string;
    subtitle?: string;
  }>({
    isOpen: false,
    type: 'member',
    id: '',
    title: '',
    subtitle: '',
  });

  // In-UI Transaction Modal State (Fixes iframe sandbox window.prompt blocking for +Setor / -Tarik)
  const [transactionDialog, setTransactionDialog] = useState<{
    isOpen: boolean;
    memberNo: string;
    memberName: string;
    currentSukarela: number;
    type: 'deposit' | 'withdraw';
    amount: string;
    note: string;
    error: string | null;
  }>({
    isOpen: false,
    memberNo: '',
    memberName: '',
    currentSukarela: 0,
    type: 'deposit',
    amount: '100000',
    note: 'Setoran Tunai via Loket Kasir',
    error: null,
  });

  // In-UI Member Detail Modal
  const [viewingMember, setViewingMember] = useState<MemberAccountDemo | null>(null);

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

  // Loan filter state
  const [loanStatusFilter, setLoanStatusFilter] = useState<'Semua' | 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak'>('Semua');

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
  const [newsUnitTag, setNewsUnitTag] = useState('Dzikra Group Holding');
  const [newsAuthor, setNewsAuthor] = useState('Sekretariat Dzikra Group');
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
    setTimeout(() => {
      setSuccessNotice(null);
    }, 4500);
  };

  const formatRupiah = (num: number) => 'Rp ' + (num || 0).toLocaleString('id-ID');

  // EXECUTE IN-UI DELETION
  const handleConfirmDelete = () => {
    if (deleteDialog.type === 'member') {
      if (onDeleteMemberAccount) {
        onDeleteMemberAccount(deleteDialog.id);
        triggerSuccess(`Data anggota ${deleteDialog.title} berhasil dihapus.`);
      }
    } else if (deleteDialog.type === 'loan') {
      if (onDeleteLoanApplication) {
        onDeleteLoanApplication(deleteDialog.id);
        triggerSuccess(`Pengajuan pinjaman ${deleteDialog.title} berhasil dihapus.`);
      }
    } else if (deleteDialog.type === 'news') {
      onDeleteNewsArticle(deleteDialog.id);
      triggerSuccess(`Artikel berita "${deleteDialog.title}" berhasil dihapus.`);
    } else if (deleteDialog.type === 'media') {
      onRemoveGalleryMedia(deleteDialog.id);
      triggerSuccess(`Media "${deleteDialog.title}" berhasil dihapus dari galeri.`);
    }
    setDeleteDialog({ isOpen: false, type: 'member', id: '', title: '' });
  };

  // OPEN TRANSACTION DIALOG (+SETOR / -TARIK)
  const handleOpenTransaction = (acc: MemberAccountDemo, type: 'deposit' | 'withdraw') => {
    setTransactionDialog({
      isOpen: true,
      memberNo: acc.memberNo,
      memberName: acc.fullName,
      currentSukarela: acc.totalSimpananSukarela,
      type,
      amount: type === 'deposit' ? '100000' : '50000',
      note: type === 'deposit' ? 'Setoran Tabungan Sukarela via Loket Kasir' : 'Penarikan Tabungan Sukarela via Admin',
      error: null,
    });
  };

  // SUBMIT TRANSACTION
  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(transactionDialog.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setTransactionDialog((prev) => ({ ...prev, error: 'Nominal transaksi harus lebih dari Rp 0!' }));
      return;
    }

    const currentAcc = memberAccounts[transactionDialog.memberNo];
    if (!currentAcc) {
      setTransactionDialog((prev) => ({ ...prev, error: 'Akun anggota tidak ditemukan!' }));
      return;
    }

    if (transactionDialog.type === 'withdraw') {
      if (amountNum > currentAcc.totalSimpananSukarela) {
        setTransactionDialog((prev) => ({
          ...prev,
          error: `Saldo tabungan sukarela tidak mencukupi! Maksimal penarikan: ${formatRupiah(currentAcc.totalSimpananSukarela)}`,
        }));
        return;
      }

      const updatedSukarela = currentAcc.totalSimpananSukarela - amountNum;
      onUpdateMemberAccount(currentAcc.memberNo, {
        totalSimpananSukarela: updatedSukarela,
        transaksiTerakhir: [
          {
            id: `TRX-${Date.now().toString().slice(-4)}`,
            tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
            keterangan: transactionDialog.note || 'Penarikan Sukarela via Admin',
            jenis: 'debit',
            nominal: amountNum,
          },
          ...(currentAcc.transaksiTerakhir || []),
        ],
      });
      triggerSuccess(`Berhasil memproses penarikan ${formatRupiah(amountNum)} untuk ${currentAcc.fullName}!`);
    } else {
      const updatedSukarela = currentAcc.totalSimpananSukarela + amountNum;
      onUpdateMemberAccount(currentAcc.memberNo, {
        totalSimpananSukarela: updatedSukarela,
        transaksiTerakhir: [
          {
            id: `TRX-${Date.now().toString().slice(-4)}`,
            tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
            keterangan: transactionDialog.note || 'Setoran Tunai via Loket Kasir',
            jenis: 'kredit',
            nominal: amountNum,
          },
          ...(currentAcc.transaksiTerakhir || []),
        ],
      });
      triggerSuccess(`Berhasil menambah setoran ${formatRupiah(amountNum)} untuk ${currentAcc.fullName}!`);
    }

    setTransactionDialog((prev) => ({ ...prev, isOpen: false, error: null }));
  };

  // LOGO HANDLERS
  const handleMainLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onUploadMainLogo(file);
      triggerSuccess('Logo Resmi Dzikra Group berhasil diperbarui!');
    }
  };

  const handleApplyLogoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customLogoUrl.trim() && onSetMainLogoDataUrl) {
      onSetMainLogoDataUrl(customLogoUrl.trim());
      setCustomLogoUrl('');
      triggerSuccess('Logo Resmi Dzikra Group berhasil diperbarui via URL!');
    }
  };

  const handleLogoUpload = (unitId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onUploadLogo(unitId, file);
      const unit = units.find((u) => u.id === unitId);
      triggerSuccess(`Logo untuk unit "${unit?.name}" berhasil diperbarui!`);
    }
  };

  // NEWS HANDLERS
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
    setNewsTags(article.tags ? article.tags.join(', ') : 'DzikraGroup');
    setNewsIsPinned(!!article.isPinned);
    setShowAddNewsForm(true);
  };

  const handleCreateOrUpdateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsSummary.trim() || !newsContent.trim()) {
      setSuccessNotice('Mohon lengkapi Judul, Ringkasan, dan Isi Liputan Berita!');
      return;
    }

    const payload: NewsArticle = {
      id: editingNewsId || `news-${Date.now()}`,
      title: newsTitle.trim(),
      category: newsCategory,
      unitTag: newsUnitTag,
      author: newsAuthor.trim() || 'Admin Dzikra Group',
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

  // MEDIA HANDLERS
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
            unitName: unit?.name || 'Dzikra Group',
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

  // CREATE MEMBER / RECRUITMENT HANDLER
  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberNo || !newMemberName) return;

    const newAcc: MemberAccountDemo = {
      memberNo: newMemberNo.toUpperCase().trim(),
      fullName: newMemberName.trim(),
      joinedDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      status: 'Aktif — Terverifikasi Pengurus KSU Karomah',
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

  const filteredLoans = loanApplications.filter((l) => {
    if (loanStatusFilter === 'Semua') return true;
    return l.status === loanStatusFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-[#121118] rounded-3xl max-w-5xl w-full max-h-[94vh] border border-[#ffd700]/30 shadow-2xl relative my-4 text-[#f4efe8] flex flex-col overflow-hidden">
        
        {/* TOP BAR */}
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
                  PENGURUS RESMI
                </span>
              </div>
              <span className="text-xs text-[#ffd700] font-mono">
                Dzikra Group Holding & KSU Karomah Sinergi Indonesia
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

        {/* TAB NAVIGATION */}
        <div className="bg-[#09090b] px-4 sm:px-8 border-b border-white/10 flex flex-wrap gap-2 pt-3">
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

        {/* FLOATING SUCCESS NOTICE */}
        {successNotice && (
          <div className="mx-6 mt-4 p-3.5 bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 rounded-2xl text-xs font-semibold flex items-center justify-between gap-2 animate-fade-in shadow-xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successNotice}</span>
            </div>
            <button
              onClick={() => setSuccessNotice(null)}
              className="text-emerald-400/70 hover:text-emerald-300 p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* TAB BODY */}
        <div className="p-5 sm:p-7 flex-1 overflow-y-auto space-y-6">
          
          {/* TAB 1: MEMBERS & RECRUITMENT */}
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
                <form onSubmit={handleCreateMember} className="p-6 rounded-3xl bg-[#181722] border-2 border-[#ffd700]/40 space-y-4 shadow-2xl animate-fade-in">
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
                <div className="p-4 bg-[#09090b] border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#ffd700] uppercase">
                      Buku Besar Anggota Koperasi ({filteredMembers.length} Orang)
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                      Data Terproteksi Rahasia
                    </span>
                  </div>
                  <span className="text-[11px] text-white/50">
                    Gunakan tombol +Setor, -Tarik, Rincian, atau Hapus (ikon sampah)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#14121d] text-[#ffd700] font-mono border-b border-white/10">
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
                      {filteredMembers.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-white/50">
                            Tidak ditemukan anggota dengan kata kunci pencarian.
                          </td>
                        </tr>
                      ) : (
                        filteredMembers.map((acc) => (
                          <tr key={acc.memberNo} className="hover:bg-white/5 transition-colors">
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
                            <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => handleOpenTransaction(acc, 'deposit')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-600 hover:text-white text-emerald-300 text-[11px] font-bold border border-emerald-500/30 transition-colors cursor-pointer"
                                title="Tambah Simpanan Sukarela"
                              >
                                + Setor
                              </button>

                              <button
                                onClick={() => handleOpenTransaction(acc, 'withdraw')}
                                className="px-2.5 py-1 rounded-lg bg-amber-950/80 hover:bg-amber-600 hover:text-white text-amber-300 text-[11px] font-semibold border border-amber-500/30 transition-colors cursor-pointer"
                                title="Tarik Tabungan Sukarela"
                              >
                                - Tarik
                              </button>

                              <button
                                onClick={() => setViewingMember(acc)}
                                className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 text-[11px] font-semibold border border-white/10 transition-colors cursor-pointer"
                                title="Lihat Detail Buku Tabungan"
                              >
                                Rincian
                              </button>

                              {onDeleteMemberAccount && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeleteDialog({
                                      isOpen: true,
                                      type: 'member',
                                      id: acc.memberNo,
                                      title: `${acc.fullName} (${acc.memberNo})`,
                                      subtitle: `Total saldo simpanan tercatat: ${formatRupiah(acc.totalSimpananPokok + acc.totalSimpananWajib + acc.totalSimpananSukarela)}. Data anggota yang dihapus akan dicabut dari buku koperasi.`,
                                    });
                                  }}
                                  className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 transition-all cursor-pointer inline-flex items-center justify-center"
                                  title="Hapus Data Anggota"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LOAN APPLICATIONS */}
          {activeTab === 'loans' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181722] p-5 rounded-3xl border border-white/10">
                <div>
                  <h4 className="font-serif font-black text-lg text-white">
                    Antrean Permohonan Pinjaman Masuk (Simpan Pinjam)
                  </h4>
                  <p className="text-xs text-white/60">
                    Tinjau data pengajuan pemohon, plafon pembiayaan, dan status keputusan pengurus koperasi.
                  </p>
                </div>

                {/* Status Filters */}
                <div className="flex flex-wrap items-center gap-1.5 bg-[#09090b] p-1 rounded-2xl border border-white/10 text-xs">
                  {(['Semua', 'Menunggu Persetujuan', 'Disetujui', 'Ditolak'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setLoanStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                        loanStatusFilter === st
                          ? 'bg-[#ffd700] text-[#09090b] shadow-sm'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {filteredLoans.length === 0 ? (
                <div className="text-center py-12 bg-[#181722] rounded-3xl border border-dashed border-white/20">
                  <Coins className="w-10 h-10 text-[#ffd700] mx-auto mb-2" />
                  <h5 className="font-serif font-bold text-sm text-white">
                    {loanStatusFilter === 'Semua' ? 'Belum Ada Pengajuan Pinjaman' : `Tidak Ada Pengajuan Berstatus "${loanStatusFilter}"`}
                  </h5>
                  <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto">
                    Formulir pinjaman yang diajukan pemohon di portal koperasi akan otomatis masuk ke daftar ini.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/10 border border-white/10 rounded-3xl overflow-hidden bg-[#181722]">
                  {filteredLoans.map((app) => (
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
                          NIK: {app.nik} • No. WA: {app.phone} • Diajukan: {app.date}
                        </p>
                        {app.purpose && (
                          <p className="text-[11px] text-white/65 italic mt-0.5">
                            Tujuan Pembiayaan: "{app.purpose}"
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {app.status !== 'Disetujui' && (
                          <button
                            onClick={() => {
                              onUpdateLoanStatus(app.id, 'Disetujui');
                              triggerSuccess(`Permohonan ${app.fullName} sebesar ${formatRupiah(app.amount)} telah DISETUJUI!`);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Setujui</span>
                          </button>
                        )}

                        {app.status !== 'Ditolak' && (
                          <button
                            onClick={() => {
                              onUpdateLoanStatus(app.id, 'Ditolak');
                              triggerSuccess(`Permohonan ${app.fullName} DITOLAK.`);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Tolak</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setDeleteDialog({
                              isOpen: true,
                              type: 'loan',
                              id: app.id,
                              title: `Pengajuan Pinjaman ${app.fullName} (${formatRupiah(app.amount)})`,
                              subtitle: `Status permohonan saat ini: ${app.status}. Pengajuan akan dihapus permanen dari antrean.`,
                            });
                          }}
                          className="p-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 transition-all cursor-pointer"
                          title="Hapus Pengajuan Pinjaman"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: NEWS & ACTIVITIES */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181722] p-5 rounded-3xl border border-white/10">
                <div>
                  <h4 className="font-serif font-black text-lg text-white">
                    Penerbitan & Pengelolaan Warta Dzikra Group
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
                  className="px-4 py-2 rounded-xl bg-[#ffd700] hover:bg-[#ffe066] text-[#09090b] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tulis Berita Baru</span>
                </button>
              </div>

              {/* News Form Drawer */}
              {showAddNewsForm && (
                <form onSubmit={handleCreateOrUpdateNews} className="p-6 rounded-3xl bg-[#181722] border border-[#ffd700]/40 space-y-4 shadow-2xl animate-fade-in">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h5 className="font-serif font-black text-base text-white flex items-center gap-2">
                      <Newspaper className="w-4 h-4 text-[#ffd700]" />
                      <span>{editingNewsId ? 'Edit Artikel Berita' : 'Formulir Warta & Berita Kegiatan Baru'}</span>
                    </h5>
                    <button
                      type="button"
                      onClick={() => setShowAddNewsForm(false)}
                      className="text-xs text-white/50 hover:text-white"
                    >
                      Batal
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="md:col-span-3">
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Judul Utama Artikel / Liputan *
                      </label>
                      <input
                        type="text"
                        required
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        placeholder="Contoh: Rapat Anggota Tahunan KSU Karomah Berlangsung Khidmat"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Kategori Warta
                      </label>
                      <select
                        value={newsCategory}
                        onChange={(e) => setNewsCategory(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white"
                      >
                        <option value="Koperasi & Finansial">Koperasi & Finansial</option>
                        <option value="Kegiatan & Acara">Kegiatan & Acara</option>
                        <option value="Kuliner & Kafe">Kuliner & Kafe</option>
                        <option value="Pariwisata & Edukasi">Pariwisata & Edukasi</option>
                        <option value="Sosial & Keagamaan">Sosial & Keagamaan</option>
                        <option value="Inovasi & Teknologi">Inovasi & Teknologi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Unit Terkait / Tag
                      </label>
                      <input
                        type="text"
                        value={newsUnitTag}
                        onChange={(e) => setNewsUnitTag(e.target.value)}
                        placeholder="Dzikra Group Holding"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Penulis / Reporter
                      </label>
                      <input
                        type="text"
                        value={newsAuthor}
                        onChange={(e) => setNewsAuthor(e.target.value)}
                        placeholder="Sekretariat Dzikra Group"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Estimasi Waktu Baca
                      </label>
                      <input
                        type="text"
                        value={newsReadTime}
                        onChange={(e) => setNewsReadTime(e.target.value)}
                        placeholder="3 menit baca"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/80 mb-1">
                        Tagar (Pisahkan Koma)
                      </label>
                      <input
                        type="text"
                        value={newsTags}
                        onChange={(e) => setNewsTags(e.target.value)}
                        placeholder="DzikraGrup, RapatTahunan, Karomah"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-white/80 mb-1">
                      Ringkasan Singkat (Lead Paragraph) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={newsSummary}
                      onChange={(e) => setNewsSummary(e.target.value)}
                      placeholder="Ringkasan 1-2 kalimat untuk kartu berita di beranda..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-white/80 mb-1">
                      Isi Lengkap Berita & Liputan Dokumentasi *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      placeholder="Tuliskan laporan lengkap, kronologis, atau narasi kegiatan di sini..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-white/80 mb-1">
                      URL Gambar Berita (Foto Dokumentasi)
                    </label>
                    <input
                      type="url"
                      value={newsImageUrl}
                      onChange={(e) => setNewsImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white"
                    />
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
                    Klik Edit untuk merevisi konten atau Hapus (ikon sampah) untuk mencabut rilis
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
                        type="button"
                        onClick={() => {
                          setDeleteDialog({
                            isOpen: true,
                            type: 'news',
                            id: article.id,
                            title: `Artikel: "${article.title}"`,
                            subtitle: 'Artikel ini akan dicabut dari beranda berita publik Dzikra Group.',
                          });
                        }}
                        className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 transition-all cursor-pointer"
                        title="Hapus Berita"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LOGOS MANAGEMENT */}
          {activeTab === 'logos' && (
            <div className="space-y-8">
              {/* SECTION: MAIN DZIKRA LOGO */}
              <div className="p-6 rounded-3xl bg-[#181722] border-2 border-[#ffd700]/30 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <h4 className="font-serif font-black text-xl text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#ffd700]" />
                      <span>Logo Resmi Utama Dzikra Group (Holding)</span>
                    </h4>
                    <p className="text-xs text-white/60 mt-1">
                      Logo ini ditampilkan pada bilah navigasi atas, kartu anggota e-KTA digital, kop surat, dan banner utama beranda.
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#ffd700]/15 text-[#ffd700] text-xs font-bold font-mono border border-[#ffd700]/30">
                    Akses Admin
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Current Active Main Logo Preview */}
                  <div className="flex flex-col items-center justify-center p-6 bg-[#09090b] rounded-2xl border border-white/10 text-center">
                    <span className="text-[11px] font-mono text-[#ffd700] uppercase font-bold mb-3">
                      Pratinjau Logo Aktif Saat Ini
                    </span>
                    
                    <div className="w-32 h-32 rounded-2xl bg-[#14121d] border-2 border-[#ffd700]/40 p-3 shadow-2xl flex items-center justify-center overflow-hidden">
                      {mainLogo ? (
                        <img
                          src={mainLogo}
                          alt="Logo Resmi Dzikra Group"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#ffd700] to-[#cca300] text-[#09090b] flex items-center justify-center font-serif font-black text-4xl rounded-xl">
                          DZ
                        </div>
                      )}
                    </div>

                    <span className="text-[11px] text-white/60 mt-3">
                      {mainLogo ? 'Logo Kustom Pengurus Aktif' : 'Logo Vektor Monogram Bawaan'}
                    </span>

                    {mainLogo && (
                      <button
                        type="button"
                        onClick={() => {
                          onResetMainLogo();
                          triggerSuccess('Logo Dzikra Group telah dikembalikan ke logo vektor bawaan.');
                        }}
                        className="mt-2 text-xs text-rose-400 hover:text-rose-300 underline font-semibold cursor-pointer"
                      >
                        Reset ke Logo Default
                      </button>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase font-mono text-[#ffd700] mb-1.5">
                        Opsi 1: Unggah File Logo Baru dari Komputer / HP
                      </label>
                      <label className="w-full py-3.5 px-4 rounded-xl border-2 border-dashed border-[#ffd700]/40 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-xs font-bold text-[#ffd700] cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Pilih Gambar Logo (PNG Transparan / SVG / JPG)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleMainLogoFileChange}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase font-mono text-[#ffd700] mb-1.5">
                        Opsi 2: Masukkan Tautan / URL Gambar Logo
                      </label>
                      <form onSubmit={handleApplyLogoUrl} className="flex gap-2">
                        <input
                          type="url"
                          value={customLogoUrl}
                          onChange={(e) => setCustomLogoUrl(e.target.value)}
                          placeholder="https://contoh.com/logo-dzikra.png"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-[#ffd700] hover:bg-[#ffe066] text-[#09090b] font-bold text-xs shadow-md cursor-pointer"
                        >
                          Terapkan URL
                        </button>
                      </form>
                    </div>

                    {/* Quick Preset Choice */}
                    <div>
                      <span className="block text-[11px] text-white/50 mb-1 font-mono">
                        Pilihan Cepat Varian Warna Vektor:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (onSetMainLogoDataUrl) onSetMainLogoDataUrl(DZIKRA_OFFICIAL_LOGO_SVG);
                            triggerSuccess('Logo Emas Dzikra Group Aktif!');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#09090b] hover:bg-[#ffd700]/20 text-[#ffd700] text-xs font-bold border border-[#ffd700]/40 transition-colors cursor-pointer"
                        >
                          Varian Emas Resmi (#E5B838)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (onSetMainLogoDataUrl) onSetMainLogoDataUrl(DZIKRA_OFFICIAL_LOGO_LIGHT_SVG);
                            triggerSuccess('Logo Kontras Terang Aktif!');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#181722] hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors cursor-pointer"
                        >
                          Varian Kontras (Terang)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: 10 UNIT LOGOS */}
              <div>
                <div className="mb-4">
                  <h4 className="font-serif font-black text-lg text-white">
                    Logo 10 Unit Usaha Dzikra Group
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
                <div className="p-5 rounded-3xl bg-[#181722] border border-[#ffd700]/30 space-y-4 animate-fade-in">
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

              {/* Gallery Items Grid */}
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
                        type="button"
                        onClick={() => {
                          setDeleteDialog({
                            isOpen: true,
                            type: 'media',
                            id: item.id,
                            title: `Media: "${item.title}"`,
                            subtitle: `Unit terkait: ${item.unitName || 'Dzikra'}. Media akan dihapus dari galeri publik.`,
                          });
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

        {/* MODAL FOOTER */}
        <div className="bg-[#181722] px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Seluruh perubahan data tersimpan aman ke sistem Dzikra Group.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#ffd700] text-[#09090b] font-bold text-xs hover:bg-[#ffe066] transition-colors cursor-pointer"
          >
            Tutup Panel
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. IN-UI DELETE CONFIRMATION MODAL (Reliable in sandboxed iframes)       */}
      {/* ========================================================================= */}
      {deleteDialog.isOpen && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#181726] border-2 border-rose-500/50 rounded-3xl max-w-md w-full p-6 text-[#f4efe8] shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-500/50 flex items-center justify-center text-rose-400">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-serif font-black text-lg text-white">
                  Konfirmasi Hapus Data
                </h5>
                <span className="text-[11px] text-rose-300 font-mono">
                  Tindakan ini tidak dapat dibatalkan
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#09090b] border border-white/10 space-y-1">
              <span className="text-xs font-bold text-white block">
                {deleteDialog.title}
              </span>
              {deleteDialog.subtitle && (
                <p className="text-[11px] text-white/60 leading-relaxed">
                  {deleteDialog.subtitle}
                </p>
              )}
            </div>

            <p className="text-xs text-white/70">
              Apakah Anda yakin ingin menghapus item ini sekarang?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setDeleteDialog({ isOpen: false, type: 'member', id: '', title: '' })}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-xs font-semibold text-white/80 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer transition-all active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>Ya, Hapus Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. IN-UI TRANSACTION MODAL (+SETOR / -TARIK TABUNGAN)                     */}
      {/* ========================================================================= */}
      {transactionDialog.isOpen && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#181726] border-2 border-[#ffd700]/50 rounded-3xl max-w-md w-full p-6 text-[#f4efe8] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  transactionDialog.type === 'deposit'
                    ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-400'
                    : 'bg-amber-950 border border-amber-500/50 text-amber-400'
                }`}>
                  {transactionDialog.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <h5 className="font-serif font-black text-base text-white">
                    {transactionDialog.type === 'deposit' ? 'Tambah Setoran Tabungan' : 'Tarik Saldo Tabungan Sukarela'}
                  </h5>
                  <span className="text-[11px] font-mono text-[#ffd700]">
                    {transactionDialog.memberName} ({transactionDialog.memberNo})
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTransactionDialog((prev) => ({ ...prev, isOpen: false }))}
                className="p-1 text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Sukarela Balance Display */}
            <div className="p-3.5 rounded-2xl bg-[#09090b] border border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/60">Saldo Sukarela Tersedia:</span>
              <span className="font-mono font-bold text-sm text-[#ffd700]">
                {formatRupiah(transactionDialog.currentSukarela)}
              </span>
            </div>

            {transactionDialog.error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{transactionDialog.error}</span>
              </div>
            )}

            <form onSubmit={handleSaveTransaction} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold font-mono uppercase text-white/80 mb-1">
                  Nominal Transaksi (Rp) *
                </label>
                <input
                  type="number"
                  required
                  value={transactionDialog.amount}
                  onChange={(e) => setTransactionDialog((prev) => ({ ...prev, amount: e.target.value, error: null }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090b] border border-white/20 text-sm font-mono text-white focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              {/* Quick Preset Chips */}
              <div>
                <span className="text-[10px] text-white/50 block mb-1 font-mono">Pilihan Cepat:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[50000, 100000, 250000, 500000, 1000000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setTransactionDialog((prev) => ({ ...prev, amount: preset.toString(), error: null }))}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#ffd700] hover:text-[#09090b] text-[10px] font-mono font-bold border border-white/10 transition-colors cursor-pointer"
                    >
                      +{preset >= 1000000 ? `${preset / 1000000} Jt` : `${preset / 1000} Rb`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-mono uppercase text-white/80 mb-1">
                  Keterangan / Berita Acara
                </label>
                <input
                  type="text"
                  value={transactionDialog.note}
                  onChange={(e) => setTransactionDialog((prev) => ({ ...prev, note: e.target.value }))}
                  placeholder="Keterangan transaksi..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setTransactionDialog((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs font-semibold text-white/70 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 ${
                    transactionDialog.type === 'deposit'
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{transactionDialog.type === 'deposit' ? 'Konfirmasi Setoran' : 'Konfirmasi Penarikan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. IN-UI MEMBER PROFILE & PASSBOOK DETAIL MODAL                           */}
      {/* ========================================================================= */}
      {viewingMember && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="bg-[#181726] border-2 border-[#ffd700]/40 rounded-3xl max-w-lg w-full p-6 text-[#f4efe8] shadow-2xl space-y-4 relative my-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#ffd700] text-[#09090b] font-serif font-black flex items-center justify-center text-lg">
                  KTA
                </div>
                <div>
                  <h5 className="font-serif font-black text-lg text-white">
                    {viewingMember.fullName}
                  </h5>
                  <span className="text-xs font-mono text-[#ffd700]">
                    Nomor Anggota: {viewingMember.memberNo}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewingMember(null)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Savings Breakdown */}
            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#09090b] border border-white/10">
                <span className="text-white/50 block text-[10px]">Simpanan Pokok</span>
                <span className="text-white font-bold">{formatRupiah(viewingMember.totalSimpananPokok)}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#09090b] border border-white/10">
                <span className="text-white/50 block text-[10px]">Simpanan Wajib</span>
                <span className="text-white font-bold">{formatRupiah(viewingMember.totalSimpananWajib)}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#09090b] border border-white/10">
                <span className="text-[#ffd700] block text-[10px]">Tabungan Sukarela</span>
                <span className="text-[#ffd700] font-bold text-sm">{formatRupiah(viewingMember.totalSimpananSukarela)}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#09090b] border border-white/10">
                <span className="text-emerald-400 block text-[10px]">Estimasi Bagi Hasil SHU</span>
                <span className="text-emerald-400 font-bold">{formatRupiah(viewingMember.estimasiSHU)}</span>
              </div>
            </div>

            {/* Active Loan Info */}
            {viewingMember.pinjamanAktif ? (
              <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-xs">
                <span className="text-rose-300 font-bold font-serif block">
                  Pinjaman Berjalan: {viewingMember.pinjamanAktif.jenis}
                </span>
                <div className="mt-1 text-white/70 font-mono text-[11px] flex justify-between">
                  <span>Sisa Pokok: {formatRupiah(viewingMember.pinjamanAktif.sisaPokok)}</span>
                  <span>Sisa: {viewingMember.pinjamanAktif.sisaBulan} Bulan</span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Anggota Bersih Pinjaman (Tidak ada kewajiban cicilan berjalan)</span>
              </div>
            )}

            {/* Transaction Ledger History */}
            <div>
              <span className="text-xs font-mono font-bold text-[#ffd700] uppercase block mb-2">
                Mutasi Buku Tabungan Terakhir
              </span>
              <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden max-h-44 overflow-y-auto bg-[#09090b]">
                {(!viewingMember.transaksiTerakhir || viewingMember.transaksiTerakhir.length === 0) ? (
                  <p className="p-4 text-center text-xs text-white/40">Belum ada riwayat transaksi mutasi.</p>
                ) : (
                  viewingMember.transaksiTerakhir.map((trx) => (
                    <div key={trx.id} className="p-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-white block text-[11px]">{trx.keterangan}</span>
                        <span className="text-[10px] text-white/50 font-mono">{trx.tanggal} • {trx.id}</span>
                      </div>
                      <span className={`font-mono font-bold ${trx.jenis === 'kredit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {trx.jenis === 'kredit' ? '+' : '-'}{formatRupiah(trx.nominal)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingMember(null)}
                className="px-5 py-2 rounded-xl bg-[#ffd700] text-[#09090b] text-xs font-bold cursor-pointer hover:bg-[#ffe066]"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
