import Image from "next/image";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ExecutiveCommitteeMember } from "@/types/content";

export function ExecutiveCommitteeMemberCard({
  member,
}: {
  member: ExecutiveCommitteeMember;
}) {
  return (
    <Card className="group gap-0 overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy">
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy via-navy-light to-primary/70">
            <Users className="size-10 text-white/35" aria-hidden />
          </div>
        )}
      </div>
      <CardContent className="p-4 text-center">
        <p className="font-heading font-semibold text-navy">{member.name}</p>
        <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
      </CardContent>
    </Card>
  );
}
