import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { motion } from "motion/react";
import { ZoomIn } from "lucide-react";
import { Lightbox } from "@/components/site/Lightbox";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import hero from "@/assets/hero-nursery.jpg";
import leaf from "@/assets/leaf-macro.jpg";
import indoor from "@/assets/plant-indoor.jpg";
import flower from "@/assets/plant-flower.jpg";
import fruit from "@/assets/plant-fruit.jpg";
import bonsai from "@/assets/plant-bonsai.jpg";
import nursery from "@/assets/nursery-aerial.jpg";
import hands from "@/assets/hands-planting.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";

const items = [
  { src: hero, span: "md:col-span-2 md:row-span-2" },
  { src: leaf, span: "" },
  { src: flower, span: "" },
  { src: nursery, span: "md:col-span-2" },
  { src: bonsai, span: "" },
  { src: indoor, span: "" },
  { src: fruit, span: "md:row-span-2" },
  { src: hands, span: "md:col-span-2" },
  { src: slide2, span: "" },
  { src: slide3, span: "" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Adarsh Manik Nursery" }] }),
  component: GalleryPage,
});

function GalleryPage() {
  const { lang } = useI18n();
  const [idx, setIdx] = useState<number | null>(null);
  const images = items.map((it) => it.src);

  return (
    <>
      <section className="pt-40 pb-20 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-5">— Gallery —</div>
            <h1 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-5xl md:text-6xl font-medium text-foreground`}>
              {lang === "bn" ? "আমাদের নার্সারির ঝলক" : "Glimpses of Our Nursery"}
            </h1>
            <p className={`${lang === "bn" ? "font-bangla" : ""} mt-4 text-muted-foreground max-w-xl mx-auto`}>
              {lang === "bn" ? "ছবিতে ক্লিক করুন — পূর্ণস্ক্রীনে জুম করে দেখুন।" : "Click any image to open the premium lightbox with zoom."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
            {items.map((it, i) => (
              <motion.button
                key={i}
                onClick={() => setIdx(i)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={`relative rounded-3xl overflow-hidden group cursor-zoom-in shadow-card ${it.span}`}
              >
                <img src={it.src} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary-deep/0 group-hover:bg-primary-deep/40 transition flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfter />

      <Lightbox images={images} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </>
  );
}
