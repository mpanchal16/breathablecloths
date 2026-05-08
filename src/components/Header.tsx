import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl tracking-wide">
          Lila &amp; Linen
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
          <Link to="/shop" activeProps={{ className: "text-primary" }} className="hover:text-primary transition-colors">
            Shop
          </Link>
          <Link to="/shop" search={{ category: "yoga" }} className="hover:text-primary transition-colors">
            Yoga
          </Link>
          <Link to="/shop" search={{ category: "sleep" }} className="hover:text-primary transition-colors">
            Sleep
          </Link>
          <Link to="/about" activeProps={{ className: "text-primary" }} className="hover:text-primary transition-colors">
            Journal
          </Link>
          <Link to="/contact" activeProps={{ className: "text-primary" }} className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-2xl mb-3">Lila &amp; Linen</h3>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Quietly considered yoga &amp; sleepwear for the slow rituals that hold a day together.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="uppercase tracking-widest text-xs text-muted-foreground mb-3">Shop</h4>
          <ul className="space-y-2">
            <li><Link to="/shop">All</Link></li>
            <li><Link to="/shop" search={{ category: "yoga" }}>Yoga</Link></li>
            <li><Link to="/shop" search={{ category: "sleep" }}>Sleepwear</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="uppercase tracking-widest text-xs text-muted-foreground mb-3">Studio</h4>
          <ul className="space-y-2">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li className="text-muted-foreground">Worldwide shipping</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Lila &amp; Linen. Crafted with care.
      </div>
    </footer>
  );
}
