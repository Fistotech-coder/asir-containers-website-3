import { ProductCardSkeleton } from "./ProductCardSkeleton";

export type ProductsGridSkeletonProps = {
  count?: number;
};

export function ProductsGridSkeleton({ count = 8 }: ProductsGridSkeletonProps) {
  return (
    <div
      className="mt-6 sm:mt-8 pt-4 sm:pt-6 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-16"
      aria-label="Loading products"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

