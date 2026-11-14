import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="bg-white pb-20" aria-busy="true" aria-label="Loading product details">
      {/* Top Header & Breadcrumbs Skeleton */}
      <div className="border-b border-line bg-white pt-20 lg:pt-24">
        <div className="shell">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 py-1 animate-pulse">
            <div className="h-4 w-12 rounded bg-slate-200" />
            <span className="text-slate-300">/</span>
            <div className="h-4 w-16 rounded bg-slate-200" />
            <span className="text-slate-300">/</span>
            <div className="h-4 w-20 rounded bg-slate-200" />
          </div>

          {/* Main Two-Column Product Hero Skeleton */}
          <div className="mt-5 grid items-start lg:items-stretch gap-8 pb-10 lg:grid-cols-12 lg:gap-10 lg:pb-12">
            {/* Left Media Card Skeleton */}
            <div className="flex flex-col lg:col-span-5 lg:h-full">
              <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[480px] rounded-3xl bg-[#cde2fd]/50 border border-[#b8d6fa]/60 flex items-center justify-center p-6 shadow-xs overflow-hidden animate-pulse">
                <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                {/* Large pail silhouette */}
                <div className="w-48 sm:w-56 h-60 sm:h-72 rounded-b-3xl rounded-t-sm bg-white/70 shadow-xs border border-white/90 flex flex-col items-center justify-center">
                  <div className="w-3/4 h-2 rounded bg-[#1a6b96]/15 mb-4" />
                  <div className="w-1/2 h-2 rounded bg-[#1a6b96]/10" />
                </div>
              </div>
            </div>

            {/* Right Product Details & Specs Skeleton */}
            <div className="lg:col-span-7 flex flex-col justify-between animate-pulse">
              <div>
                {/* Title and Code Badge */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-9 sm:h-11 w-3/4 rounded-xl bg-slate-200" />
                    <div className="h-4 w-1/3 rounded-md bg-slate-200/80" />
                  </div>
                  {/* Plain code badge skeleton */}
                  <div className="h-14 w-24 rounded-xl border border-line bg-slate-100/80" />
                </div>

                {/* Summary lines */}
                <div className="mt-4 space-y-2 max-w-xl">
                  <div className="h-4 w-full rounded bg-slate-200/80" />
                  <div className="h-4 w-5/6 rounded bg-slate-200/80" />
                </div>

                {/* Specification table rows */}
                <div className="mt-6 sm:mt-7 border-t border-line space-y-0">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-line py-3.5"
                    >
                      <div className="h-4 w-28 sm:w-36 rounded bg-slate-200" />
                      <div className="h-4 w-32 sm:w-44 rounded bg-slate-200/80" />
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="h-11 w-44 rounded-lg bg-[#0066cc]/30" />
                  <div className="h-11 w-36 rounded-lg bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Skeleton Section */}
      <div className="shell mt-14 pt-8 border-t border-line animate-pulse">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-3 w-24 rounded bg-slate-200 mb-2" />
            <div className="h-7 w-64 rounded-lg bg-slate-300/80" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-12 sm:gap-x-6 sm:gap-y-14 xl:gap-x-6 xl:gap-y-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

