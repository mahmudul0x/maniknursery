import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { products, type Category } from "@/lib/products";
import { useShop } from "@/lib/shop";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Plant Collection — Adarsh Manik Nursery" },
      { name: "description", content: "Browse 800+ premium plant varieties — fruit, flower, indoor, outdoor, bonsai, and medicinal. Filter, search, and order online." },
    ],
  }),
  component: CollectionPage,
});

const CATEGORIES: { id: Category | "all"; key: string }[] = [
  { id: "all", key: "filter.all" },
  { id: "fruit", key: "cat.fruit" },
  { id: "flower", key: "cat.flower" },
  { id: "indoor", key: "cat.indoor" },
  { id: "outdoor", key: "cat.outdoor" },
  { id: "bonsai", key: "cat.bonsai" },
  { id: "medicinal", key: "cat.medicinal" },
];

const PER_PAGE = 8;

function CollectionPage() {
  const { lang, tr } = useI18n();
  const { add, toggleWish, hasWish } = useShop();
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"popular" | "low" | "high">("popular");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => p.en.name.toLowerCase().includes(s) || p.bn.name.includes(q) || p[lang].cat.toLowerCase().includes(s));
    }
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    else if (sort === "high") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, q, sort, lang]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const slice = filtered.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);

  return (
    <>
      <section className="pt-40 pb-12 bg-cream-gradient">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="ornament-divider mb-6 max-w-[220px] mx-auto">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">{tr("brand.tagline")}</span>
          </div>
          <h1 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-5xl md:text-7xl font-medium text-foreground leading-tight`}>
            {lang === "bn" ? "আমাদের প্ল্যান্ট কালেকশন" : "Our Plant Collection"}
          </h1>
          <p className={`${lang === "bn" ? "font-bangla" : ""} mt-6 text-lg text-muted-foreground max-w-2xl mx-auto`}>
            {lang === "bn" ? "৮০০+ প্রজাতির গাছ থেকে আপনার পছন্দেরটি বেছে নিন।" : "Choose your favourites from our curated collection of 800+ plant varieties."}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Controls */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setPage(1); }}
                  placeholder={tr("filter.search")}
                  className={`${lang === "bn" ? "font-bangla" : ""} w-full pl-11 pr-4 py-3.5 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30`}
                />
              </div>
              <div className="relative inline-flex items-center gap-2">
                <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="appearance-none pl-11 pr-10 py-3.5 rounded-full border border-border bg-card font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="popular">{tr("filter.popular")}</option>
                  <option value="low">{tr("filter.priceLow")}</option>
                  <option value="high">{tr("filter.priceHigh")}</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setCat(c.id); setPage(1); }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${cat === c.id ? "bg-primary text-primary-foreground border-primary shadow-card" : "bg-card border-border hover:border-primary/30"}`}
                >
                  {tr(c.key as Parameters<typeof tr>[0])}
                </button>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              {filtered.length} {lang === "bn" ? "টি গাছ" : "plants"}
            </div>
          </div>

          {/* Grid */}
          {slice.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">{tr("filter.noResults")}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {slice.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                  className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:shadow-elegant transition-all duration-500"
                >
                  <Link to="/products/$slug" params={{ slug: p.slug }} className="relative aspect-[4/5] overflow-hidden bg-secondary block">
                    <img src={p.cover} alt={p.en.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/30 via-transparent to-transparent" />
                    {p.badge && (
                      <div className="absolute top-4 left-4 bg-gold text-primary-deep text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full">{p.badge}</div>
                    )}
                  </Link>
                  <button onClick={() => toggleWish(p.slug)} className={`absolute top-4 right-4 h-10 w-10 rounded-full glass flex items-center justify-center transition ${hasWish(p.slug) ? "text-destructive" : ""}`} aria-label="Wishlist">
                    <Heart className="h-4 w-4" fill={hasWish(p.slug) ? "currentColor" : "none"} />
                  </button>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`${lang === "bn" ? "font-bangla" : ""} text-[10px] uppercase tracking-widest text-muted-foreground`}>{p[lang].cat}</span>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-gold text-gold" />
                        <span className="font-semibold">{p.rating}</span>
                      </div>
                    </div>
                    <Link to="/products/$slug" params={{ slug: p.slug }} className={`${lang === "bn" ? "font-bangla-display" : "font-display"} block text-lg font-semibold text-foreground leading-tight mb-1 hover:text-primary transition`}>
                      {p[lang].name}
                    </Link>
                    <p className={`${lang === "bn" ? "font-bangla" : ""} text-sm text-muted-foreground line-clamp-1 mb-4`}>{p[lang].desc}</p>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <div className="font-display text-2xl font-semibold text-primary">৳ {p.price}</div>
                          {p.oldPrice && <div className="text-xs text-muted-foreground line-through">৳ {p.oldPrice}</div>}
                        </div>
                      </div>
                      <button onClick={() => add(p.slug)} className="rounded-full bg-primary text-primary-foreground p-2.5 hover:scale-110 transition" aria-label="Add to cart">
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button onClick={() => setPage((v) => Math.max(1, v - 1))} disabled={cur === 1} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-40">
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} className={`h-10 w-10 rounded-full font-semibold text-sm transition ${cur === n ? "bg-primary text-primary-foreground shadow-card" : "border border-border hover:bg-secondary"}`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage((v) => Math.min(pages, v + 1))} disabled={cur === pages} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-40">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
