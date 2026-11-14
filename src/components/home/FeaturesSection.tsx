"use client";

import { useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { gsap, useGSAP, reduceMotion } from "@/lib/animations";

type FeatureItem = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  icon: string;
  pos: { left: string; top: string };
  posClass?: string;
};

// 8 feature nodes arranged symmetrically in a PROPER CIRCLE
const featuresList: FeatureItem[] = [
  {
    id: "printable",
    title: "PRINTABLE",
    subtitle: "Custom Branding",
    color: "#b45309",
    bgColor: "#fffbeb",
    icon: "tabler:box",
    pos: { left: "16%", top: "18%" },
    posClass: "-translate-y-1/2",
  },
  {
    id: "oven-safe",
    title: "OVEN SAFE",
    subtitle: "Microwave Friendly",
    color: "#ea580c",
    bgColor: "#fff7ed",
    icon: "tabler:microwave",
    pos: { left: "50%", top: "6%" },
    posClass: "-translate-x-1/2 -translate-y-1/2",
  },
  {
    id: "hygienic",
    title: "HYGIENIC",
    subtitle: "Untouched by Hand",
    color: "#0284c7",
    bgColor: "#f0f9ff",
    icon: "lucide:shield-check",
    pos: { left: "68%", top: "18%" },
    posClass: "-translate-y-1/2",
  },
  {
    id: "stackable",
    title: "STACKABLE",
    subtitle: "Compact Storage",
    color: "#1d4ed8",
    bgColor: "#eff6ff",
    icon: "fluent:stack-24-regular",
    pos: { left: "75%", top: "50%" },
    posClass: "-translate-y-1/2",
  },
  {
    id: "bpa-free",
    title: "BPA FREE",
    subtitle: "100% Non-Toxic",
    color: "#16a34a",
    bgColor: "#f0fdf4",
    icon: "tabler:leaf",
    pos: { left: "68%", top: "82%" },
    posClass: "-translate-y-1/2",
  },
  {
    id: "food-safe",
    title: "FOOD SAFE",
    subtitle: "Food Grade Certified",
    color: "#0d9488",
    bgColor: "#f0fdfa",
    icon: "tabler:tools-kitchen-2",
    pos: { left: "50%", top: "94%" },
    posClass: "-translate-x-1/2 -translate-y-1/2",
  },
  {
    id: "freezer-safe",
    title: "FREEZER SAFE",
    subtitle: "Freezer Proof",
    color: "#2563eb",
    bgColor: "#eff6ff",
    icon: "tabler:snowflake",
    pos: { left: "16%", top: "82%" },
    posClass: "-translate-y-1/2",
  },
  {
    id: "recyclable",
    title: "RECYCLABLE",
    subtitle: "Eco & Sustainable",
    color: "#15803d",
    bgColor: "#f0fdf4",
    icon: "tabler:recycle",
    pos: { left: "10%", top: "50%" },
    posClass: "-translate-y-1/2",
  },
];

