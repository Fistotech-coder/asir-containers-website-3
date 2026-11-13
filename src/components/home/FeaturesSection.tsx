"use client";

import { useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { gsap, useGSAP, reduceMotion } from "@/lib/animations";
import { WavyHighlight } from "@/components/ui/WavyHighlight";

type FeatureItem = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  pos: { left: string; top: string };
};

const featuresList: FeatureItem[] = [
  {
    id: "printable",
    title: "PRINTABLE",
    subtitle: "Custom Branding",
    color: "#d97706",
    icon: "tabler:box",
    pos: { left: "15%", top: "18%" },
  },
  {
    id: "oven-safe",
    title: "OVEN SAFE",
    subtitle: "Microwave Friendly",
    color: "#ea580c",
    icon: "tabler:microwave",
    pos: { left: "42%", top: "8%" },
  },
  {
    id: "hygienic",
    title: "HYGIENIC",
    subtitle: "Untouched by Hand",
    color: "#0284c7",
    icon: "lucide:shield-check",
    pos: { left: "71%", top: "18%" },
  },
  {
    id: "stackable",
    title: "STACKABLE",
    subtitle: "Compact Storage",
    color: "#1d4ed8",
    icon: "fluent:stack-24-regular",
    pos: { left: "77%", top: "50%" },
  },
  {
    id: "bpa-free",
    title: "BPA FREE",
    subtitle: "100% Non-Toxic",
    color: "#16a34a",
    icon: "tabler:leaf",
    pos: { left: "71%", top: "78%" },
  },
  {
    id: "food-safe",
    title: "FOOD SAFE",
    subtitle: "Food Grade Certified",
    color: "#0d9488",
    icon: "tabler:tools-kitchen-2",
    pos: { left: "43%", top: "95%" },
  },
  {
    id: "freezer-safe",
    title: "FREEZER SAFE",
    subtitle: "Freezer Proof",
    color: "#2563eb",
    icon: "tabler:snowflake",
    pos: { left: "14%", top: "78%" },
  },
  {
    id: "recyclable",
    title: "RECYCLABLE",
    subtitle: "Eco & Sustainable",
    color: "#15803d",
    icon: "tabler:recycle",
    pos: { left: "9%", top: "50%" },
  },
];

type Props = {
  index?: string;
};

