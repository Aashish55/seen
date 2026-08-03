"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
        <CheckCircle2 className="size-6 shrink-0" aria-hidden />
        <div>
          <p className="font-semibold">Message sent!</p>
          <p className="text-sm">We&apos;ll get back to you as soon as possible.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">
            Full name <span aria-hidden className="text-destructive">*</span>
          </Label>
          <Input id="contact-name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">
            Email <span aria-hidden className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input id="contact-subject" name="subject" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">
          Message <span aria-hidden className="text-destructive">*</span>
        </Label>
        <Textarea id="contact-message" name="message" required rows={6} />
      </div>
      {status === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          Something went wrong sending your message. Please try again or email us
          directly.
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Send className="size-4" aria-hidden />
        )}
        Send Message
      </Button>
    </form>
  );
}
