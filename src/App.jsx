import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { TrackOrderPage } from './components/TrackOrderPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AdminDashboard } from './components/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { OrderReceiptModal } from './components/OrderReceiptModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { FeedbackModal } from './components/FeedbackModal';
import { FloatingCartBar } from './components/FloatingCartBar';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

const MainRouter = () => {
  const { viewMode, currentPage } = useStore();

  if (viewMode === 'admin') {
    return (
      <>
        <AdminDashboard />
        <OrderTrackerModal />
        <OrderReceiptModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col font-sans selection:bg-amber-400 selection:text-emerald-950">
      
      {/* Navigation Header */}
      <Navbar />

      {/* Dynamic Page Views */}
      <div className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'track-order' && <TrackOrderPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Floating Elements */}
      <FloatingCartBar />
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <OrderReceiptModal />
      <AuthModal />
      <FeedbackModal />
      <WhatsAppButton />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
