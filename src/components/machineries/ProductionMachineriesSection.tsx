"use client";

import { useRef } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/lib/animations";
import { ScrollRotatingLid } from "@/components/machineries/ScrollRotatingLid";

export function ProductionMachineriesSection() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-gradient-to-r from-[#d8eeff] via-[#e4ecf2] to-[#d8eeff] py-12 lg:py-16 border-b border-[#cfe6fa]"
    >
      {/* Subtle ambient architectural glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-24 h-[500px] w-[500px] rounded-full border-[36px] border-[#0066ff]/[0.04] blur-[1px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-24 h-[500px] w-[500px] rounded-full border-[36px] border-[#0066ff]/[0.04] blur-[1px]"
      />

      <div className="shell relative z-10">
        {/* Interactive Scroll-Rotating Lid: Positioned inside shell, begins in top-right hero circle, rotates and glides behind alternating image cards */}
        <ScrollRotatingLid mode="3-topics" />

        <div className="space-y-12 lg:space-y-16">
          {/* Section Header Area — Dedicated height & right-side clearance so the lid NEVER merges with text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[240px] sm:min-h-[260px] lg:min-h-[380px] pb-6 lg:pb-10 border-b border-slate-300/30">
            <div className="lg:col-span-7 relative z-20 max-w-2xl pr-20 sm:pr-24 lg:pr-0">
              <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.75rem)] font-extrabold text-slate-900 tracking-tight leading-tight">
                High-Volume Industrial <br />
                <span className="text-[#0066cc]">Decoration & Moulding Lines.</span>
              </h2>
              <p className="mt-3 text-[14.5px] sm:text-[16px] leading-relaxed text-slate-600">
                Three dedicated in-house decoration lines combined with automated injection cells provide complete flexibility, photographic fidelity, and industrial endurance for every packaging run.
              </p>
            </div>
            {/* Right column empty spacer — explicitly reserves the space for the lid */}
            <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />
          </div>

          {/* TOPIC 1: Screen Printing (Image Left, Content Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image Left - Reduced width, preserved height */}
            <div className="lg:col-span-5 relative z-10 flex justify-start" data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
              <div
                data-topic-card="1"
                className="relative w-full max-w-[430px] h-[360px] sm:h-[400px] lg:h-[420px] overflow-hidden rounded-2xl bg-white shadow-[0_12px_36px_rgba(0,35,80,0.1)] border border-white/80 group"
              >
                <Image
                  src="/images/technologies/capability-screen-printing.webp"
                  alt="Semi-Automatic Rotary Screen Printing Line at Asir Containers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Text Right */}
            <div className="lg:col-span-7 relative z-20 flex flex-col justify-center pl-0 lg:pl-8 xl:pl-12" data-reveal data-reveal-dir="right" data-reveal-delay="0.15">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Screen Printing
              </h3>

              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-700">
                Our semi-automatic and high-speed rotary screen printing lines provide vibrant, high-opacity graphic decoration directly onto container sidewalls. Capable of executing up to 6 distinct color impressions in a single coordinated pass, this process ensures razor-sharp line registration, exceptional UV fade resistance, and robust mechanical adhesion across round pails and industrial storage containers without requiring secondary label substrates.
              </p>

              {/* Technical Highlights */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-300/60">
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Up to 6 spot colours with exact registration</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>360° cylindrical coverage on round pails</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>UV-cured scratch and chemical resistance</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Economical for medium to large production batches</span>
                </div>
              </div>
            </div>
          </div>

          {/* TOPIC 2: Heat Transfer Labelling (HTL) (Alternate: Content Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Left */}
            <div className="lg:col-span-7 relative z-20 order-2 lg:order-1 flex flex-col justify-center pr-0 lg:pr-8 xl:pr-12" data-reveal data-reveal-dir="left" data-reveal-delay="0.15">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Heat Transfer Labelling (HTL)
              </h3>

              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-700">
                Engineered for photo-quality graphical reproduction and intricate multi-tone branding, our HTL systems utilize precision thermal transfer heads to bond pre-printed gravure films seamlessly to the container surface. Under strictly controlled heat and pneumatic pressure, the multi-color film permanently adheres to the polypropylene wall, creating a glossy, edge-to-edge finish with outstanding chemical barrier protection, solvent resistance, and tamper-proof durability.
              </p>

              {/* Technical Highlights */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-300/60">
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Photorealistic 4-colour process fidelity</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Seamless thermal fusion directly to PP & HDPE</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>High resistance to solvents, oils & friction</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Fast tooling changeovers for multi-SKU agility</span>
                </div>
              </div>
            </div>

            {/* Image Right - Reduced width, preserved height */}
            <div className="lg:col-span-5 relative z-10 order-1 lg:order-2 flex justify-end" data-reveal data-reveal-dir="right" data-reveal-delay="0.1">
              <div
                data-topic-card="2"
                className="relative w-full max-w-[430px] h-[360px] sm:h-[400px] lg:h-[420px] overflow-hidden rounded-2xl bg-white shadow-[0_12px_36px_rgba(0,35,80,0.1)] border border-white/80 group"
              >
                <Image
                  src="/images/technologies/capability-heat-transfer.webp"
                  alt="Heat Transfer Labelling Line at Asir Containers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* TOPIC 3: Inmould labeling (IML) (Alternate: Image Left, Content Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image Left - Reduced width, preserved height */}
            <div className="lg:col-span-5 relative z-10 flex justify-start" data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
              <div
                data-topic-card="3"
                className="relative w-full max-w-[430px] h-[360px] sm:h-[400px] lg:h-[420px] overflow-hidden rounded-2xl bg-white shadow-[0_12px_36px_rgba(0,35,80,0.1)] border border-white/80 group"
              >
                <Image
                  src="/images/technologies/capability-in-mould-labelling.webp"
                  alt="Automated Robotic In-Mould Labelling Cell at Asir Containers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Text Right */}
            <div className="lg:col-span-7 relative z-20 flex flex-col justify-center pl-0 lg:pl-8 xl:pl-12" data-reveal data-reveal-dir="right" data-reveal-delay="0.15">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Inmould Labeling (IML)
              </h3>

            <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-700">
              Our advanced IML production cells integrate high-speed multi-axis robotics that accurately insert pre-printed polypropylene labels into the injection mould cavities prior to resin injection. As the molten polymer fills the die, the label permanently fuses with the container wall to form a single, monolithic structure. This eliminates edge peeling, bubbling, and label degradation under sub-zero freezer storage, humid warehouse environments, or severe heavy-duty stacking.
            </p>

            {/* Technical Highlights */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-300/60">
              <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                <span>Monolithic wall integration — zero edge lifting</span>
              </div>
              <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                <span>100% circular recyclable single PP material</span>
              </div>
              <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                <span>Multi-cavity robotic side-entry placement</span>
              </div>
              <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                <span>Immune to moisture, grease, oils & weather</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

