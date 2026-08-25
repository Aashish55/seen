"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { formatMemberCount, type LifeMember } from "@/lib/membership";

function fullName(member: LifeMember) {
  return [member.firstName, member.lastName].filter(Boolean).join(" ");
}

export function LifeMembersSection({
  members,
  count,
  className,
}: {
  members: LifeMember[];
  count: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  if (!members.length) return null;

  return (
    <div
      className={cn(
        "border-t pt-6 text-left sm:border-t-0 sm:border-l sm:pl-8 sm:pt-0 sm:text-right",
        className
      )}
    >
      <p className="flex items-baseline gap-1.5 sm:justify-end">
        <span className="text-xl font-bold text-primary">
          {formatMemberCount(count)}
        </span>
        <span className="text-sm text-muted-foreground">
          Life Members and counting
        </span>
      </p>
      <Button type="button" onClick={() => setOpen(true)} className="mt-2">
        View All Members
      </Button>
      <LifeMembersDialog open={open} onOpenChange={setOpen} members={members} />
    </div>
  );
}

function LifeMembersDialog({
  open,
  onOpenChange,
  members,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: LifeMember[];
}) {
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return members.filter((member) => {
      if (letter && !member.lastName.toUpperCase().startsWith(letter)) return false;
      if (term && !fullName(member).toLowerCase().includes(term)) return false;
      return true;
    });
  }, [members, search, letter]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Life Members</DialogTitle>
          <DialogDescription>
            {members.length.toLocaleString("en-US")} registered SEEN life members.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="pl-9"
          />
        </div>

        <div className="max-h-[50vh] overflow-y-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card">
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="w-14 px-3 py-2">#</th>
                <th className="px-3 py-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, i) => (
                <tr key={`${fullName(member)}-${i}`} className="border-t">
                  <td className="px-3 py-2 text-muted-foreground">{i + 1}</td>
                  <td className="px-3 py-2 font-medium text-navy">{fullName(member)}</td>
                </tr>
              ))}
              {!filtered.length ? (
                <tr>
                  <td colSpan={2} className="px-3 py-6 text-center text-muted-foreground">
                    No members match your search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
