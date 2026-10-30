"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  FlaskConical,
  Heart,
  Shield,
  Activity,
  Brain,
  Droplet,
  Bone,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import Toast from "@/components/ui/Toast";
import ProductCard from "@/components/ui/ProductCard";
import BilonaModal from "@/components/BilonaModal";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/context/CartContext";

const REVIEWS = [
  {
    stars: 5,
    text: "The aroma of this ghee takes me back to my grandmother's home in Rajasthan. True authentic Danedar texture. Absolutely pure!",
    author: "Pooja Sharma",
    location: "Jaipur, Rajasthan",
  },
  {
    stars: 5,
    text: "Switched to GHRITKALASH for my daily Ayurvedic routine and digestion. The light, pure taste is incomparable to supermarket brands.",
    author: "Dr. Arvind Kulkarni",
    location: "Pune, Maharashtra",
  },
  {
    stars: 5,
    text: "Being a mother, I only want the purest for my kids. The bilona hand-churned method and glass jar packaging show their deep commitment to quality.",
    author: "Meera Patel",
    location: "Ahmedabad, Gujarat",
  },
  {
    stars: 5,
    text: "Remarkable aroma when added to hot dal and parathas. The 2-jar bundle is amazing value. Definitely subscribing regularly!",
    author: "Rajeshwar Rao",
    location: "Bengaluru, Karnataka",
  },
];

