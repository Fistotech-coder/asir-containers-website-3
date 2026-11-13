"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, useGSAP, reduceMotion } from "@/lib/animations";

interface BannerSlide {
  id: string;
  backgroundImage: string;
  eyebrow: string;
  eyebrowHighlight: string;
  highlightClass: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: "paints-coatings",
    backgroundImage: "/images/hero/hero-background-1.webp",
    eyebrow: "Your Trusted Partner for",
    eyebrowHighlight: "Quality Container Solutions",
    highlightClass: "text-[#f59e0b]", // Amber / Warm Gold
    titleLine1: "Premium Packaging for",
    titleLine2: "Paints & Coatings",
    description:
      "Durable, spill-resistant, and high-impact white polypropylene pails engineered for decorative emulsions, primers, and industrial coatings.",
    ctaText: "Explore More....",
    ctaLink: "/products?application=paint",
  },
  {
    id: "agro-chemicals",
    backgroundImage: "/images/hero/hero-background-2.webp",
    eyebrow: "Your Trusted Partner for",
    eyebrowHighlight: "Quality Container Solutions",
    highlightClass: "text-[#4ade80]", // Fresh Agro Green
    titleLine1: "Heavy-Duty Packaging",
    titleLine2: "for Agro & Chemicals",
    description:
      "Chemically-resistant, virgin-grade containers built to safely store and transport fertilizers, crop protection liquids, and micronutrients.",
    ctaText: "Explore More....",
    ctaLink: "/products?application=agro",
  },
  {
    id: "food-grade",
    backgroundImage: "/images/hero/hero-background-3.webp",
    eyebrow: "Your Trusted Partner for",
    eyebrowHighlight: "Quality Container Solutions",
    highlightClass: "text-[#fbbf24]", // Golden Amber
    titleLine1: "Hygienic & Certified",
    titleLine2: "Food-Grade Packaging",
    description:
      "100% virgin, non-toxic, and airtight containers designed to preserve freshness for dairy, edible oils, honey, confectionery, and bulk ingredients.",
    ctaText: "Explore More....",
    ctaLink: "/products?application=food",
  },
  {
    id: "lubricants",
    backgroundImage: "/images/hero/hero-background-4.webp",
    eyebrow: "Your Trusted Partner for",
    eyebrowHighlight: "Quality Container Solutions",
    highlightClass: "text-[#4ade80]", // High-vis Green/Yellow
    titleLine1: "Industrial-Grade",
    titleLine2: "Packaging for Lubricants",
    description:
      "High-durability, drop-tested pails engineered for automotive greases, gear oils, engine lubricants, and heavy-duty industrial fluids.",
    ctaText: "Explore More....",
    ctaLink: "/products?application=lube",
  },
];

