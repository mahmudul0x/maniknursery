import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "bn" | "en";

type Dict = Record<string, { bn: string; en: string }>;

export const t: Dict = {
  "nav.home": { bn: "হোম", en: "Home" },
  "nav.collection": { bn: "কালেকশন", en: "Collection" },
  "nav.about": { bn: "আমাদের সম্পর্কে", en: "About" },
  "nav.gallery": { bn: "গ্যালারী", en: "Gallery" },
  "nav.contact": { bn: "যোগাযোগ", en: "Contact" },
  "nav.shop": { bn: "এখনই কিনুন", en: "Shop Now" },

  "brand.name": { bn: "আদর্শ মানিক নার্সারী", en: "Adarsh Manik Nursery" },
  "brand.tagline": { bn: "৮০০+ প্রজাতির বিপুল সমাহার", en: "800+ Premium Varieties" },

  "hero.eyebrow": { bn: "প্রিমিয়াম নার্সারি — ১৯৯৮ সাল থেকে", en: "Premium Nursery — Since 1998" },
  "hero.title": { bn: "প্রকৃতির সৌন্দর্য এখন\nআপনার হাতের নাগালে", en: "Nature's Beauty,\nNow Within Your Reach" },
  "hero.sub": {
    bn: "দেশি-বিদেশি ৮০০+ প্রজাতির উন্নত মানের ফল, ফুল ও সৌন্দর্যবর্ধক গাছের বিশাল সংগ্রহ — সারাদেশে নিরাপদ ডেলিভারি।",
    en: "An exquisite collection of 800+ rare and native fruit, flower, and ornamental plants — delivered safely across Bangladesh.",
  },
  "hero.cta1": { bn: "গাছ কিনুন", en: "Shop Plants" },
  "hero.cta2": { bn: "কালেকশন দেখুন", en: "View Collection" },
  "hero.cta3": { bn: "যোগাযোগ করুন", en: "Contact Us" },

  "stat.species": { bn: "প্রজাতির গাছ", en: "Plant Species" },
  "stat.customers": { bn: "সন্তুষ্ট গ্রাহক", en: "Happy Customers" },
  "stat.districts": { bn: "জেলায় ডেলিভারি", en: "Districts Served" },
  "stat.years": { bn: "বছরের অভিজ্ঞতা", en: "Years of Craft" },

  "section.collection.eyebrow": { bn: "আমাদের সংগ্রহ", en: "Our Collection" },
  "section.collection.title": { bn: "আটটি বিশেষ ক্যাটাগরি", en: "Eight Curated Categories" },
  "section.collection.sub": { bn: "প্রতিটি গাছ যত্ন সহকারে নির্বাচিত — মান ও সৌন্দর্যের গ্যারান্টি সহ।", en: "Every plant hand-selected for quality, beauty, and resilience." },

  "section.featured.eyebrow": { bn: "বেস্ট সেলিং", en: "Best Sellers" },
  "section.featured.title": { bn: "এই মাসের জনপ্রিয় গাছ", en: "Plants Loved This Month" },

  "section.why.eyebrow": { bn: "কেন আমরা", en: "Why Choose Us" },
  "section.why.title": { bn: "প্রিমিয়াম মান, বিশ্বস্ত সেবা", en: "Premium Quality, Trusted Service" },

  "section.hadith.text": {
    bn: "“যদি শোন কাল কেয়ামত, আজ একটি গাছ লাগাও”",
    en: "“If you hear that the Day of Resurrection is tomorrow, plant a tree today.”",
  },
  "section.hadith.cite": { bn: "— আল হাদিস", en: "— Al-Hadith" },

  "section.delivery.eyebrow": { bn: "ডেলিভারি ও সেবা", en: "Delivery & Service" },
  "section.delivery.title": { bn: "সারাদেশে নিরাপদ ডেলিভারি", en: "Nationwide Safe Delivery" },

  "section.reviews.eyebrow": { bn: "গ্রাহকের মতামত", en: "Customer Stories" },
  "section.reviews.title": { bn: "আমাদের গ্রাহকদের ভালোবাসা", en: "Loved by Plant Lovers" },

  "section.contact.title": { bn: "যেকোনো প্রয়োজনে যোগাযোগ করুন", en: "Get in Touch Anytime" },
  "section.contact.sub": { bn: "আমরা সপ্তাহের ৭ দিন আপনার সেবায়।", en: "We're here for you 7 days a week." },

  "footer.rights": { bn: "সর্বস্বত্ব সংরক্ষিত", en: "All rights reserved" },

  "btn.buy": { bn: "কিনুন", en: "Buy" },
  "btn.viewAll": { bn: "সব দেখুন", en: "View All" },
  "btn.order": { bn: "অর্ডার করুন", en: "Order Now" },
  "btn.addCart": { bn: "কার্টে যোগ করুন", en: "Add to Cart" },
  "btn.whatsapp": { bn: "WhatsApp এ অর্ডার", en: "Order on WhatsApp" },
  "btn.checkout": { bn: "চেকআউট", en: "Checkout" },
  "btn.continueShopping": { bn: "শপিং চালিয়ে যান", en: "Continue Shopping" },
  "btn.apply": { bn: "প্রয়োগ করুন", en: "Apply" },

  "cart.title": { bn: "আপনার কার্ট", en: "Your Cart" },
  "cart.empty": { bn: "আপনার কার্ট এখনো খালি।", en: "Your cart is empty." },
  "cart.subtotal": { bn: "সাবটোটাল", en: "Subtotal" },
  "cart.shipping": { bn: "ডেলিভারি", en: "Shipping" },
  "cart.discount": { bn: "ডিসকাউন্ট", en: "Discount" },
  "cart.total": { bn: "মোট", en: "Total" },
  "cart.coupon": { bn: "কুপন কোড", en: "Coupon code" },
  "cart.free": { bn: "ফ্রি", en: "Free" },

  "wish.title": { bn: "উইশলিস্ট", en: "Wishlist" },
  "wish.empty": { bn: "এখনো কোনো গাছ যোগ করা হয়নি।", en: "No plants saved yet." },

  "pdp.related": { bn: "একই ক্যাটাগরির অন্যান্য গাছ", en: "You may also love" },
  "pdp.care": { bn: "যত্নের নির্দেশনা", en: "Care Guide" },
  "pdp.height": { bn: "উচ্চতা", en: "Height" },
  "pdp.light": { bn: "আলো", en: "Light" },
  "pdp.water": { bn: "পানি", en: "Water" },
  "pdp.soil": { bn: "মাটি", en: "Soil" },
  "pdp.stock": { bn: "স্টকে আছে", en: "In stock" },

  "checkout.title": { bn: "অর্ডার সম্পন্ন করুন", en: "Complete Your Order" },
  "checkout.name": { bn: "পূর্ণ নাম", en: "Full name" },
  "checkout.phone": { bn: "ফোন নম্বর", en: "Phone" },
  "checkout.address": { bn: "ডেলিভারি ঠিকানা", en: "Delivery address" },
  "checkout.note": { bn: "অতিরিক্ত নোট", en: "Order note" },
  "checkout.place": { bn: "WhatsApp এ অর্ডার পাঠান", en: "Send order via WhatsApp" },

  "filter.all": { bn: "সব", en: "All" },
  "filter.search": { bn: "গাছ খুঁজুন...", en: "Search plants..." },
  "filter.sort": { bn: "সাজান", en: "Sort" },
  "filter.popular": { bn: "জনপ্রিয়", en: "Most Popular" },
  "filter.priceLow": { bn: "কম দাম", en: "Price: Low to High" },
  "filter.priceHigh": { bn: "বেশি দাম", en: "Price: High to Low" },
  "filter.noResults": { bn: "কোনো গাছ পাওয়া যায়নি।", en: "No plants found." },

  "cat.fruit": { bn: "ফলের গাছ", en: "Fruit" },
  "cat.flower": { bn: "ফুলের গাছ", en: "Flower" },
  "cat.indoor": { bn: "ইনডোর", en: "Indoor" },
  "cat.outdoor": { bn: "আউটডোর", en: "Outdoor" },
  "cat.bonsai": { bn: "বনসাই", en: "Bonsai" },
  "cat.medicinal": { bn: "ঔষধি", en: "Medicinal" },

  "care.easy": { bn: "সহজ যত্ন", en: "Easy Care" },
  "care.medium": { bn: "মাঝারি যত্ন", en: "Medium Care" },
  "care.expert": { bn: "বিশেষজ্ঞ যত্ন", en: "Expert Care" },
};

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; tr: (k: keyof typeof t) => string }>({
  lang: "bn", setLang: () => {}, tr: (k) => t[k]?.bn ?? String(k),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("bn");
  const tr = (k: keyof typeof t) => t[k]?.[lang] ?? String(k);
  return <Ctx.Provider value={{ lang, setLang, tr }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
