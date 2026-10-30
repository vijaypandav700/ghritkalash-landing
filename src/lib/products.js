/**
 * Product Catalogue
 * Single source of truth for all products.
 * Each product has variants (quantity/size options).
 */

export const PRODUCTS = [
  {
    id: "ghritkalash-a2-ghee",
    name: "GHRITKALASH Pure A2 Cow Ghee",
    shortName: "Pure A2 Cow Ghee",
    tagline: "Traditional Vedic Bilona Method",
    description:
      "Premium quality, traditionally crafted, lab-tested A2 cow ghee in a heavy glass jar to retain purity, aroma, and essential natural goodness.",
    image: "/images/ghritkalash-jar.jpg",
    badge: "Bestseller",
    category: "ghee",
    highlights: [
      "100% A2 Gir Cow Milk",
      "Hand-churned Bilona Method",
      "Lab-tested & Certified",
      "No additives or preservatives",
    ],
    variants: [
      {
        id: "ghritkalash-500ml-x1",
        label: "500 ml × 1 Jar",
        shortLabel: "1 Jar",
        sku: "GK-500ML-1",
        unit: "500 ml",
        mrp: 1800,
        price: 944,
      },
      {
        id: "ghritkalash-500ml-x2",
        label: "500 ml × 2 Jars",
        shortLabel: "2 Jars",
        sku: "GK-500ML-2",
        unit: "2 × 500 ml",
        mrp: 3600,
        price: 1777,
        tag: "Best Value",
      },
    ],
  },
];

/**
 * Calculate discount percentage from MRP and selling price
 */
export function getDiscountPercent(mrp, price) {
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Format a number as Indian currency string (₹1,234)
 */
export function formatINR(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
