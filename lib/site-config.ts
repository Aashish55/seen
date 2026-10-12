export const siteConfig = {
  name: "Society of Electrical Engineers Nepal",
  shortName: "SEEN",
  tagline: "Powering Nepal's Future",
  description:
    "The Society of Electrical Engineers Nepal (SEEN) is the professional body of electrical engineers in Nepal, advancing the profession through knowledge sharing, standards, advocacy, and community.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "electrical@seen.org.np",
  phone: "+977-9843374143, +977-9851035791",
  address: "Bagbazar Kathmandu, Krishi Bikash Bank Galli, Nepal",
  officeHours: "Sunday - Friday, 10:00 AM - 5:00 PM",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100064094952027",
    youtube: "https://www.youtube.com/@seennepal2861",
  },
};

/** Site-wide SEO keywords, reused as a base by every page's metadata. */
export const baseKeywords = [
  "SEEN",
  "SEEN Nepal",
  "seen",
  "seen nepal",
  "Society of Electrical Engineers Nepal",
  "electrical engineers Nepal",
  "electrical engineering Nepal",
  "electrical nepal",
  "electrical community Nepal",
  "electrical community nepal",
  "electrical society Nepal",
  "electrical society nepal",
  "electrical engineers society Nepal",
  "electrical engineers association Nepal",
  "Nepal electrical engineers association",
  "professional electrical engineers Nepal",
  "power engineers Nepal",
  "power systems Nepal",
  "renewable energy Nepal",
  "electrical engineering association",
  "engineers society Nepal",
  "Kathmandu electrical engineers",
  "NEC license Nepal",
  "electrical engineering community",
];

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const navigation: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About SEEN", href: "/about", description: "Introduction, history, vision & mission" },
      { label: "Executive Committee", href: "/about#executive-committee", description: "Current leadership of the society" },
      { label: "Past Presidents", href: "/about#past-presidents", description: "Leaders who shaped SEEN" },
      { label: "Chapters", href: "/about#chapters", description: "Provincial and international chapters" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Membership Overview", href: "/membership", description: "Types, benefits and requirements" },
      { label: "Fees & Requirements", href: "/membership#fees", description: "What it takes to join" },
      { label: "Apply Online", href: "/membership#apply", description: "Become a SEEN member" },
    ],
  },
  {
    label: "News & Events",
    href: "/news",
    children: [
      { label: "News & Notices", href: "/news", description: "Announcements and notices" },
      { label: "Events", href: "/events", description: "Seminars, workshops and conferences" },
      { label: "Activities", href: "/activities", description: "What SEEN does year-round" },
    ],
  },
  { label: "Projects", href: "/projects" },
  {
    label: "Resources",
    href: "/publications",
    children: [
      { label: "Publications", href: "/publications", description: "Journals, newsletters and reports" },
      { label: "Documents", href: "/documents", description: "Standards, guidelines and forms" },
      { label: "Awards", href: "/awards", description: "Honors and recognitions" },
      { label: "Internship & Careers", href: "/careers", description: "Opportunities for engineers" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
