"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "@/lib/animations";

type VideoItem = {
  id: string;
  title: string;
  videoSrc: string;
  poster: string;
  duration: string;
};

const videos: VideoItem[] = [
  {
    id: "apex-paints",
    title: "Apex Chemical & Paints Ltd",
    videoSrc: "/videos/testimonial-1.mp4",
    poster: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    duration: "1:42",
  },
  {
    id: "greenharvest-agro",
    title: "GreenHarvest Agro Chemicals",
    videoSrc: "/videos/testimonial-2.mp4",
    poster: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    duration: "1:15",
  },
  {
    id: "vortex-lubricants",
    title: "Vortex Lubricants & Greases",
    videoSrc: "/videos/testimonial-3.mp4",
    poster: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    duration: "1:28",
  },
];

export function TestimonialsSection() {
  // First video is active and playing by default
  const [playingId, setPlayingId] = useState<string>(videos[0].id);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const scope = sectionRef.current;
      if (!scope) return;
      if (reduceMotion()) return;

      const words = scope.querySelectorAll(".word-reveal");
      const swoosh = scope.querySelector(".swoosh-underline");

      gsap.set(words, { yPercent: 120, opacity: 0, rotate: 2 });
      if (swoosh) gsap.set(swoosh, { scaleX: 0, transformOrigin: "left center" });

      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 88%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(words, {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
          });
          if (swoosh) {
            tl.to(
              swoosh,
              {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.3"
            );
          }
        },
      });
    },
    { scope: sectionRef }
  );

  const handleCardClick = (id: string) => {
    if (playingId === id) {
      // Toggle pause/play on current active video
      const current = videoRefs.current[id];
      if (current) {
        if (current.paused) {
          current.play().catch(() => {});
        } else {
          current.pause();
        }
      }
    } else {
      // Pause any currently playing video
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }
      setPlayingId(id);
      // Play newly selected video
      const target = videoRefs.current[id];
      if (target) {
        target.currentTime = 0;
        target.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    // Autoplay the first video muted on mount
    const firstVideo = videoRefs.current[videos[0].id];
    if (firstVideo) {
      firstVideo.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white pt-5 sm:pt-6 lg:pt-7 pb-14 sm:pb-16 lg:pb-20 border-b border-slate-100/80"
    >
      {/* Subtle background angled color accents matching reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[480px] w-[500px] opacity-40 blur-3xl [background:radial-gradient(ellipse_at_top_right,#dbeafe_0%,#eff6ff_40%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 h-[380px] w-[420px] opacity-30 blur-3xl [background:radial-gradient(ellipse_at_bottom_left,#f1f5f9_0%,transparent_70%)]"
      />

      <div className="shell relative z-10">
        {/* Header with technical kicker and fluid masked entrance typography */}
        <div className="flex flex-col justify-between gap-4 pb-5 sm:pb-6 sm:flex-row sm:items-end">
          <div>
            {/* Distinctive masked reveal heading */}
            <h2
              ref={headingRef}
              className="font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.65rem] font-bold tracking-tight text-slate-950 leading-[1.06]"
            >
              <span className="inline-block overflow-hidden py-1">
                <span className="word-reveal inline-block">Proven</span>
              </span>{" "}
              <span className="inline-block overflow-hidden py-1">
                <span className="word-reveal inline-block">Quality,</span>
              </span>{" "}
              <span className="inline-block overflow-hidden py-1">
                <span className="word-reveal inline-block">Shared</span>
              </span>{" "}
              <span className="inline-block overflow-hidden py-1">
                <span className="word-reveal inline-block">by</span>
              </span>{" "}
              <span className="inline-block overflow-hidden py-1">
                <span className="word-reveal inline-block">Our</span>
              </span>{" "}
              <span className="inline-block overflow-hidden py-1">
                <span className="word-reveal relative inline-block font-display font-bold not-italic text-[#0e4c9c] sm:ml-1">
                  Clients<span className="text-[#0e4c9c]">.</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 160 12"
                    fill="none"
                    className="swoosh-underline absolute -bottom-1 left-0 w-full h-[7px] text-[#0e4c9c]/85 stroke-current"
                  >
                    <path
                      d="M2 8C45 3 115 2.5 158 7"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h2>
          </div>

          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:pb-2 sm:text-right">
            VERIFIED CLIENT FOOTAGE
          </p>
        </div>

        {/* 3 Video Cards Grid (Direct In-Card Playback with Controls) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {videos.map((item, idx) => {
            const isCurrent = playingId === item.id;
            const videoDir = idx === 0 ? "left" : idx === 1 ? "scale" : "right";

            return (
              <Reveal key={item.id}>
                <div
                  data-reveal
                  data-reveal-dir={videoDir}
                  data-reveal-delay={(0.15 + idx * 0.1).toFixed(2)}
                  className="group relative overflow-hidden rounded-[20px] bg-slate-950 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-800/80"
                >
                  {/* 16:10 aspect ratio card */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    {/* HTML5 Video Element with native controls */}
                    <video
                      ref={(el) => {
                        videoRefs.current[item.id] = el;
                      }}
                      src={item.videoSrc}
                      poster={item.poster}
                      loop
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      controls
                      controlsList="nodownload"
                      onPlay={() => {
                        if (playingId !== item.id) {
                          // Pause others
                          Object.entries(videoRefs.current).forEach(([id, el]) => {
                            if (id !== item.id && el) el.pause();
                          });
                          setPlayingId(item.id);
                        }
                      }}
                      className={`h-full w-full object-cover transition-opacity duration-500 ${
                        isCurrent ? "opacity-100" : "opacity-75 group-hover:opacity-90"
                      }`}
                    />

                    {/* Gradient overlay and play button for idle state (when paused or not current) */}
                    {!isCurrent && (
                      <div
                        onClick={() => handleCardClick(item.id)}
                        className="absolute inset-0 z-10 cursor-pointer bg-gradient-to-t from-black/85 via-black/15 to-black/25"
                      >
                        {/* Top right duration */}
                        <div className="absolute right-4 top-3.5 z-10">
                          <span className="font-mono text-[11.5px] font-semibold text-white/90 drop-shadow-sm">
                            {item.duration}
                          </span>
                        </div>

                        {/* Center Action Indicator: Blue circular Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-15 w-15 items-center justify-center rounded-full bg-brand text-white shadow-[0_6px_20px_rgba(0,102,204,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-dark sm:h-16 sm:w-16">
                            <Play className="ml-1 h-6 w-6 fill-current text-white sm:h-7 sm:w-7" />
                          </div>
                        </div>

                        {/* Bottom bar: Title on left, clean Arrow on right */}
                        <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center justify-between gap-3">
                          <h3 className="font-display text-[15px] font-bold text-white drop-shadow-sm sm:text-[15.5px]">
                            {item.title}
                          </h3>
                          <ArrowRight className="h-4 w-4 shrink-0 text-white/90 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
