"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export interface HeroProduct {
  id: string;
  size: string;
  img: string;
  code?: string;
}

export const heroProducts: HeroProduct[] = [
  {
    id: "500ml-paint-pail-p2",
    size: "500 ml",
    img: "/images/hero/dummy-pail-1.png",
    code: "P/2",
  },
  {
    id: "1l-paint-pail-p1a",
    size: "1 Litre",
    img: "/images/hero/dummy-pail-2.png",
    code: "P1a",
  },
  {
    id: "4l-paint-pail-p4",
    size: "4 Litre",
    img: "/images/hero/dummy-pail-3.png",
    code: "P4",
  },
  {
    id: "5l-round-pail-a5",
    size: "5 Litre",
    img: "/images/hero/dummy-pail-1.png",
    code: "A5",
  },
  {
    id: "5l-square-pail-interlock-f5",
    size: "5 Litre",
    img: "/images/hero/dummy-pail-3.png",
    code: "F5p",
  },
  {
    id: "10l-paint-pail-p10",
    size: "10 Litre",
    img: "/images/hero/dummy-pail-2.png",
    code: "P10p",
  },
  {
    id: "15l-square-pail-interlock-f15",
    size: "15 Litre",
    img: "/images/hero/dummy-pail-3.png",
    code: "F15p",
  },
  {
    id: "17l-square-pail-interlock-f17a",
    size: "17 Litre",
    img: "/images/hero/dummy-pail-3.png",
    code: "F17ip",
  },
  {
    id: "17l-square-pail-outer-lock-f17b",
    size: "17 Litre",
    img: "/images/hero/dummy-pail-3.png",
    code: "F17op",
  },
  {
    id: "20l-paint-pail-p20a",
    size: "20 Litre",
    img: "/images/hero/dummy-pail-1.png",
    code: "P20ap",
  },
  {
    id: "1kg-storage-pail-k1",
    size: "1 Kg",
    img: "/images/hero/dummy-pail-2.png",
    code: "K1",
  },
  {
    id: "2kg-storage-pail-k2",
    size: "2 Kg",
    img: "/images/hero/dummy-pail-1.png",
    code: "K2",
  },
  {
    id: "5kg-storage-pail-k5",
    size: "5 Kg",
    img: "/images/hero/dummy-pail-2.png",
    code: "K5",
  },
  {
    id: "10kg-storage-pail-k10",
    size: "10 Kg",
    img: "/images/hero/dummy-pail-1.png",
    code: "K10p",
  },
  {
    id: "20kg-storage-pail-k20",
    size: "20 Kg",
    img: "/images/hero/dummy-pail-2.png",
    code: "K20p",
  },
];

