export function ProductCardSkeleton() {
  return (
    <article
      className="relative flex flex-col h-full pt-8 sm:pt-9 xl:pt-10"
      aria-hidden="true"
    >
      {/* Main Card Container: Exact dimensions and shape matching real card */}
      <div className="relative w-full h-full rounded-[24px] sm:rounded-[28px] px-4 sm:px-5 pb-4 sm:pb-5 pt-[104px] sm:pt-[114px] xl:pt-[118px] bg-[#cde2fd]/50 border border-[#b8d6fa]/60 flex flex-col justify-between shadow-xs overflow-hidden animate-pulse">
        {/* Shimmer overlay */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Floating Top Product Pail Placeholder */}
        <div className="absolute -top-7 sm:-top-8 xl:-top-9 w-32 sm:w-36 xl:w-38 h-32 sm:h-36 xl:h-38 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none">
          <div className="relative w-full h-full rounded-full bg-white/70 border border-white/80 shadow-xs flex items-center justify-center">
            {/* Subtle pail silhouette */}
            <div className="w-16 sm:w-20 h-20 sm:h-24 rounded-b-2xl rounded-t-sm bg-[#1a6b96]/15 border-t-2 border-[#1a6b96]/20" />
          </div>
        </div>

        {/* Content Section: Title, Specs, Button */}
        <div className="flex flex-col flex-1 justify-between">
          <div>
            {/* Title & Code Placeholder */}
            <div className="text-center px-1 min-h-[38px] sm:min-h-[42px] flex flex-col items-center justify-center gap-1.5">
              <div className="h-4 w-28 sm:w-36 rounded-md bg-[#1a6b96]/25" />
              <div className="h-3 w-16 rounded-md bg-[#1a6b96]/15" />
            </div>

            {/* Subtle Divider Hairline */}
            <div className="w-full max-w-[160px] sm:max-w-[190px] mx-auto my-1.5 sm:my-2 border-b border-[#badbf7]/70" />

            {/* Spec Rows Placeholder (Lid Options & Applications) */}
            <div className="space-y-2 my-1 px-0.5 min-h-[40px] sm:min-h-[44px] flex flex-col justify-center">
              <div className="flex items-center justify-between gap-2">
                <div className="h-3 w-16 rounded bg-[#1a6b96]/20" />
                <div className="h-3 w-24 rounded bg-slate-900/15" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="h-3 w-18 rounded bg-[#1a6b96]/20" />
                <div className="h-3 w-28 rounded bg-slate-900/15" />
              </div>
            </div>
          </div>

          {/* Button Placeholder */}
          <div className="mt-auto pt-2.5">
            <div className="w-full h-9 sm:h-10 rounded-xl bg-[#196e98]/30 flex items-center justify-center gap-2">
              <div className="h-3 w-20 rounded bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

