"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { allHomeClients } from "@/data/manufacturing";
import { WavyHighlight } from "@/components/ui/WavyHighlight";

export function ClientsSection() {
  // Duplicate array to ensure perfectly seamless infinite loop
  const marqueeList = [...allHomeClients, ...allHomeClients];

  return (
    <section className="relative overflow-hidden bg-white pt-4 sm:pt-5 lg:pt-6 pb-2 sm:pb-3 lg:pb-4 border-b border-slate-100/70">
      <Reveal className="shell mb-3 sm:mb-4 lg:mb-5">
        <div className="flex flex-col items-start justify-between gap-4 text-left md:flex-row md:items-end md:gap-8 lg:gap-12">
          <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1" className="shrink-0 max-w-xl">
            <h2 className="font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-[1.06]">
              Trusted by Leading Packaging <WavyHighlight dot={true} serif={false} italic={false}>Brands</WavyHighlight>
            </h2>
          </div>
          <p
            data-reveal
            data-reveal-dir="right"
            data-reveal-delay="0.18"
            className="max-w-lg lg:max-w-[520px] xl:max-w-[560px] text-[16px] sm:text-[17.5px] lg:text-[18.5px] leading-[1.55] text-slate-600"
          >
            From paints and agrochemicals to food-grade and industrial lubricants, manufacturers rely on ASIR Containers for precision-moulded and decorated pails.
          </p>
        </div>
      </Reveal>

      {/* Edge gradient mask for clean marquee fade on white background */}
      <Reveal className="relative w-full overflow-hidden">
        <div data-reveal data-reveal-dir="scale" data-reveal-delay="0.2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent" />

          {/* Marquee Track with tighter spacing to eliminate empty gaps */}
          <div className="animate-marquee flex items-center gap-3 sm:gap-4 md:gap-5 py-1.5 sm:py-2">
            {marqueeList.map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="group flex h-14 sm:h-16 w-36 sm:w-40 md:w-44 shrink-0 items-center justify-center px-2 transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={180}
                  height={46}
                  unoptimized
                  className="h-8 sm:h-9 md:h-10 w-auto max-w-[130px] sm:max-w-[140px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
