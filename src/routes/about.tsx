import { createFileRoute } from "@tanstack/react-router";
import { HadithStory } from "@/components/site/HadithStory";
import { WhyUs } from "@/components/site/WhyUs";
import { useI18n } from "@/lib/i18n";
import nursery from "@/assets/nursery-aerial.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Adarsh Manik Nursery" },
      { name: "description", content: "25+ years of growing Bangladesh's most trusted plant nursery." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { lang } = useI18n();
  return (
    <>
      <section className="relative pt-40 pb-24 bg-primary-deep text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={nursery} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/60 to-primary-deep" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-5">— Our Story —</div>
          <h1 className={`${lang === "bn" ? "font-bangla-display" : "font-display"} text-5xl md:text-7xl font-medium leading-tight mb-6`}>
            {lang === "bn" ? "এক প্রজন্মের সবুজ যাত্রা" : "A Generational Green Journey"}
          </h1>
          <p className={`${lang === "bn" ? "font-bangla" : ""} text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto`}>
            {lang === "bn"
              ? "১৯৯৮ সাল থেকে নীলফামারীর মাটিতে গড়ে উঠেছে আদর্শ মানিক নার্সারী। আজ আমরা বাংলাদেশের অন্যতম বিশ্বস্ত প্রিমিয়াম নার্সারি — যেখানে প্রতিটি গাছ এক একটি যত্নের গল্প।"
              : "Since 1998 — rooted in Nilphamari, growing across Bangladesh. We've become one of the country's most trusted premium nurseries, where every plant carries a story of care."}
          </p>
        </div>
      </section>
      <HadithStory />
      <WhyUs />
    </>
  );
}
