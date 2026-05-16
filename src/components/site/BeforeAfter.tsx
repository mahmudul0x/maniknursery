import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import before from "@/assets/garden-before.jpg";
import after from "@/assets/garden-after.jpg";

function Slider({ a, b }: { a: string; b: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-elegant select-none cursor-ew-resize"
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onMouseDown={(e) => move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onTouchStart={(e) => move(e.touches[0].clientX)}
    >
      <img src={a} alt="Before" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={b} alt="After" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-dark text-primary-foreground text-[10px] uppercase tracking-[0.25em] font-semibold">Before</div>
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-leaf text-primary-deep text-[10px] uppercase tracking-[0.25em] font-bold">After</div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground/90 shadow-glow pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-leaf text-primary-deep flex items-center justify-center shadow-glow font-bold">
          ⇆
        </div>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const { lang } = useI18n();
  return (
    <section className="py-28 lg:py-36 bg-cream-gradient">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-4">
            {lang === "bn" ? "— বাগানের রূপান্তর —" : "— Garden Transformations —"}
          </div>
          <h2 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-5xl lg:text-6xl font-medium text-foreground`}>
            {lang === "bn" ? "আগে ও পরে" : "Before & After"}
          </h2>
          <p className={`${lang === "bn" ? "font-bangla" : ""} mt-4 text-muted-foreground max-w-xl mx-auto`}>
            {lang === "bn" ? "টেনে দেখুন — আমাদের গ্রাহকদের সত্যিকারের বাগানের গল্প।" : "Drag the slider — real gardens transformed by our plants."}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Slider a={before} b={after} />
        </motion.div>
      </div>
    </section>
  );
}
