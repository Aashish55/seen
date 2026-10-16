export interface LifeMember {
  firstName: string;
  lastName: string;
}

interface LifeMembersApiResponse {
  success: boolean;
  count?: number;
  members?: LifeMember[];
  error?: string;
}

// Shown when the Apps Script endpoint is unset or unreachable, matching the
// site's previous hardcoded "1,200+ engineers" copy.
const FALLBACK_MEMBER_COUNT = 1200;

/** Fetch the public Life Members list. Falls back to an empty list if the endpoint is unset or fails. */
export async function getLifeMembers(): Promise<{
  members: LifeMember[];
  count: number;
}> {
  const endpoint = process.env.NEXT_PUBLIC_MEMBERSHIP_RESPONSE_FORM;
  if (!endpoint) {
    return { members: [], count: FALLBACK_MEMBER_COUNT };
  }

  try {
    const res = await fetch(endpoint, { next: { revalidate: 1800 } });
    const data: LifeMembersApiResponse = await res.json();

    if (!data.success || !Array.isArray(data.members)) {
      return { members: [], count: FALLBACK_MEMBER_COUNT };
    }

    return {
      members: data.members,
      count: data.count ?? data.members.length,
    };
  } catch (error) {
    console.error("Life members fetch failed:", error);
    return { members: [], count: FALLBACK_MEMBER_COUNT };
  }
}

// Round down to a clean milestone so the badge reads as "at least N", not an
// exact headcount (e.g. 298 -> "200+", not "298+").
export function formatMemberCount(count: number): string {
  const step = count < 100 ? 10 : 100;
  const rounded = Math.floor(count / step) * step;
  return `${rounded.toLocaleString("en-US")}+`;
}
