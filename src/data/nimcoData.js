export const CITIES_LIST = [
  { name: "Karachi", deliveryEstimate: "24-48 Hours (Express Delivery)", deliveryFee: 150 },
  { name: "Lahore", deliveryEstimate: "2-3 Days (Courier Air)", deliveryFee: 200 },
  { name: "Islamabad", deliveryEstimate: "2-3 Days (Courier Air)", deliveryFee: 200 },
  { name: "Rawalpindi", deliveryEstimate: "2-3 Days (Courier Air)", deliveryFee: 200 },
  { name: "Faisalabad", deliveryEstimate: "2-4 Days (Courier Standard)", deliveryFee: 220 },
  { name: "Multan", deliveryEstimate: "2-4 Days (Courier Standard)", deliveryFee: 220 },
  { name: "Peshawar", deliveryEstimate: "3-4 Days (Courier Standard)", deliveryFee: 240 },
  { name: "Quetta", deliveryEstimate: "3-4 Days (Courier Standard)", deliveryFee: 250 },
  { name: "Sialkot", deliveryEstimate: "2-3 Days (Courier Standard)", deliveryFee: 220 },
  { name: "Hyderabad", deliveryEstimate: "24-36 Hours (Intercity Express)", deliveryFee: 180 },
  { name: "Gujranwala", deliveryEstimate: "2-4 Days (Courier Standard)", deliveryFee: 220 },
  { name: "Sukkur", deliveryEstimate: "2-3 Days (Courier Standard)", deliveryFee: 220 },
  { name: "Bahawalpur", deliveryEstimate: "2-4 Days (Courier Standard)", deliveryFee: 220 }
];

export const INITIAL_COUPONS = [
  {
    code: "KHANDANI10",
    discountPercent: 10,
    minOrder: 400,
    description: "10% Flat Discount on all Khandani Nimco Snacks!"
  },
  {
    code: "FREESHIP",
    isFreeShipping: true,
    minOrder: 800,
    description: "Free Delivery Nationwide on orders above Rs. 800!"
  },
  {
    code: "KN100",
    flatDiscount: 100,
    minOrder: 1000,
    description: "Flat Rs. 100 OFF on orders above Rs. 1,000!"
  },
  {
    code: "CHAI200",
    flatDiscount: 200,
    minOrder: 1800,
    description: "Rs. 200 OFF on Family Tea & Snack Orders!"
  }
];

export const HERO_SLIDES = [
  {
    id: "slide-1",
    tagline: "🔥 Asli Khandani Karachi Nimco",
    title: "Khandani Special Mix Nimco & KKM Spiced Bhujia",
    description: "70 Saal purana Burns Road ka Asli Zaiqa. Hand-ground secret spices, pure vegetable oil, aur nitrogen-sealed crunch.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Order Khandani Mix",
    categoryFilter: "Mix Nimco",
    badge: "100% Fresh Daily"
  },
  {
    id: "slide-2",
    tagline: "🌶️ Fresh Burns Road Gathiya",
    title: "Khandani Mota Gathiya & Crunchy Papri Gathiya",
    description: "Tender, crispy gram flour gathiya prepared with carom seeds (Ajwain) and sea salt. Classic evening tea companion.",
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explore Gathiya",
    categoryFilter: "Gathiya & Bhujia",
    badge: "Daily Batch"
  },
  {
    id: "slide-3",
    tagline: "🥜 Shahi Dry Fruits & Roasted Snacks",
    title: "Golden Roasted Masala Cashews & Salted Peanuts",
    description: "Premium jumbo kaju and crunchy peanuts roasted in subtle spices and Himalayan pink salt.",
    image: "https://images.unsplash.com/photo-1509358211425-24e54bc858d1?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Order Salted Nuts",
    categoryFilter: "Salted Nuts",
    badge: "Healthy & Crisp"
  },
  {
    id: "slide-4",
    tagline: "🎁 Khandani Shahi Nimco Gift Boxes",
    title: "Luxury Assorted Karachi Nimco Gift Hampers",
    description: "Family functions, parties, and gifts ke liye khalis Karachi ki saugaat. Tamam Pakistan mein express dispatch.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
    ctaText: "View Nimco Hampers",
    categoryFilter: "Nimco Hampers",
    badge: "Nationwide Shipping"
  }
];

