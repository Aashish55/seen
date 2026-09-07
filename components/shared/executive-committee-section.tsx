"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { ExecutiveCommitteeMemberCard } from "@/components/cards/executive-committee-member-card";
import type { ExecutiveCommittee } from "@/types/content";

export function ExecutiveCommitteeSection({
  committees,
}: {
  committees: ExecutiveCommittee[];
}) {
  // Committees arrive sorted by end year, latest first.
  const latest = committees[0];
  const [selectedId, setSelectedId] = useState(latest?._id);

  const selected =
    committees.find((committee) => committee._id === selectedId) ?? latest;
  const isLatest = selected?._id === latest?._id;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Leadership
          </p>
          <h2 className="text-2xl font-bold text-navy md:text-3xl">
            Executive Committee
          </h2>
          <p className="mt-2 text-muted-foreground">
            The elected leadership steering the society&apos;s strategy and
            programs.
          </p>
        </div>
        {committees.length > 1 ? (
          <label className="flex items-center gap-2 text-sm">
            <span className="font-medium text-muted-foreground">Term</span>
            <select
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm font-medium text-navy shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              {committees.map((committee, index) => (
                <option key={committee._id} value={committee._id}>
                  {committee.startYear} – {committee.endYear}
                  {index === 0 ? " (Current)" : ""}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      {!selected ? (
        <EmptyState
          icon={Users}
          title="No committee members listed yet"
          description="The executive committee will appear here once added in the Studio."
        />
      ) : isLatest ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {selected.members.map((member, index) => (
            <ExecutiveCommitteeMemberCard
              key={`${member.name}-${index}`}
              member={member}
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {selected.members.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className="rounded-lg border bg-background p-4"
            >
              <p className="font-heading font-semibold text-navy text-sm">
                {member.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground text-xs">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
