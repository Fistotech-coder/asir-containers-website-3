"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, revealLines, reduceMotion, EASE } from "@/lib/animations";

export function ContactHero({
  children,
  intro = "Send us a message, give us a call, or better still visit us.",
}: {
  children?: React.ReactNode;
  intro?: string;
}) {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      let cancelled = false;
      const heading = scope.querySelector<HTMLElement>("[data-contact-heading]");
      const splitHeading = () => {
        if (cancelled || !heading) return;
        revealLines(heading, { mode: "words", delay: 0.2, scrollTrigger: false });
      };
      if (heading) {
        if (document.fonts?.status === "loaded") splitHeading();
        else void document.fonts?.ready.then(splitHeading);
      }

      if (reduceMotion()) return () => { cancelled = true; };

      gsap.from(scope.querySelectorAll("[data-contact-fade]"), {
        y: 20,
        autoAlpha: 0,
        duration: 0.9,
        delay: 0.3,
        stagger: 0.08,
        ease: EASE.out,
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative bg-white pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-8 lg:pb-10 flex flex-col items-center"
    >
      {/* Background Graphic Image - Ends precisely across the card's midsection (at the red line boundary) */}
      <div className="absolute top-0 inset-x-0 z-0 h-[500px] sm:h-[550px] lg:h-[580px] overflow-hidden bg-slate-900">
        <Image
          src="/images/contact/contact-support.webp"
          alt="We want to hear from you — ASIR Containers"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] pointer-events-none"
        />
      </div>

      {/* Main Container over Background Image & White Section */}
      <div className="shell relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Centered Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h1
            data-contact-heading
            className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]"
          >
            We want to{" "}
            <span className="text-[#38bdf8] font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              hear from you
            </span>
          </h1>

          <p
            className="mt-4 max-w-xl mx-auto text-[15.5px] sm:text-[17.5px] leading-relaxed text-white font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
            data-contact-fade
          >
            {intro}
          </p>
        </div>

        {/* Floating Card Popup: Top half over background image, bottom half over clean white background */}
        {children}
      </div>
    </section>
  );
}
