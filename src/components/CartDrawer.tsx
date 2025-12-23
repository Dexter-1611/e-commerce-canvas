import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice, getTotalSavings, clearCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-display font-bold text-lg">Your Cart</h2>
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <ShoppingBag className="h-20 w-20 text-muted-foreground/30 mb-4" />
                </motion.div>
                <p className="text-muted-foreground text-center">Your cart is empty</p>
                <Button onClick={closeCart} className="mt-4" variant="outline">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, scale: 0.9 }}
                          className="flex gap-3 p-3 bg-muted/50 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-bold text-sm">{formatPrice(item.price)}</span>
                              <span className="text-xs text-muted-foreground line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-7 h-7 flex items-center justify-center bg-background border rounded-md hover:bg-muted transition-colors"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="font-medium text-sm w-6 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center bg-background border rounded-md hover:bg-muted transition-colors"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="p-4 border-t bg-background/80 backdrop-blur">
                  {getTotalSavings() > 0 && (
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-success font-medium">You're saving</span>
                      <span className="text-success font-bold">{formatPrice(getTotalSavings())}</span>
                    </div>
                  )}
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-bold text-lg">Total</span>
                    <span className="font-display font-bold text-xl">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <Button className="w-full h-12 font-semibold text-base" size="lg">
                    Proceed to Checkout
                  </Button>
                  <button
                    onClick={clearCart}
                    className="w-full mt-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
