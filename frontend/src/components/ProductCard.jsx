import React, { useState } from 'react';
import {
  ShoppingCart,
  Check,
  Star,
  ShieldCheck,
  Eye,
  Flame,
  ArrowUpRight
} from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onViewDetails }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer hover:border-fire-300 relative"
    >
      {/* Top Media & Badges */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {discountPercent && (
            <span className="bg-fire-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Flame className="w-3 h-3 fill-white" /> Popular
            </span>
          )}
        </div>

        {/* Top Right Quick View Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full shadow-md transition-all hover:scale-110 z-10"
          title="Quick View Specifications"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Capacity / Size Tag */}
        {product.capacity && (
          <div className="absolute bottom-2.5 left-3 bg-slate-900/80 backdrop-blur text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
            {product.capacity}
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Fire Classes */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {product.category}
            </span>
            {product.fireClasses && product.fireClasses.slice(0, 3).map((fc, i) => (
              <span
                key={i}
                className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200"
              >
                {fc}
              </span>
            ))}
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-fire-600 transition-colors mb-2">
            {product.name}
          </h3>

          {/* Certification & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold truncate max-w-[170px]" title={product.certification}>
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
              {product.certification.split('/')[0]}
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-700 text-xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {product.rating} <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </span>
          </div>
        </div>

        {/* Price and Add to Cart Section */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div className="text-[10px] text-emerald-600 font-medium">In Stock (Dispatch ready)</div>
          </div>

          <button
            onClick={handleAdd}
            className={`p-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-fire-600 text-white hover:bg-fire-700 active:scale-95 shadow-sm shadow-fire-600/20'
            }`}
            title="Add to shopping cart"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-xs">Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="text-xs">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
