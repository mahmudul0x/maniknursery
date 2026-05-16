import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useShop, cartItemsOf } from "@/lib/shop";
import { useI18n } from "@/lib/i18n";
import { waUrl } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Adarsh Manik Nursery" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lang, tr } = useI18n();
  const nav = useNavigate();
  const { cart, subtotal, shipping, discount, total, coupon, clear } = useShop();
  const items = cartItemsOf(cart);
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error(lang === "bn" ? "প্রয়োজনীয় তথ্য পূরণ করুন" : "Please fill required fields");
      return;
    }
    const lines = items.map((it) => `• ${it.p[lang].name} × ${it.qty} = ৳${it.p.price * it.qty}`).join("\n");
    const msg = lang === "bn"
      ? `আসসালামু আলাইকুম 🌿\nআমি নিচের অর্ডারটি দিতে চাই:\n\n${lines}\n\nসাবটোটাল: ৳${subtotal}\nডেলিভারি: ৳${shipping}\nডিসকাউন্ট: ৳${discount}\nমোট: ৳${total}\n${coupon ? `কুপন: ${coupon.code}\n` : ""}\nনাম: ${form.name}\nফোন: ${form.phone}\nঠিকানা: ${form.address}\n${form.note ? `নোট: ${form.note}` : ""}`
      : `Hi 🌿\nI'd like to place this order:\n\n${lines}\n\nSubtotal: ৳${subtotal}\nShipping: ৳${shipping}\nDiscount: ৳${discount}\nTotal: ৳${total}\n${coupon ? `Coupon: ${coupon.code}\n` : ""}\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\n${form.note ? `Note: ${form.note}` : ""}`;
    window.open(waUrl(msg), "_blank");
    toast.success(lang === "bn" ? "অর্ডারটি WhatsApp এ পাঠানো হয়েছে!" : "Order sent via WhatsApp!");
    clear();
    setTimeout(() => nav({ to: "/" }), 800);
  };

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen bg-background">
        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-6">{tr("cart.empty")}</p>
        <Link to="/collection" className="rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold">{tr("btn.continueShopping")}</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-3">— Checkout —</div>
          <h1 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-5xl font-medium`}>{tr("checkout.title")}</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <form onSubmit={submit} className="rounded-3xl bg-card border border-border p-6 lg:p-8 shadow-card space-y-5">
            {[
              { k: "name", l: tr("checkout.name"), type: "text", req: true },
              { k: "phone", l: tr("checkout.phone"), type: "tel", req: true },
            ].map((f) => (
              <div key={f.k}>
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">{f.l}{f.req && " *"}</label>
                <input
                  required={f.req}
                  type={f.type}
                  value={form[f.k as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">{tr("checkout.address")} *</label>
              <textarea required rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">{tr("checkout.note")}</label>
              <textarea rows={2} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex items-center gap-2 text-sm text-leaf">
              <CheckCircle2 className="h-4 w-4" /> {lang === "bn" ? "ক্যাশ অন ডেলিভারি ও বিকাশ সাপোর্টেড" : "Cash on delivery & bKash supported"}
            </div>
            <button type="submit" className="w-full rounded-full bg-leaf text-primary-deep px-6 py-4 font-bold text-lg shadow-glow hover:scale-[1.01] transition">
              {tr("checkout.place")}
            </button>
          </form>

          {/* Summary */}
          <div className="lg:sticky lg:top-28 h-fit rounded-3xl bg-cream-gradient border border-border p-6">
            <h3 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-xl font-semibold mb-5`}>Order Summary</h3>
            <div className="space-y-3 mb-5 max-h-72 overflow-auto pr-1">
              {items.map(({ p, qty }) => (
                <div key={p.slug} className="flex gap-3">
                  <div className="h-14 w-14 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                    <img src={p.cover} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{p[lang].name}</div>
                    <div className="text-xs text-muted-foreground">× {qty}</div>
                  </div>
                  <div className="text-sm font-semibold">৳ {p.price * qty}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm pt-4 border-t border-border">
              <div className="flex justify-between"><span className="text-muted-foreground">{tr("cart.subtotal")}</span><span>৳ {subtotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{tr("cart.shipping")}</span><span>{shipping === 0 ? tr("cart.free") : `৳ ${shipping}`}</span></div>
              {discount > 0 && <div className="flex justify-between text-leaf"><span>{tr("cart.discount")}</span><span>− ৳ {discount}</span></div>}
              <div className="pt-3 mt-3 border-t border-border flex justify-between items-baseline">
                <span className="font-display text-lg font-semibold">{tr("cart.total")}</span>
                <span className="font-display text-2xl font-semibold text-primary">৳ {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
