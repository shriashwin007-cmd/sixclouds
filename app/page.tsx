import { CartProvider } from "@/app/context/CartContext";
import { ToastProvider } from "@/app/context/ToastContext";
import Navbar from "@/app/components/Navbar";
import ShaderBackground from "@/app/components/ShaderBackground";
import GameHUD from "@/app/components/GameHUD";
import JellyScroll from "@/app/components/JellyScroll";
import MiniGame from "@/app/components/MiniGame";
import ScrollVideoIntro from "@/app/components/ScrollVideoIntro";
import Hero from "@/app/components/Hero";
import Ticker from "@/app/components/Ticker";
import About from "@/app/components/About";
import Features from "@/app/components/Features";
import AddOns from "@/app/components/AddOns";
import Gallery3D from "@/app/components/Gallery3D";
import Reviews from "@/app/components/Reviews";
import Booking from "@/app/components/Booking";
import Location from "@/app/components/Location";
import Footer from "@/app/components/Footer";
import ChatWidget from "@/app/components/ChatWidget";

export default function Home() {
  return (
    <CartProvider>
      <ToastProvider>
        <ShaderBackground />
        <Navbar />
        <ScrollVideoIntro />
        <div style={{ position: "relative", zIndex: 1 }}>
          <JellyScroll>
            <Hero />
            <Ticker />
            <About />
            <Features />
            <AddOns />
            <MiniGame />
            <Gallery3D />
            <Reviews />
            <Booking />
            <Location />
            <Footer />
          </JellyScroll>
        </div>
        <GameHUD />
        <ChatWidget />
      </ToastProvider>
    </CartProvider>
  );
}
