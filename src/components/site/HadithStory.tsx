import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import hands from "@/assets/hands-planting.jpg";

export function HadithStory() {
  const { tr, lang } = useI18n();
  return (
    <section className="relative py-32 lg:py-44 overflow-hidden bg-background">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
            <img src={hands} alt="Planting a seedling" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-8 hidden md:block bg-gold-gradient rounded-2xl px-8 py-6 shadow-elegant">
            <div className="text-primary-deep">
              <div className="font-display text-3xl font-bold">25+</div>
              <div className="text-xs uppercase tracking-[0.2em] font-semibold">Years of Care</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="ornament-divider mb-8 max-w-[200px]">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">— Our Philosophy —</span>
          </div>

          <svg className="text-gold mb-6" width="56" height="40" viewBox="0 0 56 40" fill="currentColor">
            <path d="M0 40V24C0 11 8 0 22 0v8c-8 0-12 8-12 16h12v16H0zm32 0V24C32 11 40 0 54 0v8c-8 0-12 8-12 16h12v16H32z" />
          </svg>

          <blockquote className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.2] tracking-tight`}>
            {tr("section.hadith.text")}
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold font-semibold tracking-widest text-sm">{tr("section.hadith.cite")}</span>
          </div>

          <p className={`${lang === "bn" ? "font-bangla" : ""} mt-10 text-lg text-muted-foreground leading-relaxed max-w-xl`}>
            {lang === "bn"
              ? "আমরা শুধু গাছ বিক্রি করি না — আমরা একটি সবুজ ভবিষ্যৎ রোপণ করি। প্রতিটি চারা আমাদের কাছে এক পবিত্র দায়িত্ব।"
              : "We don't just sell plants — we plant a greener future. Every sapling we nurture is a sacred trust we carry forward."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
