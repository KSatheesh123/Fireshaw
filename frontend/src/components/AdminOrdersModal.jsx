import React, { useState, useEffect } from 'react';
import {
  X,
  ClipboardList,
  Search,
  RefreshCw,
  Package,
  Calendar,
  Phone,
  CheckCircle,
  Truck,
  Building
} from 'lucide-react';
import { fetchAllOrders } from '../services/api';

export default function AdminOrdersModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchAllOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadOrders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    const term = searchTerm.toLowerCase();
    return (
      o.orderNumber?.toLowerCase().includes(term) ||
      o.customer?.name?.toLowerCase().includes(term) ||
      o.customer?.phone?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fire-600/30 border border-fire-500/40 flex items-center justify-center text-fire-400">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">Fireshaw Orders Database</h2>
              <p className="text-xs text-slate-400">Live MongoDB Order Records ({orders.length} total orders)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadOrders}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh order database"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by Order ID (FSH-...), Customer Name, or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-fire-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Orders List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              Loading orders from database...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No orders found matching your search.
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord._id}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-slate-300 transition-colors space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 text-sm">{ord.orderNumber}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {ord.orderStatus}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {ord.paymentStatus} ({ord.paymentMethod?.toUpperCase()})
                    </span>
                  </div>

                  <div className="text-right font-black text-fire-600 text-sm">
                    ₹{ord.totalAmount?.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Customer</span>
                    <strong className="text-slate-800">{ord.customer?.name}</strong>
                    <div className="text-slate-600">{ord.customer?.phone} • {ord.customer?.city}</div>
                    {ord.customer?.companyName && (
                      <div className="text-slate-500 text-[11px] font-medium flex items-center gap-1 mt-0.5">
                        <Building className="w-3 h-3 text-slate-400" />
                        {ord.customer.companyName}
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block">Items Ordered ({ord.items?.length})</span>
                    <div className="text-slate-700 line-clamp-2">
                      {ord.items?.map((it, idx) => (
                        <span key={idx}>
                          {it.name} (x{it.quantity}){idx < ord.items.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                    {ord.installationRequested && (
                      <div className="text-amber-800 font-semibold text-[10px] mt-1">
                        ✓ On-site mounting service requested
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between">
                  <span>Placed on: {new Date(ord.createdAt).toLocaleString()}</span>
                  <span>ID: {ord._id}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
