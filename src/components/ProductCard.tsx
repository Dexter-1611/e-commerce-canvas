import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Zap } from 'lucide-react';
import { Product, useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const { addItem, openCart } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Ripple effect
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setRipplePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    }

    addItem(product);
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`,
      action: (
        <Button variant="outline" size="sm" onClick={openCart}>
          View Cart
        </Button>
      ),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-card rounded-xl overflow-hidden border shadow-sm card-lift"
    >
      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-10 p-2 bg-card/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            isWishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground'
          }`}
        />
      </button>

      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-success text-success-foreground text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/50">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="flex gap-2"
          >
            <Button
              ref={buttonRef}
              onClick={handleAddToCart}
              size="sm"
              className="relative overflow-hidden bg-card text-foreground hover:bg-card/90 shadow-lg"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
              
              {/* Ripple */}
              {showRipple && (
                <span
                  className="absolute bg-primary/30 rounded-full animate-ping"
                  style={{
                    left: ripplePosition.x - 10,
                    top: ripplePosition.y - 10,
                    width: 20,
                    height: 20,
                  }}
                />
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="font-medium text-sm mt-1 line-clamp-2 h-10 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <span className="flex items-center gap-0.5 bg-success text-success-foreground text-xs font-bold px-1.5 py-0.5 rounded">
            {product.rating}
            <Star className="h-3 w-3 fill-current" />
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="font-display font-bold text-lg">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs text-success font-semibold">
                {product.discount}% off
              </span>
            </>
          )}
        </div>

        {/* Offers */}
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <Zap className="h-3 w-3 text-secondary" />
          <span>Free delivery</span>
        </div>
      </div>
    </motion.div>
  );
};
