"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type CartItem = { id: string; name: string; price: number; icon: string; quantity: number };

type CartContextType = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + qty } : c);
      return [...prev, { ...item, quantity: qty }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => setCart((prev) => prev.filter((c) => c.id !== id)), []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, quantity: Math.max(1, c.quantity + delta) } : c));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, totalItems, totalPrice, addToCart, removeItem, updateQty, clearCart, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
