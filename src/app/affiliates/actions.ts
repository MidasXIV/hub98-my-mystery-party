"use server";

// Placeholder server action for affiliate applications.
// In the future, persist to a database (e.g. Postgres/Supabase) and send a confirmation email.
// Optionally perform code uniqueness checks and anti-fraud verification.
export async function submitAffiliateApplication(formData: FormData) {
  // Extract relevant fields
  const payload = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    website: String(formData.get("website") || "").trim(),
    desiredCode: String(formData.get("desiredCode") || "").trim(),
    payoutMethod: String(formData.get("payoutMethod") || "paypal"),
    paypalEmail: String(formData.get("paypalEmail") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
    submittedAt: new Date().toISOString(),
    // Simple hash placeholder (not secure) – replace with proper ID generation later
    fingerprint: Math.random().toString(36).slice(2, 11),
  };

  // For now just log. Replace with DB insert.
  console.log("[affiliate:application]", payload);

  // Simulate minimal processing delay
  await new Promise((r) => setTimeout(r, 400));

  // Basic sanity check
  if (!payload.name || !payload.email) {
    return { success: false, error: "Missing required fields." };
  }
  return { success: true };
}
