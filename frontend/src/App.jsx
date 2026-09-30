import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FireClassGuide from './components/FireClassGuide';
import SafetyWizard from './components/SafetyWizard';
import ProductCatalog from './components/ProductCatalog';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import AdminPortal from './components/AdminPortal';
import AuthModal from './components/AuthModal';
import MyOrdersModal from './components/MyOrdersModal';
import Footer from './components/Footer';
import StoreLocationMap from './components/StoreLocationMap';
import { fetchProducts, placeOrder } from './services/api';
import { CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function App() {
  // ─── Auth State ──────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fireshaw_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('fireshaw_token') || null;
  });

  // ─── View Mode ───────────────────────────────────────────────
  // 'customer' = e-commerce storefront, 'admin' = order tracker dashboard
  const [currentView, setCurrentView] = useState('customer');

  // ─── Products & Filtering State ──────────────────────────────
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedFireClass, setSelectedFireClass] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // ─── Cart State (localStorage persisted) ─────────────────────
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('fireshaw_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ─── Modal Controls ──────────────────────────────────────────
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMyOrdersOpen, setIsMyOrdersOpen] = useState(false);

  // ─── Toast Notification ──────────────────────────────────────
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Persist auth & cart to localStorage ─────────────────────
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('fireshaw_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('fireshaw_user');
      }
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('fireshaw_token', authToken);
    } else {
      localStorage.removeItem('fireshaw_token');
    }
  }, [authToken]);

  useEffect(() => {
    try {
      localStorage.setItem('fireshaw_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // ─── Auth Handlers ───────────────────────────────────────────
  const handleAuthSuccess = (user, token) => {
    setCurrentUser(user);
    setAuthToken(token);
    showToast(`Welcome, ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    setCurrentView('customer');
    showToast('Signed out successfully', 'info');
  };

  // ─── View Switch Handler ─────────────────────────────────────
  const handleSwitchView = (view) => {
    if (view === 'admin' && !currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentView(view);
  };

  // ─── Load Products from API ──────────────────────────────────
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts({
        category: selectedCategory,
        industry: selectedIndustry,
        fireClass: selectedFireClass,
        sort: sortBy,
        search: searchQuery,
      });
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products from server:', err);
      setError('Unable to reach Fireshaw API server. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedIndustry, selectedFireClass, sortBy, searchQuery]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ─── Cart Operations ─────────────────────────────────────────
  const handleAddToCart = (product) => {
    const qtyToAdd = product.orderQty || 1;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (it) => (it._id && it._id === product._id) || it.sku === product.sku
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + qtyToAdd;
        return updated;
      }
      return [...prev, { ...product, quantity: qtyToAdd }];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const handleAddBatchToCart = (batchItems) => {
    setCart((prev) => {
      let currentCart = [...prev];
      batchItems.forEach((newItem) => {
        const idx = currentCart.findIndex(
          (it) => (it._id && it._id === newItem._id) || it.sku === newItem.sku
        );
        const qtyToAdd = newItem.orderQty || newItem.quantity || 1;
        if (idx > -1) {
          currentCart[idx].quantity = (currentCart[idx].quantity || 1) + qtyToAdd;
        } else {
          currentCart.push({ ...newItem, quantity: qtyToAdd });
        }
      });
      return currentCart;
    });
    showToast(`Added ${batchItems.length} safety items to your cart!`);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (idOrSku, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item._id === idOrSku || item.sku === idOrSku
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (idOrSku) => {
    setCart((prev) => prev.filter((it) => it._id !== idOrSku && it.sku !== idOrSku));
    showToast('Item removed from cart', 'info');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'info');
  };

  // ─── Order Placement ─────────────────────────────────────────
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order) => {
    setLastCompletedOrder(order);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsSuccessModalOpen(true);
  };

  // ─── Filter Reset ────────────────────────────────────────────
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedIndustry('All');
    setSelectedFireClass('All');
    setSortBy('featured');
    setSearchQuery('');
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((acc, it) => acc + (it.quantity || 1), 0);

  // ─── View Invoice from Admin or My Orders ────────────────────
  const handleViewOrderInvoice = (order) => {
    setLastCompletedOrder(order);
    setIsSuccessModalOpen(true);
  };

  // ═══════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">

      {/* ─── Toast Notification ─────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] animate-in slide-in-from-bottom duration-200">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-fire-400 flex-shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* ─── Navbar (always visible, controls view switch) ──── */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWizard={() => setIsWizardOpen(true)}
        onOpenMyOrders={() => {
          if (!currentUser) {
            setIsAuthModalOpen(true);
            return;
          }
          setIsMyOrdersOpen(true);
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        currentView={currentView}
        onSwitchView={handleSwitchView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SIDE A: CUSTOMER STOREFRONT                           */}
      {/* ═══════════════════════════════════════════════════════ */}
      {currentView === 'customer' && (
        <>
          <Hero
            onExploreCatalog={scrollToCatalog}
            onOpenWizard={() => setIsWizardOpen(true)}
          />

          <FireClassGuide
            activeFireClass={selectedFireClass}
            onSelectFireClass={(fClass) => {
              setSelectedFireClass(fClass);
              scrollToCatalog();
            }}
          />

          {error && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span>{error}</span>
                </div>
                <button
                  onClick={loadProducts}
                  className="px-3 py-1 bg-amber-200 hover:bg-amber-300 rounded-lg font-bold"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          <ProductCatalog
            products={products}
            loading={loading}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedIndustry={selectedIndustry}
            onSelectIndustry={setSelectedIndustry}
            selectedFireClass={selectedFireClass}
            onSelectFireClass={setSelectedFireClass}
            sortBy={sortBy}
            onSelectSort={setSortBy}
            searchQuery={searchQuery}
            onResetFilters={handleResetFilters}
            onAddToCart={handleAddToCart}
            onViewDetails={(prod) => setSelectedProductForModal(prod)}
          />

          <StoreLocationMap />

          <Footer
            onScrollToCatalog={scrollToCatalog}
            onOpenWizard={() => setIsWizardOpen(true)}
          />
        </>
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SIDE B: ADMIN ORDER TRACKER PORTAL                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      {currentView === 'admin' && (
        <AdminPortal
          adminUser={currentUser}
          onSwitchToCustomerView={() => setCurrentView('customer')}
          onLogout={handleLogout}
          onViewOrderInvoice={handleViewOrderInvoice}
        />
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  MODALS & OVERLAYS (shared across both views)          */}
      {/* ═══════════════════════════════════════════════════════ */}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <MyOrdersModal
        isOpen={isMyOrdersOpen}
        onClose={() => setIsMyOrdersOpen(false)}
        currentUser={currentUser}
        onViewInvoice={handleViewOrderInvoice}
      />

      <ProductModal
        product={selectedProductForModal}
        isOpen={Boolean(selectedProductForModal)}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currentUser={currentUser}
        onOrderSuccess={handleOrderSuccess}
        apiPlaceOrder={placeOrder}
      />

      <OrderSuccessModal
        order={lastCompletedOrder}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />

      <SafetyWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onAddBatchToCart={handleAddBatchToCart}
        allProducts={products}
      />

    </div>
  );
}