// 5 compact circular arcs with fading opacity on the trailing edge (ending edge fadeout)
const orbitArcs = [
  {
    id: 1,
    x1: 150,
    y1: 30,
    x2: 239.2,
    y2: 69.7,
    d: "M 150 30 A 120 120 0 0 1 239.2 69.7",
  },
  {
    id: 2,
    x1: 264.1,
    y1: 112.9,
    x2: 253.9,
    y2: 210,
    d: "M 264.1 112.9 A 120 120 0 0 1 253.9 210",
  },
  {
    id: 3,
    x1: 220.5,
    y1: 247.1,
    x2: 125.1,
    y2: 267.4,
    d: "M 220.5 247.1 A 120 120 0 0 1 125.1 267.4",
  },
  {
    id: 4,
    x1: 79.5,
    y1: 247.1,
    x2: 30.7,
    y2: 162.5,
    d: "M 79.5 247.1 A 120 120 0 0 1 30.7 162.5",
  },
  {
    id: 5,
    x1: 35.9,
    y1: 112.9,
    x2: 101.2,
    y2: 40.4,
    d: "M 35.9 112.9 A 120 120 0 0 1 101.2 40.4",
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
        x: -25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(
        ".feature-header-right",
        {
          x: 25,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )

      // 2. Center Pail Visual
      .from(
        ".feature-center-pails",
        {
          scale: 0.85,
          opacity: 0,
          duration: 0.9,
          ease: "back.out(1.2)",
        },
        "-=0.5"
      )

      // 3. Circular Orbit Arcs
      .from(
        ".feature-orbit-arc",
        {
          opacity: 0,
          scale: 0.94,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.7"
      )

      // 4. Staggered 8 Feature Nodes
      .from(
        ".feature-node",
        {
          scale: 0.7,
          opacity: 0,
          duration: 0.7,
          stagger: 0.06,
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

      // Subtle float animation on center pails
      gsap.to(".feature-center-pails-img", {
        y: -5,
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
      className="relative bg-white lg:h-screen lg:min-h-[640px] lg:max-h-[960px] flex flex-col justify-between py-6 sm:py-8 lg:py-10 border-b border-slate-100 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-12 relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Top Header: "Product" in black text, "Features" in brand blue */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 pt-2 lg:pt-3">
          <div className="feature-header-left">
            <h2 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.06]">
              <span className="text-slate-900">Product</span>{" "}
              <span className="text-[#024182]">Features</span>
            </h2>
          </div>

          <div className="feature-header-right sm:text-right max-w-sm">
            <p className="text-slate-600 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed">
              Thoughtfully designed for safer, cleaner and more convenient storage.
            </p>
          </div>
        </div>

        {/* Desktop Proper Circular Presentation (Centered & Proportionally Balanced) */}
        <div className="hidden lg:flex flex-1 items-center justify-center relative w-full my-auto">
          <div className="relative w-full max-w-[860px] xl:max-w-[920px] h-[520px] xl:h-[550px] mx-auto scale-[0.95] xl:scale-100 origin-center">
            
            {/* Arrow Circle with Fading Opacity on Trailing Edges */}
            <div className="feature-orbit-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] xl:w-[380px] xl:h-[380px] pointer-events-none select-none z-0">
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full pointer-events-none"
                fill="none"
              >
                <defs>
                  {/* Subtle small arrowhead marker */}
                  <marker
                    id="orbit-arrow"
                    viewBox="0 0 6 6"
                    refX="4.5"
                    refY="3"
                    markerWidth="3.5"
                    markerHeight="3.5"
                    orient="auto"
                  >
                    <path d="M 0.5 0.8 L 5 3 L 0.5 5.2 z" fill="#475569" />
                  </marker>

                  {/* Individual gradients for each arc: trailing edge fades out to low opacity */}
                  {orbitArcs.map((arc) => (
                    <linearGradient
                      key={`grad-${arc.id}`}
                      id={`arc-grad-${arc.id}`}
                      x1={arc.x1}
                      y1={arc.y1}
                      x2={arc.x2}
                      y2={arc.y2}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#64748b" stopOpacity="0.04" />
                      <stop offset="60%" stopColor="#64748b" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#334155" stopOpacity="0.85" />
                    </linearGradient>
                  ))}
                </defs>

                {/* 5 Clockwise Directional Arcs with Fading Trailing Edges */}
                {orbitArcs.map((arc) => (
                  <path
                    key={arc.id}
                    d={arc.d}
                    stroke={`url(#arc-grad-${arc.id})`}
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    markerEnd="url(#orbit-arrow)"
                    className="feature-orbit-arc"
                  />
                ))}
              </svg>
            </div>

            {/* Centerpiece: White Buckets with Blue Base Graphic - Sits tightly inside circle */}
            <div className="feature-center-pails absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] xl:w-[240px] h-[145px] xl:h-[160px] flex items-center justify-center pointer-events-none select-none z-10">
              <div className="relative w-full h-full">
                <Image
                  src="/images/features/product-features-pails.webp"
                  alt="ASIR Containers Rigid Plastic Packaging Range"
                  fill
                  priority
                  sizes="(min-width: 1280px) 240px, 220px"
                  className="feature-center-pails-img object-contain object-center drop-shadow-[0_12px_24px_rgba(0,40,100,0.12)]"
                />
              </div>
            </div>

            {/* 8 Feature Nodes Aligned in a PROPER CIRCLE */}
            {featuresList.map((item) => (
              <div
                key={item.id}
                style={{
                  left: item.pos.left,
                  top: item.pos.top,
                }}
                className={`feature-node absolute ${item.posClass ?? "-translate-y-1/2"} flex items-center gap-3 group cursor-default z-20`}
              >
                {/* Circular Icon Badge with refined border and soft background color */}
                <div
                  style={{
                    borderColor: item.color,
                    backgroundColor: item.bgColor,
                  }}
                  className="relative flex h-12 w-12 xl:h-13 xl:w-13 items-center justify-center rounded-full border-[1.5px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] shrink-0"
                >
                  <Icon
                    icon={item.icon}
                    style={{ color: item.color }}
                    className="h-6 w-6 xl:h-6.5 xl:w-6.5 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title & Subtitle */}
                <div className="flex flex-col whitespace-nowrap">
                  <span className="text-[13.5px] xl:text-[14.5px] font-bold tracking-wide text-slate-900 group-hover:text-ink transition-colors leading-tight uppercase">
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

        {/* Mobile / Tablet View (< lg) */}
        <div className="block lg:hidden my-6">
          {/* Mobile Center Graphic */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[180px] sm:h-[200px] mx-auto flex items-center justify-center my-4">
            <Image
              src="/images/features/product-features-pails.webp"
              alt="ASIR Containers Rigid Plastic Packaging"
              fill
              sizes="320px"
              className="object-contain object-center drop-shadow-md"
            />
          </div>

          {/* 8 Features Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 max-w-xl mx-auto mt-4">
            {featuresList.map((item) => (
              <div
                key={item.id}
                className="feature-mobile-card flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <div
                  style={{
                    borderColor: item.color,
                    backgroundColor: item.bgColor,
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] shrink-0 shadow-xs"
                >
                  <Icon
                    icon={item.icon}
                    style={{ color: item.color }}
                    className="h-6 w-6"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] sm:text-[14.5px] font-bold tracking-wide text-slate-900 leading-tight uppercase">
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
