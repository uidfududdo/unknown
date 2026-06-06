import { Phone, MapPin, Clock, Compass, ShieldCheck } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="website-footer" className="relative border-t border-white/5 bg-ink py-16 text-gray-400">
      {/* Visual top border styling */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-crimson">
                <span className="font-display text-base font-bold text-white">侍</span>
              </div>
              <span className="font-decorative text-lg font-bold tracking-widest text-gold text-white">SAMURAI</span>
            </div>
            <p className="font-sans text-xs leading-relaxed text-gray-500">
              An unforgettable fusion of traditional culinary discipline and cinematic modern Japanese atmospheres. Pure ingredients, legendary tastes.
            </p>
            <div className="pt-2">
              <span className="font-display text-xs text-gold tracking-widest block mb-1">THE SAMURAI OATH</span>
              <p className="font-mono text-[9px] text-gray-600 uppercase">Disciplined Cooking, Premium Sourcing, True Mastery.</p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <span className="font-display text-sm font-bold tracking-widest text-white block mb-6 uppercase">
              The Journey
            </span>
            <ul className="space-y-3 font-sans text-xs">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-gold cursor-pointer transition-colors duration-200"
                >
                  Home Screen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("menu")}
                  className="hover:text-gold cursor-pointer transition-colors duration-200"
                >
                  Authentic Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("reservations")}
                  className="hover:text-gold cursor-pointer transition-colors duration-200"
                >
                  Imperial Private Chambers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("admin")}
                  className="hover:text-gold cursor-pointer transition-colors duration-200"
                >
                  Admin Headquarters (HQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Location details */}
          <div>
            <span className="font-display text-sm font-bold tracking-widest text-white block mb-6 uppercase">
              Chamber Location
            </span>
            <ul className="space-y-4 font-sans text-xs">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <span>
                  Boulevard de la Corniche, Anfa,
                  <br />
                  Casablanca, Morocco 20110
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span>+212 522-899120</span>
              </li>
              <li className="flex items-start space-x-3">
                <Compass className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <span>Bourgogne, Marina, and Casablanca branches fully active.</span>
              </li>
            </ul>
          </div>

          {/* Operating hours */}
          <div>
            <span className="font-display text-sm font-bold tracking-widest text-white block mb-6 uppercase">
              Opening Hours
            </span>
            <ul className="space-y-4 font-sans text-xs">
              <li className="flex items-start space-x-3">
                <Clock className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <div>
                  <span className="block text-white font-medium">Daily Service</span>
                  <span className="block text-gray-500 mt-1">12:00 PM – 11:30 PM (Continuous)</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gold">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span className="text-[11px]">Private parking and executive security detail provided.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/5 pt-8 text-center text-xs md:flex-row md:text-left">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Samurai Restaurant. All Rights Reserved. Crafted with Japanese culinary artistry.
          </p>
          <div className="mt-4 flex space-x-6 text-gray-600 md:mt-0 font-mono text-[10px] tracking-wider uppercase">
            <span className="hover:text-gold transition-colors duration-200 cursor-help">Terms of Honor</span>
            <span className="hover:text-gold transition-colors duration-200 cursor-help">Private Dining Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
