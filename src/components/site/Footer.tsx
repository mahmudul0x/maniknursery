import { Leaf, Phone, MapPin, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { tr, lang } = useI18n();
  return (
    <footer className="relative bg-primary-deep text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-leaf/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-leaf-gradient flex items-center justify-center shadow-glow">
                <Leaf className="h-6 w-6 text-primary-deep" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-bangla-display text-2xl font-semibold">আদর্শ মানিক নার্সারী</div>
                <div className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">Adarsh Manik Nursery</div>
              </div>
            </div>
            <p className="text-primary-foreground/70 max-w-md leading-relaxed font-bangla">
              দেশি-বিদেশি ৮০০+ প্রজাতির ফল, ফুল ও সৌন্দর্যবর্ধক গাছের বিশাল সংগ্রহ। প্রকৃতিকে ভালোবেসে, প্রজন্মের জন্য সবুজ বিনিয়োগ।
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-leaf hover:border-leaf hover:text-primary-deep transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-gold mb-5">{lang === "bn" ? "নেভিগেশন" : "Navigation"}</div>
            <ul className="space-y-3 text-sm text-primary-foreground/75">
              <li><Link to="/" className="hover:text-leaf transition">{tr("nav.home")}</Link></li>
              <li><Link to="/collection" className="hover:text-leaf transition">{tr("nav.collection")}</Link></li>
              <li><Link to="/about" className="hover:text-leaf transition">{tr("nav.about")}</Link></li>
              <li><Link to="/gallery" className="hover:text-leaf transition">{tr("nav.gallery")}</Link></li>
              <li><Link to="/contact" className="hover:text-leaf transition">{tr("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-gold mb-5">{lang === "bn" ? "যোগাযোগ" : "Contact"}</div>
            <ul className="space-y-4 text-sm text-primary-foreground/75">
              <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 text-leaf flex-shrink-0" /><span>01799-116889<br/>+8801343-137351</span></li>
              <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-leaf flex-shrink-0" /><span className="font-bangla">কচুকাটা হাইস্কুল মাঠ সংলগ্ন, নীলফামারী সদর, রংপুর বিভাগ</span></li>
              <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 text-leaf flex-shrink-0" /><span>hello@adarshmanik.com</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-primary-foreground/50">
          <div>© {new Date().getFullYear()} আদর্শ মানিক নার্সারী · {tr("footer.rights")}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-leaf transition">Privacy</a>
            <a href="#" className="hover:text-leaf transition">Delivery Policy</a>
            <a href="#" className="hover:text-leaf transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
