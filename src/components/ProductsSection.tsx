import React, { useState } from 'react';
import { BusinessUnit } from '../types';
import { 
  Coffee, 
  Sparkles, 
  Shirt, 
  Compass, 
  ExternalLink, 
  ShoppingBag, 
  Check, 
  Star,
  Tag
} from 'lucide-react';

interface ProductsSectionProps {
  units: BusinessUnit[];
  onSelectUnit: (unitId: number) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  units,
  onSelectUnit,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Semua');

  // Filter units with consumer products: Cokusi Kameumeut (3), Cafe Sepertiga Malam (5), Lervara (8), Dzi Collection (9), Cokusi Cafe (4)
  const brandUnits = units.filter((u) => [3, 4, 5, 8, 9].includes(u.id));

  // Collect all products with brand info
  const allProducts = brandUnits.flatMap((u) =>
    u.products.map((p) => ({
      ...p,
      unitId: u.id,
      unitName: u.name,
      unitShortName: u.shortName,
      unitCategory: u.category,
    }))
  );

  const filteredProducts = selectedBrand === 'Semua'
    ? allProducts
    : allProducts.filter((p) => p.unitShortName === selectedBrand);

  return (
    <section id="produk" className="py-24 bg-[#09090b] text-[#f4efe8] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700] font-mono">
            Karya Autentik Nusantara
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white mt-2 relative inline-block">
            Produk & Merek Unggulan
          </h2>
          <div className="w-20 h-1 bg-[#ffd700] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Jelajahi produk olahan cokelat asli, racikan kopi specialty, busana muslim berkualitas, hingga kerajinan gaya hidup modern dari unit usaha Dzikra Grup.
          </p>
        </div>

        {/* Brand Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedBrand('Semua')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedBrand === 'Semua'
                ? 'bg-[#ffd700] text-[#09090b] shadow-md font-black'
                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
            }`}
          >
            Semua Merek ({allProducts.length})
          </button>
          {brandUnits.map((u) => (
            <button
              key={u.id}
              onClick={() => setSelectedBrand(u.shortName)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedBrand === u.shortName
                  ? 'bg-[#ffd700] text-[#09090b] shadow-md font-black'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
            >
              {u.shortName}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((prod, idx) => (
            <div
              key={idx}
              className="bg-[#14121d] rounded-3xl p-6 border border-white/10 shadow-lg flex flex-col justify-between hover:border-[#ffd700]/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-[#ffd700] text-[10px] font-mono font-bold uppercase truncate max-w-[150px] border border-white/10">
                    {prod.unitShortName}
                  </span>
                  {prod.tag && (
                    <span className="px-2 py-0.5 rounded-full bg-[#ffd700]/15 text-[#ffd700] text-[10px] font-bold">
                      {prod.tag}
                    </span>
                  )}
                </div>

                <h4 className="font-serif font-black text-lg text-white group-hover:text-[#ffd700] transition-colors">
                  {prod.name}
                </h4>

                <p className="text-xs text-white/65 mt-2.5 leading-relaxed font-light">
                  {prod.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/50 font-mono block">Harga Estimasi</span>
                  <span className="font-serif font-black text-base text-[#ffd700]">
                    {prod.price || 'Sesuai Pesanan'}
                  </span>
                </div>

                <a
                  href={`https://wa.me/6281388990012?text=Halo%20Admin%20Dzikra%20Grup,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(prod.name)}%20(${encodeURIComponent(prod.unitShortName)})`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6b800] hover:from-[#ffe066] hover:to-[#cca300] text-[#09090b] text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#09090b]" />
                  <span>Pesan</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
