import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useShop } from "@/lib/shop";
import { useI18n } from "@/lib/i18n";
import { products } from "@/lib/products";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Adarsh Manik Nursery" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { lang, tr } = useI18n();
  const { wishlist, toggleWish, add } = useShop();
  const items = wishlist.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as typeof products;

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-3">— {tr("wish.title")} —</div>
          <h1 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-5xl font-medium`}>{tr("wish.title")}</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 rounded-3xl bg-cream-gradient border border-border">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className={`${lang === "bn" ? "font-bangla" : ""} text-lg text-muted-foreground mb-6`}>{tr("wish.empty")}</p>
            <Link to="/collection" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold">{tr("btn.continueShopping")}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((p) => (
              <div key={p.slug} className="group bg-card rounded-3xl overflow-hidden border border-border shadow-card hover:shadow-elegant transition relative">
                <button onClick={() => toggleWish(p.slug)} className="absolute top-3 right-3 h-9 w-9 rounded-full glass flex items-center justify-center z-10" aria-label="Remove">
                  <X className="h-4 w-4" />
                </button>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="block aspect-square overflow-hidden bg-secondary">
                  <img src={p.cover} alt={p.en.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </Link>
                <div className="p-4">
                  <Link to="/products/$slug" params={{ slug: p.slug }} className={`${lang === "bn" ? "font-bangla-display" : "font-display"} font-semibold leading-tight hover:text-primary transition block mb-2`}>
                    {p[lang].name}
                  </Link>
                  <div className="flex items-center justify-between">
                    <div className="font-display text-xl text-primary">৳ {p.price}</div>
                    <button onClick={() => add(p.slug)} className="rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1">
                      <ShoppingBag className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
