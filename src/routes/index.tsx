import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, PRODUCTS_QUERY, FABRIC_FILTER, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";
import yogaImg from "@/assets/yoga.jpg";
import sleepImg from "@/assets/sleep.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lila & Linen — Yoga & Sleepwear for Slow Rituals" },
      { name: "description", content: "Considered yoga & sleepwear in soft naturals. Free worldwide shipping over $150." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 4, query: FABRIC_FILTER });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="grid md:grid-cols-2 min-h-[80vh]">
          <div className="flex items-center px-6 md:px-16 py-20 order-2 md:order-1">
            <div className="max-w-md">
              <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground mb-6">
                The Breathable &amp; Lively Line
              </p>
              <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">
                Cloth that<br />
                breathes with you.
              </h1>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Yoga and sleepwear cut only from organic cotton and linen — natural fibres
                that move air, regulate temperature, and let your skin live freely.
              </p>
              <div className="mt-8 flex gap-3">
                <Button asChild size="lg">
                  <Link to="/shop">Shop the collection</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/about">Our story</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 bg-secondary">
            <img
              src={heroImg}
              alt="Woman in sage linen yoga set sitting in soft morning light"
              className="w-full h-full object-cover min-h-[50vh]"
              width={1600}
              height={1280}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/shop" search={{ category: "yoga" }} className="group relative overflow-hidden rounded-sm">
            <img src={yogaImg} alt="Yoga collection" loading="lazy" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-background">
              <p className="uppercase tracking-widest text-xs opacity-80">Move</p>
              <h2 className="font-display text-4xl mt-1">Yoga</h2>
            </div>
          </Link>
          <Link to="/shop" search={{ category: "sleep" }} className="group relative overflow-hidden rounded-sm">
            <img src={sleepImg} alt="Sleepwear collection" loading="lazy" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-background">
              <p className="uppercase tracking-widest text-xs opacity-80">Rest</p>
              <h2 className="font-display text-4xl mt-1">Sleepwear</h2>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-4xl">Quietly new</h2>
          <Link to="/shop" className="text-sm uppercase tracking-widest hover:text-primary">
            View all →
          </Link>
        </div>
        {data && data.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {data.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border rounded-sm">
            <p className="text-muted-foreground">No products yet — your collection will appear here.</p>
          </div>
        )}
      </section>

      {/* Promise */}
      <section className="bg-secondary/60">
        <div className="container mx-auto px-6 py-20 grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="font-display text-2xl">Worldwide shipping</h3>
            <p className="mt-2 text-sm text-muted-foreground">Tracked delivery to over 80 countries. Free over $150.</p>
          </div>
          <div>
            <h3 className="font-display text-2xl">Secure checkout</h3>
            <p className="mt-2 text-sm text-muted-foreground">Pay safely with card, Apple Pay, Google Pay, Shop Pay & more.</p>
          </div>
          <div>
            <h3 className="font-display text-2xl">Made to last</h3>
            <p className="mt-2 text-sm text-muted-foreground">Organic fabrics, gentle stitching, easy 30-day returns.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
