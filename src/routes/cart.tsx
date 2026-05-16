import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, Tag, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop, cartItemsOf } from "@/lib/shop";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Adarsh Manik Nursery" }] }),
  component: CartPage,
});

function CartPage() {
  const { lang, tr } = useI18n();
  const { cart, setQty, remove, subtotal, shipping, discount, total, coupon, applyCoupon, removeCoupon, couponHints } = useShop();
  const [code, setCode] = useState("");
  const items = cartItemsOf(cart);

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-3">— {tr("nav.collection")} —</div>
          <h1 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-5xl font-medium`}>{tr("cart.title")}</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 rounded-3xl bg-cream-gradient border border-border">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className={`${lang === "bn" ? "font-bangla" : ""} text-lg text-muted-foreground mb-6`}>{tr("cart.empty")}</p>
            <Link to="/collection" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold">
              {tr("btn.continueShopping")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            <div className="space-y-4">
              {items.map(({ p, qty }) => (
                <div key={p.slug} className="flex gap-4 p-4 rounded-3xl bg-card border border-border shadow-card">
                  <Link to="/products/$slug" params={{ slug: p.slug }} className="h-28 w-28 rounded-2xl overflow-hidden bg-secondary flex-shrink-0">
                    <img src={p.cover} alt={p.en.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{p[lang].cat}</div>
                    <Link to="/products/$slug" params={{ slug: p.slug }} className={`${lang === "bn" ? "font-bangla-display" : "font-display"} font-semibold text-lg hover:text-primary transition block leading-tight mb-2`}>
                      {p[lang].name}
                    </Link>
                    <div className="font-display text-xl font-semibold text-primary">৳ {p.price * qty}</div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => remove(p.slug)} className="text-muted-foreground hover:text-destructive p-1.5" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button onClick={() => setQty(p.slug, qty - 1)} className="h-9 w-9 flex items-center justify-center hover:bg-secondary rounded-l-full"><Minus className="h-3.5 w-3.5" /></button>
                      <div className="w-8 text-center text-sm font-semibold">{qty}</div>
                      <button onClick={() => setQty(p.slug, qty + 1)} className="h-9 w-9 flex items-center justify-center hover:bg-secondary rounded-r-full"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-28 h-fit space-y-5">
              <div className="rounded-3xl bg-card border border-border p-6 shadow-card">
                <h3 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-xl font-semibold mb-5`}>{tr("cart.total")}</h3>

                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between"><span className="text-muted-foreground">{tr("cart.subtotal")}</span><span className="font-semibold">৳ {subtotal}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">{tr("cart.shipping")}</span><span className="font-semibold">{shipping === 0 ? tr("cart.free") : `৳ ${shipping}`}</span></div>
                  {discount > 0 && (
                    <div className="flex justify-between text-leaf"><span>{tr("cart.discount")} ({coupon?.code})</span><span className="font-semibold">− ৳ {discount}</span></div>
                  )}
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-baseline mb-6">
                  <span className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-lg font-semibold`}>{tr("cart.total")}</span>
                  <span className="font-display text-3xl font-semibold text-primary">৳ {total}</span>
                </div>

                <Link to="/checkout" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 font-semibold shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all">
                  {tr("btn.checkout")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Coupon */}
              <div className="rounded-3xl bg-cream-gradient border border-border p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-gold" />
                  <h4 className="font-semibold">{tr("cart.coupon")}</h4>
                </div>
                {coupon ? (
                  <div className="flex items-center justify-between bg-card rounded-xl p-3 border border-leaf/30">
                    <div>
                      <div className="font-bold text-leaf">{coupon.code}</div>
                      <div className="text-xs text-muted-foreground">{coupon.label}</div>
                    </div>
                    <button onClick={removeCoupon} className="text-sm text-destructive hover:underline">Remove</button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2 mb-3">
                      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="GREEN10" className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      <button onClick={() => { if (applyCoupon(code)) setCode(""); }} className="rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold">{tr("btn.apply")}</button>
                    </div>
                    <div className="space-y-1.5">
                      {couponHints.map((c) => (
                        <button key={c.code} onClick={() => setCode(c.code)} className="w-full text-left text-xs flex justify-between p-2 rounded-lg hover:bg-card transition">
                          <span className="font-bold text-primary">{c.code}</span>
                          <span className="text-muted-foreground">{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
