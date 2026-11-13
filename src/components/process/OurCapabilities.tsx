"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Boxes,
  Printer,
  Flame,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  Droplets,
  Clock,
  Eye,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { gsap, useGSAP, reduceMotion, useScrollReveal } from "@/lib/animations";
import { clientLogos, allHomeClients, type ClientLogo } from "@/data/manufacturing";

export type CapabilityId = "injection-moulding" | "screen-printing" | "htl" | "iml";

interface CapabilityItem {
  id: CapabilityId;
  tabLabel: string;
  category: "moulding" | "printing";
  title: string;
  tagline: string;
  overview: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  stepsHeading: string;
  steps: {
    number: string;
    title: string;
    description: string;
  }[];
  benefitsHeading: string;
  benefits: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  applications: string[];
  clientLogos?: ClientLogo[];
  comparisonTable?: {
    feature: string;
    iml: string;
    traditional: string;
  }[];
}

const capabilitiesData: CapabilityItem[] = [
  {
    id: "injection-moulding",
    tabLabel: "Injection moulding",
    category: "moulding",
    title: "High-Tonnage Injection Moulding",
    tagline: "Micron-Level Precision Tooling & High-Volume Reliability",
    overview:
      "Our in-house injection moulding facility operates high-tonnage hydraulic and all-electric moulding cells (80 T to 650 T) equipped with multi-cavity hardened steel dies, automated hot-runner systems, and robotic parts removal. Every container, lid, and handle is precision-moulded from 100% virgin food-grade polymers to guarantee drop impact resistance and zero leakage.",
    image: "/images/technologies/capability-injection-moulding.webp",
    imageAlt: "High-tonnage injection moulding machines operating on the plant floor",
    icon: Boxes,
    stepsHeading: "How Injection Moulding Works",
    steps: [
      {
        number: "01",
        title: "Polymer Preparation",
        description: "Virgin food-grade PP granules and UV masterbatches are pneumatically conveyed and dehumidified.",
      },
      {
        number: "02",
        title: "Plasticizing & Melting",
        description: "Reciprocating screw barrels melt polymers at tightly monitored thermal profiles.",
      },
      {
        number: "03",
        title: "High-Pressure Injection",
        description: "Molten polymer is injected at controlled velocity into hardened multi-cavity tooling dies.",
      },
      {
        number: "04",
        title: "Conformal Cooling",
        description: "High-flow chilling circuits rapidly cool parts to eliminate shrinkage, sink marks, or warpage.",
      },
      {
        number: "05",
        title: "Robotic Demoulding",
        description: "Automated 3-axis Cartesian robots extract containers with zero surface blemishes.",
      },
    ],
    benefitsHeading: "Key Operational Highlights",
    benefits: [
      {
        title: "80 T – 650 T Working Envelope",
        description: "Versatile clamping tonnage handling 500 ml tubs up to 20 L industrial pails.",
        icon: Boxes,
      },
      {
        title: "100% Virgin Food-Grade Polymers",
        description: "Certified virgin polypropylene meeting stringent food contact and chemical compatibility standards.",
        icon: ShieldCheck,
      },
      {
        title: "Hermetic Closure Engineering",
        description: "Tamper-evident tear strips, triple-lip seals, and outer-locking rim tooling.",
        icon: CheckCircle2,
      },
      {
        title: "Optimized Cycle Time",
        description: "High-efficiency tooling and robotic handling maximize hourly production output.",
        icon: Clock,
      },
    ],
    applications: [
      "Industrial paint pails & lids (500 ml – 20 L)",
      "Heavy-duty square interlock buckets (5 L – 17 L)",
      "Weight-marked storage pails (1 kg – 20 kg)",
      "Airtight food-grade dairy & edible oil containers",
    ],
    clientLogos: allHomeClients.slice(0, 4),
  },
  {
    id: "screen-printing",
    tabLabel: "Screen Printing",
    category: "printing",
    title: "Screen Printing Technology",
    tagline: "Bringing Designs to Life with Precision Screen Printing",
    overview:
      "Screen Printing is a highly reliable direct-to-wall printing technology used to transfer ink directly onto curved or flat container surfaces through specially exposed mesh screens. Using calibrated automated squeegees and in-line flame treatment, it delivers bold, opaque graphics, vibrant brand logos, and exceptional long-term outdoor resistance.",
    image: "/images/technologies/capability-screen-printing.webp",
    imageAlt: "Semi-automatic rotary screen printing line applying vibrant graphics on plastic pails",
    icon: Printer,
    stepsHeading: "How Screen Printing Works",
    steps: [
      {
        number: "01",
        title: "Artwork & Screen Prep",
        description: "High-mesh tension polyester screens are photographically exposed with high-resolution stencils.",
      },
      {
        number: "02",
        title: "Pre-Treatment (Flame Treating)",
        description: "Automated gas flaming increases surface energy on polymer walls to ensure maximum ink adhesion.",
      },
      {
        number: "03",
        title: "Direct Ink Transfer",
        description: "A precision polyurethane squeegee presses heavy-bodied UV ink through the open screen mesh.",
      },
      {
        number: "04",
        title: "Instant UV / Thermal Curing",
        description: "High-intensity UV lamp stations polymerize ink instantaneously, locking color vibrancy.",
      },
      {
        number: "05",
        title: "Quality Verification",
        description: "Cross-hatch tape adhesion, color density, and registration checks conducted per batch.",
      },
    ],
    benefitsHeading: "Key Advantages of Screen Printing",
    benefits: [
      {
        title: "High-Visibility & Color Vibrancy",
        description: "Solid, heavy ink deposits produce bold color depth and sharp, readable regulatory copy.",
        icon: Eye,
      },
      {
        title: "Cost-Effective for Bulk Production",
        description: "Ultra-economical for large, repeat manufacturing runs with minimal tooling wear.",
        icon: Sparkles,
      },
      {
        title: "Outstanding Adhesion & Weatherproof",
        description: "UV-cured formulation resists sun fade, moisture, oil splashes, and chemical spillage.",
        icon: ShieldCheck,
      },
      {
        title: "Multi-Color Rotary Registration",
        description: "Up to 6 colors applied in seamless rotary indexing for complete circular coverage.",
        icon: Layers,
      },
    ],
    applications: [
      "Plastic paint buckets & industrial emulsion pails",
      "Chemical, solvent, and detergent packaging",
      "Lubricants, automotive greases & gear oils",
      "Construction chemicals & tile adhesive pails",
    ],
    clientLogos: clientLogos.screenPrinting,
  },
  {
    id: "htl",
    tabLabel: "HTL (Heat Transfer Labeling)",
    category: "printing",
    title: "Heat Transfer Labelling (HTL)",
    tagline: "Precision Printing. Premium Finish. Powerful Branding.",
    overview:
      "Heat Transfer Labelling (HTL) transfers multi-color photographic graphics and metallic accents from a pre-printed carrier film directly onto plastic container surfaces using calibrated heat and pressure rollers. This specialized thermal process bonds the lacquer coating directly into the polymer substrate, producing a sleek, glossy, and scratch-resistant finish ideal for retail shelf appeal.",
    image: "/images/technologies/capability-heat-transfer.webp",
    imageAlt: "Heat transfer labeling machine transferring photographic graphics onto plastic buckets",
    icon: Flame,
    stepsHeading: "How HTL Technology Works",
    steps: [
      {
        number: "01",
        title: "Design & Film Gravure",
        description: "Photo-quality graphics, gradients, and barcodes are printed onto specialized polyester transfer film.",
      },
      {
        number: "02",
        title: "Container Positioning",
        description: "The container is positioned and locked onto an expanding mandrel for rigid cylindrical support.",
      },
      {
        number: "03",
        title: "Heated Roller Application",
        description: "High-temperature silicone rollers apply calibrated pressure and thermal energy across the contact line.",
      },
      {
        number: "04",
        title: "Carrier Release",
        description: "The carrier foil peels away cleanly, leaving the multi-color printed ink permanently fused.",
      },
      {
        number: "05",
        title: "Final Inspection",
        description: "100% optical check for graphic alignment, gloss consistency, and bubble-free transfer.",
      },
    ],
    benefitsHeading: "Key Benefits of HTL Technology",
    benefits: [
      {
        title: "Photorealistic HD Reproduction",
        description: "Renders complex gradients, metallic shades, fine typography, and scannable QR codes cleanly.",
        icon: Sparkles,
      },
      {
        title: "Smooth, Edge-Free Surface Finish",
        description: "Creates an attractive, smooth surface that feels monolithic and premium to the touch.",
        icon: CheckCircle2,
      },
      {
        title: "Chemical & Moisture Resistance",
        description: "Resistant to moisture, oils, and chemical spills encountered in agrochemical and retail environments.",
        icon: Droplets,
      },
      {
        title: "Flexible Production Runs",
        description: "Allows rapid artwork changeovers between seasonal or localized packaging variants.",
        icon: Repeat,
      },
    ],
    applications: [
      "Agrochemical & fertilizer containers",
      "Decorative paint buckets & premium primers",
      "Specialty household & retail packaging",
      "Automotive lubricants & specialty greases",
    ],
    clientLogos: clientLogos.htl,
  },
  {
    id: "iml",
    tabLabel: "In-mould labeling",
    category: "printing",
    title: "What is In-Mould Labelling (IML)?",
    tagline: "Seamless, Scratch-Resistant & Permanent Fusion",
    overview:
      "In-Mould Labelling (IML) is an advanced decoration technology that integrates a pre-printed polypropylene label directly into the container during the injection moulding process. The printed label is placed inside the mould cavity before molten plastic is injected; through extreme heat and pressure, the label fuses with the container material, becoming an integral, inseparable part of the finished product.",
    image: "/images/technologies/capability-in-mould-labelling.webp",
    imageAlt: "In-mould labeling robotic arm loading labels into multi-cavity injection mould",
    icon: Bot,
    stepsHeading: "How Does IML Technology Work?",
    steps: [
      {
        number: "01",
        title: "Label Printing",
        description: "High-resolution graphics and photorealistic designs are gravure-printed onto specialized plastic film.",
      },
      {
        number: "02",
        title: "Robotic Placement",
        description: "High-speed electrostatic or vacuum robotic arms accurately position the label inside the open mould.",
      },
      {
        number: "03",
        title: "Molten Plastic Injection",
        description: "Virgin molten PP is injected into the mould under high pressure, instantly bonding with the label.",
      },
      {
        number: "04",
        title: "Cooling & Integration",
        description: "The container solidifies, permanently integrating the label into the wall with zero seams or edges.",
      },
      {
        number: "05",
        title: "Final Product Demoulding",
        description: "Finished container emerges fully decorated with an impeccable, scratch-proof, high-gloss finish.",
      },
    ],
    benefitsHeading: "Key Benefits of IML Technology",
    benefits: [
      {
        title: "Permanent Integration",
        description: "The label becomes part of the plastic wall — zero peeling, bubbling, or edge lifting over time.",
        icon: ShieldCheck,
      },
      {
        title: "Extreme Scratch & Abrasion Resistance",
        description: "Withstands rough transit, pallet stacking friction, and harsh field handling effortlessly.",
        icon: CheckCircle2,
      },
      {
        title: "100% Moisture & Chemical Proof",
        description: "Completely impervious to humidity, deep freezing, steam, grease, and aggressive chemicals.",
        icon: Droplets,
      },
      {
        title: "Single-Step Production Efficiency",
        description: "Combines moulding and labelling into a single continuous process, cutting secondary handling.",
        icon: Clock,
      },
    ],
    comparisonTable: [
      {
        feature: "Label Integration",
        iml: "Integrated during moulding (Fused)",
        traditional: "Applied with adhesive after production",
      },
      {
        feature: "Appearance",
        iml: "Seamless, monolithic, zero edges",
        traditional: "Visible label edges, seams, or wrinkles",
      },
      {
        feature: "Durability",
        iml: "Permanent; cannot peel, tear, or lift",
        traditional: "Degrades over time, susceptible to peeling",
      },
      {
        feature: "Moisture Resistance",
        iml: "100% impervious to water & oils",
        traditional: "Adhesive weakens under moisture/humidity",
      },
      {
        feature: "Production Flow",
        iml: "Single-step combined process",
        traditional: "Secondary post-mould labelling operation",
      },
    ],
    applications: [
      "Paint and coating containers (500 ml – 20 L)",
      "Food packaging containers & dairy tubs",
      "Industrial plastic buckets & lubricants",
      "Household storage & consumer packaging",
    ],
    clientLogos: clientLogos.iml,
  },
];

