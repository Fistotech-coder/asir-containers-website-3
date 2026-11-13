"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/data/site";

const year = new Date().getFullYear();

/** Circular social icons matching reference design */
function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/** Application line icons matching reference graphic */
function PaintRollerIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="16" height="6" rx="2" />
      <path d="M10 9v3a3 3 0 0 0 3 3h4a2 2 0 0 1 2 2v4" />
      <path d="M19 19v2" />
    </svg>
  );
}

function AgroIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21V10" />
      <path d="M12 10a5 5 0 0 1-5-5c4 0 5 2 5 5z" />
      <path d="M12 13a5 5 0 0 0 5-5c-4 0-5 2-5 5z" />
    </svg>
  );
}

function FoodIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2v20" />
      <path d="M21 2c0 2.5-1.5 4.5-3 4.5" />
      <path d="M3 2v7c0 1.5 1 2.5 2.5 2.5V22" />
      <path d="M8 2v7c0 1.5-1 2.5-2.5 2.5" />
      <path d="M5.5 2v7" />
    </svg>
  );
}

function LubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Process", href: "/process" },
  { label: "Technologies", href: "/technologies" },
  { label: "Contact", href: "/contact" },
];

const applicationsList = [
  { label: "Paint", href: "/products?application=paint", icon: PaintRollerIcon },
  { label: "Agro", href: "/products?application=agro", icon: AgroIcon },
  { label: "Food", href: "/products?application=food", icon: FoodIcon },
  { label: "Lube", href: "/products?application=lube", icon: LubeIcon },
];

