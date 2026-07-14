/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CriminalProfileData {
  name: string;
  dob: string;
  height: string;
  weight: string;
  hair: string;
  eyes: string;
  bio: string;
  imageUrl: string;
  alias: string;
  profileId: string;
  signedBy: string;
  riskLevel: string;
  status: string;
  surveillancePriority: string;
  jurisdiction: string;
  caseRef: string;
  preparedDate: string;
  reviewedDate: string;
  preparedBy: string;
  preparedBadge: string;
  approvedBy: string;
  approvedBadge: string;
  knownAssociates: string;
  knownVehicles: string;
  usualLocations: string;
  lastConfirmedSighting: string;
  linkedEvidenceIds: string;
  objectiveLink: string;
  timeline: Array<{
    date: string;
    event: string;
    source: string;
  }>;
}

const FALLBACK_IMAGE = "/cold_cases/previews/kismet_casino/ballistics_breakdown.png";

const fallbackProfileId = () =>
  `CP-${Math.floor(1000 + Math.random() * 9000)}`;

function asTimeline(value: unknown): CriminalProfileData["timeline"] {
  if (!Array.isArray(value)) return [];
  return value
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const raw = row as Record<string, unknown>;
      const date = typeof raw.date === "string" ? raw.date : "";
      const event = typeof raw.event === "string" ? raw.event : "";
      const source = typeof raw.source === "string" ? raw.source : "";
      if (!date && !event && !source) return null;
      return { date, event, source };
    })
    .filter((r): r is { date: string; event: string; source: string } => Boolean(r));
}

export function parseCriminalProfileData(content: string): CriminalProfileData {
  let parsed: any = {};

  try {
    parsed = JSON.parse(content);
  } catch {
    parsed = {};
  }

  const name =
    (typeof parsed.name === "string" && parsed.name.trim()) ||
    [parsed.firstName, parsed.lastName].filter(Boolean).join(" ") ||
    "Unknown Subject";

  return {
    name,
    dob:
      (typeof parsed.dob === "string" && parsed.dob.trim()) ||
      "Unknown",
    height:
      (typeof parsed.height === "string" && parsed.height.trim()) ||
      "Unknown",
    weight:
      (typeof parsed.weight === "string" && parsed.weight.trim()) ||
      "Unknown",
    hair:
      (typeof parsed.hair === "string" && parsed.hair.trim()) ||
      "Unknown",
    eyes:
      (typeof parsed.eyes === "string" && parsed.eyes.trim()) ||
      "Unknown",
    bio:
      (typeof parsed.bio === "string" && parsed.bio.trim()) ||
      "No biographical summary provided.",
    imageUrl:
      (typeof parsed.imageUrl === "string" && parsed.imageUrl.trim()) ||
      FALLBACK_IMAGE,
    alias:
      (typeof parsed.alias === "string" && parsed.alias.trim()) || "—",
    profileId:
      (typeof parsed.profileId === "string" && parsed.profileId.trim()) ||
      fallbackProfileId(),
    signedBy:
      (typeof parsed.signedBy === "string" && parsed.signedBy.trim()) ||
      "Det. A. Rao",
    riskLevel:
      (typeof parsed.riskLevel === "string" && parsed.riskLevel.trim()) ||
      "High",
    status:
      (typeof parsed.status === "string" && parsed.status.trim()) ||
      "Active",
    surveillancePriority:
      (typeof parsed.surveillancePriority === "string" && parsed.surveillancePriority.trim()) ||
      "Priority",
    jurisdiction:
      (typeof parsed.jurisdiction === "string" && parsed.jurisdiction.trim()) ||
      "Clark County, NV",
    caseRef:
      (typeof parsed.caseRef === "string" && parsed.caseRef.trim()) ||
      "MK-90",
    preparedDate:
      (typeof parsed.preparedDate === "string" && parsed.preparedDate.trim()) ||
      "04/03/2015",
    reviewedDate:
      (typeof parsed.reviewedDate === "string" && parsed.reviewedDate.trim()) ||
      "04/04/2015",
    preparedBy:
      (typeof parsed.preparedBy === "string" && parsed.preparedBy.trim()) ||
      "Det. A. Rao",
    preparedBadge:
      (typeof parsed.preparedBadge === "string" && parsed.preparedBadge.trim()) ||
      "OCU-781",
    approvedBy:
      (typeof parsed.approvedBy === "string" && parsed.approvedBy.trim()) ||
      "Insp. R. Malhotra",
    approvedBadge:
      (typeof parsed.approvedBadge === "string" && parsed.approvedBadge.trim()) ||
      "OCU-104",
    knownAssociates:
      (typeof parsed.knownAssociates === "string" && parsed.knownAssociates.trim()) ||
      "Nakul Punj; Farhan Haider",
    knownVehicles:
      (typeof parsed.knownVehicles === "string" && parsed.knownVehicles.trim()) ||
      "Multiple shell-registered sedans",
    usualLocations:
      (typeof parsed.usualLocations === "string" && parsed.usualLocations.trim()) ||
      "Aaina Mahal casino floor; Valley Blvd safehouse",
    lastConfirmedSighting:
      (typeof parsed.lastConfirmedSighting === "string" && parsed.lastConfirmedSighting.trim()) ||
      "Aaina Mahal — 03/31/2015 22:40",
    linkedEvidenceIds:
      (typeof parsed.linkedEvidenceIds === "string" && parsed.linkedEvidenceIds.trim()) ||
      "E-14, A-09, C-22",
    objectiveLink:
      (typeof parsed.objectiveLink === "string" && parsed.objectiveLink.trim()) ||
      "obj_02",
    timeline: asTimeline(parsed.timeline),
  };
}
