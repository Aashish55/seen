import type { PortableTextBlock } from "next-sanity";

export interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  imageUrl?: string | null;
  publishedAt: string;
  author?: string;
  tags?: string[];
  body?: PortableTextBlock[];
}

export interface EventItem {
  _id: string;
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  location?: string;
  host?: string;
  registrationUrl?: string;
  description?: string;
  imageUrl?: string | null;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  category?: string;
  description?: string;
  contributors?: string[];
  technologies?: string[];
  imageUrl?: string | null;
  gallery?: string[];
  body?: PortableTextBlock[];
}

export interface Publication {
  _id: string;
  title: string;
  category: string;
  publishedAt?: string;
  coverUrl?: string | null;
  fileUrl?: string | null;
}

export interface ExecutiveCommitteeMember {
  name: string;
  role: string;
  photoUrl?: string | null;
}

export interface ExecutiveCommittee {
  _id: string;
  startYear: number;
  endYear: number;
  members: ExecutiveCommitteeMember[];
}

export interface PastPresident {
  _id: string;
  name: string;
  startYear: number;
  endYear?: number;
}

export interface Partner {
  _id: string;
  name: string;
  logoUrl?: string | null;
  website?: string;
}

export interface GalleryAlbum {
  _id: string;
  title: string;
  category?: string;
  images: { url: string; alt?: string }[];
}

export interface UrgentNotice {
  _id: string;
  title: string;
  description?: string;
  fileUrl?: string | null;
  fileType?: string | null;
  fileName?: string | null;
}

export interface OfficialDocument {
  _id: string;
  title: string;
  category: string;
  fileUrl?: string | null;
}
