import { redirect } from "next/navigation";

// /play is not a real landing page today (the playable experience is /play/[slug]).
// Redirect to /cases so crawlers/users don't hit a 404.
export default function PlayIndexRedirect() {
  redirect("/cases");
}
