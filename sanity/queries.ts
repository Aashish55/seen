import { groq } from "next-sanity";

const postFields = groq`{
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  "imageUrl": featuredImage.asset->url,
  publishedAt,
  author,
  tags
}`;

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...$limit] ${postFields}
`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) ${postFields}
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    "imageUrl": featuredImage.asset->url,
    publishedAt,
    author,
    tags,
    body
  }
`;

export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc)[0...$limit] {
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    location,
    host,
    registrationUrl,
    description,
    "imageUrl": banner.asset->url
  }
`;

export const allUpcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    location,
    host,
    registrationUrl,
    description,
    "imageUrl": banner.asset->url
  }
`;

export const allPastEventsQuery = groq`
  *[_type == "event" && date < now()] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    location,
    host,
    registrationUrl,
    description,
    "imageUrl": banner.asset->url
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    location,
    host,
    registrationUrl,
    description,
    "imageUrl": banner.asset->url
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc)[0...$limit] {
    _id,
    title,
    "slug": slug.current,
    location,
    category,
    description,
    contributors,
    technologies,
    "imageUrl": images[0].asset->url
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    location,
    category,
    description,
    contributors,
    technologies,
    "imageUrl": images[0].asset->url
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    location,
    category,
    description,
    contributors,
    technologies,
    "imageUrl": images[0].asset->url,
    "gallery": images[].asset->url,
    body
  }
`;

export const publicationsQuery = groq`
  *[_type == "publication"] | order(publishedAt desc) {
    _id,
    title,
    category,
    publishedAt,
    "coverUrl": coverImage.asset->url,
    "fileUrl": pdf.asset->url
  }
`;

export const committeesQuery = groq`
  *[_type == "committee"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    members,
    activities
  }
`;

export const committeeBySlugQuery = groq`
  *[_type == "committee" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    members,
    activities
  }
`;

export const executiveCommitteeQuery = groq`
  *[_type == "executiveCommitteeMember"] | order(order asc) {
    _id,
    name,
    role,
    "photoUrl": photo.asset->url
  }
`;

export const pastPresidentsQuery = groq`
  *[_type == "pastPresident"] | order(startYear desc) {
    _id,
    name,
    startYear,
    endYear
  }
`;

export const partnersQuery = groq`
  *[_type == "partner"] | order(name asc) {
    _id,
    name,
    "logoUrl": logo.asset->url,
    website
  }
`;

export const galleryQuery = groq`
  *[_type == "galleryAlbum"] | order(_createdAt desc) {
    _id,
    title,
    category,
    "images": coalesce(images[]{ "url": asset->url, "alt": alt }, [])
  }
`;

export const documentsQuery = groq`
  *[_type == "officialDocument"] | order(category asc, title asc) {
    _id,
    title,
    category,
    "fileUrl": pdf.asset->url
  }
`;
