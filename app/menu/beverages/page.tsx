import MenuView from "@/app/components/MenuView";
import { CartProvider } from "@/app/context/CartContext";
import { ToastProvider } from "@/app/context/ToastContext";

export const metadata = {
  title: "Beverages — LevelUp Gaming Cafe",
};

export default function BeveragesPage() {
  return (
    <CartProvider>
      <ToastProvider>
        <MenuView category="beverages" />
      </ToastProvider>
    </CartProvider>
  );
}
