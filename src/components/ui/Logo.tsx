import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

type LogoProps = {
  /** "dark" renders for light backgrounds, "light" for dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
  imageClassName?: string;
  /** Hide the wordmark (icon only) — used in tight spaces. */
  compact?: boolean;
};

/**
 * Official ASIR Containers brand logo.
 */
export function Logo({ tone = "dark", className = "", imageClassName = "", compact = false }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center transition-opacity hover:opacity-90 ${className}`}
    >
      <div className="relative flex items-center">
        <Image
          src="/images/logo.svg"
          alt={site.name}
          width={132}
          height={34}
          priority
          className={`h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] ${
            isLight ? "brightness-0 invert" : ""
          } ${imageClassName}`}
        />
      </div>
    </Link>
  );
}