export function FeaturesSection({ index = "02" }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (reduceMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // 1. Header reveal
      tl.from(".feature-header-left", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(
        ".feature-header-right",
        {
          x: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )

      // 2. Center Pail Visual & Blue Glow
      .from(
        ".feature-center-pails",
        {
          scale: 0.82,
          opacity: 0,
          duration: 0.9,
          ease: "back.out(1.25)",
        },
        "-=0.5"
      )
      .from(
        ".feature-center-glow",
        {
          scale: 0.5,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8"
      )

      // 3. Elliptical Orbit Arcs
      .from(
        ".feature-orbit-arc",
        {
          opacity: 0,
          scale: 0.92,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.7"
      )

      // 4. Staggered 8 Feature Nodes flying to their orbital coordinates
      .from(
        ".feature-node",
        {
          scale: 0.65,
          opacity: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "back.out(1.4)",
        },
        "-=0.4"
      )

      // Mobile cards stagger animation
      .from(
        ".feature-mobile-card",
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Gentle floating animation on the center containers
      gsap.to(".feature-center-pails-img", {
        y: -6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-white lg:h-screen lg:min-h-[620px] lg:max-h-[960px] flex flex-col justify-between py-6 sm:py-8 lg:py-8 border-b border-slate-100/90 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-12 relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Top Header: Left Title / Right Subtitle matching UI graphic */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 pt-2 lg:pt-3">
          <div className="feature-header-left">
            <h2 className="font-display text-[2.4rem] sm:text-[3.1rem] lg:text-[3.4rem] font-bold tracking-tight text-slate-900 leading-[1.08]">
              Product <WavyHighlight dot={false}>Features</WavyHighlight>
            </h2>
          </div>

          <div className="feature-header-right sm:text-right max-w-xs">
            <p className="text-slate-600 text-[14px] sm:text-[15px] font-medium leading-relaxed">
              Thoughtfully designed for safer, cleaner and more convenient storage.
            </p>
          </div>
        </div>

        {/* Desktop Elliptical Orbit Presentation (Hidden on Mobile, Screen-size & Centered on lg+) */}
        <div className="hidden lg:flex flex-1 items-center justify-center relative w-full my-auto">
          <div className="relative w-full max-w-[1120px] xl:max-w-[1200px] h-[480px] xl:h-[530px] scale-[0.90] xl:scale-100 origin-center">
            
            {/* Elliptical Ring Container (Horizontal Oval with 6 Directional Arrows - Equal Space, No Dotted Lines) */}
            <div className="feature-orbit-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[480px] pointer-events-none select-none z-0">
              <svg
                viewBox="0 0 700 480"
                className="w-full h-full pointer-events-none"
                fill="none"
              >
                <defs>
                  <marker
                    id="orbit-arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path d="M 1 2 L 8 5 L 1 8 z" fill="#475569" />
                  </marker>
                </defs>

                {/* Exactly 6 Clockwise Directional Arcs with Equal Spacing around the Ellipse (No Dotted Lines) */}
                {/* 1. Top Arc (~10:00 to 12:00) */}
                <path
                  d="M 129 123 A 280 190 0 0 1 321 51"
                  stroke="#64748b"
                  strokeWidth="1.6"
                  markerEnd="url(#orbit-arrow)"
                  className="feature-orbit-arc"
                />
                {/* 2. Top-Right Arc (~12:30 to 2:00) */}
                <path
                  d="M 389 52 A 280 190 0 0 1 577 128"
                  stroke="#64748b"
                  strokeWidth="1.6"
                  markerEnd="url(#orbit-arrow)"
                  className="feature-orbit-arc"
                />
                {/* 3. Middle-Right Arc (~2:30 to 4:00) */}
                <path
                  d="M 610 169 A 280 190 0 0 1 606 317"
                  stroke="#64748b"
                  strokeWidth="1.6"
                  markerEnd="url(#orbit-arrow)"
                  className="feature-orbit-arc"
                />
                {/* 4. Bottom-Right Arc (~4:30 to 6:00) */}
                <path
                  d="M 571 357 A 280 190 0 0 1 379 429"
                  stroke="#64748b"
                  strokeWidth="1.6"
                  markerEnd="url(#orbit-arrow)"
                  className="feature-orbit-arc"
                />
                {/* 5. Bottom-Left Arc (~6:30 to 8:00) */}
                <path
                  d="M 311 428 A 280 190 0 0 1 123 352"
                  stroke="#64748b"
                  strokeWidth="1.6"
                  markerEnd="url(#orbit-arrow)"
                  className="feature-orbit-arc"
                />
                {/* 6. Upper-Left Arc (~8:30 to 10:00) */}
                <path
                  d="M 90 311 A 280 190 0 0 1 94 163"
                  stroke="#64748b"
                  strokeWidth="1.6"
                  markerEnd="url(#orbit-arrow)"
                  className="feature-orbit-arc"
                />
              </svg>
            </div>

            {/* Centerpiece: Container Cluster & Blue Glow */}
            <div className="feature-center-pails absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] xl:w-[380px] flex items-center justify-center pointer-events-none select-none z-10">
              {/* Ambient blue glow base */}
              <div
                aria-hidden="true"
                className="feature-center-glow absolute bottom-4 left-1/2 -translate-x-1/2 w-[270px] xl:w-[320px] h-[90px] xl:h-[120px] rounded-full bg-gradient-to-t from-[#0052cc]/45 via-[#0066cc]/25 to-transparent blur-2xl"
              />

              <div className="relative w-full h-[240px] xl:h-[280px]">
                <Image
                  src="/images/footer-pails.webp"
                  alt="ASIR Containers Rigid Plastic Packaging Range"
                  fill
                  priority
                  sizes="(min-width: 1280px) 380px, 340px"
                  className="feature-center-pails-img object-contain object-center drop-shadow-[0_16px_35px_rgba(0,35,90,0.16)]"
                />
              </div>
            </div>

            {/* 8 Feature Nodes Orbiting Along the Ellipse */}
            {featuresList.map((item) => (
              <div
                key={item.id}
                style={{
                  left: item.pos.left,
                  top: item.pos.top,
                }}
                className="feature-node absolute -translate-y-1/2 flex items-center gap-3 group cursor-default z-20"
              >
                {/* Circular Icon Badge */}
                <div
                  style={{ borderColor: item.color }}
                  className="relative flex h-12 w-12 xl:h-13 xl:w-13 items-center justify-center rounded-full border-2 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] shrink-0"
                >
                  <Icon
                    icon={item.icon}
                    style={{ color: item.color }}
                    className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title & Subtitle */}
                <div className="flex flex-col whitespace-nowrap">
                  <span className="font-display text-[14px] xl:text-[15px] font-black tracking-wide text-slate-900 group-hover:text-ink transition-colors leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[11.5px] xl:text-[12px] font-medium text-slate-500 leading-tight mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Mobile / Tablet View (Visible on < lg, Scrollable & Responsive) */}
        <div className="block lg:hidden my-6">
          {/* Mobile Center Graphic with Glow */}
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] h-[200px] sm:h-[230px] mx-auto flex items-center justify-center my-3">
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[220px] sm:w-[260px] h-[70px] sm:h-[90px] rounded-full bg-gradient-to-t from-[#0052cc]/40 via-[#0066cc]/20 to-transparent blur-xl pointer-events-none"
            />
            
            <div className="relative w-[230px] sm:w-[270px] h-[170px] sm:h-[200px]">
              <Image
                src="/images/footer-pails.webp"
                alt="ASIR Containers Rigid Plastic Packaging"
                fill
                sizes="270px"
                className="object-contain object-center drop-shadow-md"
              />
            </div>
          </div>

          {/* 8 Features Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 max-w-xl mx-auto mt-4">
            {featuresList.map((item) => (
              <div
                key={item.id}
                className="feature-mobile-card flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <div
                  style={{ borderColor: item.color }}
                  className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 bg-white shrink-0 shadow-xs"
                >
                  <Icon
                    icon={item.icon}
                    style={{ color: item.color }}
                    className="h-5.5 w-5.5"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[14px] sm:text-[14.5px] font-black tracking-wide text-slate-900 leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[11.5px] sm:text-[12px] font-medium text-slate-500 leading-tight mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
