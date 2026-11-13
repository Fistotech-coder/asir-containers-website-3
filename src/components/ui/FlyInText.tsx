"use client";

import React, { useEffect, useRef } from "react";
import { reduceMotion } from "@/lib/animations";

interface FlyInTextProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

function renderFlyInWords(node: React.ReactNode, keyPrefix = "word"): React.ReactNode {
  if (typeof node === "string") {
    // Split into words while keeping whitespace tokens so natural spacing is preserved
    const tokens = node.split(/(\s+)/);
    return tokens.map((token, index) => {
      if (!token) return null;
      if (/^\s+$/.test(token)) {
        return " ";
      }
      return (
        <span
          key={`${keyPrefix}-${index}`}
          className="flyin-word"
        >
          {token}
        </span>
      );
    });
  }

  if (Array.isArray(node)) {
    return React.Children.map(node, (child, idx) =>
      renderFlyInWords(child, `${keyPrefix}-${idx}`)
    );
  }

  if (React.isValidElement(node)) {
    return (
      <span key={keyPrefix} className="flyin-word">
        {node}
      </span>
    );
  }

  return node;
}

/**
 * Fly-in text animation:
 * Words fly in with transform: translateX(-18px) scale(0.85) -> translateX(0) scale(1)
 * as the user scrolls into view.
 */
export function FlyInText({
  children,
  as: Component = "span",
  className = "",
}: FlyInTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll<HTMLElement>(".flyin-word");
    if (spans.length === 0) return;

    if (reduceMotion()) {
      spans.forEach((span) => span.classList.add("v2"));
      return;
    }

    const checkVisibility = () => {
      const windowHeight = window.innerHeight;
      spans.forEach((span) => {
        const spanRect = span.getBoundingClientRect();
        // Trigger as soon as the top of the word enters the viewport
        if (spanRect.top <= windowHeight * 0.95) {
          span.classList.add("v2");
        } else {
          span.classList.remove("v2");
        }
      });
    };

    // Initial check on mount & after slight delay to ensure fonts & layout settle
    checkVisibility();
    const timer = setTimeout(checkVisibility, 80);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Hook into Lenis smooth scroll if active
    const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void; off: (event: string, cb: () => void) => void } }).__lenis;
    if (lenis?.on) {
      lenis.on("scroll", onScroll);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (lenis?.off) {
        lenis.off("scroll", onScroll);
      }
    };
  }, []);

  return (
    <Component ref={containerRef} className={`flyintxtbox ${className}`}>
      {renderFlyInWords(children)}
    </Component>
  );
}
