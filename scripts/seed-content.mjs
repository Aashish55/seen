// One-off script to push the site's demo/fallback content into Sanity as
// real documents. Run with: SANITY_WRITE_TOKEN=xxx node scripts/seed-content.mjs
// Safe to re-run — every document uses a fixed _id and createOrReplace.
import { createClient } from "next-sanity";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "pgtgfhpe",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-01",
  token,
  useCdn: false,
});

const textBlock = (text) => ({
  _type: "block",
  style: "normal",
  children: [{ _type: "span", text }],
});

const documents = [
  // --- News & Notices (post) ---
  {
    _id: "seed-post-agm-2083-notice",
    _type: "post",
    title: "SEEN Annual General Meeting 2083 — Notice to All Members",
    slug: { _type: "slug", current: "agm-2083-notice" },
    category: "Notice",
    excerpt:
      "All members are cordially invited to the Annual General Meeting. Agenda includes the annual report, financial statements, and election of the new executive committee.",
    author: "SEEN Secretariat",
    publishedAt: "2026-06-28T00:00:00.000Z",
    body: [
      textBlock(
        "All members are cordially invited to the Annual General Meeting. Agenda includes the annual report, financial statements, and election of the new executive committee."
      ),
    ],
  },
  {
    _id: "seed-post-electrical-safety-campaign-volunteers",
    _type: "post",
    title: "Call for Volunteers: National Electrical Safety Awareness Campaign",
    slug: { _type: "slug", current: "electrical-safety-campaign-volunteers" },
    category: "Announcement",
    excerpt:
      "SEEN is launching a nationwide electrical safety awareness campaign in schools and communities. Member engineers are invited to volunteer as trainers.",
    author: "Outreach Committee",
    publishedAt: "2026-06-15T00:00:00.000Z",
    body: [
      textBlock(
        "SEEN is launching a nationwide electrical safety awareness campaign in schools and communities. Member engineers are invited to volunteer as trainers."
      ),
    ],
  },
  {
    _id: "seed-post-mou-smart-grid-research",
    _type: "post",
    title: "SEEN Signs MoU with Universities for Joint Research on Smart Grids",
    slug: { _type: "slug", current: "mou-smart-grid-research" },
    category: "News",
    excerpt:
      "A memorandum of understanding was signed to promote collaborative research on smart grid technologies, grid modernization, and renewable integration in Nepal.",
    author: "Research & Innovation Committee",
    publishedAt: "2026-05-30T00:00:00.000Z",
    body: [
      textBlock(
        "A memorandum of understanding was signed to promote collaborative research on smart grid technologies, grid modernization, and renewable integration in Nepal."
      ),
    ],
  },

  // --- Events ---
  {
    _id: "seed-event-national-power-conference-2026",
    _type: "event",
    title: "National Conference on Power Systems & Renewable Energy",
    slug: { _type: "slug", current: "national-power-conference-2026" },
    date: "2026-08-21T00:00:00.000Z",
    endDate: "2026-08-22T00:00:00.000Z",
    location: "Kathmandu, Nepal",
    description:
      "Two-day national conference bringing together engineers, researchers, utilities and policymakers to discuss the future of Nepal's power sector.",
  },
  {
    _id: "seed-event-protection-relay-workshop",
    _type: "event",
    title: "Workshop: Protection & Relay Coordination in Distribution Networks",
    slug: { _type: "slug", current: "protection-relay-workshop" },
    date: "2026-08-05T00:00:00.000Z",
    location: "SEEN Training Hall, Kathmandu",
    description:
      "Hands-on workshop on modern protection schemes, relay coordination studies, and practical case studies from Nepali distribution networks.",
  },
  {
    _id: "seed-event-ev-charging-webinar",
    _type: "event",
    title: "Webinar Series: EV Charging Infrastructure for Nepal",
    slug: { _type: "slug", current: "ev-charging-webinar" },
    date: "2026-07-25T00:00:00.000Z",
    location: "Online (Zoom)",
    description:
      "Expert panel on planning, standards, and grid impact of electric vehicle charging infrastructure in the Nepali context.",
  },

  // --- Projects ---
  {
    _id: "seed-project-rural-microgrid-initiative",
    _type: "project",
    title: "Rural Microgrid Electrification Initiative",
    slug: { _type: "slug", current: "rural-microgrid-initiative" },
    location: "Karnali Province",
    category: "Rural Electrification",
    description:
      "Design and deployment support for community-owned solar-hydro hybrid microgrids serving remote villages, in coordination with local governments.",
    technologies: ["Solar PV", "Micro-hydro", "Battery Storage", "Smart Metering"],
    contributors: ["SEEN Renewable Energy Committee"],
  },
  {
    _id: "seed-project-kathmandu-grid-modernization",
    _type: "project",
    title: "Grid Modernization Study for Kathmandu Valley",
    slug: { _type: "slug", current: "kathmandu-grid-modernization" },
    location: "Kathmandu Valley",
    category: "Smart Grid",
    description:
      "Technical study on SCADA expansion, distribution automation, and loss reduction strategies for the valley's distribution network.",
    technologies: ["SCADA", "Distribution Automation", "GIS Mapping"],
    contributors: ["SEEN AI & Smart Grid Committee"],
  },
  {
    _id: "seed-project-electrical-safety-standards",
    _type: "project",
    title: "Electrical Safety Standards for Public Buildings",
    slug: { _type: "slug", current: "electrical-safety-standards" },
    location: "Nationwide",
    category: "Standards & Safety",
    description:
      "Drafting practical wiring and earthing guidelines for schools, hospitals and public buildings, aligned with international standards.",
    technologies: ["IEC Standards", "Earthing Systems", "Arc-flash Safety"],
    contributors: ["Professional Practice Committee"],
  },

  // --- Publications ---
  {
    _id: "seed-publication-technical-journal-vol-8",
    _type: "publication",
    title: "SEEN Technical Journal — Vol. 8",
    category: "Technical Journal",
    publishedAt: "2026-04-01",
  },
  {
    _id: "seed-publication-newsletter-q2-2026",
    _type: "publication",
    title: "SEEN Newsletter — Q2 2026",
    category: "Newsletter",
    publishedAt: "2026-06-01",
  },
  {
    _id: "seed-publication-annual-report-2025-26",
    _type: "publication",
    title: "Annual Report 2025/26",
    category: "Annual Report",
    publishedAt: "2026-07-01",
  },
  {
    _id: "seed-publication-proceedings-national-power-conference-2025",
    _type: "publication",
    title: "Proceedings: National Power Conference 2025",
    category: "Conference Proceedings",
    publishedAt: "2025-09-15",
  },

  // --- Committees ---
  {
    _id: "seed-committee-power-systems",
    _type: "committee",
    name: "Power Systems",
    slug: { _type: "slug", current: "power-systems" },
    description:
      "Generation, transmission and distribution engineering: planning studies, grid codes, and utility best practices.",
    activities: ["Grid code review workshops", "Utility knowledge exchange", "Load forecasting studies"],
    members: [
      { _key: "chair", name: "Er. Committee Chair", role: "Coordinator" },
      { _key: "member1", name: "Er. Member One", role: "Member" },
      { _key: "member2", name: "Er. Member Two", role: "Member" },
    ],
  },
  {
    _id: "seed-committee-renewable-energy",
    _type: "committee",
    name: "Renewable Energy",
    slug: { _type: "slug", current: "renewable-energy" },
    description:
      "Solar, hydro, wind and hybrid systems — promoting clean energy adoption and technical capacity across Nepal.",
    activities: ["Rural microgrid support", "Solar design trainings", "Policy advocacy"],
    members: [
      { _key: "chair", name: "Er. Committee Chair", role: "Coordinator" },
      { _key: "member1", name: "Er. Member One", role: "Member" },
    ],
  },
  {
    _id: "seed-committee-ai-smart-grid",
    _type: "committee",
    name: "AI & Smart Grid",
    slug: { _type: "slug", current: "ai-smart-grid" },
    description:
      "Digitalization of the power sector: smart metering, automation, data analytics and AI applications in energy.",
    activities: ["Smart grid study group", "Hackathons", "Utility pilots"],
    members: [{ _key: "chair", name: "Er. Committee Chair", role: "Coordinator" }],
  },
  {
    _id: "seed-committee-women-in-engineering",
    _type: "committee",
    name: "Women in Engineering",
    slug: { _type: "slug", current: "women-in-engineering" },
    description:
      "Advancing participation and leadership of women in Nepal's electrical engineering profession.",
    activities: ["Mentorship program", "Scholarship advocacy", "Networking events"],
    members: [{ _key: "chair", name: "Er. Committee Chair", role: "Coordinator" }],
  },
  {
    _id: "seed-committee-young-engineers",
    _type: "committee",
    name: "Young Engineers",
    slug: { _type: "slug", current: "young-engineers" },
    description:
      "Platform for early-career engineers and students: competitions, site visits, and professional development.",
    activities: ["Student competitions", "Industrial visits", "Career workshops"],
    members: [{ _key: "chair", name: "Er. Committee Chair", role: "Coordinator" }],
  },
  {
    _id: "seed-committee-professional-practice",
    _type: "committee",
    name: "Professional Practice & Education",
    slug: { _type: "slug", current: "professional-practice" },
    description:
      "Ethics, licensure, continuing education and curriculum collaboration with engineering colleges.",
    activities: ["CPD seminars", "Ethics guidelines", "Curriculum feedback"],
    members: [{ _key: "chair", name: "Er. Committee Chair", role: "Coordinator" }],
  },

  // --- Partners ---
  { _id: "seed-partner-nea", _type: "partner", name: "Nepal Electricity Authority" },
  { _id: "seed-partner-nec", _type: "partner", name: "Nepal Engineering Council" },
  { _id: "seed-partner-ioe", _type: "partner", name: "Institute of Engineering" },
  { _id: "seed-partner-aepc", _type: "partner", name: "Alternative Energy Promotion Centre" },
  { _id: "seed-partner-nea-assoc", _type: "partner", name: "Nepal Engineers' Association" },

  // --- Gallery albums ---
  { _id: "seed-gallery-national-power-conference-2025", _type: "galleryAlbum", title: "National Power Conference 2025", category: "Conferences" },
  { _id: "seed-gallery-hydropower-site-visit", _type: "galleryAlbum", title: "Hydropower Plant Site Visit", category: "Site Visits" },
  { _id: "seed-gallery-electrical-safety-workshop", _type: "galleryAlbum", title: "Electrical Safety Workshop", category: "Workshops" },
  { _id: "seed-gallery-student-project-competition", _type: "galleryAlbum", title: "Student Project Competition", category: "Competitions" },
  { _id: "seed-gallery-agm", _type: "galleryAlbum", title: "Annual General Meeting", category: "Events" },
  { _id: "seed-gallery-community-outreach", _type: "galleryAlbum", title: "Community Outreach Program", category: "Events" },

  // --- Official documents ---
  { _id: "seed-document-code-of-ethics", _type: "officialDocument", title: "SEEN Code of Ethics", category: "Policies" },
  { _id: "seed-document-membership-application", _type: "officialDocument", title: "Membership Application Form", category: "Membership Forms" },
  { _id: "seed-document-earthing-lightning-guideline", _type: "officialDocument", title: "Guideline: Earthing & Lightning Protection", category: "Guidelines" },
  { _id: "seed-document-lv-wiring-standard", _type: "officialDocument", title: "Low-Voltage Wiring Standard (Draft)", category: "Standards" },
  { _id: "seed-document-annual-report-2025-26", _type: "officialDocument", title: "Annual Report 2025/26", category: "Annual Reports" },
  { _id: "seed-document-consulting-fee-guidelines", _type: "officialDocument", title: "Consulting Service Fee Guidelines", category: "Guidelines" },
];

const run = async () => {
  const tx = client.transaction();
  for (const doc of documents) {
    tx.createOrReplace(doc);
  }
  const result = await tx.commit();
  console.log(`Seeded ${documents.length} documents.`);
  return result;
};

run().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
