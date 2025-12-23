import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';
import { products as allProducts, categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const priceRanges = [
  { min: 0, max: 5000, label: 'Under ₹5,000' },
  { min: 5000, max: 15000, label: '₹5,000 - ₹15,000' },
  { min: 15000, max: 50000, label: '₹15,000 - ₹50,000' },
  { min: 50000, max: 100000, label: '₹50,000 - ₹1,00,000' },
  { min: 100000, max: Infinity, label: 'Above ₹1,00,000' },
];

export const ProductGrid = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [showFilters, setShowFilters] = useState(true);

  // Filter and sort products
  let filteredProducts = [...allProducts];

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedCategories.includes(p.category)
    );
  }

  filteredProducts = filteredProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'discount':
      filteredProducts.sort((a, b) => b.discount - a.discount);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold">All Products</h2>
            <p className="text-muted-foreground text-sm">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="discount">Discount</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' ? 'bg-card shadow-sm' : ''
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' ? 'bg-card shadow-sm' : ''
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              size="sm"
              className="sm:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <motion.aside
            initial={false}
            animate={{ 
              width: showFilters ? 250 : 0,
              opacity: showFilters ? 1 : 0 
            }}
            className={`hidden sm:block flex-shrink-0 overflow-hidden ${
              showFilters ? '' : 'sm:hidden'
            }`}
          >
            <div className="bg-card rounded-xl border p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 200000]);
                  }}
                  className="text-xs text-primary hover:underline"
                >
                  Clear all
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <button className="flex items-center justify-between w-full py-2 text-sm font-medium">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="space-y-2 mt-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(cat.id)}
                        onCheckedChange={() => toggleCategory(cat.id)}
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <button className="flex items-center justify-between w-full py-2 text-sm font-medium">
                  Price Range
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="mt-4 px-1">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={200000}
                    step={1000}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Quick Price Filters */}
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => setPriceRange([range.min, range.max === Infinity ? 200000 : range.max])}
                    className="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 200000]);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-4 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
