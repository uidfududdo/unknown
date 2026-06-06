import React, { useState } from "react";
import { X, Trash2, ShoppingBag, Plus, Minus, CheckCircle, MapPin, Phone, User, MessageSquare } from "lucide-react";
import { CartItem, Order } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onPlaceOrder: (customerData: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  }) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [shippingData, setShippingData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const deliveryFee = subtotal > 150 ? 0 : 20; // free delivery over 150 dh
  const total = subtotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingData.name || !shippingData.phone || !shippingData.address) {
      alert("Please fill in your name, delivery address, and phone number.");
      return;
    }

    onPlaceOrder(shippingData);
    setOrderPlacedSuccess(true);
    onClearCart();
    
    setTimeout(() => {
      setOrderPlacedSuccess(false);
      setCheckoutMode(false);
      onClose();
    }, 4500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/5 bg-ink text-left shadow-2xl space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="h-5 w-5 text-gold" />
                <span className="font-display text-sm font-bold tracking-widest text-white uppercase">
                  {checkoutMode ? "CHECKOUT INFORMATION" : "YOUR SELECTIONS"}
                </span>
                <span className="font-mono text-xs text-gray-400">({cartItems.length})</span>
              </div>
              <button
                id="close-cart-btn"
                onClick={onClose}
                className="rounded-full p-1 text-gray-400 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-6">
              {orderPlacedSuccess ? (
                /* Success screen */
                <div className="flex h-full flex-col justify-center items-center text-center space-y-5 py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
                  <h3 className="font-display text-xl font-bold tracking-wider text-white">
                    Order Lodged Successfully
                  </h3>
                  <p className="font-sans text-xs text-gray-400 max-w-xs leading-relaxed">
                    Thank you! Your honorable order has been dispatched directly to the Samurai Kitchen. Our fast courier is getting ready.
                  </p>
                  <p className="font-sans text-[11px] text-gray-500">
                    The kitchen will contact you shortly at <span className="text-white font-mono">{shippingData.phone}</span>.
                  </p>
                </div>
              ) : cartItems.length === 0 ? (
                /* Empty state */
                <div className="flex h-full flex-col justify-center items-center text-center space-y-4 py-12">
                  <div className="rounded-full bg-white/5 p-4 border border-dashed border-white/10">
                    <ShoppingBag className="h-8 w-8 text-gold block opacity-60" />
                  </div>
                  <h4 className="font-display text-sm tracking-wide text-gray-300">Your Basket is Empty</h4>
                  <p className="font-sans text-xs text-gray-500 max-w-xs">
                    Explore our legendary Spring Rolls, sizzling Woks, and delicious California specials to start.
                  </p>
                </div>
              ) : !checkoutMode ? (
                /* Shopping Cart list review */
                <div className="py-4 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      id={`cart-item-${item.id}`}
                      key={item.id}
                      className="flex items-center space-x-4 rounded-md border border-white/5 bg-charcoal/30 p-3"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-14 w-14 rounded-xs object-cover bg-black"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="block font-display text-xs font-semibold text-white truncate">
                          {item.name}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-gold">
                            {item.price * item.quantity} DH
                          </span>
                          <span className="font-mono text-[10px] text-gray-500">
                            {item.price} DH / unit
                          </span>
                        </div>
                      </div>

                      {/* Quantity tools and delete */}
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2 rounded-sm bg-black/40 p-1 border border-white/5">
                          <button
                            id={`qty-minus-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-0.5 text-gray-400 hover:text-gold"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-mono text-xs font-bold text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            id={`qty-plus-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-0.5 text-gray-400 hover:text-gold"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          id={`cart-remove-${item.id}`}
                          onClick={() => onRemoveItem(item.id)}
                          className="flex items-center text-[10px] text-red-500/70 hover:text-red-555"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Delivery Checkout Form */
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="py-4 space-y-5">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 font-display text-xs text-gray-300">
                      <User className="h-3.5 w-3.5 text-gold" />
                      <span>RECIPIENT FULL NAME *</span>
                    </label>
                    <input
                      id="checkout-name-input"
                      type="text"
                      required
                      placeholder="Anas El Alami"
                      value={shippingData.name}
                      onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-black/40 p-3 font-sans text-xs text-white placeholder-gray-505 focus:border-gold/30 focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 font-display text-xs text-gray-300">
                      <Phone className="h-3.5 w-3.5 text-gold" />
                      <span>PHONE FOR DELIVERY *</span>
                    </label>
                    <input
                      id="checkout-phone-input"
                      type="tel"
                      required
                      placeholder="+212 612-456789"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-black/40 p-3 font-sans text-xs text-white placeholder-gray-505 focus:border-gold/30 focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 font-display text-xs text-gray-300">
                      <MapPin className="h-3.5 w-3.5 text-gold" />
                      <span>STREET ADDRESS IN CASABLANCA *</span>
                    </label>
                    <textarea
                      id="checkout-address-input"
                      required
                      rows={3}
                      placeholder="Appt 4, Avenue de France, Gauthier, Casablanca"
                      value={shippingData.address}
                      onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-black/40 p-3 font-sans text-xs text-white placeholder-gray-505 focus:border-gold/30 focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 font-display text-xs text-gray-300">
                      <MessageSquare className="h-3.5 w-3.5 text-gold" />
                      <span>KITCHEN NOTES / EXTRA GINGER</span>
                    </label>
                    <input
                      id="checkout-notes-input"
                      type="text"
                      placeholder="Add spicy mayonnaise, chopsticks requested, call upon arrival..."
                      value={shippingData.notes}
                      onChange={(e) => setShippingData({ ...shippingData, notes: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-black/40 p-3 font-sans text-xs text-white placeholder-gray-505 focus:border-gold/30 focus:outline-hidden"
                    />
                  </div>

                  <button
                    id="submit-order-record-btn"
                    type="submit"
                    className="w-full cursor-pointer rounded-xs bg-crimson hover:bg-crimson-light py-3 text-center font-display text-xs font-bold tracking-widest text-white shadow-xl"
                  >
                    DISPATCH SAMURAI ORDER
                  </button>

                  <button
                    id="back-cart-items-btn"
                    type="button"
                    onClick={() => setCheckoutMode(false)}
                    className="w-full text-center font-mono text-xs text-gray-450 hover:text-gold pt-1"
                  >
                    Back to Items Review
                  </button>
                </form>
              )}
            </div>

            {/* Total summary Footbox */}
            {cartItems.length > 0 && !orderPlacedSuccess && (
              <div className="border-t border-white/5 bg-black/40 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between font-sans text-xs text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">{subtotal} DH</span>
                  </div>
                  <div className="flex justify-between font-sans text-xs text-gray-400">
                    <span>Delivery Service fee</span>
                    <span className="font-mono text-white">
                      {deliveryFee === 0 ? (
                        <span className="text-green-500 font-bold uppercase">FREE</span>
                      ) : (
                        `${deliveryFee} DH`
                      )}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="font-sans text-[9px] text-gray-550 italic text-left">
                      Free delivery on all orders exceeding 150 DH! Add {150 - subtotal} DH more.
                    </p>
                  )}
                  <div className="w-full h-[1px] bg-white/5 my-2" />
                  <div className="flex justify-between font-display text-sm font-bold text-white">
                    <span className="tracking-widest">ESTIMATED TOTAL</span>
                    <span className="font-mono text-gold">{total} DH</span>
                  </div>
                </div>

                {!checkoutMode ? (
                  <button
                    id="proceed-checkout-btn"
                    onClick={() => setCheckoutMode(true)}
                    className="w-full cursor-pointer rounded-sm bg-gold hover:bg-gold-dark py-4 text-center font-display text-xs font-bold tracking-widest text-ink block shadow-xl transition-all duration-300"
                  >
                    PROCEED TO KITCHEN REGISTER
                  </button>
                ) : null}
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
