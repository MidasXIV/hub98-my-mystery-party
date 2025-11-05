import React from "react";
import RoadmapVoting from "@/components/roadmap-voting";

export const metadata = {
  title: "Roadmap • Mystery Party",
  description: "Vote on upcoming Mystery Party investigation features and improvements.",
  openGraph: {
    title: "Mystery Party Roadmap",
    description: "Vote on upcoming investigation tools, UI upgrades, and integrations.",
  },
};

export default function RoadmapPage() {
  return <RoadmapVoting />;
}
