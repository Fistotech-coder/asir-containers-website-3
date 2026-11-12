"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Reveal } from "@/components/motion/Reveal";
import { WavyHighlight } from "@/components/ui/WavyHighlight";

type FeatureItem = {
  title: string;
  color: string;
  icon: string;
};

const featuresList: FeatureItem[] = [
  {
    title: "Oven Safe",
    color: "#0066cc",
    icon: "tabler:microwave",
  },
  {
    title: "Hygienic",
    color: "#10b981",
    icon: "lucide:shield-check",
  },
  {
    title: "Stackable",
    color: "#2563eb",
    icon: "fluent:stack-24-regular",
  },
  {
    title: "BPA Free",
    color: "#f97316",
    icon: "tabler:leaf",
  },
  {
    title: "Food Safe",
    color: "#9333ea",
    icon: "tabler:tools-kitchen-2",
  },
  {
    title: "Freezer Safe",
    color: "#0284c7",
    icon: "tabler:snowflake",
  },
  {
    title: "Recyclable",
    color: "#059669",
    icon: "tabler:recycle",
  },
  {
    title: "Printable",
    color: "#d97706",
    icon: "tabler:box",
  },
];

type Props = {
  index?: string;
};

export function FeaturesSection({ index = "02" }: Props) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Auto-cycle through items every 2.4 seconds, pausing when user hovers
  useEffect(() => {
    if (hoveredIdx !== null) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % featuresList.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [hoveredIdx]);

  return (
    <section className="relative bg-white py-14 lg:py-20 border-b border-slate-100/80">
      <div className="shell relative z-10">
        {/* Header */}
        <Reveal>
          <div
            data-reveal
            data-reveal-dir="down"
            data-reveal-delay="0.1"
            className="mx-auto mb-12 lg:mb-16 max-w-2xl text-center"
          >
            <h2 className="font-display text-[2.25rem] font-bold tracking-tight text-slate-900 sm:text-[2.75rem] lg:text-[3.25rem] leading-[1.08]">
              Product <WavyHighlight dot={false}>Features</WavyHighlight>
            </h2>
            <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-500 sm:text-[16px]">
              Thoughtfully designed for safer, cleaner and more convenient storage.
            </p>
          </div>
        </Reveal>

        {/* Responsive Grid: Desktop (single line 8 items), Tablet (4 per line), Mobile (2 per line) — No card borders */}
        <Reveal>
          <div className="grid grid-cols-2 gap-y-10 gap-x-4 sm:grid-cols-4 sm:gap-y-10 sm:gap-x-6 lg:grid-cols-8 lg:gap-x-3 lg:gap-y-0">
            {featuresList.map((item, idx) => {
              const isHighlighted =
                hoveredIdx !== null ? hoveredIdx === idx : activeIdx === idx;

              return (
                <div
                  key={item.title}
                  data-reveal
                  data-reveal-dir="up"
                  data-reveal-delay={(0.05 * idx).toFixed(2)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group relative flex flex-col items-center text-center cursor-default transition-all duration-300"
                >
                  {/* Icon Pod:
                      Normal state: border and icon have item's color, background is white.
                      Highlighted state: background filled with item's color, icon is white, elevated with shadow.
                  */}
                  <div
                    style={{
                      borderColor: item.color,
                      backgroundColor: isHighlighted ? item.color : "#ffffff",
                      color: isHighlighted ? "#ffffff" : item.color,
                      boxShadow: isHighlighted
                        ? `0 14px 28px -4px ${item.color}45`
                        : "none",
                    }}
                    className={`flex h-16 w-16 sm:h-[70px] sm:w-[70px] items-center justify-center rounded-full border-2 transition-all duration-300 ease-out ${
                      isHighlighted
                        ? "-translate-y-2 scale-110"
                        : "group-hover:-translate-y-1.5 group-hover:scale-105"
                    }`}
                  >
                    <Icon
                      icon={item.icon}
                      className="h-7 w-7 sm:h-8 sm:w-8 transition-transform duration-300"
                    />
                  </div>

                  {/* Text below icon (Title only) */}
                  <div className="mt-3.5 flex flex-col items-center">
                    <h3
                      style={{
                        color: isHighlighted ? item.color : undefined,
                      }}
                      className={`font-display text-[14.5px] sm:text-[15.5px] font-bold tracking-tight leading-snug transition-colors duration-200 ${
                        isHighlighted ? "" : "text-slate-800"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
