import Image from "next/image";
import { Landmark, QrCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PaymentAccount } from "@/types/content";

interface PaymentQrCardProps {
  account: PaymentAccount | null;
  className?: string;
}

export function PaymentQrCard({ account, className }: PaymentQrCardProps) {
  const details = [
    { label: "Account Name", value: account?.accountName },
    { label: "Account Number", value: account?.accountNumber },
    { label: "Bank", value: account?.bankName },
  ].filter((detail) => detail.value);

  return (
    <Card className={cn("text-foreground", className)}>
      <CardContent className="flex flex-col items-center p-4 text-center">
        <h3 className="flex items-center gap-2 text-lg font-bold text-navy">
          <QrCode className="size-5" aria-hidden />
          Pay via Fonepay
        </h3>

        {account?.qrImageUrl ? (
          <Image
            src={account.qrImageUrl}
            alt={account.title}
            width={280}
            height={280}
            className="h-auto w-full max-w-[280px] rounded-lg object-contain"
          />
        ) : (
          <div className="flex aspect-square w-full max-w-[280px] items-center justify-center rounded-lg border border-dashed bg-muted">
            <QrCode className="size-12 text-muted-foreground/50" aria-hidden />
          </div>
        )}

        {details.length > 0 ? (
          <dl className="w-full space-y-1.5 rounded-lg border bg-card p-4 text-left text-sm">
            {details.map((detail) => (
              <div key={detail.label} className="flex justify-between gap-3">
                <dt className="flex items-center gap-1.5 text-muted-foreground">
                  <Landmark className="size-3.5" aria-hidden />
                  {detail.label}
                </dt>
                <dd className="font-medium">{detail.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </CardContent>
    </Card>
  );
}
