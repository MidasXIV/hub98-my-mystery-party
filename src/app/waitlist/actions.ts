"use server";

// Minimal server action for the waitlist.
// Today it just logs to the server console (like affiliates/actions.ts).
// Next step: persist to a real store (Supabase/Postgres, Vercel KV, Mailchimp, ConvertKit, etc.).

export async function submitWaitlist(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const source = String(formData.get("source") || "waitlist").trim();
  const submittedAt = new Date().toISOString();

  const webhookUrl = process.env.DISCORD_WAITLIST_WEBHOOK_URL;

  // Minimal validation
  if (!email) return { success: false, error: "Email is required." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email." };
  }

  const payload = { email, source, submittedAt };
  console.log("[waitlist:signup]", payload);

  // Optional: forward to Discord webhook for notifications.
  // We keep this behind an env var so we don't hardcode secrets in the repo.
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          // Discord webhook format
          content: "New waitlist signup",
          embeds: [
            {
              title: "Waitlist Signup",
              color: 0x7c3aed,
              fields: [
                { name: "Email", value: email, inline: true },
                { name: "Source", value: source || "(none)", inline: true },
                { name: "Submitted", value: submittedAt, inline: false },
              ],
            },
          ],
        }),
        // Make sure we never cache webhook requests.
        cache: "no-store",
      });
    } catch (err) {
      // Don't fail the user signup just because the webhook failed.
      console.warn("[waitlist:webhook:error]", err);
    }
  }

  // Simulate a tiny delay to make UI feel responsive/real
  await new Promise((r) => setTimeout(r, 300));

  return { success: true };
}
