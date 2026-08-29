import React from 'react';

/**
 * Official Dzikra Group Core Logo
 * Color: Golden Ochre (#E5B838 / #DFAC2C) + Black/White slogan
 * Slogan: "Satu Atap, Berjuta Karya"
 */

export const DZIKRA_GOLD_COLOR = '#E5B838';

export const DZIKRA_OFFICIAL_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 520" width="100%" height="100%">
  <!-- Top Geometric Monogram Symbol -->
  <g fill="${DZIKRA_GOLD_COLOR}">
    <!-- Top Half -->
    <!-- Top left outer & arch -->
    <path d="M 90,30 L 210,30 L 210,60 L 130,60 C 130,120 160,140 210,140 L 210,170 C 130,170 90,130 90,30 Z" />
    <!-- Top right outer & arch -->
    <path d="M 410,30 L 290,30 L 290,60 L 370,60 C 370,120 340,140 290,140 L 290,170 C 370,170 410,130 410,30 Z" />
    <!-- Top center vertical spine -->
    <path d="M 235,30 L 265,30 L 265,170 L 235,170 Z" />
    <!-- Top horizontal connector bar -->
    <path d="M 190,140 L 310,140 L 310,170 L 190,170 Z" />

    <!-- Horizontal separation bar -->
    <path d="M 90,182 L 410,182 L 410,202 L 90,202 Z" />

    <!-- Bottom Half (Rotated / Inverted) -->
    <!-- Bottom left outer & arch -->
    <path d="M 90,354 L 210,354 L 210,324 L 130,324 C 130,264 160,244 210,244 L 210,214 C 130,214 90,254 90,354 Z" />
    <!-- Bottom right outer & arch -->
    <path d="M 410,354 L 290,354 L 290,324 L 370,324 C 370,264 340,244 290,244 L 290,214 C 370,214 410,254 410,354 Z" />
    <!-- Bottom center vertical spine -->
    <path d="M 235,214 L 265,214 L 265,354 L 235,354 Z" />
    <!-- Bottom horizontal connector bar -->
    <path d="M 190,214 L 310,214 L 310,244 L 190,244 Z" />
  </g>

  <!-- Typography: DZIKRA GROUP -->
  <text x="250" y="420" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Montserrat', 'Inter', system-ui, -apple-system, sans-serif" font-weight="900" font-size="46" letter-spacing="4" fill="${DZIKRA_GOLD_COLOR}">
    DZIKRA GROUP
  </text>

  <!-- Slogan: Satu Atap, Berjuta Karya -->
  <text x="250" y="475" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Montserrat', 'Inter', system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" letter-spacing="0.5" fill="#f4efe8">
    Satu Atap, Berjuta Karya
  </text>
</svg>
`)}`;

export const DZIKRA_OFFICIAL_LOGO_LIGHT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 520" width="100%" height="100%">
  <!-- Top Geometric Monogram Symbol -->
  <g fill="${DZIKRA_GOLD_COLOR}">
    <path d="M 90,30 L 210,30 L 210,60 L 130,60 C 130,120 160,140 210,140 L 210,170 C 130,170 90,130 90,30 Z" />
    <path d="M 410,30 L 290,30 L 290,60 L 370,60 C 370,120 340,140 290,140 L 290,170 C 370,170 410,130 410,30 Z" />
    <path d="M 235,30 L 265,30 L 265,170 L 235,170 Z" />
    <path d="M 190,140 L 310,140 L 310,170 L 190,170 Z" />

    <path d="M 90,182 L 410,182 L 410,202 L 90,202 Z" />

    <path d="M 90,354 L 210,354 L 210,324 L 130,324 C 130,264 160,244 210,244 L 210,214 C 130,214 90,254 90,354 Z" />
    <path d="M 410,354 L 290,354 L 290,324 L 370,324 C 370,264 340,244 290,244 L 290,214 C 370,214 410,254 410,354 Z" />
    <path d="M 235,214 L 265,214 L 265,354 L 235,354 Z" />
    <path d="M 190,214 L 310,214 L 310,244 L 190,244 Z" />
  </g>

  <!-- Typography: DZIKRA GROUP -->
  <text x="250" y="420" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Montserrat', 'Inter', system-ui, -apple-system, sans-serif" font-weight="900" font-size="46" letter-spacing="4" fill="${DZIKRA_GOLD_COLOR}">
    DZIKRA GROUP
  </text>

  <!-- Slogan: Satu Atap, Berjuta Karya -->
  <text x="250" y="475" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Montserrat', 'Inter', system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" letter-spacing="0.5" fill="#09090b">
    Satu Atap, Berjuta Karya
  </text>
</svg>
`)}`;

