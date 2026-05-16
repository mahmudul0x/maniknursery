import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Sprout, Flower2, TreePine, Home, Sun, Pill, CloudSun } from "lucide-react";
import leafMacro from "@/assets/leaf-macro.jpg";

const categories = [
  { en: "Fruit Plants", bn: "ফলের গাছ", desc: { bn: "আম, কাঁঠাল, লিচু সহ ১৫০+", en: "Mango, Litchi, Jackfruit & 150+" }, Icon: Sprout, count: "150+" },
  { en: "Flower Plants", bn: "ফুলের গাছ", desc: { bn: "গোলাপ, জবা, বেলি সহ ২০০+", en: "Rose, Hibiscus, Jasmine & 200+" }, Icon: Flower2, count: "200+" },
  { en: "Foreign Plants", bn: "বিদেশী গাছ", desc: { bn: "বিরল আমদানিকৃত প্রজাতি", en: "Rare imported species" }, Icon: TreePine, count: "80+" },
  { en: "Indoor Plants", bn: "ইনডোর প্ল্যান্ট", desc: { bn: "ঘর সাজানোর জন্য আদর্শ", en: "Perfect for interiors" }, Icon: Home, count: "120+" },
  { en: "Outdoor Plants", bn: "আউটডোর প্ল্যান্ট", desc: { bn: "বাগান ও ছাদের জন্য", en: "Garden & rooftop favourites" }, Icon: Sun, count: "100+" },
  { en: "Medicinal", bn: "ঔষধি গাছ", desc: { bn: "তুলসী, নিম, অশ্বগন্ধা", en: "Tulsi, Neem, Ashwagandha" }, Icon: Pill, count: "60+" },
  { en: "Bonsai", bn: "বনসাই সংগ্রহ", desc: { bn: "শৈল্পিক ক্ষুদ্র বৃক্ষ", en: "Artistic miniature trees" }, Icon: CloudSun, count: "40+" },
  { en: "Seasonal", bn: "মৌসুমি গাছ", desc: { bn: "ঋতু অনুযায়ী বাছাই", en: "Curated by season" }, Icon: Sprout, count: "50+" },
];

export function Categories() {
  const { tr, lang } = useI18n();
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden bg-cream-gradient">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.04] pointer-events-none">
        <img src={leafMacro} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="ornament-divider mb-5 max-w-[180px]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">{tr("section.collection.eyebrow")}</span>
            </div>
            <h2 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight max-w-2xl`}>
              {tr("section.collection.title")}
            </h2>
          </div>
          <p className={`${lang === "bn" ? "font-bangla" : ""} text-muted-foreground max-w-md text-lg leading-relaxed`}>
            {tr("section.collection.sub")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c, i) => (
            <motion.a
              key={c.en}
              href="/collection"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-3xl bg-card p-7 border border-border hover:border-primary/20 shadow-card hover:shadow-elegant transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-leaf/10 group-hover:bg-leaf/20 blur-2xl transition" />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-leaf-gradient flex items-center justify-center shadow-glow mb-6 group-hover:scale-110 transition-transform">
                  <c.Icon className="h-6 w-6 text-primary-foreground" strokeWidth={2} />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-gold mb-2">{c.count} Varieties</div>
                <h3 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-2xl font-semibold text-foreground mb-2`}>
                  {lang === "bn" ? c.bn : c.en}
                </h3>
                <p className={`${lang === "bn" ? "font-bangla" : ""} text-sm text-muted-foreground leading-relaxed`}>
                  {c.desc[lang]}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
