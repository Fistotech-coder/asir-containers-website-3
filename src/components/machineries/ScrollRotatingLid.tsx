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

      // 1. Continuous slow-motion auto-rotation (silky smooth, never freezes)
      const autoSpin = gsap.to(spinWrapper, {
        rotation: 360,
        duration: 24, // Slow motion: 24s per revolution
        repeat: -1,
        ease: "none",
      });

      // The shell container where both header and alternating cards are located
      const shell = (rootEl.closest(".shell") as HTMLElement | null) || rootEl.parentElement;
      if (!shell) return;

      const card1 = shell.querySelector<HTMLElement>("[data-topic-card='1']");
      const card2 = shell.querySelector<HTMLElement>("[data-topic-card='2']");
      const card3 = shell.querySelector<HTMLElement>("[data-topic-card='3']");

      const mm = gsap.matchMedia();

      // Helper to calculate target coordinate relative to root's starting position in shell
      const getCardTarget = (
        card: HTMLElement | null,
        isLeftCard: boolean,
        isSmallScreen: boolean = false
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

        let targetCenterX: number;
        let targetCenterY: number;

        if (isSmallScreen) {
          // On mobile/tablet (< 1024px):
          // The image card is stacked on top.
          // Dock the lid right at the edge of the card with ~35% overlapping the image edge
          // and ~65% protruding, staying snugly attached to the image without any floating gap.
          targetCenterX = isLeftCard
            ? cardXInShell + cardRect.width - (lidW * 0.35)
            : cardXInShell + (lidW * 0.35);
          targetCenterY = cardYInShell + (cardRect.height * 0.45);
        } else {
          // On desktop (>= 1024px):
          // For Left Card (Topic 1 & 3): Center is positioned near the right edge of the card
          // For Right Card (Topic 2): Center is positioned near the left edge of the card
          // Tucked directly against the image card, bridging the gap to the text
          targetCenterX = isLeftCard
            ? cardXInShell + cardRect.width - (lidW * 0.12)
            : cardXInShell + (lidW * 0.12);
          targetCenterY = cardYInShell + (cardRect.height * 0.5);
        }

        return {
          x: targetCenterX - (lidW * 0.5) - rootXInShell,
          y: targetCenterY - (lidH * 0.5) - rootYInShell,
        };
      };

      // DESKTOP (>= 1024px): Responsive glide to the backside of alternating image cards
      mm.add("(min-width: 1024px)", () => {
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
            x: () => getCardTarget(card1, true, false).x,
            y: () => getCardTarget(card1, true, false).y,
            rotation: 180,
            duration: 0.3,
            ease: "power1.inOut",
          })
            // Phase 2: Glides across to Card 2 (HTL - Card on Right)
            .to(posWrapper, {
              x: () => getCardTarget(card2, false, false).x,
              y: () => getCardTarget(card2, false, false).y,
              rotation: 360,
              duration: 0.3,
              ease: "power1.inOut",
            })
            // Phase 3: Glides back to Card 3 (IML - Card on Left)
            .to(posWrapper, {
              x: () => getCardTarget(card3, true, false).x,
              y: () => getCardTarget(card3, true, false).y,
              rotation: 540,
              duration: 0.3,
              ease: "power1.inOut",
            });
        } else {
          // AUXILIARIES (2 topics):
          // Phase 1: Glides to Card 1 (Chiller 1 - Card on Left)
          tl.to(posWrapper, {
            x: () => getCardTarget(card1, true, false).x,
            y: () => getCardTarget(card1, true, false).y,
            rotation: 220,
            duration: 0.45,
            ease: "power1.inOut",
          })
            // Phase 2: Glides across to Card 2 (Chiller 2 - Card on Right)
            .to(posWrapper, {
              x: () => getCardTarget(card2, false, false).x,
              y: () => getCardTarget(card2, false, false).y,
              rotation: 440,
              duration: 0.45,
              ease: "power1.inOut",
            });
        }
      });

      // MOBILE & TABLET (< 1024px): Responsive dynamic tracking directly alongside each image
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: shell,
            start: "top 25%",
            end: "bottom 85%",
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });

        tl.to(posWrapper, { x: 0, y: 0, duration: 0.05, ease: "none" });

        if (mode === "3-topics") {
          tl.to(posWrapper, {
            x: () => getCardTarget(card1, true, true).x,
            y: () => getCardTarget(card1, true, true).y,
            rotation: 180,
            duration: 0.3,
            ease: "power1.inOut",
          })
            .to(posWrapper, {
              x: () => getCardTarget(card2, false, true).x,
              y: () => getCardTarget(card2, false, true).y,
              rotation: 360,
              duration: 0.3,
              ease: "power1.inOut",
            })
            .to(posWrapper, {
              x: () => getCardTarget(card3, true, true).x,
              y: () => getCardTarget(card3, true, true).y,
              rotation: 540,
              duration: 0.3,
              ease: "power1.inOut",
            });
        } else {
          tl.to(posWrapper, {
            x: () => getCardTarget(card1, true, true).x,
            y: () => getCardTarget(card1, true, true).y,
            rotation: 220,
            duration: 0.45,
            ease: "power1.inOut",
          })
            .to(posWrapper, {
              x: () => getCardTarget(card2, false, true).x,
              y: () => getCardTarget(card2, false, true).y,
              rotation: 440,
              duration: 0.45,
              ease: "power1.inOut",
            });
        }
      });

      return () => {
        autoSpin.kill();
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