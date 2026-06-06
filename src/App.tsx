import { useState, useEffect } from "react";
import { MenuItem, CartItem, Order, Reservation } from "./types";
import { INITIAL_MENU_ITEMS } from "./data/menuData";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import CherryBlossomCanvas from "./components/CherryBlossomCanvas";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import ReservationPage from "./pages/ReservationPage";
import AdminPage from "./pages/AdminPage";
import CartDrawer from "./components/CartDrawer";
import Toast, { ToastInfo } from "./components/Toast";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Views navigation router state
  const [currentView, setCurrentView] = useState<"home" | "menu" | "reservations" | "admin">("home");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // States with Local Storage persistent synchronization
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Toast status records
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Flight particle markers
  const [flyingItems, setFlyingItems] = useState<Array<{ id: string; startX: number; startY: number; imageUrl: string }>>([]);

  const addToast = (message: string, title?: string, type: "success" | "info" | "warning" = "success") => {
    const newToast: ToastInfo = { id: Math.random().toString(), message, title, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 5000);
  };

  // 1. Initialise State
  useEffect(() => {
    // Menu items setup
    const storedMenu = localStorage.getItem("samurai_menu_list");
    if (storedMenu) {
      setMenuItems(JSON.parse(storedMenu));
    } else {
      setMenuItems(INITIAL_MENU_ITEMS);
      localStorage.setItem("samurai_menu_list", JSON.stringify(INITIAL_MENU_ITEMS));
    }

    // Cart items setup
    const storedCart = localStorage.getItem("samurai_cart_selection");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    // Seeding sample orders for administrative play-testing
    const storedOrders = localStorage.getItem("samurai_orders_list");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      const sampleOrders: Order[] = [
        {
          id: "ORD-9821",
          customerName: "Imane Bensouda",
          customerPhone: "+212 661-234567",
          customerAddress: "Villa 12, Rue des Jasmin, Gauthier, Casablanca",
          items: [
            {
              id: "cali-1",
              name: "California Rainbow",
              price: 69,
              quantity: 2,
              imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600",
            },
            {
              id: "fry-1",
              name: "Cruchy Roll",
              price: 65,
              quantity: 1,
              imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=600",
            }
          ],
          total: 203,
          notes: "Please pack extra wasabi paste and soy dipping bowls.",
          status: "pending",
          createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
        },
        {
          id: "ORD-4122",
          customerName: "Kamal Naciri",
          customerPhone: "+212 662-890123",
          customerAddress: "Residence Anassi, Appt 12, Bourgogne, Casablanca",
          items: [
            {
              id: "teppan-1",
              name: "Seafood Teppanyaki",
              price: 110,
              quantity: 1,
              imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
            },
            {
              id: "bev-2",
              name: "Coca-Cola Classic 25cl",
              price: 15,
              quantity: 2,
              imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600",
            }
          ],
          total: 140,
          status: "delivered",
          createdAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(), // 95 mins ago
        }
      ];
      setOrders(sampleOrders);
      localStorage.setItem("samurai_orders_list", JSON.stringify(sampleOrders));
    }

    // Seeding sample reservations for administrative previewing
    const storedReservations = localStorage.getItem("samurai_reservations_list");
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    } else {
      const sampleReservations: Reservation[] = [
        {
          id: "RES-702",
          name: "Sami Chraibi",
          email: "chraibi.sami@gmail.com",
          phone: "+212 661-891001",
          date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().split("T")[0], // Tomorrow
          time: "20:30",
          guests: 4,
          roomType: "imperial_private",
          notes: "Milestone corporate anniversary. Needs an elegant table card and high-tier sake suggestion.",
          status: "confirmed",
          createdAt: new Date().toISOString(),
        },
        {
          id: "RES-819",
          name: "Yasmin Alami",
          email: "y.alami@hotmail.co.ma",
          phone: "+212 654-223344",
          date: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString().split("T")[0], // Day after tomorrow
          time: "19:30",
          guests: 2,
          roomType: "garden_zen",
          notes: "Window seating looking onto the water falls is preferred please.",
          status: "pending",
          createdAt: new Date().toISOString(),
        }
      ];
      setReservations(sampleReservations);
      localStorage.setItem("samurai_reservations_list", JSON.stringify(sampleReservations));
    }
  }, []);

  // 2. State persistence sync triggers
  const saveMenuChanges = (updatedMenu: MenuItem[]) => {
    setMenuItems(updatedMenu);
    localStorage.setItem("samurai_menu_list", JSON.stringify(updatedMenu));
  };

  const saveCartChanges = (updatedCart: { [id: string]: number }) => {
    setCart(updatedCart);
    localStorage.setItem("samurai_cart_selection", JSON.stringify(updatedCart));
  };

  const saveOrdersChanges = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem("samurai_orders_list", JSON.stringify(updatedOrders));
  };

  const saveReservationsChanges = (updatedRes: Reservation[]) => {
    setReservations(updatedRes);
    localStorage.setItem("samurai_reservations_list", JSON.stringify(updatedRes));
  };

  // 3. Cart Operational actions
  const handleAddToCart = (item: MenuItem, event?: any) => {
    // Obtain coordinate info from click event, default to middle of screen
    const startX = event ? event.clientX : window.innerWidth / 2;
    const startY = event ? event.clientY : window.innerHeight / 2;

    const updated = { ...cart, [item.id]: (cart[item.id] || 0) + 1 };
    saveCartChanges(updated);

    // Spawns flying overlay card item
    const flyId = Math.random().toString();
    setFlyingItems((prev) => [...prev, { id: flyId, startX, startY, imageUrl: item.imageUrl }]);

    addToast(
      `Masterpiece "${item.name}" has been added to your selections. Preparing particle travel!`,
      "SELECTION ADDED",
      "info"
    );

    // After 900ms (flight finish), clear particle, and slide the sidebar open
    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((fi) => fi.id !== flyId));
      setIsCartOpen(true);
    }, 900);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    const updated = { ...cart, [id]: newQty };
    saveCartChanges(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = { ...cart };
    delete updated[id];
    saveCartChanges(updated);
  };

  const handleClearCart = () => {
    saveCartChanges({});
  };

  const cartCount = (Object.values(cart) as number[]).reduce((sum, current) => sum + current, 0);

  // Convert key-value cart mapping into explicit list of items holding full price data
  const checkoutItems: CartItem[] = Object.keys(cart)
    .map((id) => {
      const match = menuItems.find((m) => m.id === id);
      if (!match) return null;
      return {
        id: match.id,
        name: match.name,
        price: match.price,
        quantity: cart[id],
        imageUrl: match.imageUrl,
      };
    })
    .filter(Boolean) as CartItem[];

  // 4. Booking operational actions
  const handleAddReservation = (resData: Omit<Reservation, "id" | "status" | "createdAt">) => {
    const newRes: Reservation = {
      ...resData,
      id: "RES-" + Math.floor(100 + Math.random() * 900),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const updated = [newRes, ...reservations];
    saveReservationsChanges(updated);

    // Trigger Success reservation Toast
    addToast(
      `Sovereign chamber reserved for ${resData.guests} guests on ${resData.date} at ${resData.time}. Seal engraved.`,
      "RESERVATION REGISTRY SECURED",
      "success"
    );
  };

  const handleUpdateReservationStatus = (id: string, status: Reservation["status"]) => {
    const updated = reservations.map((r) => (r.id === id ? { ...r, status } : r));
    saveReservationsChanges(updated);
  };

  // 5. Checkout / placing orders
  const handlePlaceOrder = (customerData: { name: string; phone: string; address: string; notes?: string }) => {
    const subtotal = checkoutItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    const fee = subtotal > 150 ? 0 : 20;

    const newOrder: Order = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      customerName: customerData.name,
      customerPhone: customerData.phone,
      customerAddress: customerData.address,
      items: checkoutItems,
      total: subtotal + fee,
      notes: customerData.notes,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const updated = [newOrder, ...orders];
    saveOrdersChanges(updated);

    // Trigger Success order dispatch Toast
    addToast(
      `Order of ${checkoutItems.length} delicacies totaling ${subtotal + fee} DH successfully dispatched to deep logs!`,
      "ORDER LODGED & SEALED",
      "success"
    );
  };

  const handleUpdateOrderStatus = (id: string, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    saveOrdersChanges(updated);
  };

  // 6. Menu item modifications
  const handleAddMenuItem = (item: MenuItem) => {
    const updated = [...menuItems, item];
    saveMenuChanges(updated);
  };

  const handleUpdateMenuItem = (item: MenuItem) => {
    const updated = menuItems.map((m) => (m.id === item.id ? item : m));
    saveMenuChanges(updated);
  };

  const handleDeleteMenuItem = (id: string) => {
    const updated = menuItems.filter((m) => m.id !== id);
    saveMenuChanges(updated);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view as any);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen display-flex flex-col justify-between bg-ink text-gray-250 select-none">
      
      {/* Visual Falling Cherry Blossoms Particles backdrop */}
      <CherryBlossomCanvas />

      {/* Persistent Sticky Navbar */}
      <Navigation
        currentView={currentView}
        onNavigate={handleViewChange}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Pages Switch Views inside motion for layout crossfade animations */}
      <main className="flex-grow z-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, scale: 0.98, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentView === "home" && (
              <HomePage
                onNavigate={handleViewChange}
                featuredDishes={menuItems.filter((i) => i.isFeatured && i.isAvailable)}
                onAddToCart={handleAddToCart}
              />
            )}

            {currentView === "menu" && (
              <MenuPage
                menuItems={menuItems}
                onAddToCart={handleAddToCart}
                cartItems={cart}
              />
            )}

            {currentView === "reservations" && (
              <ReservationPage
                onAddReservation={handleAddReservation}
              />
            )}

            {currentView === "admin" && (
              <AdminPage
                menuItems={menuItems}
                onAddMenuItem={handleAddMenuItem}
                onUpdateMenuItem={handleUpdateMenuItem}
                onDeleteMenuItem={handleDeleteMenuItem}
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                reservations={reservations}
                onUpdateReservationStatus={handleUpdateReservationStatus}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Real-time Side shopping drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={checkoutItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
        onClearCart={handleClearCart}
      />

      {/* Global layout Footer */}
      <Footer onNavigate={handleViewChange} />

      {/* Persistent global Toast notifications overlay */}
      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      {/* Dynamic Flying Selections Overlays for selections kinetic travel */}
      <AnimatePresence>
        {flyingItems.map((fi) => {
          // Find target cart button element to fly towards dynamically at render time
          const targetEl = document.getElementById(window.innerWidth >= 768 ? "desktop-cart-btn" : "mobile-cart-btn");
          const rect = targetEl?.getBoundingClientRect();
          const targetX = rect ? rect.left + rect.width / 2 : window.innerWidth - 60;
          const targetY = rect ? rect.top + rect.height / 2 : 40;

          return (
            <motion.div
              key={fi.id}
              initial={{
                position: "fixed",
                left: fi.startX - 24,
                top: fi.startY - 24,
                opacity: 0.9,
                scale: 1,
                zIndex: 9999,
              }}
              animate={{
                left: targetX - 16,
                top: targetY - 16,
                opacity: 0.3,
                scale: 0.4,
                rotate: 270,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1], // Cinematic fluid bezier curve
              }}
              className="pointer-events-none h-12 w-12 rounded-full border border-gold/40 bg-black/90 p-0.5 shadow-2xl overflow-hidden flex items-center justify-center"
            >
              <img
                src={fi.imageUrl}
                alt=""
                className="h-full w-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

    </div>
  );
}
