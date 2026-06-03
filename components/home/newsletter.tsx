"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/components/motion/fade-in";
import { newsletterSchema, type NewsletterSchema } from "@/lib/validations";
import { subscribeNewsletter } from "@/lib/storage";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (data: NewsletterSchema) => {
    const success = subscribeNewsletter(data.email);
    if (success) {
      setSubmitted(true);
      setAlreadySubscribed(false);
      reset();
    } else {
      setAlreadySubscribed(true);
    }
  };

  return (
    <section
      id="newsletter"
      className="py-20 sm:py-28"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20">
            <div className="absolute inset-0 gradient-bg opacity-95" />
            <div className="absolute inset-0 hero-grid opacity-30" />
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 glow-orb" />

            <div className="relative z-10 px-6 py-14 sm:px-14 sm:py-16 text-center text-primary-foreground">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 mb-6">
                <Mail className="h-7 w-7" aria-hidden="true" />
              </div>
              <h2 id="newsletter-heading" className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
                Stay Ahead of the Curve
              </h2>
              <p className="text-white/80 mb-10 max-w-lg mx-auto text-lg">
                Weekly drops of curated tech events, early-bird access, and exclusive founder invites.
              </p>

              {submitted ? (
                <div className="flex items-center justify-center gap-2 text-white" role="status">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">You&apos;re in. Watch your inbox.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  noValidate
                >
                  <div className="flex-1 text-left">
                    <Label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </Label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="you@company.com"
                      className="bg-white text-foreground border-0 h-12 rounded-xl shadow-lg"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-white/90 mt-1.5 text-left">
                        {errors.email.message}
                      </p>
                    )}
                    {alreadySubscribed && (
                      <p className="text-xs text-white/90 mt-1.5 text-left" role="alert">
                        This email is already subscribed.
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-white text-primary hover:bg-white/95 h-12 px-6 rounded-xl shadow-lg shrink-0"
                  >
                    {isSubmitting ? "Joining..." : "Subscribe"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </form>
              )}
              <p className="mt-6 text-xs text-white/50">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
