import { motion } from "motion/react";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import leaf from "@/assets/leaf-macro.jpg";

export function ContactCTA() {
  const { tr, lang } = useI18n();
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={leaf} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-primary-deep/85" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center text-primary-foreground">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-6`}>
            {tr("section.contact.title")}
          </h2>
          <p className={`${lang === "bn" ? "font-bangla" : ""} text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10`}>
            {tr("section.contact.sub")}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+8801799116889" className="group inline-flex items-center gap-3 rounded-full bg-leaf text-primary-deep px-8 py-4 font-semibold shadow-glow hover:-translate-y-0.5 transition">
              <Phone className="h-4 w-4" />
              01799-116889
            </a>
            <a href="https://wa.me/8801799116889" className="inline-flex items-center gap-3 rounded-full glass-dark text-primary-foreground px-8 py-4 font-semibold hover:bg-primary-foreground/10 transition">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-gold text-primary-deep px-8 py-4 font-semibold hover:-translate-y-0.5 transition">
              {tr("hero.cta3")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
