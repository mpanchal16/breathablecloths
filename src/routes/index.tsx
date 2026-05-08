import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { storefrontApiRequest, PRODUCTS_QUERY, FABRIC_FILTER, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Clock, Phone } from "lucide-react";
import { toast } from "sonner";
import heroImg from "@/assets/hero.jpg";
import yogaImg from "@/assets/yoga.jpg";
import sleepImg from "@/assets/sleep.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LinenCotton Yoga Co. — Yoga & Sleepwear for Slow Rituals" },
      { name: "description", content: "Considered yoga & sleepwear in soft naturals. Free worldwide shipping over $150." },
    ],
  }),
  component: Index,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
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
              <p className="mt-4 font-display italic text-xl text-foreground/80">
                Pure Comfort for Every Move
              </p>
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

      {/* Why cotton & linen */}
      <section className="bg-cream/60 border-y border-border/60">
        <div className="container mx-auto px-6 py-24 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground">Why we only use</p>
            <h2 className="font-display text-5xl mt-3 leading-[1.05]">
              Cotton<br />&amp; linen.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Synthetics trap heat, hold sweat, and shed microplastics into your skin and the
              ocean. Plant fibres do the opposite — they let your body do what it&apos;s
              designed to do: breathe.
            </p>
          </div>
          <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-10">
            <li>
              <p className="font-display text-3xl text-primary">01</p>
              <h3 className="font-display text-xl mt-2">Breathable by nature</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Linen&apos;s hollow fibres and cotton&apos;s open weave move air constantly, so
                heat and moisture leave the skin instead of pooling against it. You stay cool
                in a flow, warm in stillness.
              </p>
            </li>
            <li>
              <p className="font-display text-3xl text-primary">02</p>
              <h3 className="font-display text-xl mt-2">Thermoregulating</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Both fibres absorb up to 20% of their weight in moisture before feeling damp —
                wicking sweat during practice and keeping your bed cool through the night.
              </p>
            </li>
            <li>
              <p className="font-display text-3xl text-primary">03</p>
              <h3 className="font-display text-xl mt-2">Kind to skin</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Hypoallergenic, naturally antibacterial, and free of the petrochemical
                finishes used on most activewear — gentler for sensitive skin and long hours
                of contact.
              </p>
            </li>
            <li>
              <p className="font-display text-3xl text-primary">04</p>
              <h3 className="font-display text-xl mt-2">A living fibre</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Cotton and linen soften with every wash and biodegrade at the end of their
                life. No microplastics shed into your body, your machine, or the sea.
              </p>
            </li>
            <li>
              <p className="font-display text-3xl text-primary">05</p>
              <h3 className="font-display text-xl mt-2">Better sleep</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Stable skin temperature is one of the strongest signals for deep sleep.
                Linen sleepwear reduces night-time overheating — the most common cause of
                restless sleep.
              </p>
            </li>
            <li>
              <p className="font-display text-3xl text-primary">06</p>
              <h3 className="font-display text-xl mt-2">Made to last</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Linen is among the strongest natural fibres on earth; long-staple cotton, the
                softest. Cared for gently, our pieces are built to be worn for years.
              </p>
            </li>
          </ul>
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
