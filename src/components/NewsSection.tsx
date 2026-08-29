import React, { useState, useMemo } from 'react';
import { NewsArticle } from '../types';
import { 
  Newspaper, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Tag, 
  Building2,
  ChevronRight,
  Filter,
  PlusCircle,
  Edit3,
  Trash2,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { NewsDetailModal } from './NewsDetailModal';

interface NewsSectionProps {
  articles: NewsArticle[];
  isAdmin?: boolean;
  onSelectUnit?: (unitId: number) => void;
  onOpenAddNews?: () => void;
  onOpenEditNews?: (article: NewsArticle) => void;
  onDeleteNews?: (articleId: string) => void;
  onOpenAdminDashboard?: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  articles,
  isAdmin = false,
  onSelectUnit,
  onOpenAddNews,
  onOpenEditNews,
  onDeleteNews,
  onOpenAdminDashboard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('Semua');
    articles.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, [articles]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchCategory = selectedCategory === 'Semua' || a.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.unitTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCategory && matchSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Featured / pinned article
  const pinnedArticle = useMemo(() => {
    return articles.find((a) => a.isPinned) || articles[0];
  }, [articles]);

  const handleDelete = (e: React.MouseEvent, article: NewsArticle) => {
    e.stopPropagation();
    if (confirm(`Apakah Anda yakin ingin menghapus berita "${article.title}"?`)) {
      onDeleteNews?.(article.id);
    }
  };

  const handleEdit = (e: React.MouseEvent, article: NewsArticle) => {
    e.stopPropagation();
    onOpenEditNews?.(article);
  };

  return (
    <section id="berita" className="py-20 bg-[#0c0b11] text-[#f4efe8] relative overflow-hidden border-t border-b border-[#232030]">
      {/* Background Subtle Luxury Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#ffd700]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8c5b36]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Admin Quick Action Banner if Logged in */}
        {isAdmin && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#201d2d] to-[#161421] border border-[#ffd700]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffd700] text-[#09090b] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider block">
                  Panel Pengurus / Admin Berita Aktif
                </span>
                <p className="text-xs text-white/80">
                  Anda dapat menambah liputan kegiatan baru, mengedit artikel, atau menghapus berita langsung dari beranda.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={onOpenAddNews}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#ffd700] hover:bg-[#ffe066] text-[#09090b] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Tulis Berita Baru</span>
              </button>

              <button
                onClick={onOpenAdminDashboard}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center justify-center gap-1.5 border border-white/15 transition-all cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>Kelola di Dashboard</span>
              </button>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kilas Berita & Dokumentasi Publik</span>
          </div>

          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Berita & Kegiatan Terkini <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ffe066] to-[#f39c12]">Dzikra Grup</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ffd700] to-[#e6b800] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Ikuti perkembangan terbaru, kegiatan ekonomi, hilirisasi produk, pemberdayaan anggota, dan dokumentasi ekspedisi dari seluruh unit usaha Dzikra Grup.
          </p>
        </div>

        {/* Featured / Pinned Article Banner */}
        {pinnedArticle && (
          <div className="mb-12 bg-gradient-to-r from-[#171520] via-[#1b1928] to-[#14121d] rounded-3xl border border-[#ffd700]/30 shadow-2xl overflow-hidden group hover:border-[#ffd700]/60 transition-all relative">
            {/* Admin Floating Edit Button on Featured */}
            {isAdmin && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-sm p-1.5 rounded-xl border border-white/20 shadow-lg">
                <button
                  onClick={(e) => handleEdit(e, pinnedArticle)}
                  className="px-3 py-1 rounded-lg bg-[#ffd700] text-[#09090b] font-bold text-xs flex items-center gap-1.5 hover:bg-[#ffe066] cursor-pointer"
                  title="Edit Berita Utama"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={(e) => handleDelete(e, pinnedArticle)}
                  className="p-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-xs cursor-pointer transition-colors"
                  title="Hapus Berita Ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image Side */}
              <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] overflow-hidden bg-black/60">
                <img
                  src={pinnedArticle.imageUrl}
                  alt={pinnedArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#ffd700] text-[#09090b] font-bold font-mono text-xs uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Kegiatan Utama</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-xs font-mono">
                    {pinnedArticle.category}
                  </span>
                </div>
              </div>

              {/* Text / Info Side */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/60 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#ffd700]" />
                      <span>{pinnedArticle.date}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#ffd700]" />
                      <span>{pinnedArticle.readTime}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-[#ffd700] font-semibold">{pinnedArticle.unitTag}</span>
                  </div>

                  <h3 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-white leading-snug group-hover:text-[#ffd700] transition-colors">
                    {pinnedArticle.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-white/75 leading-relaxed line-clamp-3 font-light">
                    {pinnedArticle.summary}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <User className="w-3.5 h-3.5 text-[#ffd700]" />
                    <span>Oleh: {pinnedArticle.author}</span>
                  </div>

                  <button
                    onClick={() => setActiveArticle(pinnedArticle)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <span>Baca Liputan Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#14121d] p-3.5 rounded-2xl border border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#ffd700] text-[#09090b] font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berita & kegiatan..."
              className="w-full pl-9.5 pr-4 py-2 rounded-xl bg-[#09090b] border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* News Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-[#14121d] rounded-3xl border border-white/10 p-8">
            <Newspaper className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <h4 className="font-serif font-bold text-lg text-white">Tidak ada artikel yang cocok</h4>
            <p className="text-xs text-white/60 mt-1 max-w-md mx-auto">
              Silakan ganti kata kunci pencarian atau pilih kategori lain.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#ffd700] text-[#09090b] font-bold text-xs cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="group bg-[#14121d] rounded-3xl overflow-hidden border border-white/10 hover:border-[#ffd700]/50 transition-all flex flex-col justify-between cursor-pointer hover:shadow-xl hover:-translate-y-1 relative"
              >
                {/* Admin Quick Action Button on Each Card */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm p-1 rounded-xl border border-white/20">
                    <button
                      onClick={(e) => handleEdit(e, article)}
                      className="p-1.5 rounded-lg bg-[#ffd700] text-[#09090b] hover:bg-[#ffe066] transition-colors cursor-pointer"
                      title="Edit Berita Ini"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, article)}
                      className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                      title="Hapus Berita Ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Top Image */}
                <div className="relative h-48 sm:h-52 bg-black/60 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14121d] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[#ffd700] text-[11px] font-mono font-semibold border border-[#ffd700]/30">
                    {article.category}
                  </span>

                  <span className="absolute bottom-2 right-3 text-[11px] text-white/70 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#ffd700]" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                {/* Article Body Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#ffd700]" />
                        <span>{article.date}</span>
                      </span>
                      <span>•</span>
                      <span className="text-[#ffd700] truncate max-w-[150px]">
                        {article.unitTag}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base sm:text-lg text-white leading-snug group-hover:text-[#ffd700] transition-colors line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="text-xs text-white/70 mt-2 line-clamp-3 leading-relaxed font-light">
                      {article.summary}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-white/50 text-[11px] truncate max-w-[160px]">
                      Oleh {article.author}
                    </span>
                    <span className="text-[#ffd700] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Selengkapnya</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reader Modal */}
      <NewsDetailModal
        article={activeArticle}
        isOpen={Boolean(activeArticle)}
        onClose={() => setActiveArticle(null)}
      />
    </section>
  );
};
