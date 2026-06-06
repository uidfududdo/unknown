import { MenuItem } from "../types";

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // SPRING ROLLS
  {
    id: "spring-1",
    name: "Saigon Spring Roll",
    category: "Spring Rolls",
    price: 55,
    description: "Crispy rolls filled with fresh vegetables, glass noodles, seasoned chicken, served with specialty dipping sauce.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "spring-2",
    name: "Shrimp Spring Roll",
    category: "Spring Rolls",
    price: 58,
    description: "Crispy delicate wrappers stuffed with plump marinated shrimp, clear glass noodles, and fresh cabbage.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },

  // SOUPS
  {
    id: "soup-1",
    name: "Seafood Soup",
    category: "Soups",
    price: 75,
    description: "A rich, flavorful broth slow-cooked with fresh squid, gulf shrimp, tender white fish, surimi, button mushrooms, and black fungus.",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "soup-2",
    name: "Royal Soup",
    category: "Soups",
    price: 79,
    description: "Imperial broth served with homemade chicken meatballs, sweet surimi, shrimp, mushrooms, and elegant egg ribbons.",
    imageUrl: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },

  // COMBOS
  {
    id: "combo-1",
    name: "Saigon Spring Roll + Coke",
    category: "Combos",
    price: 70,
    description: "Our signature Saigon Spring Roll paired with a cold, refreshing Coca-Cola.",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: "combo-2",
    name: "Chicken Wok + Coke",
    category: "Combos",
    price: 94,
    description: "Stir-fried Chicken Wok tossed in authentic spices with fresh vegetables, served with a cold Coca-Cola.",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },

  // BEEF
  {
    id: "beef-1",
    name: "Breaded Cheese Beef",
    category: "Beef",
    price: 55,
    description: "Premium sliced thin beef wrapped around rich, melting mozzarella cheese, breaded and fried to golden perfection.",
    imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600",
    isAvailable: true,
    isFeatured: true
  },

  // CALIFORNIA ROLLS
  {
    id: "cali-1",
    name: "California Rainbow",
    category: "California Rolls",
    price: 69,
    description: "Uramaki filled with surimi, creamy cheese, and cucumber, topped with layered fresh salmon, avocado, and tuna slices.",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "cali-2",
    name: "California Classic",
    category: "California Rolls",
    price: 55,
    description: "Traditional sushi roll with sweet surimi, crisp cucumber, ripe avocado, seasoned rice, toasted sesame seeds, and light cream cheese.",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },

  // CANTONESE RICE
  {
    id: "cantonese-1",
    name: "Seafood Cantonese Rice",
    category: "Cantonese Rice",
    price: 87,
    description: "Fragrant wok-fried jasmine rice tossed with egg, scallions, fresh squid, gulf shrimp, and dashi, garnished with microgreens.",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },

  // EBI (SHRIMP)
  {
    id: "ebi-1",
    name: "Ebi Tempura",
    category: "Ebi",
    price: 64,
    description: "Succulent, crisp tempura shrimp hand-battered and flash-fried, served alongside traditional warm tentsuyu sauce.",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },

  // SAMURAI FRY (CRUNCHY SPECIALS)
  {
    id: "fry-1",
    name: "Cruchy Roll",
    category: "Samurai Fry",
    price: 65,
    description: "Crispy tempura-fried roll packed with premium shrimp, sweet surimi, avocado, and lush melted cream cheese, drizzled with sweet unagi sauce.",
    imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=600",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "fry-2",
    name: "Dragon Eye",
    category: "Samurai Fry",
    price: 65,
    description: "A showstopper roll holding crisp carrot, sweet leek, and fresh salmon, wrapped in dynamic, crunchy panko crust.",
    imageUrl: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: "fry-3",
    name: "Casablanca Roll",
    category: "Samurai Fry",
    price: 65,
    description: "Deep-fried fusion roll filled with shrimp, fresh salmon, surimi, avocado, and cream cheese, topped with spicy mayo and sweet soy reduction.",
    imageUrl: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },

  // SALADS
  {
    id: "salad-1",
    name: "Seafood Salad",
    category: "Salads",
    price: 80,
    description: "Fresh shredded cabbage, crisp carrots, calamari, shrimp, white fish, surimi, and imported orange tobiko tossed in a creamy sesame-ginger dressing.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: "salad-2",
    name: "Exotic Salad",
    category: "Salads",
    price: 80,
    description: "A bright medley of cabbage, carrots, mango, avocado chunks, fresh pineapple, butter-roasted cashews, and juicy shrimp under yuzu glaze.",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },

  // WOKS
  {
    id: "wok-1",
    name: "Chicken Wok",
    category: "Woks",
    price: 79,
    description: "Sautéed chicken, thick wheat noodles, and crispy seasonal vegetables stir-fried in a roaring hot wok with dynamic teriyaki soy reduction.",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: "wok-2",
    name: "Mixed Wok",
    category: "Woks",
    price: 99,
    description: "A masterclass wok containing chicken breast strips, beef, tender shrimp, and vegetables thrown with egg noodles in delicious dark oyster glaze.",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isAvailable: true,
    isFeatured: true
  },
  {
    id: "wok-3",
    name: "Gambas Wok",
    category: "Woks",
    price: 90,
    description: "Rich jumbo prawns tossed with crunchy broccoli, snap peas, and delicate glass noodles in a savory, aromatic dashi garlic sauce.",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: "wok-4",
    name: "Seafood Wok",
    category: "Woks",
    price: 90,
    description: "Medley of shrimp, calamari, white clams, and surimi wok-fried with crisp garden vegetables and traditional udon noodles.",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },

  // SKEWERS
  {
    id: "skewer-1",
    name: "Beef Cheese Skewer",
    category: "Skewers",
    price: 65,
    description: "Three succulent skewers of premium beef wrapped around high-melt mozzarella, glazed with caramelized tare sauce.",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: "skewer-2",
    name: "Salmon Teriyaki Skewer",
    category: "Skewers",
    price: 75,
    description: "Skewered char-grilled Atlantic salmon pieces, sweet green onions, shellacked in sweet sake teriyaki reduction.",
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },

  // AROMAKI
  {
    id: "aro-1",
    name: "Salmon Avocado Aromaki",
    category: "Aromaki",
    price: 92,
    description: "Premium thick maki containing fatty Atlantic salmon, avocado, cream cheese, seasoned rice, dusted with fine nori flakes.",
    imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: "aro-2",
    name: "Ebi Crab Aromaki",
    category: "Aromaki",
    price: 92,
    description: "Premium roll stuffed with crisp Tempura shrimp, sweet snow crab salad, Japanese cucumber, and rich spicy dynamic creamy base.",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },

  // TEPPANYAKI
  {
    id: "teppan-1",
    name: "Seafood Teppanyaki",
    category: "Teppanyaki",
    price: 110,
    description: "Premium jumbo tiger shrimp, Atlantic salmon filet, and tender squid grilled on our high-heat sake-seasoned flat iron plate, served with seasonal vegetables.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    isAvailable: true,
    isFeatured: true
  },

  // BEVERAGES
  {
    id: "bev-1",
    name: "Oulmes 50cl",
    category: "Beverages",
    price: 12,
    description: "Sparkling natural mineral water from the historic Oulmes spring.",
    imageUrl: "https://images.unsplash.com/photo-1548964856-ac90a15e4a7d?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: "bev-2",
    name: "Coca-Cola Classic 25cl",
    category: "Beverages",
    price: 15,
    description: "Original Coca-Cola chilled to crisp ice temperature.",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: "bev-3",
    name: "Coca-Cola Zero 25cl",
    category: "Beverages",
    price: 15,
    description: "Zero sugar Coca-Cola chilled to perfection.",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: "bev-4",
    name: "Sprite 25cl",
    category: "Beverages",
    price: 15,
    description: "Crisp, clean lemon-lime taste.",
    imageUrl: "https://images.unsplash.com/photo-1625938146369-adc83368bda7?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  }
];

export const CATEGORIES = [
  "All",
  "Spring Rolls",
  "Soups",
  "Combos",
  "Beef",
  "California Rolls",
  "Cantonese Rice",
  "Ebi",
  "Samurai Fry",
  "Salads",
  "Woks",
  "Skewers",
  "Aromaki",
  "Teppanyaki",
  "Beverages"
];
