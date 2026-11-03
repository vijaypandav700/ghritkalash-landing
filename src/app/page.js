"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Info,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import Toast from "@/components/ui/Toast";
import BilonaModal from "@/components/BilonaModal";
import { PRODUCTS, formatINR, getDiscountPercent } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import {
  DesiCowIcon,
  BilonaChurnIcon,
  DanedarGheeIcon,
  PuritySealIcon,
  GlassJarIcon,
  SingleIngredientIcon,
  SlowFlameIcon,
  CurdPotIcon,
} from "@/components/ui/Icons";

const PRODUCT = PRODUCTS[0];

const GALLERY_ITEMS = [
  {
    src: PRODUCT.image,
    label: "Front Jar",
    caption: "GHRITKALASH Pure A2 Desi Cow Ghee – 500 ml / 1 Litre Glass Jar",
    tag: "Authentic Jar",
  },
  {
    src: PRODUCT.heroImage,
    label: "Tradition & Craft",
    caption: "Bring Home The Richness of Tradition – Bilona Handcrafted Ghee",
    tag: "Brand Craft",
  },
  {
    src: PRODUCT.nutritionImage,
    label: "Nutrition Label",
    caption: "Nutritional Information – Tested for 15 Parameters (99.84g Pure Fat)",
    tag: "Certified Label",
  },
  {
    src: PRODUCT.heritageImage,
    label: "Our Heritage",
    caption: "Rooted in Ancient Traditions – GHRITKALASH ENTERPRISES, Pune",
    tag: "Brand Story",
  },
  {
    src: PRODUCT.lifestyleImage,
    label: "Danedar Texture",
    caption: "A Golden Standard of Simplicity – Granular Danedar Texture",
    tag: "Pure Texture",
  },
];

const BILONA_STEPS = [
  {
    step: "01",
    title: "Pure A2 Desi Cow Milk",
    desc: "Sourced from indigenous Desi cows grazing on natural pastures, free of A1 beta-casein.",
    icon: <DesiCowIcon className="w-6 h-6 text-[#0b3b24]" />,
  },
  {
    step: "02",
    title: "Cultured into Curd",
    desc: "Fresh whole milk is gently boiled and naturally cultured overnight into rich, thick curd.",
    icon: <CurdPotIcon className="w-6 h-6 text-[#0b3b24]" />,
  },
  {
    step: "03",
    title: "Two-Way Bilona Churning",
    desc: "Curd is traditionally hand-churned bidirectionally with a wooden churner (Mathani) to extract makkhan.",
    icon: <BilonaChurnIcon className="w-6 h-6 text-[#0b3b24]" />,
  },
  {
    step: "04",
    title: "Fresh Makkhan Separated",
    desc: "Pure white cultured butter (makkhan) is carefully skimmed away from probiotic buttermilk.",
    icon: <SingleIngredientIcon className="w-6 h-6 text-[#0b3b24]" />,
  },
  {
    step: "05",
    title: "Slow Simmered to Gold",
    desc: "Makkhan is gently heated on low flame until golden, aromatic, granular Danedar Ghee crystallizes.",
    icon: <SlowFlameIcon className="w-6 h-6 text-[#0b3b24]" />,
  },
];

const BRAND_PILLARS = [
  {
    icon: <DesiCowIcon className="w-6 h-6 text-[#0b3b24]" />,
    title: "100% Pure A2 Cow Milk",
    desc: "Pure desi cow milk fat. No adulteration, no artificial colour, no preservatives.",
  },
  {
    icon: <BilonaChurnIcon className="w-6 h-6 text-[#0b3b24]" />,
    title: "Traditional Bilona Method",
    desc: "Handcrafted from curd — never direct industrial cream — preserving vital enzymes.",
  },
  {
    icon: <PuritySealIcon className="w-6 h-6 text-[#0b3b24]" />,
    title: "60+ Parameters Tested",
    desc: "Strictly tested in accredited food laboratories for purity, safety, and nutritional profile.",
  },
  {
    icon: <GlassJarIcon className="w-6 h-6 text-[#0b3b24]" />,
    title: "Zero-Plastic Glass Jar",
    desc: "Packed in premium airtight food-grade glass jars to preserve taste, aroma, and nutrients.",
  },
];

