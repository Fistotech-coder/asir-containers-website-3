"use client";

import Image from "next/image";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap, useGSAP, revealLines, reduceMotion, useScrollReveal } from "@/lib/animations";
import { WavyHighlight } from "@/components/ui/WavyHighlight";

export function AboutSection() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      let cancelled = false;
      const heading = scope.querySelector<HTMLElement>("[data-about-heading]");
      const splitHeading = () => {
        if (cancelled || !heading) return;
        revealLines(heading, { mode: "words", delay: 0.1 });
      };

      if (heading) {
        if (document.fonts?.status === "loaded") splitHeading();
        else void document.fonts?.ready.then(splitHeading);
      }

      return () => {
        cancelled = true;
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-gradient-to-br from-[#d8eeff] via-[#e4ecf2] to-[#d8eeff] py-10 lg:py-14 border-b border-[#cfe6fa]">
      {/* Background Decorative Graphic Elements */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-[550px] w-[550px] rounded-full border-[40px] border-[#0066ff]/[0.05] blur-[1px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 -bottom-16 h-[340px] w-[340px] rounded-full bg-gradient-to-tl from-[#0070f3]/[0.10] to-transparent blur-2xl"
      />

      <div className="shell relative z-10">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-6 lg:pr-4 flex flex-col justify-between">
            <div>
              {/* Title: Who We Are */}
              <h2
                data-reveal
                className="font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-[1.06]"
              >
                Who We <WavyHighlight dot={false} serif={false} italic={false}>Are</WavyHighlight>
              </h2>

              {/* Subtitle */}
              <p
                data-reveal
                data-reveal-delay="0.1"
                className="mt-4 font-display text-[18px] sm:text-[20px] lg:text-[21px] font-semibold text-slate-800 leading-snug"
              >
                Precision Packaging for a Safer, Brighter Tomorrow
              </p>

              {/* Narrative Paragraphs with Key Terms Bolded */}
              <div
                data-reveal
                data-reveal-delay="0.16"
                className="mt-5 space-y-4 text-[16px] sm:text-[17px] leading-[1.7] text-slate-600 font-normal"
              >
                <p>
                  Established in the year <strong className="font-semibold text-slate-900">2018</strong>, we <strong className="font-semibold text-slate-900">&ldquo;ASIR CONTAINERS&rdquo;</strong> are the leading Manufacturer of a wide range of Paint Bucket, Fertiliser Bucket, etc. Our presented products are extremely admired for their sturdiness, longer life, top quality and nominal costs.
                </p>
                <p>
                  Moreover, we work under the direction of our mentor Mr. ASIR CONTAINERS. Under his headship, we have achieved a prominent place in the market.
                </p>
              </div>

              {/* 3 Centered Icon Blocks Matching Reference Image */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-start justify-start gap-7 sm:gap-10">
                
                {/* 1. Precision Engineering */}
                <div data-reveal data-reveal-dir="scale" data-reveal-delay="0.22" className="flex flex-col items-center text-center">
                  <div className="flex h-[58px] w-[58px] sm:h-[64px] sm:w-[64px] items-center justify-center rounded-[18px] sm:rounded-[20px] bg-gradient-to-b from-[#0066ff] to-[#0052cc] shadow-[0_8px_18px_rgba(0,102,255,0.30)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_24px_rgba(0,102,255,0.40)]">
                    <Icon icon="fa6-solid:gear" className="h-7 w-7 sm:h-[30px] sm:w-[30px] text-white drop-shadow-xs" />
                  </div>
                  <p className="mt-2.5 max-w-[85px] sm:max-w-[95px] font-display text-[12.5px] sm:text-[13.5px] font-semibold text-slate-900 leading-[1.25]">
                    Precision Engineering
                  </p>
                </div>

                {/* 2. Trusted Protection */}
                <div data-reveal data-reveal-dir="scale" data-reveal-delay="0.3" className="flex flex-col items-center text-center">
                  <div className="flex h-[58px] w-[58px] sm:h-[64px] sm:w-[64px] items-center justify-center rounded-[18px] sm:rounded-[20px] bg-gradient-to-b from-[#0066ff] to-[#0052cc] shadow-[0_8px_18px_rgba(0,102,255,0.30)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_24px_rgba(0,102,255,0.40)]">
                    <Icon icon="fluent:shield-task-24-filled" className="h-7 w-7 sm:h-[30px] sm:w-[30px] text-white drop-shadow-xs" />
                  </div>
                  <p className="mt-2.5 max-w-[85px] sm:max-w-[95px] font-display text-[12.5px] sm:text-[13.5px] font-semibold text-slate-900 leading-[1.25]">
                    Trusted Protection
                  </p>
                </div>

                {/* 3. Built for Your Brand */}
                <div data-reveal data-reveal-dir="scale" data-reveal-delay="0.38" className="flex flex-col items-center text-center">
                  <div className="flex h-[58px] w-[58px] sm:h-[64px] sm:w-[64px] items-center justify-center rounded-[18px] sm:rounded-[20px] bg-gradient-to-b from-[#0066ff] to-[#0052cc] shadow-[0_8px_18px_rgba(0,102,255,0.30)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_24px_rgba(0,102,255,0.40)]">
                    <Icon icon="fluent:people-community-24-filled" className="h-7 w-7 sm:h-[30px] sm:w-[30px] text-white drop-shadow-xs" />
                  </div>
                  <p className="mt-2.5 max-w-[85px] sm:max-w-[95px] font-display text-[12.5px] sm:text-[13.5px] font-semibold text-slate-900 leading-[1.25]">
                    Built for Your Brand
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Matched Height 2-Image Composition */}
          <div className="relative flex flex-col justify-center lg:col-span-6">
            {/* Dot Pattern Matrix Backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-6 -top-6 z-0 h-24 w-24 opacity-25"
              style={{
                backgroundImage: "radial-gradient(#0066cc 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -bottom-4 z-0 h-24 w-24 opacity-25"
              style={{
                backgroundImage: "radial-gradient(#0066cc 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Height matched with left-side text content */}
            <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[465px] xl:h-[475px]">
              {/* Primary Large Image: Building Infrastructure (Slides from right) */}
              <figure data-reveal data-reveal-dir="right" data-reveal-delay="0.15" className="relative h-full w-full overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-2xl">
                <Image
                  src="/images/about/about-image-infrastructure.webp"
                  alt="ASIR Containers modern manufacturing facility"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[center_60%]"
                />
              </figure>

              {/* Secondary Overlapping Front Image (Lifts with scale & tilt from left) */}
              <figure data-reveal data-reveal-dir="scale-rotate" data-reveal-delay="0.32" className="absolute -bottom-3 -left-4 w-[48%] overflow-hidden rounded-[20px] border-[5px] border-white bg-white shadow-[0_20px_40px_rgba(0,0,0,0.22)]">
                <span className="relative block aspect-[4/3.5]">
                  <Image
                    src="/images/about/about-us-image-2.png"
                    alt="Containers on automated plant conveyor line"
                    fill
                    sizes="(max-width: 1024px) 50vw, 26vw"
                    className="object-cover"
                  />
                </span>
              </figure>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
