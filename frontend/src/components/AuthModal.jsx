import React, { useState } from 'react';
import {
  X,
  Flame,
  ShieldCheck,
  User,
  Lock,
  Mail,
  Phone,
  Building,
  ArrowRight,
  AlertCircle,
  KeyRound,
  Shield
} from 'lucide-react';
import { loginUser, registerUser } from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [isAdminLoginMode, setIsAdminLoginMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    companyName: '',
    gstNumber: '',
  });

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      setLoading(true);
      const data = await loginUser(loginForm.email, loginForm.password);
      setLoading(false);
      onAuthSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Login failed');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      setLoading(true);
      const data = await registerUser(registerForm);
      setLoading(false);
      onAuthSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Registration failed');
    }
  };

  const fillDemo = (role) => {
    setErrorMsg('');
    setActiveTab('login');
    if (role === 'admin') {
      setIsAdminLoginMode(true);
      setLoginForm({
        email: 'admin@fireshaw.com',
        password: 'admin123',
      });
    } else {
      setIsAdminLoginMode(false);
      setLoginForm({
        email: 'customer@fireshaw.com',
        password: 'customer123',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-fire-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-fire-600 flex items-center justify-center text-white shadow-sm">
              <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>
            <span className="text-xl font-black font-display tracking-tight">
              FIRE<span className="text-fire-500">SHAW</span>
            </span>
          </div>

          <h3 className="text-lg font-bold text-white">
            {isAdminLoginMode
              ? 'Shop Owner / Admin Portal Access'
              : activeTab === 'login'
              ? 'Sign in to your customer account'
              : 'Create customer account'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {isAdminLoginMode
              ? 'Enter administrator credentials to access store analytics and order fulfillment.'
              : 'Sign in to place orders, track safety gear delivery, and manage tax invoices.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-white">
          <button
            onClick={() => {
              setActiveTab('login');
              setIsAdminLoginMode(false);
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
              activeTab === 'login' && !isAdminLoginMode
                ? 'border-fire-600 text-fire-600 bg-fire-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Customer Login
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setIsAdminLoginMode(false);
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
              activeTab === 'register'
                ? 'border-fire-600 text-fire-600 bg-fire-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Register Account
          </button>
          <button
            onClick={() => {
              setActiveTab('login');
              setIsAdminLoginMode(true);
              setErrorMsg('');
            }}
            className={`px-3 py-3 text-xs font-bold text-center border-b-2 transition-all ${
              isAdminLoginMode
                ? 'border-amber-500 text-amber-600 bg-amber-50/50'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
            title="Administrator Login"
          >
            Admin Login
          </button>
        </div>

        {/* Quick Demo Autofill Options (Optional Helper for Testing) */}
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Quick Demo Fill:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fillDemo('customer')}
              className="text-slate-700 hover:text-fire-600 font-semibold underline"
            >
              Customer Fill
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className="text-amber-700 hover:text-amber-800 font-bold underline"
            >
              Admin Fill
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-fire-50 border border-fire-200 rounded-xl flex items-center gap-2 text-xs text-fire-700 font-medium">
            <AlertCircle className="w-4 h-4 text-fire-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Forms */}
        <div className="p-6">
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isAdminLoginMode ? 'Admin Email Address' : 'Customer Email Address'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={isAdminLoginMode ? 'admin@fireshaw.com' : 'customer@fireshaw.com'}
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-fire-500 focus:bg-white focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-fire-500 focus:bg-white focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 ${
                  isAdminLoginMode
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30'
                    : 'bg-fire-600 hover:bg-fire-700 shadow-fire-600/30'
                }`}
              >
                {loading ? 'Authenticating...' : isAdminLoginMode ? 'Sign In as Admin' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Ramesh Patel"
                    value={registerForm.name}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-fire-500 focus:bg-white focus:outline-none"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@mail.com"
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-fire-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={registerForm.phone}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-fire-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Create Password (min 6 chars) *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-fire-500 focus:bg-white focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-[11px] font-medium text-slate-600 block mb-0.5">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Industries"
                    value={registerForm.companyName}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({ ...prev, companyName: e.target.value }))
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-600 block mb-0.5">
                    GSTIN (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="27ABCDE1234F1Z5"
                    value={registerForm.gstNumber}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({ ...prev, gstNumber: e.target.value }))
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-fire-600 hover:bg-fire-700 shadow-md shadow-fire-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 mt-4"
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