const CUSTOMER_REVIEWS = [
  {
    stars: 5,
    title: "Authentic Danedar Texture & Real Aroma",
    text: "The Danedar granular texture is immediately apparent the moment you open the lid. The aroma reminds me of authentic village-churned bilona ghee from childhood. Melted over hot rotis and dal, the flavor is deeply rich and comforting.",
    author: "Arvind K.",
    location: "Jaipur, Rajasthan",
    initials: "AK",
  },
  {
    stars: 5,
    title: "Best Ghee for Family Cooking & Children",
    text: "We switched to GHRITKALASH for daily cooking six months ago. It is light, easy to digest, and adds a natural golden aroma to our food. Knowing it is cultured from curd with zero additives gives our family total peace of mind.",
    author: "Pooja S.",
    location: "Pune, Maharashtra",
    initials: "PS",
  },
  {
    stars: 5,
    title: "Pristine Glass Packaging & Secure Delivery",
    text: "The glass jar arrived intact in sturdy protective packaging. Glass makes a tremendous difference compared to plastic containers because there is zero chemical smell. The 1 Litre jar is excellent value for everyday home use.",
    author: "Meera P.",
    location: "Ahmedabad, Gujarat",
    initials: "MP",
  },
  {
    stars: 5,
    title: "Pure Unsalted Ghee with Rich Golden Color",
    text: "You can tell genuine Bilona ghee by how cleanly it melts without leaving a sticky or oily residue on your palate. The natural nutty fragrance and golden hue prove this is true handcrafted ghee.",
    author: "Rajeshwar R.",
    location: "Bengaluru, Karnataka",
    initials: "RR",
  },
];

const FAQS = [
  {
    q: "What makes GHRITKALASH A2 Cow Ghee different from commercial ghee?",
    a: "Commercial ghee is made by skimming cream directly from mixed milk and boiling it at high temperatures. In contrast, GHRITKALASH follows the traditional Vedic Bilona method: fresh A2 Desi cow milk is first cultured into curd, hand-churned with a wooden churner (Mathani) to extract makkhan, and then slow-simmered on low flame into golden, granular Danedar Ghee. This preserves vital fatty acids like butyric acid and natural fat-soluble vitamins.",
  },
  {
    q: "Why is A2 milk from indigenous Desi cows better?",
    a: "Desi cows produce only the A2 beta-casein protein variant, which is easily recognized and broken down by human digestive enzymes. A1 milk from crossbred cows contains a peptide that can cause digestive distress and bloating. GHRITKALASH sources exclusively from indigenous Desi cows.",
  },
  {
    q: "What is Danedar texture and why is it important?",
    a: "Danedar (granular) texture is the natural crystalline structure that forms when pure ghee cools slowly after gentle simmering. It is the hallmark of genuine Bilona ghee. Industrial and adulterated vegetable-fat ghees lack this natural crystalline texture.",
  },
  {
    q: "How should I store GHRITKALASH Ghee?",
    a: "Store the glass jar at room temperature in a cool, dry place away from direct sunlight and humidity. Do not refrigerate. Ghee has a naturally long shelf life. Always use a clean, dry stainless steel or wooden spoon.",
  },
  {
    q: "What are the ingredients and allergen details?",
    a: "Single ingredient: 100% Pure Desi Cow Milk Fat. Contains no artificial colors, preservatives, or added salt. Allergen warning: Contains Milk.",
  },
  {
    q: "What are the recommended culinary and daily uses?",
    a: "Ideal for everyday cooking, tempering (tadka), drizzling over hot dal, khichdi, roti, and rice. Excellent for traditional festive sweets and Ayurveda practices like having a warm spoonful on an empty stomach.",
  },
];

