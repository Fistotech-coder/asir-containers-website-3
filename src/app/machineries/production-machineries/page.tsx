import type { Metadata } from "next";
import { MachineryHero } from "@/components/machineries/MachineryHero";
import { ProductionMachineriesSection } from "@/components/machineries/ProductionMachineriesSection";
import { ColorCTA } from "@/components/sections/ColorCTA";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Production Machineries — Screen Printing, HTL & IML",
  description:
    "Explore ASIR Containers' production machineries: high-tonnage injection cells (80T-650T), 6-colour semi-automatic rotary screen printing, heat transfer labelling (HTL), and automated robotic in-mould labelling (IML).",
  alternates: { canonical: "/machineries/production-machineries" },
  openGraph: {
    title: "Production Machineries — ASIR Containers",
    description:
      "High-speed injection moulding, 6-colour rotary screen printing, HTL and precision robotic IML automation.",
    url: `${site.url}/machineries/production-machineries`,
  },
};

export default function ProductionMachineriesPage() {
  return (
    <>
      <MachineryHero
        titleLine1="High-Tonnage"
        titleLine2="Precision"
        titleHighlight="Moulding."
        description="Advanced injection moulding cells and high-speed robotic decoration lines engineered for stronger, safer, and visually commanding rigid plastic packaging."
        metrics={[
          {
            value: "80T–650T",
            label: "Clamping Force",
            icon: "box",
            bgColor: "bg-cyan-50",
            textColor: "text-cyan-600",
            ringColor: "ring-cyan-200/60",
          },
          {
            value: "6-Colour Rotary",
            label: "Screen Printing",
            icon: "cog",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600",
            ringColor: "ring-blue-200/60",
          },
          {
            value: "±0.015mm",
            label: "Precision Tolerance",
            icon: "crosshair",
            bgColor: "bg-emerald-50",
            textColor: "text-emerald-600",
            ringColor: "ring-emerald-200/60",
          },
        ]}
        imageSrc="/images/technologies/technology-hero.webp"
        imageAlt="Production Machineries and injection line at Asir Containers"
      />
      <ProductionMachineriesSection />
      <ColorCTA
        eyebrow="Production Capacity"
        heading="Have volume requirements or specific machine tooling?"
        body="Inquire about machine allocation, multi-cavity tooling, cycle times, and automated in-mould labelling capabilities."
        ctaLabel="Inquire capacity"
        image="/images/facility/labelling.jpg"
        imageAlt="Containers moving along the in-house printing and labelling line"
      />
    </>
  );
}

