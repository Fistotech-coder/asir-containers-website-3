import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  applicationsFor,
  productDisplayName,
  lidsFor,
  type Product,
} from "@/data/products";

type ProductCardProps = {
  product: Product;
  index?: number;
  priority?: boolean;
  aspect?: "square" | "video" | "wide" | "compact";
};

export function ProductCard({
  product,
  index = 0,
  priority = false,
  aspect = "square",
}: ProductCardProps) {
  const productApplications = applicationsFor(product);
  const lids = lidsFor(product);

  const lidOptions =
    product.lids && product.lids.length > 0
      ? product.locks && product.locks.length > 0
        ? `${product.lids.join(", ")}, ${product.locks.join(", ")}`
        : product.lids.join(", ")
      : "Flat lid, outer lid";

  const appsText =
    productApplications.length > 0
      ? productApplications.map((app) => app.name).join(", ")
      : "Paint, Agro, Food";

  return (
    <article
      className="group relative flex flex-col h-full pt-8 sm:pt-9 xl:pt-10 transition-all duration-300"
      data-card
    >
      <Link
        href={`/products/${product.slug}`}
        prefetch={true}
        className="absolute inset-0 z-30"
        aria-label={`View ${productDisplayName(product)}`}
      />

      {/* Main Card Container: Exactly even height across all cards, soft powder blue -> deep brand blue on hover */}
      <div
        className="relative w-full h-full rounded-[24px] sm:rounded-[28px] px-4 sm:px-5 pb-4 sm:pb-5 pt-[104px] sm:pt-[114px] xl:pt-[118px] bg-[#cde2fd] group-hover:bg-[#196e98] border border-[#b8d6fa]/70 group-hover:border-[#13597d] flex flex-col justify-between shadow-xs transition-all duration-400 ease-out group-hover:shadow-[0_24px_45px_rgba(25,110,152,0.32)] group-hover:-translate-y-2"
      >
        {/* Floating Product Image - Shifted down into card to reduce empty space */}
        <div
          className="absolute -top-7 sm:-top-8 xl:-top-9 w-32 sm:w-36 xl:w-38 h-32 sm:h-36 xl:h-38 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none"
        >
          <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-108 group-hover:-translate-y-2">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-contain object-bottom drop-shadow-[0_12px_20px_rgba(0,35,90,0.15)] group-hover:drop-shadow-[0_16px_28px_rgba(0,0,0,0.3)] transition-all duration-500"
            />
          </div>
        </div>

        {/* Content Section: Flex column filling equal height */}
        <div className="flex flex-col flex-1 justify-between">
          <div>
            {/* Title & Code - Fixed consistent height so 1-line and 2-line titles align identically */}
            <div className="text-center px-1 min-h-[38px] sm:min-h-[42px] flex items-center justify-center">
              <h3
                className="font-display text-[13.5px] sm:text-[14.5px] xl:text-[15px] font-bold text-[#1a6b96] group-hover:text-white tracking-tight leading-snug transition-colors duration-300"
              >
                {product.name.toUpperCase()}{" "}
                <span
                  className="font-semibold text-[#1a6b96]/85 group-hover:text-blue-100 text-[11px] sm:text-[11.5px] xl:text-[12px] lowercase transition-colors duration-300"
                >
                  ({product.codes.plain})
                </span>
              </h3>
            </div>

            {/* Subtle Divider Hairline */}
            <div className="w-full max-w-[160px] sm:max-w-[190px] mx-auto my-1.5 sm:my-2 border-b border-[#badbf7] group-hover:border-white/20 transition-colors duration-300" />

            {/* Spec Rows (Lid Options & Applications) - Equal height alignment */}
            <div className="space-y-1.5 my-1 px-0.5 min-h-[40px] sm:min-h-[44px] flex flex-col justify-center">
              <div className="flex items-start justify-between gap-2 text-[11.5px] sm:text-[12px]">
                <span className="font-semibold text-[#1a6b96] group-hover:text-blue-100 shrink-0 transition-colors duration-300">Lid Options</span>
                <span className="font-bold text-slate-900 group-hover:text-white text-right line-clamp-1 transition-colors duration-300">
                  {lidOptions}
                </span>
              </div>
              <div className="flex items-start justify-between gap-2 text-[11.5px] sm:text-[12px]">
                <span className="font-semibold text-[#1a6b96] group-hover:text-blue-100 shrink-0 transition-colors duration-300">Applications</span>
                <span className="font-bold text-slate-900 group-hover:text-white text-right line-clamp-1 transition-colors duration-300">
                  {appsText}
                </span>
              </div>
            </div>
          </div>

          {/* View Details Action Button - Aligns at the exact same bottom position on all cards */}
          <div className="mt-auto pt-2.5">
            <div className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3 rounded-xl bg-[#196e98] text-white font-semibold text-[12.5px] sm:text-[13px] shadow-xs transition-all duration-300 group-hover:bg-white group-hover:text-[#196e98] group-hover:shadow-md">
              <span>View details</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
