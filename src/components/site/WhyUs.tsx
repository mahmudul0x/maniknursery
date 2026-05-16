import { motion } from "motion/react";
import { Award, Truck, Leaf, ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import nursery from "@/assets/nursery-aerial.jpg";

const items = [
  { Icon: Award, bn: { t: "প্রিমিয়াম মান", d: "নির্বাচিত প্রতিটি গাছ স্বাস্থ্যকর ও শক্তিশালী।" }, en: { t: "Premium Quality", d: "Every plant hand-selected for vigor." } },
  { Icon: Truck, bn: { t: "নিরাপদ ডেলিভারি", d: "সারাদেশে বিশেষ প্যাকেজিং সহ ডেলিভারি।" }, en: { t: "Safe Delivery", d: "Nationwide with protective packaging." } },
  { Icon: Leaf, bn: { t: "৮০০+ প্রজাতি", d: "দেশি-বিদেশি বিরল সংগ্রহ।" }, en: { t: "800+ Varieties", d: "Native and rare imported species." } },
  { Icon: ShieldCheck, bn: { t: "৭ দিনের গ্যারান্টি", d: "ক্ষতিগ্রস্ত হলে রিপ্লেস করা হবে।" }, en: { t: "7-Day Guarantee", d: "Replacement on any transit damage." } },
  { Icon: Sparkles, bn: { t: "এক্সপার্ট পরামর্শ", d: "যত্ন ও বাগান সাজানোর গাইড।" }, en: { t: "Expert Advice", d: "Care and garden styling guidance." } },
  { Icon: HeartHandshake, bn: { t: "২৫+ বছরের আস্থা", d: "প্রজন্ম ধরে আস্থার নাম।" }, en: { t: "25+ Years Trust", d: "A name trusted for generations." } },
];

export function WhyUs() {
  const { tr, lang } = useI18n();
  return (
    <section className="relative py-28 lg:py-36 bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <img src={nursery} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-deep via-primary/95 to-primary-deep" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-leaf/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="ornament-divider mb-5 max-w-[200px] mx-auto">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">{tr("section.why.eyebrow")}</span>
          </div>
          <h2 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-5xl lg:text-6xl font-medium leading-tight`}>
            {tr("section.why.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-3xl overflow-hidden glass-dark">
          {items.map((it, i) => (
            <motion.div
              key={it.en.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-primary-deep/60 p-10 hover:bg-primary-deep/80 transition group"
            >
              <div className="h-14 w-14 rounded-2xl bg-leaf-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-glow">
                <it.Icon className="h-6 w-6 text-primary-deep" strokeWidth={2} />
              </div>
              <h3 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-2xl font-semibold mb-3`}>
                {it[lang].t}
              </h3>
              <p className={`${lang === "bn" ? "font-bangla" : ""} text-primary-foreground/70 leading-relaxed`}>
                {it[lang].d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
