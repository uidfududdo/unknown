import { useState, useEffect } from "react";
import { ShoppingBag, Menu as MenuIcon, X, Settings, Calendar, Utensils, Home } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navigation({ currentView, onNavigate, cartCount, onOpenCart }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { view: "home", label: "Home", icon: Home },
    { view: "menu", label: "Menu", icon: Utensils },
    { view: "reservations", label: "Reservations", icon: Calendar },
    { view: "admin", label: "HQ (Admin)", icon: Settings },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-ink/80 border-b border-white/5 py-4 backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo element with visual brush strokes aspect */}
          <div
            id="nav-logo"
            onClick={() => onNavigate("home")}
            className="group flex cursor-pointer items-center space-x-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-crimson transition-transform duration-300 group-hover:rotate-12">
              <span className="font-display text-lg font-bold text-white">侍</span>
            </div>
            <div className="flex flex-col">
              <span className="font-decorative text-xl font-bold tracking-widest text-gold">SAMURAI</span>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gray-400">Japanese Cuisine</span>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden items-center space-x-10 md:flex">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentView === link.view;
                return (
                  <button
                    id={`nav-link-${link.view}`}
                    key={link.view}
                    onClick={() => onNavigate(link.view)}
                    className={`relative flex items-center space-x-2 font-display text-sm tracking-widest transition-colors duration-200 cursor-pointer ${
                      isActive ? "text-gold" : "text-gray-300 hover:text-gold"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gold"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Shopping Cart Trigger */}
            <button
              id="desktop-cart-btn"
              onClick={onOpenCart}
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:border-gold hover:bg-gold/10"
            >
              <ShoppingBag className="h-5 w-5 text-gold" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-crimson text-[10px] font-bold text-white shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Bag Button */}
            <button
              id="mobile-cart-btn"
              onClick={onOpenCart}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5"
            >
              <ShoppingBag className="h-4.5 w-4.5 text-gold" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-crimson text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburer Menu */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gold"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slider */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-30 border-b border-white/5 bg-ink p-6 shadow-2xl backdrop-blur-lg md:hidden"
          >
            <div className="grid grid-cols-1 gap-4">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    id={`mobile-nav-link-${link.view}`}
                    key={link.view}
                    onClick={() => {
                      onNavigate(link.view);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-4 rounded-lg px-4 py-3 text-left font-display text-sm tracking-wider transition-all duration-200 ${
                      isActive
                        ? "bg-gold/10 text-gold font-bold border-l-4 border-gold"
                        : "text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    <link.icon className="h-4 w-4 text-gold" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