export function HeroBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const containerImgRef = useRef<HTMLDivElement | null>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = bannerSlides.length;
  const currentSlide = bannerSlides[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // GSAP Smooth Transitions for Backgrounds, Text, and Foreground Pails
  useGSAP(
    () => {
      if (!rootRef.current) return;

      if (reduceMotion()) {
        bgRefs.current.forEach((bg, idx) => {
          if (bg) {
            bg.style.opacity = idx === currentIndex ? "1" : "0";
            bg.style.transform = "none";
          }
        });
        if (textContainerRef.current) {
          textContainerRef.current.style.opacity = "1";
          textContainerRef.current.style.transform = "none";
        }
        return;
      }

      // 1. Smooth Background Crossfade with cinematic subtle zoom
      bgRefs.current.forEach((bg, idx) => {
        if (!bg) return;
        if (idx === currentIndex) {
          gsap.fromTo(
            bg,
            { opacity: 0, scale: 1.035 },
            { opacity: 1, scale: 1, duration: 0.85, ease: "power2.out" }
          );
        } else {
          gsap.to(bg, { opacity: 0, duration: 0.65, ease: "power2.inOut" });
        }
      });

      // 2. Staggered Text Entrance Animation
      if (textContainerRef.current) {
        const items = textContainerRef.current.querySelectorAll<HTMLElement>("[data-text-anim]");
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform",
            }
          );
        }
      }

      // 3. Subtle Settling Motion on Foreground Containers
      if (containerImgRef.current) {
        gsap.fromTo(
          containerImgRef.current,
          { opacity: 0.88, scale: 0.985, y: 6 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
    },
    { dependencies: [currentIndex], scope: rootRef }
  );

  // Auto-play timer (every 6 seconds), pauses on user hover or touch interaction
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      ref={rootRef}
      aria-label="Featured Industrial Container Solutions"
      className="relative w-full bg-[#0a1422] pt-[74px] sm:pt-[80px] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        Responsive Aspect Frame:
        - Mobile & Tablet: comfortable height (min-h-[500px] to min-h-[560px]) with stacked depth
        - Desktop: matches the exact reference graphic ratio (7680 / 3368 = ~2.28:1)
      */}
      <div className="relative w-full min-h-[500px] sm:min-h-[540px] md:min-h-[580px] lg:min-h-0 lg:aspect-[7680/3368] overflow-hidden flex items-center">
        
        {/* ===================================================================
            LAYER 1: Crossfading Background Scenes (Images 5 to 8)
            =================================================================== */}
        <div className="absolute inset-0 z-0">
          {bannerSlides.map((slide, idx) => (
            <div
              key={slide.id}
              ref={(el) => {
                bgRefs.current[idx] = el;
              }}
              className="absolute inset-0 h-full w-full will-change-[opacity,transform]"
              style={{
                opacity: idx === currentIndex ? 1 : 0,
                zIndex: idx === currentIndex ? 1 : 0,
              }}
            >
              <Image
                src={slide.backgroundImage}
                alt=""
                fill
                priority={idx === 0}
                quality={90}
                sizes="100vw"
                className="object-cover object-[70%_center] lg:object-center pointer-events-none select-none"
              />
            </div>
          ))}
        </div>

        {/* Mobile/Tablet readability scrim (softens background under text) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-black/85 via-black/50 to-transparent lg:hidden"
        />

        {/* ===================================================================
            LAYER 2: Foreground White Containers (/images/hero/hero-container-image.webp)
            Sits on the floor in the exact reference position
            =================================================================== */}
        <div
          ref={containerImgRef}
          className="pointer-events-none absolute z-10 will-change-transform 
                     right-[-6%] sm:right-0 md:right-[2%] lg:right-[7%] xl:right-[8%] 2xl:right-[9%] 
                     bottom-[2%] sm:bottom-[3%] lg:bottom-[4.5%] xl:bottom-[5%] 
                     w-[78%] sm:w-[65%] md:w-[58%] lg:w-[48%] xl:w-[49%] 2xl:w-[50%] 
                     max-w-[420px] sm:max-w-[500px] md:max-w-[620px] lg:max-w-[850px] xl:max-w-[940px]"
        >
          <div className="relative aspect-[3912/2612] w-full">
            <Image
              src="/images/hero/hero-container-image.webp"
              alt="ASIR Industrial Containers Product Lineup"
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 70vw, 50vw"
              className="object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>

        {/* ===================================================================
            LAYER 3: Animated Text Content (Eyebrow, Heading, Description, CTA)
            Aligned to match References 1-4 with live typography & responsive scaling
            =================================================================== */}
        <div
          ref={textContainerRef}
          key={`text-${currentSlide.id}`}
          className="relative z-20 w-full px-5 sm:px-8 md:px-10 lg:px-0 lg:max-w-none"
        >
          <div className="lg:absolute lg:left-[2.2%] xl:left-[2.8%] 2xl:left-[3.5%] lg:top-1/2 lg:-translate-y-1/2 max-w-[520px] sm:max-w-[600px] md:max-w-[640px] lg:max-w-[620px] xl:max-w-[720px] 2xl:max-w-[800px]">
            
            {/* 1. Eyebrow: "Your Trusted Partner for Quality Container Solutions" */}
            <div data-text-anim className="flex items-center gap-1.5 flex-wrap">
              <span className="font-sans text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] xl:text-[15.5px] font-semibold text-white/90 tracking-normal drop-shadow-xs">
                {currentSlide.eyebrow}
              </span>
              <span
                className={`font-sans text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] xl:text-[15.5px] font-bold tracking-normal drop-shadow-xs ${currentSlide.highlightClass}`}
              >
                {currentSlide.eyebrowHighlight}
              </span>
            </div>

            {/* 2. Main Heading: High-Impact Dual Line matching reference image */}
            <h1
              data-text-anim
              className="mt-2 sm:mt-2.5 lg:mt-3 font-display font-bold tracking-tight text-white leading-[1.08]
                         text-[1.85rem] sm:text-[2.3rem] md:text-[2.7rem] lg:text-[2.95rem] xl:text-[3.55rem] 2xl:text-[4.05rem] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            >
              <span className="block whitespace-normal sm:whitespace-nowrap">{currentSlide.titleLine1}</span>
              <span className="block whitespace-normal sm:whitespace-nowrap">{currentSlide.titleLine2}</span>
            </h1>

            {/* 3. Description Paragraph */}
            <p
              data-text-anim
              className="mt-2.5 sm:mt-3 lg:mt-3.5 font-sans text-white/85 font-normal leading-[1.55] 
                         text-[13px] sm:text-[14px] md:text-[14.5px] lg:text-[14.5px] xl:text-[15.5px] 
                         max-w-[480px] sm:max-w-[520px] lg:max-w-[540px] xl:max-w-[600px] drop-shadow-xs"
            >
              {currentSlide.description}
            </p>

            {/* 4. Action Button + Arrow Controls Side-by-Side (matching yellow drawing) */}
            <div data-text-anim className="mt-5 sm:mt-6 lg:mt-7 flex items-center gap-3 sm:gap-3.5">
              <Link
                href={currentSlide.ctaLink}
                className="inline-flex items-center justify-center rounded-[8px] sm:rounded-[10px] bg-white px-6 sm:px-8 py-2.5 sm:py-3 font-sans font-bold text-[14px] sm:text-[15px] lg:text-[15.5px] text-[#0b192c] shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-slate-100 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label={`Explore ${currentSlide.titleLine1} ${currentSlide.titleLine2}`}
              >
                <span>{currentSlide.ctaText}</span>
              </Link>

              {/* Prev Slide Arrow (<) */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Previous slide"
                className="group flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-slate-100 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white border border-white/60 cursor-pointer"
              >
                <ChevronLeft
                  aria-hidden
                  className="h-5 w-5 sm:h-5.5 sm:w-5.5 stroke-[2.5] transition-transform duration-200 group-hover:-translate-x-0.5"
                />
              </button>

              {/* Next Slide Arrow (>) */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Next slide"
                className="group flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-slate-100 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white border border-white/60 cursor-pointer"
              >
                <ChevronRight
                  aria-hidden
                  className="h-5 w-5 sm:h-5.5 sm:w-5.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
