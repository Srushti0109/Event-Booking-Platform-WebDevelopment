import { Shield, Sparkles, Ticket, Zap } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";

const features = [
  {
    icon: Sparkles,
    title: "Curated for Tech",
    description:
      "Every listing is vetted for quality — AI summits, dev tools conferences, and founder events worth your calendar.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description:
      "Reserve your seat in under 60 seconds. Transparent pricing, real-time availability, zero friction.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Bookings stored locally on your device. No account walls, no hidden fees — just a clean experience.",
  },
  {
    icon: Ticket,
    title: "Live Availability",
    description:
      "Real-time ticket counts and low-stock alerts so you never miss the events that matter.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="py-20 sm:py-28"
      aria-labelledby="why-us-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
            Why TechVerse
          </p>
          <h2 id="why-us-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built Like a Premium SaaS Product
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Designed with the polish of Stripe, Linear, and Vercel — for people who care about craft.
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group rounded-2xl border bg-card p-6 h-full card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-0.5">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
