/**
 * GHRITKALASH Product Catalogue
 * Data sourced directly from the product label and brand assets.
 */

export const PRODUCTS = [
  {
    id: "ghritkalash-a2-cow-ghee",
    name: "GHRITKALASH A2 Cow Ghee",
    subtitle: "Bilona | Handcrafted | Pure",
    shortName: "A2 Cow Ghee",
    tagline: "Pure. Traditional. Trusted.",
    brand: "GHRITKALASH",
    manufacturer: "GHRITKALASH ENTERPRISES",
    address: "Nanded City, Sinhagad Road, Pune – 411041, Maharashtra",
    phone: "+91 983 596 0873",
    email: "ravi.shaurya1983@gmail.com",
    ingredient: "Pure desi cow milk fat",
    biologicalSource: "Desi Cow (A2 Milk)",
    itemForm: "Granular (Danedar) / Liquid",
    flavor: "Unsalted",
    allergenInfo: "Contains Milk",
    storage: "Do not refrigerate. Store in a cool & dry place.",
    countryOfOrigin: "India",
    rating: 4.8,
    reviewsCount: 142,
    image: "/images/gk-jar-front.jpg",
    heroImage: "/images/gk-hero-banner.jpg",
    nutritionImage: "/images/gk-jar-nutrition.jpg",
    heritageImage: "/images/gk-jar-heritage.jpg",
    lifestyleImage: "/images/gk-lifestyle.jpg",
    description:
      "Rooted in ancient Indian traditions, GHRITKALASH is crafted using the revered Bilona process where curd is hand-churned into makhan and slowly simmered to create rich, aromatic golden ghee. Preserving purity since generations.",
    keyHighlights: [
      "Made from pure Desi Cow A2 Milk",
      "Bilona hand-churned the traditional way",
      "60+ parameters tested for purity",
      "Rich aroma, granular Danedar texture",
      "Premium glass jar — zero plastic contact",
    ],
    variants: [
      {
        id: "gk-500ml",
        size: "500 ml",
        label: "500 ml Glass Jar",
        mrp: 1250,
        price: 944,
        unitPrice: "₹188.80 / 100 ml",
        netWeight: "452 g",
        inStock: true,
      },
      {
        id: "gk-1ltr",
        size: "1 Litre",
        label: "1 Litre Glass Jar",
        mrp: 2500,
        price: 1777,
        unitPrice: "₹177.70 / 100 ml",
        netWeight: "904 g",
        inStock: true,
      },
    ],
    nutrition: [
      { label: "Energy (Kcal)", value: "898.56" },
      { label: "Protein (g)", value: "0" },
      { label: "Carbohydrate (g)", value: "0" },
      { label: "Total sugar (g)", value: "0" },
      { label: "Added sugar (g)", value: "0" },
      { label: "Total Fat (g)", value: "99.84" },
      { label: "Saturated Fat (g)", value: "68.81" },
      { label: "Trans Fat (g)", value: "0" },
      { label: "PUFA (g)", value: "2.60" },
      { label: "MUFA (g)", value: "27.08" },
      { label: "Omega 3 (g)", value: "0.899" },
      { label: "Omega 6 (g)", value: "1.631" },
      { label: "Cholesterol (mg)", value: "162.41" },
      { label: "Sodium (mg)", value: "0" },
      { label: "Butyric Acid", value: "2.132" },
    ],
  },
];

export function getDiscountPercent(mrp, price) {
  if (!mrp || !price || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function formatINR(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
