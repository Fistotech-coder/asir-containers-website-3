"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { allHomeClients } from "@/data/manufacturing";
import { WavyHighlight } from "@/components/ui/WavyHighlight";

export function ClientsSection() {
  // Duplicate array to ensure perfectly seamless infinite loop
  const marqueeList = [...allHomeClients, ...allHomeClients];

  return (
    <section className="relative overflow-hidden bg-white pt-10 sm:pt-12 lg:pt-14 pb-3 sm:pb-4 lg:pb-5 border-b border-slate-100/70">
      <Reveal className="shell mb-6 sm:mb-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
            <h2 className="mt-3 font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-[1.06]">
              Trusted by Leading Packaging <WavyHighlight dot={true}>Brands</WavyHighlight>
            </h2>
          </div>
          <p
            data-reveal
            data-reveal-dir="right"
            data-reveal-delay="0.18"
            className="max-w-md text-[14px] leading-relaxed text-slate-600"
          >
            Supplying precision injection-moulded and decorated pails to leading paint, agrochemical, food and lube manufacturers.
          </p>
        </div>
      </Reveal>

      {/* Edge gradient mask for clean marquee fade on white background */}
      <Reveal className="relative w-full overflow-hidden">
        <div data-reveal data-reveal-dir="scale" data-reveal-delay="0.2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white via-white/80 to-transparent" />

          {/* Marquee Track with borderless logo containers */}
          <div className="animate-marquee flex items-center gap-8 py-3">
            {marqueeList.map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="group flex h-20 w-52 shrink-0 items-center justify-center px-4 transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={180}
                  height={46}
                  unoptimized
                  className="h-10 w-auto max-w-[150px] object-contain transition-transform duration-300 group-hover:scale-108"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
