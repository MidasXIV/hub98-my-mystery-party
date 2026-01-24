import type { Metadata } from "next";
import RSVPDashboardTable, { RSVPItem } from "@/components/invitations/RSVPDashboardTable";

export const metadata: Metadata = {
  title: "RSVP Tracking Dashboard",
  description: "Track deliveries, opens, and RSVPs for your invitations.",
  alternates: { canonical: "/invitations/dashboard" },
};

function getMockData(): RSVPItem[] {
  const now = Date.now();
  return [
    {
      id: "1",
      guest: "Alex Johnson",
      email: "alex@example.com",
      status: "accepted",
      sentAt: new Date(now - 1000 * 60 * 60 * 48).toISOString(),
      openedAt: new Date(now - 1000 * 60 * 60 * 47).toISOString(),
      respondedAt: new Date(now - 1000 * 60 * 60 * 46).toISOString(),
    },
    {
      id: "2",
      guest: "Samira K.",
      phone: "+1 (555) 010-1234",
      status: "opened",
      sentAt: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
      openedAt: new Date(now - 1000 * 60 * 60 * 20).toISOString(),
    },
    {
      id: "3",
      guest: "Diego Rocha",
      email: "diego@example.com",
      status: "delivered",
      sentAt: new Date(now - 1000 * 60 * 60 * 10).toISOString(),
    },
    {
      id: "4",
      guest: "Priya Singh",
      phone: "+1 (555) 010-9876",
      status: "declined",
      sentAt: new Date(now - 1000 * 60 * 60 * 120).toISOString(),
      openedAt: new Date(now - 1000 * 60 * 60 * 119).toISOString(),
      respondedAt: new Date(now - 1000 * 60 * 60 * 118).toISOString(),
    },
  ];
}

export default async function RSVPDashboardPage() {
  const items = getMockData();
  return (
    <section className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">RSVP Tracking</h1>
          <p className="text-muted-foreground">Monitor deliveries, opens, and responses.</p>
        </header>
        <RSVPDashboardTable items={items} />
      </div>
    </section>
  );
}
