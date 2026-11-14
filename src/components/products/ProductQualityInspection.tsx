"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, ClipboardCheck, PackageCheck, ScanLine, type LucideIcon } from "lucide-react";
import { gsap, useGSAP, reduceMotion } from "@/lib/animations";

type InspectionStage = {
  id: string;
  tabLabel: string;
  icon: LucideIcon;
  tileBg: string;
  tileColor: string;
  activeBar: string;
  heading: string;
  content: string;
  activities: string[];
  image: string;
  imageAlt: string;
};

const inspectionStages: InspectionStage[] = [
  {
    id: "incoming",
    tabLabel: "Incoming inspection",
    icon: PackageCheck,
    tileBg: "bg-emerald-50",
    tileColor: "text-emerald-600",
    activeBar: "bg-emerald-600",
    heading: "Ensuring Quality from the Start",
    content:
      "All incoming raw materials and components are thoroughly inspected before entering the production process. Our incoming quality inspection ensures that materials meet specified requirements, approved specifications, and applicable quality standards before acceptance.",
    activities: [
      "Raw material quality verification",
      "Material specifications and grade checking",
      "Visual inspection for defects",
      "Dimensional and weight verification",
      "Supplier documentation verification",
      "Material approval and rejection",
    ],
    image: "/images/inspection/incoming-material-inspection.jpg",
    imageAlt: "Incoming raw material quality verification and lab testing",
  },
  {
    id: "inprocess",
    tabLabel: "In-process inspection",
    icon: ScanLine,
    tileBg: "bg-sky-50",
    tileColor: "text-sky-600",
    activeBar: "bg-sky-600",
    heading: "Maintaining Quality at Every Production Stage",
    content:
      "In-process inspection is carried out throughout the manufacturing process to monitor product quality, maintain production consistency, and identify potential defects at an early stage. Regular inspections help ensure that every production stage follows defined quality requirements and manufacturing specifications.",
    activities: [
      "Production parameter monitoring",
      "Dimensional and measurement checks",
      "Visual defect identification",
      "Colour and printing quality verification",
      "Product weight and thickness checking",
      "Process consistency monitoring",
      "Defect identification and corrective action",
    ],
    image: "/images/inspection/in-process-inspection.jpg",
    imageAlt: "Plastic injection moulding in-process parameter monitoring",
  },
  {
    id: "finished-goods",
    tabLabel: "Finished Goods (FG)",
    icon: ClipboardCheck,
    tileBg: "bg-amber-50",
    tileColor: "text-amber-600",
    activeBar: "bg-amber-600",
    heading: "Delivering Quality-Approved Products",
    content:
      "Finished Goods Inspection is the final quality verification process conducted before products are approved for packaging, storage, and dispatch. Each finished product is evaluated against defined quality standards to ensure it meets customer specifications and delivery requirements.",
    activities: [
      "Final visual appearance inspection",
      "Dimensional accuracy verification",
      "Product weight checking",
      "Functional and performance testing",
      "Printing and labelling quality checks",
      "Packaging and quantity verification",
      "Final product approval before dispatch",
    ],
    image: "/images/detail/stacked-pails.jpg",
    imageAlt: "Finished containers stacked after final quality inspection",
  },
];

