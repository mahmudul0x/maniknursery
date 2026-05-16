import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Leaf, Menu, X, ShoppingBag, Heart, ShoppingCart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useShop } from "@/lib/shop";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { lang, setLang, tr } = useI18n();
  const { cartCount, wishlist } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", key: "nav.home" as const },
    { to: "/collection", key: "nav.collection" as const },
    { to: "/about", key: "nav.about" as const },
    { to: "/gallery", key: "nav.gallery" as const },
    { to: "/contact", key: "nav.contact" as const },
  ];

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", scrolled ? "py-2" : "py-4")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn("flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500", scrolled ? "glass shadow-card" : "bg-transparent")}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-leaf-gradient rounded-full blur-md opacity-40 group-hover:opacity-70 transition" />
              <div className="relative h-10 w-10 rounded-full bg-leaf-gradient flex items-center justify-center shadow-glow">
                <Leaf className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
            </div>
            <div className="leading-tight">
              <div className="text-base font-semibold tracking-tight text-foreground">
                <span className="font-bangla-display">আদর্শ মানিক</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Nursery · Since 1998</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition group"
                activeProps={{ className: "text-foreground" }}
              >
                {tr(l.key)}
                <span className="absolute left-4 right-4 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 bg-leaf-gradient transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setLang(lang === "bn" ? "en" : "bn")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-border/60 hover:border-primary/30 hover:bg-secondary/60 transition"
              aria-label="Toggle language"
            >
              <span className={lang === "bn" ? "text-primary" : "text-muted-foreground"}>BN</span>
              <span className="text-muted-foreground">/</span>
              <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
            </button>

            <Link to="/wishlist" className="relative p-2.5 rounded-full hover:bg-secondary/60 transition" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center px-1">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-secondary/60 transition" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-leaf text-primary-deep text-[10px] font-bold flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/collection" className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all">
              <ShoppingBag className="h-4 w-4" />
              {tr("nav.shop")}
            </Link>

            <button className="lg:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-4 shadow-card animate-fade-in">
            <nav className="flex flex-col">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-4 py-3 rounded-lg hover:bg-secondary text-foreground/90 font-medium">
                  {tr(l.key)}
                </Link>
              ))}
              <button onClick={() => setLang(lang === "bn" ? "en" : "bn")} className="mt-2 px-4 py-3 rounded-lg bg-secondary text-sm font-semibold">
                {lang === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
