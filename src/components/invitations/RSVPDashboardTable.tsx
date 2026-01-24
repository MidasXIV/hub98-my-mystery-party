import React from "react";

export type RSVPStatus = "delivered" | "opened" | "accepted" | "declined" | "no-response";
export interface RSVPItem {
  id: string;
  guest: string;
  email?: string;
  phone?: string;
  status: RSVPStatus;
  sentAt: string; // ISO
  openedAt?: string; // ISO
  respondedAt?: string; // ISO
}

export function RSVPDashboardTable({ items }: { items: RSVPItem[] }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3">Guest</th>
            <th className="text-left p-3">Contact</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Sent</th>
            <th className="text-left p-3">Opened</th>
            <th className="text-left p-3">Responded</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id} className="border-t border-border">
              <td className="p-3">{it.guest}</td>
              <td className="p-3">
                {it.email ? <span>{it.email}</span> : null}
                {it.phone ? <span className="ml-2 text-muted-foreground">{it.phone}</span> : null}
              </td>
              <td className="p-3 capitalize">{it.status.replace("-", " ")}</td>
              <td className="p-3">{new Date(it.sentAt).toLocaleString()}</td>
              <td className="p-3">{it.openedAt ? new Date(it.openedAt).toLocaleString() : "—"}</td>
              <td className="p-3">{it.respondedAt ? new Date(it.respondedAt).toLocaleString() : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RSVPDashboardTable;
