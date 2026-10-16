"use client";

import { useId, useState } from "react";
import { CheckCircle2, Loader2, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { PaymentAccount } from "@/types/content";
import { PaymentQrCard } from "./payment-qr-card";

type Status = "idle" | "loading" | "success" | "error";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Not sure"];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB, matches the printed form's limit

interface FileFieldSpec {
  name: string;
  label: string;
  hint: string;
  accept: string;
}

const FILE_FIELDS: FileFieldSpec[] = [
  {
    name: "photo",
    label: "Recent Passport/Stamp Size photo",
    hint: "Upload 1 image file. Max 10 MB.",
    accept: "image/*",
  },
  {
    name: "paymentVoucher",
    label: "Payment Voucher/Slip (NPR 3,100)",
    hint: "Upload 1 file: PDF, document or image. Max 10 MB.",
    accept: "application/pdf,image/*,.doc,.docx",
  },
  {
    name: "citizenship",
    label: "Citizenship",
    hint: "Upload 1 file: PDF, document or image. Max 10 MB.",
    accept: "application/pdf,image/*,.doc,.docx",
  },
  {
    name: "necCertificate",
    label: "NEC registration certificate/council License",
    hint: "Upload 1 file: PDF, document or image. Max 10 MB.",
    accept: "application/pdf,image/*,.doc,.docx",
  },
];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // strip the "data:<mime>;base64," prefix, Apps Script only needs the payload
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function FileField({ spec }: { spec: FileFieldSpec }) {
  const id = useId();
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {spec.label} <span aria-hidden className="text-destructive">*</span>
      </Label>
      <div className="flex items-center gap-3">
        <Button
          asChild
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0"
        >
          <label htmlFor={id} className="cursor-pointer">
            <Paperclip className="size-3.5" aria-hidden />
            Choose file
          </label>
        </Button>
        <span className="truncate text-sm text-muted-foreground">
          {fileName ?? "No file selected"}
        </span>
      </div>
      <input
        id={id}
        name={spec.name}
        type="file"
        required
        accept={spec.accept}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) {
            setFileName(null);
            return;
          }
          if (file.size > MAX_FILE_SIZE) {
            setError("File is larger than 10 MB. Please choose a smaller file.");
            e.target.value = "";
            setFileName(null);
            return;
          }
          setError(null);
          setFileName(file.name);
        }}
      />
      <p className="text-xs text-muted-foreground">{spec.hint}</p>
      {error ? (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface MembershipApplicationFormProps {
  paymentAccount: PaymentAccount | null;
}

export function MembershipApplicationForm({ paymentAccount }: MembershipApplicationFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // honeypot - real users never fill this hidden field
    if (formData.get("company_website")) {
      form.reset();
      setStatus("success");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_MEMBERSHIP_RESPONSE_FORM;
    if (!endpoint) {
      setStatus("error");
      setErrorMessage(
        "The application portal is not configured yet. Please email your documents instead."
      );
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const files = await Promise.all(
        FILE_FIELDS.map(async (spec) => {
          const file = formData.get(spec.name) as File | null;
          if (!file || file.size === 0) {
            throw new Error(`${spec.label} is required.`);
          }
          if (file.size > MAX_FILE_SIZE) {
            throw new Error(`${spec.label} must be smaller than 10 MB.`);
          }
          return {
            field: spec.name,
            fileName: file.name,
            mimeType: file.type || "application/octet-stream",
            base64: await fileToBase64(file),
          };
        })
      );

      const payload = {
        fullName: String(formData.get("fullName") ?? "").trim(),
        permanentAddress: String(formData.get("permanentAddress") ?? "").trim(),
        recentAddress: String(formData.get("recentAddress") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        email2: String(formData.get("email2") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        bloodGroup: String(formData.get("bloodGroup") ?? "").trim(),
        company: String(formData.get("company") ?? "").trim(),
        referredBy: String(formData.get("referredBy") ?? "").trim(),
        files,
      };

      const res = await fetch(endpoint, {
        method: "POST",
        // text/plain avoids a CORS preflight, which Apps Script web apps don't handle
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.success) {
        throw new Error(result?.error ?? "Failed to submit application");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
        <CheckCircle2 className="size-6 shrink-0" aria-hidden />
        <div>
          <p className="font-semibold">Application submitted!</p>
          <p className="text-sm">
            Thank you for applying to SEEN. Our membership team will review your
            application and get back to you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden
      />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="membership-fullName">
                Full name <span aria-hidden className="text-destructive">*</span>
              </Label>
              <Input id="membership-fullName" name="fullName" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="membership-phone">
                Phone Number <span aria-hidden className="text-destructive">*</span>
              </Label>
              <Input id="membership-phone" name="phone" type="tel" required autoComplete="tel" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="membership-permanentAddress">
                Permanent Address <span aria-hidden className="text-destructive">*</span>
              </Label>
              <Input id="membership-permanentAddress" name="permanentAddress" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="membership-recentAddress">
                Recent Address <span aria-hidden className="text-destructive">*</span>
              </Label>
              <Input id="membership-recentAddress" name="recentAddress" required />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="membership-email">
                Email Address <span aria-hidden className="text-destructive">*</span>
              </Label>
              <Input id="membership-email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="membership-email2">Email-02 (Optional)</Label>
              <Input id="membership-email2" name="email2" type="email" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="membership-bloodGroup">
                Blood Group <span aria-hidden className="text-destructive">*</span>
              </Label>
              <select
                id="membership-bloodGroup"
                name="bloodGroup"
                required
                defaultValue=""
                className={cn(
                  "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
                )}
              >
                <option value="" disabled>
                  Select blood group
                </option>
                {BLOOD_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="membership-referredBy">
                Referred By (SEEN LIFE Member Name)
              </Label>
              <Input id="membership-referredBy" name="referredBy" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="membership-company">
              Company Associated with{" "}
              <span className="font-normal text-muted-foreground">
                (please fill complete detail)
              </span>{" "}
              <span aria-hidden className="text-destructive">*</span>
            </Label>
            <Textarea id="membership-company" name="company" required rows={3} />
          </div>
        </div>
        <Separator orientation="horizontal" className="lg:hidden" />
        <Separator orientation="vertical" className="hidden lg:block" />
        <PaymentQrCard account={paymentAccount} className="lg:w-72 lg:shrink-0" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {FILE_FIELDS.map((spec) => (
          <FileField key={spec.name} spec={spec} />
        ))}
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage ?? "Something went wrong submitting your application. Please try again."}
        </p>
      ) : null}

      <div className="text-end">
        <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          Submit Application
        </Button>
      </div>
    </form>
  );
}
