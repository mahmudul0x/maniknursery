import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { Featured } from "@/components/site/Featured";
import { WhyUs } from "@/components/site/WhyUs";
import { HadithStory } from "@/components/site/HadithStory";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Reviews } from "@/components/site/Reviews";
import { Delivery } from "@/components/site/Delivery";
import { ContactCTA } from "@/components/site/ContactCTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Categories />
      <Featured />
      <WhyUs />
      <BeforeAfter />
      <HadithStory />
      <Reviews />
      <Delivery />
      <ContactCTA />
    </>
  );
}
