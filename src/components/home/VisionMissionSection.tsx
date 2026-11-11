"use client";

import { Icon } from "@iconify/react";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  index?: string;
};

interface InfographicNode {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: string;
  color: string;
  arcDir: "top" | "bottom";
}

const infographicNodes: InfographicNode[] = [
  {
    step: "01",
    title: "Our Vision",
    subtitle: "Pioneering Innovation",
    desc: "To be a globally trusted partner for rigid packaging solutions, pioneering sustainable mould technology and high-performance industrial containers.",
    icon: "lucide:lightbulb",
    color: "#ea5a37", // Coral / Terracotta Orange
    arcDir: "top",
  },
  {
    step: "02",
    title: "Our Mission",
    subtitle: "Certified Quality",
    desc: "Delivering certified, high-grade, 100% leak-proof containers manufactured with virgin food-grade PP to ensure complete client satisfaction and safety.",
    icon: "lucide:search",
    color: "#00a89d", // Cyan / Teal
    arcDir: "bottom",
  },
  {
    step: "03",
    title: "Core Values",
    subtitle: "Foundational Excellence",
    desc: "Built on micron-level moulding precision, sustainable polymer stewardship, agile reliability, and enduring customer trust.",
    icon: "lucide:bar-chart-3",
    color: "#f5a623", // Amber / Warm Gold
    arcDir: "top",
  },
];

function ShieldBadge({ color, icon }: { color: string; icon: string }) {
  return (
    <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 z-10 pointer-events-none">
      <div className="relative w-[52px] h-[62px] flex items-center justify-center">
        <svg viewBox="0 0 52 62" className="w-full h-full drop-shadow-xs" fill="none">
          <path
            d="M0 0 H52 V36 C52 48 26 60 26 60 C26 60 0 48 0 36 Z"
            fill={color}
          />
        </svg>
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 text-white transition-transform duration-300 group-hover:scale-110">
          <Icon icon={icon} className="w-[23px] h-[23px]" />
        </div>
      </div>
    </div>
  );
}

