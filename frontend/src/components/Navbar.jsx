import React, { useState } from 'react';
import {
  Flame,
  ShieldCheck,
  ShoppingCart,
  PhoneCall,
  Search,
  SlidersHorizontal,
  Compass,
  ShoppingBag,
  Menu,
  X,
  Truck,
  User,
  LogOut,
  LayoutDashboard,
  Store
} from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenWizard,
  onOpenMyOrders,
  onOpenAuth,
  currentUser,
  onLogout,
  currentView,
  onSwitchView,
  searchQuery,
  onSearchChange,
  onScrollToCatalog,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm border-b border-slate-200">
      {/* Emergency & View Switcher Announcement Bar */}
      <div className="bg-gradient-to-r from-fire-900 via-fire-800 to-slate-900 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-fire-600 text-white animate-pulse">
              HOTLINE
            </span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-fire-400" />
              <span>24/7 Fire Refilling: <strong>+91 (020) 2456-7890 / +91 98220 54321</strong></span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            {/* View Switcher Pill (Visible to Admins or as Auth trigger) */}
            <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-700/80 text-[11px] font-bold">
              <button
                onClick={() => onSwitchView('customer')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                  currentView === 'customer'
                    ? 'bg-fire-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Store className="w-3 h-3" />
                <span>Customer Store</span>
              </button>
              
              {currentUser && currentUser.role === 'admin' ? (
                <button
                  onClick={() => onSwitchView('admin')}
                  className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                    currentView === 'admin'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-3 h-3" />
                  <span>Admin Order Tracker</span>
                </button>
              ) : (
                <button
                  onClick={() => onSwitchView('admin')}
                  className="px-2 py-1 rounded-md text-slate-400 hover:text-amber-400 transition-all flex items-center gap-1 text-[10px]"
                  title="Shop Owner Login"
                >
                  <LayoutDashboard className="w-3 h-3 text-slate-500" />
                  <span>Admin Access</span>
                </button>
              )}
            </div>

            <span className="hidden lg:flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              BIS / IS:15683 & CE Approved
            </span>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div
            onClick={() => {
              onSwitchView('customer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fire-600 to-fire-800 flex items-center justify-center text-white shadow-md shadow-fire-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-7 h-7 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-display">
                  FIRE<span className="text-fire-600">SHAW</span>
                </span>
                <span className="bg-fire-100 text-fire-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Pro Store
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Fire Safety & Protection Equipments
              </p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          {currentView === 'customer' && (
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search extinguishers, CO2, smoke alarms, hose reels..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fire-500 focus:bg-white transition-all text-slate-800"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-3 text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-3">
            {currentView === 'customer' && (
              <>
                <button
                  onClick={onScrollToCatalog}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-fire-600 hover:bg-fire-50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  All Equipments
                </button>

                <button
                  onClick={onOpenWizard}
                  className="px-3.5 py-2 text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-4 h-4 text-amber-600" />
                  Safety Wizard
                </button>
              </>
            )}

            {/* Direct Admin Tracker Shortcut */}
            <button
              onClick={() => onSwitchView(currentView === 'admin' ? 'customer' : 'admin')}
              className={`px-3.5 py-2 text-sm font-bold rounded-lg border transition-colors flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white border-slate-800'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-fire-600" />
              <span>{currentView === 'admin' ? 'Store Front' : 'Admin Portal'}</span>
            </button>
          </div>

          {/* User Auth & Cart Controls */}
          <div className="flex items-center gap-3">
            
            {/* User Account / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fire-600 to-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] font-semibold text-fire-600 capitalize">
                      {currentUser.role}
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-2 border-b border-slate-100">
                      <div className="font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-slate-500 text-[11px] truncate">{currentUser.email}</div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenMyOrders();
                      }}
                      className="w-full text-left p-2 rounded-xl text-slate-700 hover:bg-slate-100 flex items-center gap-2 font-medium"
                    >
                      <ShoppingBag className="w-4 h-4 text-slate-500" />
                      <span>My Orders</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSwitchView('admin');
                      }}
                      className="w-full text-left p-2 rounded-xl text-slate-700 hover:bg-slate-100 flex items-center gap-2 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-fire-600" />
                      <span>Admin Order Tracker</span>
                    </button>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left p-2 rounded-xl text-fire-600 hover:bg-fire-50 flex items-center gap-2 font-bold"
                      >
                        <LogOut className="w-4 h-4 text-fire-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-fire-600 bg-slate-100 hover:bg-fire-50 border border-slate-200 transition-colors flex items-center gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Register</span>
              </button>
            )}

            {/* Cart Button (Visible in Customer View) */}
            {currentView === 'customer' && (
              <button
                onClick={onOpenCart}
                className="relative p-2.5 rounded-xl bg-fire-50 text-fire-700 hover:bg-fire-100 border border-fire-200 flex items-center gap-2 font-semibold text-sm transition-all hover:shadow-sm"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5 text-fire-600" />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-fire-600 rounded-full animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-slate-200 space-y-3">
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  onSwitchView('customer');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 text-center text-xs font-bold rounded-xl ${
                  currentView === 'customer'
                    ? 'bg-fire-600 text-white'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                Customer Store
              </button>
              <button
                onClick={() => {
                  onSwitchView('admin');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 text-center text-xs font-bold rounded-xl ${
                  currentView === 'admin'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-white'
                }`}
              >
                Admin Order Tracker
              </button>

              {currentUser && (
                <button
                  onClick={() => {
                    onOpenMyOrders();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 col-span-2 text-center text-xs font-bold bg-slate-100 text-slate-800 rounded-xl"
                >
                  My Equipment Orders
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
