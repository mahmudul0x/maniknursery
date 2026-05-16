import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { products, type Product } from "./products";

export type CartItem = { slug: string; qty: number };

type Coupon = { code: string; off: number; type: "pct" | "flat"; label: string };
const COUPONS: Coupon[] = [
  { code: "GREEN10", off: 10, type: "pct", label: "10% off your order" },
  { code: "MANIK500", off: 500, type: "flat", label: "৳500 off orders over ৳3000" },
  { code: "FREESHIP", off: 0, type: "flat", label: "Free nationwide shipping" },
];

type Ctx = {
  cart: CartItem[];
  wishlist: string[];
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
  hasWish: (slug: string) => boolean;
  cartCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  coupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  couponHints: Coupon[];
};

const C = createContext<Ctx | null>(null);

const load = <T,>(k: string, fb: T): T => {
  if (typeof window === "undefined") return fb;
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : fb; } catch { return fb; }
};
const save = (k: string, v: unknown) => {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* noop */ }
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(load<CartItem[]>("amn:cart", []));
    setWishlist(load<string[]>("amn:wish", []));
    setCoupon(load<Coupon | null>("amn:coupon", null));
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) save("amn:cart", cart); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) save("amn:wish", wishlist); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) save("amn:coupon", coupon); }, [coupon, hydrated]);

  const add = (slug: string, qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.slug === slug);
      if (i > -1) {
        const n = [...c]; n[i] = { ...n[i], qty: n[i].qty + qty }; return n;
      }
      return [...c, { slug, qty }];
    });
    const p = products.find((x) => x.slug === slug);
    toast.success(`${p?.en.name ?? "Item"} added to cart`);
  };
  const remove = (slug: string) => setCart((c) => c.filter((x) => x.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((x) => x.slug !== slug) : c.map((x) => (x.slug === slug ? { ...x, qty } : x))));
  const clear = () => { setCart([]); setCoupon(null); };

  const toggleWish = (slug: string) =>
    setWishlist((w) => {
      const has = w.includes(slug);
      toast(has ? "Removed from wishlist" : "Added to wishlist");
      return has ? w.filter((s) => s !== slug) : [...w, slug];
    });
  const hasWish = (slug: string) => wishlist.includes(slug);

  const items = useMemo(() => cart.map((c) => ({ ...c, p: products.find((p) => p.slug === c.slug)! })).filter((x) => x.p), [cart]);
  const subtotal = items.reduce((s, x) => s + x.p.price * x.qty, 0);
  const shipping = coupon?.code === "FREESHIP" || subtotal === 0 ? 0 : subtotal > 2500 ? 0 : 120;
  let discount = 0;
  if (coupon) {
    if (coupon.type === "pct") discount = Math.round((subtotal * coupon.off) / 100);
    if (coupon.type === "flat" && coupon.code === "MANIK500" && subtotal >= 3000) discount = 500;
  }
  const total = Math.max(0, subtotal - discount + shipping);

  const applyCoupon = (code: string) => {
    const c = COUPONS.find((x) => x.code.toLowerCase() === code.trim().toLowerCase());
    if (!c) { toast.error("Invalid coupon code"); return false; }
    if (c.code === "MANIK500" && subtotal < 3000) { toast.error("Order must be ৳3000+ for MANIK500"); return false; }
    setCoupon(c); toast.success(`Coupon applied: ${c.code}`); return true;
  };
  const removeCoupon = () => { setCoupon(null); toast("Coupon removed"); };

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  const value: Ctx = {
    cart, wishlist, add, remove, setQty, clear, toggleWish, hasWish,
    cartCount, subtotal, shipping, discount, total,
    coupon, applyCoupon, removeCoupon, couponHints: COUPONS,
  };

  return <C.Provider value={value}>{children}</C.Provider>;
}

export const useShop = () => {
  const v = useContext(C);
  if (!v) throw new Error("useShop must be inside ShopProvider");
  return v;
};

export const cartItemsOf = (cart: CartItem[]): { p: Product; qty: number }[] =>
  cart.map((c) => ({ p: products.find((p) => p.slug === c.slug)!, qty: c.qty })).filter((x) => x.p);
