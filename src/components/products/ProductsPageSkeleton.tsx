import { ProductsGridSkeleton } from "./ProductsGridSkeleton";

export function ProductsPageSkeleton() {
  return (
    <div className="bg-white pb-24" aria-busy="true" aria-label="Loading products catalog">
      {/* Page Masthead Skeleton */}
      <div className="border-b border-line bg-soft/40 py-8 sm:py-10">
        <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-3 w-20 rounded bg-slate-200 animate-pulse mb-2" />
            <div className="h-8 sm:h-9 w-48 sm:w-60 rounded-lg bg-slate-300/80 animate-pulse" />
          </div>
          {/* Search bar placeholder */}
          <div className="w-full max-w-md sm:ml-auto">
            <div className="h-11 w-full rounded-xl bg-slate-200/80 border border-slate-300/60 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left filter rail skeleton (Desktop) */}
          <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
            <div className="space-y-6 border-r border-line/60 pb-8 pr-6 animate-pulse">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="h-5 w-24 rounded bg-slate-200" />
                <div className="h-4 w-16 rounded bg-slate-200" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="space-y-2 pl-1">
                  <div className="h-8 w-full rounded-lg bg-slate-100 border border-slate-200/60" />
                  <div className="h-8 w-full rounded-lg bg-slate-100 border border-slate-200/60" />
                  <div className="h-8 w-full rounded-lg bg-slate-100 border border-slate-200/60" />
                  <div className="h-8 w-full rounded-lg bg-slate-100 border border-slate-200/60" />
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-line/60">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="space-y-2 pl-1">
                  <div className="h-7 w-3/4 rounded bg-slate-100" />
                  <div className="h-7 w-2/3 rounded bg-slate-100" />
                  <div className="h-7 w-4/5 rounded bg-slate-100" />
                </div>
              </div>
            </div>
          </aside>

          {/* Right Product Grid Skeleton */}
          <div className="lg:col-span-8 lg:min-h-[80vh] xl:col-span-9">
            {/* Mobile filter bar skeleton */}
            <div className="flex items-center justify-between border-b border-line pb-4 lg:hidden animate-pulse">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="h-8 w-20 rounded-lg bg-slate-200" />
            </div>

            {/* 8 Product Card Skeletons matching exact grid layout */}
            <ProductsGridSkeleton count={8} />
          </div>
        </div>
      </div>
    </div>
  );
}

