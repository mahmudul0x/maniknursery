import { motion } from "motion/react";
import { MapPin, Truck, Store, Headphones } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const divisions = [
  "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "সিলেট", "বরিশাল", "রংপুর", "ময়মনসিংহ",
];

export function Delivery() {
  const { tr, lang } = useI18n();
  return (
    <section className="py-28 lg:py-36 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="ornament-divider mb-6 max-w-[200px]">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">{tr("section.delivery.eyebrow")}</span>
          </div>
          <h2 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight mb-6`}>
            {tr("section.delivery.title")}
          </h2>
          <p className={`${lang === "bn" ? "font-bangla" : ""} text-lg text-muted-foreground leading-relaxed mb-10`}>
            {lang === "bn"
              ? "বাংলাদেশের ৬৪টি জেলায় বিশেষ প্যাকেজিং সহ আমাদের গাছ পৌঁছে যায় — সম্পূর্ণ নিরাপদ ও তরতাজা।"
              : "We deliver to all 64 districts of Bangladesh with specialised packaging — safe, fresh, and on time."}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { Icon: Truck, bn: "সারাদেশে ডেলিভারি", en: "Nationwide Delivery" },
              { Icon: Store, bn: "ইন-স্টোর পিকআপ", en: "In-Store Pickup" },
              { Icon: Headphones, bn: "প্ল্যান্ট কনসালটেশন", en: "Plant Consultation" },
              { Icon: MapPin, bn: "অনলাইন বুকিং", en: "Online Booking" },
            ].map((s) => (
              <div key={s.en} className="flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-primary/30 hover:bg-secondary/50 transition">
                <s.Icon className="h-5 w-5 text-leaf flex-shrink-0" />
                <span className={`${lang === "bn" ? "font-bangla" : ""} text-sm font-semibold`}>{lang === "bn" ? s.bn : s.en}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <div className="relative rounded-3xl overflow-hidden bg-leaf-gradient p-10 shadow-elegant aspect-square">
            <div className="absolute inset-0 grain opacity-30" />
            <div className="relative h-full flex flex-col">
              <div className="text-primary-foreground/80 text-xs uppercase tracking-[0.3em] mb-4">Delivery Coverage</div>
              <div className="text-primary-foreground font-display text-7xl font-bold mb-2">64</div>
              <div className="text-primary-foreground/90 font-semibold mb-8">{lang === "bn" ? "জেলায় সেবা" : "Districts Served"}</div>

              <div className="flex-1 grid grid-cols-2 gap-2 content-end">
                {divisions.map((d, i) => (
                  <motion.div
                    key={d}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="font-bangla glass rounded-xl px-3 py-2 text-sm text-primary-deep font-semibold text-center"
                  >
                    {d}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
