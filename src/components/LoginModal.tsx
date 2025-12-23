import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuthStore();
  const { toast } = useToast();
  
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const schema = isSignup ? signupSchema : loginSchema;
      schema.parse(formData);

      setIsLoading(true);
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1500));

      login({
        id: '1',
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
      });

      toast({
        title: isSignup ? 'Account created!' : 'Welcome back!',
        description: isSignup
          ? 'Your account has been created successfully.'
          : 'You have been logged in successfully.',
      });

      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) newErrors[e.path[0] as string] = e.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoginModalOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={closeLoginModal}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-card rounded-2xl shadow-2xl overflow-hidden flex"
      >
        {/* Left Panel - Gradient Background */}
        <div className="hidden md:flex flex-col justify-between w-2/5 bg-gradient-to-br from-primary to-flipkart-dark-blue p-8 text-primary-foreground">
          <div>
            <h2 className="font-display text-2xl font-bold mb-3">
              {isSignup ? "Looks like you're new here!" : 'Login'}
            </h2>
            <p className="text-primary-foreground/80 text-sm">
              {isSignup
                ? 'Sign up with your email to get started'
                : 'Get access to your Orders, Wishlist and Recommendations'}
            </p>
          </div>
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/login_img-5e2a1f.png"
            alt="Login illustration"
            className="w-full max-w-[180px] mx-auto"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 p-8">
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Signup only) */}
            {isSignup && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10"
                  />
                </div>
                {errors.name && (
                  <p className="text-destructive text-xs mt-1">{errors.name}</p>
                )}
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Terms */}
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to Flipkart&apos;s{' '}
              <a href="#" className="text-primary hover:underline">Terms of Use</a> and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSignup ? 'Creating account...' : 'Logging in...'}
                </>
              ) : isSignup ? (
                'Create Account'
              ) : (
                'Login'
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            {/* Toggle Auth Mode */}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setErrors({});
              }}
              className="w-full py-2.5 text-primary font-semibold hover:bg-accent rounded-lg transition-colors"
            >
              {isSignup ? 'Already have an account? Login' : 'New to Flipkart? Create an account'}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};
