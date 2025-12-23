import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, ChevronDown, Menu, X, MapPin } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { getTotalItems, openCart } = useCartStore();
  const { isAuthenticated, user, openLoginModal, logout } = useAuthStore();
  const cartItemCount = getTotalItems();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length > 1) {
        const filtered = products.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary shadow-lg'
          : 'bg-primary'
      }`}
    >
      <div className="container mx-auto">
        {/* Main Navbar */}
        <div className="flex items-center gap-4 py-3 px-4">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center">
              <span className="font-display font-bold text-xl text-primary-foreground tracking-tight">
                Flipkart
              </span>
              <div className="flex items-center gap-1 text-[10px] text-primary-foreground/80">
                <span>Explore</span>
                <span className="text-secondary font-medium">Plus</span>
                <img
                  src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus-icon-702a099d2f.svg"
                  alt=""
                  className="h-2.5"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            </div>
          </motion.a>

          {/* Search Bar */}
          <div ref={searchRef} className="flex-1 relative max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 bg-card border-0 rounded-md text-sm w-full focus-visible:ring-2 focus-visible:ring-secondary"
              />
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-card rounded-lg shadow-xl border overflow-hidden z-50"
                >
                  {suggestions.map((product) => (
                    <motion.a
                      key={product.id}
                      href="#"
                      onClick={() => {
                        setSearchQuery('');
                        setSuggestions([]);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Login/User */}
            {isAuthenticated ? (
              <div className="relative group hidden md:block">
                <Button
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/10 gap-2"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-20 truncate">{user?.name || 'User'}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <div className="absolute top-full right-0 mt-1 w-48 bg-card rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-2 space-y-1">
                    <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">My Profile</a>
                    <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">Orders</a>
                    <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">Wishlist</a>
                    <hr className="my-1" />
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted text-destructive"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                onClick={openLoginModal}
                className="hidden md:flex bg-card text-primary hover:bg-card/90 font-semibold"
              >
                Login
              </Button>
            )}

            {/* Cart */}
            <motion.button
              onClick={openCart}
              className="relative p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="hidden md:inline-block ml-1 text-sm font-medium">Cart</span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary-foreground md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 h-10 bg-card border-0 rounded-md text-sm"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="hidden md:flex items-center gap-8 px-4 pb-2 text-primary-foreground/90 text-sm">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href="#"
              className="flex items-center gap-1 hover:text-primary-foreground transition-colors link-underline"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-primary-foreground/10"
          >
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Deliver to: Select Location</span>
              </div>
              
              <div className="space-y-2">
                {categories.map((cat) => (
                  <a
                    key={cat.id}
                    href="#"
                    className="flex items-center gap-2 p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </a>
                ))}
              </div>

              {!isAuthenticated && (
                <Button onClick={openLoginModal} className="w-full bg-card text-primary">
                  Login
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
