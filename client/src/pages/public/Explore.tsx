import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Star, ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { api } from '../../api/client';

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [occasion, setOccasion] = useState(searchParams.get('occasion') || 'all');
  const [sort, setSort] = useState('popular');
  const [priceRange, setPriceRange] = useState('all');

  const occasionTabs = [
    { id: 'all', label: 'All Occasions' },
    { id: 'birthday', label: '🎂 Birthday' },
    { id: 'anniversary', label: '❤️ Anniversary' },
    { id: 'friendship', label: '🫶 Friendship' },
    { id: 'proposal', label: '💍 Proposal' },
    { id: 'graduation', label: '🎓 Graduation' },
    { id: 'celebration', label: '🎉 Celebration' }
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { sort, activeOnly: 'true' };
      if (occasion && occasion !== 'all') params.occasion = occasion;
      if (search) params.search = search;
      if (priceRange === 'under250') params.maxPrice = '250';
      if (priceRange === '250to350') {
        params.minPrice = '250';
        params.maxPrice = '350';
      }
      if (priceRange === 'above350') params.minPrice = '350';

      const res = await api.getProducts(params);
      if (res.success) setProducts(res.products);
    } catch (err) {
      console.error('Fetch products error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [occasion, sort, priceRange]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="py-12 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Surprise Marketplace
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 font-serif mt-3">
            Find the perfect surprise.
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Explore interactive digital gifts created for birthdays, anniversaries, proposals, and celebrations.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm mb-10 space-y-4">
          
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search birthday, anniversary, friendship..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm px-6 py-3.5 rounded-2xl shadow-sm transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          {/* Occasion Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            {occasionTabs.map((tab) => {
              const active = occasion === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setOccasion(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Filters: Price & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center space-x-2 text-slate-600">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">Price:</span>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Prices</option>
                <option value="under250">Under ₹250</option>
                <option value="250to350">₹250 - ₹350</option>
                <option value="above350">Above ₹350</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 text-slate-600">
              <span className="font-semibold">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 text-sm">Discovering beautiful surprise templates...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
            <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-slate-900 font-serif">No surprise templates found</h3>
            <p className="text-slate-500 text-sm mt-1 mb-6">
              Try adjusting your search keywords or resetting occasion filters.
            </p>
            <button
              onClick={() => {
                setOccasion('all');
                setSearch('');
                setPriceRange('all');
              }}
              className="px-5 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-rose-100 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={prod.images?.[0] || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{prod.rating}</span>
                      <span className="text-slate-400 text-[10px]">({prod.reviewsCount})</span>
                    </div>
                    {prod.popular && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Popular
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-rose-600 uppercase tracking-wide mb-1">
                      <span>{prod.category}</span>
                      <span>•</span>
                      <span className="text-slate-400 normal-case">{prod.estimatedTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="mt-4 flex items-baseline space-x-2">
                      <span className="text-2xl font-extrabold text-slate-900 font-serif">₹{prod.price}</span>
                      {prod.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">₹{prod.originalPrice}</span>
                      )}
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Save {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                  <Link
                    to={`/product/${prod.slug}`}
                    className="text-center py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Preview
                  </Link>
                  <Link
                    to={`/create?product=${prod.id}`}
                    className="text-center py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 text-white text-xs font-bold shadow-sm shadow-rose-600/20 transition-all hover:shadow-md"
                  >
                    Create Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
