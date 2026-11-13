import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  applicationsFor,
  productDisplayName,
  codesFor,
  lidsFor,
  type Product,
} from "@/data/products";

type ProductCardProps = {
  product: Product;
  index?: number;
  priority?: boolean;
  aspect?: "square" | "video" | "wide" | "compact";
};

/**
 * Open product card: image plate, then a single hairline before the metadata so
 * the record reads as one column instead of a stack of loose lines.
 */
export function ProductCard({
  product,
  index = 0,
  priority = false,
  aspect = "square",
}: ProductCardProps) {
  const productApplications = applicationsFor(product);
  const lids = lidsFor(product);

  const aspectClass =
    aspect === "compact"
      ? "aspect-[16/10] max-h-[210px]"
      : aspect === "wide"
        ? "aspect-[16/10]"
        : aspect === "video"
          ? "aspect-[4/3]"
          : "aspect-square";

  return (
    <article className="group relative" data-card>
      <Link
        href={`/products/${product.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`View ${productDisplayName(product)}`}
      />

      <div className={`zoom-plate relative ${aspectClass} overflow-hidden ${aspect === "compact" ? "rounded-[16px]" : "rounded-[20px]"} bg-light`}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 30vw"
          className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className={aspect === "compact" ? "pt-2 pb-0.5" : "pt-3 pb-0.5"}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className={`font-display font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand ${aspect === "compact" ? "text-[14.5px]" : "text-[16px]"}`}>
            {product.name}{" "}
            <span className={`font-mono font-semibold text-brand ${aspect === "compact" ? "text-[12.5px]" : "text-[13.5px]"}`}>
              ({product.codes.plain})
            </span>
          </h3>
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 shrink-0 text-mid/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
          />
        </div>

        <div className={aspect === "compact" ? "mt-2 border-t border-line/80 pt-2" : "mt-2.5 border-t border-line/80 pt-2.5"}>
          <p className={`truncate font-normal leading-relaxed text-mid ${aspect === "compact" ? "text-[12.5px]" : "text-[13.5px]"}`}>
            {lids.join(", ")}
            {product.locks.length > 0 ? ` · ${product.locks.join(", ")}` : ""}
            {" · "}
            {productApplications.map((application) => application.name).join(" · ")}
          </p>
        </div>
      </div>
    </article>
  );
}
