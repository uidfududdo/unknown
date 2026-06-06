import React from "react";
import { Compass, Calendar, Sparkles, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { MenuItem } from "../types";
import { motion, useMotionValue, useTransform } from "motion/react";
import AnimatedSection, { itemVariants } from "../components/AnimatedSection";
import SamuraiDivider from "../components/SamuraiDivider";
import CinematicWordReveal from "../components/CinematicWordReveal";

// We'll create an interactive 3D Card tilt component inside this file for cleaner modular structure
function TiltDishCard({ item, onAdd, variants }: { item: MenuItem; onAdd: (event: React.MouseEvent) => void; variants?: any; key?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse values into rotation angles
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={variants}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{
        rotateX: { type: "spring", stiffness: 300, damping: 25 },
        rotateY: { type: "spring", stiffness: 300, damping: 25 },
      }}
      className="group relative overflow-hidden rounded-xl border border-white/5 bg-charcoal p-5 duration-300 hover:border-gold/30 hover:bg-neutral-900/60"
    >
      {/* Background radial gold glow on hover */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gold/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Visual Image container with preserved 3D projection */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="relative h-48 overflow-hidden rounded-lg bg-black"
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex items-center space-x-1 rounded-sm bg-crimson/95 px-2.5 py-1 backdrop-blur-xs">
          <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" />
          <span className="font-display text-[9px] font-bold tracking-widest text-white uppercase">SIGNATURE</span>
        </div>
      </div>

      <div style={{ transform: "translateZ(25px)" }} className="mt-5 space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="font-display text-base font-bold tracking-wide text-white group-hover:text-gold transition-colors duration-200">
            {item.name}
          </h4>
          <span className="font-mono text-sm font-semibold text-gold whitespace-nowrap">
            {item.price} <span className="text-[10px]">DH</span>
          </span>
        </div>
        <p className="line-clamp-2 font-sans text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
          {item.description}
        </p>

        <div className="pt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(e);
            }}
            className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-sm border border-gold/20 bg-gold/5 py-2.5 font-display text-xs tracking-widest text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink hover:font-bold"
          >
            <span>TASTE DELIGHT</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

interface HomePageProps {
  onNavigate: (view: string) => void;
  featuredDishes: MenuItem[];
  onAddToCart: (item: MenuItem, event?: React.MouseEvent) => void;
}

export default function HomePage({ onNavigate, featuredDishes, onAddToCart }: HomePageProps) {
  // Cascading vertical symbols representing historical elements/values
  const verticalCharacters = ["武", "士", "道", "尊", "厳", "忠", "実"];

  return (
    <div id="homepage-container" className="relative">
      
      {/* Calligraphy cascading columns */}
      <div className="pointer-events-none absolute top-40 right-10 z-10 hidden flex-col space-y-5 lg:flex">
        {verticalCharacters.map((char, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.4,
            }}
            className="font-decorative text-xl font-bold text-crimson"
          >
            {char}
          </motion.div>
        ))}
      </div>

      {/* Hero section */}
      <section
        id="hero-section"
        className="relative flex min-h-[92vh] flex-col justify-center px-6 pt-24 md:px-12 lg:min-h-screen"
      >
        {/* Dynamic ambient dark red spotlight backgrounds */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-crimson/10 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gold/5 blur-[150px]" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Text Block */}
          <div className="relative z-20 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center space-x-2.5 rounded-full border border-gold/15 bg-gold/5 px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
              </span>
              <span className="font-mono text-[10px] tracking-widest text-gold uppercase">
                THE SOUL OF BUSHIDO IN EVERY DISH
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-decorative text-4xl font-extrabold leading-tight tracking-wider text-white md:text-5xl lg:text-6xl"
            >
              Masterful Cuisine, <br />
              <span className="text-gold">Eternal Discipline.</span>
            </motion.h1>

            <div className="max-w-md font-sans text-sm leading-relaxed text-gray-400 md:text-base">
              <CinematicWordReveal
                text="At Samurai, we cultivate culinary art as an act of pure dedication. Savor fresh, hand-selected Casablanca fish, high-heat teppanyaki, and legendary crunchy rolls carved with pristine steel precision."
                delay={0.35}
                wordDuration={0.8}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-5"
            >
              <button
                id="hero-explore-menu-btn"
                onClick={() => onNavigate("menu")}
                className="group flex cursor-pointer items-center justify-center space-x-3 rounded-sm bg-crimson px-8 py-4 font-display text-xs font-bold tracking-widest text-white shadow-xl transition-all duration-300 hover:bg-crimson-light"
              >
                <span>EXPLORE THE MENU</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-reserve-chamber-btn"
                onClick={() => onNavigate("reservations")}
                className="flex cursor-pointer items-center justify-center space-x-2 rounded-sm border border-gold/30 bg-gold/5 px-8 py-4 font-display text-xs tracking-widest text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-white"
              >
                <Calendar className="h-4 w-4" />
                <span>RESERVE CHAMBER</span>
              </button>
            </motion.div>
          </div>

          {/* Right Parallax Dish Card Block */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 25, // Soft, graceful spring momentum
                damping: 14,   // Long, smooth deceleration settling
                mass: 1.2,
                delay: 0.2
              }}
              className="relative aspect-square w-full max-w-[440px] overflow-hidden rounded-full border border-gold/20 p-2 duration-300"
            >
              <div className="absolute inset-0 rounded-full border border-dashed border-gold/10 animate-[spin_100s_linear_infinite]" />
              <div className="h-full w-full overflow-hidden rounded-full border border-white/5 bg-charcoal">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
                  alt="Atmospheric Japanese dining plate"
                  className="h-full w-full object-cover opacity-90 transition-transform duration-10000 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating micro indicators (3D design specs) */}
              <div className="absolute top-10 right-10 rotate-12 rounded-xs border border-gold/20 bg-ink/95 px-3 py-1.5 backdrop-blur-xs">
                <span className="block font-display text-[9px] font-bold tracking-wider text-gold">TEPPANYAKI</span>
                <span className="block font-mono text-[8px] text-gray-500">FROM 98 DH</span>
              </div>

              <div className="absolute bottom-16 left-6 -rotate-6 rounded-xs border border-crimson/20 bg-ink/95 px-3 py-1.5 backdrop-blur-xs">
                <span className="block font-display text-[9px] font-bold tracking-wider text-crimson-light">SUGGESTED</span>
                <span className="block font-mono text-[8px] text-gray-500">100% ORGANIC SOURCED</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Decorative separator symbol */}
      <SamuraiDivider />

      {/* Signature featured Dishes Section */}
      <section id="featured-dishes-section" className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase block mb-2">
              EXECUTIVE CHOICE
            </span>
            <h2 className="font-display text-3xl font-bold tracking-wider text-white md:text-4xl">
              Signature Masterpieces
            </h2>
            <p className="mx-auto mt-4 max-w-md font-sans text-xs text-gray-400">
              Hand-carved salmon, crunchy custom crumbs, and high-heat iron griddled specialties that declare culinary perfection.
            </p>
          </div>

          <AnimatedSection variant="stagger-container" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDishes.slice(0, 3).map((dish) => (
              <TiltDishCard
                key={dish.id}
                item={dish}
                onAdd={(e) => onAddToCart(dish, e)}
                variants={itemVariants}
              />
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* About The Chef section */}
      <section id="about-samurai-section" className="relative px-6 py-20 md:px-12 bg-charcoal/30">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          
          <AnimatedSection className="order-2 lg:order-1 relative">
            <div className="absolute -top-4 -left-4 h-full w-full rounded-lg border border-gold/10" />
            <div className="h-[400px] overflow-hidden rounded-lg bg-black">
              <img
                src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=700"
                alt="Samurai master chef slicing delicate sushi"
                className="h-full w-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute bottom-6 right-6 border border-gold/30 bg-ink/95 p-5 backdrop-blur-md">
              <Compass className="h-6 w-6 text-gold mb-2" />
              <span className="font-display text-xs font-bold tracking-widest text-white block mb-1">
                DISCIPLINE & STYLE
              </span>
              <p className="font-sans text-[10px] text-gray-400 leading-relaxed">
                Led by chefs trained in authentic Osaka schools.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="order-1 lg:order-2 space-y-6 text-left">
            <span className="font-mono text-xs tracking-widest text-gold uppercase">OUR SAGA</span>
            <h3 className="font-display text-3xl font-extrabold tracking-wide text-white">
              Sashimi Sliced with Absolute Blade Precision
            </h3>
            <div className="font-sans text-sm leading-relaxed text-gray-400">
              <CinematicWordReveal
                text="For ages, the samurai followed a strict moral code of honor, duty, and master craftsmanship. We carry that exact standard onto the iron stove and sushi board. Our blades slice with high-intensity speed to preserve the cold integrity of fresh sea fish."
                delay={0.15}
                wordDuration={0.8}
              />
            </div>
            <div className="font-sans text-sm leading-relaxed text-gray-400">
              <CinematicWordReveal
                text="Every rice grain is washed three times, seasoned identically with precise red vinegar, and manually formed to fit comfortable mouth measurements. There are absolutely no shortcuts here."
                delay={0.3}
                wordDuration={0.8}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-left">
              <div>
                <span className="block font-display text-lg font-bold text-gold">100% FRESH</span>
                <span className="block text-xs text-gray-500 mt-1">Casablanca fish sourced early morning.</span>
              </div>
              <div>
                <span className="block font-display text-lg font-bold text-crimson-light">OSAKA SPIRIT</span>
                <span className="block text-xs text-gray-500 mt-1">Sake-infused marinades and custom Tare glaze.</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Interactive statistics Counter section - Staggered zoom animation */}
      <section id="stats-section" className="px-6 py-16 md:px-12 bg-black">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection variant="stagger-container" className="grid grid-cols-2 gap-8 md:grid-cols-4">
            
            <motion.div variants={itemVariants} className="text-center">
              <span className="block font-decorative text-4xl font-extrabold text-gold tracking-tight md:text-5xl">
                12+
              </span>
              <span className="mt-2 block font-display text-xs tracking-widest text-gray-400 uppercase">
                Years of Mastery
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <span className="block font-decorative text-4xl font-extrabold text-white tracking-tight md:text-5xl">
                30+
              </span>
              <span className="mt-2 block font-display text-xs tracking-widest text-gray-400 uppercase">
                Artisanal Dishes
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <span className="block font-decorative text-4xl font-extrabold text-gold tracking-tight md:text-5xl">
                100%
              </span>
              <span className="mt-2 block font-display text-xs tracking-widest text-gray-400 uppercase">
                Ocean Sourced
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <span className="block font-decorative text-4xl font-extrabold text-white tracking-tight md:text-5xl">
                15k+
              </span>
              <span className="mt-2 block font-display text-xs tracking-widest text-gray-400 uppercase">
                Imperial Guests
              </span>
            </motion.div>

          </AnimatedSection>
        </div>
      </section>

      {/* Private Table Reservation Trigger Box Banner */}
      <section id="reservation-cta" className="relative px-6 py-20 md:px-12 overflow-hidden">
        {/* Absolute Background image layer */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200"
            alt="Interior atmospheric sushi dining look room"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-6">
          <Heart className="mx-auto h-8 w-8 text-gold animate-bounce" />
          <h3 className="font-display text-3xl font-bold tracking-wider text-white">
            Secure an Imperial Private Chamber
          </h3>
          <div className="mx-auto max-w-lg font-sans text-sm leading-relaxed text-gray-300">
            <CinematicWordReveal
              text="Enjoy premium seating. Reserve our Standard layout, Imperial Private sliding doors lounge, or the serene weeping Garden Zen pavilion for special gatherings."
              delay={0.1}
              wordDuration={0.8}
            />
          </div>
          <div className="pt-4 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              id="cta-reserve-btn"
              onClick={() => onNavigate("reservations")}
              className="rounded-sm bg-crimson px-8 py-3.5 font-display text-xs font-bold tracking-widest text-white transition-all duration-300 hover:bg-crimson-light cursor-pointer shadow-lg"
            >
              BOOK PRIVATE CHAMBER NOW
            </button>
            <button
              id="cta-menu-btn"
              onClick={() => onNavigate("menu")}
              className="rounded-sm border border-white/20 px-8 py-3.5 font-display text-xs tracking-widest text-white transition-all hover:bg-white/5 cursor-pointer"
            >
              BROWSE DISHES
            </button>
          </div>
          <div className="flex justify-center items-center space-x-2 pt-6 text-[10px] text-gray-500 font-mono">
            <ShieldCheck className="h-4 w-4 text-gold" />
            <span>NO CHARGES ON CANCELLATIONS MADE OVER 24 HOURS IN ADVANCE</span>
          </div>
        </div>
      </section>

    </div>
  );
}
