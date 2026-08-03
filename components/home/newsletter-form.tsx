"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setNewsletterStatus } from "@/lib/store/ui-slice";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const status = useAppSelector((state) => state.ui.newsletterStatus);
  const dispatch = useAppDispatch();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(setNewsletterStatus("loading"));
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Subscription failed");
      dispatch(setNewsletterStatus("success"));
      setEmail("");
    } catch {
      dispatch(setNewsletterStatus("error"));
    }
  }

  if (status === "success") {
    return (
      <p className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-medium text-white">
        <CheckCircle2 className="size-5 text-emerald-400" aria-hidden />
        Thank you for subscribing! You&apos;ll hear from us soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <Label htmlFor="newsletter-email" className="sr-only">
          Email address
        </Label>
        <Input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 border-white/20 bg-white/10 text-white placeholder:text-white/50"
        />
      </div>
      <Button type="submit" size="lg" disabled={status === "loading"} className="h-11">
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Send className="size-4" aria-hidden />
        )}
        Subscribe
      </Button>
      {status === "error" ? (
        <p role="alert" className="text-sm text-red-300 sm:sr-only">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