export function OurCapabilities() {
  const [activeId, setActiveId] = useState<CapabilityId>("injection-moulding");
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useScrollReveal(sectionRef);

  const activeCapability = capabilitiesData.find((c) => c.id === activeId) || capabilitiesData[0];

  // GSAP Smooth Transition on Tab Switch
  useGSAP(
    () => {
      if (!contentRef.current) return;

      if (reduceMotion()) {
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" }
      );
    },
    { dependencies: [activeId], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative overflow-hidden bg-[#faf8f5] py-14 sm:py-18 lg:py-24 border-b border-slate-200/70"
      aria-labelledby="capabilities-heading"
    >
      {/* Background Architectural Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #002b49 1px, transparent 1px),
            linear-gradient(to bottom, #002b49 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Atmospheric Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[550px] w-[550px] rounded-full bg-brand/[0.04] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-10 h-[480px] w-[480px] rounded-full bg-sky-500/[0.04] blur-3xl"
      />

      <div className="shell relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <h2
            id="capabilities-heading"
            data-reveal
            className="font-display text-[2.4rem] sm:text-[3.2rem] lg:text-[3.8rem] font-extrabold tracking-tight text-ink leading-[1.05]"
          >
            Our Capabilities
          </h2>

          <p
            data-reveal
            data-reveal-delay="0.1"
            className="mt-3.5 text-[15.5px] sm:text-[17px] text-slate-600 leading-relaxed font-normal max-w-2xl"
          >
            Moulded, printed, and packed on one unified floor. We engineer rigid containers with precision injection moulding cells and offer 3 distinct in-house decoration routes to match every brand vision.
          </p>
        </div>

        {/* Capabilities Layout: Left Sidebar Navigation + Right Content Panel */}
        <div className="mt-10 sm:mt-12 lg:mt-14 grid items-start gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          
          {/* ===================================================================
              LEFT SIDEBAR: Clean Capabilities Navigation List
              =================================================================== */}
          <div className="lg:col-span-4 xl:col-span-3.5 lg:sticky lg:top-28">
            <nav
              aria-label="Capabilities Navigation"
              className="rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            >
              <div className="space-y-1.5">
                {capabilitiesData.map((item) => {
                  const isActive = activeId === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={`group relative flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-slate-900 text-white shadow-md"
                          : "text-slate-700 hover:bg-slate-100/80 hover:text-ink"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span
                          className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            isActive
                              ? "bg-white/15 text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200/70"
                          }`}
                        >
                          <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                        </span>
                        <span className="text-[14px] sm:text-[14.5px] font-bold leading-snug">
                          {item.tabLabel}
                        </span>
                      </div>

                      <span
                        className={`text-[15px] font-bold shrink-0 ml-2 transition-transform duration-200 ${
                          isActive
                            ? "translate-x-0.5 text-brand"
                            : "text-slate-300 group-hover:translate-x-0.5 group-hover:text-slate-600"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* ===================================================================
              RIGHT CONTENT PANEL: Active Capability Showcase
              =================================================================== */}
          <div ref={contentRef} key={activeCapability.id} className="lg:col-span-8 xl:col-span-8.5">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              
              {/* Header: Title, Tagline, & Description */}
              <div>
                <h3 className="font-display text-[1.95rem] sm:text-[2.45rem] lg:text-[2.75rem] font-extrabold tracking-tight text-ink leading-[1.1]">
                  {activeCapability.title}
                </h3>

                <p className="mt-1.5 font-display text-[15px] sm:text-[16.5px] font-bold text-slate-700 leading-snug">
                  {activeCapability.tagline}
                </p>

                <p className="mt-3.5 text-[15px] sm:text-[16px] text-slate-600 leading-relaxed font-normal">
                  {activeCapability.overview}
                </p>
              </div>

              {/* Showcase Image */}
              <div className="mt-7 sm:mt-8 relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 shadow-md">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={activeCapability.image}
                    alt={activeCapability.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                </div>
                
                {/* Floating Image Badge */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2 rounded-lg bg-black/75 px-3 py-1.5 font-mono text-[11.5px] sm:text-[12px] font-semibold text-white/95 backdrop-blur-md border border-white/15">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Production Live: {activeCapability.tabLabel}</span>
                </div>
              </div>

              {/* How Does It Work (Process Steps) */}
              <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-200/70">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-[2px] w-5 bg-brand" />
                  <h4 className="font-display text-[18px] sm:text-[20px] font-bold text-ink tracking-tight">
                    {activeCapability.stepsHeading}
                  </h4>
                </div>

                <div className="grid gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {activeCapability.steps.map((step) => (
                    <div
                      key={step.number}
                      className="group relative rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 transition-all duration-300 hover:border-slate-300 hover:bg-white hover:shadow-xs"
                    >
                      <span className="font-mono text-[12px] font-bold text-brand block mb-1.5">
                        STEP {step.number}
                      </span>
                      <h5 className="font-display text-[15px] font-bold text-ink leading-snug">
                        {step.title}
                      </h5>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 font-normal">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits Grid */}
              <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-200/70">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-[2px] w-5 bg-brand" />
                  <h4 className="font-display text-[18px] sm:text-[20px] font-bold text-ink tracking-tight">
                    {activeCapability.benefitsHeading}
                  </h4>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {activeCapability.benefits.map((b) => {
                    const BIcon = b.icon;
                    return (
                      <div
                        key={b.title}
                        className="flex items-start gap-3.5 rounded-xl border border-slate-200/70 bg-white p-4 shadow-2xs"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                          <BIcon className="h-5 w-5" strokeWidth={2.1} />
                        </span>
                        <div>
                          <h5 className="font-display text-[15px] font-bold text-ink leading-snug">
                            {b.title}
                          </h5>
                          <p className="mt-1 text-[13px] leading-relaxed text-slate-600 font-normal">
                            {b.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* IML vs Traditional Labelling Comparison Table (IML specific) */}
              {activeCapability.comparisonTable && (
                <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-200/70">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-[2px] w-5 bg-brand" />
                    <h4 className="font-display text-[18px] sm:text-[20px] font-bold text-ink tracking-tight">
                      IML vs Traditional Labelling
                    </h4>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
                    <table className="w-full text-left border-collapse text-[13.5px]">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80 font-mono text-[12px] uppercase text-slate-600">
                          <th className="p-3.5 sm:p-4 font-bold">Feature</th>
                          <th className="p-3.5 sm:p-4 font-bold text-emerald-700">In-Mould Labelling (IML)</th>
                          <th className="p-3.5 sm:p-4 font-bold text-slate-500">Traditional Labelling</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activeCapability.comparisonTable.map((row) => (
                          <tr key={row.feature} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3.5 sm:p-4 font-bold text-ink">{row.feature}</td>
                            <td className="p-3.5 sm:p-4 font-medium text-emerald-800 bg-emerald-50/30">
                              {row.iml}
                            </td>
                            <td className="p-3.5 sm:p-4 text-slate-500">{row.traditional}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Applications Section */}
              <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-200/70">
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="h-[2px] w-5 bg-brand" />
                  <h4 className="font-display text-[17px] sm:text-[18.5px] font-bold text-ink tracking-tight">
                    Typical Packaging Applications
                  </h4>
                </div>

                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {activeCapability.applications.map((app) => (
                    <li
                      key={app}
                      className="flex items-center gap-2.5 text-[13.5px] sm:text-[14px] font-medium text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client Logos Section (For Screen Printing, HTL, and IML separately) */}
              {activeCapability.clientLogos && activeCapability.clientLogos.length > 0 && (
                <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-200/70">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-[2px] w-5 bg-brand" />
                      <h4 className="font-display text-[16.5px] sm:text-[18px] font-bold text-ink tracking-tight">
                        Trusted by Leading Brands for {activeCapability.tabLabel}
                      </h4>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-slate-400">
                      Approved Commercial Batches
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {activeCapability.clientLogos.map((client) => (
                      <div
                        key={client.name}
                        className="group flex flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all duration-300 hover:border-slate-300 hover:bg-white hover:shadow-xs"
                      >
                        <div className="relative h-9 w-28 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                          <Image
                            src={client.logo}
                            alt={client.alt}
                            width={112}
                            height={36}
                            className="max-h-7 w-auto object-contain"
                          />
                        </div>
                        <span className="mt-2 font-display text-[12px] font-bold text-slate-600 group-hover:text-ink transition-colors">
                          {client.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
