export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number; // in MAD (dh)
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  roomType: "standard" | "imperial_private" | "garden_zen";
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  total: number;
  notes?: string;
  status: "pending" | "preparing" | "ready" | "delivered";
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}