export default function Home() {
  const { setIsOpen: setCartOpen, addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(PRODUCT.variants[0]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [bilonaModalOpen, setBilonaModalOpen] = useState(false);

  const discount = getDiscountPercent(selectedVariant.mrp, selectedVariant.price);

  const handleAddToCart = () => {
    addItem(PRODUCT, selectedVariant);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      setCartOpen(true);
    }, 600);
  };

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#221c16]">
      <Navbar onOrderClick={scrollToOrder} />
      <CartSidebar />
      <Toast />
      <BilonaModal
        isOpen={bilonaModalOpen}
        onClose={() => setBilonaModalOpen(false)}
        onShopNow={scrollToOrder}
      />

      <main className="flex-1">

        {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
        <section className="relative bg-gradient-to-b from-[#fdf7e9] via-[#fbf8f0] to-[#f7f2e4] border-b border-[#e8d8be] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* Left Column – Brand Story & Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef7f1] border border-[#cbe4d4] text-[#0b3b24] text-xs font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-[#0b3b24]" />
                  <span>Traditional Bilona · Pure A2 Cow Ghee</span>
                </div>

                {/* Main Heading */}
                <div>
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0c2f1e] leading-[1.1] tracking-tight">
                    Bring Home
                    <br />
                    The Richness{" "}
                    <span className="text-[#b58718] italic font-normal">of Pure Tradition</span>
                  </h1>
                </div>

                {/* Subtitle / Description */}
                <p className="text-base sm:text-lg text-[#554737] leading-relaxed max-w-xl">
                  Crafted using the revered Vedic Bilona method — cultured from pure desi cow milk curd,
                  hand-churned with a wooden bilona to extract fresh makkhan, and gently slow-simmered
                  into golden, aromatic Danedar Ghee.
                </p>

                {/* 4 Bespoke Trust Icons (No random emojis, authentic SVGs) */}
                <div className="grid grid-cols-2 gap-3.5 pt-2 max-w-lg">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-[#eddcc4] shadow-xs">
                    <div className="p-2 rounded-lg bg-[#eef7f1] text-[#0b3b24] shrink-0">
                      <DesiCowIcon className="w-5 h-5 text-[#0b3b24]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0c2f1e]">100% Pure A2 Milk</p>
                      <p className="text-[11px] text-[#71614f]">Indigenous Desi Cows</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-[#eddcc4] shadow-xs">
                    <div className="p-2 rounded-lg bg-[#eef7f1] text-[#0b3b24] shrink-0">
                      <BilonaChurnIcon className="w-5 h-5 text-[#0b3b24]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0c2f1e]">Traditional Bilona</p>
                      <p className="text-[11px] text-[#71614f]">Hand-churned from curd</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-[#eddcc4] shadow-xs">
                    <div className="p-2 rounded-lg bg-[#eef7f1] text-[#0b3b24] shrink-0">
                      <PuritySealIcon className="w-5 h-5 text-[#0b3b24]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0c2f1e]">60+ Tested</p>
                      <p className="text-[11px] text-[#71614f]">Lab-verified purity</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-[#eddcc4] shadow-xs">
                    <div className="p-2 rounded-lg bg-[#eef7f1] text-[#0b3b24] shrink-0">
                      <GlassJarIcon className="w-5 h-5 text-[#0b3b24]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0c2f1e]">Premium Glass Jar</p>
                      <p className="text-[11px] text-[#71614f]">Zero plastic contact</p>
                    </div>
                  </div>
                </div>

                {/* Pricing & CTA Buttons */}
                <div className="pt-3 space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-[#0b3b24]">
                      {formatINR(PRODUCT.variants[0].price)}
                    </span>
                    <span className="text-lg text-[#998771] line-through">
                      {formatINR(PRODUCT.variants[0].mrp)}
                    </span>
                    <span className="text-xs font-bold text-[#09733c] bg-[#e6f4ea] px-3 py-1 rounded-full border border-[#bfe2cb]">
                      Save {getDiscountPercent(PRODUCT.variants[0].mrp, PRODUCT.variants[0].price)}% OFF
                    </span>
                  </div>

                  <p className="text-xs text-[#6e5e4d]">
                    500 ml Glass Jar · Net Wt: 452 g · Free express delivery across India
                  </p>

                  <div className="flex items-center gap-3.5 flex-wrap">
                    <button
                      onClick={scrollToOrder}
                      className="btn-anveshan-primary px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#ffd978]" />
                      <span>Order Pure Ghee</span>
                    </button>

                    <button
                      onClick={() => setBilonaModalOpen(true)}
                      className="px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider border-2 border-[#0b3b24] text-[#0b3b24] hover:bg-[#0b3b24] hover:text-white transition-all flex items-center gap-2"
                    >
                      <Info className="w-4 h-4" />
                      <span>How It's Made</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column – Authentic Product Jar Display (NO CROPPING) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[460px]">
                  
                  {/* Subtle warm glow behind container */}
                  <div className="absolute inset-0 bg-[#e8a723]/15 rounded-3xl blur-2xl transform scale-95 -z-10" />

                  {/* Pristine Product Showcase Card */}
                  <div className="bg-[#fcfaf4] rounded-3xl border border-[#ebdcc4] shadow-[0_12px_40px_rgba(20,40,25,0.08)] p-6 sm:p-8 flex flex-col items-center">
                    
                    {/* Top Badges */}
                    <div className="w-full flex items-center justify-between mb-4">
                      <span className="bg-[#0b3b24] text-[#f7e2a9] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-[#d4af37]/40 shadow-xs flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#ffd978]" />
                        <span>A2 Desi Cow Ghee</span>
                      </span>
                      <span className="bg-[#f6efe1] text-[#7d5e18] border border-[#e4d4b7] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Glass Jar
                      </span>
                    </div>

                    {/* Image Container with strict aspect-square and object-contain so NO CROPPING occurs */}
                    <div className="relative w-full aspect-square max-h-[360px] bg-white rounded-2xl border border-[#f0e4d2] p-4 flex items-center justify-center overflow-hidden">
                      <Image
                        src={PRODUCT.image}
                        alt="GHRITKALASH Pure A2 Desi Cow Ghee – Glass Jar Front"
                        fill
                        priority
                        className="object-contain p-3"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                      />
                    </div>

                    {/* Jar Sub-Caption */}
                    <div className="w-full mt-4 text-center">
                      <p className="font-serif text-lg font-bold text-[#0c2f1e]">GHRITKALASH A2 Cow Ghee</p>
                      <p className="text-xs text-[#80641b] font-semibold mt-0.5">
                        Bilona | Handcrafted | Danedar | 100% Desi Cow Fat
                      </p>
                      <div className="mt-3 pt-3 border-t border-[#f0e4d2] flex items-center justify-between text-xs text-[#6e5e4d]">
                        <span>Sizes: 500 ml &bull; 1 Litre</span>
                        <button
                          onClick={scrollToOrder}
                          className="text-[#0b3b24] font-bold hover:underline flex items-center gap-1"
                        >
                          <span>Select Size</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. CLEAN STATIONARY TRUST BAR (NO RUNNING TICKER IN MIDDLE) ─── */}
        <section className="bg-white border-b border-[#e8d8be] py-7">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {BRAND_PILLARS.map((p, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#edf5f0] border border-[#c4dece] flex items-center justify-center shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#0c2f1e] leading-snug">{p.title}</h3>
                    <p className="text-[11.5px] text-[#695a4a] leading-relaxed mt-1">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. PRODUCT ORDER & INTERACTIVE IMAGE GALLERY SECTION ─────────── */}
        <section id="order" className="py-16 sm:py-24 bg-[#faf7f0] scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-10">
              <span className="text-[11px] font-bold text-[#b58718] uppercase tracking-[0.25em]">
                Authentic Artisanal Ghee
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0c2f1e] font-bold mt-1">
                Order GHRITKALASH Pure Ghee
              </h2>
              <p className="text-xs sm:text-sm text-[#665747] mt-2 max-w-xl mx-auto">
                Select your preferred size. Dispatched directly in shatter-safe glass jar packaging.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start bg-white rounded-3xl p-6 sm:p-10 border border-[#ebdcc4] shadow-sm">

              {/* Left Column – Interactive Image Gallery (Thumbnails work instantly!) */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Main Large Display with Previous / Next Arrows */}
                <div className="relative aspect-square rounded-2xl bg-[#faf7ef] border border-[#ebdcc4] overflow-hidden group shadow-inner">
                  
                  <Image
                    src={GALLERY_ITEMS[activeImageIdx].src}
                    alt={GALLERY_ITEMS[activeImageIdx].caption}
                    fill
                    className="object-contain p-6 sm:p-8 transition-opacity duration-300"
                    sizes="(max-width: 1024px) 100vw, 550px"
                    priority
                  />

                  {/* Active view tag badge */}
                  <div className="absolute top-3 left-3 bg-[#0b3b24]/90 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-xs shadow-xs">
                    {GALLERY_ITEMS[activeImageIdx].tag}
                  </div>

                  {/* Counter badge */}
                  <div className="absolute top-3 right-3 bg-white/90 text-[#3a3024] text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-[#e5d5be] shadow-xs">
                    {activeImageIdx + 1} / {GALLERY_ITEMS.length}
                  </div>

                  {/* Previous / Next Arrow Controls */}
                  <button
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0b3b24] flex items-center justify-center border border-[#ebdcc4] shadow-md transition-transform active:scale-90"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0b3b24] flex items-center justify-center border border-[#ebdcc4] shadow-md transition-transform active:scale-90"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Image caption strip */}
                  <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs py-2 px-4 border-t border-[#ebdcc4] text-center">
                    <p className="text-[11px] font-semibold text-[#44382c] line-clamp-1">
                      {GALLERY_ITEMS[activeImageIdx].caption}
                    </p>
                  </div>
                </div>

                {/* 5 Thumbnails Row – Clicking switches main image! */}
                <div className="grid grid-cols-5 gap-2.5">
                  {GALLERY_ITEMS.map((item, idx) => {
                    const isSelected = activeImageIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        className={`aspect-square rounded-xl overflow-hidden relative transition-all duration-200 border-2 ${
                          isSelected
                            ? "border-[#0b3b24] ring-2 ring-[#0b3b24]/20 shadow-md bg-white scale-[1.03]"
                            : "border-[#e5d5be] bg-[#faf7ef] opacity-75 hover:opacity-100 hover:border-[#b58718]"
                        }`}
                        aria-label={`View ${item.label}`}
                      >
                        <Image
                          src={item.src}
                          alt={item.label}
                          fill
                          className="object-contain p-1"
                          sizes="15vw"
                        />
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-center text-[#7a6b5a] pt-1">
                  Click any thumbnail to inspect jar front, nutrition label, heritage details &amp; texture.
                </p>
              </div>

              {/* Right Column – Product Configuration & Order Action */}
              <div className="lg:col-span-6 space-y-6">

                {/* Star Rating & Verified Reviews */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-[#fff8e8] px-2.5 py-1 rounded-md border border-[#f5dc9e]">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#e8a723] text-[#e8a723]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#2a2016] ml-1">4.8</span>
                  </div>
                  <span className="text-xs text-[#71614f]">({PRODUCT.reviewsCount} verified customer reviews)</span>
                </div>

                {/* Name & Subtitle */}
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0c2f1e] leading-snug">
                    {PRODUCT.name}
                  </h3>
                  <p className="text-xs font-bold text-[#b58718] uppercase tracking-wider mt-1">
                    {PRODUCT.subtitle} &bull; Danedar Granular Texture
                  </p>
                </div>

                {/* Tabs: Description / Highlights / Nutrition / Storage */}
                <div className="border-b border-[#e8d8be]">
                  <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-px">
                    {[
                      { id: "description", label: "Description" },
                      { id: "highlights", label: "Highlights" },
                      { id: "nutrition", label: "Nutritional Facts" },
                      { id: "storage", label: "Storage & Usage" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-2.5 text-xs sm:text-sm font-bold capitalize transition-colors whitespace-nowrap border-b-2 ${
                          activeTab === tab.id
                            ? "border-[#0b3b24] text-[#0b3b24]"
                            : "border-transparent text-[#71614f] hover:text-[#0b3b24]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Contents */}
                <div className="min-h-[110px] text-xs sm:text-sm text-[#554737] leading-relaxed">
                  {activeTab === "description" && (
                    <p>
                      {PRODUCT.description} Cultured naturally from pure A2 desi cow milk,
                      separated into makkhan via bidirectional bilona churning, and simmered slowly
                      to produce aromatic granular (Danedar) ghee with zero synthetic additives.
                    </p>
                  )}

                  {activeTab === "highlights" && (
                    <ul className="space-y-2">
                      {PRODUCT.keyHighlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2d251d]">
                          <Check className="w-4 h-4 text-[#0b3b24] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "nutrition" && (
                    <div className="space-y-2">
                      <p className="text-xs text-[#71614f]">
                        Approx. Nutritional Value per 100g &bull; Single Ingredient: {PRODUCT.ingredient}
                      </p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                        {PRODUCT.nutrition.slice(0, 8).map((n) => (
                          <div key={n.label} className="flex justify-between border-b border-[#f0e4d2] pb-1">
                            <span className="text-[#665747]">{n.label}</span>
                            <span className="font-bold text-[#0c2f1e]">{n.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "storage" && (
                    <div className="space-y-1.5 text-xs sm:text-sm">
                      <p><strong>Storage:</strong> {PRODUCT.storage}</p>
                      <p><strong>Culinary Uses:</strong> Ideal for tadka, drizzling over dal, khichdi, roti, and Ayurvedic consumption.</p>
                      <p><strong>Allergen Information:</strong> Contains Milk.</p>
                    </div>
                  )}
                </div>

                {/* Size Selector */}
                <div>
                  <p className="text-xs font-bold text-[#44382c] uppercase tracking-wider mb-2.5">
                    Select Glass Jar Size:
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {PRODUCT.variants.map((v) => {
                      const isSelected = selectedVariant.id === v.id;
                      const vDiscount = getDiscountPercent(v.mrp, v.price);
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`p-4 rounded-2xl text-left border-2 transition-all ${
                            isSelected
                              ? "border-[#0b3b24] bg-[#0b3b24] text-white shadow-md"
                              : "border-[#e5d5be] bg-[#faf7ef] text-[#2d251d] hover:border-[#0b3b24]/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs sm:text-sm font-bold">{v.label}</span>
                            <span
                              className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                                isSelected ? "bg-[#ffd978]/20 text-[#ffd978]" : "bg-[#e6f4ea] text-[#09733c]"
                              }`}
                            >
                              {vDiscount}% off
                            </span>
                          </div>

                          <div className="flex items-baseline gap-2">
                            <span className={`text-lg font-black ${isSelected ? "text-[#ffd978]" : "text-[#0b3b24]"}`}>
                              {formatINR(v.price)}
                            </span>
                            <span className={`text-xs line-through ${isSelected ? "text-[#a3cbb5]" : "text-[#998771]"}`}>
                              {formatINR(v.mrp)}
                            </span>
                          </div>

                          <div className={`text-[11px] mt-1 ${isSelected ? "text-[#c2dfce]" : "text-[#7a6b5a]"}`}>
                            Net Wt: {v.netWeight} &bull; {v.unitPrice}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Summary Row */}
                <div className="flex items-center justify-between py-3 border-t border-[#ebdcc4]">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#0b3b24]">
                        {formatINR(selectedVariant.price)}
                      </span>
                      <span className="text-base text-[#998771] line-through">
                        {formatINR(selectedVariant.mrp)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#71614f]">Inclusive of all taxes &bull; Free express shipping</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#09733c] bg-[#e6f4ea] px-2.5 py-1 rounded-md border border-[#c0e3cb]">
                      You Save {formatINR(selectedVariant.mrp - selectedVariant.price)}
                    </span>
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.98] ${
                    addedToCart ? "bg-[#09733c] text-white" : "btn-anveshan-primary"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Shopping Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#ffd978]" />
                      <span>Add to Bag · {formatINR(selectedVariant.price)}</span>
                    </>
                  )}
                </button>

                {/* Shipping & Packaging Trust info */}
                <div className="pt-2 flex items-center justify-center gap-4 text-xs text-[#71614f] text-center flex-wrap">
                  <span>🚚 Free Express Shipping</span>
                  <span>📦 Shatter-Safe Glass Packaging</span>
                  <span>🛡️ 100% Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. THE 5-STEP BILONA PROCESS SECTION ──────────────────────────── */}
        <section id="process" className="py-20 bg-white border-t border-[#e8d8be] scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[11px] font-bold text-[#b58718] uppercase tracking-[0.25em]">
                Time-Honoured Vedic Science
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0c2f1e] font-bold mt-1">
                The Authentic Bilona Method
              </h2>
              <p className="text-xs sm:text-sm text-[#665747] mt-2 max-w-xl mx-auto leading-relaxed">
                Why Bilona Ghee is cultured from curd, not cream. Five steps that transform
                pure Desi Cow milk into golden Danedar Ghee.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {BILONA_STEPS.map((s, i) => (
                <div key={i} className="text-center p-5 rounded-2xl bg-[#fcfaf5] border border-[#ebdcc4] hover:border-[#0b3b24] transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#eef7f1] border border-[#cbe4d4] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0b3b24] group-hover:text-white transition-colors">
                    {s.icon}
                  </div>
                  <span className="text-[10px] font-black text-[#b58718] uppercase tracking-widest">
                    Step {s.step}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-[#0c2f1e] mt-1 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[11.5px] text-[#695a4a] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setBilonaModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-[#0b3b24] text-[#0b3b24] hover:bg-[#0b3b24] hover:text-white transition-all"
              >
                <span>Read Complete Bilona Protocol</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ── 5. BRAND HERITAGE & ORIGIN STORY ─────────────────────────────── */}
        <section id="heritage" className="py-20 bg-[#082819] text-[#d4eadc] scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Authentic Brand Heritage Image (NO CROPPING) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden border-2 border-[#1e5839] bg-[#0c3622] shadow-2xl">
                  <Image
                    src={PRODUCT.heritageImage}
                    alt="GHRITKALASH Our Heritage – Ancient Indian Traditions"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                </div>
              </div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[11px] font-bold text-[#ffd978] uppercase tracking-[0.25em]">
                    Our Heritage &amp; Roots
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#faf5e8] leading-tight mt-1">
                    Rooted in Ancient<br />Indian Traditions
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#b8d9c6] leading-relaxed">
                  GHRITKALASH is born out of a commitment to restore authentic Vedic food traditions
                  to modern homes. Real ghee was never an industrial factory byproduct made by skimming
                  cream. It is a slow, sacred craft where curd is hand-churned into makkhan and gently clarified.
                </p>

                {/* 4 Authentic Highlights from the jar */}
                <div className="grid grid-cols-2 gap-3.5 pt-2">
                  <div className="bg-[#0f3c27] border border-[#1d5e3d] rounded-2xl p-3.5">
                    <p className="text-[10px] font-bold text-[#ffd978] uppercase tracking-wider">Manufacturer</p>
                    <p className="text-xs font-bold text-[#faf5e8] mt-0.5">{PRODUCT.manufacturer}</p>
                  </div>
                  <div className="bg-[#0f3c27] border border-[#1d5e3d] rounded-2xl p-3.5">
                    <p className="text-[10px] font-bold text-[#ffd978] uppercase tracking-wider">Origin Location</p>
                    <p className="text-xs font-bold text-[#faf5e8] mt-0.5">Sinhagad Road, Pune</p>
                  </div>
                  <div className="bg-[#0f3c27] border border-[#1d5e3d] rounded-2xl p-3.5">
                    <p className="text-[10px] font-bold text-[#ffd978] uppercase tracking-wider">Ingredient</p>
                    <p className="text-xs font-bold text-[#faf5e8] mt-0.5">Pure Desi Cow Milk Fat</p>
                  </div>
                  <div className="bg-[#0f3c27] border border-[#1d5e3d] rounded-2xl p-3.5">
                    <p className="text-[10px] font-bold text-[#ffd978] uppercase tracking-wider">Purity Check</p>
                    <p className="text-xs font-bold text-[#faf5e8] mt-0.5">60+ Safety Parameters</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={scrollToOrder}
                    className="btn-anveshan-gold px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#082417] shadow-lg flex items-center gap-2"
                  >
                    <span>Order Authentic Ghee</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. DANEDAR TEXTURE & SIMPLICITY SPOTLIGHT ──────────────────────── */}
        <section className="py-20 bg-[#faf7f0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl overflow-hidden relative aspect-[16/8] sm:aspect-[16/7] border border-[#ebdcc4] shadow-md">
              <Image
                src={PRODUCT.lifestyleImage}
                alt="GHRITKALASH – A Golden Standard of Simplicity"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#072416]/85 via-[#072416]/50 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8 sm:px-16">
                <div className="max-w-md space-y-4 text-white">
                  <span className="text-xs font-bold text-[#ffd978] uppercase tracking-[0.2em]">
                    Authentic Granular Goodness
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                    A Golden Standard<br />of Simplicity
                  </h2>
                  <p className="text-xs sm:text-sm text-[#d4eadc] leading-relaxed">
                    One single ingredient: pure desi cow milk fat. Nothing added, nothing taken away.
                    Enjoy natural crystalline Danedar texture that melts effortlessly on warm rotis.
                  </p>
                  <button
                    onClick={scrollToOrder}
                    className="btn-anveshan-gold px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#072417] inline-flex items-center gap-2"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. NUTRITIONAL INFORMATION (From Jar Back Label) ──────────────── */}
        <section id="nutrition" className="py-20 bg-white border-y border-[#e8d8be] scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[11px] font-bold text-[#b58718] uppercase tracking-[0.25em]">
                Authentic Label Data
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0c2f1e] font-bold mt-1">
                Nutritional Information
              </h2>
              <p className="text-xs sm:text-sm text-[#665747] mt-2">
                Approximate values per 100g as verified on the product package.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Nutritional Table */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#ebdcc4] shadow-xs">
                <div className="bg-[#0b3b24] text-white px-5 py-3.5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">Parameter</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Per 100g</span>
                </div>
                <div className="divide-y divide-[#f2e7d7]">
                  {PRODUCT.nutrition.map((n, i) => (
                    <div
                      key={n.label}
                      className={`flex items-center justify-between px-5 py-2.5 text-xs sm:text-sm ${
                        i % 2 === 0 ? "bg-white" : "bg-[#faf7ef]"
                      }`}
                    >
                      <span className="text-[#554737] font-medium">{n.label}</span>
                      <span className="font-bold text-[#0c2f1e]">{n.value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-[#fcfaf5] px-5 py-3 border-t border-[#ebdcc4] text-[11px] text-[#71614f]">
                  <strong>Ingredient:</strong> {PRODUCT.ingredient} &bull; <strong>Allergen:</strong> Contains Milk
                </div>
              </div>

              {/* Jar Nutrition Label Image (NO CROPPING) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[360px] aspect-square rounded-2xl overflow-hidden border border-[#ebdcc4] bg-[#faf7ef] p-4 flex items-center justify-center">
                  <Image
                    src={PRODUCT.nutritionImage}
                    alt="GHRITKALASH Nutritional Information Label"
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 1024px) 100vw, 360px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. CUSTOMER REVIEWS ───────────────────────────────────────────── */}
        <section id="reviews" className="py-20 bg-[#faf7f0] scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-[11px] font-bold text-[#b58718] uppercase tracking-[0.25em]">
                  Verified Customer Feedback
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f1e] mt-1">
                  Loved for Danedar Purity
                </h2>
              </div>

              <div className="flex items-center gap-3.5 bg-white border border-[#ebdcc4] rounded-2xl px-5 py-3 shadow-xs">
                <div>
                  <p className="text-3xl font-black text-[#0b3b24]">4.8</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#e8a723] text-[#e8a723]" />
                    ))}
                  </div>
                </div>
                <div className="pl-3.5 border-l border-[#ebdcc4]">
                  <p className="text-xs font-bold text-[#221c16]">{PRODUCT.reviewsCount} Reviews</p>
                  <p className="text-[11px] text-[#71614f]">100% Verified Buyers</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CUSTOMER_REVIEWS.map((rev, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#ebdcc4] p-6 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-1 mb-2.5">
                    {[...Array(rev.stars)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-[#e8a723] text-[#e8a723]" />
                    ))}
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#0c2f1e] mb-2">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs sm:text-sm text-[#554737] leading-relaxed">
                    {rev.text}
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#f0e4d2]">
                    <div className="w-8 h-8 rounded-full bg-[#eef7f1] border border-[#cbe4d4] flex items-center justify-center text-xs font-bold text-[#0b3b24]">
                      {rev.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#221c16]">{rev.author}</p>
                      <p className="text-[11px] text-[#71614f]">{rev.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. FREQUENTLY ASKED QUESTIONS ─────────────────────────────────── */}
        <section id="faq" className="py-20 bg-white border-t border-[#e8d8be] scroll-mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[11px] font-bold text-[#b58718] uppercase tracking-[0.25em]">
                Got Questions?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f1e] mt-1">
                Frequently Asked
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div key={idx} className="bg-[#faf7ef] rounded-2xl border border-[#ebdcc4] overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-[#221c16] hover:text-[#0b3b24] transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#0b3b24] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8a7967] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-xs sm:text-sm text-[#554737] leading-relaxed border-t border-[#f0e4d2] pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 10. DIRECT SUPPORT STRIP ──────────────────────────────────────── */}
        <section className="py-14 bg-[#fdf7e8] border-t border-[#ebdcc4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-[#0c2f1e] mb-1">
              Have Questions Before Ordering?
            </h2>
            <p className="text-xs sm:text-sm text-[#665747] mb-8">
              Speak directly with our team in Pune, Maharashtra.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href={`tel:${PRODUCT.phone}`}
                className="flex items-center gap-3 bg-white border border-[#ebdcc4] rounded-2xl px-6 py-3.5 hover:border-[#0b3b24] transition-colors group shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#0b3b24] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-[#71614f] uppercase tracking-wider">Phone Support</p>
                  <p className="text-xs font-bold text-[#0c2f1e]">{PRODUCT.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${PRODUCT.email}`}
                className="flex items-center gap-3 bg-white border border-[#ebdcc4] rounded-2xl px-6 py-3.5 hover:border-[#0b3b24] transition-colors group shadow-xs"
              >
                <Mail className="w-4 h-4 text-[#0b3b24] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-[#71614f] uppercase tracking-wider">Email Us</p>
                  <p className="text-xs font-bold text-[#0c2f1e]">{PRODUCT.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-3 bg-white border border-[#ebdcc4] rounded-2xl px-6 py-3.5 shadow-xs">
                <MapPin className="w-4 h-4 text-[#0b3b24]" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-[#71614f] uppercase tracking-wider">Facility Address</p>
                  <p className="text-xs font-bold text-[#0c2f1e]">Sinhagad Road, Pune</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* ── 11. DYNAMIC STICKY PURCHASE BAR ─────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="bg-[#072417] border-t border-[#1b5b3a] py-2.5 px-4 sm:px-8 shadow-[0_-4px_24px_rgba(0,0,0,0.35)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-[#ffd978]/40 shrink-0 bg-white">
              <Image
                src={PRODUCT.image}
                alt="GHRITKALASH A2 Cow Ghee"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">GHRITKALASH A2 Cow Ghee</p>
              <p className="text-[10.5px] text-[#ffd978]">
                {selectedVariant.label} &bull; Danedar Bilona
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right">
              <span className="text-sm sm:text-base font-black text-[#ffd978]">
                {formatINR(selectedVariant.price)}
              </span>
              <span className="text-[10px] sm:text-xs text-[#7bb894] line-through ml-1.5">
                {formatINR(selectedVariant.mrp)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-anveshan-gold px-5 sm:px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#072417]" />
              <span>{addedToCart ? "Added!" : "Order Now"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
