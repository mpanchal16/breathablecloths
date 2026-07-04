import { Link } from "@tanstack/react-router";
import type { ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const img = p.images.edges[0]?.node;
  const price = p.priceRange.minVariantPrice;
  return (
    <Link to="/product/$handle" params={{ handle: p.handle }} className="group block">
      <div className="aspect-[4/5] overflow-hidden bg-secondary rounded-sm">
        {img ? (
          <img
            src={img.url}
            alt={img.altText ?? p.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
      </div>
      <div className="pt-4 flex justify-between items-baseline">
        <h3 className="font-display text-xl">{p.title}</h3>
        <p className="text-sm text-muted-foreground">
          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
        </p>
      </div>
      {p.productType && (
        <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
          {p.productType}
        </p>
      )}
    </Link>
  );
}
