import type { MetadataRoute } from "next";
import { sanityFetchList } from "@/sanity/fetch";
import {
  allPostsQuery,
  allProjectsQuery,
  committeesQuery,
} from "@/sanity/queries";
import { siteConfig } from "@/lib/site-config";
import type { Committee, NewsPost, Project } from "@/types/content";

const staticRoutes = [
  "",
  "/about",
  "/membership",
  "/committees",
  "/activities",
  "/news",
  "/events",
  "/projects",
  "/publications",
  "/awards",
  "/documents",
  "/gallery",
  "/careers",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");

  const [posts, projects, committees] = await Promise.all([
    sanityFetchList<NewsPost>(allPostsQuery),
    sanityFetchList<Project>(allProjectsQuery),
    sanityFetchList<Committee>(committeesQuery),
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${base}/news/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...committees.map((committee) => ({
      url: `${base}/committees/${committee.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
