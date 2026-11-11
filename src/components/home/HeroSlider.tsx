"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export const sodaData = [
  {
    name: "Black Cherry",
    desc: "Cherry Vanilla",
    img: "https://halftimebeverage.com/media/catalog/product/cache/5a9ece781d558937ae51db0fc99c94f4/rdi/rdi/loverboy-black-cherry-vanilla-38289_1.png",
    color: "#f710aa",
  },
  {
    name: "Berry Bliss",
    desc: "Wild Strawberry Mix",
    img: "https://drinkloverboy.com/cdn/shop/files/strawberry-lemonade_1920x.png?v=1705975712",
    color: "#E91E63",
  },
  {
    name: "Blue Hues",
    desc: "Blueberry Lemon",
    img: "https://cdn.shopify.com/s/files/1/0469/9894/5945/files/Loverboy_Spritz_250mlSlimlineCan_Blueberry-FOP.png?v=1739381664",
    color: "#bd5df5",
  },
  {
    name: "Orange Blast",
    desc: "Orange Basil Dream",
    img: "https://cdn.shopify.com/s/files/1/0469/9894/5945/files/Loverboy-LIT-Non-Alc2.png?v=1710755794",
    color: "#FFC107",
  },
  {
    name: "Pina Hina",
    desc: "Pineapple Hibiscus",
    img: "https://cdn.shopify.com/s/files/1/0469/9894/5945/files/7c1e5a60a48701b8759b8724555618882ed0dfc0-1288x1600_900x1118.png?v=1684512288",
    color: "#bcce78",
  },
  {
    name: "Sparkling Peach",
    desc: "White Tea Peach Sparkling Hard Tea",
    img: "https://cdn.shopify.com/s/files/1/0469/9894/5945/files/Loverboy-LIT-Non-Alc2.png?v=1710755794",
    color: "#f17579",
  },
  {
    name: "Half n Half",
    desc: "Iced tea meets lemonade",
    img: "https://bevmo.com/cdn/shop/files/59ca8a9d-eb29-4dd5-b369-8cb7d64bce0f-padded.png?v=1719294057",
    color: "#4da9be",
  },
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const lastWheelTime = useRef<number>(0);

  const move = useCallback((dir: number) => {
    setCurrentIndex((prev) => (prev + dir + sodaData.length) % sodaData.length);
  }, []);

  const update = useCallback(() => {
    if (!carouselRef.current) return;
    const cans = carouselRef.current.querySelectorAll<HTMLDivElement>(".can");
    const winW = typeof window !== "undefined" ? window.innerWidth : 1200;

    // Dynamic horizontal spread based on screen size
    const xOffset = winW > 768 ? 450 : winW * 0.4;
    const zOffset = -300; // How far the side cans sit back

    cans.forEach((can, i) => {
      let relIndex = i - currentIndex;

      // Circular logic to find the shortest path
      if (relIndex > sodaData.length / 2) relIndex -= sodaData.length;
      if (relIndex < -sodaData.length / 2) relIndex += sodaData.length;

      const isActive = i === currentIndex;
      can.classList.toggle("active", isActive);

      if (isActive) {
        // CENTER CAN
        can.style.transform = `translate3d(0, 0, 450px) rotateY(0deg)`;
        can.style.opacity = "1";
        can.style.filter = "blur(0px)";
        can.style.zIndex = "100";

        // Update UI
        const flavorTitle = document.getElementById("flavorTitle");
        if (flavorTitle) {
          flavorTitle.innerText = sodaData[i].name;
        }
        const flavorDesc = document.getElementById("flavorDesc");
        if (flavorDesc) {
          flavorDesc.innerText = sodaData[i].desc;
        }

        const bgGradient = `radial-gradient(circle at center, ${sodaData[i].color}80 0%, #ffffffc7 100%)`;
        if (sceneRef.current) {
          sceneRef.current.style.background = bgGradient;
        }
        if (typeof document !== "undefined" && document.body) {
          document.body.style.background = bgGradient;
        }
      } else if (
        Math.abs(relIndex) === 1 ||
        Math.abs(relIndex) === sodaData.length - 1
      ) {
        // SIDE CANS (The ones right next to center)
        const direction = relIndex > 0 ? 1 : -1;
        can.style.transform = `translate3d(${
          direction * xOffset
        }px, 0, ${zOffset}px) scale(0.75) rotateY(${direction * -15}deg)`;
        can.style.opacity = "0.7";
        can.style.filter = "blur(2px)";
        can.style.zIndex = "10";
      } else {
        // HIDE OTHERS (Far away cans)
        can.style.transform = `translate3d(0, 0, -1000px) scale(0)`;
        can.style.opacity = "0";
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
    // Wheel controls (active when hero is in view)
    const handleWheel = (e: WheelEvent) => {
      if (!sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

      const now = Date.now();
      if (now - lastWheelTime.current > 220 && Math.abs(e.deltaY) > 20) {
        lastWheelTime.current = now;
        move(e.deltaY > 0 ? 1 : -1);
      }
    };

    // Touch support
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) move(1);
      if (endX - startX > 50) move(-1);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (typeof document !== "undefined" && document.body) {
        document.body.style.background = "";
      }
    };
  }, [move]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url("https://fonts.googleapis.com/css2?family=Chokokutai&family=Homemade+Apple&family=Slackey&display=swap");

            :root {
              --panel-bg: rgba(255, 255, 255, 0.041);
              --can-w: 160px;
              --active-can-w: 300px;
              --font-apple: "Homemade Apple", cursive;
              --font-chokokutai: "Chokokutai", system-ui;
              --font-slackey: "Slackey", sans-serif;
            }

            @media (max-width: 768px) {
              :root {
                --can-w: 100px;
                --active-can-w: 220px;
              }
            }

            .scene {
              position: relative;
              width: 100%;
              height: 100vh;
              min-height: 100svh;
              perspective: 1500px;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              transition: background 0.6s ease;
            }

            .carousel {
              position: absolute;
              width: 100%;
              height: 100%;
              transform-style: preserve-3d;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .can {
              position: absolute;
              width: var(--can-w);
              transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
              user-select: none;
              cursor: pointer;
              z-index: 1;
            }

            .can.active {
              width: var(--active-can-w);
              z-index: 100;
              animation: floating 4s ease-in-out infinite;
            }

            @keyframes floating {
              0%,
              100% {
                transform: translate3d(0, 0, 450px) rotate(-8deg);
              }
              50% {
                transform: translate3d(0, -20px, 480px) rotate(-10deg);
              }
            }

            .can img {
              width: 100%;
              height: auto;
              filter: drop-shadow(0 20px 50px rgba(0, 0, 0, 0.15));
              pointer-events: none;
            }

            .info-panel {
              position: absolute;
              bottom: 8%;
              width: 280px;
              padding: 10px;
              background: var(--panel-bg);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              border-radius: 24px;
              text-align: center;
              z-index: 1000;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
              color: white;
            }

            .info-panel h2 {
              font-family: var(--font-slackey);
              margin: 0 0 4px 0;
              font-size: 1.35rem;
              letter-spacing: -0.01em;
              text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
            }

            .info-panel p {
              font-family: var(--font-apple);
              margin: 0;
              font-size: 1.1rem;
              text-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
            }

            .nav-btn {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              background: rgba(166, 230, 16, 0.5);
              color: white;
              border: none;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              cursor: pointer;
              z-index: 2000;
              font-size: 1.2rem;
              transition: 0.3s;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .nav-btn:hover {
              background: rgba(230, 155, 16, 0.521);
            }

            .prev {
              left: 5%;
            }

            .next {
              right: 5%;
            }
          `,
        }}
      />

      <div className="scene" id="scene" ref={sceneRef}>
        <div className="carousel" id="carousel" ref={carouselRef}>
          {sodaData.map((data, i) => (
            <div
              key={data.name + i}
              className={`can ${i === currentIndex ? "active" : ""}`}
              onClick={() => {
                setCurrentIndex(i);
              }}
            >
              <img
                src={data.img}
                alt={data.name}
                onError={(e) => {
                  // Fallback for CDN link availability
                  e.currentTarget.src =
                    "https://drinkloverboy.com/cdn/shop/files/white-tea-peach_1920x.png";
                }}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="nav-btn prev"
          onClick={() => move(1)}
          aria-label="Previous can"
        >
          ←
        </button>
        <button
          type="button"
          className="nav-btn next"
          onClick={() => move(-1)}
          aria-label="Next can"
        >
          →
        </button>

        <div className="info-panel" id="infoPanel">
          <h2 id="flavorTitle">{sodaData[currentIndex].name}</h2>
          <p id="flavorDesc">{sodaData[currentIndex].desc}</p>
        </div>
      </div>
    </>
  );
}
