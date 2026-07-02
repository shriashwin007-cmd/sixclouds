import { CartProvider } from "@/app/context/CartContext";
import { ToastProvider } from "@/app/context/ToastContext";
import Navbar from "@/app/components/Navbar";
import ScrollVideoIntro from "@/app/components/ScrollVideoIntro";
import Hero from "@/app/components/Hero";
import Ticker from "@/app/components/Ticker";
import About from "@/app/components/About";
import Features from "@/app/components/Features";
import AddOns from "@/app/components/AddOns";
import Gallery from "@/app/components/Gallery";
import Reviews from "@/app/components/Reviews";
import Booking from "@/app/components/Booking";
import Location from "@/app/components/Location";
import Footer from "@/app/components/Footer";
import ChatWidget from "@/app/components/ChatWidget";

export default function Home() {
  return (
    <CartProvider>
      <ToastProvider>
        <Navbar />
        <ScrollVideoIntro />
        <Hero />
        <Ticker />
        <About />
        <Features />
        <AddOns />
        <Gallery />
        <Reviews />
        <Booking />
        <Location />
        <Footer />
        <ChatWidget />
      </ToastProvider>
    </CartProvider>
  );
}
