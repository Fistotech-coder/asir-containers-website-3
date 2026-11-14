"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ScrollTrigger, useGSAP, reduceMotion } from "@/lib/animations";

const TOTAL_FRAMES = 440;

const getFrameUrl = (index: number) => {
  const frameNum = String(index + 1).padStart(5, "0");
  return `/images/process/hero-video-images/${frameNum}.webp`;
};

export function ProcessHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fast in-memory image cache
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // DOM refs
  const scrollCueRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // High-performance canvas draw routine with full-screen cover and gentle ending zoom
  const drawFrame = (frameIdx: number, progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pick target image or fallback to closest loaded frame
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIdx - 1; i >= 0; i--) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          img = candidate;
          break;
        }
      }
      if (!img) {
        for (let i = frameIdx + 1; i < TOTAL_FRAMES; i++) {
          const candidate = imagesRef.current[i];
          if (candidate && candidate.complete && candidate.naturalWidth > 0) {
            img = candidate;
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Clear background to pure black
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cw, ch);

    // Full-screen cover scaling: fills the screen edge-to-edge
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const baseScale = Math.max(cw / iw, ch / ih);

    // Ending zoom: gently zooms into the interior cavity
    let extraZoom = 1.0;
    if (progress > 0.60) {
      const t = (progress - 0.60) / 0.40; // 0.0 to 1.0
      extraZoom = 1.0 + Math.pow(t, 1.4) * 0.06;
    }

    const scale = baseScale * extraZoom;
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
  };

  // Resize listener ensuring crisp full-bleed canvas matching window.devicePixelRatio
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    drawFrame(currentFrameRef.current, currentProgressRef.current);
  };

  // 1. Initial frame load + progressive background preloader (Optimized for 440 frames)
  useEffect(() => {
    let isMounted = true;
    const images = imagesRef.current;

    const loadSingle = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (!isMounted || images[index]) {
          resolve();
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (isMounted) images[index] = img;
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    // Step A: Load frame 0 immediately and paint
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      if (!isMounted) return;
      images[0] = firstImg;
      setFirstFrameReady(true);
      resizeCanvas();

      // Step B: Prioritize first 40 frames for instant initial scroll responsiveness
      const initialBatch: Promise<void>[] = [];
      for (let i = 1; i < Math.min(40, TOTAL_FRAMES); i++) {
        initialBatch.push(loadSingle(i));
      }

      Promise.all(initialBatch).then(() => {
        if (!isMounted) return;

        // Step C: Load key frame anchors (every 4th frame) across the full range
        const anchorBatch: Promise<void>[] = [];
        for (let i = 40; i < TOTAL_FRAMES; i += 4) {
          anchorBatch.push(loadSingle(i));
        }

        Promise.all(anchorBatch).then(() => {
          if (!isMounted) return;

          // Step D: Fill remaining intermediate frames progressively
          for (let i = 1; i < TOTAL_FRAMES; i++) {
            if (!images[i]) {
              loadSingle(i);
            }
          }
        });
      });
    };

    const onResize = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(resizeCanvas);
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      isMounted = false;
      window.removeEventListener("resize", onResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // 2. GSAP ScrollTrigger Scrubbing Engine
  useGSAP(
    () => {
      if (reduceMotion()) return;
      const section = sectionRef.current;
      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=320%",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          currentProgressRef.current = progress;

          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
          );

          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex, progress);

          // Fade out the initial scroll prompt as soon as scrolling starts (0% -> 10%)
          if (scrollCueRef.current) {
            const cueOpacity = Math.max(0, 1 - progress * 10);
            scrollCueRef.current.style.opacity = String(cueOpacity);
            scrollCueRef.current.style.pointerEvents = cueOpacity <= 0.05 ? "none" : "auto";
          }

          // Deterministic overlay display:
          // Emerges smoothly starting at progress 0.58, reaches 100% full opacity at 0.80,
          // and stays at full 100% visibility through 1.00 so the user can read comfortably!
          if (overlayRef.current) {
            if (progress < 0.58) {
              overlayRef.current.style.opacity = "0";
              overlayRef.current.style.transform = "translateY(24px)";
              overlayRef.current.style.pointerEvents = "none";
            } else if (progress <= 0.80) {
              const p = (progress - 0.58) / 0.22; // 0.0 to 1.0
              const easeP = 1 - Math.pow(1 - p, 2);
              overlayRef.current.style.opacity = String(easeP);
              overlayRef.current.style.transform = `translateY(${(1 - easeP) * 24}px)`;
              overlayRef.current.style.pointerEvents = easeP > 0.5 ? "auto" : "none";
            } else {
              overlayRef.current.style.opacity = "1";
              overlayRef.current.style.transform = "translateY(0px)";
              overlayRef.current.style.pointerEvents = "auto";
            }
          }
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#000000] text-white selection:bg-brand selection:text-white"
    >
      {/* Pinned full-screen viewport */}
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Full-bleed Edge-to-Edge Canvas (Covering entire screen) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none z-0"
        />

        {/* Fallback initial poster before canvas first paint */}
        {!firstFrameReady && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/process/hero-video-images/00001.webp"
            alt="Process hero pail container"
            className="absolute inset-0 h-full w-full object-cover pointer-events-none z-0"
          />
        )}

        {/* Initial Minimalist Scroll Cue (Fades away as soon as user starts scrolling) */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-8 inset-x-0 z-20 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-mono tracking-widest text-white/80 backdrop-blur-md shadow-lg">
            <ChevronDown className="h-4 w-4 animate-bounce text-brand" />
            <span>SCROLL TO EXPLORE PROCESS</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* Ending Overlay: Displays smoothly across the final white sequence   */}
        {/* ------------------------------------------------------------------- */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-30 flex items-center justify-center px-6 sm:px-10"
          style={{ opacity: 0, transform: "translateY(24px)", pointerEvents: "none" }}
        >
          <div className="shell flex flex-col items-center text-center max-w-4xl">
            {/* Heading in Black & Blue (Visible on White Canvas) */}
            <h1 className="font-display text-[clamp(2.2rem,4.6vw,4.25rem)] font-bold leading-[1.12] tracking-tight">
              <span className="block text-slate-950">
                Advanced <span className="whitespace-nowrap">In-Process</span>
              </span>
              <span className="block text-brand">
                Production Systems
              </span>
            </h1>

            {/* Content Description in Dark Charcoal/Black */}
            <p className="mt-5 text-[15.5px] sm:text-[17.5px] md:text-[18.5px] leading-relaxed text-slate-700 max-w-2xl font-medium">
              Automated moulding and custom labeling operations engineered for tight dimensional accuracy, vibrant finishes, and zero-defect repeatability.
            </p>

            {/* CTA */}
            <div className="mt-8 flex items-center justify-center">
              <Link
                href="/contact?topic=engineering"
                className="group inline-flex h-12 items-center gap-2.5 rounded-xl bg-brand px-7 text-[15px] font-semibold text-white shadow-xl shadow-brand/25 transition-all duration-300 hover:bg-brand-dark hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Contact engineering</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
