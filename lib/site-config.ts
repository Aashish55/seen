export const siteConfig = {
  name: "Society of Electrical Engineers Nepal",
  shortName: "SEEN",
  tagline: "Powering Nepal's Future",
  description:
    "The Society of Electrical Engineers Nepal (SEEN) is the professional body of electrical engineers in Nepal, advancing the profession through knowledge sharing, standards, advocacy, and community.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "info@seen.org.np",
  phone: "+977-1-4XXXXXX",
  address: "Kathmandu, Nepal",
  officeHours: "Sunday – Friday, 10:00 AM – 5:00 PM",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100064094952027",
    linkedin: "#",
    youtube: "#",
  },
};

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
  { label: "Committees", href: "/committees" },
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
