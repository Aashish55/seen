import { client } from "./client";
import { isSanityConfigured } from "./env";

interface SanityFetchOptions {
  params?: Record<string, unknown>;
  revalidate?: number;
  tags?: string[];
}

async function fetchFromSanity<T>(
  query: string,
  { params = {}, revalidate = 300, tags }: SanityFetchOptions
): Promise<T | null> {
  if (!isSanityConfigured) return null;

  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate, tags },
    });
    return data ?? null;
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}

/** Fetch a list of documents. Returns an empty array if there are none. */
export async function sanityFetchList<T>(
  query: string,
  options: SanityFetchOptions = {}
): Promise<T[]> {
  const data = await fetchFromSanity<T[]>(query, options);
  return data ?? [];
}

/** Fetch a single document. Returns null if it doesn't exist. */
export async function sanityFetchOne<T>(
  query: string,
  options: SanityFetchOptions = {}
): Promise<T | null> {
  return fetchFromSanity<T>(query, options);
}