interface DzikraLogoComponentProps {
  className?: string;
  variant?: 'full' | 'emblem-only' | 'horizontal';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const DzikraOfficialLogo: React.FC<DzikraLogoComponentProps> = ({
  className = '',
  variant = 'full',
  theme = 'dark',
  size = 'md',
}) => {
  const sloganColor = theme === 'dark' ? '#f4efe8' : '#09090b';

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  if (variant === 'emblem-only') {
    return (
      <svg
        viewBox="0 0 500 380"
        className={`${sizeClasses[size]} ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill={DZIKRA_GOLD_COLOR}>
          <path d="M 90,30 L 210,30 L 210,60 L 130,60 C 130,120 160,140 210,140 L 210,170 C 130,170 90,130 90,30 Z" />
          <path d="M 410,30 L 290,30 L 290,60 L 370,60 C 370,120 340,140 290,140 L 290,170 C 370,170 410,130 410,30 Z" />
          <path d="M 235,30 L 265,30 L 265,170 L 235,170 Z" />
          <path d="M 190,140 L 310,140 L 310,170 L 190,170 Z" />

          <path d="M 90,182 L 410,182 L 410,202 L 90,202 Z" />

          <path d="M 90,354 L 210,354 L 210,324 L 130,324 C 130,264 160,244 210,244 L 210,214 C 130,214 90,254 90,354 Z" />
          <path d="M 410,354 L 290,354 L 290,324 L 370,324 C 370,264 340,244 290,244 L 290,214 C 370,214 410,254 410,354 Z" />
          <path d="M 235,214 L 265,214 L 265,354 L 235,354 Z" />
          <path d="M 190,214 L 310,214 L 310,244 L 190,244 Z" />
        </g>
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <svg
          viewBox="0 0 500 380"
          className="w-11 h-11 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill={DZIKRA_GOLD_COLOR}>
            <path d="M 90,30 L 210,30 L 210,60 L 130,60 C 130,120 160,140 210,140 L 210,170 C 130,170 90,130 90,30 Z" />
            <path d="M 410,30 L 290,30 L 290,60 L 370,60 C 370,120 340,140 290,140 L 290,170 C 370,170 410,130 410,30 Z" />
            <path d="M 235,30 L 265,30 L 265,170 L 235,170 Z" />
            <path d="M 190,140 L 310,140 L 310,170 L 190,170 Z" />

            <path d="M 90,182 L 410,182 L 410,202 L 90,202 Z" />

            <path d="M 90,354 L 210,354 L 210,324 L 130,324 C 130,264 160,244 210,244 L 210,214 C 130,214 90,254 90,354 Z" />
            <path d="M 410,354 L 290,354 L 290,324 L 370,324 C 370,264 340,244 290,244 L 290,214 C 370,214 410,254 410,354 Z" />
            <path d="M 235,214 L 265,214 L 265,354 L 235,354 Z" />
            <path d="M 190,214 L 310,214 L 310,244 L 190,244 Z" />
          </g>
        </svg>
        <div className="flex flex-col">
          <span className="font-serif font-black text-xl tracking-wider text-[#E5B838] leading-tight">
            DZIKRA GROUP
          </span>
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: sloganColor }}
          >
            Satu Atap, Berjuta Karya
          </span>
        </div>
      </div>
    );
  }

  // Full stacked logo
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <svg
        viewBox="0 0 500 380"
        className={`${sizeClasses[size]} mb-2.5 drop-shadow-md`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill={DZIKRA_GOLD_COLOR}>
          <path d="M 90,30 L 210,30 L 210,60 L 130,60 C 130,120 160,140 210,140 L 210,170 C 130,170 90,130 90,30 Z" />
          <path d="M 410,30 L 290,30 L 290,60 L 370,60 C 370,120 340,140 290,140 L 290,170 C 370,170 410,130 410,30 Z" />
          <path d="M 235,30 L 265,30 L 265,170 L 235,170 Z" />
          <path d="M 190,140 L 310,140 L 310,170 L 190,170 Z" />

          <path d="M 90,182 L 410,182 L 410,202 L 90,202 Z" />

          <path d="M 90,354 L 210,354 L 210,324 L 130,324 C 130,264 160,244 210,244 L 210,214 C 130,214 90,254 90,354 Z" />
          <path d="M 410,354 L 290,354 L 290,324 L 370,324 C 370,264 340,244 290,244 L 290,214 C 370,214 410,254 410,354 Z" />
          <path d="M 235,214 L 265,214 L 265,354 L 235,354 Z" />
          <path d="M 190,214 L 310,214 L 310,244 L 190,244 Z" />
        </g>
      </svg>
      <span className="font-serif font-black text-2xl tracking-widest text-[#E5B838] leading-none mb-1">
        DZIKRA GROUP
      </span>
      <span
        className="text-xs sm:text-sm font-semibold tracking-wide"
        style={{ color: sloganColor }}
      >
        Satu Atap, Berjuta Karya
      </span>
    </div>
  );
};

