import MenuView from "@/app/components/MenuView";
import { CartProvider } from "@/app/context/CartContext";
import { ToastProvider } from "@/app/context/ToastContext";

export const metadata = {
  title: "Snacks — LevelUp Gaming Cafe",
};

export default function SnacksPage() {
  return (
    <CartProvider>
      <ToastProvider>
        <MenuView category="snacks" />
      </ToastProvider>
    </CartProvider>
  );
}
