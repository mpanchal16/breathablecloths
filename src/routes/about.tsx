import { createFileRoute } from "@tanstack/react-router";
import yogaImg from "@/assets/yoga.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — LinenCotton Yoga Co." },
      {
        name: "description",
        content:
          "Behind LinenCotton Yoga Co.: a small studio making considered yoga and sleepwear in organic fabrics.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground">Journal</p>
      <h1 className="font-display text-5xl md:text-6xl mt-3">A small studio, soft hours.</h1>

      <div className="grid md:grid-cols-2 gap-12 mt-12 items-start">
        <img
          src={yogaImg}
          alt="Studio"
          loading="lazy"
          className="rounded-sm aspect-[4/5] object-cover"
        />
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            LinenCotton Yoga Co. began on a quiet morning in a sunlit kitchen, with a question: what
            would the perfect set look like — for the long stretch on the mat, and the slow hour
            before sleep?
          </p>
          <p>
            Every piece is cut from organic linen and long-staple cotton, dyed with low-impact
            pigments, and finished by a small team in Porto. We make in small runs so nothing is
            wasted, and we&apos;d rather a piece live with you for a decade than a season.
          </p>
          <p>
            Thank you for being here. We hope these clothes hold the shape of your softest hours.
          </p>
          <p className="font-display text-foreground text-2xl pt-4">— Aria, founder</p>
        </div>
      </div>
    </div>
  );
}
