"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "@/lib/animations";

export type ScrollRotatingLidProps = {
  /** Mode: "2-topics" (for Auxiliaries) or "3-topics" (for Production Machineries) */
  mode?: "2-topics" | "3-topics";
  className?: string;
};

export function ScrollRotatingLid({
  mode = "2-topics",
  className = "",
}: ScrollRotatingLidProps) {
  const root = useRef<HTMLDivElement | null>(null);
  const lidPositionRef = useRef<HTMLDivElement | null>(null);
  const lidAutoSpinRef = useRef<HTMLDivElement | null>(null);
  const interactiveRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const posWrapper = lidPositionRef.current;
      const spinWrapper = lidAutoSpinRef.current;
      const rootEl = root.current;
      if (!posWrapper || !spinWrapper || !rootEl || reduceMotion()) return;

      // The shell container where both header and alternating cards are located
      const shell = (rootEl.closest(".shell") as HTMLElement | null) || rootEl.parentElement;
      if (!shell) return;

      const card1 = shell.querySelector<HTMLElement>("[data-topic-card='1']");
      const card2 = shell.querySelector<HTMLElement>("[data-topic-card='2']");
      const card3 = shell.querySelector<HTMLElement>("[data-topic-card='3']");

      const mm = gsap.matchMedia();

      // Helper to calculate target coordinate relative to root's starting position in shell (Desktop)
      const getCardTarget = (
        card: HTMLElement | null,
        isLeftCard: boolean
      ) => {
        if (!card || !shell || !rootEl) return { x: 0, y: 0 };
        const shellRect = shell.getBoundingClientRect();
        const rootRect = rootEl.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        // Initial root position within shell
        const rootXInShell = rootRect.left - shellRect.left;
        const rootYInShell = rootRect.top - shellRect.top;

        // Card position within shell
        const cardXInShell = cardRect.left - shellRect.left;
        const cardYInShell = cardRect.top - shellRect.top;

        const lidW = rootRect.width || 320;
        const lidH = rootRect.height || 320;

        // On desktop (>= 1024px):
        // For Left Card (Topic 1 & 3): Center is positioned near the right edge of the card
        // For Right Card (Topic 2): Center is positioned near the left edge of the card
        const targetCenterX = isLeftCard
          ? cardXInShell + cardRect.width - (lidW * 0.12)
          : cardXInShell + (lidW * 0.12);
        const targetCenterY = cardYInShell + (cardRect.height * 0.5);

        return {
          x: targetCenterX - (lidW * 0.5) - rootXInShell,
          y: targetCenterY - (lidH * 0.5) - rootYInShell,
        };
      };

      // DESKTOP ONLY (>= 1024px): Rotate & scroll-driven glide movement across alternating cards
      // Mobile and tablet screens (< 1024px) are intentionally excluded so movement/rotation stops completely
      mm.add("(min-width: 1024px)", () => {
        // Continuous slow-motion auto-rotation on desktop
        const autoSpin = gsap.to(spinWrapper, {
          rotation: 360,
          duration: 24,
          repeat: -1,
          ease: "none",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: shell,
            start: "top 30%",
            end: "bottom 85%",
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });

        // 1. Initial Hold: Keeps lid docked prominently in the top-right open space while viewing header
        tl.to(posWrapper, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.05,
          ease: "none",
        });

        if (mode === "3-topics") {
          // PRODUCTION MACHINERIES (3 topics):
          // Phase 1: Glides to Card 1 (Screen Printing - Card on Left)
          tl.to(posWrapper, {
            x: () => getCardTarget(card1, true).x,
            y: () => getCardTarget(card1, true).y,
            rotation: 180,
            duration: 0.3,
            ease: "power1.inOut",
          })
            // Phase 2: Glides across to Card 2 (HTL - Card on Right)
            .to(posWrapper, {
              x: () => getCardTarget(card2, false).x,
              y: () => getCardTarget(card2, false).y,
              rotation: 360,
              duration: 0.3,
              ease: "power1.inOut",
            })
            // Phase 3: Glides back to Card 3 (IML - Card on Left)
            .to(posWrapper, {
              x: () => getCardTarget(card3, true).x,
              y: () => getCardTarget(card3, true).y,
              rotation: 540,
              duration: 0.3,
              ease: "power1.inOut",
            });
        } else {
          // AUXILIARIES (2 topics):
          // Phase 1: Glides to Card 1 (Chiller 1 - Card on Left)
          tl.to(posWrapper, {
            x: () => getCardTarget(card1, true).x,
            y: () => getCardTarget(card1, true).y,
            rotation: 220,
            duration: 0.45,
            ease: "power1.inOut",
          })
            // Phase 2: Glides across to Card 2 (Chiller 2 - Card on Right)
            .to(posWrapper, {
              x: () => getCardTarget(card2, false).x,
              y: () => getCardTarget(card2, false).y,
              rotation: 440,
              duration: 0.45,
              ease: "power1.inOut",
            });
        }

        return () => {
          autoSpin.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: root, dependencies: [mode] }
  );

  // 3D Micro-tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion() || !interactiveRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(interactiveRef.current, {
      rotateX: -y * 20,
      rotateY: x * 20,
      scale: 1.03,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!interactiveRef.current) return;
    gsap.to(interactiveRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Playful spring spin on click
  const handleClick = () => {
    if (!interactiveRef.current) return;
    gsap.to(interactiveRef.current, {
      rotation: "+=360",
      duration: 0.85,
      ease: "back.out(1.6)",
    });
  };

  return (
    <div
      ref={root}
      className={`absolute top-2 sm:top-4 lg:top-8 right-2 sm:right-4 lg:right-8 xl:right-12 pointer-events-auto z-[5] select-none ${className}`}
      aria-hidden="true"
    >
      {/* Scroll-driven translating container */}
      <div ref={lidPositionRef} className="relative will-change-transform">
        {/* Continuous slow-motion auto-rotating wrapper */}
        <div ref={lidAutoSpinRef} className="relative will-change-transform">
          {/* Interactive hover/tilt/click container */}
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            title="Click to spin!"
            className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] lg:w-[330px] lg:h-[330px] xl:w-[380px] xl:h-[380px] cursor-pointer [perspective:1000px] group/lid"
          >
            {/* Pure, Clean High-Resolution Transparent Blue Lid Image — No gradient, no overlay text */}
            <div className="relative w-full h-full">
              <Image
                src="/images/blue-lid.webp"
                alt="ASIR Containers precision moulded blue plastic lid"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 260px, 400px"
                priority={true}
                className="object-contain drop-shadow-[0_16px_36px_rgba(0,35,80,0.22)] transition-transform duration-300 group-hover/lid:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}