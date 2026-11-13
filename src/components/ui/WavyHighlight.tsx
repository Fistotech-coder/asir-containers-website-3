import React from "react";

interface WavyHighlightProps {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

/**
 * Common signature heading accent:
 * - Font: font-serif italic font-semibold text-[#0066cc]
 * - Smooth architectural wave underline SVG
 * - Optional trailing colored dot
 */
export function WavyHighlight({
  children,
  dot = true,
  className = "",
}: WavyHighlightProps) {
  return (
    <span
      className={`relative inline-block font-serif italic font-semibold text-[#0e4c9c] sm:ml-1 ${className}`}
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

