import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import slide1 from "@/assets/hero-nursery.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";
import slide4 from "@/assets/nursery-aerial.jpg";

const slides = [
  { src: slide1, bn: "প্রকৃতির সৌন্দর্য এখন\nআপনার হাতের নাগালে", en: "Nature's Beauty,\nNow Within Your Reach" },
  { src: slide2, bn: "৮০০+ প্রজাতির\nবিরল সংগ্রহ", en: "A Rare Collection\nof 800+ Species" },
  { src: slide3, bn: "প্রতিটি চারা\nহাতে যত্নে গড়া", en: "Every Sapling,\nHand-raised with Care" },
  { src: slide4, bn: "সারাদেশে\nনিরাপদ ডেলিভারি", en: "Safe Delivery\nNationwide" },
];

export function Hero() {
  const { tr, lang } = useI18n();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const cur = slides[i];
  const title = lang === "bn" ? cur.bn : cur.en;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-primary-deep text-primary-foreground">
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={cur.src} alt="" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 hero-scrim" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Floating leaves */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, k) => (
          <motion.div
            key={k}
            className="absolute text-leaf/30"
            style={{ left: `${10 + k * 15}%`, top: `${20 + (k % 3) * 25}%` }}
            animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6 + k, repeat: Infinity, ease: "easeInOut", delay: k * 0.5 }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-40 pb-24 min-h-[100svh] flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-xs uppercase tracking-[0.25em] text-primary-foreground/80">{tr("hero.eyebrow")}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
              className={`${lang === "bn" ? "font-bangla-display" : "font-display"} hero-text-safe text-[2.25rem] xs:text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] sm:leading-[1.05] tracking-tight sm:tracking-[-0.01em] mb-6 sm:mb-8 px-2 sm:px-0`}
            >
              {title.split("\n").map((line, n) => (
                <span key={n} className="block">
                  {n === 0 ? line : <span className="text-gradient-gold italic">{line}</span>}
                </span>
              ))}
            </motion.h1>
          </AnimatePresence>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className={`${lang === "bn" ? "font-bangla" : ""} hero-text-muted text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed sm:leading-relaxed mb-8 sm:mb-10 mx-auto px-2 sm:px-0`}>
            {tr("hero.sub")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/collection" className="group inline-flex items-center gap-2 rounded-full bg-leaf text-primary-deep px-7 py-4 font-semibold shadow-glow hover:shadow-elegant hover:-translate-y-0.5 transition-all">
              {tr("hero.cta1")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/collection" className="inline-flex items-center gap-2 rounded-full glass-dark text-primary-foreground px-7 py-4 font-semibold hover:bg-primary-foreground/10 transition">
              <Play className="h-4 w-4 fill-current" />
              {tr("hero.cta2")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Slide controls */}
        <div className="mt-16 flex items-center gap-4">
          <button onClick={() => setI((v) => (v - 1 + slides.length) % slides.length)} className="h-11 w-11 rounded-full glass-dark text-primary-foreground flex items-center justify-center hover:scale-110 transition" aria-label="Previous slide">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, k) => (
              <button key={k} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-leaf" : "w-5 bg-primary-foreground/30 hover:bg-primary-foreground/50"}`} aria-label={`Slide ${k + 1}`} />
            ))}
          </div>
          <button onClick={() => setI((v) => (v + 1) % slides.length)} className="h-11 w-11 rounded-full glass-dark text-primary-foreground flex items-center justify-center hover:scale-110 transition" aria-label="Next slide">
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="ml-auto text-xs uppercase tracking-[0.3em] text-primary-foreground/60 font-semibold">
            {String(i + 1).padStart(2, "0")} <span className="text-primary-foreground/30">/ {String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden glass-dark">
          {[
            { n: "800+", k: "stat.species" as const },
            { n: "12K+", k: "stat.customers" as const },
            { n: "64", k: "stat.districts" as const },
            { n: "25+", k: "stat.years" as const },
          ].map((s) => (
            <div key={s.k} className="bg-primary-deep/40 px-6 py-7 text-center">
              <div className="text-3xl md:text-4xl font-display font-semibold text-gradient-gold">{s.n}</div>
              <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mt-2 font-bangla">{tr(s.k)}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
