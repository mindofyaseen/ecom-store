// Default Configuration for Khandani Nimco Site Customizer
export const DEFAULT_SITE_CONFIG = {
  // General & Branding
  storeName: "Khandani Nimco & Sweets",
  storeTagline: "Asli Swad, Khandani Andaaz",
  logoUrl: "/assets/brand/khandani_logo_badge.png", // Royal Gold Crown Badge
  logoVariant: "badge", // 'badge' | 'transparent' | 'crest' | 'custom'
  phoneNumber: "+92 324 2478108",
  whatsappNumber: "923242478108",
  supportEmail: "info@khandanimco.pk",
  storeAddress: "Burns Road / Saddar, Karachi, Pakistan",
  
  // Announcement Bar
  announcementLocation: "Karachi, Pakistan",
  announcementText: "Nationwide Delivery | Bulk Orders | Export Orders",
  announcementPhone: "+92 324 2478108",
  showAnnouncementBar: true,

  // Logistics & Pricing
  minOrderLimit: 200,
  standardDeliveryFee: 150,
  freeShippingThreshold: 1500,
  currencySymbol: "Rs.",

  // Hero Section
  heroEyebrow: "TRADITIONAL PAKISTANI NIMCO",
  heroTitle: "Khandani Nimco",
  heroSubtitle: "Made for Every Occasion",
  heroTagline: "Authentic taste • Premium quality • Freshly prepared",
  heroPrimaryCtaText: "Bulk Order Karein",
  heroPrimaryCtaLink: "bulk-orders",
  heroSecondaryCtaText: "WhatsApp Us",
  heroSecondaryCtaLink: "whatsapp",
  heroImageUrl: "/assets/reference/hero_food.jpg",

  // Service Benefits Strip (4 blocks)
  benefits: [
    { id: 1, title: "Wholesale Supply", subtitle: "For Shops & Distributors", icon: "PackageCheck" },
    { id: 2, title: "Event Orders", subtitle: "Parties & Family Functions", icon: "Gift" },
    { id: 3, title: "Export Orders", subtitle: "Outside Pakistan", icon: "Globe" },
    { id: 4, title: "Premium Quality", subtitle: "Fresh & Hygienic", icon: "ShieldCheck" }
  ],

  // Promotional Banners
  wholesaleBanner: {
    eyebrow: "NEED NIMCO IN BULK?",
    title: "Wholesale Orders",
    description: "Whether it's a family function, party, event, shop supply or export order — Khandani Nimco is ready for bulk orders.",
    ctaText: "Get Wholesale Quote",
    ctaLink: "bulk-orders",
    imageUrl: "/assets/reference/wholesale_food.jpg"
  },
  exportBanner: {
    eyebrow: "TAKING PAKISTANI NIMCO",
    title: "Beyond Borders",
    description: "Bulk & export orders available for buyers outside Pakistan.",
    ctaText: "Contact for Export Orders",
    ctaLink: "export",
    imageUrl: "/assets/reference/export_ship.jpg"
  },

  // Why Choose Us (6 blocks)
  whyChooseUsTitle: "Why Khandani Nimco?",
  whyChooseUsItems: [
    { id: 1, title: "Freshly Prepared", icon: "Leaf" },
    { id: 2, title: "Consistent Quality", icon: "Shield" },
    { id: 3, title: "Bulk Orders Available", icon: "Box" },
    { id: 4, title: "Event & Party Orders", icon: "PartyPopper" },
    { id: 5, title: "Wholesale Supply", icon: "Store" },
    { id: 6, title: "Export Orders", icon: "Plane" }
  ],

  // Brand Story Section
  storyEyebrow: "OUR STORY",
  storyTitle: "A Legacy of Taste",
  storyDescription: "Khandani Nimco brings you the authentic taste of traditional Pakistani snacks, made with quality ingredients and time-honored recipes. From local gatherings to global markets, we serve happiness in every bite.",
  storyBadgeText: "Desi Swad\nHar Ghar Tak",
  storyCtaText: "Know More About Us",
  storyCtaLink: "about",
  storyImageUrl: "/assets/reference/story_food.jpg",

  // Payment Methods
  payments: {
    cod: { enabled: true, title: "Cash on Delivery (COD)" },
    jazzcash: {
      enabled: true,
      title: "JazzCash",
      accountNumber: "0324-2478108",
      accountTitle: "Khandani Nimco"
    },
    easypaisa: {
      enabled: true,
      title: "Easypaisa",
      accountNumber: "0324-2478108",
      accountTitle: "Khandani Nimco"
    },
    bankTransfer: {
      enabled: true,
      title: "Direct Bank Transfer",
      bankName: "Meezan Bank Ltd",
      accountTitle: "Khandani Nimco Official",
      accountNumber: "01020304050607",
      iban: "PK36MEZN0001020304050607"
    }
  },

  // Social & Footer
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com"
  },
  copyrightText: "© 2025 Khandani Nimco & Sweets. All Rights Reserved."
};
