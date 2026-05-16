import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const reviews = [
  {
    bn: { name: "নুসরাত জাহান", loc: "ঢাকা", text: "অসাধারণ প্যাকেজিং। আমার মনস্টেরা প্ল্যান্টটি একদম তরতাজা পৌঁছেছে। আদর্শ মানিকের সেবায় মুগ্ধ।", plant: "মনস্টেরা ডেলিসিওসা" },
    en: { name: "Nusrat Jahan", loc: "Dhaka", text: "Exceptional packaging. My Monstera arrived absolutely fresh. Truly impressed by Adarsh Manik's service.", plant: "Monstera Deliciosa" },
  },
  {
    bn: { name: "ডাঃ রফিকুল ইসলাম", loc: "চট্টগ্রাম", text: "৩ বছর ধরে এদের কাছ থেকে গাছ নিচ্ছি। মানে কোনো কম্প্রোমাইজ নেই। ছাদ বাগানের জন্য সেরা।", plant: "থাই পেয়ারা" },
    en: { name: "Dr. Rafiqul Islam", loc: "Chittagong", text: "Buying from them for 3 years. Zero compromise on quality. Best choice for rooftop gardens.", plant: "Thai Guava" },
  },
  {
    bn: { name: "সাবিহা আহমেদ", loc: "সিলেট", text: "বনসাই কালেকশনটি দেখে মুগ্ধ। প্রতিটি গাছ যেন এক একটি শিল্পকর্ম।", plant: "ফাইকাস বনসাই" },
    en: { name: "Sabiha Ahmed", loc: "Sylhet", text: "Their bonsai collection is breathtaking. Each plant is a piece of living art.", plant: "Ficus Bonsai" },
  },
];

export function Reviews() {
  const { tr, lang } = useI18n();
  return (
    <section className="py-28 lg:py-36 bg-cream-gradient">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">{tr("section.reviews.eyebrow")}</span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-5xl lg:text-6xl font-medium text-foreground`}>
            {tr("section.reviews.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => {
            const d = r[lang];
            return (
              <motion.div
                key={r.en.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-card rounded-3xl p-8 shadow-card hover:shadow-elegant transition-all border border-border"
              >
                <Quote className="absolute top-6 right-6 h-10 w-10 text-leaf/20" />
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className={`${lang === "bn" ? "font-bangla" : ""} text-foreground/85 leading-relaxed mb-8 text-[15px]`}>
                  "{d.text}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="h-12 w-12 rounded-full bg-leaf-gradient flex items-center justify-center text-primary-foreground font-display text-lg font-semibold">
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <div className={`${lang === "bn" ? "font-bangla" : ""} font-semibold text-foreground`}>{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.loc} · <span className="text-leaf font-semibold">{d.plant}</span></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
