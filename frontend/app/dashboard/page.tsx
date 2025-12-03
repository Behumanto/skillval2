import { redirect } from "next/navigation";

// Stuur naar juiste dashboard zodra middleware of server weet wie je bent.

export default function DashboardLanding() {
  redirect("/dashboard/candidate");
}
