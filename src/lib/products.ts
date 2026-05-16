import flower from "@/assets/plant-flower.jpg";
import fruit from "@/assets/plant-fruit.jpg";
import indoor from "@/assets/plant-indoor.jpg";
import bonsai from "@/assets/plant-bonsai.jpg";
import leaf from "@/assets/leaf-macro.jpg";
import nursery from "@/assets/nursery-aerial.jpg";
import hands from "@/assets/hands-planting.jpg";

export type Care = "easy" | "medium" | "expert";
export type Category = "fruit" | "flower" | "indoor" | "outdoor" | "bonsai" | "medicinal";

export type Product = {
  slug: string;
  bn: { name: string; cat: string; desc: string; long: string };
  en: { name: string; cat: string; desc: string; long: string };
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  care: Care;
  category: Category;
  badge?: "best" | "new" | "premium" | "sale";
  cover: string;
  gallery: string[];
  stock: number;
  height: string;
  light: { bn: string; en: string };
  water: { bn: string; en: string };
  soil: { bn: string; en: string };
};

const g = (a: string, b: string, c: string) => [a, b, c];

export const products: Product[] = [
  {
    slug: "thai-guava",
    bn: { name: "থাই পেয়ারা চারা", cat: "ফলের গাছ", desc: "উচ্চ ফলনশীল, সারাবছর ফল দেয়।", long: "থাইল্যান্ডের জনপ্রিয় কুল-জাতীয় পেয়ারা—বছরে দুইবার ফলন, মিষ্টি ও কুড়মুড়ে স্বাদ। বাড়ির ছাদ ও বাগানের জন্য আদর্শ।" },
    en: { name: "Thai Guava Sapling", cat: "Fruit Plant", desc: "High-yield, fruits year-round.", long: "Thailand's prized cultivar — sweet, crisp fruit twice a year. Perfect for rooftops and home gardens, with reliable yield from the second year." },
    price: 350, oldPrice: 450, rating: 4.9, reviews: 312, care: "easy", category: "fruit", badge: "best",
    cover: fruit, gallery: g(fruit, leaf, hands), stock: 48, height: "2–3 ft",
    light: { bn: "পূর্ণ রোদ", en: "Full sun" }, water: { bn: "সপ্তাহে ৩ বার", en: "3× weekly" }, soil: { bn: "দোআঁশ মাটি", en: "Loamy, well-drained" },
  },
  {
    slug: "double-hibiscus-crimson",
    bn: { name: "ডবল জবা — রক্তিম", cat: "ফুলের গাছ", desc: "উজ্জ্বল লাল, সারাবছর ফোটে।", long: "মখমলি পাপড়ির ডবল জবা—গ্যারান্টিড সারাবছর ফুল। বাগান, বারান্দা বা টবে চমৎকার মানিয়ে যায়।" },
    en: { name: "Double Hibiscus — Crimson", cat: "Flower Plant", desc: "Vivid red blooms all year.", long: "Velvet-petalled double hibiscus that blooms year-round. Thrives in pots, balconies and garden borders." },
    price: 280, rating: 4.8, reviews: 184, care: "easy", category: "flower",
    cover: flower, gallery: g(flower, leaf, nursery), stock: 72, height: "1.5–2 ft",
    light: { bn: "পূর্ণ রোদ", en: "Full sun" }, water: { bn: "প্রতিদিন হালকা", en: "Light daily" }, soil: { bn: "জৈবসমৃদ্ধ", en: "Organic-rich" },
  },
  {
    slug: "rubber-burgundy",
    bn: { name: "রাবার প্ল্যান্ট — বার্গান্ডি", cat: "ইনডোর প্ল্যান্ট", desc: "ঘরের বাতাস শোধন করে।", long: "গাঢ় বার্গান্ডি পাতার ফিকাস ইলাস্টিকা—বায়ু পরিশোধক ও কম যত্নে দারুণ। অফিস ও বসার ঘরের জন্য আদর্শ।" },
    en: { name: "Rubber Plant — Burgundy", cat: "Indoor Plant", desc: "Cleans indoor air beautifully.", long: "Ficus elastica with deep burgundy foliage — an air-purifying statement plant for offices and living rooms." },
    price: 690, oldPrice: 850, rating: 4.9, reviews: 220, care: "medium", category: "indoor", badge: "new",
    cover: indoor, gallery: g(indoor, leaf, hands), stock: 25, height: "3–4 ft",
    light: { bn: "উজ্জ্বল পরোক্ষ আলো", en: "Bright indirect" }, water: { bn: "সপ্তাহে ১ বার", en: "Weekly" }, soil: { bn: "দ্রুত নিষ্কাশন", en: "Fast-draining" },
  },
  {
    slug: "ficus-bonsai-15",
    bn: { name: "ফাইকাস বনসাই — ১৫ বছর", cat: "বনসাই", desc: "প্রিমিয়াম শৈল্পিক সংগ্রহ।", long: "১৫ বছর ধরে যত্নে গড়া হস্তনির্মিত বনসাই—একটি জীবন্ত শিল্পকর্ম। প্রতিটি গাছ অনন্য।" },
    en: { name: "Ficus Bonsai — 15 Years", cat: "Bonsai", desc: "A premium artistic specimen.", long: "Hand-trained over 15 years — a living sculpture. Each piece is one of a kind, signed by our master gardener." },
    price: 4500, rating: 5.0, reviews: 41, care: "expert", category: "bonsai", badge: "premium",
    cover: bonsai, gallery: g(bonsai, leaf, nursery), stock: 4, height: "14 in",
    light: { bn: "উজ্জ্বল পরোক্ষ", en: "Bright indirect" }, water: { bn: "মাটি শুকালে", en: "When topsoil dry" }, soil: { bn: "বনসাই মিশ্রণ", en: "Bonsai mix" },
  },
  {
    slug: "mango-amrapali",
    bn: { name: "আম্রপালি আম", cat: "ফলের গাছ", desc: "মিষ্টি, সুগন্ধি, ছোট গাছেই বেশি ফল।", long: "ভারতীয় আম্রপালি — কম জায়গায় বেশি ফলন, মধুর স্বাদ। ২ বছরেই ফল ধরে।" },
    en: { name: "Amrapali Mango", cat: "Fruit Plant", desc: "Sweet, aromatic, dwarf yet prolific.", long: "Compact tree with honey-sweet fruit — bears within two years. Ideal for small gardens and rooftops." },
    price: 550, rating: 4.7, reviews: 156, care: "easy", category: "fruit",
    cover: fruit, gallery: g(fruit, nursery, hands), stock: 30, height: "2–3 ft",
    light: { bn: "পূর্ণ রোদ", en: "Full sun" }, water: { bn: "মাঝারি", en: "Moderate" }, soil: { bn: "দোআঁশ", en: "Loamy" },
  },
  {
    slug: "jasmine-bela",
    bn: { name: "বেলি ফুল", cat: "ফুলের গাছ", desc: "সুগন্ধি শুভ্র ফুল, রাতে সুবাস ছড়ায়।", long: "চিরচেনা বেলি — গ্রীষ্ম-বর্ষায় সাদা ফুল ও মৃদু সুবাস। বারান্দার অবধারিত সঙ্গী।" },
    en: { name: "Bela Jasmine", cat: "Flower Plant", desc: "Fragrant white blossoms.", long: "The classic Bangladeshi jasmine — pure-white flowers and dreamy evening fragrance." },
    price: 220, rating: 4.9, reviews: 410, care: "easy", category: "flower", badge: "best",
    cover: flower, gallery: g(flower, leaf, hands), stock: 95, height: "1.5 ft",
    light: { bn: "পূর্ণ রোদ", en: "Full sun" }, water: { bn: "নিয়মিত", en: "Regular" }, soil: { bn: "জৈব মিশ্রিত", en: "Organic-mixed" },
  },
  {
    slug: "snake-plant",
    bn: { name: "স্নেক প্ল্যান্ট", cat: "ইনডোর প্ল্যান্ট", desc: "রাতেও অক্সিজেন দেয়।", long: "Sansevieria — প্রায় অমর। কম আলো, কম পানিতেও দারুণ। শোবার ঘরের জন্য আদর্শ।" },
    en: { name: "Snake Plant", cat: "Indoor Plant", desc: "Releases oxygen at night.", long: "Sansevieria — nearly indestructible. Low light, low water, perfect for bedrooms." },
    price: 420, rating: 4.8, reviews: 267, care: "easy", category: "indoor",
    cover: indoor, gallery: g(indoor, leaf, nursery), stock: 60, height: "1.5–2 ft",
    light: { bn: "যেকোনো", en: "Any" }, water: { bn: "১৫ দিনে ১ বার", en: "Every 2 weeks" }, soil: { bn: "ক্যাকটাস মিশ্রণ", en: "Cactus mix" },
  },
  {
    slug: "neem-tree",
    bn: { name: "নিম গাছ", cat: "ঔষধি গাছ", desc: "প্রকৃতির ফার্মেসি।", long: "নিম — আয়ুর্বেদের অমূল্য সঙ্গী। বাড়ির বাতাস বিশুদ্ধ রাখে, প্রাকৃতিক কীটনাশক।" },
    en: { name: "Neem Tree", cat: "Medicinal", desc: "Nature's pharmacy.", long: "The legendary medicinal tree — air-purifying, natural pesticide, used in ayurveda for centuries." },
    price: 180, rating: 4.7, reviews: 98, care: "easy", category: "medicinal",
    cover: leaf, gallery: g(leaf, nursery, hands), stock: 120, height: "2 ft",
    light: { bn: "পূর্ণ রোদ", en: "Full sun" }, water: { bn: "অল্প", en: "Light" }, soil: { bn: "যেকোনো", en: "Any" },
  },
  {
    slug: "adenium-desert-rose",
    bn: { name: "অ্যাডেনিয়াম — মরুগোলাপ", cat: "ফুলের গাছ", desc: "ভাস্কর্যের মতো কাণ্ড, রঙিন ফুল।", long: "অ্যাডেনিয়াম ওবেসাম — মোটা কোডেক্স ও উজ্জ্বল ফুল। সংগ্রাহকদের প্রিয়।" },
    en: { name: "Adenium — Desert Rose", cat: "Flower Plant", desc: "Sculptural caudex with vivid blooms.", long: "Adenium obesum — thick swollen caudex and bright blossoms. A collector's favourite." },
    price: 1200, oldPrice: 1500, rating: 4.9, reviews: 87, care: "medium", category: "flower", badge: "sale",
    cover: flower, gallery: g(flower, bonsai, leaf), stock: 18, height: "1 ft",
    light: { bn: "পূর্ণ রোদ", en: "Full sun" }, water: { bn: "কম", en: "Sparingly" }, soil: { bn: "বেলে-নিষ্কাশন", en: "Sandy, draining" },
  },
  {
    slug: "litchi-bombai",
    bn: { name: "লিচু — বোম্বাই", cat: "ফলের গাছ", desc: "রসালো, মিষ্টি, কম বীজ।", long: "দিনাজপুরের ঐতিহ্যবাহী বোম্বাই লিচু — কম বীজ, মিষ্টি রসালো শাঁস। গ্রাফট চারা।" },
    en: { name: "Bombai Litchi", cat: "Fruit Plant", desc: "Juicy, sweet, small seed.", long: "Heritage Bombai litchi from Dinajpur — grafted, small seed, juicy flesh." },
    price: 650, rating: 4.8, reviews: 142, care: "medium", category: "fruit",
    cover: fruit, gallery: g(fruit, hands, nursery), stock: 22, height: "2.5 ft",
    light: { bn: "পূর্ণ রোদ", en: "Full sun" }, water: { bn: "নিয়মিত", en: "Regular" }, soil: { bn: "দোআঁশ", en: "Loamy" },
  },
  {
    slug: "monstera-deliciosa",
    bn: { name: "মন্সটেরা ডেলিসিওসা", cat: "ইনডোর প্ল্যান্ট", desc: "আইকনিক বড় পাতা।", long: "আইকনিক সুইস-চিজ পাতা — আধুনিক ইন্টেরিয়রের প্রিয় বন্ধু।" },
    en: { name: "Monstera Deliciosa", cat: "Indoor Plant", desc: "Iconic split leaves.", long: "The iconic Swiss-cheese leaves — beloved companion of modern interiors." },
    price: 950, rating: 4.9, reviews: 198, care: "medium", category: "indoor", badge: "new",
    cover: indoor, gallery: g(indoor, leaf, nursery), stock: 14, height: "2–3 ft",
    light: { bn: "উজ্জ্বল পরোক্ষ", en: "Bright indirect" }, water: { bn: "সপ্তাহে ১", en: "Weekly" }, soil: { bn: "আর্দ্র-নিষ্কাশন", en: "Moist, draining" },
  },
  {
    slug: "juniper-bonsai-7",
    bn: { name: "জুনিপার বনসাই — ৭ বছর", cat: "বনসাই", desc: "শৈল্পিক, চিরসবুজ।", long: "৭ বছরের যত্নে গড়া জুনিপার বনসাই—ধীর গতির সবুজ ভাস্কর্য।" },
    en: { name: "Juniper Bonsai — 7 Years", cat: "Bonsai", desc: "Evergreen, slow-grown.", long: "Hand-trained juniper, seven years in the making — a quiet green sculpture." },
    price: 2800, rating: 4.9, reviews: 36, care: "expert", category: "bonsai", badge: "premium",
    cover: bonsai, gallery: g(bonsai, leaf, nursery), stock: 6, height: "10 in",
    light: { bn: "উজ্জ্বল আলো", en: "Bright" }, water: { bn: "মাটি শুকালে", en: "When dry" }, soil: { bn: "বনসাই মিশ্রণ", en: "Bonsai mix" },
  },
  {
    slug: "tulsi-holy-basil",
    bn: { name: "তুলসী", cat: "ঔষধি গাছ", desc: "পবিত্র, ঔষধি, সুগন্ধি।", long: "তুলসী — প্রতিদিনের চা, ঠান্ডা-কাশির ঘরোয়া সমাধান, প্রাকৃতিক মশা প্রতিরোধক।" },
    en: { name: "Tulsi (Holy Basil)", cat: "Medicinal", desc: "Sacred, medicinal, aromatic.", long: "Tulsi — the everyday wellness herb for tea, immunity, and a natural mosquito repellent." },
    price: 120, rating: 4.9, reviews: 521, care: "easy", category: "medicinal", badge: "best",
    cover: leaf, gallery: g(leaf, hands, nursery), stock: 200, height: "1 ft",
    light: { bn: "পূর্ণ রোদ", en: "Full sun" }, water: { bn: "প্রতিদিন", en: "Daily" }, soil: { bn: "যেকোনো", en: "Any" },
  },
  {
    slug: "bougainvillea-magenta",
    bn: { name: "বাগানবিলাস — ম্যাজেন্টা", cat: "আউটডোর প্ল্যান্ট", desc: "ছাদ ও দেয়ালের রাজা।", long: "ছাদবাগান, বাউন্ডারি ও পারগোলার জন্য নিখুঁত — গ্রীষ্ম জুড়ে আগুনের মতো ফুল।" },
    en: { name: "Bougainvillea — Magenta", cat: "Outdoor Plant", desc: "The king of walls and roofs.", long: "Made for rooftops, boundaries and pergolas — a flame of blooms all summer long." },
    price: 380, rating: 4.7, reviews: 132, care: "easy", category: "outdoor",
    cover: flower, gallery: g(flower, nursery, leaf), stock: 44, height: "2–3 ft",
    light: { bn: "পূর্ণ রোদ", en: "Full sun" }, water: { bn: "কম", en: "Low" }, soil: { bn: "যেকোনো", en: "Any" },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const related = (slug: string) => products.filter((p) => p.slug !== slug && p.category === getProduct(slug)?.category).slice(0, 4);

export const WHATSAPP = "8801799116889";
export const waUrl = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
