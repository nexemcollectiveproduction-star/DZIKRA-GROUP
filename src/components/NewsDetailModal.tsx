import React from 'react';
import { NewsArticle } from '../types';
import { 
  X, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Share2, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  Building2
} from 'lucide-react';

interface NewsDetailModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  article,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan berita berhasil disalin ke papan klip!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#121118] border border-[#ffd700]/25 rounded-3xl shadow-2xl overflow-hidden text-[#f5f0e8] my-8 max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#181722]/80 backdrop-blur-md flex items-center justify-between gap-3 sticky top-0 z-20">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/90 text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#ffd700]" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-[#ffd700] transition-colors border border-white/10 cursor-pointer"
              title="Bagikan Berita Ini"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/80 hover:text-red-300 transition-colors border border-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Category & Unit Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#ffd700]/15 border border-[#ffd700]/40 text-[#ffd700] font-mono font-bold text-xs uppercase tracking-wider">
              {article.category}
            </span>
            {article.unitTag && (
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>{article.unitTag}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
            {article.title}
          </h1>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 border-y border-white/10 py-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#ffd700]" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#ffd700]" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#ffd700]" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Main Cover Image */}
          {article.imageUrl && (
            <div className="relative rounded-2xl overflow-hidden border border-white/10 max-h-[420px] bg-black/40">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Executive Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#ffd700]/5 border border-[#ffd700]/20 text-[#f5eedc] text-sm sm:text-base font-medium leading-relaxed italic">
            "{article.summary}"
          </div>

          {/* Article Full Body */}
          <div className="prose prose-invert max-w-none text-white/90 text-sm sm:text-base leading-relaxed space-y-4 font-light">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/60 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>Kata Kunci:</span>
              </span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Callout */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1f1b2d] to-[#14121d] border border-[#ffd700]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffd700]/20 text-[#ffd700] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white">
                  Ingin Terlibat dalam Kegiatan Dzikra Group?
                </h4>
                <p className="text-xs text-white/70 mt-0.5">
                  Hubungi sekretariat atau bergabung menjadi anggota KSU Karomah Sinergi Indonesia.
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/6281312271662?text=Halo%20Admin%20Dzikra%20Group,%20saya%20tertarik%20dengan%20kegiatan%20Dzikra%20Group%20dan%20ingin%20bergabung/berkolaborasi."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-[#ffd700] hover:bg-[#e6c200] text-[#09090b] font-bold text-xs whitespace-nowrap shadow-md transition-all cursor-pointer"
            >
              Hubungi Sekretariat
            </a>
          </div>
        </div>

        {/* Bottom Back Button Bar */}
        <div className="p-4 border-t border-white/10 bg-[#181722]/80 flex items-center justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#ffd700]" />
            <span>Tutup & Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
