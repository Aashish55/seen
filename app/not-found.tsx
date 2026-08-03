import Link from "next/link";
import { Home, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-navy px-4 text-center text-white">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary">
        <Zap className="size-8" aria-hidden />
      </span>
      <h1 className="text-5xl font-bold">404</h1>
      <p className="max-w-md text-white/70">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Home className="size-4" aria-hidden />
        Back to Home
      </Link>
    </div>
  );
}
