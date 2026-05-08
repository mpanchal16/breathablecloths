import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { z } from "zod";
import { storefrontApiRequest, PRODUCTS_QUERY, FABRIC_FILTER, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const searchSchema = z.object({
  category: z.enum(["yoga", "sleep", "all"]).optional(),
  size: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — LinenCotton Yoga Co." },
      { name: "description", content: "Browse yoga and sleepwear in soft naturals. Filter by category and size." },
    ],
  }),
  component: Shop,
});

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

function Shop() {
  const { category = "all", size } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(size);

  const { data, isLoading } = useQuery({
    queryKey: ["products", "all", "cotton-linen"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 50, query: FABRIC_FILTER });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((p) => {
      const node = p.node;
      // Category filter
      if (category && category !== "all") {
        const haystack = `${node.productType ?? ""} ${(node.tags ?? []).join(" ")} ${node.title}`.toLowerCase();
        const match = category === "yoga"
          ? /yoga|move|active|legging|sport/.test(haystack)
          : /sleep|night|pajama|pyjama|robe|loung/.test(haystack);
        if (!match) return false;
      }
      // Size filter
      if (selectedSize) {
        const hasSize = node.variants.edges.some((v) =>
          v.node.selectedOptions.some(
            (o) => o.name.toLowerCase() === "size" && o.value.toUpperCase() === selectedSize
          )
        );
        if (!hasSize) return false;
      }
      return true;
    });
  }, [data, category, selectedSize]);

  return (
    <div className="container mx-auto px-6 py-16">
      <header className="mb-12">
        <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground">The Shop</p>
        <h1 className="font-display text-5xl mt-3">
          {category === "yoga" ? "Yoga" : category === "sleep" ? "Sleepwear" : "All pieces"}
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="space-y-8 sticky top-24">
            <div>
              <h3 className="text-xs uppercase tracking-widest mb-3">Category</h3>
              <ul className="space-y-2 text-sm">
                {(["all", "yoga", "sleep"] as const).map((c) => (
                  <li key={c}>
                    <Link
                      to="/shop"
                      search={{ category: c, size: selectedSize }}
                      className={category === c ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}
                    >
                      {c === "all" ? "All" : c === "yoga" ? "Yoga" : "Sleepwear"}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      const next = selectedSize === s ? undefined : s;
                      setSelectedSize(next);
                      navigate({ search: { category, size: next } });
                    }}
                    className={`h-9 w-9 text-xs border rounded-sm transition-colors ${
                      selectedSize === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <button
                  onClick={() => { setSelectedSize(undefined); navigate({ search: { category } }); }}
                  className="text-xs underline underline-offset-4 mt-3 text-muted-foreground"
                >
                  Clear size
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-secondary animate-pulse rounded-sm" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border rounded-sm">
              <p className="font-display text-2xl">No products found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters, or check back soon.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/shop" search={{ category: "all" }}>View all</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((p) => <ProductCard key={p.node.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
