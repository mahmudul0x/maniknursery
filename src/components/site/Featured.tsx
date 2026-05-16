import { motion } from "motion/react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useShop } from "@/lib/shop";
import { products } from "@/lib/products";

export function Featured() {
  const { tr, lang } = useI18n();
  const { add, toggleWish, hasWish } = useShop();
  const featured = products.slice(0, 4);

  return (
    <section className="relative py-28 lg:py-36 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">{tr("section.featured.eyebrow")}</span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-5xl lg:text-6xl font-medium text-foreground`}>
            {tr("section.featured.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => {
            const d = p[lang];
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:shadow-elegant transition-all duration-500"
              >
                <Link to="/products/$slug" params={{ slug: p.slug }} className="relative aspect-[4/5] overflow-hidden bg-secondary block">
                  <img src={p.cover} alt={p.en.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/30 via-transparent to-transparent" />
                  {p.badge && (
                    <div className="absolute top-4 left-4 bg-gold text-primary-deep text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full">
                      {p.badge}
                    </div>
                  )}
                </Link>
                <button
                  onClick={() => toggleWish(p.slug)}
                  className={`absolute top-4 right-4 h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-card transition ${hasWish(p.slug) ? "text-destructive" : ""}`}
                  aria-label="Wishlist"
                >
                  <Heart className="h-4 w-4" fill={hasWish(p.slug) ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => add(p.slug)}
                  className="absolute top-[calc(100%-7rem)] left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-primary text-primary-foreground rounded-full py-3 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {tr("btn.addCart")}
                </button>

                <Link to="/products/$slug" params={{ slug: p.slug }} className="block p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${lang === "bn" ? "font-bangla" : ""} text-[10px] uppercase tracking-widest text-muted-foreground`}>{d.cat}</span>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 fill-gold text-gold" />
                      <span className="font-semibold">{p.rating}</span>
                    </div>
                  </div>
                  <h3 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-lg font-semibold text-foreground leading-tight mb-1`}>
                    {d.name}
                  </h3>
                  <p className={`${lang === "bn" ? "font-bangla" : ""} text-sm text-muted-foreground line-clamp-1 mb-4`}>{d.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{tr(`care.${p.care}` as const)}</div>
                      <div className="flex items-baseline gap-2">
                        <div className="font-display text-2xl font-semibold text-primary">৳ {p.price}</div>
                        {p.oldPrice && <div className="text-xs text-muted-foreground line-through">৳ {p.oldPrice}</div>}
                      </div>
                    </div>
                    <div className="text-xs text-leaf font-semibold">In Stock</div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
