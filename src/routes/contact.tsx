import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Adarsh Manik Nursery" },
      { name: "description", content: "Get in touch with Adarsh Manik Nursery. Nationwide delivery and expert plant consultation." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { lang } = useI18n();
  return (
    <section className="pt-40 pb-28 bg-cream-gradient min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-5">Contact</div>
          <h1 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-5xl md:text-6xl font-medium text-foreground`}>
            {lang === "bn" ? "আমাদের সাথে কথা বলুন" : "Let's Talk Plants"}
          </h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {[
              { Icon: Phone, label: lang === "bn" ? "ফোন" : "Phone", value: "01799-116889\n+8801343-137351", href: "tel:+8801799116889" },
              { Icon: MessageCircle, label: "WhatsApp", value: "+880 1799-116889", href: "https://wa.me/8801799116889" },
              { Icon: Mail, label: "Email", value: "hello@adarshmanik.com", href: "mailto:hello@adarshmanik.com" },
              { Icon: MapPin, label: lang === "bn" ? "ঠিকানা" : "Address", value: lang === "bn" ? "কচুকাটা হাইস্কুল মাঠ সংলগ্ন\nনীলফামারী সদর, রংপুর বিভাগ" : "Kuchukata, Nilphamari Sadar\nRangpur Division, Bangladesh" },
            ].map((c) => (
              <a key={c.label} href={c.href ?? "#"} className="flex gap-5 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-elegant transition">
                <div className="h-12 w-12 rounded-xl bg-leaf-gradient flex items-center justify-center flex-shrink-0">
                  <c.Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">{c.label}</div>
                  <div className={`${lang === "bn" ? "font-bangla" : ""} font-semibold text-foreground whitespace-pre-line`}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <form className="lg:col-span-3 bg-card rounded-3xl p-8 lg:p-10 shadow-card border border-border space-y-5">
            <h2 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-3xl font-semibold text-foreground mb-2`}>
              {lang === "bn" ? "একটি বার্তা পাঠান" : "Send us a message"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder={lang === "bn" ? "আপনার নাম" : "Your Name"} />
              <input className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder={lang === "bn" ? "মোবাইল নম্বর" : "Phone Number"} />
            </div>
            <input className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder="Email" />
            <textarea rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder={lang === "bn" ? "আপনার বার্তা..." : "Your message..."} />
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-card hover:shadow-glow hover:-translate-y-0.5 transition">
              <Send className="h-4 w-4" />
              {lang === "bn" ? "বার্তা পাঠান" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
