import { committee } from "./committee";
import { event } from "./event";
import { executiveCommitteeMember } from "./executive-committee-member";
import { galleryAlbum } from "./gallery-album";
import { officialDocument } from "./official-document";
import { partner } from "./partner";
import { post } from "./post";
import { project } from "./project";
import { publication } from "./publication";

export const schemaTypes = [
  post,
  event,
  project,
  publication,
  committee,
  executiveCommitteeMember,
  partner,
  galleryAlbum,
  officialDocument,
];
