import React from 'react';
import ProductCard from './ProductCard';
import {
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Search,
  AlertCircle,
  Filter
} from 'lucide-react';

const categories = [
  'All',
  'Fire Extinguishers',
  'Fire Alarms & Detectors',
  'Fire Blankets & First Aid',
  'Hydrants & Hose Reels',
  'Firefighting PPE & Suits',
  'Emergency Signage & Accessories',
];

const industries = ['All', 'Residential', 'Commercial', 'Industrial', 'Kitchen'];

export default function ProductCatalog({
  products,
  loading,
  selectedCategory,
  onSelectCategory,
  selectedIndustry,
  onSelectIndustry,
  selectedFireClass,
  onSelectFireClass,
  sortBy,
  onSelectSort,
  searchQuery,
  onResetFilters,
  onAddToCart,
  onViewDetails,
}) {
  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedIndustry !== 'All' ||
    selectedFireClass !== 'All' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'featured';

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Catalog Header & Count */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-fire-600 uppercase tracking-wider mb-1">
            <SlidersHorizontal className="w-4 h-4" />
            Fireshaw Inventory
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
            Fire Safety Equipment Catalog
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Displaying {products.length} certified fire suppression & safety products
          </p>
        </div>

        {/* Filter Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs font-bold text-fire-600 bg-fire-50 hover:bg-fire-100 px-3 py-1.5 rounded-lg border border-fire-200 transition-colors self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        )}
      </div>

      {/* Category Pills Slider / Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-fire-600 text-white shadow-md shadow-fire-600/20'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Bar: Industry, Fire Class & Sorting */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Industry filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-400" />
            Industry / Space
          </label>
          <select
            value={selectedIndustry}
            onChange={(e) => onSelectIndustry(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-fire-500 focus:outline-none"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind === 'All' ? 'All Spaces & Sectors' : ind}
              </option>
            ))}
          </select>
        </div>

        {/* Fire Class Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-400" />
            Fire Class Hazard
          </label>
          <select
            value={selectedFireClass}
            onChange={(e) => onSelectFireClass(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-fire-500 focus:outline-none"
          >
            <option value="All">All Fire Classes (A, B, C, D, K)</option>
            <option value="Class A">Class A (Wood, Paper, Cloth)</option>
            <option value="Class B">Class B (Petrol, Liquids)</option>
            <option value="Class C">Class C (Electrical & Gas)</option>
            <option value="Class K">Class K / F (Kitchen Cooking Oil)</option>
          </select>
        </div>

        {/* Sort selector */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-slate-400" />
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-fire-500 focus:outline-none"
          >
            <option value="featured">Featured & Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
            <option value="name-asc">Alphabetical (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Product Grid / Loading / Empty States */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 animate-pulse">
              <div className="aspect-[4/3] bg-slate-200 rounded-xl"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              <div className="h-8 bg-slate-200 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
          <div className="w-16 h-16 rounded-full bg-fire-50 text-fire-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No fire safety equipment found</h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            We couldn't find any products matching your active filters or keyword "{searchQuery}".
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-fire-600 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-fire-700 transition-colors"
          >
            Clear All Filters & Show All Equipment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id || product.sku}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}

    </section>
  );
}
