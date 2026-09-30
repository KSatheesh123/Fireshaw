import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  Calendar,
  Truck,
  CheckCircle,
  Clock,
  Printer,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { fetchUserOrders } from '../services/api';

const stages = ['Order Placed', 'Processing', 'Dispatched', 'Delivered'];

export default function MyOrdersModal({ isOpen, onClose, currentUser, onViewInvoice }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && currentUser?._id) {
      loadMyOrders();
    }
  }, [isOpen, currentUser]);

  const loadMyOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchUserOrders(currentUser._id);
      setOrders(data);
    } catch (err) {
      console.error('Failed to load user orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fire-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">My Equipment Orders</h2>
              <p className="text-xs text-slate-400">Order tracking for {currentUser?.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5">
          {loading ? (
            <div className="text-center py-16 text-slate-500 text-xs">
              Loading your orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">No orders placed yet</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Any fire protection equipment you purchase while logged in will appear here.
              </p>
            </div>
          ) : (
            orders.map((ord) => {
              const currentStageIdx = stages.indexOf(ord.orderStatus);

              return (
                <div
                  key={ord._id}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 shadow-sm"
                >
                  {/* Top: Order ID & Total */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <div className="font-mono font-bold text-slate-900 text-sm">
                        {ord.orderNumber}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Placed on {new Date(ord.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-black text-fire-600">
                        ₹{ord.totalAmount?.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {ord.paymentStatus} ({ord.paymentMethod?.toUpperCase()})
                      </span>
                    </div>
                  </div>

                  {/* Tracking Progress Bar */}
                  <div className="py-2">
                    <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                      Fulfillment Status: <span className="text-fire-600">{ord.orderStatus}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-1 text-center">
                      {stages.map((stg, sIdx) => {
                        const isDone = currentStageIdx >= sIdx;
                        const isCurrent = currentStageIdx === sIdx;
                        return (
                          <div key={stg} className="flex flex-col items-center">
                            <div
                              className={`w-full h-1.5 rounded-full mb-1.5 transition-all ${
                                isDone ? 'bg-fire-600' : 'bg-slate-200'
                              }`}
                            />
                            <span
                              className={`text-[10px] leading-tight font-semibold ${
                                isCurrent
                                  ? 'text-fire-600 font-extrabold'
                                  : isDone
                                  ? 'text-slate-700'
                                  : 'text-slate-400'
                              }`}
                            >
                              {stg}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items Summary */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                    {ord.items?.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-slate-700">
                        <span className="truncate pr-2">
                          <strong>{it.quantity}x</strong> {it.name}
                        </span>
                        <span className="font-semibold text-slate-900 flex-shrink-0">
                          ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">
                      Delivering to: <strong>{ord.customer?.city} ({ord.customer?.pincode})</strong>
                    </span>

                    <button
                      onClick={() => onViewInvoice(ord)}
                      className="text-fire-600 hover:text-fire-700 font-bold flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      View Invoice
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

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
