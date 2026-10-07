import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Search,
  Settings,
  X,
  Phone,
  DollarSign,
  Eye,
  Filter,
  Printer,
  Bike,
  Tag,
  MessageCircle,
  MessageSquarePlus,
  Sparkles,
  Percent
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    products,
    orders,
    coupons,
    feedbacks,
    minOrderLimit,
    setMinOrderLimit,
    addProduct,
    editProduct,
    deleteProduct,
    toggleProductStock,
    addCoupon,
    deleteCoupon,
    updateOrderStatus,
    whatsappNumber,
    setWhatsappNumber,
    freeShippingMin,
    formatPrice,
    setViewMode,
    setReceiptModalOrder,
    setTrackingModalOrder,
    generateWhatsAppLink
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'coupons' | 'analytics' | 'feedbacks'
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  
  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Mix Nimco',
    price: '340',
    stock: 50,
    badge: 'Special',
    spiceLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    description: '',
    ingredients: ''
  });

  // Coupon Modal State
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountType: 'percentage', // 'percentage' | 'flat' | 'freeShipping'
    discountValue: 10,
    minOrder: 500,
    description: ''
  });

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalOrdersCount = orders.length;
  const outOfStockCount = products.filter(p => p.stock <= 0).length;
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;
    const matchesSearch =
      orderSearch === '' ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch) ||
      o.city.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filtered products
  const filteredProducts = products.filter((p) =>
    productSearch === '' ||
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Mix Nimco',
      price: '340',
      stock: 50,
      badge: 'Fresh Batch',
      spiceLevel: 'Medium',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      description: 'Authentic crunchy fresh snack prepared daily.',
      ingredients: 'Gram Flour, Spices, Salt, Edible Oil.'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price.toString(),
      stock: prod.stock,
      badge: prod.badge || '',
      spiceLevel: prod.spiceLevel || 'Medium',
      image: prod.image,
      description: prod.description || '',
      ingredients: prod.ingredients || ''
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (editingProduct) {
      editProduct({
        ...editingProduct,
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock)
      });
    } else {
      addProduct(productForm);
    }
    setIsProductModalOpen(false);
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!couponForm.code.trim()) return;

    const newCoupon = {
      code: couponForm.code.trim().toUpperCase(),
      minOrder: Number(couponForm.minOrder) || 0,
      description: couponForm.description || `Special discount code ${couponForm.code.toUpperCase()}`
    };

    if (couponForm.discountType === 'percentage') {
      newCoupon.discountPercent = Number(couponForm.discountValue) || 10;
    } else if (couponForm.discountType === 'flat') {
      newCoupon.flatDiscount = Number(couponForm.discountValue) || 100;
    } else {
      newCoupon.isFreeShipping = true;
    }

    addCoupon(newCoupon);
    setIsCouponModalOpen(false);
    setCouponForm({ code: '', discountType: 'percentage', discountValue: 10, minOrder: 500, description: '' });
  };

  const handleWhatsAppCustomer = (order) => {
    const text = `Assalam-o-Alaikum ${order.customerName}! This is Khandani Nimco Store regarding your order *${order.id}* (Tracking: ${order.trackingNumber || order.id}).\n\nCurrent Status: *${order.status}*\nCourier: ${order.courier || 'Express'}\nTracking ID: ${order.trackingNumber || order.trackingId || 'N/A'}\nTotal Amount: ${formatPrice(order.totalAmount)}\n\nThank you for choosing Khandani Nimco!`;
    window.open(`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Admin Top Navigation */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-emerald-950 flex items-center justify-center font-black text-lg font-serif">
              KN
            </div>
            <div>
              <h1 className="text-base font-black text-white flex items-center gap-2 font-serif">
                Khandani Nimco Command Center
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold uppercase font-sans">
                  KN Control Center
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Manage orders, stock, promo vouchers, customer feedbacks & min order limit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('store')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-colors"
            >
              <span>View Storefront</span>
              <span>➔</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 border-t border-slate-800/80 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Pipeline ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'products'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products & Stock ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'coupons'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Coupons & Promo Codes ({coupons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Revenue Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('feedbacks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'feedbacks'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Customer Feedbacks ({feedbacks?.length || 0})</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        
        {/* KPI Metrics Strip & Quick Settings */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Revenue
            </span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
              {formatPrice(totalRevenue)}
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">
              Live Sales Calculated
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Orders
            </span>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              {totalOrdersCount}
            </div>
            <span className="text-[10px] text-amber-400 font-semibold">
              Karachi & Nationwide
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Average Order Value
            </span>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 font-mono">
              {formatPrice(averageOrderValue)}
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">
              Per Customer Cart
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Customer Feedbacks
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">
              {feedbacks?.length || 0} reviews
            </div>
            <span className="text-[10px] text-amber-300 font-semibold">
              ★ 4.9 Average Rating
            </span>
          </div>

          {/* Min Order Limit Setting Control */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1 col-span-2 md:col-span-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Min Order Limit
            </span>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="text-xs text-amber-400 font-bold">Rs.</span>
              <input
                type="number"
                min="0"
                step="50"
                value={minOrderLimit}
                onChange={(e) => setMinOrderLimit(Number(e.target.value) || 0)}
                className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">
              Cart limit enforced
            </span>
          </div>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search Order ID, Customer, Phone, City..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              {/* Status Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {['All', 'Pending', 'Packing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      orderStatusFilter === st
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-3 uppercase text-[10px] font-bold">Order ID & Date</th>
                    <th className="py-3 px-3 uppercase text-[10px] font-bold">Customer Details</th>
                    <th className="py-3 px-3 uppercase text-[10px] font-bold">Ordered Nimco Items</th>
                    <th className="py-3 px-3 uppercase text-[10px] font-bold">Total Amount</th>
                    <th className="py-3 px-3 uppercase text-[10px] font-bold">Status Pipeline</th>
                    <th className="py-3 px-3 uppercase text-[10px] font-bold text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500">
                        No orders matching the criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                        
                        <td className="py-3 px-3">
                          <span className="font-mono font-bold text-amber-400 block">{order.id}</span>
                          <span className="text-[10px] text-slate-400">{order.date}</span>
                          <span className="text-[10px] text-slate-500 block">
                            Courier: {order.courier || 'Express'}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <strong className="text-white block">{order.customerName}</strong>
                          <span className="text-slate-300 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-emerald-400" />
                            {order.phone}
                          </span>
                          <span className="text-[10px] text-slate-400 block line-clamp-1">
                            {order.city} ({order.address})
                          </span>
                        </td>

                        <td className="py-3 px-3 max-w-xs">
                          <div className="space-y-0.5">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="text-[11px] text-slate-200">
                                • {it.name} <span className="text-amber-400">({it.weight})</span> x{it.quantity}
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-black text-amber-400 text-sm block">
                            {formatPrice(order.totalAmount)}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {order.paymentMethod}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`p-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                                : order.status === 'Shipped' || order.status === 'Out for Delivery'
                                ? 'bg-blue-950 text-blue-300 border-blue-600'
                                : order.status === 'Cancelled'
                                ? 'bg-rose-950 text-rose-300 border-rose-600'
                                : 'bg-amber-950 text-amber-300 border-amber-600'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Packing">Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Print Invoice Slip */}
                            <button
                              onClick={() => setReceiptModalOrder(order)}
                              title="Print Packing Slip"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-white transition-colors"
                            >
                              <Printer className="w-4 h-4" />
                            </button>

                            {/* Live Track */}
                            <button
                              onClick={() => setTrackingModalOrder(order)}
                              title="View Live Tracker"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-white transition-colors"
                            >
                              <Bike className="w-4 h-4" />
                            </button>

                            {/* WhatsApp Customer */}
                            <button
                              onClick={() => handleWhatsAppCustomer(order)}
                              title="WhatsApp Customer Update"
                              className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 hover:text-white transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCTS & STOCK MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search Nimco by title or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Nimco Snack</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex gap-3 relative group"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-800 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-amber-400 font-bold uppercase">{p.category}</span>
                      <button
                        onClick={() => toggleProductStock(p.id)}
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          p.stock > 0
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/40'
                            : 'bg-rose-950 text-rose-400 border border-rose-600/40'
                        }`}
                      >
                        {p.stock > 0 ? `Stock: ${p.stock}` : 'Out of Stock'}
                      </button>
                    </div>

                    <h4 className="font-bold text-white text-xs truncate mt-0.5">{p.name}</h4>
                    <p className="text-[11px] text-amber-400 font-black mt-1">
                      {formatPrice(p.price)} (250g)
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => handleOpenEditProduct(p)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3 text-amber-400" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="px-2 py-1 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded-lg text-[11px]"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: COUPONS & PROMO CODES */}
        {activeTab === 'coupons' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white">Foodpanda Promo Vouchers</h3>
                <p className="text-xs text-slate-400">Offer percentage or flat rupee discounts to drive customer conversions</p>
              </div>

              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-black text-amber-400 tracking-wider">
                      {c.code}
                    </span>
                    <button
                      onClick={() => deleteCoupon(c.code)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-white font-bold">
                    {c.discountPercent ? `${c.discountPercent}% Off Total` : c.isFreeShipping ? 'Free Delivery' : `Flat Rs. ${c.flatDiscount} Off`}
                  </p>
                  <p className="text-[11px] text-slate-400">{c.description}</p>
                  
                  <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
                    Min. Order: <strong className="text-slate-300">Rs. {c.minOrder || 0}</strong>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: REVENUE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-black text-white font-serif">Sales & Customer Insights</h3>
              <p className="text-xs text-slate-400">Performance report of Khandani Nimco store operations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category Breakdown */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider">
                  Product Catalog Distribution
                </h4>
                {['Mix Nimco', 'Gathiya & Bhujia', 'Sew (Sev)', 'Dal Snacks', 'Chewra & Papri', 'Salted Nuts', 'Nimco Hampers'].map((cat) => {
                  const count = products.filter(p => p.category === cat).length;
                  const pct = Math.round((count / products.length) * 100);
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">{cat}</span>
                        <span className="text-amber-400 font-bold">{count} items ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-amber-500 h-1.5 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Status Breakdown */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider">
                  Order Status Pipeline
                </h4>
                {['Pending', 'Packing', 'Shipped', 'Delivered'].map((st) => {
                  const count = orders.filter(o => o.status === st).length;
                  const pct = totalOrdersCount > 0 ? Math.round((count / totalOrdersCount) * 100) : 0;
                  return (
                    <div key={st} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">{st}</span>
                        <span className="text-emerald-400 font-bold">{count} orders ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMER FEEDBACKS & REVIEWS */}
        {activeTab === 'feedbacks' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-base font-black text-white font-serif flex items-center gap-2">
                  Customer Feedbacks & Suggestions
                  <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
                    {feedbacks?.length || 0} Reviews
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Feedback submitted directly by verified customers across Pakistan</p>
              </div>

              <div className="flex items-center gap-2 text-xs bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-amber-400 font-bold">
                <span>★ 4.9 Rating Overall</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {feedbacks && feedbacks.map((fb) => (
                <div key={fb.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 flex flex-col justify-between shadow-sm hover:border-slate-700 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{fb.name}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">{fb.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < fb.rating ? 'text-amber-400' : 'text-slate-700'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{fb.comment}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded-md font-medium text-[10px]">
                      {fb.category}
                    </span>
                    <span className="text-slate-500">{fb.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 my-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingProduct ? 'Edit Nimco Snack' : 'Add New Snack Item'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">Product Title *</label>
                <input
                  required
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Special Burns Road Mix Nimco"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="Mix Nimco">Mix Nimco</option>
                    <option value="Gathiya & Bhujia">Gathiya & Bhujia</option>
                    <option value="Sew (Sev)">Sew (Sev)</option>
                    <option value="Dal Snacks">Dal Snacks</option>
                    <option value="Chewra & Papri">Chewra & Papri</option>
                    <option value="Salted Nuts">Salted Nuts</option>
                    <option value="Nimco Hampers">Nimco Hampers</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Base Price (250g in PKR) *</label>
                  <input
                    required
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Badge</label>
                  <input
                    type="text"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    placeholder="Best Seller"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Spice Level</label>
                  <select
                    value={productForm.spiceLevel}
                    onChange={(e) => setProductForm({ ...productForm, spiceLevel: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="Mild">Mild</option>
                    <option value="Medium">Medium</option>
                    <option value="Hot & Spicy">Hot & Spicy</option>
                    <option value="Extra Spicy">Extra Spicy</option>
                    <option value="Sweet">Sweet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Image URL</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 text-slate-950 font-black rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE COUPON */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">Create Promo Code</h3>
              <button
                onClick={() => setIsCouponModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">Coupon Code *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. EID20"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Discount Type</label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat PKR (Rs.)</option>
                    <option value="freeShipping">Free Delivery</option>
                  </select>
                </div>

                {couponForm.discountType !== 'freeShipping' && (
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">
                      {couponForm.discountType === 'percentage' ? 'Percent Value (%)' : 'Amount (Rs.)'}
                    </label>
                    <input
                      type="number"
                      value={couponForm.discountValue}
                      onChange={(e) => setCouponForm({ ...couponForm, discountValue: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Minimum Order (Rs.)</label>
                <input
                  type="number"
                  value={couponForm.minOrder}
                  onChange={(e) => setCouponForm({ ...couponForm, minOrder: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. 20% discount on orders over Rs. 1,000"
                  value={couponForm.description}
                  onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 text-slate-950 font-black rounded-xl"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
