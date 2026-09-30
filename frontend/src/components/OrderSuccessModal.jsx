import React from 'react';
import {
  CheckCircle,
  Printer,
  ShieldCheck,
  Package,
  Calendar,
  X,
  Flame,
  Truck
} from 'lucide-react';

export default function OrderSuccessModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
            Order Placed Successfully!
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Thank you for choosing Fireshaw to safeguard your premises.
          </p>
        </div>

        {/* Invoice Body */}
        <div className="p-6 sm:p-8 space-y-6 printable-area">
          {/* Order Details Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Fireshaw Order Number
              </span>
              <div className="text-lg font-black text-slate-900 font-mono">
                {order.orderNumber}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Status / Payment
              </span>
              <div className="flex items-center gap-1.5 justify-end">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">
                  {order.orderStatus}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px] block mb-1">
                Recipient / Delivery Address
              </span>
              <strong className="text-slate-900 block text-sm">{order.customer?.name}</strong>
              <div className="text-slate-600 mt-0.5">{order.customer?.phone}</div>
              <div className="text-slate-600 mt-0.5">
                {order.customer?.address}, {order.customer?.city} - {order.customer?.pincode}
              </div>
              {order.customer?.companyName && (
                <div className="text-slate-500 mt-1 font-medium">
                  Company: {order.customer.companyName}
                  {order.customer.gstNumber && ` (GSTIN: ${order.customer.gstNumber})`}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Truck className="w-4 h-4 text-fire-600" />
                <span>Estimated Dispatch: <strong>Within 24 Hours</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Warranty: <strong>5 Years On-Site Coverage</strong></span>
              </div>
              {order.installationRequested && (
                <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 font-semibold text-[11px]">
                  ✓ On-site wall mounting & safety demo scheduled with technician.
                </div>
              )}
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Purchased Equipment ({order.items?.length})
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700 grid grid-cols-12">
                <span className="col-span-8">Product Name & SKU</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-2 text-right">Total</span>
              </div>
              <div className="divide-y divide-slate-200">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="px-4 py-2.5 grid grid-cols-12 items-center">
                    <div className="col-span-8">
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-[10px] text-slate-400">SKU: {item.sku}</div>
                    </div>
                    <div className="col-span-2 text-center font-bold text-slate-700">
                      {item.quantity}
                    </div>
                    <div className="col-span-2 text-right font-black text-slate-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">₹{order.subtotal?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST (18% Statutory Fire Safety Tax)</span>
              <span className="font-semibold text-slate-800">₹{order.taxAmount?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping & Logistics</span>
              <span className="font-semibold text-slate-800">
                {order.shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${order.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>Final Total</span>
              <span className="text-fire-600">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 no-print">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Tax Invoice / Receipt
            </button>

            <button
              onClick={onClose}
              className="w-full sm:flex-1 py-2.5 px-6 rounded-xl font-bold text-xs text-white bg-fire-600 hover:bg-fire-700 transition-colors text-center"
            >
              Done & Return to Store
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