export function ProductQualityInspection() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const stage = inspectionStages[activeIndex];
  const rootRef = useRef<HTMLElement | null>(null);

  // Reset autoplay whenever navigating to another page and returning
  useEffect(() => {
    setIsAutoPlay(true);
    setActiveIndex(0);
  }, [pathname]);

  // Autoplay tabs every 5 seconds until manually clicked
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % inspectionStages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handleTabClick = (idx: number) => {
    setIsAutoPlay(false); // Stop autoplay when user manually clicks any tab
    setActiveIndex(idx);
  };

  useGSAP(
    () => {
      if (!rootRef.current) return;
      const frame = rootRef.current.querySelector<HTMLElement>("[data-image-frame]");
      const img = rootRef.current.querySelector<HTMLElement>("[data-image-el]");
      const panel = rootRef.current.querySelector<HTMLElement>("[data-stage-panel]");

      if (reduceMotion()) {
        if (frame) gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)" });
        if (img) gsap.set(img, { x: 0, scale: 1 });
        if (panel) gsap.set(panel, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline();

      // Smooth panel content transition
      if (panel) {
        tl.fromTo(
          panel,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" },
          0,
        );
      }

      // Clean Right-to-Left image reveal animation
      if (frame) {
        tl.fromTo(
          frame,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.inOut" },
          0.02,
        );
      }

      // Parallax shift from right (+40px)
      if (img) {
        tl.fromTo(
          img,
          { x: 40, scale: 1.12 },
          { x: 0, scale: 1, duration: 1.0, ease: "expo.out" },
          0.02,
        );
      }
    },
    { dependencies: [activeIndex], scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-white py-6 sm:py-8 lg:py-10 border-t border-slate-200/60"
      aria-labelledby="quality-inspection-heading"
    >
      <div className="shell">
        <div className="grid items-stretch gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Heading, Quote, and 3 Sub-Tab Buttons */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              {/* Heading 1: Quality Control (Signature Brand Blue) */}
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-6 bg-[#0066cc]" />
                <h2
                  id="quality-inspection-heading"
                  className="font-mono text-[12.5px] sm:text-[13.5px] font-bold uppercase tracking-[0.2em] text-[#0066cc]"
                >
                  Quality Control
                </h2>
              </div>

              {/* Slogan Quote with matching blue accent line — larger and impactful */}
              <blockquote className="mt-3.5 sm:mt-4 border-l-3 border-[#0066cc] pl-4 sm:pl-5 font-display text-[clamp(1.45rem,2.4vw,2.15rem)] font-bold leading-[1.2] tracking-tight text-ink">
                All incoming materials which is going into the stroke process will be inspected as per
                IS Standards
              </blockquote>

              {/* Heading 2: Inspection (Emerald Green) & 3 Sub-Tab Buttons */}
              <div className="mt-4 sm:mt-5 border-t border-slate-200/80 pt-3 sm:pt-3.5">
                <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
                  <span className="h-[2px] w-6 bg-emerald-600" />
                  <h3 className="font-mono text-[12.5px] sm:text-[13.5px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                    Inspection
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {inspectionStages.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeIndex === idx;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabClick(idx)}
                      className={`group relative flex items-center gap-2.5 sm:gap-3 rounded-xl p-2.5 sm:p-3 text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-slate-50 shadow-2xs ring-1 ring-slate-200/90"
                          : "hover:bg-slate-50/60"
                      }`}
                    >
                      {/* Icon container */}
                      <span
                        className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-[10px] transition-transform duration-300 group-hover:scale-105 ${item.tileBg} ${item.tileColor}`}
                      >
                        <Icon aria-hidden className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} />
                      </span>

                      {/* Sub-tab text on the SAME line */}
                      <span
                        className={`text-[13px] sm:text-[13.5px] lg:text-[14px] font-bold leading-tight transition-colors min-w-0 flex-1 ${
                          isActive ? "text-ink" : "text-slate-600 group-hover:text-ink"
                        }`}
                      >
                        {item.tabLabel}
                      </span>

                      {/* Active bottom indicator bar */}
                      {isActive && (
                        <span
                          className={`absolute bottom-0 left-2.5 right-2.5 h-[2.5px] rounded-full ${item.activeBar}`}
                        />
                      )}
                    </button>
                  );
                })}
                </div>
              </div>
            </div>

            {/* Active Stage Details Panel */}
            <div
              data-stage-panel
              key={stage.id}
              className="mt-4 sm:mt-5 rounded-2xl border border-slate-200/70 bg-[#faf8f5]/80 p-4 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[16px] sm:text-[17.5px] lg:text-[18.5px] font-bold text-ink">
                  {stage.heading}
                </h3>
                <span className="font-mono text-[11.5px] font-semibold text-slate-400">
                  {stage.activities.length} Checks
                </span>
              </div>

              <p className="mt-2 text-[14px] sm:text-[14.5px] leading-relaxed text-slate-600">
                {stage.content}
              </p>

              <ul className="mt-3.5 grid gap-2 sm:grid-cols-2">
                {stage.activities.map((act) => (
                  <li
                    key={act}
                    className="flex items-start gap-2.5 text-[13px] sm:text-[13.5px] font-medium text-slate-700"
                  >
                    <CheckCircle2
                      className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5"
                      strokeWidth={2.4}
                    />
                    <span className="leading-snug">{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Photography Card — Pure, clean image without text overlays or shadows */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              data-image-frame
              className="group relative aspect-[4/3.2] sm:aspect-[4/3.4] lg:aspect-auto w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] overflow-hidden rounded-[24px] bg-slate-100 border border-slate-200/80 shadow-md transition-shadow duration-500 hover:shadow-xl"
            >
              <div data-image-el className="relative h-full w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]">
                <Image
                  src={stage.image}
                  alt={stage.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={activeIndex === 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
