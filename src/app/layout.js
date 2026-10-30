import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

// ── Fonts ─────────────────────────────────────────────────────────────────────

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata = {
  title: "GHRITKALASH Pure A2 Cow Ghee | Traditional Vedic Bilona Method",
  description:
    "Experience ancient tradition and pure golden goodness with GHRITKALASH Pure A2 Cow Ghee, hand-crafted using the Vedic Bilona method from indigenous Indian cows.",
  keywords: [
    "A2 Cow Ghee",
    "Bilona Ghee",
    "Ghritkalash",
    "Pure Desi Cow Ghee",
    "Vedic Ghee",
    "Danedar Ghee",
    "Buy A2 Ghee Online",
  ],
};

// ── Root Layout ───────────────────────────────────────────────────────────────

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="bg-[#fcfaf5] text-[#2c221a] font-sans antialiased selection:bg-[#dfb150]/30 selection:text-[#183120]">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
