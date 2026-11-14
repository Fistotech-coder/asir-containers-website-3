"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Droplets,
  Recycle,
  Snowflake,
  SunMedium,
  Thermometer,
  Wind,
} from "lucide-react";
import { useScrollReveal } from "@/lib/animations";
import { ScrollRotatingLid } from "@/components/machineries/ScrollRotatingLid";

export function AuxiliariesSection() {
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
        <ScrollRotatingLid mode="2-topics" />

        <div className="space-y-12 lg:space-y-16">
          {/* Section Header Area — Dedicated height & right-side clearance so the lid NEVER merges with text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[260px] lg:min-h-[380px] pb-6 lg:pb-10 border-b border-slate-300/30">
            <div className="lg:col-span-7 relative z-20 max-w-2xl pr-20 sm:pr-24 lg:pr-0">
              <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.75rem)] font-extrabold text-slate-900 tracking-tight leading-tight">
                Continuous Closed-Loop <br />
                <span className="text-[#0066cc]">Chilling & Thermal Control.</span>
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-600">
                Uninterrupted cycle times and micron-level container dimensions depend on constant process cooling and precision mold thermal regulation.
              </p>
            </div>
            {/* Right column empty spacer — explicitly reserves the space for the lid */}
            <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />
          </div>

          {/* TOPIC 1: Chiller 1 (Image Left, Content Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image Left - Reduced width, preserved height */}
            <div className="lg:col-span-5 relative z-10 flex justify-start" data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
              <div
                data-topic-card="1"
                className="relative w-full max-w-[430px] h-[360px] sm:h-[400px] lg:h-[420px] overflow-hidden rounded-2xl bg-white shadow-[0_12px_36px_rgba(0,35,80,0.1)] border border-white/80 group"
              >
                <Image
                  src="/images/facility/machinery-01.jpg"
                  alt="Chiller 1 - Central Industrial Water Chiller at Asir Containers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/80 shadow-xs flex items-center gap-2">
                  <Snowflake className="h-4 w-4 text-[#0066cc]" />
                  <span className="text-[12px] font-bold text-slate-900 font-mono">CHILLER 1 // CENTRAL PLANT</span>
                </div>
              </div>
            </div>

            {/* Text Right */}
            <div className="lg:col-span-7 relative z-20 flex flex-col justify-center pl-0 lg:pl-8 xl:pl-12" data-reveal data-reveal-dir="right" data-reveal-delay="0.15">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Chiller 1 — High-Capacity Industrial Water Chiller
              </h3>

              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-700">
                Chiller 1 operates as the central industrial process cooling plant for our heavy-tonnage injection moulding cells. Configured with a multi-stage scroll compressor network and high-efficiency plate heat exchangers, it circulates high-volume chilled water through primary mould core cooling channels. By extracting heat rapidly and evenly during continuous high-speed cycling, Chiller 1 prevents thermal warping, minimizes cycle times, and ensures uniform wall crystallization across large 10-litre to 20-litre rigid containers.
              </p>

              {/* Technical Highlights */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-300/60">
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>High-volume closed-loop water refrigeration circuit</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Microprocessor PLC temperature stabilization (7°C – 12°C)</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Rapid core heat dissipation eliminating sink marks</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>24/7 continuous duty cycle with redundant backup pumps</span>
                </div>
              </div>
            </div>
          </div>

          {/* TOPIC 2: Chiller 2 (Alternate: Content Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Left */}
            <div className="lg:col-span-7 relative z-20 order-2 lg:order-1 flex flex-col justify-center pr-0 lg:pr-8 xl:pr-12" data-reveal data-reveal-dir="left" data-reveal-delay="0.15">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Chiller 2 — Precision Auxiliary Chilling System
              </h3>

              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-700">
                Chiller 2 is dedicated to secondary loop chilling and high-precision mould temperature control across intricate tooling zones. Equipped with independent micro-calibrated temperature controllers, it regulates chilled fluid delivery directly to critical container neck finishes, tamper-evident locking rings, and lid seal channels. This pinpoint thermal management controls differential shrinkage, guarantees leak-tight hermetic sealing, and maintains tight dimensional tolerances within ±0.015mm.
              </p>

              {/* Technical Highlights */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-300/60">
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Independent multi-zone auxiliary chilling loops</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Precision thermal regulation within ±0.5°C</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Dedicated cooling for lid grooves & tamper-evident bands</span>
                </div>
                <div className="flex items-start gap-2 text-[13.5px] font-medium text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                  <span>Closed-circuit rust-inhibited fluid with pressure balance</span>
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
                  src="/images/facility/machinery-02.jpg"
                  alt="Chiller 2 - Dedicated Tool Temperature Control System at Asir Containers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/80 shadow-xs flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-[#0066cc]" />
                  <span className="text-[12px] font-bold text-slate-900 font-mono">CHILLER 2 // MTC CONTROL</span>
                </div>
              </div>
            </div>
          </div>

        {/* Complete Auxiliary Plant Support Ledger (Minimal Architectural Strip - No SaaS Cards) */}
        <div className="pt-8 border-t border-slate-300/60" data-reveal data-reveal-dir="up" data-reveal-delay="0.1">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[11px] font-bold tracking-wider text-[#0066cc] uppercase">
              PLANT AUXILIARY FOOTPRINT // COMPLETE INVENTORY
            </span>
            <span className="text-[12px] font-medium text-slate-500">Synchronized Process Infrastructure</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="border-l-2 border-[#0066cc] pl-3 py-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[12px]">
                <Snowflake className="h-3.5 w-3.5 text-[#0066cc]" />
                <span>Chilling Plants</span>
              </div>
              <div className="font-display font-extrabold text-[18px] text-slate-900 mt-0.5">2 Units</div>
              <div className="text-[11px] text-slate-500">Chiller 1 & Chiller 2</div>
            </div>

            <div className="border-l-2 border-amber-500 pl-3 py-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[12px]">
                <SunMedium className="h-3.5 w-3.5 text-amber-500" />
                <span>Hopper Dryers</span>
              </div>
              <div className="font-display font-extrabold text-[18px] text-slate-900 mt-0.5">8 Units</div>
              <div className="text-[11px] text-slate-500">Continuous Dehumidifying</div>
            </div>

            <div className="border-l-2 border-rose-500 pl-3 py-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[12px]">
                <Thermometer className="h-3.5 w-3.5 text-rose-500" />
                <span>Mould Temp</span>
              </div>
              <div className="font-display font-extrabold text-[18px] text-slate-900 mt-0.5">6 Units</div>
              <div className="text-[11px] text-slate-500">MTC Micro-Regulation</div>
            </div>

            <div className="border-l-2 border-emerald-500 pl-3 py-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[12px]">
                <Recycle className="h-3.5 w-3.5 text-emerald-500" />
                <span>Granulators</span>
              </div>
              <div className="font-display font-extrabold text-[18px] text-slate-900 mt-0.5">4 Units</div>
              <div className="text-[11px] text-slate-500">Closed-Loop Recycling</div>
            </div>

            <div className="border-l-2 border-indigo-500 pl-3 py-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[12px]">
                <Wind className="h-3.5 w-3.5 text-indigo-500" />
                <span>Compressors</span>
              </div>
              <div className="font-display font-extrabold text-[18px] text-slate-900 mt-0.5">3 Units</div>
              <div className="text-[11px] text-slate-500">Multi-Bar Screw Air</div>
            </div>

            <div className="border-l-2 border-sky-500 pl-3 py-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[12px]">
                <Droplets className="h-3.5 w-3.5 text-sky-500" />
                <span>Cooling Tower</span>
              </div>
              <div className="font-display font-extrabold text-[18px] text-slate-900 mt-0.5">1 Unit</div>
              <div className="text-[11px] text-slate-500">Induced Draft System</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

