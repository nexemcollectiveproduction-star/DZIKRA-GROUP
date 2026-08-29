import React from 'react';
import { BusinessUnit } from '../types';
import { 
  ChevronRight, 
  Building2, 
  Cpu, 
  Coins, 
  Coffee, 
  Compass, 
  Moon, 
  Mountain, 
  Handshake, 
  Sparkles, 
  Shirt, 
  Truck,
  ArrowUpRight
} from 'lucide-react';

interface UnitsGridProps {
  units: BusinessUnit[];
  unitLogos: Record<number, string>;
  selectedUnitId: number;
  onSelectUnit: (unitId: number) => void;
}

export const UnitsGrid: React.FC<UnitsGridProps> = ({
  units,
  unitLogos,
  selectedUnitId,
  onSelectUnit,
}) => {
  const getUnitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'Coins': return Coins;
      case 'Coffee': return Coffee;
      case 'Compass': return Compass;
      case 'Moon': return Moon;
      case 'Mountain': return Mountain;
      case 'Handshake': return Handshake;
      case 'Sparkles': return Sparkles;
      case 'Shirt': return Shirt;
      case 'Truck': return Truck;
      default: return Building2;
    }
  };

  return (
    <section id="unit" className="py-20 bg-[#09090b] text-[#f4efe8] relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#ffd700]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#8c5b36]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ekosistem Bisnis Terintegrasi</span>
          </div>

          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            10 Unit Usaha <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ffe57f] to-[#f39c12]">Dzikra Grup</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ffd700] to-[#e6b800] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Eksplorasi sinergi 10 pilar usaha di bidang jasa keuangan koperasi, teknologi informasi, perkebunan & olahan cokelat, kafe, pariwisata alam, hingga butik busana modern.
          </p>
        </div>

        {/* 10 Unit Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {units.map((unit) => {
            const IconComponent = getUnitIcon(unit.defaultIconName);
            const customLogo = unitLogos[unit.id];
            const isSelected = selectedUnitId === unit.id;

            return (
              <div
                key={unit.id}
                onClick={() => onSelectUnit(unit.id)}
                className={`group bg-[#14121d] rounded-3xl p-5 border transition-all cursor-pointer flex flex-col justify-between relative shadow-xl hover:-translate-y-1.5 hover:shadow-2xl ${
                  isSelected 
                    ? 'border-[#ffd700] ring-2 ring-[#ffd700]/50 bg-[#1a1726]' 
                    : 'border-white/10 hover:border-[#ffd700]/40'
                }`}
              >
                {/* Top index badge */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className="w-6 h-6 rounded-full bg-[#ffd700] text-[#09090b] font-mono font-black text-xs flex items-center justify-center shadow-md">
                    {unit.id}
                  </span>
                  <span className="text-[10px] font-semibold text-[#ffd700] font-mono uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded-full truncate max-w-[120px]">
                    {unit.category}
                  </span>
                </div>

                {/* Logo / Icon Box */}
                <div className="w-24 h-24 mx-auto rounded-2xl border border-white/10 bg-[#09090b] flex items-center justify-center overflow-hidden mb-4 group-hover:border-[#ffd700]/50 transition-colors relative shadow-inner">
                  {customLogo ? (
                    <img
                      src={customLogo}
                      alt={`Logo ${unit.name}`}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/80 p-2 text-center">
                      <IconComponent className="w-8 h-8 text-[#ffd700] mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-[9px] font-bold uppercase tracking-tight text-white/80 font-mono">
                        {unit.shortName}
                      </span>
                    </div>
                  )}
                </div>

                {/* Unit Name & Slogan */}
                <div className="text-center flex-1 mb-4">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-white leading-snug group-hover:text-[#ffd700] transition-colors">
                    {unit.name}
                  </h4>
                  <p className="text-[11px] text-white/60 mt-1.5 line-clamp-2 leading-relaxed font-light">
                    {unit.description}
                  </p>
                </div>

                {/* Explore Unit Action Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#ffd700] font-semibold flex items-center gap-1 group-hover:text-white transition-colors">
                    <span>Lihat Layanan</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#ffd700]" />
                  </span>
                  <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-[#ffd700] group-hover:text-[#09090b] transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
