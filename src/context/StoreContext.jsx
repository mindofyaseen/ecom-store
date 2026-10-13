import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_COUPONS, INITIAL_FEEDBACKS, CITIES_LIST } from '../data/nimcoData';
import { DEFAULT_SITE_CONFIG } from '../data/siteConfig';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Site Configuration state for full customizability
  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('khandani_nimco_site_config_v1');
    if (saved) {
      try {
        return { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse saved site config', e);
      }
    }
    return DEFAULT_SITE_CONFIG;
  });

  // Products state with localStorage persistence
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('khandani_nimco_pure_products_v3');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Orders state with localStorage persistence
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('khandani_nimco_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Coupons state
  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem('khandani_nimco_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  // Feedbacks state
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('khandani_nimco_feedbacks');
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACKS;
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('khandani_nimco_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('khandani_nimco_cart');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.filter(item => INITIAL_PRODUCTS.some(p => p.id === item.productId));
    } catch {
      return [];
    }
  });

  // User Authentication state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('khandani_nimco_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalMode, setAuthModalMode] = useState(null); // 'login' | 'signup' | null
  const [authPromptMessage, setAuthPromptMessage] = useState('');

  // Admin Authentication state (Session locked)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('khandani_nimco_admin_auth') === 'true';
  });
  const [adminPassword] = useState('admin123'); // Default admin password
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

  const openAdminPanel = () => {
    if (isAdminLoggedIn) {
      setViewMode('admin');
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  // Minimum Order Limit & Settings (synced with siteConfig)
  const [minOrderLimit, setMinOrderLimit] = useState(siteConfig.minOrderLimit || 200);
  const [freeShippingMin, setFreeShippingMin] = useState(siteConfig.freeShippingThreshold || 1500);
  const [whatsappNumber, setWhatsappNumber] = useState(siteConfig.whatsappNumber || '923242478108');

  // Multi-Page Routing
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'shop' | 'product-detail' | 'track-order' | 'about' | 'contact'
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || 'nimco-1');

  // Selected City & Delivery
  const [selectedCity, setSelectedCity] = useState('Karachi');

  // Filtering & Search
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('store'); // 'store' | 'admin'
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState(null);
  const [receiptModalOrder, setReceiptModalOrder] = useState(null);

  // Applied Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Find city delivery info
  const currentCityInfo = CITIES_LIST.find(c => c.name.toLowerCase() === selectedCity.toLowerCase()) || CITIES_LIST[0];
  const deliveryFee = currentCityInfo ? currentCityInfo.deliveryFee : 150;

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('khandani_nimco_site_config_v1', JSON.stringify(siteConfig));
    if (siteConfig.minOrderLimit) setMinOrderLimit(siteConfig.minOrderLimit);
    if (siteConfig.freeShippingThreshold) setFreeShippingMin(siteConfig.freeShippingThreshold);
    if (siteConfig.whatsappNumber) setWhatsappNumber(siteConfig.whatsappNumber);
  }, [siteConfig]);

  const updateSiteConfig = (updates) => {
    setSiteConfig(prev => {
      const merged = { ...prev };
      Object.keys(updates).forEach(key => {
        if (typeof updates[key] === 'object' && !Array.isArray(updates[key]) && updates[key] !== null) {
          merged[key] = { ...prev[key], ...updates[key] };
        } else {
          merged[key] = updates[key];
        }
      });
      return merged;
    });
  };

  const resetSiteConfig = () => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    localStorage.removeItem('khandani_nimco_site_config_v1');
  };

  useEffect(() => {
    localStorage.setItem('khandani_nimco_pure_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('khandani_nimco_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('khandani_nimco_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('khandani_nimco_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('khandani_nimco_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('khandani_nimco_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('khandani_nimco_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('khandani_nimco_user');
    }
  }, [currentUser]);

  // Page navigation helper
  const navigateTo = (page, param = null) => {
    setViewMode('store');
    setCurrentPage(page);
    if (param) {
      setSelectedProductId(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductPage = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    setViewMode('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth & Email OTP Verification System
  const [emailOtpState, setEmailOtpState] = useState(() => {
    try {
      const saved = localStorage.getItem('khandani_email_otp');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [otpSendHistory, setOtpSendHistory] = useState([]);

  // Send 6-Digit Verification Code with anti-spam rate limiting & 60s cooldown
  const sendEmailVerificationCode = (email) => {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const now = Date.now();
    // 1. Check Rate Limit: max 3 requests in 5 minutes
    const recentAttempts = otpSendHistory.filter((t) => now - t < 5 * 60 * 1000);
    if (recentAttempts.length >= 3) {
      return {
        success: false,
        error: 'Too many code requests. Please wait 5 minutes before trying again to prevent spam.'
      };
    }

    // 2. Check Resend Cooldown: 60 seconds
    if (emailOtpState && emailOtpState.email === cleanEmail && now - emailOtpState.sentAt < 60 * 1000) {
      const remainingSeconds = Math.ceil((60 * 1000 - (now - emailOtpState.sentAt)) / 1000);
      return {
        success: false,
        error: `Please wait ${remainingSeconds} seconds before requesting a new verification code.`
      };
    }

    // Generate secure 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const otpData = {
      email: cleanEmail,
      code,
      sentAt: now,
      expiresAt: now + 10 * 60 * 1000 // 10 minutes expiry
    };

    setEmailOtpState(otpData);
    try {
      localStorage.setItem('khandani_email_otp', JSON.stringify(otpData));
    } catch (e) {
      // ignore
    }
    setOtpSendHistory((prev) => [...prev, now]);

    return {
      success: true,
      code,
      email: cleanEmail,
      message: `Verification code sent to ${cleanEmail}. Check your primary inbox or Spam/Junk folder.`
    };
  };

  // Verify entered code and complete sign in / account registration
  const verifyEmailOtp = (email, enteredCode, customerInfo = {}) => {
    const cleanEmail = email.toLowerCase().trim();
    const cleanCode = enteredCode.toString().trim();

    if (!emailOtpState || emailOtpState.email !== cleanEmail) {
      return { success: false, error: 'No active code found for this email. Please request a new code.' };
    }

    if (Date.now() > emailOtpState.expiresAt) {
      return { success: false, error: 'This verification code has expired. Please request a new one.' };
    }

    if (emailOtpState.code !== cleanCode) {
      return { success: false, error: 'Incorrect 6-digit code. Please check and try again.' };
    }

    // Code verified successfully! Log in customer
    const user = {
      name: customerInfo.name?.trim() || cleanEmail.split('@')[0].toUpperCase(),
      email: cleanEmail,
      phone: customerInfo.phone?.trim() || '0300-1234567',
      city: customerInfo.city || selectedCity || 'Karachi',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanEmail}`
    };

    setCurrentUser(user);
    setAuthModalMode(null);
    setAuthPromptMessage('');
    setEmailOtpState(null);
    try {
      localStorage.removeItem('khandani_email_otp');
    } catch (e) {
      // ignore
    }

    return { success: true, user };
  };

  const loginUser = (email, password) => {
    const user = {
      name: email.split('@')[0].toUpperCase(),
      email: email.toLowerCase().trim(),
      phone: '0300-1234567',
      city: selectedCity,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`
    };
    setCurrentUser(user);
    setAuthModalMode(null);
    setAuthPromptMessage('');
    return true;
  };

  const registerUser = (name, email, password, phone, city = 'Karachi') => {
    const user = {
      name,
      email: email.toLowerCase().trim(),
      phone,
      city: city || selectedCity,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`
    };
    setCurrentUser(user);
    setAuthModalMode(null);
    setAuthPromptMessage('');
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  // Checkout Gate: MUST be logged in!
  const initiateCheckout = () => {
    if (cartSubtotal < minOrderLimit) {
      alert(`Khandani Nimco Minimum Order limit is Rs. ${minOrderLimit}. Please add Rs. ${minOrderLimit - cartSubtotal} more to proceed.`);
      return false;
    }

    if (!currentUser) {
      setAuthPromptMessage('Order complete karne ke liye pehle Sign In ya Register karein:');
      setAuthModalMode('login');
      return false;
    }

    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    return true;
  };

  // Admin Auth functions
  const verifyAdminPassword = (pin) => {
    if (pin === adminPassword) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('khandani_nimco_admin_auth', 'true');
      setIsAdminAuthModalOpen(false);
      setViewMode('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('khandani_nimco_admin_auth');
    setViewMode('store');
  };

  // Wishlist functions
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Cart helper functions
  const addToCart = (product, selectedWeightObj, quantity = 1) => {
    const calculatedPrice = Math.round(product.price * selectedWeightObj.priceMultiplier);
    const cartItemId = `${product.id}-${selectedWeightObj.label}`;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          weightLabel: selectedWeightObj.label,
          pricePerUnit: calculatedPrice,
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart Totals
  const cartSubtotal = cart.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate Coupon Discount
  let discountAmount = 0;
  let isFreeShippingApplied = false;

  if (appliedCoupon && cartSubtotal >= (appliedCoupon.minOrder || 0)) {
    if (appliedCoupon.isFreeShipping) {
      isFreeShippingApplied = true;
    } else if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      discountAmount = appliedCoupon.flatDiscount;
    }
  }

  const calculatedShipping =
    cartSubtotal === 0
      ? 0
      : cartSubtotal >= freeShippingMin || isFreeShippingApplied
      ? 0
      : deliveryFee;

  const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount) + calculatedShipping;

  // Coupon application logic
  const applyCouponCode = (code) => {
    setCouponError('');
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleanCode);

    if (!found) {
      setCouponError('Invalid coupon code. Try KHANDANI10 or FREESHIP');
      return false;
    }

    if (cartSubtotal < (found.minOrder || 0)) {
      setCouponError(`Requires minimum order of Rs. ${found.minOrder}`);
      return false;
    }

    setAppliedCoupon(found);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  // Customer Feedback submission
  const addCustomerFeedback = (feedbackData) => {
    const newFeedback = {
      id: `fb-${Date.now()}`,
      customerName: feedbackData.customerName || currentUser?.name || 'Valued Customer',
      phone: feedbackData.phone || currentUser?.phone || 'N/A',
      rating: Number(feedbackData.rating) || 5,
      category: feedbackData.category || 'General',
      comment: feedbackData.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
    return true;
  };

  // Product Review submission
  const addProductReview = (productId, reviewData) => {
    setProducts(prevProds =>
      prevProds.map(prod => {
        if (prod.id === productId) {
          const currentReviews = prod.reviews || [];
          const updatedReviews = [
            {
              id: `rev-${Date.now()}`,
              user: reviewData.user || currentUser?.name || 'Valued Customer',
              city: reviewData.city || 'Pakistan',
              rating: Number(reviewData.rating) || 5,
              date: 'Just now',
              comment: reviewData.comment
            },
            ...currentReviews
          ];
          const newAvgRating = +(
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          ).toFixed(1);

          return {
            ...prod,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: newAvgRating
          };
        }
        return prod;
      })
    );
  };

  // Order Placement with special Khandani Tracking ID
  const placeOrder = (customerData, orderItems, totalAmount, paymentMethod, paymentDetails = {}) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `KN-${randomNum}`;
    const specialTrackingId = `KN-TRK-${randomNum}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder = {
      id: newOrderId,
      customerName: customerData.name,
      phone: customerData.phone,
      email: currentUser?.email || customerData.email || '',
      city: customerData.city || selectedCity,
      address: customerData.address,
      notes: customerData.notes || '',
      items: orderItems,
      subtotal: cartSubtotal,
      discount: discountAmount,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      shippingFee: calculatedShipping,
      totalAmount,
      paymentMethod,
      paymentDetails,
      status: 'Pending',
      date: formattedDate,
      trackingId: specialTrackingId,
      courier: customerData.city === 'Karachi' ? 'Khandani Express Rider' : 'TCS Air Express',
      deliverySlot: customerData.deliverySlot || currentCityInfo.deliveryEstimate
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId) => {
    if (!orderId) return null;
    const cleanId = orderId.trim().toUpperCase();
    return orders.find(
      o => o.id.toUpperCase() === cleanId || o.trackingId.toUpperCase() === cleanId
    );
  };

  // Product Management for Admin
  const addProduct = (newProd) => {
    const created = {
      ...newProd,
      id: `nimco-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      stock: parseInt(newProd.stock || 50),
      price: parseFloat(newProd.price),
      reviews: [],
      weightOptions: newProd.weightOptions || [
        { label: "250 Grams", value: 0.25, priceMultiplier: 1 },
        { label: "500 Grams", value: 0.5, priceMultiplier: 1.9 },
        { label: "1 KG Pack", value: 1.0, priceMultiplier: 3.6 }
      ]
    };
    setProducts(prev => [created, ...prev]);
  };

  const editProduct = (updatedProd) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === updatedProd.id
          ? {
              ...updatedProd,
              price: parseFloat(updatedProd.price),
              stock: parseInt(updatedProd.stock)
            }
          : p
      )
    );
  };

  const deleteProduct = (prodId) => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
  };

  const toggleProductStock = (prodId) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === prodId) {
          const newStock = p.stock > 0 ? 0 : 50;
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  const addCoupon = (newCoupon) => {
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const deleteCoupon = (code) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const formatPrice = (amount) => {
    return `Rs. ${Number(amount).toLocaleString('en-PK')}`;
  };

  const generateWhatsAppLink = (message) => {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber}?text=${encoded}`;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        coupons,
        feedbacks,
        wishlist,
        toggleWishlist,
        isWishlisted,
        showWishlistOnly,
        setShowWishlistOnly,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        totalCartCount,
        deliveryFee,
        minOrderLimit,
        setMinOrderLimit,
        freeShippingMin,
        calculatedShipping,
        cartGrandTotal,
        discountAmount,
        appliedCoupon,
        couponError,
        applyCouponCode,
        removeCoupon,
        selectedCity,
        setSelectedCity,
        currentCityInfo,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        viewMode,
        setViewMode,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isFeedbackModalOpen,
        setIsFeedbackModalOpen,
        selectedProductModal,
        setSelectedProductModal,
        trackingModalOrder,
        setTrackingModalOrder,
        receiptModalOrder,
        setReceiptModalOrder,
        whatsappNumber,
        setWhatsappNumber,
        formatPrice,
        generateWhatsAppLink,
        addCustomerFeedback,
        addProductReview,
        placeOrder,
        getOrderById,
        addProduct,
        editProduct,
        deleteProduct,
        toggleProductStock,
        addCoupon,
        deleteCoupon,
        updateOrderStatus,
        // Site Configuration & Live Customization
        siteConfig,
        updateSiteConfig,
        resetSiteConfig,
        // Multi-page Routing & Auth
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        navigateTo,
        openProductPage,
        currentUser,
        authModalMode,
        setAuthModalMode,
        authPromptMessage,
        setAuthPromptMessage,
        loginUser,
        registerUser,
        sendEmailVerificationCode,
        verifyEmailOtp,
        emailOtpState,
        logoutUser,
        initiateCheckout,
        isAdminLoggedIn,
        verifyAdminPassword,
        logoutAdmin,
        isAdminAuthModalOpen,
        setIsAdminAuthModalOpen,
        openAdminPanel
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
