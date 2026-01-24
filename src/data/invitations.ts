export type InvitationType = "personal" | "professional";

export interface InvitationDesign {
  id: string;
  slug: string; // SEO-friendly slug
  title: string;
  description: string;
  basePrice: number; // starting price
  imageUrl: string; // hero image
  gallery: string[]; // additional angles/details
  defaultColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  defaultType: InvitationType;
  defaultText: {
    headline: string;
    subheadline?: string;
    details: string;
    footer?: string;
  };
  // Pricing modifiers
  pricing: {
    extraFeatures: {
      envelopeLiner: number;
      waxSeal: number;
      premiumPaper: number;
    };
    perRecipient: number; // cost per recipient for sending
  };
}

export const invitationDesigns: InvitationDesign[] = [
  {
    id: "formal-elegance",
    slug: "formal-elegance-classic",
    title: "Formal Elegance (Classic)",
    description:
      "A timeless black-and-ivory design with tasteful serif typography and subtle emboss.",
    basePrice: 9.0,
    imageUrl: "/features_section/invitations/formal_elegance/hero.jpg",
    gallery: [
      "/features_section/invitations/formal_elegance/angle-1.jpg",
      "/features_section/invitations/formal_elegance/angle-2.jpg",
      "/features_section/invitations/formal_elegance/envelope.jpg",
    ],
    defaultColors: {
      primary: "#111111",
      secondary: "#f5f5f5",
      accent: "#b89f6b",
    },
    defaultType: "professional",
    defaultText: {
      headline: "You're Invited",
      subheadline: "Annual Awards Gala",
      details:
        "Saturday, April 18 • 7:00 PM\nGrand Regency Hall, 124 Harbor St.\nDress Code: Black Tie",
      footer: "Hosted by Meridian Foundation",
    },
    pricing: {
      extraFeatures: {
        envelopeLiner: 1.5,
        waxSeal: 2.0,
        premiumPaper: 3.0,
      },
      perRecipient: 0.05,
    },
  },
  {
    id: "Halloween-party",
    slug: "Halloween-party",
    title: "Halloween Party (Spooky)",
    description:
      "A fun and festive design featuring playful typography and Halloween-themed graphics.",
    basePrice: 8.0,
    imageUrl: "/invitations/halloween_party/hero.jpg",
    gallery: [
      "/invitations/halloween_party/angle-1.jpg",
      "/invitations/halloween_party/angle-2.jpg",
      "/invitations/halloween_party/envelope.jpg",
    ],
    defaultColors: {
      primary: "#1f2937",
      secondary: "#ffffff",
      accent: "#2563eb",
    },
    defaultType: "professional",
    defaultText: {
      headline: "Team Offsite",
      subheadline: "Quarterly Strategy Summit",
      details:
        "Friday, May 9 • 10:00 AM\nAurora Campus, Bldg 4\nLunch & breakout sessions included",
      footer: "RSVP by May 1",
    },
    pricing: {
      extraFeatures: {
        envelopeLiner: 1.0,
        waxSeal: 1.5,
        premiumPaper: 2.5,
      },
      perRecipient: 0.03,
    },
  },
  {
    id: "handwritten-charm",
    slug: "handwritten-charm-kraft",
    title: "Handwritten Charm (Kraft)",
    description:
      "Warm, friendly design using a casual handwritten font and kraft paper textures.",
    basePrice: 6.0,
    imageUrl: "/features_section/invitations/handwritten_charm/hero.jpg",
    gallery: [
      "/features_section/invitations/handwritten_charm/angle-1.jpg",
      "/features_section/invitations/handwritten_charm/angle-2.jpg",
      "/features_section/invitations/handwritten_charm/envelope.jpg",
    ],
    defaultColors: {
      primary: "#3f2d1c",
      secondary: "#faf3e0",
      accent: "#e879f9",
    },
    defaultType: "personal",
    defaultText: {
      headline: "Birthday Cookout!",
      details:
        "Sunday, June 14 • 2:00 PM\n204 Maple Drive\nBring a chair and your favorite side!",
      footer: "Hosted by The Parkers",
    },
    pricing: {
      extraFeatures: {
        envelopeLiner: 0.75,
        waxSeal: 1.0,
        premiumPaper: 1.75,
      },
      perRecipient: 0.02,
    },
  },
];

export function getInvitationBySlug(slug: string) {
  return invitationDesigns.find((d) => d.slug === slug);
}
