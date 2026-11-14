"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, ChevronDown, ChevronRight, Cog, LayoutGrid, Menu, Snowflake, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navigation, site } from "@/data/site";
import { products } from "@/data/products";

// Product display configuration matching reference card design
const navProductItems = [
  { slug: "500ml-paint-pail-p2", title: "500ml", code: "P/2", img: "/images/products/product-images/500ml.webp" },
  { slug: "1l-paint-pail-p1a", title: "1 Litre", code: "P1a", img: "/images/products/product-images/1ltr.webp" },
  { slug: "1l-paint-pail-p1b", title: "1 Litre", code: "P1b", img: "/images/products/product-images/1ltr.webp" },
  { slug: "4l-paint-pail-p4", title: "4 Litre", code: "P4", img: "/images/products/product-images/4ltr.webp" },
  { slug: "10l-paint-pail-p10", title: "10 Litre", code: "P10p", img: "/images/products/product-images/10ltr.webp" },
  { slug: "20l-paint-pail-p20a", title: "20 Litre", code: "P20ap", img: "/images/products/product-images/20Ltr.webp" },
  { slug: "20l-paint-pail-p20b", title: "20 Litre", code: "P20bp", img: "/images/products/product-images/20Ltr.webp" },
  { slug: "1kg-storage-pail-k1", title: "1 Kg", code: "K1", img: "/images/products/product-images/1kg.webp" },
  { slug: "2kg-storage-pail-k2", title: "2 Kg", code: "K2", img: "/images/products/product-images/2kg.webp" },
  { slug: "5kg-storage-pail-k5", title: "5 Kg", code: "K5", img: "/images/products/product-images/5kg.webp" },
  { slug: "10kg-storage-pail-k10", title: "10 Kg", code: "K10p", img: "/images/products/product-images/10kg.webp" },
  { slug: "20kg-storage-pail-k20", title: "20 Kg", code: "K20p", img: "/images/products/product-images/20kg.webp" },
  { slug: "5l-round-pail-a5", title: "5 litre round", code: "A5", img: "/images/products/product-images/5ltr.webp" },
  { slug: "5l-square-interlock-pail-f5", title: "5 Litre square", code: "F5p", img: "/images/products/product-images/5kgsquare.webp" },
  { slug: "17l-square-interlock-pail-f17i", title: "17 Litre interlock", code: "F17ip", img: "/images/products/product-images/17kgsquare.webp" },
  { slug: "17l-square-outer-lock-pail-f17o", title: "17 Litre outer lock", code: "F17op", img: "/images/products/product-images/17kgsquaarelock.webp" },
  { slug: "15l-square-interlock-pail-f15", title: "15 Litre Interlock", code: "F15p", img: "/images/products/product-images/15ltr.webp" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [machineriesOpen, setMachineriesOpen] = useState(false);
  const [mobileMachineriesOpen, setMobileMachineriesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const machineriesCloseTimer = useRef<number | null>(null);
  const productsNavRef = useRef<HTMLDivElement | null>(null);
  const machineriesNavRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const machineriesDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close all open dropdowns/drawers cleanly
  const closeAllMenus = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (machineriesCloseTimer.current) window.clearTimeout(machineriesCloseTimer.current);
    setProductsOpen(false);
    setMachineriesOpen(false);
    setOpen(false);
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
    setMachineriesOpen(false);
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
    if (!productsOpen && !machineriesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (productsNavRef.current?.contains(target) || modalRef.current?.contains(target)) {
        return;
      }
      if (machineriesNavRef.current?.contains(target) || machineriesDropdownRef.current?.contains(target)) {
        return;
      }
      setProductsOpen(false);
      setMachineriesOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProductsOpen(false);
        setMachineriesOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [productsOpen, machineriesOpen]);

  const hoverOpen = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (machineriesCloseTimer.current) window.clearTimeout(machineriesCloseTimer.current);
    setMachineriesOpen(false);
    setProductsOpen(true);
  };

  const hoverClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setProductsOpen(false), 180);
  };

  const hoverMachineriesOpen = () => {
    if (machineriesCloseTimer.current) window.clearTimeout(machineriesCloseTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setProductsOpen(false);
    setMachineriesOpen(true);
    try {
      router.prefetch("/machineries/production-machineries");
      router.prefetch("/machineries/auxiliaries");
    } catch {}
  };

  const hoverMachineriesClose = () => {
    if (machineriesCloseTimer.current) window.clearTimeout(machineriesCloseTimer.current);
    machineriesCloseTimer.current = window.setTimeout(() => setMachineriesOpen(false), 180);
  };

  /* Transparent nav on /contact before scroll */
  const isTransparentNav = pathname === "/contact" && !scrolled && !open;
  const onMachineriesPage = pathname.startsWith("/machineries") || pathname === "/technologies";
  const overLightHero =
    (pathname === "/" || pathname === "/process" || pathname === "/technologies" || pathname.startsWith("/machineries")) &&
    !scrolled &&
    !open;
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
            {navigation.map((item) => {
              if (item.label === "Products") {
                return (
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
                        prefetch={true}
                        onClick={closeAllMenus}
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
                          className={`h-3.5 w-3.5 transition-transform duration-300 stroke-2 ${
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
                );
              }

              if (item.label === "Machineries") {
                return (
                  <div
                    key={item.href}
                    ref={machineriesNavRef}
                    className="relative flex items-center"
                    onMouseEnter={hoverMachineriesOpen}
                    onMouseLeave={hoverMachineriesClose}
                  >
                    <button
                      type="button"
                      aria-expanded={machineriesOpen}
                      aria-controls="machineries-menu"
                      aria-label={machineriesOpen ? "Close machineries menu" : "Open machineries menu"}
                      onClick={() => {
                        setProductsOpen(false);
                        setMachineriesOpen((value) => !value);
                      }}
                      className={`link-rule flex items-center gap-1 text-[15px] xl:text-[15.5px] font-semibold tracking-tight transition-colors duration-200 cursor-pointer ${linkTone} ${
                        onMachineriesPage ? activeLinkClass : ""
                      }`}
                      data-active={onMachineriesPage}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        aria-hidden
                        className={`h-3.5 w-3.5 transition-transform duration-300 stroke-2 ${
                          machineriesOpen
                            ? isTransparentNav
                              ? "rotate-180 text-white"
                              : "rotate-180 text-brand"
                            : ""
                        }`}
                      />
                    </button>

                    {/* Desktop Machineries Floating Dropdown */}
                    <div
                      id="machineries-menu"
                      ref={machineriesDropdownRef}
                      aria-hidden={!machineriesOpen}
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[330px] transition-all duration-200 ${
                        machineriesOpen
                          ? "visible opacity-100 translate-y-0 pointer-events-auto"
                          : "invisible opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2 shadow-[0_20px_45px_-12px_rgba(0,35,90,0.18)]">
                        <Link
                          href="/machineries/production-machineries"
                          prefetch={true}
                          tabIndex={machineriesOpen ? 0 : -1}
                          onClick={closeAllMenus}
                          className="group relative z-10 flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-[#0066cc]/[0.08]"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white transition-colors duration-200">
                            <Cog className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" strokeWidth={2} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-display text-[14.5px] font-bold text-slate-900 group-hover:text-[#0066cc] transition-colors">
                                Production machineries
                              </span>
                              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0066cc] group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">
                              Screen Printing, HTL, Inmould labeling
                            </p>
                          </div>
                        </Link>

                        <div className="h-px bg-slate-100 my-1 mx-2" />

                        <Link
                          href="/machineries/auxiliaries"
                          prefetch={true}
                          tabIndex={machineriesOpen ? 0 : -1}
                          onClick={closeAllMenus}
                          className="group relative z-10 flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-[#0066cc]/[0.08]"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 group-hover:bg-[#0066cc] group-hover:text-white transition-colors duration-200">
                            <Snowflake className="h-5 w-5" strokeWidth={2} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-display text-[14.5px] font-bold text-slate-900 group-hover:text-[#0066cc] transition-colors">
                                Auxiliaries
                              </span>
                              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0066cc] group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">
                              Chiller 1, Chiller 2 & plant systems
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  data-active={isActive(item.href)}
                  onMouseEnter={() => {
                    setProductsOpen(false);
                    setMachineriesOpen(false);
                  }}
                  onClick={closeAllMenus}
                  className={`link-rule text-[15px] xl:text-[15.5px] font-semibold tracking-tight transition-colors duration-200 ${linkTone} ${
                    isActive(item.href) ? activeLinkClass : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
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
            </div>

            {/* Responsive grid matching user reference UI */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 lg:gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {navProductItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  prefetch={true}
                  tabIndex={productsOpen ? 0 : -1}
                  onClick={closeAllMenus}
                  className="group relative flex h-[62px] items-center justify-between rounded-2xl border border-slate-200/70 bg-white px-3 py-2 transition-all duration-200 hover:border-brand hover:bg-brand hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-1">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition-colors duration-200 group-hover:bg-white/20">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={44}
                        height={44}
                        className="max-h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-display text-[13.5px] font-bold leading-tight text-slate-900 group-hover:text-white transition-colors duration-200 truncate">
                        {item.title}
                      </span>
                      <span className="text-[11.5px] font-normal text-slate-400 group-hover:text-white/80 transition-colors duration-200 mt-0.5">
                        Code : {item.code}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-white group-hover:text-brand group-hover:translate-x-0.5">
                    <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Backdrop Scrim */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile & Tablet Popup Menu (Floating dialog card, perfectly responsive) */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        data-lenis-prevent
        className={`fixed z-50 transition-all duration-300 ease-out lg:hidden ${
          scrolled ? "top-[70px] sm:top-[76px]" : "top-[80px] sm:top-[88px]"
        } inset-x-3 sm:inset-x-auto sm:right-6 sm:w-[460px] max-w-[calc(100vw-1.5rem)] ${
          open
            ? "visible opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "invisible opacity-0 -translate-y-3 scale-[0.97] pointer-events-none"
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-slate-950/95 p-4 sm:p-5 shadow-[0_24px_60px_-10px_rgba(0,10,35,0.7),0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl max-h-[calc(100dvh-95px)] sm:max-h-[calc(100dvh-110px)] overflow-y-auto overscroll-contain">
          {/* Popup top indicator bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
              <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-slate-400">
                Menu // Navigation
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Links with Architectural 01 // format */}
          <nav aria-label="Mobile" className="py-2">
            <Link
              href="/"
              prefetch={true}
              tabIndex={open ? 0 : -1}
              onClick={closeAllMenus}
              className="flex items-center justify-between border-b border-white/10 py-3 transition-colors hover:text-brand"
            >
              <span className={`font-display text-[17px] sm:text-[18.5px] font-bold ${pathname === "/" ? "text-brand" : "text-white"}`}>
                Home
              </span>
              <span className="font-mono text-[11px] font-bold tracking-wider text-brand">01 //</span>
            </Link>

            <div className="border-b border-white/10 py-3">
              <div className="flex items-center justify-between">
                <Link
                  href="/products"
                  prefetch={true}
                  tabIndex={open ? 0 : -1}
                  onClick={closeAllMenus}
                  className={`font-display text-[17px] sm:text-[18.5px] font-bold ${onProductsPage ? "text-brand" : "text-white"}`}
                >
                  Products
                </Link>
                <button
                  type="button"
                  onClick={() => setProductsOpen((value) => !value)}
                  aria-expanded={productsOpen}
                  aria-label={productsOpen ? "Hide products" : "Show products"}
                  tabIndex={open ? 0 : -1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white transition-colors hover:text-brand"
                >
                  <ChevronDown
                    aria-hidden
                    className={`h-4 w-4 transition-transform duration-300 ${productsOpen ? "rotate-180 text-brand" : ""}`}
                  />
                </button>
              </div>

              {/* Collapsible Mobile Products List */}
              <div
                className={`grid overflow-hidden transition-[max-height,opacity] duration-300 ${
                  productsOpen ? "mt-3 max-h-[260px] overflow-y-auto pr-1 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-1 rounded-xl bg-white/[0.04] p-2 border border-white/10">
                  {products.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/products/${item.slug}`}
                      prefetch={true}
                      tabIndex={open && productsOpen ? 0 : -1}
                      onClick={closeAllMenus}
                      className="flex items-center justify-between rounded-lg px-2.5 py-2 text-[13px] text-white/85 transition-all hover:bg-brand/20 hover:text-white cursor-pointer"
                    >
                      <span className="truncate pr-2 font-medium">
                        {item.name}
                      </span>
                      <span className="shrink-0 font-mono text-[11px] font-bold text-brand">
                        {item.codes.plain}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/process"
              prefetch={true}
              tabIndex={open ? 0 : -1}
              onClick={closeAllMenus}
              className="flex items-center justify-between border-b border-white/10 py-3 transition-colors hover:text-brand"
            >
              <span className={`font-display text-[17px] sm:text-[18.5px] font-bold ${pathname === "/process" ? "text-brand" : "text-white"}`}>
                Process
              </span>
              <span className="font-mono text-[11px] font-bold tracking-wider text-slate-400">03 //</span>
            </Link>

            {/* Mobile Machineries Accordion */}
            <div className="border-b border-white/10 py-3">
              <button
                type="button"
                onClick={() => setMobileMachineriesOpen((value) => !value)}
                aria-expanded={mobileMachineriesOpen}
                aria-label={mobileMachineriesOpen ? "Hide machineries" : "Show machineries"}
                tabIndex={open ? 0 : -1}
                className="flex w-full items-center justify-between text-left cursor-pointer"
              >
                <span className={`font-display text-[17px] sm:text-[18.5px] font-bold ${onMachineriesPage ? "text-brand" : "text-white"}`}>
                  Machineries
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white transition-colors hover:text-brand">
                  <ChevronDown
                    aria-hidden
                    className={`h-4 w-4 transition-transform duration-300 ${mobileMachineriesOpen ? "rotate-180 text-brand" : ""}`}
                  />
                </div>
              </button>

              {/* Collapsible Mobile Machineries List */}
              <div
                className={`grid overflow-hidden transition-[max-height,opacity] duration-300 ${
                  mobileMachineriesOpen ? "mt-3 max-h-[160px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-1.5 rounded-xl bg-white/[0.04] p-2 border border-white/10">
                  <Link
                    href="/machineries/production-machineries"
                    prefetch={true}
                    tabIndex={open && mobileMachineriesOpen ? 0 : -1}
                    onClick={closeAllMenus}
                    className="flex items-center justify-between rounded-lg px-2.5 py-2 text-[13.5px] text-white/90 transition-all hover:bg-brand/20 hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Cog className="h-4 w-4 text-brand" />
                      <span className="font-medium">Production machineries</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-brand" />
                  </Link>

                  <Link
                    href="/machineries/auxiliaries"
                    prefetch={true}
                    tabIndex={open && mobileMachineriesOpen ? 0 : -1}
                    onClick={closeAllMenus}
                    className="flex items-center justify-between rounded-lg px-2.5 py-2 text-[13.5px] text-white/90 transition-all hover:bg-brand/20 hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Snowflake className="h-4 w-4 text-sky-400" />
                      <span className="font-medium">Auxiliaries</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-brand" />
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              prefetch={true}
              tabIndex={open ? 0 : -1}
              onClick={closeAllMenus}
              className="flex items-center justify-between border-b border-white/10 py-3 transition-colors hover:text-white"
            >
              <span
                className={`font-display text-[17px] sm:text-[18.5px] font-bold ${
                  pathname === "/contact"
                    ? "text-brand underline decoration-brand decoration-2 underline-offset-4"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Contact
              </span>
              <span
                className={`font-mono text-[11px] font-bold tracking-wider ${
                  pathname === "/contact" ? "text-brand" : "text-slate-400"
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
              className="flex items-center justify-between border-b border-white/10 py-3 text-white transition-colors hover:text-brand"
            >
              <span className="font-display text-[17px] sm:text-[18.5px] font-bold">Catalogue</span>
              <ArrowUpRight
                aria-hidden
                className="h-4.5 w-4.5 text-brand"
              />
            </a>
          </nav>

          <div className="space-y-3 pt-3.5 border-t border-white/10">
            <Button
              href="/contact"
              prefetch={true}
              variant="primary"
              size="md"
              className="w-full rounded-xl py-2.5 text-[14.5px] font-bold shadow-[0_4px_16px_rgba(0,102,204,0.35)]"
              withArrow
              onClick={closeAllMenus}
            >
              Send an enquiry
            </Button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11.5px] text-slate-400 pt-0.5 px-0.5">
              <span>{site.contact.phone ?? "Phone to be supplied"}</span>
              <span className="text-brand font-medium">sales@asircontainers.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
