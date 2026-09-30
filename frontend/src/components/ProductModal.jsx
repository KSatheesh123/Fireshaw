import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Star,
  CheckCircle2,
  ShoppingCart,
  Check,
  Flame,
  Gauge,
  Clock,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart({ ...product, orderQty: quantity });
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Badges */}
          <div className="md:col-span-5 bg-slate-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200/80 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-emerald-900">Certified Equipment</div>
                    <div className="text-[11px] text-emerald-700">{product.certification}</div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5">
                  <Flame className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-amber-900">Tested Fire Classification</div>
                    <div className="text-[11px] text-amber-800">
                      {product.fireClasses && product.fireClasses.length > 0
                        ? product.fireClasses.join(', ')
                        : 'Universal Multi-Hazard'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 mt-4 text-center">
              SKU: <strong className="text-slate-600">{product.sku}</strong>
            </div>
          </div>

          {/* Right Column: Specs & Buy Actions */}
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-fire-600 bg-fire-50 px-2.5 py-0.5 rounded-full">
                  {product.category}
                </span>
                <span className="flex items-center gap-1 font-bold text-slate-700 text-xs">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  {product.rating} ({product.reviewsCount} customer reviews)
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display leading-snug mb-3">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-black text-slate-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  +18% GST Applicable at Checkout
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Technical Specs Table */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Discharge Range</span>
                    <strong className="text-slate-800">{product.specifications?.dischargeRange || '4-6 meters'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Discharge Time</span>
                    <strong className="text-slate-800">{product.specifications?.dischargeTime || '15-20s'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Hydrostatic Test Pressure</span>
                    <strong className="text-slate-800">{product.specifications?.testPressure || '35 bar'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Warranty</span>
                    <strong className="text-emerald-700">{product.specifications?.warranty || '5 Years'}</strong>
                  </div>
                </div>
              </div>

              {/* Key Features Bullet points */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-1.5 mb-6">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Key Advantages
                  </h4>
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-fire-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions: Qty & Add to Cart */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50 w-full sm:w-auto justify-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-700 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-bold text-slate-800 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-700 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={justAdded}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all w-full ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-fire-600 hover:bg-fire-700 text-white shadow-md shadow-fire-600/30 active:scale-95'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart (₹{(product.price * quantity).toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
