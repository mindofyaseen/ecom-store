import React from 'react';
import { useStore } from '../context/StoreContext';

export const BrandLogo = ({ size = "md", className = "", variant = "badge" }) => {
  const { navigateTo, siteConfig } = useStore();

  const sizeClasses = {
    sm: "h-11 md:h-12",
    md: "h-14 md:h-16",
    lg: "h-18 md:h-22",
    footer: "h-16 md:h-20"
  };

  // Determine active logo image source
  let logoSrc = siteConfig?.logoUrl || '/assets/brand/khandani_logo_badge.png';

  // If in footer or requested transparent on dark surface
  if (variant === 'transparent') {
    logoSrc = '/assets/brand/khandani_logo_clean.png';
  } else if (variant === 'badge') {
    logoSrc = siteConfig?.logoUrl || '/assets/brand/khandani_logo_badge.png';
  }

  return (
    <div 
      onClick={() => navigateTo('home')} 
      className={`inline-flex flex-col items-center cursor-pointer select-none transition-transform duration-200 hover:scale-[1.03] ${className}`}
      role="button"
      aria-label={`${siteConfig?.storeName || 'Khandani Nimco'} Home`}
    >
      <img
        src={logoSrc}
        alt={`${siteConfig?.storeName || 'Khandani Nimco'} - ${siteConfig?.storeTagline || 'Asli Swad, Khandani Andaaz'}`}
        className={`${sizeClasses[size] || sizeClasses.md} w-auto object-contain drop-shadow-md`}
        loading="eager"
      />
    </div>
  );
};