export function Footer() {
  return (
    <footer
      className="relative text-white overflow-hidden bg-[#00295D] border-t border-white/10"
      style={{ backgroundColor: "#00295D" }}
    >
      {/* Top-Right Decorative Blue Arc matching reference graphic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 h-[340px] w-[420px] rounded-full bg-[#05448B]/40 blur-[30px]"
      />

      {/* Low-opacity background container graphic matching user request */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 z-0 select-none overflow-hidden opacity-10 lg:opacity-15"
      >
        <div className="relative w-[340px] h-[260px] sm:w-[480px] sm:h-[360px] lg:w-[620px] lg:h-[460px] xl:w-[720px] xl:h-[530px]">
          <Image
            src="/images/footer-pails.webp"
            alt=""
            fill
            priority={false}
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 620px, 480px"
            className="object-contain object-right-bottom"
          />
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-12 pb-10 lg:pt-14 lg:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 items-stretch">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col justify-between lg:pr-8 xl:pr-10 lg:border-r lg:border-white/15">
            <div>
              <div className="flex items-center -mt-1">
                <Logo tone="light" imageClassName="!h-10 sm:!h-11 w-auto" />
              </div>

              <p className="mt-5 text-[13.5px] sm:text-[14px] leading-relaxed text-white/80 font-normal">
                ASIR Containers manufactures rigid plastic pails and containers for the paint, agro, food and lubricant industries — innovating and square formats, with multiple closure options and industry-specific colour availability.
              </p>
            </div>

            {/* Social Icons with dark blue circular pill buttons */}
            <div className="mt-6 sm:mt-7 flex items-center gap-3">
              <a
                href={site.social.find((s) => s.icon === "linkedin")?.href || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001c44] hover:bg-[#0052cc] text-white transition-all duration-200 border border-white/10 shadow-xs hover:scale-105"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.find((s) => s.icon === "instagram")?.href || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001c44] hover:bg-[#0052cc] text-white transition-all duration-200 border border-white/10 shadow-xs hover:scale-105"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.find((s) => s.icon === "facebook")?.href || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001c44] hover:bg-[#0052cc] text-white transition-all duration-200 border border-white/10 shadow-xs hover:scale-105"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.find((s) => s.icon === "youtube")?.href || "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001c44] hover:bg-[#0052cc] text-white transition-all duration-200 border border-white/10 shadow-xs hover:scale-105"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact */}
          <div className="lg:px-8 xl:px-10 lg:border-r lg:border-white/15">
            <h3 className="font-display text-[17px] sm:text-[18px] font-bold text-white tracking-tight leading-none">
              Contact
            </h3>
            {/* Cyan indicator bar */}
            <div className="mt-2.5 mb-5 h-[2.5px] w-9 rounded-full bg-[#29aae4]" />

            <div className="space-y-4">
              {/* Address with circular icon */}
              <div className="flex items-start gap-3">
                <span className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-[#001c44] text-white border border-white/10 shadow-xs mt-0.5">
                  <MapPin className="h-4 w-4" />
                </span>
                <a
                  href={site.contact.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([site.contact.addressLines.join(", "), site.contact.country].filter(Boolean).join(", "))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/85 text-[13px] sm:text-[13.5px] font-normal leading-relaxed hover:text-white transition-colors"
                >
                  1734-c1, Pallapatti Rd,<br />
                  near Central Excise Office,<br />
                  Thiruthangal, Sivakasi,<br />
                  Tamil Nadu 626130
                </a>
              </div>

              {/* Phone with circular icon */}
              <div className="flex items-center gap-3">
                <span className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-[#001c44] text-white border border-white/10 shadow-xs">
                  <Phone className="h-4 w-4" />
                </span>
                <a
                  href="tel:+919876543210"
                  className="text-white/90 text-[13.5px] sm:text-[14px] font-medium hover:text-white transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>

              {/* Email with circular icon */}
              <div className="flex items-center gap-3">
                <span className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-[#001c44] text-white border border-white/10 shadow-xs">
                  <Mail className="h-4 w-4" />
                </span>
                <a
                  href="mailto:sales@asircontainers.com"
                  className="text-white/90 text-[13.5px] sm:text-[14px] font-medium hover:text-white transition-colors"
                >
                  sales@asircontainers.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Navigate */}
          <div className="lg:px-8 xl:px-10 lg:border-r lg:border-white/15">
            <h3 className="font-display text-[17px] sm:text-[18px] font-bold text-white tracking-tight leading-none">
              Navigate
            </h3>
            {/* Cyan indicator bar */}
            <div className="mt-2.5 mb-5 h-[2.5px] w-9 rounded-full bg-[#29aae4]" />

            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between rounded-xl px-3.5 py-2 text-[13.5px] font-medium text-white/90 hover:text-white transition-all"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-white group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Applications */}
          <div className="lg:pl-8 xl:pl-10">
            <h3 className="font-display text-[17px] sm:text-[18px] font-bold text-white tracking-tight leading-none">
              Applications
            </h3>
            {/* Cyan indicator bar */}
            <div className="mt-2.5 mb-5 h-[2.5px] w-9 rounded-full bg-[#29aae4]" />

            <ul className="space-y-2.5">
              {applicationsList.map((app) => {
                const Icon = app.icon;
                return (
                  <li key={app.label}>
                    <Link
                      href={app.href}
                      className="group flex items-center justify-between text-[13.5px] sm:text-[14px] font-medium text-white/90 hover:text-white py-0.5 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#001c44] text-white border border-white/10 group-hover:bg-[#002456] transition-all">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span>{app.label}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-white group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar matching reference layout with Copyright & Tagline */}
      <div className="relative z-10 border-t border-white/15 bg-[#002454]/60 py-4 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          
          {/* Left: Copyright */}
          <div className="text-[12.5px] sm:text-[13.5px] text-white/80 font-normal">
            © {year} ASIR Containers. All rights reserved.
          </div>

          {/* Right: Tagline */}
          <div className="flex items-center gap-3 text-[13px] sm:text-[13.5px] text-white/80 font-normal italic">
            <span className="h-4 w-[1px] bg-white/20 not-italic" />
            <span>Innovative Packaging . Sustainable Future</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
