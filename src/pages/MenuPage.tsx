import React, { useState } from "react";
import { Search, Sparkles, Plus, Check, ShoppingBag, Info } from "lucide-react";
import { MenuItem } from "../types";
import { CATEGORIES } from "../data/menuData";
import { motion, AnimatePresence } from "motion/react";
import AnimatedSection, { itemVariants, CINEMATIC_EASE } from "../components/AnimatedSection";
import CinematicWordReveal from "../components/CinematicWordReveal";

interface MenuPageProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem, event?: React.MouseEvent) => void;
  cartItems: { [key: string]: number }; // tracks item quantities
}

export default function MenuPage({ menuItems, onAddToCart, cartItems }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filter items based on selected category and search input query
  const filteredItems = menuItems.filter((item) => {
    // Check if the item is listed as available in context
    const matchesAvailability = item.isAvailable;
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);

    return matchesAvailability && matchesCategory && matchesSearch;
  });

  const handleAdd = (item: MenuItem, event: React.MouseEvent) => {
    onAddToCart(item, event);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <div id="menupage-container" className="pt-24 min-h-screen px-6 md:px-12 pb-24">
      
      {/* Dynamic Header */}
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10 mt-8">
          <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase block mb-2">
            THE CHRONICLES OF TASTE
          </span>
          <h2 className="font-display text-3xl font-bold tracking-widest text-white md:text-4xl">
            Our Authentic Menu
          </h2>
          <div className="mx-auto mt-3 max-w-md font-sans text-xs text-gray-400">
            <CinematicWordReveal
              text="Sourced daily from the port of Casablanca, seasoned with imported traditional ingredients."
              delay={0.1}
              wordDuration={0.8}
            />
          </div>
        </div>

        {/* Search Bar & Filter options */}
        <div className="mx-auto max-w-lg mb-12">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-4 w-4 text-gold/60" />
            <input
              id="menu-search-input"
              type="text"
              placeholder="Search dishes, ingredients (shrimp, beef, noodles...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-sm border border-white/10 bg-charcoal py-3.5 pr-4 pl-12 font-sans text-sm text-white placeholder-gray-500 transition-all duration-300 focus:border-gold/40 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-xs text-gray-500 hover:text-gold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories selector horizontal scroll buttons - Staggered entrance */}
        <AnimatedSection variant="stagger-container" className="no-scrollbar flex overflow-x-auto border-b border-white/5 pb-4 mb-10 gap-2 scroll-smooth">
          {CATEGORIES.map((cat, index) => {
            const isActive = selectedCategory === cat;
            return (
              <motion.button
                variants={{
                  initial: { opacity: 0, y: 15, scale: 0.9 },
                  whileInView: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
                id={`category-tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer shrink-0 rounded-xs px-5 py-2.5 font-display text-xs tracking-wider uppercase transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "bg-gold text-ink font-bold shadow-lg shadow-gold/15"
                    : "border border-white/5 bg-charcoal/20 text-gray-400 hover:border-gold/30 hover:text-gold"
                }`}
              >
                {cat}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-crimson"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatedSection>

        {/* Menu Grid Items - Heavy kinetic staggered entry */}
        <AnimatedSection variant="stagger-container" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredItems.map((item) => {
              const countInCart = cartItems[item.id] || 0;
              const isAdded = justAddedId === item.id;
              
              return (
                <motion.div
                  id={`menu-item-card-${item.id}`}
                  layout="position"
                  key={item.id}
                  variants={itemVariants}
                  initial="initial"
                  whileInView="whileInView"
                  exit={{
                    opacity: 0,
                    scale: 0.88,
                    y: 20,
                    filter: "blur(8px)",
                    transition: { duration: 0.5, ease: CINEMATIC_EASE }
                  }}
                  className="group relative flex flex-col overflow-hidden rounded-md border border-white/5 bg-charcoal/40 transition-all duration-500 hover:border-gold/30 hover:bg-neutral-900/60 hover:shadow-2xl hover:shadow-gold/5"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Photo Container */}
                  <div className="relative h-44 w-full overflow-hidden bg-black">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {item.isFeatured && (
                      <div className="absolute top-2.5 left-2.5 flex items-center space-x-1 rounded-xs bg-gold px-2.5 py-1 text-[9px] font-bold text-black uppercase">
                        <Sparkles className="h-3 w-3 animate-spin" />
                        <span>CHEF'S SIGNATURE</span>
                      </div>
                    )}
                    
                    {countInCart > 0 && (
                      <div className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-crimson shadow-md">
                        <span className="font-mono text-[10px] font-bold text-white">x{countInCart}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Text */}
                  <div className="flex flex-1 flex-col p-4 justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-display text-sm font-bold tracking-wide text-white group-hover:text-gold transition-colors duration-200">
                          {item.name}
                        </h3>
                        <span className="font-mono text-xs font-semibold text-gold whitespace-nowrap">
                          {item.price} <span className="text-[10px]">DH</span>
                        </span>
                      </div>
                      <p className="font-sans text-[11px] leading-relaxed text-gray-400 line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Quick Checkout Trigger button */}
                    <button
                      id={`add-to-cart-${item.id}`}
                      onClick={(e) => handleAdd(item, e)}
                      className={`flex w-full cursor-pointer items-center justify-center space-x-2 rounded-xs py-2 px-3 font-display text-xs tracking-wider transition-all duration-300 ${
                        isAdded
                          ? "bg-green-600/25 border border-green-500/40 text-green-400"
                          : "border border-gold/15 bg-gold/5 text-gray-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink group-hover:font-bold"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>ADDED TO CART</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5 text-gold group-hover:text-ink" />
                          <span>ADD TO SELECTIONS</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </AnimatedSection>

        {/* Empty State visual */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-charcoal/10 rounded-lg border border-dashed border-white/5">
            <Info className="mx-auto h-8 w-8 text-gold block mb-3 opacity-60" />
            <h4 className="font-display text-base text-gray-300">No Samurai Dishes Found</h4>
            <p className="font-sans text-xs text-gray-500 mt-2">
              We couldn't locate any dishes matching "{searchQuery}" or the selected tab category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 font-mono text-xs text-gold border-b border-gold/40 hover:border-gold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
