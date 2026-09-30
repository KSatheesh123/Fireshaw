import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Search,
  RefreshCw,
  Package,
  Calendar,
  Phone,
  Truck,
  CheckCircle,
  Building,
  Flame,
  ArrowLeft,
  DollarSign,
  AlertCircle,
  Clock,
  Printer,
  ChevronDown,
  Layers,
  Wrench,
  Filter
} from 'lucide-react';
import { fetchAllOrders, fetchOrderStats, updateOrderStatusApi } from '../services/api';

const statusOptions = [
  'Order Placed',
  'Processing',
  'Dispatched',
  'Delivered',
  'Cancelled',
];

export default function AdminPortal({
  onSwitchToCustomerView,
  adminUser,
  onLogout,
  onViewOrderInvoice,
}) {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStatusFilter, setActiveStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [adminTab, setAdminTab] = useState('orders'); // 'orders' | 'inventory'

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, statsData] = await Promise.all([
        fetchAllOrders({ status: activeStatusFilter, search: searchQuery }),
        fetchOrderStats(),
      ]);
      setOrders(ordersData);
      setStats(statsData);
    } catch (err) {
      console.error('Error loading admin portal data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeStatusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      const updated = await updateOrderStatusApi(orderId, { orderStatus: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
      // Reload stats
      const newStats = await fetchOrderStats();
      setStats(newStats);
    } catch (err) {
      alert('Failed to update order status: ' + err.message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handlePaymentStatusToggle = async (orderId, currentStatus) => {
    const nextStatus = currentStatus === 'Paid' ? 'Pending' : 'Paid';
    try {
      setUpdatingOrderId(orderId);
      await updateOrderStatusApi(orderId, { paymentStatus: nextStatus });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, paymentStatus: nextStatus } : o))
      );
    } catch (err) {
      alert('Failed to update payment status: ' + err.message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fire-600 flex items-center justify-center text-white shadow-md shadow-fire-600/30">
              <Flame className="w-6 h-6 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-white font-display tracking-tight">
                  FIRE<span className="text-fire-500">SHAW</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-fire-500/20 text-fire-400 border border-fire-500/30">
                  Shop Owner Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Order Tracking & Fulfillment Control Dashboard
              </p>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSwitchToCustomerView}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-fire-400" />
              <span>Back to Customer Store</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs text-slate-400">
              <span>Logged in as: <strong>{adminUser?.name || 'Admin'}</strong></span>
              <button
                onClick={onLogout}
                className="text-fire-400 hover:underline text-xs font-semibold ml-1"
              >
                Logout
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Analytics KPI Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gross Sales</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1">
                ₹{stats.totalRevenue?.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-emerald-400 mt-1">Total revenue collected</div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Orders</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1">
                {stats.totalOrders}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">All-time received</div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Order Placed</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
                {stats.pendingOrders}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Awaiting dispatch</div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">Processing</div>
              <div className="text-xl sm:text-2xl font-black text-sky-400 mt-1">
                {stats.processingOrders}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Packaging in progress</div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Dispatched</div>
              <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">
                {stats.dispatchedOrders}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">With courier partner</div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Delivered</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                {stats.deliveredOrders}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Fulfillment completed</div>
            </div>
          </div>
        )}

        {/* Section Heading & Filter Bar */}
        <div className="bg-slate-800/60 p-6 rounded-3xl border border-slate-700 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black font-display text-white flex items-center gap-2">
                <ClipboardList className="w-6 h-6 text-fire-500" />
                Received Orders Tracker
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage, update shipping stages, and inspect customer delivery requisitions.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={loadData}
                className="p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-bold"
                title="Refresh order database"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Sync DB</span>
              </button>
            </div>
          </div>

          {/* Search & Filter pills */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2 border-t border-slate-700/60">
            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
              {['All', 'Order Placed', 'Processing', 'Dispatched', 'Delivered'].map((st) => (
                <button
                  key={st}
                  onClick={() => setActiveStatusFilter(st)}
                  className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    activeStatusFilter === st
                      ? 'bg-fire-600 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by Order ID, customer, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-fire-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </form>
          </div>

          {/* Orders List / Cards */}
          <div className="space-y-4 pt-2">
            {loading ? (
              <div className="text-center py-16 text-slate-500 text-xs">
                Refreshing orders from database...
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-xs">
                No orders match the selected criteria.
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord._id}
                  className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
                >
                  {/* Top Bar: ID, Date, Amount, Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-white text-base">
                        {ord.orderNumber}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(ord.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Bill</span>
                        <span className="text-base font-black text-fire-400">
                          ₹{ord.totalAmount?.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Payment pill */}
                      <button
                        onClick={() => handlePaymentStatusToggle(ord._id, ord.paymentStatus)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                          ord.paymentStatus === 'Paid'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                            : 'bg-amber-950/60 text-amber-300 border-amber-800'
                        }`}
                        title="Click to toggle Payment Status"
                      >
                        {ord.paymentStatus} ({ord.paymentMethod?.toUpperCase()})
                      </button>

                      {/* Status Selector Dropdown */}
                      <div className="relative">
                        <select
                          value={ord.orderStatus}
                          disabled={updatingOrderId === ord._id}
                          onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 border appearance-none pr-8 cursor-pointer focus:outline-none ${
                            ord.orderStatus === 'Delivered'
                              ? 'text-emerald-400 border-emerald-700'
                              : ord.orderStatus === 'Dispatched'
                              ? 'text-indigo-400 border-indigo-700'
                              : ord.orderStatus === 'Processing'
                              ? 'text-sky-400 border-sky-700'
                              : 'text-amber-400 border-amber-700'
                          }`}
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-slate-900 text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Middle: Customer & Ordered Items */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs">
                    {/* Customer info */}
                    <div className="lg:col-span-5 space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Customer & Delivery Info
                      </span>
                      <div className="font-bold text-white text-sm">{ord.customer?.name}</div>
                      <div className="text-slate-300 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-fire-500" />
                        <span>{ord.customer?.phone}</span>
                        {ord.customer?.email && <span>• {ord.customer.email}</span>}
                      </div>
                      <div className="text-slate-400">
                        {ord.customer?.address}, {ord.customer?.city} ({ord.customer?.pincode})
                      </div>
                      {ord.customer?.companyName && (
                        <div className="text-amber-300 font-medium flex items-center gap-1 pt-1">
                          <Building className="w-3.5 h-3.5" />
                          <span>{ord.customer.companyName}</span>
                          {ord.customer?.gstNumber && <span className="text-slate-400">(GST: {ord.customer.gstNumber})</span>}
                        </div>
                      )}
                      {ord.installationRequested && (
                        <div className="mt-2 p-2 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 flex items-center gap-1.5 text-[11px] font-bold">
                          <Wrench className="w-3.5 h-3.5 text-amber-400" />
                          <span>Customer Requested On-Site Wall Mounting & Demo</span>
                        </div>
                      )}
                    </div>

                    {/* Ordered Items list */}
                    <div className="lg:col-span-7 space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Equipment Items in Order ({ord.items?.length})
                      </span>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {ord.items?.map((it, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-xl bg-slate-900/40 border border-slate-800 text-xs"
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              {it.image && (
                                <img
                                  src={it.image}
                                  alt={it.name}
                                  className="w-9 h-9 rounded-lg object-cover bg-slate-800 flex-shrink-0"
                                />
                              )}
                              <div className="truncate">
                                <div className="font-semibold text-slate-200 truncate">{it.name}</div>
                                <div className="text-[10px] text-slate-400">SKU: {it.sku}</div>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0 pl-2">
                              <span className="text-slate-400">Qty: <strong>{it.quantity}</strong></span>
                              <div className="font-bold text-slate-200">
                                ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Print Invoice Trigger */}
                      <div className="text-right pt-1">
                        <button
                          onClick={() => onViewOrderInvoice(ord)}
                          className="text-xs text-fire-400 hover:text-fire-300 hover:underline inline-flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>View / Print Official Tax Invoice</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
