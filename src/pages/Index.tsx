import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { CategoryBar } from '@/components/CategoryBar';
import { HeroCarousel } from '@/components/HeroCarousel';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { LoginModal } from '@/components/LoginModal';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

const Index = () => {
  // Get top deals (highest discount)
  const topDeals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 4);
  
  // Get trending (highest rated)
  const trending = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <LoginModal />

      {/* Category Bar */}
      <CategoryBar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6">
        <HeroCarousel />
      </section>

      {/* Deals of the Day */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl border shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">Deals of the Day</h2>
                <p className="text-sm text-muted-foreground">Limited time offers</p>
              </div>
            </div>
            <a href="#" className="text-primary font-semibold text-sm hover:underline">
              View All
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topDeals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trending Products */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">Trending Now</h2>
                <p className="text-sm text-muted-foreground">Most popular products</p>
              </div>
            </div>
            <a href="#" className="text-primary font-semibold text-sm hover:underline">
              View All
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden bg-gradient-to-r from-flipkart-blue to-flipkart-dark-blue p-8 md:p-12"
        >
          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-secondary" />
              <span className="text-secondary font-semibold text-sm">FLIPKART PLUS</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
              Get extra benefits on every order
            </h2>
            <p className="text-white/80 mb-6">
              Earn SuperCoins, get free delivery, and exclusive access to flash sales.
            </p>
            <button className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">
              Join Flipkart Plus
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-flipkart-blue" />
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=400&fit=crop"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* All Products */}
      <ProductGrid />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