// Backwards-compatible export
export const sodaData = heroProducts;

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const move = useCallback((dir: number) => {
    setCurrentIndex(
      (prev) => (prev + dir + heroProducts.length) % heroProducts.length
    );
  }, []);

  // GSAP Entrance animation for heading
  useEffect(() => {
    if (!headingRef.current) return;
    const wordInners = headingRef.current.querySelectorAll(".word-inner");
    if (!wordInners.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordInners,
        {
          y: "115%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, []);

  // Auto-run cycle across all 15 products every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      move(1);
    }, 4000);
    return () => clearInterval(timer);
  }, [move]);

  const update = useCallback(() => {
    if (!carouselRef.current) return;
    const cans = carouselRef.current.querySelectorAll<HTMLDivElement>(".can");
    const winW = typeof window !== "undefined" ? window.innerWidth : 1200;

    // Dynamic horizontal spread based on screen size
    const xOffset = winW > 1024 ? 410 : winW > 768 ? 290 : winW * 0.38;
    const zOffset = -260;

    cans.forEach((can, i) => {
      let relIndex = i - currentIndex;

      // Circular logic across all 15 items
      if (relIndex > heroProducts.length / 2) relIndex -= heroProducts.length;
      if (relIndex < -heroProducts.length / 2) relIndex += heroProducts.length;

      const isActive = i === currentIndex;
      can.classList.toggle("active", isActive);

      if (isActive) {
        // CENTER CONTAINER
        can.style.transform = `translate3d(0, 0, 450px) rotateY(0deg)`;
        can.style.opacity = "1";
        can.style.filter = "blur(0px)";
        can.style.zIndex = "100";

        const sizeValue = document.getElementById("productSizeValue");
        if (sizeValue) {
          sizeValue.innerText = heroProducts[i].size;
        }
      } else if (Math.abs(relIndex) === 1) {
        // IMMEDIATE SIDE CONTAINERS
        const direction = relIndex > 0 ? 1 : -1;
        can.style.transform = `translate3d(${
          direction * xOffset
        }px, 0, ${zOffset}px) scale(0.72) rotateY(${direction * -14}deg)`;
        can.style.opacity = "0.75";
        can.style.filter = "blur(1.5px)";
        can.style.zIndex = "20";
      } else if (Math.abs(relIndex) === 2 && winW > 768) {
        // SECONDARY SIDE CONTAINERS (Desktop depth)
        const direction = relIndex > 0 ? 1 : -1;
        can.style.transform = `translate3d(${
          direction * (xOffset * 1.65)
        }px, 0, ${zOffset * 2}px) scale(0.48) rotateY(${direction * -20}deg)`;
        can.style.opacity = "0.35";
        can.style.filter = "blur(3px)";
        can.style.zIndex = "10";
      } else {
        // HIDE OTHER CONTAINERS
        can.style.transform = `translate3d(0, 0, -1000px) scale(0)`;
        can.style.opacity = "0";
        can.style.filter = "blur(5px)";
        can.style.zIndex = "0";
      }
    });
  }, [currentIndex]);

  useEffect(() => {
    update();
  }, [update]);

  useEffect(() => {
    const handleResize = () => update();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [update]);

  useEffect(() => {
    // Touch swipe support (horizontal only, normal vertical page scroll preserved)
    let startX = 0;
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only trigger if horizontal swipe is intentional and distinct from vertical scrolling
      if (Math.abs(diffX) > 55 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        if (diffX > 0) move(1);
        else move(-1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [move]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url("https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@600;700;800&display=swap");

            :root {
              --can-w: 185px;
              --active-can-w: 310px;
            }

            @media (max-width: 768px) {
              :root {
                --can-w: 110px;
                --active-can-w: 210px;
              }
            }

            @media (max-width: 480px) {
              :root {
                --can-w: 85px;
                --active-can-w: 175px;
              }
            }

            .scene {
              position: relative;
              width: 100%;
              height: 100vh;
              min-height: 620px;
              perspective: 1500px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              background-image: url("/images/hero-bg.webp");
              background-size: cover;
              background-position: center center;
              background-repeat: no-repeat;
            }

            .carousel {
              position: absolute;
              width: 100%;
              height: 100%;
              transform-style: preserve-3d;
              display: flex;
              justify-content: center;
              align-items: center;
              transform: translateY(-34px);
            }

            .can {
              position: absolute;
              width: var(--can-w);
              transition: all 0.75s cubic-bezier(0.25, 1, 0.5, 1);
              user-select: none;
              cursor: pointer;
              z-index: 1;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .can.active {
              width: var(--active-can-w);
              z-index: 100;
              animation: floating 4s ease-in-out infinite;
            }

            @keyframes floating {
              0%,
              100% {
                transform: translate3d(0, 0, 450px) translateY(0);
              }
              50% {
                transform: translate3d(0, -14px, 465px);
              }
            }

            .can img {
              width: 100%;
              height: auto;
              max-height: 400px;
              object-fit: contain;
              filter: drop-shadow(0 20px 35px rgba(11, 25, 44, 0.16));
              pointer-events: none;
              transition: filter 0.3s ease;
            }

            .can.active img {
              filter: drop-shadow(0 28px 45px rgba(11, 25, 44, 0.22));
            }

            /* Bottom Content Block */
            .hero-bottom-content {
              position: absolute;
              bottom: 3.5%;
              left: 50%;
              transform: translateX(-50%);
              width: 92%;
              max-width: 1280px;
              z-index: 150;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 8px;
              pointer-events: none;
            }

            .hero-heading-block {
              display: inline-flex;
              flex-direction: column;
              align-items: flex-start;
              text-align: left;
            }

            .hero-heading {
              font-family: var(--font-sans), "Plus Jakarta Sans Variable", -apple-system, sans-serif;
              margin: 0;
              padding: 0;
              line-height: 1.08;
              display: flex;
              flex-direction: column;
              gap: 2px;
            }

            .heading-line {
              display: flex;
              align-items: baseline;
              white-space: nowrap;
            }

            .heading-line-1 {
              font-size: clamp(1.5rem, 3.2vw, 2.75rem);
              font-weight: 800;
              letter-spacing: -0.025em;
              color: #081426;
              font-style: normal;
            }

            .heading-line-2 {
              font-size: clamp(1.5rem, 3.2vw, 2.75rem);
              font-weight: 800;
              letter-spacing: -0.02em;
              color: #0066ff;
              font-style: italic;
              padding-left: clamp(24px, 4.5vw, 54px);
              position: relative;
            }

            .swoosh-underline {
              position: absolute;
              bottom: -4px;
              left: 0;
              width: 100%;
              height: 10px;
              pointer-events: none;
              animation: swooshReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards;
            }

            @keyframes swooshReveal {
              from {
                opacity: 0;
                transform: scaleX(0);
                transform-origin: left center;
              }
              to {
                opacity: 1;
                transform: scaleX(1);
                transform-origin: left center;
              }
            }

            .word-mask {
              display: inline-block;
            
              vertical-align: top;
            }

            .word-inner {
              display: inline-block;
              will-change: transform, opacity;
            }

            @media (max-width: 768px) {
              .hero-bottom-content {
                bottom: 3%;
                width: 96%;
                gap: 6px;
              }
              .heading-line-1,
              .heading-line-2 {
                font-size: clamp(1.15rem, 4.4vw, 1.65rem);
              }
              .heading-line-2 {
                padding-left: clamp(18px, 4vw, 36px);
              }
            }

            @media (max-width: 480px) {
              .hero-bottom-content {
                bottom: 2.5%;
              }
              .heading-line-1,
              .heading-line-2 {
                font-size: clamp(1rem, 4.5vw, 1.35rem);
              }
            }

            /* Clean size display: redesigned font style */
            .hero-size-display {
              display: flex;
              align-items: center;
              justify-content: center;
              background: transparent;
              border: none;
              padding: 0;
              margin: 0;
              box-shadow: none;
            }

            .size-value {
              font-family: "Outfit Variable", var(--font-sans), sans-serif;
              font-size: clamp(1.2rem, 2.2vw, 1.65rem);
              font-weight: 700;
              letter-spacing: 0.03em;
              line-height: 1;
              color: #0f172a;
              display: inline-block;
              will-change: transform, opacity, filter;
              animation: smoothPopup 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            @keyframes smoothPopup {
              0% {
                opacity: 0;
                transform: translateY(14px) scale(0.92);
                filter: blur(4px);
              }
              50% {
                opacity: 0.75;
                filter: blur(1px);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0px);
              }
            }

            @media (max-width: 768px) {
              .size-value {
                font-size: clamp(1.2rem, 3.8vw, 1.6rem);
              }
            }

            /* Chevron Navigation Buttons: < and > */
            .nav-btn {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              background: rgba(255, 255, 255, 0.92);
              color: #0b192c;
              border: 1px solid rgba(203, 213, 225, 0.85);
              width: 46px;
              height: 46px;
              border-radius: 50%;
              cursor: pointer;
              z-index: 2000;
              transition: all 0.25s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.12), 0 2px 6px -1px rgba(15, 23, 42, 0.06);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
            }

            .nav-btn:hover {
              background: #0066cc;
              color: #ffffff;
              border-color: #0066cc;
              box-shadow: 0 10px 25px -3px rgba(0, 102, 204, 0.4);
              transform: translateY(-50%) scale(1.08);
            }

            .prev {
              left: 3.5%;
            }

            .next {
              right: 3.5%;
            }

            @media (max-width: 640px) {
              .nav-btn {
                width: 38px;
                height: 38px;
              }
              .prev {
                left: 2%;
              }
              .next {
                right: 2%;
              }
            }
          `,
        }}
      />

      <div
        className="scene"
        id="scene"
        ref={sceneRef}
      >
        {/* 3D Carousel of all 15 industrial products */}
        <div className="carousel" id="carousel" ref={carouselRef}>
          {heroProducts.map((data, i) => (
            <div
              key={data.id}
              className={`can ${i === currentIndex ? "active" : ""}`}
              onClick={() => {
                setCurrentIndex(i);
              }}
              title={data.size}
            >
              <img src={data.img} alt={`Container ${data.size}`} />
            </div>
          ))}
        </div>

        {/* Navigation arrows with < and > chevron icons */}
        <button
          type="button"
          className="nav-btn prev"
          onClick={() => move(-1)}
          aria-label="Previous container"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          className="nav-btn next"
          onClick={() => move(1)}
          aria-label="Next container"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Bottom Content: 2-Line Animated Heading (with padding-left on 2nd line + swoosh) + Clean Size */}
        <div className="hero-bottom-content">
          <div className="hero-heading-block">
            <h1 className="hero-heading" ref={headingRef}>
              <div className="heading-line heading-line-1">
                <span className="word-mask">
                  <span className="word-inner">Strong</span>
                </span>{" "}
                <span className="word-mask">
                  <span className="word-inner">Containers.</span>
                </span>
              </div>

              <div className="heading-line heading-line-2">
                <span className="word-mask">
                  <span className="word-inner">Smarter</span>
                </span>{" "}
                <span className="word-mask relative inline-block">
                  <span className="word-inner">Solutions.</span>
                  <svg
                    className="swoosh-underline"
                    viewBox="0 0 160 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                   <path
                      d="M2 9C45 13 115 12 158 3C118 8 48 10 2 9Z"
                      fill="#0066ff"
                    />
                  </svg>
                </span>
              </div>
            </h1>
          </div>

          <div className="hero-size-display">
            <span
              key={currentIndex}
              className="size-value"
              id="productSizeValue"
            >
              {heroProducts[currentIndex].size}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