export default function Home() {
  const { setIsOpen: setCartOpen, showToast } = useCart();
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const scrollToShop = () => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHelpClick = (action) => {
    if (action === "faq") {
      showToast("FAQs: Pure A2 Gir Cow Ghee, hand-churned in clay pots using Vedic Bilona.");
    } else if (action === "shipping") {
      showToast("Free express shipping across India on orders with 2 or more jars!");
    } else if (action === "contact") {
      showToast("Reach out to us: support@ghritkalash.com | +91 98765 43210");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#27201b] selection:bg-[#e4a938] selection:text-[#122b1c]">
      {/* Navigation */}
      <Navbar />

      {/* Global Slide-Over Cart Drawer */}
      <CartSidebar />

      {/* Toast Notification */}
      <Toast />

      {/* Bilona 5-Step Process Modal */}
      <BilonaModal
        isOpen={processModalOpen}
        onClose={() => setProcessModalOpen(false)}
        onShopNow={() => {
          setProcessModalOpen(false);
          scrollToShop();
        }}
      />

      <main className="flex-1">
        {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-6 sm:pt-10 pb-16 lg:pb-24">
          {/* Farm Background — high visibility with rich natural contrast */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.88]">
              <Image
                src="/images/hero-farm-bg.jpg"
                alt="Organic Indian dairy farm green pasture background"
                fill
                priority
                sizes="100vw"
                className="object-cover object-top filter saturate-115 brightness-105"
              />
            </div>
            {/* Smooth gradient blends so content stays legible while background is clearly visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbf9f4]/92 via-[#fbf9f4]/60 to-transparent sm:via-[#fbf9f4]/45" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fbf9f4] via-[#fbf9f4]/60 to-transparent" />
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#fbf9f4]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
              {/* Left Content Column */}
              <div className="lg:col-span-7 pt-4 sm:pt-8 space-y-6">
                {/* Overline tag */}
                <div className="inline-flex items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#1b432e] uppercase">
                    Traditional &bull; Pure &bull; Nutritious
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] text-[#241a12] font-semibold tracking-tight drop-shadow-sm">
                  Ancient Tradition.
                  <span className="block text-[#a86e1a] font-normal italic mt-1 font-heading text-[1.08em]">
                    Pure Golden Goodness.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-[#52463b] max-w-xl font-normal leading-relaxed">
                  GHRITKALASH Pure A2 Cow Ghee is crafted using the sacred Bilona method,
                  bringing you the richness of Vedic tradition in its purest golden form.
                </p>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 pt-2">
                  <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/85 backdrop-blur-sm border border-[#e8dbc4]/70 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-11 h-11 rounded-full bg-[#eef5f0] border border-[#d2e5d7] flex items-center justify-center text-[#18422d] mb-2 shadow-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7c5 0 7 7 7 7s-2 7-7 7Z" />
                        <path d="M11 20V6" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-[#292017] leading-tight">100% Pure</span>
                    <span className="text-[11px] text-[#786b5c]">A2 Cow Ghee</span>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/85 backdrop-blur-sm border border-[#e8dbc4]/70 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-11 h-11 rounded-full bg-[#eef5f0] border border-[#d2e5d7] flex items-center justify-center text-[#18422d] mb-2 shadow-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-[#292017] leading-tight">Traditional</span>
                    <span className="text-[11px] text-[#786b5c]">Bilona Method</span>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/85 backdrop-blur-sm border border-[#e8dbc4]/70 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-11 h-11 rounded-full bg-[#eef5f0] border border-[#d2e5d7] flex items-center justify-center text-[#18422d] mb-2 shadow-inner">
                      <FlaskConical className="w-5 h-5 text-[#18422d]" />
                    </div>
                    <span className="text-xs font-semibold text-[#292017] leading-tight">Lab-Tested</span>
                    <span className="text-[11px] text-[#786b5c]">&amp; Certified</span>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/85 backdrop-blur-sm border border-[#e8dbc4]/70 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-11 h-11 rounded-full bg-[#eef5f0] border border-[#d2e5d7] flex items-center justify-center text-[#18422d] mb-2 shadow-inner">
                      <Heart className="w-5 h-5 text-[#18422d]" />
                    </div>
                    <span className="text-xs font-semibold text-[#292017] leading-tight">Rich In Nutrition</span>
                    <span className="text-[11px] text-[#786b5c]">&amp; Immunity Booster</span>
                  </div>
                </div>

                {/* Ecommerce Navigation CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={scrollToShop}
                    id="hero-shop-now"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase btn-amazon-primary group"
                  >
                    <ShoppingBag className="w-5 h-5 text-[#e3a938]" />
                    <span>Shop Pure A2 Ghee</span>
                  </button>

                  <button
                    onClick={() => setProcessModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs font-semibold tracking-wider uppercase text-[#1b432e] hover:text-[#b87b14] bg-white/85 hover:bg-white border border-[#e0cfb4] transition-all shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#e3a938]" />
                    <span>Explore Bilona Heritage</span>
                  </button>
                </div>
              </div>

              {/* Right Hero Product Card Showcase */}
              <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
                <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none">
                  {/* Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#f7d995]/50 rounded-full blur-3xl -z-10 pointer-events-none" />

                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-white/50 group transform transition-transform duration-500 hover:scale-[1.01]">
                    <Image
                      src="/images/ghritkalash-jar.jpg"
                      alt="Ghritkalash Pure A2 Cow Ghee Jar on rustic wood with golden bowl"
                      width={600}
                      height={800}
                      priority
                      className="w-full h-auto object-cover rounded-2xl"
                    />

                    {/* Floating Quality Pill */}
                    <div className="absolute top-4 right-4 bg-[#113123]/95 backdrop-blur-md text-[#f8e7b9] px-3.5 py-2 rounded-2xl border border-[#e4a938]/40 shadow-xl flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#48c774] animate-ping" />
                      <span className="text-[11px] font-bold tracking-wider uppercase">
                        100% Vedic Bilona
                      </span>
                    </div>

                    {/* Floating Bottom Card */}
                    <div className="absolute bottom-4 inset-x-4 bg-[#113123]/90 backdrop-blur-md text-white px-4 py-3 rounded-2xl border border-white/20 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#f7cb68]">Starting at ₹944</span>
                          <span className="text-xs text-[#b8cdbf] line-through">₹1,800</span>
                        </div>
                        <p className="text-[11px] text-[#d1dfd6]">500 ml Glass Jar &bull; 48% OFF</p>
                      </div>
                      <button
                        onClick={scrollToShop}
                        className="px-4 py-2 rounded-xl bg-[#e4a938] text-[#122b1c] text-xs font-bold uppercase tracking-wider hover:bg-[#ffd67a] transition-colors flex items-center gap-1 shadow-md"
                      >
                        <span>Select Size</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: WHY CHOOSE GHRITKALASH? ───────────────────────────────── */}
        <section id="why-a2" className="py-16 sm:py-20 bg-[#f7f4ec] border-y border-[#ece3d2]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-12 h-px bg-[#cbb898]" />
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#c78d24]">
                <polygon points="12 2 15 8 22 9 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9 9 8" />
              </svg>
              <span className="w-12 h-px bg-[#cbb898]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#23180d] font-semibold tracking-tight">
              Why Choose GHRITKALASH?
            </h2>
            <p className="text-[#695c4d] text-sm sm:text-base max-w-xl mx-auto mt-2">
              Honoring thousands of years of Vedic traditions to deliver pure unadulterated goodness.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-center">
              <div className="bg-white/80 p-6 rounded-2xl border border-[#ebdcc4] shadow-sm hover:shadow-md transition-all group">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#e8f1eb] border border-[#cbdcd0] flex items-center justify-center text-[#17422c] mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
                    <path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7c5 0 7 7 7 7s-2 7-7 7Z" />
                    <path d="M11 20V6" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#23180d] mb-1">Pure A2 Cow Milk</h3>
                <p className="text-xs sm:text-sm text-[#665a4c] leading-relaxed">
                  Sourced from healthy, indigenous Indian cows freely grazing on open pastures.
                </p>
              </div>

              <div className="bg-white/80 p-6 rounded-2xl border border-[#ebdcc4] shadow-sm hover:shadow-md transition-all group">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#e8f1eb] border border-[#cbdcd0] flex items-center justify-center text-[#17422c] mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <ellipse cx="12" cy="16" rx="6" ry="3" />
                    <path d="M6 16c0 3 2.7 5 6 5s6-2 6-5" />
                    <path d="M8 8h8" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#23180d] mb-1">Traditional Bilona Method</h3>
                <p className="text-xs sm:text-sm text-[#665a4c] leading-relaxed">
                  Prepared using age-old Vedic hand-churning techniques from naturally cultured curd.
                </p>
              </div>

              <div className="bg-white/80 p-6 rounded-2xl border border-[#ebdcc4] shadow-sm hover:shadow-md transition-all group">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#e8f1eb] border border-[#cbdcd0] flex items-center justify-center text-[#17422c] mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <FlaskConical className="w-7 h-7 text-[#17422c]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#23180d] mb-1">Lab-Tested &amp; Certified</h3>
                <p className="text-xs sm:text-sm text-[#665a4c] leading-relaxed">
                  Strict laboratory verification ensures 100% purity, zero preservatives, and superior nutrition.
                </p>
              </div>

              <div className="bg-white/80 p-6 rounded-2xl border border-[#ebdcc4] shadow-sm hover:shadow-md transition-all group">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#e8f1eb] border border-[#cbdcd0] flex items-center justify-center text-[#17422c] mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <Heart className="w-7 h-7 text-[#17422c]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#23180d] mb-1">Rich In Nutrition</h3>
                <p className="text-xs sm:text-sm text-[#665a4c] leading-relaxed">
                  Packed with natural butyric acid, fat-soluble vitamins, and holistic wellness benefits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: THE BILONA DIFFERENCE ─────────────────────────────────── */}
        <section id="bilona-process" className="py-16 sm:py-24 bg-[#fcfaf5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0f2c1f] rounded-3xl overflow-hidden shadow-2xl border border-[#1d4c36] text-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full">
                  <Image
                    src="/images/bilona-churning.jpg"
                    alt="Authentic traditional Bilona churning in clay pot with makhan froth"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2c1f] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f2c1f]" />
                  <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-xs">
                    <span className="text-[#f6c867] font-semibold">Vedic Churning:</span> Hand-churned Curd
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold tracking-[0.25em] text-[#e3a938] uppercase">
                      THE BILONA DIFFERENCE
                    </span>
                    <div className="w-8 h-px bg-[#e3a938]/60" />
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#fcf9f2] mb-4">
                    A Time-Tested Process For Pure Ghee
                  </h2>

                  <p className="text-sm sm:text-base text-[#d1dfd6] leading-relaxed mb-8 max-w-xl">
                    Our ghee is made using the traditional Bilona method, where whole cultured curd is hand-churned
                    with a wooden churner to obtain pure makhan (butter), which is then slowly simmered over low flame
                    to produce golden, aromatic ghee with maximum nutritional value.
                  </p>

                  <div className="mb-8">
                    <button
                      onClick={() => setProcessModalOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#f6d483] border border-[#e3a938]/60 hover:bg-[#e3a938]/10 transition-all"
                    >
                      <span>Know The 5-Step Process</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#e3a938]" />
                    </button>
                  </div>

                  <div className="space-y-4 relative">
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#25523a]" />

                    {[
                      { step: "1. Fresh A2 Milk", desc: "From healthy, grass-fed indigenous cows", img: "/images/cow-and-calf.jpg" },
                      { step: "2. Curd Preparation", desc: "Naturally fermented overnight in earthen pots", img: "/images/bilona-churning.jpg" },
                      { step: "3. Hand Churning (Bilona)", desc: "Bi-directional churning to extract pure butter (makhan)", img: "/images/danedar-texture.jpg" },
                      { step: "4. Slow Simmering", desc: "Simmered over low flame into golden, aromatic ghee", img: "/images/golden-colour.jpg" },
                    ].map((s) => (
                      <div key={s.step} className="flex items-center gap-4 relative z-10 group">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#e3a938] shrink-0 shadow-md">
                          <Image src={s.img} alt={s.step} width={48} height={48} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#fcf9f2]">{s.step}</h4>
                          <p className="text-xs text-[#b8cdbf]">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: ECOMMERCE PRODUCTS CATALOG ───────────────────────────── */}
        <section id="shop" className="py-16 sm:py-24 bg-[#f9f6ef] border-y border-[#ece3d2]/80 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-8 h-px bg-[#a86e1a]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#a86e1a] uppercase">
                  OUR OFFERINGS
                </span>
                <span className="w-8 h-px bg-[#a86e1a]" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#23180d] font-bold tracking-tight">
                Pure A2 Bilona Cow Ghee
              </h2>
              <p className="text-sm sm:text-base text-[#6b5c4d] mt-2">
                Handcrafted in small batches with uncompromising Vedic purity. Choose your jar size below.
              </p>
            </div>

            {/* Product Cards Grid — Scalable for multiple products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center max-w-5xl mx-auto">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="w-full">
                  <ProductCard product={product} />
                </div>
              ))}

              {/* Product Feature Highlights card alongside the product */}
              <div className="md:col-span-1 lg:col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#ebdcc4] shadow-sm hover:shadow-md transition-shadow group">
                  <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                    <Image
                      src="/images/golden-colour.jpg"
                      alt="Rich Golden Colour of Pure Ghee"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#23180d]">Rich Golden Colour</h4>
                  <p className="text-[11px] text-[#736657]">Naturally golden, free from dyes</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#ebdcc4] shadow-sm hover:shadow-md transition-shadow group">
                  <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                    <Image
                      src="/images/danedar-texture.jpg"
                      alt="Danedar Granular Texture of Vedic Ghee"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#23180d]">Danedar Texture</h4>
                  <p className="text-[11px] text-[#736657]">A hallmark of authentic Bilona ghee</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#ebdcc4] shadow-sm hover:shadow-md transition-shadow group">
                  <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                    <Image
                      src="/images/enhances-taste.jpg"
                      alt="Enhances Taste on hot food"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#23180d]">Enhances Taste</h4>
                  <p className="text-[11px] text-[#736657]">Adds divine aroma to daily dishes</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#ebdcc4] shadow-sm hover:shadow-md transition-shadow group">
                  <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                    <Image
                      src="/images/multipurpose-use.jpg"
                      alt="Multipurpose Use in cooking and ayurveda"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#23180d]">Multipurpose Use</h4>
                  <p className="text-[11px] text-[#736657]">Cooking, baking &amp; Ayurvedic remedies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anchor alias for #product */}
        <div id="product" className="sr-only" aria-hidden="true" />

        {/* ── SECTION 5: AYURVEDIC BENEFITS ───────────────────────────────────── */}
        <section id="benefits" className="py-16 sm:py-24 bg-[#fcfaf5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#23180d] font-semibold tracking-tight">
                Goodness For A Healthier You
              </h2>
              <p className="text-[#695c4d] text-sm sm:text-base max-w-xl mx-auto mt-2">
                Packed with natural vitamins A, D, E, K, Omega-3 fatty acids, and butyric acid.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { icon: <Shield className="w-6 h-6 text-[#18422d]" />, label: "Boosts Immunity" },
                  { icon: <Activity className="w-6 h-6 text-[#18422d]" />, label: "Improves Digestion" },
                  { icon: <Brain className="w-6 h-6 text-[#18422d]" />, label: "Supports Brain Health" },
                  { icon: <Droplet className="w-6 h-6 text-[#18422d]" />, label: "Rich In Healthy Fats" },
                  { icon: <Bone className="w-6 h-6 text-[#18422d]" />, label: "Good For Bone Health" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-[#ebdcc4] shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#eef5f0] border border-[#d2e5d7] flex items-center justify-center text-[#18422d] mb-3 shadow-inner">
                      {b.icon}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#23180d] leading-snug">
                      {b.label}
                    </h4>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 relative rounded-3xl overflow-hidden shadow-xl border-4 border-white/90 bg-white">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/cow-and-calf.jpg"
                    alt="Mother Indian Gir cow and calf grazing peacefully in nature"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center bg-gradient-to-r from-[#f7f2e4] to-[#fbf9f4] border-t border-[#ebdcc4]">
                  <p className="font-heading italic text-lg sm:text-xl text-[#23180d] font-semibold">
                    &ldquo;Nature&apos;s Goodness In Every Drop&rdquo;
                  </p>
                  <p className="text-[11px] text-[#736657] uppercase tracking-wider mt-0.5">
                    Revered Indigenous Indian Gir Breed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: CUSTOMER REVIEWS ─────────────────────────────────────── */}
        <section id="reviews" className="py-16 sm:py-24 bg-[#f8f5ed] border-y border-[#ece3d2]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#23180d] font-semibold tracking-tight">
                What Our Customers Say
              </h2>
              <p className="text-[#695c4d] text-sm sm:text-base max-w-xl mx-auto mt-2">
                Loved by families and Ayurveda enthusiasts across India.
              </p>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((offset) => {
                  const item = REVIEWS[(activeReviewIndex + offset) % REVIEWS.length];
                  return (
                    <div
                      key={offset}
                      className="bg-white p-6 sm:p-7 rounded-2xl border border-[#ebdcc4] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-[#e4a938] mb-3">
                          {[...Array(item.stars)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current text-[#e4a938]" />
                          ))}
                        </div>
                        <p className="text-sm text-[#483e33] italic leading-relaxed mb-4">
                          &ldquo;{item.text}&rdquo;
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#f2e7d5] flex items-center justify-between">
                        <span className="font-semibold text-xs sm:text-sm text-[#23180d]">
                          — {item.author}
                        </span>
                        <span className="text-[10px] text-[#1b432e] font-semibold bg-[#eef5f0] px-2 py-0.5 rounded-full">
                          {item.location}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={handlePrevReview}
                  aria-label="Previous review"
                  className="w-10 h-10 rounded-full bg-white border border-[#ebdcc4] flex items-center justify-center text-[#23180d] hover:bg-[#113123] hover:text-white transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1.5">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveReviewIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        i === activeReviewIndex ? "w-6 bg-[#113123]" : "w-2 bg-[#d7cbb6] hover:bg-[#a86e1a]"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextReview}
                  aria-label="Next review"
                  className="w-10 h-10 rounded-full bg-white border border-[#ebdcc4] flex items-center justify-center text-[#23180d] hover:bg-[#113123] hover:text-white transition-colors shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: SUNSET CTA BANNER ───────────────────────────────────── */}
        <section className="relative overflow-hidden py-16 sm:py-24 text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/footer-sunset.jpg"
              alt="Golden sunset over cows grazing in lush green pastures"
              fill
              sizes="100vw"
              className="object-cover object-center filter brightness-75 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/80" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbf8f2]">
                  Bring Home The Purity Of Tradition
                </h2>
                <p className="text-base sm:text-lg text-[#ded3c3] max-w-2xl font-light leading-relaxed">
                  GHRITKALASH Pure A2 Cow Ghee — a gift of health, exquisite taste,
                  and sacred Vedic tradition for you and your family.
                </p>

                <div className="pt-3 flex flex-wrap gap-4">
                  <button
                    onClick={scrollToShop}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider btn-amazon-primary group"
                  >
                    <ShoppingBag className="w-5 h-5 text-[#e3a938]" />
                    <span>Shop Pure Ghee</span>
                  </button>

                  <button
                    onClick={() => setCartOpen(true)}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all backdrop-blur-sm"
                  >
                    <span>View Cart</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 flex items-center justify-center lg:justify-end gap-3 sm:gap-4">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7c5 0 7 7 7 7s-2 7-7 7Z" />
                        <path d="M11 20V6" />
                      </svg>
                    ),
                    label: "Pure",
                  },
                  { icon: <Heart className="w-5 h-5 text-[#f8e7b9]" />, label: "Nutritious" },
                  { icon: <Shield className="w-5 h-5 text-[#f8e7b9]" />, label: "Trusted" },
                  { icon: <Sparkles className="w-5 h-5 text-[#f8e7b9]" />, label: "Traditional" },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center text-[#f8e7b9] mb-1.5 shadow-md">
                      {b.icon}
                    </div>
                    <span className="text-[11px] font-semibold text-[#f8e7b9] uppercase tracking-wider">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onHelpClick={handleHelpClick} />
    </div>
  );
}
