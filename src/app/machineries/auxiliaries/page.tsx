import type { Metadata } from "next";
import { MachineryHero } from "@/components/machineries/MachineryHero";
import { AuxiliariesSection } from "@/components/machineries/AuxiliariesSection";
import { ColorCTA } from "@/components/sections/ColorCTA";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Auxiliaries & Support Systems — Industrial Chillers & Mould Control",
  description:
    "Explore ASIR Containers' auxiliary support machinery: heavy-duty industrial water chilling plants (Chiller 1 & Chiller 2), precision mould temperature controllers, hopper dryers, and closed-loop process cooling.",
  alternates: { canonical: "/machineries/auxiliaries" },
  openGraph: {
    title: "Auxiliaries & Support Systems — ASIR Containers",
    description:
      "Continuous closed-loop industrial chilling plants, mould temperature controllers, and automated drying infrastructure.",
    url: `${site.url}/machineries/auxiliaries`,
  },
};

export default function AuxiliariesPage() {
  return (
    <>
      <MachineryHero
        badge="02 // AUXILIARIES & SUPPORT SYSTEMS"
        titleLine1="Continuous"
        titleLine2="Chilling & Process"
        titleHighlight="Auxiliaries."
        description="High-capacity industrial water chillers and precision mould temperature controllers engineered for stable thermal dissipation, zero part distortion, and rapid cycle times."
        metrics={[
          {
            value: "2 Chiller Units",
            label: "Dual Cooling Loops",
            icon: "snowflake",
            bgColor: "bg-sky-50",
            textColor: "text-sky-600",
            ringColor: "ring-sky-200/60",
          },
          {
            value: "±0.5°C Loop",
            label: "Thermal Stability",
            icon: "thermometer",
            bgColor: "bg-rose-50",
            textColor: "text-rose-600",
            ringColor: "ring-rose-200/60",
          },
          {
            value: "24/7 Redundant",
            label: "Continuous Telemetry",
            icon: "activity",
            bgColor: "bg-emerald-50",
            textColor: "text-emerald-600",
            ringColor: "ring-emerald-200/60",
          },
        ]}
        imageSrc="/images/facility/machinery-main.png"
        imageAlt="Auxiliary chilling and continuous plant cooling systems at Asir Containers"
      />
      <AuxiliariesSection />
      <ColorCTA
        eyebrow="Plant Engineering"
        heading="Need custom mold temperature profiling or dedicated chilling capacity?"
        body="Our engineering team configures dedicated chilling loops, multi-zone MTC balancing, and closed-circuit cooling for specialized industrial runs."
        ctaLabel="Contact engineering"
        image="/images/facility/dispatch.jpg"
        imageAlt="ASIR Containers auxiliary floor and finished dispatch inventory"
      />
    </>
  );
}

