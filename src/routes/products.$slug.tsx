import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Star, Truck, Shield, Leaf, Minus, Plus, ChevronRight } from "lucide-react";
import { getProduct, products, related, waUrl } from "@/lib/products";
import { useShop } from "@/lib/shop";
import { useI18n } from "@/lib/i18n";
import { Lightbox } from "@/components/site/Lightbox";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.product
      ? [
          { title: `${loaderData.product.en.name} — Adarsh Manik Nursery` },
          { name: "description", content: loaderData.product.en.long },
          { property: "og:title", content: loaderData.product.en.name },
          { property: "og:description", content: loaderData.product.en.desc },
          { property: "og:image", content: loaderData.product.cover },
        ]
      : [{ title: "Product — Adarsh Manik Nursery" }],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background pt-32">
      <div className="text-center">
        <h1 className="text-4xl font-display mb-4">Plant not found</h1>
        <Link to="/collection" className="text-primary underline">Browse our collection</Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { lang, tr } = useI18n();
  const { add, toggleWish, hasWish } = useShop();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [lbIdx, setLbIdx] = useState<number | null>(null);

  const d = p[lang];
  const rel = related(p.slug);

  const waText = lang === "bn"
    ? `আসসালামু আলাইকুম! আমি "${p.bn.name}" কিনতে চাই (পরিমাণ: ${qty}). বিস্তারিত জানতে চাই।`
    : `Hi! I'd like to order "${p.en.name}" (qty: ${qty}). Please share details.`;

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="pt-32 pb-6 bg-cream-gradient">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/collection" className="hover:text-primary">Collection</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{p.en.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-square rounded-3xl overflow-hidden bg-secondary shadow-card cursor-zoom-in group" onClick={() => setLbIdx(activeImg)}>
              <img src={p.gallery[activeImg]} alt={p.en.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {p.gallery.map((g: string, i: number) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square rounded-xl overflow-hidden border-2 transition ${activeImg === i ? "border-primary shadow-card" : "border-transparent opacity-70 hover:opacity-100"}`}>
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {p.badge && (
              <div className="inline-block bg-gold text-primary-deep text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full mb-4">
                {p.badge}
              </div>
            )}
            <div className={`${lang === "bn" ? "font-bangla" : ""} text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-3`}>{d.cat}</div>
            <h1 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-5xl font-medium text-foreground leading-tight mb-4`}>
              {d.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(p.rating) ? "fill-gold text-gold" : "text-muted"}`} />
                ))}
                <span className="ml-2 text-sm font-semibold">{p.rating}</span>
                <span className="text-sm text-muted-foreground">({p.reviews} reviews)</span>
              </div>
            </div>

            <p className={`${lang === "bn" ? "font-bangla" : ""} text-lg text-muted-foreground leading-relaxed mb-6`}>{d.long}</p>

            <div className="flex items-baseline gap-3 mb-8">
              <div className="font-display text-5xl font-semibold text-primary">৳ {p.price}</div>
              {p.oldPrice && <div className="text-xl text-muted-foreground line-through">৳ {p.oldPrice}</div>}
              {p.oldPrice && <div className="text-xs font-bold text-leaf bg-leaf/10 px-2 py-1 rounded-full">SAVE ৳{p.oldPrice - p.price}</div>}
            </div>

            {/* Care quick specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { l: tr("pdp.height"), v: p.height },
                { l: tr("pdp.light"), v: p.light[lang] },
                { l: tr("pdp.water"), v: p.water[lang] },
                { l: tr("pdp.soil"), v: p.soil[lang] },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{s.l}</div>
                  <div className="text-sm font-semibold text-foreground">{s.v}</div>
                </div>
              ))}
            </div>

            {/* Qty + actions */}
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center rounded-full border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-12 w-12 flex items-center justify-center hover:bg-secondary rounded-l-full"><Minus className="h-4 w-4" /></button>
                <div className="w-10 text-center font-semibold">{qty}</div>
                <button onClick={() => setQty((q) => q + 1)} className="h-12 w-12 flex items-center justify-center hover:bg-secondary rounded-r-full"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={() => add(p.slug, qty)} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 font-semibold shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all">
                <ShoppingBag className="h-4 w-4" /> {tr("btn.addCart")}
              </button>
              <button onClick={() => toggleWish(p.slug)} className={`h-14 w-14 rounded-full border border-border flex items-center justify-center transition ${hasWish(p.slug) ? "text-destructive border-destructive/30" : "hover:bg-secondary"}`} aria-label="Wishlist">
                <Heart className="h-5 w-5" fill={hasWish(p.slug) ? "currentColor" : "none"} />
              </button>
            </div>

            <a href={waUrl(waText)} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-leaf text-primary-deep px-6 py-4 font-bold shadow-glow hover:scale-[1.01] transition mb-6">
              {tr("btn.whatsapp")}
            </a>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              {[
                { Icon: Truck, l: lang === "bn" ? "৬৪ জেলায় ডেলিভারি" : "64 districts delivery" },
                { Icon: Shield, l: lang === "bn" ? "৭ দিন গ্যারান্টি" : "7-day guarantee" },
                { Icon: Leaf, l: lang === "bn" ? "নার্সারি যাচাইকৃত" : "Nursery verified" },
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2 p-3 rounded-2xl bg-secondary/50">
                  <t.Icon className="h-5 w-5 text-leaf" />
                  <div className="text-muted-foreground">{t.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Care guide */}
      <section className="py-16 bg-cream-gradient">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-3xl md:text-4xl font-medium mb-8 text-center`}>{tr("pdp.care")}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { t: tr("pdp.light"), v: p.light[lang], bn: "প্রতিদিন ৬+ ঘন্টা সূর্যালোক আদর্শ। অপরিপক্ব চারাকে কড়া রোদ থেকে রক্ষা করুন।", en: "Aim for ideal light hours daily; shield young saplings from harsh midday sun." },
              { t: tr("pdp.water"), v: p.water[lang], bn: "মাটির উপরিভাগ শুকালে পানি দিন। জলাবদ্ধতা এড়াতে নিচে নিষ্কাশন রাখুন।", en: "Water when topsoil is dry. Avoid waterlogging — ensure good drainage." },
              { t: tr("pdp.soil"), v: p.soil[lang], bn: "প্রতি ৩-৪ মাসে জৈব সার ও কম্পোস্ট মিশ্রণ ব্যবহার করুন।", en: "Refresh with organic compost and balanced fertilizer every 3–4 months." },
              { t: lang === "bn" ? "ছাঁটাই" : "Pruning", v: lang === "bn" ? "ঋতু শেষে" : "End of season", bn: "ফুল/ফলের ঋতু শেষ হলে পরিষ্কার ছাঁটাইয়ে আকৃতি ধরে রাখুন।", en: "Prune cleanly after each season to maintain shape and stimulate growth." },
            ].map((c, i) => (
              <div key={i} className="bg-card rounded-3xl p-6 border border-border shadow-card">
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-2">{c.t} — {c.v}</div>
                <p className={`${lang === "bn" ? "font-bangla" : ""} text-foreground/80 leading-relaxed`}>{lang === "bn" ? c.bn : c.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {rel.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-3xl md:text-4xl font-medium mb-10`}>{tr("pdp.related")}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {rel.map((r) => (
                <Link key={r.slug} to="/products/$slug" params={{ slug: r.slug }} className="group block">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary mb-3">
                    <img src={r.cover} alt={r.en.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className={`${lang === "bn" ? "font-bangla-display" : "font-display"} font-semibold text-foreground group-hover:text-primary transition`}>{r[lang].name}</div>
                  <div className="font-display text-lg text-primary">৳ {r.price}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky purchase CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 glass border-t border-border/40 px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2 max-w-7xl mx-auto">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground truncate">{d.name}</div>
            <div className="font-display text-xl font-semibold text-primary">৳ {p.price * qty}</div>
          </div>
          <button onClick={() => add(p.slug, qty)} className="rounded-full bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold flex items-center gap-1.5">
            <ShoppingBag className="h-4 w-4" /> {tr("btn.addCart")}
          </button>
          <a href={waUrl(waText)} target="_blank" rel="noreferrer" className="rounded-full bg-leaf text-primary-deep px-4 py-3 text-sm font-bold">
            WhatsApp
          </a>
        </div>
      </div>

      <Lightbox images={p.gallery} index={lbIdx} onClose={() => setLbIdx(null)} onIndex={(i) => { setLbIdx(i); setActiveImg(i); }} />
    </div>
  );
}

// silence unused import in some build conditions
void products;
