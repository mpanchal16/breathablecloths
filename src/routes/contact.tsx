import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Clock, Instagram } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LinenCotton Yoga Co." },
      {
        name: "description",
        content:
          "Get in touch with the LinenCotton Yoga Co. studio. Email, address, hours, and a contact form.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent", { description: "We'll be in touch within 1–2 business days." });
    }, 700);
  };

  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl">
      <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground">Contact</p>
      <h1 className="font-display text-5xl md:text-6xl mt-3">Say hello.</h1>
      <p className="text-muted-foreground mt-4 max-w-xl">
        Questions about sizing, an order, or wholesale? Write to us — a real person will reply.
      </p>

      <div className="grid md:grid-cols-2 gap-12 mt-14">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required className="mt-2" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required rows={6} className="mt-2" />
          </div>
          <Button type="submit" size="lg" disabled={sending}>
            {sending ? "Sending…" : "Send message"}
          </Button>
        </form>

        <aside className="space-y-6">
          <div className="bg-secondary/60 p-8 rounded-sm space-y-5 text-sm">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <a
                  href="mailto:hello@linencottonyoga.co"
                  className="text-muted-foreground hover:text-foreground"
                >
                  hello@linencottonyoga.co
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Studio</p>
                <p className="text-muted-foreground">
                  Rua das Flores 42
                  <br />
                  4050-262 Porto, Portugal
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Hours</p>
                <p className="text-muted-foreground">Mon–Fri · 9:00–17:00 WET</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Instagram className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Social</p>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  @linencottonyoga
                </a>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            For order-specific questions, please include your order number.
          </p>
        </aside>
      </div>
    </div>
  );
}
