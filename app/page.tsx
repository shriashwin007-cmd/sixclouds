import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Ticker from "@/app/components/Ticker";
import About from "@/app/components/About";
import Features from "@/app/components/Features";
import Gallery from "@/app/components/Gallery";
import Reviews from "@/app/components/Reviews";
import Booking from "@/app/components/Booking";
import Location from "@/app/components/Location";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Features />
      <Gallery />
      <Reviews />
      <Booking />
      <Location />
      <Footer />
    </>
  );
}