export function VisionMissionSection({ index = "06" }: Props) {
  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-20 border-b border-slate-100/80">
      <div className="shell relative z-10">

        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-6 sm:mb-2">
          
          <h2 className="font-display text-[2.4rem] sm:text-[3.1rem] lg:text-[3.35rem] font-bold tracking-tight text-slate-900 leading-[1.08]">
            Our Mission, Vision & <span className="text-[#0066cc]">Core Values</span>
          </h2>
          <p className="mt-3 text-[13.5px] sm:text-[15px] leading-relaxed text-slate-500 font-normal max-w-xl mx-auto">
            A continuous strategic continuum of sustainable packaging innovation, precision manufacturing, and unwavering client trust.
          </p>
        </Reveal>

        {/* 1. DESKTOP VIEW: Continuous Undulating Smooth Wave with Reduced Inter-Circle Gap (xl and up) */}
        <Reveal data-reveal data-reveal-dir="scale" data-reveal-delay="0.1" className="hidden xl:block">
          <div className="relative w-full max-w-[1140px] mx-auto py-2">
            
            {/* Desktop SVG: viewBox="0 0 1140 500", Centers at 190, 570, 950, Y=250, Curve Radius 180 (Card R=140, Equal Gap=40px) */}
            <svg
              viewBox="0 0 1140 500"
              className="w-full h-auto block select-none pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Concentric guide halo rings around each circle */}
              <circle cx="190" cy="250" r="160" stroke="#f1f5f9" strokeWidth="1" />
              <circle cx="570" cy="250" r="160" stroke="#f1f5f9" strokeWidth="1" />
              <circle cx="950" cy="250" r="160" stroke="#f1f5f9" strokeWidth="1" />

              {/* Node 1: Coral Arc (Loops Over Top with 40px Equal Gap) + Glides to Midpoint (380, 250) */}
              <path
                d="M 42.6 353.2 A 180 180 0 1 1 360.5 192.4 L 380.0 250.0"
                stroke="#ea5a37"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Node 1 Terminal Dot (Bottom-Left) */}
              <circle cx="42.6" cy="353.2" r="7" fill="#ea5a37" />
              <circle cx="42.6" cy="353.2" r="3.5" fill="#ffffff" />

              {/* Node 2: Teal Arc (Glides from Midpoint 380, 250 + Loops Under Bottom with 40px Equal Gap + Glides to Midpoint 760, 250) */}
              <path
                d="M 380.0 250.0 L 399.5 307.6 A 180 180 0 0 0 740.5 307.6 L 760.0 250.0"
                stroke="#00a89d"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Node 3: Amber Arc (Glides from Midpoint 760, 250 + Loops Over Top with 40px Equal Gap to Terminal Dot) */}
              <path
                d="M 760.0 250.0 L 779.5 192.4 A 180 180 0 1 1 1097.4 353.2"
                stroke="#f5a623"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Node 3 Terminal Dot (Bottom-Right) */}
              <circle cx="1097.4" cy="353.2" r="7" fill="#f5a623" />
              <circle cx="1097.4" cy="353.2" r="3.5" fill="#ffffff" />
            </svg>

            {/* The 3 Circular Nodes (280px x 280px) precisely centered over X=190 (16.667%), 570 (50%), 950 (83.333%) */}
            <div className="absolute inset-0 pointer-events-none">
              {infographicNodes.map((item, idx) => {
                const xPercent = idx === 0
                  ? (190 / 1140) * 100
                  : idx === 1
                  ? 50
                  : (950 / 1140) * 100;

                return (
                  <div
                    key={item.title}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-auto"
                    style={{ left: `${xPercent.toFixed(3)}%` }}
                  >
                    <div
                      className="group relative w-[280px] h-[280px] rounded-full bg-white shadow-[0_16px_38px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] cursor-default"
                    >
                      <ShieldBadge color={item.color} icon={item.icon} />

                      <div className="mt-8 flex flex-col items-center max-w-[215px] mx-auto">
                        <h4 className="font-display text-[19px] font-bold text-slate-900 leading-tight">
                          {item.title}
                        </h4>
                        <p
                          className="mt-1 text-[11.5px] font-bold uppercase tracking-wider"
                          style={{ color: item.color }}
                        >
                          {item.subtitle}
                        </p>
                        <p className="mt-2 text-[12.5px] leading-[1.48] text-slate-500 font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </Reveal>

        {/* 2. TABLET & MOBILE VIEW: Vertical Weaving Serpentine Flow with Reduced Gap (under xl) */}
        <Reveal data-reveal data-reveal-dir="bottom" data-reveal-delay="0.1" className="xl:hidden">
          <div className="relative w-full max-w-[420px] mx-auto py-6">
            
            {/* Vertical SVG: viewBox="0 0 420 1140", Centers at Y=190, 570, 950, X=210, Curve Radius 180 */}
            <svg
              viewBox="0 0 420 1140"
              className="w-full h-auto block select-none pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Concentric guide halo rings around cards */}
              <circle cx="210" cy="190" r="160" stroke="#f1f5f9" strokeWidth="1" />
              <circle cx="210" cy="570" r="160" stroke="#f1f5f9" strokeWidth="1" />
              <circle cx="210" cy="950" r="160" stroke="#f1f5f9" strokeWidth="1" />

              {/* Node 1: Coral Arc (Around Left with 40px Equal Gap) + Glides to Midpoint (210, 380) */}
              <path
                d="M 357.4 86.8 A 180 180 0 1 0 152.4 360.5 L 210.0 380.0"
                stroke="#ea5a37"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Node 1 Terminal Dot (Top-Right) */}
              <circle cx="357.4" cy="86.8" r="7" fill="#ea5a37" />
              <circle cx="357.4" cy="86.8" r="3.5" fill="#ffffff" />

              {/* Node 2: Teal Arc (Glides from Midpoint 210, 380 + Around Right with 40px Equal Gap + Glides to Midpoint 210, 760) */}
              <path
                d="M 210.0 380.0 L 267.6 399.5 A 180 180 0 0 1 267.6 740.5 L 210.0 760.0"
                stroke="#00a89d"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Node 3: Amber Arc (Glides from Midpoint 210, 760 + Around Left with 40px Equal Gap to Terminal Dot) */}
              <path
                d="M 210.0 760.0 L 152.4 779.5 A 180 180 0 1 0 357.4 1053.2"
                stroke="#f5a623"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Node 3 Terminal Dot (Bottom-Right) */}
              <circle cx="357.4" cy="1053.2" r="7" fill="#f5a623" />
              <circle cx="357.4" cy="1053.2" r="3.5" fill="#ffffff" />
            </svg>

            {/* The 3 Circular Nodes (280px x 280px) pinned to exact vertical centers */}
            <div className="absolute inset-0 pointer-events-none">
              {infographicNodes.map((item, idx) => {
                const yPercent = idx === 0
                  ? (190 / 1140) * 100
                  : idx === 1
                  ? 50
                  : (950 / 1140) * 100;

                return (
                  <div
                    key={item.title}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{ top: `${yPercent.toFixed(3)}%` }}
                  >
                    <div
                      className="group relative w-[280px] h-[280px] max-w-[76vw] max-h-[76vw] rounded-full bg-white shadow-[0_16px_38px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] cursor-default"
                    >
                      <ShieldBadge color={item.color} icon={item.icon} />

                      <div className="mt-7 sm:mt-8 flex flex-col items-center max-w-[210px] mx-auto">
                        <h4 className="font-display text-[17px] sm:text-[19px] font-bold text-slate-900 leading-tight">
                          {item.title}
                        </h4>
                        <p
                          className="mt-1 text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider"
                          style={{ color: item.color }}
                        >
                          {item.subtitle}
                        </p>
                        <p className="mt-1.5 sm:mt-2 text-[11.5px] sm:text-[12.5px] leading-[1.46] text-slate-500 font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