// 100% Pure Authentic Pakistani Nimco Products
export const INITIAL_PRODUCTS = [
  // --- 1. POPULAR SHOWCASE 16 ITEMS (FROM REFERENCE DESIGN) ---
  {
    id: "nimco-1",
    name: "Mix Nimco",
    category: "Mix Nimco",
    price: 150,
    spiceLevel: "Medium",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.9,
    reviewsCount: 148,
    badge: "Best Seller",
    isPopular: true,
    stock: 95,
    image: "/assets/products/mix-nimco.png",
    description: "Signature Burns Road Special Mix Nimco with crispy sev, fried lentils, roasted peanuts, and authentic aromatic spices.",
    ingredients: "Gram Flour, Peanuts, Moong Lentils, Spices, Pure Edible Oil."
  },
  {
    id: "nimco-2",
    name: "Mota Gathiya",
    category: "Gathiya & Bhujia",
    price: 150,
    spiceLevel: "Mild",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.9,
    reviewsCount: 112,
    badge: "Classic Tea Snack",
    isPopular: true,
    stock: 80,
    image: "/assets/products/mota-gathiya.png",
    description: "Thick, tender-crisp gram flour gathiya delicately seasoned with carom seeds (Ajwain) and black pepper.",
    ingredients: "Pure Besan (Gram Flour), Ajwain, Black Pepper, Edible Oil, Sea Salt."
  },
  {
    id: "nimco-3",
    name: "Bareek Gathiya",
    category: "Gathiya & Bhujia",
    price: 150,
    spiceLevel: "Mild",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.8,
    reviewsCount: 86,
    badge: "Crispy Crunch",
    isPopular: true,
    stock: 75,
    image: "/assets/products/bareek-gathiya.png",
    description: "Thin delicate gathiya threads with ultra-crisp texture. Dissolves easily in mouth with hot tea.",
    ingredients: "Fine Gram Flour, Carom Seeds, Cumin, Edible Oil, Salt."
  },
  {
    id: "nimco-4",
    name: "Papri Gathiya",
    category: "Gathiya & Bhujia",
    price: 150,
    spiceLevel: "Mild",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.8,
    reviewsCount: 94,
    badge: "Crunch Ribbon",
    isPopular: true,
    stock: 85,
    image: "/assets/products/papri-gathiya.png",
    description: "Flat ribbon-shaped crispy gathiya. Light, crunchy, and seasoned with gentle carom spice.",
    ingredients: "Gram Flour, White Carom, Salt, Refined Oil."
  },
  {
    id: "nimco-5",
    name: "Sew",
    category: "Sew (Sev)",
    price: 150,
    spiceLevel: "Medium",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.7,
    reviewsCount: 79,
    badge: "Fresh Batch",
    isPopular: true,
    stock: 70,
    image: "/assets/products/sew.png",
    description: "Fine golden besan sev noodles fried to crispy perfection. Ideal for evening chai and homemade chaats.",
    ingredients: "Gram Flour, Turmeric, Salt, Pure Oil."
  },
  {
    id: "nimco-6",
    name: "Medium Sew",
    category: "Sew (Sev)",
    price: 150,
    spiceLevel: "Medium",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.8,
    reviewsCount: 65,
    badge: "Everyday Crunch",
    isPopular: true,
    stock: 90,
    image: "/assets/products/medium-sew.png",
    description: "Standard medium-gauge crunchy gram flour sev with authentic savory seasoning.",
    ingredients: "Gram Flour, Red Chili, Salt, Edible Oil."
  },
  {
    id: "nimco-7",
    name: "Lal Gathiya",
    category: "Gathiya & Bhujia",
    price: 150,
    spiceLevel: "Hot & Spicy",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.9,
    reviewsCount: 104,
    badge: "Teekha Special",
    isPopular: true,
    stock: 65,
    image: "/assets/products/lal-gathiya.png",
    description: "Spicy red chili coated crispy gathiya. Burns Road special punch for those who love hot snacks.",
    ingredients: "Gram Flour, Kashmiri Red Chili, Ajwain, Chaat Masala, Oil."
  },
  {
    id: "nimco-8",
    name: "Toppops",
    category: "Chewra & Papri",
    price: 190,
    spiceLevel: "Chatpata",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.9,
    reviewsCount: 130,
    badge: "Favorite Crunch",
    isPopular: true,
    stock: 55,
    image: "/assets/products/toppops.png",
    description: "Airy crispy golden spheres dusted with tangy chatpata masala. A legendary nostalgic Pakistani snack.",
    ingredients: "Corn Meal, Rice Meal, Chaat Spices, Rock Salt, Edible Oil."
  },
  {
    id: "nimco-9",
    name: "Dal Mung",
    category: "Dal Snacks",
    price: 150,
    spiceLevel: "Mild Salty",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.8,
    reviewsCount: 92,
    badge: "High Protein",
    isPopular: true,
    stock: 80,
    image: "/assets/products/dal-mung.png",
    description: "Golden split yellow moong lentils lightly fried and salted. Incredibly crunchy, light, and protein-packed.",
    ingredients: "Yellow Moong Lentils, Himalayan Rock Salt, Edible Vegetable Oil."
  },
  {
    id: "nimco-10",
    name: "Dal Muth",
    category: "Dal Snacks",
    price: 150,
    spiceLevel: "Medium",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.9,
    reviewsCount: 118,
    badge: "Burns Road Star",
    isPopular: true,
    stock: 85,
    image: "/assets/products/dal-muth.png",
    description: "Crispy fried whole moth lentils mixed with micro-fine sev and tangy chaat masala.",
    ingredients: "Moth Lentils, Gram Flour Sev, Amchur, Cumin, Black Salt."
  },
  {
    id: "nimco-11",
    name: "Dal Chana",
    category: "Dal Snacks",
    price: 150,
    spiceLevel: "Chatpata",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.8,
    reviewsCount: 75,
    badge: "Savory Crunch",
    isPopular: true,
    stock: 70,
    image: "/assets/products/dal-chana.png",
    description: "Crunchy fried split Bengal gram seasoned with tart amchur, cumin, and red chili.",
    ingredients: "Split Bengal Gram (Chana Dal), Spices, Rock Salt, Oil."
  },
  {
    id: "nimco-12",
    name: "Metha Chewra",
    category: "Chewra & Papri",
    price: 150,
    spiceLevel: "Sweet & Savory",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.9,
    reviewsCount: 88,
    badge: "Khatta Meetha",
    isPopular: true,
    stock: 75,
    image: "/assets/products/metha-chewra.png",
    description: "Crispy flattened rice flakes combined with golden raisins, peanuts, and delicate sweet-tangy spices.",
    ingredients: "Flattened Rice (Poha), Peanuts, Raisins, Sugar, Amchur, Edible Oil."
  },
  {
    id: "nimco-13",
    name: "Namkeen Chewra",
    category: "Chewra & Papri",
    price: 150,
    spiceLevel: "Medium Savory",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.8,
    reviewsCount: 96,
    badge: "Traditional Poha",
    isPopular: true,
    stock: 80,
    image: "/assets/products/namkeen-chewra.png",
    description: "Salty, spiced crispy flattened rice with crunchy peanuts, roasted lentils, and aromatic curry leaves.",
    ingredients: "Poha, Peanuts, Mustard Seeds, Curry Leaves, Turmeric, Salt."
  },
  {
    id: "nimco-14",
    name: "Phulki",
    category: "Chewra & Papri",
    price: 150,
    spiceLevel: "Mild",
    weightOptions: [
      { label: "150 gm", value: 0.15, priceMultiplier: 1 },
      { label: "300 gm", value: 0.3, priceMultiplier: 1.9 },
      { label: "600 gm", value: 0.6, priceMultiplier: 3.6 }
    ],
    rating: 4.7,
    reviewsCount: 62,
    badge: "Air Crisps",
    isPopular: true,
    stock: 85,
    image: "/assets/products/phulki.png",
    description: "Feather-light golden puffs made from chickpea batter. Crispy dry snack or perfect for Dahi Phulki.",
    ingredients: "Chickpea Flour, Baking Soda, Cumin, Rock Salt, Oil."
  },
  {
    id: "nimco-15",
    name: "Chat Papri",
    category: "Chewra & Papri",
    price: 150,
    spiceLevel: "Savory",
    weightOptions: [
      { label: "150 gm", value: 0.15, priceMultiplier: 1 },
      { label: "300 gm", value: 0.3, priceMultiplier: 1.9 },
      { label: "600 gm", value: 0.6, priceMultiplier: 3.6 }
    ],
    rating: 4.9,
    reviewsCount: 140,
    badge: "Chaat Essential",
    isPopular: true,
    stock: 90,
    image: "/assets/products/chat-papri.png",
    description: "Flaky circular crisp wafers fried to shatter-crunch texture with carom seed fragrance. Perfect for Papri Chaat.",
    ingredients: "Refined Flour, Semolina, Ajwain, Sea Salt, Pure Oil."
  },
  {
    id: "nimco-16",
    name: "Kala Chana",
    category: "Dal Snacks",
    price: 150,
    spiceLevel: "Mild Salted",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.8,
    reviewsCount: 71,
    badge: "Low Calorie",
    isPopular: true,
    stock: 65,
    image: "/assets/products/kala-chana.png",
    description: "Sand-roasted whole black chickpeas with natural brown skin. Healthy, crunchy, and high in plant fiber.",
    ingredients: "Whole Black Chickpeas, Sea Salt."
  },

  // --- ADDITIONAL AUTHENTIC NIMCO VARIETIES ---
  {
    id: "nimco-17",
    name: "Karachi Aloo Bhujia",
    category: "Gathiya & Bhujia",
    price: 160,
    spiceLevel: "Hot & Spicy",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.9,
    reviewsCount: 125,
    badge: "Fan Favorite",
    isPopular: true,
    stock: 80,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    description: "Crispy potato and gram flour micro-threads spiced with mint, red chili, and amchur.",
    ingredients: "Potatoes, Gram Flour, Mint, Red Chili, Spices, Oil."
  },
  {
    id: "nimco-18",
    name: "Bikaneri Besan Bhujia",
    category: "Gathiya & Bhujia",
    price: 160,
    spiceLevel: "Medium",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.8,
    reviewsCount: 80,
    badge: "Crisp Heritage",
    isPopular: false,
    stock: 70,
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80",
    description: "Traditional crunchy bhujia crafted with moth bean flour and aromatic cloves.",
    ingredients: "Moth Bean Flour, Besan, Cloves, Cardamom, Edible Oil."
  },
  {
    id: "nimco-19",
    name: "Fine Nylon Sew",
    category: "Sew (Sev)",
    price: 150,
    spiceLevel: "Mild",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.8,
    reviewsCount: 90,
    badge: "Bhel Topping",
    isPopular: false,
    stock: 85,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
    description: "Super-fine golden sev threads, essential garnish for sev puri, dahi puri, and bhel puri.",
    ingredients: "Fine Gram Flour, Turmeric, Salt, Oil."
  },
  {
    id: "nimco-20",
    name: "Special Masala Cashews (Kaju)",
    category: "Salted Nuts",
    price: 350,
    spiceLevel: "Medium",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.3 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.5 }
    ],
    rating: 5.0,
    reviewsCount: 160,
    badge: "Premium Royal",
    isPopular: true,
    stock: 50,
    image: "https://images.unsplash.com/photo-1509358211425-24e54bc858d1?auto=format&fit=crop&w=600&q=80",
    description: "Jumbo whole roasted cashews dusted with secret royal chaat masala.",
    ingredients: "Whole Cashews (Kaju), Amchur, Cumin, Rock Salt."
  },
  {
    id: "nimco-21",
    name: "Salted Roasted Peanuts",
    category: "Salted Nuts",
    price: 120,
    spiceLevel: "Salted",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.8,
    reviewsCount: 88,
    badge: "Tea Classic",
    isPopular: true,
    stock: 95,
    image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80",
    description: "Crisp red-skinned peanuts sand-roasted with sea salt to crunch perfection.",
    ingredients: "Whole Peanuts, Sea Salt."
  },
  {
    id: "nimco-22",
    name: "Teekha Boondi Fry",
    category: "Chewra & Papri",
    price: 140,
    spiceLevel: "Medium",
    weightOptions: [
      { label: "100 gm", value: 0.1, priceMultiplier: 1 },
      { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
      { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
    ],
    rating: 4.7,
    reviewsCount: 54,
    badge: "Raita & Chaat",
    isPopular: false,
    stock: 80,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    description: "Golden pearl droplets of crispy gram flour. Snack by itself or ideal for Raita and Chaat.",
    ingredients: "Gram Flour, Ajwain, Black Salt, Chili, Oil."
  },
  {
    id: "nimco-23",
    name: "Khandani Assorted Nimco Gift Box",
    category: "Nimco Hampers",
    price: 1250,
    spiceLevel: "Assorted Mix",
    weightOptions: [
      { label: "1 KG Gift Box", value: 1.0, priceMultiplier: 1 },
      { label: "2 KG Royal Box", value: 2.0, priceMultiplier: 1.9 }
    ],
    rating: 5.0,
    reviewsCount: 175,
    badge: "Luxury Nimco Tin",
    isPopular: true,
    stock: 35,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    description: "Royal keepsake box containing 4 airtight packs of fresh Mix Nimco, Mota Gathiya, Dal Moth, and Masala Cashews.",
    ingredients: "Assorted Fresh Pakistani Nimco and Spiced Roasted Nuts."
  }
];

export const INITIAL_ORDERS = [
  {
    id: "KN-98214",
    customerName: "Mohammad Farooq",
    phone: "0300-1234567",
    city: "Karachi",
    address: "House 42, Block 4, Clifton, Karachi",
    items: [
      { id: "nimco-1", name: "Mix Nimco", weight: "250 gm", price: 330, quantity: 2 },
      { id: "nimco-2", name: "Mota Gathiya", weight: "250 gm", price: 330, quantity: 1 }
    ],
    subtotal: 990,
    discount: 0,
    shippingFee: 0,
    totalAmount: 990,
    paymentMethod: "Cash on Delivery",
    status: "Packing",
    date: "2026-10-07 18:40",
    trackingId: "KN-TRK-89421",
    courier: "Khandani Express Rider",
    deliverySlot: "Standard Express (24-48 Hours)"
  }
];

export const INITIAL_FEEDBACKS = [
  {
    id: "fb-1",
    customerName: "Haji Muhammad Usman",
    name: "Haji Muhammad Usman",
    city: "Karachi (Burns Road)",
    phone: "0300-8877665",
    rating: 5,
    product: "Special Khandani Mix Nimco",
    category: "Taste & Heritage",
    comment: "Bachpan se Burns Road ki nimco khate arahe hain, lekin Khandani Nimco ka masala aur daal moth ka maza bilkul alag hai. Crunch aisa ke kholne ke baad bhi hafte tak taaza rehta hai!",
    date: "Yesterday",
    verified: true
  },
  {
    id: "fb-2",
    customerName: "Dr. Ayesha Malik",
    name: "Dr. Ayesha Malik",
    city: "Islamabad (F-7)",
    phone: "0333-5544332",
    rating: 5,
    product: "Meethi Nimco & Kaju Badam Mix",
    category: "Family & Tea-Time",
    comment: "Shaam ki chai ke saath Khandani Meethi Nimco hamare ghar me lazmi hoti hai. Packaging bohot zabardast thi, nitrogen sealed pouch me koi crunch kharab nahi hua. Highly recommended!",
    date: "3 days ago",
    verified: true
  },
  {
    id: "fb-3",
    customerName: "Taimur Tariq",
    name: "Taimur Tariq",
    city: "Lahore (Gulberg)",
    phone: "0321-9988771",
    rating: 5,
    product: "Mota Gathiya & Spicy Sev",
    category: "Events & Bulk Orders",
    comment: "Sister ki wedding ke giveaway hampers ke liyay 20kg bulk order kiya tha. Sab guests ne pucha ke nimco kahan se mangwayi hai. Timing aur quality dono lajawab!",
    date: "5 days ago",
    verified: true
  },
  {
    id: "fb-4",
    customerName: "Bilal Siddiqui",
    name: "Bilal Siddiqui",
    city: "Dubai, UAE (Overseas)",
    phone: "+971-50-1234567",
    rating: 5,
    product: "Export Assorted Pack (5kg)",
    category: "Export Quality",
    comment: "Dubai me desi nimco ka asoolan wo authentic taste nahi milta tha. Khandani Nimco ka parcel cargo ke zariye 4 din me pohancha, vacuum sealing perfect thi! Ghar ki yaad taaza hogyi.",
    date: "1 week ago",
    verified: true
  },
  {
    id: "fb-5",
    customerName: "Farzana Begum",
    name: "Farzana Begum",
    city: "Rawalpindi (Saddar)",
    phone: "0322-1122334",
    rating: 5,
    product: "Khatta Meetha Mix & Papri",
    category: "Packaging & Delivery",
    comment: "JazzCash se payment ki thi aur 48 ghante me Rawalpindi parcel deliver hogya. Oil bilkul fresh hai, koi purani tail ki smell nahi thi jo aam tor par bazaar se aati hai. 100% authentic!",
    date: "1 week ago",
    verified: true
  },
  {
    id: "fb-6",
    customerName: "Zubair Ahmed",
    name: "Zubair Ahmed",
    city: "Faisalabad (Peoples Colony)",
    phone: "0345-6677889",
    rating: 5,
    product: "Special Daal Moth & Peanut Crisp",
    category: "Taste & Crunch",
    comment: "Daal Moth ka namak aur kaali mirch ka balance kamal hai. Pori family ko pasand aya, ab to har mahine ka regular snack order set hogya hai.",
    date: "2 weeks ago",
    verified: true
  },
  {
    id: "fb-7",
    customerName: "Syeda Rabia Kazmi",
    name: "Syeda Rabia Kazmi",
    city: "Karachi (DHA Phase 6)",
    phone: "0302-3344556",
    rating: 5,
    product: "Royal Khandani Gift Box",
    category: "Luxury Gifting",
    comment: "Family gatherings par relatives ko dene ke liyay gift boxes mangwaye thay. Gold foil packaging aur customized note bohot elegant tha. Sab ne khoob tareef ki!",
    date: "2 weeks ago",
    verified: true
  },
  {
    id: "fb-8",
    customerName: "Malik Shahzad",
    name: "Malik Shahzad",
    city: "Peshawar (University Town)",
    phone: "0313-7788990",
    rating: 5,
    product: "Spicy Papri Chaat & Chevda",
    category: "Spices & Flavor",
    comment: "Peshawar me aisi karari aur teekhi nimco nahi milti. Delivery speed bhi behtareen thi aur payment Cash on Delivery se aasani se hogayi. Maza agaya!",
    date: "3 weeks ago",
    verified: true
  }
];
