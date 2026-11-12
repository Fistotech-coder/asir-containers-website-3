"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, ChevronDown, ChevronRight, LayoutGrid, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navigation, site } from "@/data/site";
import { products } from "@/data/products";

// Product display configuration matching reference card design
const navProductItems = [
  { slug: "500ml-paint-pail-p2", title: "500ml", code: "5PK", img: "/images/products/nav/500ml-paint-pail-p2.png" },
  { slug: "1l-paint-pail-p1a", title: "1Litre", code: "1L", img: "/images/products/nav/1l-paint-pail-p1a.png" },
  { slug: "1l-paint-pail-p1b", title: "1 Litre", code: "1L2", img: "/images/products/nav/1l-paint-pail-p1b.png" },
  { slug: "4l-paint-pail-p4", title: "4 Litre", code: "4L", img: "/images/products/nav/4l-paint-pail-p4.png" },
  { slug: "10l-paint-pail-p10", title: "10 Litre", code: "10D", img: "/images/products/nav/10l-paint-pail-p10.png" },
  { slug: "20l-paint-pail-p20a", title: "20 Litre", code: "20D", img: "/images/products/nav/20l-paint-pail-p20a.png" },
  { slug: "20l-paint-pail-p20b", title: "20 Litre", code: "20Dg", img: "/images/products/nav/20l-paint-pail-p20b.png" },
  { slug: "1kg-storage-pail-k1", title: "1 Kg", code: "1L", img: "/images/products/nav/1kg-storage-pail-k1.png" },
  { slug: "2kg-storage-pail-k2", title: "2 Kg", code: "02", img: "/images/products/nav/2kg-storage-pail-k2.png" },
  { slug: "5kg-storage-pail-k5", title: "5 Kg", code: "05", img: "/images/products/nav/5kg-storage-pail-k5.png" },
  { slug: "10kg-storage-pail-k10", title: "10 Kg", code: "10kg", img: "/images/products/nav/10kg-storage-pail-k10.png" },
  { slug: "20kg-storage-pail-k20", title: "20 Kg", code: "20kg", img: "/images/products/nav/20kg-storage-pail-k20.png" },
  { slug: "5l-round-pail-a5", title: "5 Pro round", code: "5R", img: "/images/products/nav/5l-round-pail-a5.png" },
  { slug: "5l-square-interlock-pail-f5", title: "5 Litre handleck", code: "5H3", img: "/images/products/nav/5l-square-pail-interlock-f5.png" },
  { slug: "17l-square-interlock-pail-f17i", title: "17 Litre square handleck", code: "17SH", img: "/images/products/nav/17l-square-pail-interlock-f17a.png" },
  { slug: "17l-square-outer-lock-pail-f17o", title: "17 Litre square round lock", code: "17SR", img: "/images/products/nav/17l-square-pail-outer-lock-f17b.png" },
  { slug: "15l-square-interlock-pail-f15", title: "15 Litre Interlock", code: "15IL", img: "/images/products/nav/15l-square-pail-interlock-f15.png" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const productsNavRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Navigate immediately to product and close dropdowns smoothly
  const handleProductNavigate = (slug: string) => {
    router.push(`/products/${slug}`);
    setProductsOpen(false);
    setOpen(false);
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: { immediate: boolean }) => void } }).__lenis;
      lenis?.scrollTo(0, { immediate: true });
    } catch {}
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!productsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (productsNavRef.current?.contains(target) || modalRef.current?.contains(target)) {
        return;
      }
      setProductsOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProductsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [productsOpen]);

  // Preload product pages when dropdown opens so navigation is instantaneous
  useEffect(() => {
    if (productsOpen) {
      navProductItems.forEach((item) => {
        try {
          router.prefetch(`/products/${item.slug}`);
        } catch {}
      });
    }
  }, [productsOpen, router]);

  const hoverOpen = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setProductsOpen(true);
    navProductItems.forEach((item) => {
      try {
        router.prefetch(`/products/${item.slug}`);
      } catch {}
    });
  };

  const hoverClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setProductsOpen(false), 180);
  };

  /* Transparent nav on /contact before scroll */
  const isTransparentNav = pathname === "/contact" && !scrolled && !open;
  const overLightHero =
    (pathname === "/" || pathname === "/process" || pathname === "/technologies") && !scrolled && !open;
  const onProductsPage = pathname.startsWith("/products");

  const isActive = (href: string) => {
    if (href.includes("#")) return mounted && pathname === "/";
    return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  };

  const linkTone = isTransparentNav
    ? "text-white/90 font-semibold hover:text-white hover:after:!bg-white"
    : overLightHero
      ? "text-slate-900 font-semibold hover:text-brand"
      : "text-slate-800 font-semibold hover:text-brand";

  const activeLinkClass = isTransparentNav
    ? "!text-white font-bold after:!bg-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
    : "!text-brand font-bold";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height,box-shadow] duration-500 ${
          isTransparentNav
            ? "border-b border-white/10 bg-transparent shadow-none"
            : overLightHero
              ? "border-b border-line/40 bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,40,90,0.05)]"
              : scrolled
                ? "border-b border-line/80 bg-white/95 backdrop-blur-md shadow-[0_6px_28px_rgba(0,40,90,0.08)]"
                : "border-b border-line/60 bg-white shadow-[0_4px_20px_rgba(0,40,90,0.05)]"
        }`}
      >
        <div
          className={`shell flex items-center justify-between gap-4 sm:gap-6 transition-[height] duration-500 ${
            scrolled ? "h-[64px] sm:h-[68px]" : "h-[74px] sm:h-[80px]"
          }`}
        >
          <div onMouseEnter={() => setProductsOpen(false)}>
            <Logo tone={isTransparentNav ? "light" : "dark"} />
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {navigation.map((item) =>
              item.hasMenu ? (
                <div
                  key={item.href}
                  ref={productsNavRef}
                  className="relative flex items-center"
                  onMouseEnter={hoverOpen}
                  onMouseLeave={hoverClose}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.href}
                      className={`link-rule text-[15px] xl:text-[15.5px] font-semibold tracking-tight transition-colors duration-200 ${linkTone} ${
                        onProductsPage ? activeLinkClass : ""
                      }`}
                      data-active={onProductsPage}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={productsOpen}
                      aria-controls="products-menu"
                      aria-label={productsOpen ? "Close products menu" : "Open products menu"}
                      onClick={() => setProductsOpen((value) => !value)}
                      className={`flex h-8 w-5 items-center justify-center transition-colors ${linkTone}`}
                    >
                      <ChevronDown
                        aria-hidden
                        className={`h-4 w-4 transition-transform duration-300 stroke-[2.5] ${
                          productsOpen
                            ? isTransparentNav
                              ? "rotate-180 text-white"
                              : "rotate-180 text-brand"
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive(item.href)}
                  onMouseEnter={() => setProductsOpen(false)}
                  className={`link-rule text-[15px] xl:text-[15.5px] font-semibold tracking-tight transition-colors duration-200 ${linkTone} ${
                    isActive(item.href) ? activeLinkClass : ""
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Desktop Right CTAs */}
          <div onMouseEnter={() => setProductsOpen(false)} className="hidden items-center gap-5 xl:gap-6 lg:flex">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={`link-rule group inline-flex items-center gap-1.5 text-[14.5px] xl:text-[15px] font-semibold tracking-tight transition-colors duration-200 ${linkTone}`}
            >
              Catalogue
              <ArrowUpRight
                aria-hidden
                className={`h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                  isTransparentNav ? "text-white" : "text-brand"
                }`}
              />
            </a>
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              withArrow
              className="rounded-md px-5 font-semibold shadow-[0_2px_10px_rgba(0,102,204,0.22)] hover:shadow-[0_4px_16px_rgba(0,102,204,0.32)] transition-all duration-200"
            >
              Enquire now
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors lg:hidden ${
              isTransparentNav
                ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border-slate-200/90 bg-white/80 text-slate-800 hover:border-brand/50 hover:text-brand"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Products Dropdown - Directly below Nav, Horizontally Centered, No Overlay */}
        <div
          id="products-menu"
          ref={modalRef}
          aria-hidden={!productsOpen}
          onMouseEnter={hoverOpen}
          onMouseLeave={hoverClose}
          className={`hidden lg:block absolute left-1/2 -translate-x-1/2 top-full pt-1.5 w-[min(1040px,calc(100vw-2.5rem))] transition-all duration-200 ${
            productsOpen
              ? "visible opacity-100 translate-y-0 pointer-events-auto"
              : "invisible opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {/* Inner Card Container */}
          <div className="max-h-[80vh] overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 lg:p-6 shadow-[0_24px_50px_-12px_rgba(0,35,90,0.18)]">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <LayoutGrid className="h-4 w-4" />
                </div>
                <span className="font-display text-[16px] sm:text-[17px] font-bold tracking-tight text-slate-900">
                  All Products
                </span>
              </div>

              <Link
                href="/products"
                prefetch={true}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    setProductsOpen(false);
                    setOpen(false);
                    router.push("/products");
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand/20 bg-brand/5 px-3 py-1.5 text-[12.5px] font-semibold text-brand hover:bg-brand hover:text-white transition-all duration-200"
              >
                View all catalogue <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Responsive grid matching user reference UI */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 lg:gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {navProductItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  prefetch={true}
                  tabIndex={productsOpen ? 0 : -1}
                  onMouseEnter={() => {
                    try {
                      router.prefetch(`/products/${item.slug}`);
                    } catch {}
                  }}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      handleProductNavigate(item.slug);
                    }
                  }}
                  className="group relative flex h-[62px] items-center justify-between rounded-2xl border border-slate-200/70 bg-white px-3 py-2 transition-all duration-200 hover:border-brand/50 hover:shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-1">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={44}
                        height={44}
                        className="max-h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-display text-[13.5px] font-bold leading-tight text-slate-900 group-hover:text-brand transition-colors truncate">
                        {item.title}
                      </span>
                      <span className="text-[11.5px] font-normal text-slate-400 group-hover:text-slate-500 transition-colors mt-0.5">
                        Code : {item.code}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-brand group-hover:text-white group-hover:translate-x-0.5">
                    <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        data-lenis-prevent
        className={`fixed inset-0 z-50 overflow-y-auto bg-slate-950/98 backdrop-blur-xl transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="shell flex min-h-full flex-col justify-between pb-8 pt-5">
          {/* Mobile drawer header with white logo and close button */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <Logo tone="light" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:border-brand hover:text-brand"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links with Architectural 01 // format */}
          <nav aria-label="Mobile" className="py-4">
            <Link
              href="/"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-4 transition-colors hover:text-brand"
            >
              <span className={`font-display text-[22px] sm:text-[24px] font-bold ${pathname === "/" ? "text-brand" : "text-white"}`}>
                Home
              </span>
              <span className="font-mono text-[11px] font-bold tracking-wider text-brand">01 //</span>
            </Link>

            <div className="border-b border-white/10 py-4">
              <div className="flex items-center justify-between">
                <Link
                  href="/products"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={`font-display text-[22px] sm:text-[24px] font-bold ${onProductsPage ? "text-brand" : "text-white"}`}
                >
                  Products
                </Link>
                <button
                  type="button"
                  onClick={() => setProductsOpen((value) => !value)}
                  aria-expanded={productsOpen}
                  aria-label={productsOpen ? "Hide products" : "Show products"}
                  tabIndex={open ? 0 : -1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white transition-colors hover:text-brand"
                >
                  <ChevronDown
                    aria-hidden
                    className={`h-5 w-5 transition-transform duration-300 ${productsOpen ? "rotate-180 text-brand" : ""}`}
                  />
                </button>
              </div>

              {/* Collapsible Mobile Products List */}
              <div
                className={`grid overflow-hidden transition-[max-height,opacity] duration-500 ${
                  productsOpen ? "mt-4 max-h-[380px] overflow-y-auto pr-1 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-1 rounded-2xl bg-white/[0.03] p-2 border border-white/10">
                  {products.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/products/${item.slug}`}
                      prefetch={true}
                      tabIndex={open && productsOpen ? 0 : -1}
                      onMouseEnter={() => {
                        try {
                          router.prefetch(`/products/${item.slug}`);
                        } catch {}
                      }}
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                          e.preventDefault();
                          handleProductNavigate(item.slug);
                        }
                      }}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] text-white/80 transition-all hover:bg-brand/15 hover:text-white cursor-pointer"
                    >
                      <span className="truncate pr-2 font-semibold">
                        {item.name}
                      </span>
                      <span className="shrink-0 font-mono text-[12px] font-medium text-brand">
                        {item.codes.plain}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/process"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-4 transition-colors hover:text-brand"
            >
              <span className={`font-display text-[22px] sm:text-[24px] font-bold ${pathname === "/process" ? "text-brand" : "text-white"}`}>
                Process
              </span>
              <span className="font-mono text-[11px] font-bold tracking-wider text-slate-400">03 //</span>
            </Link>

            <Link
              href="/technologies"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-4 transition-colors hover:text-brand"
            >
              <span className={`font-display text-[22px] sm:text-[24px] font-bold ${pathname === "/technologies" ? "text-brand" : "text-white"}`}>
                Technologies
              </span>
              <span className="font-mono text-[11px] font-bold tracking-wider text-slate-400">04 //</span>
            </Link>

            <Link
              href="/contact"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-4 transition-colors hover:text-white"
            >
              <span
                className={`font-display text-[22px] sm:text-[24px] font-bold ${
                  pathname === "/contact"
                    ? "text-white underline decoration-white decoration-2 underline-offset-8"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Contact
              </span>
              <span
                className={`font-mono text-[11px] font-bold tracking-wider ${
                  pathname === "/contact" ? "text-white" : "text-slate-400"
                }`}
              >
                05 //
              </span>
            </Link>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="flex items-center justify-between border-b border-white/10 py-4 text-white transition-colors hover:text-brand"
            >
              <span className="font-display text-[22px] sm:text-[24px] font-bold">Catalogue</span>
              <ArrowUpRight
                aria-hidden
                className={`h-5 w-5 ${pathname === "/contact" ? "text-white" : "text-brand"}`}
              />
            </a>
          </nav>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full rounded-xl shadow-[0_4px_20px_rgba(0,102,204,0.35)]"
              withArrow
              onClick={() => setOpen(false)}
            >
              Send an enquiry
            </Button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[12.5px] text-slate-400 pt-1">
              <span>{site.contact.phone ?? "Phone to be supplied"}</span>
              <span className="text-brand font-medium">sales@asircontainers.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
