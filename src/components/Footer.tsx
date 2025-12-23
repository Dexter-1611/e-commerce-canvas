import { motion } from 'framer-motion';
import { Truck, Shield, RotateCcw, Headphones, CreditCard, Gift } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'On orders above ₹499',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '10-day return policy',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: '100% secure checkout',
  },
  {
    icon: CreditCard,
    title: 'EMI Options',
    description: 'No-cost EMI available',
  },
];

const footerLinks = {
  about: ['Contact Us', 'About Us', 'Careers', 'Press', 'Corporate Info'],
  help: ['Payments', 'Shipping', 'FAQ', 'Report Infringement'],
  policy: ['Return Policy', 'Terms of Use', 'Security', 'Privacy', 'Sitemap'],
  social: ['Facebook', 'Twitter', 'YouTube'],
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      {/* Features Strip */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">{feature.title}</p>
                  <p className="text-xs text-primary-foreground/70">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-primary-foreground/60">ABOUT</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:underline opacity-80 hover:opacity-100">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-primary-foreground/60">HELP</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:underline opacity-80 hover:opacity-100">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-primary-foreground/60">POLICY</h3>
            <ul className="space-y-2">
              {footerLinks.policy.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:underline opacity-80 hover:opacity-100">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-primary-foreground/60">SOCIAL</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:underline opacity-80 hover:opacity-100">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="font-semibold text-sm mb-4 text-primary-foreground/60">CONTACT</h3>
            <div className="flex items-center gap-2 mb-3">
              <Headphones className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">24x7 Customer Support</p>
                <p className="text-xs opacity-70">1800-202-9898</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Flipkart Gift Cards</p>
                <p className="text-xs opacity-70">Give the gift of choice</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 mt-10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-display font-bold text-xl">Flipkart</span>
              <span className="text-xs opacity-60">© 2024 Flipkart Clone. All Rights Reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
                alt="Payment methods"
                className="h-6 opacity-80"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
