import { event } from "./event";
import { executiveCommittee } from "./executive-committee";
import { galleryAlbum } from "./gallery-album";
import { officialDocument } from "./official-document";
import { partner } from "./partner";
import { pastPresident } from "./past-president";
import { post } from "./post";
import { project } from "./project";
import { publication } from "./publication";
import { urgentNotice } from "./urgent-notice";

export const schemaTypes = [
  post,
  event,
  project,
  publication,
  executiveCommittee,
  pastPresident,
  partner,
  galleryAlbum,
  officialDocument,
  urgentNotice,
];
