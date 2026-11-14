import React from "react";

interface WavyHighlightProps {
  children: React.ReactNode;
  dot?: boolean;
  serif?: boolean;
  italic?: boolean;
  className?: string;
}

/**
 * Common signature heading accent:
 * - Font: font-serif or font-display, customizable italic/normal
 * - Smooth architectural wave underline SVG
 * - Optional trailing colored dot
 */
export function WavyHighlight({
  children,
  dot = true,
  serif = true,
  italic = true,
  className = "",
}: WavyHighlightProps) {
  const fontClass = serif ? "font-serif" : "font-display";
  const styleClass = italic ? "italic font-semibold" : "not-italic font-bold";

  return (
    <span
      className={`relative inline-block ${fontClass} ${styleClass} text-[#0e4c9c] sm:ml-1 ${className}`}
    >
      {children}
      {dot && <span className="text-[#0e4c9c]">.</span>}
      <svg
        aria-hidden="true"
        viewBox="0 0 160 12"
        fill="none"
        className="swoosh-underline absolute -bottom-1 left-0 w-full h-[7px] text-[#0e4c9c] stroke-current pointer-events-none"
      >
        <path
          d="M2 8C45 3 115 2.5 158 7"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

