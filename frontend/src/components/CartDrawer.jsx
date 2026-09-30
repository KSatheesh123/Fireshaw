import React from 'react';
import {
  X,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Plus,
  Minus
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const taxAmount = Math.round(subtotal * 0.18);
  const freeShippingThreshold = 3000;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal + taxAmount + shippingFee;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-fire-600" />
              <h2 className="font-bold text-slate-900 text-lg">Your Safety Cart</h2>
              <span className="bg-fire-100 text-fire-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-fire-50/70 p-3.5 border-b border-fire-100 text-xs text-fire-900">
              <div className="flex items-center justify-between mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-fire-600" />
                  {amountToFreeShipping > 0 ? (
                    <span>Add <strong>₹{amountToFreeShipping}</strong> more for <strong>Free Express Shipping</strong></span>
                  ) : (
                    <span className="text-emerald-700 font-bold">🎉 You qualify for Free Express Shipping!</span>
                  )}
                </span>
                <span className="font-bold">{Math.round(shippingProgress)}%</span>
              </div>
              <div className="w-full bg-fire-200/70 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-fire-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${shippingProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Add certified fire extinguishers, smoke alarms, or safety equipment to begin.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-fire-600 text-white rounded-xl text-xs font-bold hover:bg-fire-700 transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id || item.sku}
                  className="flex gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-xl object-cover bg-white border border-slate-200 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item._id || item.sku)}
                          className="text-slate-400 hover:text-fire-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        SKU: {item.sku}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs font-extrabold text-slate-900">
                        ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                      </div>

                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden text-xs">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item._id || item.sku,
                              Math.max(1, (item.quantity || 1) - 1)
                            )
                          }
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-0.5 font-bold text-slate-800">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item._id || item.sku,
                              (item.quantity || 1) + 1
                            )
                          }
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18% Statutory Fire Equipment Tax)</span>
                  <span className="font-semibold text-slate-800">₹{taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Courier & Handling</span>
                  <span className="font-semibold text-slate-800">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span className="text-fire-600">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClearCart}
                  className="px-3 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                  title="Clear all items"
                >
                  Clear
                </button>
                <button
                  onClick={onProceedToCheckout}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white bg-fire-600 hover:bg-fire-700 shadow-lg shadow-fire-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Genuine Certified Equipment • Tax Invoice Included</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
