import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, Star, Truck, Shield, Leaf } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return res?.data?.product;
    },
  });

  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [activeImg, setActiveImg] = useState(0);

  const product = data;

  // Initialize default options
  useMemo(() => {
    if (product && Object.keys(selectedOptions).length === 0) {
      const init: Record<string, string> = {};
      product.options.forEach((opt: { name: string; values: string[] }) => {
        init[opt.name] = opt.values[0];
      });
      setSelectedOptions(init);
    }
  }, [product, selectedOptions]);

  const matchedVariant = useMemo(() => {
    if (!product) return null;
    return product.variants.edges.find((v: { node: { selectedOptions: Array<{ name: string; value: string }> } }) =>
      v.node.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
    )?.node;
  }, [product, selectedOptions]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-24 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-4xl">Not found</h1>
        <Link to="/shop" className="mt-4 inline-block underline">Back to shop</Link>
      </div>
    );
  }

  const images = product.images.edges;
  const price = matchedVariant?.price ?? product.priceRange.minVariantPrice;

  const handleAdd = async () => {
    if (!matchedVariant) return;
    await addItem({
      product: { node: product },
      variantId: matchedVariant.id,
      variantTitle: matchedVariant.title,
      price: matchedVariant.price,
      quantity: 1,
      selectedOptions: matchedVariant.selectedOptions,
    });
    toast.success("Added to cart", { description: product.title });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/5] bg-secondary overflow-hidden rounded-sm">
            {images[activeImg] && (
              <img src={images[activeImg].node.url} alt={product.title} className="w-full h-full object-cover" />
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-3">
              {images.map((img: { node: { url: string } }, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden rounded-sm border ${activeImg === i ? "border-primary" : "border-transparent"}`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="md:sticky md:top-24 md:self-start">
          {product.productType && (
            <p className="uppercase tracking-widest text-xs text-muted-foreground">{product.productType}</p>
          )}
          <h1 className="font-display text-4xl md:text-5xl mt-2">{product.title}</h1>
          <p className="mt-4 text-2xl">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </p>

          <div className="mt-6 prose prose-sm text-muted-foreground max-w-none whitespace-pre-line">
            {product.description || "Quietly considered, made to be lived in."}
          </div>

          {/* Options */}
          <div className="mt-8 space-y-6">
            {product.options.map((opt: { name: string; values: string[] }) => (
              <div key={opt.name}>
                <p className="text-xs uppercase tracking-widest mb-2">
                  {opt.name}: <span className="text-foreground">{selectedOptions[opt.name]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map((v) => {
                    const selected = selectedOptions[opt.name] === v;
                    return (
                      <button
                        key={v}
                        onClick={() => setSelectedOptions({ ...selectedOptions, [opt.name]: v })}
                        className={`px-4 h-10 text-sm border rounded-sm transition-colors ${
                          selected ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-foreground"
                        }`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="w-full mt-8"
            onClick={handleAdd}
            disabled={!matchedVariant?.availableForSale || cartLoading}
          >
            {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> :
              !matchedVariant?.availableForSale ? "Sold out" : "Add to cart"}
          </Button>

          <ul className="mt-8 space-y-3 text-sm text-muted-foreground border-t border-border pt-6">
            <li className="flex items-center gap-3"><Truck className="h-4 w-4" /> Worldwide shipping · free over $150</li>
            <li className="flex items-center gap-3"><Shield className="h-4 w-4" /> Secure checkout via Shop Pay</li>
            <li className="flex items-center gap-3"><Leaf className="h-4 w-4" /> Organic, OEKO-TEX certified fabrics</li>
          </ul>
        </div>
      </div>

      {/* Reviews — empty state, no fake content */}
      <section className="mt-24 border-t border-border pt-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="font-display text-3xl">Reviews</h2>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-muted-foreground/40" />
            ))}
          </div>
        </div>
        <p className="text-muted-foreground">No reviews yet. Be the first to share your thoughts after your order arrives.</p>
      </section>
    </div>
  );
}
