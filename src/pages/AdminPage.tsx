import React, { useState } from "react";
import {
  Lock, KeyRound, LayoutDashboard, ShieldCheck, Plus, Trash2, Edit3, EyeOff, Eye, Check, X, Bell,
  Calendar, ShoppingBag, DollarSign, ListOrdered, FileText, ChevronRight, Store, RefreshCw
} from "lucide-react";
import { MenuItem, Order, Reservation } from "../types";
import { CATEGORIES } from "../data/menuData";
import { motion, AnimatePresence } from "motion/react";

interface AdminPageProps {
  menuItems: MenuItem[];
  onAddMenuItem: (item: MenuItem) => void;
  onUpdateMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (id: string, state: Order["status"]) => void;
  reservations: Reservation[];
  onUpdateReservationStatus: (id: string, state: Reservation["status"]) => void;
}

export default function AdminPage({
  menuItems,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  orders,
  onUpdateOrderStatus,
  reservations,
  onUpdateReservationStatus,
}: AdminPageProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "menu" | "orders" | "reservations">("dashboard");

  // Menu Creation Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [dishForm, setDishForm] = useState({
    name: "",
    category: "California Rolls",
    price: 60,
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600",
    isAvailable: true,
    isFeatured: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "samurai2024") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Honor code breached. Invalid password key.");
    }
  };

  // Stats aggregate computations
  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((val, curr) => val + curr.total, 0);

  const activeOrdersCount = orders.filter((o) => o.status !== "delivered").length;
  const pendingReservationsCount = reservations.filter((r) => r.status === "pending").length;

  const handleDishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishForm.name || !dishForm.description) {
      alert("Please enter a name and description.");
      return;
    }

    if (editingItem) {
      onUpdateMenuItem({
        ...editingItem,
        name: dishForm.name,
        category: dishForm.category,
        price: Number(dishForm.price),
        description: dishForm.description,
        imageUrl: dishForm.imageUrl,
        isAvailable: dishForm.isAvailable,
        isFeatured: dishForm.isFeatured,
      });
      setEditingItem(null);
    } else {
      onAddMenuItem({
        id: "custom-" + Date.now(),
        name: dishForm.name,
        category: dishForm.category,
        price: Number(dishForm.price),
        description: dishForm.description,
        imageUrl: dishForm.imageUrl,
        isAvailable: dishForm.isAvailable,
        isFeatured: dishForm.isFeatured,
      });
    }

    // Reset Form
    setDishForm({
      name: "",
      category: "California Rolls",
      price: 60,
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600",
      isAvailable: true,
      isFeatured: false,
    });
    setShowAddForm(false);
  };

  const startEdit = (item: MenuItem) => {
    setEditingItem(item);
    setDishForm({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl,
      isAvailable: item.isAvailable,
      isFeatured: !!item.isFeatured,
    });
    setShowAddForm(true);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setDishForm({
      name: "",
      category: "California Rolls",
      price: 60,
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600",
      isAvailable: true,
      isFeatured: false,
    });
    setShowAddForm(false);
  };

  // Tab trigger lists
  const tabItems = [
    { id: "dashboard", label: "HQ OVERVIEW", icon: LayoutDashboard },
    { id: "menu", label: "MENU PLANNER", icon: FileText },
    { id: "orders", label: "DELIVERY DESK", icon: ListOrdered },
    { id: "reservations", label: "CHAMBERS", icon: Calendar },
  ];

  /* 1. GATED SECURE LOGIN SCREEN */
  if (!isAuthenticated) {
    return (
      <div id="admin-login-screen" className="relative flex min-h-screen items-center justify-center px-6">
        <div className="absolute top-1/4 left-1/3 h-60 w-60 rounded-full bg-crimson/5 blur-[120px]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-lg border border-white/5 bg-charcoal/40 p-10 text-center shadow-2xl backdrop-blur-lg"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xs bg-crimson mb-6">
            <Lock className="h-6 w-6 text-white" />
          </div>

          <h3 className="font-display text-xl font-bold tracking-widest text-white block uppercase mb-2">
            SAMURAI HQ GATE
          </h3>
          <p className="font-sans text-xs text-gray-400 mb-8 max-w-xs mx-auto">
            Authorized admin personnel only. Enter the secret code to configure menu setups and review ongoing orders.
          </p>

          <form id="admin-login-form" onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-2">
              <label className="block font-display text-[11px] tracking-wider text-gray-400">
                HQ PASSWORD CREDENTIAL
              </label>
              <div className="relative flex items-center">
                <KeyRound className="absolute left-3.5 h-4 w-4 text-gold/60" />
                <input
                  id="admin-password-input"
                  type="password"
                  required
                  placeholder="Enter secret word..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-black/40 py-3 pr-4 pl-10 font-sans text-sm text-white placeholder-gray-505 focus:border-gold/40 focus:outline-hidden"
                />
              </div>
            </div>

            {loginError && (
              <p className="font-mono text-[10px] text-red-500 text-left animate-shake">{loginError}</p>
            )}

            <button
              id="admin-login-submit"
              type="submit"
              className="w-full cursor-pointer justify-center rounded-sm bg-crimson hover:bg-crimson-light py-3.5 font-display text-xs font-bold tracking-widest text-white shadow-xl"
            >
              ENGAGE SYSTEM
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  /* 2. AUTHENTICATED BOARD PANEL ACTIVE STATE */
  return (
    <div id="admin-dashboard-container" className="pt-24 min-h-screen px-6 md:px-12 pb-24 text-left">
      <div className="mx-auto max-w-7xl">
        
        {/* Row Welcome */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/5 pb-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-gold text-xs font-mono tracking-widest">
              <ShieldCheck className="h-4 w-4" />
              <span>COMMAND WORKSTATION SECURE</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-wider text-white mt-1">
              General Operations
            </h2>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-3 text-xs">
            <span className="rounded-xs bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-emerald-400 font-mono text-[10px]">
              ONLINE CLUSTER ACTIVE
            </span>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-400 hover:text-red-500 border border-white/10 rounded-xs px-3 py-1.5 transition-colors"
            >
              Lock Terminal
            </button>
          </div>
        </div>

        {/* Action tabs buttons */}
        <div className="flex overflow-x-auto gap-3 border-b border-white/5 pb-6 mb-8">
          {tabItems.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                id={`admin-tab-btn-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative cursor-pointer flex items-center space-x-2.5 rounded-sm px-5 py-3 font-display text-xs tracking-wider uppercase transition-all duration-200 whitespace-nowrap ${
                  isSelected
                    ? "bg-gold text-ink font-bold"
                    : "border border-white/5 bg-charcoal/20 text-gray-400 hover:border-gold/20 hover:text-gold"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TABS SWEEP OUTS */}
        <div id="admin-tab-content" className="space-y-8">
          
          {/* TAB 1: DASHBOARD METRICS */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Cards Grid Metrics */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                
                <div className="rounded-md border border-white/5 bg-charcoal/20 p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="block text-[11px] font-mono tracking-wider text-gray-500 uppercase">
                      Delivered Revenue
                    </span>
                    <strong className="block text-2xl font-decorative text-gold">{totalRevenue} DH</strong>
                  </div>
                  <div className="rounded-full bg-gold/10 p-3 text-gold">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>

                <div className="rounded-md border border-white/5 bg-charcoal/20 p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="block text-[11px] font-mono tracking-wider text-gray-500 uppercase">
                      Active Orders
                    </span>
                    <strong className="block text-2xl font-decorative text-white">
                      {activeOrdersCount}
                    </strong>
                  </div>
                  <div className="rounded-full bg-crimson/10 p-3 text-crimson-light">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                </div>

                <div className="rounded-md border border-white/5 bg-charcoal/20 p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="block text-[11px] font-mono tracking-wider text-gray-500 uppercase">
                      Pending Chambers
                    </span>
                    <strong className="block text-2xl font-decorative text-gold">
                      {pendingReservationsCount}
                    </strong>
                  </div>
                  <div className="rounded-full bg-gold/10 p-3 text-gold">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>

                <div className="rounded-md border border-white/5 bg-charcoal/20 p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="block text-[11px] font-mono tracking-wider text-gray-500 uppercase">
                      Unique Menu Items
                    </span>
                    <strong className="block text-2xl font-decorative text-white">
                      {menuItems.length}
                    </strong>
                  </div>
                  <div className="rounded-full bg-white/5 p-3 text-gray-450">
                    <FileText className="h-5 w-5" />
                  </div>
                </div>

              </div>

              {/* Combined lists highlights (Latest 3 reservations & latest 3 orders) */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                
                {/* Pending orders quicklist */}
                <div className="rounded-md border border-white/5 bg-charcoal/30 p-6">
                  <h3 className="font-display text-sm font-bold tracking-widest text-white uppercase mb-5">
                    URGENT PREPARATION QUEUE
                  </h3>
                  <div className="space-y-4">
                    {orders.filter(o => o.status !== "delivered").slice(0, 3).map((o) => (
                      <div key={o.id} className="flex items-center justify-between p-3 rounded-xs bg-black/30 border border-white/5">
                        <div className="space-y-1 truncate pr-4">
                          <span className="block font-display text-xs font-bold text-white truncate">
                            {o.customerName}
                          </span>
                          <span className="block text-[10px] text-gray-500 font-mono">
                            {o.items.length} dishes • {o.total} DH
                          </span>
                        </div>
                        <span className="shrink-0 rounded-xs bg-gold/10 px-2 py-1 text-[9px] font-mono font-bold text-gold uppercase">
                          {o.status}
                        </span>
                      </div>
                    ))}
                    {orders.filter(o => o.status !== "delivered").length === 0 && (
                      <p className="text-gray-550 text-xs py-2 italic font-sans">No orders currently cooking.</p>
                    )}
                  </div>
                </div>

                {/* Pending reservations quicklist */}
                <div className="rounded-md border border-white/5 bg-charcoal/30 p-6">
                  <h3 className="font-display text-sm font-bold tracking-widest text-white uppercase mb-5">
                    INCOMING PRIVATE SEATINGS
                  </h3>
                  <div className="space-y-4">
                    {reservations.filter(r => r.status === "pending").slice(0, 3).map((r) => (
                      <div key={r.id} className="flex items-center justify-between p-3 rounded-xs bg-black/30 border border-white/5">
                        <div className="space-y-1">
                          <span className="block font-display text-xs font-bold text-white">
                            {r.name}
                          </span>
                          <span className="block text-[10px] text-gray-500 font-mono">
                            {r.date} • {r.time} • {r.guests} guests
                          </span>
                        </div>
                        <span className="shrink-0 rounded-xs bg-crimson/15 px-2 py-1 text-[9px] font-mono font-bold text-crimson-light uppercase">
                          {r.status}
                        </span>
                      </div>
                    ))}
                    {reservations.filter(r => r.status === "pending").length === 0 && (
                      <p className="text-gray-550 text-xs py-2 italic font-sans text-left">No pending chamber requests.</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: MENU PLANNER (CRUD) */}
          {activeTab === "menu" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="font-display text-sm font-bold tracking-widest text-white uppercase">
                  MANAGEMENT DESK: {menuItems.length} DISHES TOTAL
                </span>
                
                <button
                  id="admin-add-dish-btn"
                  onClick={() => {
                    cancelEdit();
                    setShowAddForm(true);
                  }}
                  className="inline-flex cursor-pointer items-center justify-center space-x-2 rounded-xs bg-gold hover:bg-gold-dark px-4 py-2.5 font-display text-xs font-bold tracking-wider text-ink"
                >
                  <Plus className="h-4 w-4" />
                  <span>ADD NEW SAMURAI DISH</span>
                </button>
              </div>

              {/* Add form slider dialog */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-md border border-gold/20 bg-black/40 p-6 overflow-hidden"
                  >
                    <h3 className="font-display text-xs font-bold tracking-widest text-gold uppercase mb-5">
                      {editingItem ? `EDIT DISH: ${editingItem.name}` : "ADD NEW SAMURAI DISH FORM"}
                    </h3>

                    <form id="dish-form" onSubmit={handleDishSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-xs text-gray-400 font-display">DISH NAME *</label>
                        <input
                          id="form-dish-name"
                          type="text"
                          required
                          value={dishForm.name}
                          onChange={(e) => setFormDataState("name", e.target.value)}
                          className="w-full rounded-sm border border-white/10 bg-charcoal p-3 font-sans text-xs text-white placeholder-gray-505 focus:border-gold/30 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs text-gray-400 font-display">CATEGORY TABSSELECTOR *</label>
                        <select
                          id="form-dish-category"
                          value={dishForm.category}
                          onChange={(e) => setFormDataState("category", e.target.value)}
                          className="w-full rounded-sm border border-white/10 bg-charcoal p-3 font-sans text-xs text-white focus:border-gold/30 focus:outline-hidden"
                        >
                          {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-xs text-gray-400 font-display">PRICE IN DH *</label>
                          <input
                            id="form-dish-price"
                            type="number"
                            required
                            min={1}
                            value={dishForm.price}
                            onChange={(e) => setFormDataState("price", Number(e.target.value))}
                            className="w-full rounded-sm border border-white/10 bg-charcoal p-3 font-sans text-xs text-white focus:border-gold/30 focus:outline-hidden"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs text-gray-400 font-display font-bold">FEAUTRED SPECIAL</label>
                          <select
                            id="form-dish-featured"
                            value={dishForm.isFeatured ? "true" : "false"}
                            onChange={(e) => setFormDataState("isFeatured", e.target.value === "true")}
                            className="w-full rounded-sm border border-white/10 bg-charcoal p-3 font-sans text-xs text-white"
                          >
                            <option value="false">Standard Item</option>
                            <option value="true">Chef's Signature</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs text-gray-400 font-display">UNSPLASH IMAGE LINK</label>
                        <input
                          id="form-dish-image"
                          type="text"
                          value={dishForm.imageUrl}
                          onChange={(e) => setFormDataState("imageUrl", e.target.value)}
                          className="w-full rounded-sm border border-white/10 bg-charcoal p-3 font-sans text-xs text-white focus:border-gold/30 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-xs text-gray-400 font-display">INGREDIENTS DESCRIPTION *</label>
                        <textarea
                          id="form-dish-description"
                          required
                          rows={2}
                          value={dishForm.description}
                          onChange={(e) => setFormDataState("description", e.target.value)}
                          className="w-full rounded-sm border border-white/10 bg-charcoal p-3 font-sans text-xs text-white focus:border-gold/30 focus:outline-hidden"
                        />
                      </div>

                      <div className="md:col-span-2 pt-2 flex space-x-3 justify-end">
                        <button
                          id="form-dish-cancel"
                          type="button"
                          onClick={cancelEdit}
                          className="rounded-xs border border-white/10 px-5 py-2.5 font-display text-xs text-gray-300 hover:bg-white/5"
                        >
                          Dismiss Form
                        </button>
                        <button
                          id="form-dish-submit"
                          type="submit"
                          className="rounded-xs bg-gold px-7 py-2.5 font-display text-xs font-bold text-ink hover:bg-gold-dark"
                        >
                          {editingItem ? "ENFORCE CHANGES" : "PUBLISH SAMURAI ITEM"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dishes table CRUD display */}
              <div className="overflow-x-auto rounded-lg border border-white/5 bg-charcoal/35">
                <table className="w-full min-w-4xl font-sans text-xs text-left">
                  <thead className="bg-black/40 font-display tracking-wider text-gray-400">
                    <tr>
                      <th className="py-4 px-5">DISH IMAGE & DESCRIPTION</th>
                      <th className="py-4 px-5">CATEGORY</th>
                      <th className="py-4 px-5">PRICE</th>
                      <th className="py-4 px-5">STATUS INDICATORS</th>
                      <th className="py-4 px-5 text-right">CONTROLS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item) => (
                      <tr key={item.id} className="border-t border-white/5 hover:bg-white/5">
                        <td className="py-4 px-5 max-w-sm">
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-12 w-12 shrink-0 rounded-xs object-cover bg-black"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-display font-semibold text-white">
                                  {item.name}
                                </span>
                                {item.isFeatured && (
                                  <span className="rounded-xs bg-gold/10 px-1.5 py-0.5 text-[8px] font-bold text-gold uppercase">
                                    Sign
                                  </span>
                                )}
                              </div>
                              <p className="line-clamp-2 text-gray-400 text-[10px] mt-1 pr-6 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-5 font-mono text-gray-400">{item.category}</td>
                        <td className="py-4 px-5 font-mono text-gold font-bold">{item.price} DH</td>
                        
                        <td className="py-4 px-5">
                          <button
                            id={`toggle-avail-${item.id}`}
                            onClick={() =>
                              onUpdateMenuItem({ ...item, isAvailable: !item.isAvailable })
                            }
                            className={`rounded-xs px-2.5 py-1 text-[9px] font-bold font-mono uppercase cursor-pointer ${
                              item.isAvailable
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                                : "bg-red-500/10 text-red-400 border border-red-500/15"
                            }`}
                          >
                            {item.isAvailable ? "Active Store" : "Hidden Store"}
                          </button>
                        </td>

                        <td className="py-4 px-5 text-right">
                          <div className="flex justify-end space-x-3 select-none">
                            <button
                              id={`edit-item-${item.id}`}
                              onClick={() => startEdit(item)}
                              className="flex items-center text-gray-450 hover:text-gold"
                            >
                              <Edit3 className="h-4 w-4 mr-1" />
                              <span>Edit</span>
                            </button>
                            <button
                              id={`delete-item-${item.id}`}
                              onClick={() => {
                                if (confirm(`Dismiss ${item.name} from operational rosters?`)) {
                                  onDeleteMenuItem(item.id);
                                }
                              }}
                              className="flex items-center text-red-550 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDER CONTROL DESK */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-fadeIn">
              <span className="font-display text-xs font-bold tracking-widest text-white block uppercase">
                Active Order Operations
              </span>

              <div className="space-y-4">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="rounded-md border border-white/5 bg-charcoal/15 p-6 space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                      <div className="text-left space-y-1">
                        <span className="font-mono text-[10px] text-gray-500 uppercase">
                          ORDER SYSTEM KEY: {o.id} • placed {new Date(o.createdAt).toLocaleTimeString()}
                        </span>
                        <h4 className="font-display text-sm font-bold text-white">
                          Recipient: {o.customerName}
                        </h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-gray-400">
                          <span className="text-gold">Phone: {o.customerPhone}</span>
                          <span>Address: {o.customerAddress}</span>
                        </div>
                      </div>

                      {/* Controls state toggle */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-gray-400 uppercase mr-1">STATUS:</span>
                        {(["pending", "preparing", "ready", "delivered"] as const).map((st) => (
                          <button
                            id={`order-status-${o.id}-${st}`}
                            key={st}
                            onClick={() => onUpdateOrderStatus(o.id, st)}
                            className={`rounded-xs px-2.5 py-1 text-[9px] font-mono font-bold uppercase ${
                              o.status === st
                                ? st === "delivered"
                                  ? "bg-emerald-500 text-ink"
                                  : st === "ready"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gold text-ink"
                                : "bg-black/40 text-gray-500 hover:text-white"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ordered items map */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-2 text-left">
                        <span className="block font-display text-[11px] tracking-wider text-gray-400">
                          DISHES DISPATCH SPEC
                        </span>
                        <div className="space-y-1 font-sans text-xs text-gray-300">
                          {o.items.map((it) => (
                            <div key={it.id} className="flex justify-between max-w-md bg-black/20 p-2 rounded-xs">
                              <span>
                                {it.name} <strong className="text-gold">x{it.quantity}</strong>
                              </span>
                              <span className="font-mono text-gray-500">{it.price * it.quantity} DH</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right extra spec instructions */}
                      <div className="space-y-2 border-l border-white/5 pl-6 text-left">
                        <span className="block font-display text-[11px] tracking-wider text-gray-450">
                          COURIER MEMORANDUMS
                        </span>
                        <p className="font-sans text-xs italic text-gray-400">
                          {o.notes || "No extra notes requested by customer."}
                        </p>
                        <div className="pt-2">
                          <span className="text-xs font-mono text-white">
                            Total Yield: <strong className="text-gold">{o.total} DH</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}

                {orders.length === 0 && (
                  <div className="py-16 text-center border border-dashed border-white/5 bg-charcoal/10 rounded-lg">
                    <p className="font-sans text-xs text-gray-500">No customer orders have been dispatched yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: RESERVATION REGISTER */}
          {activeTab === "reservations" && (
            <div className="space-y-6 animate-fadeIn">
              <span className="font-display text-xs font-bold tracking-widest text-white block uppercase">
                Incoming Private Chamber Seating Registers
              </span>

              <div className="overflow-x-auto rounded-lg border border-white/5 bg-charcoal/35">
                <table className="w-full min-w-4xl font-sans text-xs text-left">
                  <thead className="bg-black/40 font-display tracking-wider text-gray-400">
                    <tr>
                      <th className="py-4 px-5">GUEST DETAILS</th>
                      <th className="py-4 px-5">ROOM & THEME</th>
                      <th className="py-4 px-5">TARGET DATE / TIME</th>
                      <th className="py-4 px-5">REMARKS NOTES</th>
                      <th className="py-4 px-5">STATUS FLOW</th>
                      <th className="py-4 px-5 text-right font-bold">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res) => (
                      <tr key={res.id} className="border-t border-white/5 hover:bg-white/5">
                        <td className="py-4 px-5">
                          <div>
                            <span className="block font-display font-semibold text-white">
                              {res.name}
                            </span>
                            <span className="block text-[10px] text-gray-400 font-mono mt-0.5">
                              {res.phone} • {res.email}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <div className="space-y-1">
                            <span className="font-display text-xs text-gold uppercase whitespace-nowrap">
                              {res.roomType.replace("_", " ")}
                            </span>
                            <span className="block text-[10px] text-gray-500 font-mono">
                              Group Size: {res.guests} people
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-5 font-mono text-white">
                          <span className="block font-bold">{res.date}</span>
                          <span className="block text-[10px] text-gray-400 mt-0.5">{res.time} hours</span>
                        </td>

                        <td className="py-4 px-5 max-w-xs">
                          <p className="line-clamp-2 text-gray-400 text-[10px] pr-4 italic">
                            {res.notes || "None listed."}
                          </p>
                        </td>

                        <td className="py-4 px-5">
                          <span className={`rounded-xs px-2.2 py-1 text-[9px] font-bold font-mono uppercase ${
                            res.status === "confirmed"
                              ? "bg-green-500/10 text-green-400 border border-green-500/15"
                              : res.status === "cancelled"
                              ? "bg-red-500/10 text-red-400 border border-red-500/15"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/15"
                          }`}>
                            {res.status}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-right whitespace-nowrap select-none">
                          <div className="flex justify-end space-x-2">
                            <button
                              id={`confirm-res-${res.id}`}
                              onClick={() => onUpdateReservationStatus(res.id, "confirmed")}
                              className="rounded-full flex items-center justify-center h-7 w-7 bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600 hover:text-white transition-all shadow-sm cursor-pointer"
                              title="Confirm reservation"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              id={`cancel-res-${res.id}`}
                              onClick={() => onUpdateReservationStatus(res.id, "cancelled")}
                              className="rounded-full flex items-center justify-center h-7 w-7 bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600 hover:text-white transition-all shadow-sm cursor-pointer"
                              title="Cancel reservation"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {reservations.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-500 italic">
                          No private chamber registers on file.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );

  // Form helper utility setter
  function setFormDataState<K extends keyof typeof dishForm>(key: K, val: typeof dishForm[K]) {
    setDishForm((prev) => ({ ...prev, [key]: val }));
  }
}
