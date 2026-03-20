/* eslint-disable @typescript-eslint/no-explicit-any */

export interface PersonOfInterestVehicle {
  year: string;
  make: string;
  model: string;
  color: string;
  plate: string;
}

export interface PersonOfInterestData {
  lastName: string;
  firstName: string;
  middleName: string;
  alias: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  dob: string;
  age: string;
  sex: string;
  race: string;
  height: string;
  weight: string;
  hair: string;
  eyes: string;
  scars: string;
  occupation: string;
  employer: string;
  arrests: string;
  vehicles: PersonOfInterestVehicle[];
  statement: string;
  conclusion: string;
  narrativeDate: string;
  narrativeTime: string;
  caseNumber: string;
  policeStation: string;
  displayName: string;
  referenceId: string;
}

function fallbackReference(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 999)}`;
}

function splitSubjectName(subject?: string) {
  if (!subject) {
    return { firstName: "", lastName: "" };
  }

  const parts = subject.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || "",
  };
}

function parseFallbackText(content: string) {
  const subjectMatch = content.match(/\*\*(Subject|Name):\*\*\s*(.*?)(\n|$)/i);
  const occMatch = content.match(/\*\*(Occupation):\*\*\s*(.*?)(\n|$)/i);
  const reasonMatch = content.match(
    /\*\*(Reason for Inclusion|Statement).*?\*\*([\s\S]*?)(?=\*\*(Conclusion|Employer|Occupation)|\Z)/i,
  );
  const conclusionMatch = content.match(/\*\*Conclusion:\*\*([\s\S]*)/i);
  const fullName = subjectMatch ? subjectMatch[2].trim() : "Unknown";
  const { firstName, lastName } = splitSubjectName(fullName);

  return {
    firstName,
    lastName,
    occupation: occMatch ? occMatch[2].trim() : "",
    statement: reasonMatch ? reasonMatch[2].trim() : "",
    conclusion: conclusionMatch ? conclusionMatch[1].trim() : "",
    subject: fullName,
  };
}

function normalizeVehicle(vehicle: any): PersonOfInterestVehicle {
  return {
    year: vehicle?.year || vehicle?.carYear || "",
    make: vehicle?.make || vehicle?.carMake || "",
    model: vehicle?.model || vehicle?.carModel || "",
    color: vehicle?.color || vehicle?.carColor || "",
    plate:
      vehicle?.plate ||
      vehicle?.licensePlate ||
      vehicle?.registration ||
      vehicle?.tag ||
      "",
  };
}

function extractVehicles(json: any): PersonOfInterestVehicle[] {
  if (Array.isArray(json.vehicles)) {
    return json.vehicles.map(normalizeVehicle);
  }

  if (Array.isArray(json.cars)) {
    return json.cars.map(normalizeVehicle);
  }

  if (json.vehicle && typeof json.vehicle === "object") {
    return [normalizeVehicle(json.vehicle)];
  }

  if (json.car && typeof json.car === "object") {
    return [normalizeVehicle(json.car)];
  }

  const hasFlatVehicleFields = [
    json.carYear,
    json.carMake,
    json.carModel,
    json.carColor,
    json.licensePlate,
    json.vehicleYear,
    json.vehicleMake,
    json.vehicleModel,
    json.vehicleColor,
    json.vehiclePlate,
  ].some(Boolean);

  if (hasFlatVehicleFields) {
    return [
      normalizeVehicle({
        year: json.vehicleYear || json.carYear,
        make: json.vehicleMake || json.carMake,
        model: json.vehicleModel || json.carModel,
        color: json.vehicleColor || json.carColor,
        plate: json.vehiclePlate,
        licensePlate: json.licensePlate,
      }),
    ];
  }

  return [{ year: "??", make: "----", model: "----", color: "--", plate: "----" }];
}

export function parsePersonOfInterestData(content: string): PersonOfInterestData {
  let json: any = {};

  try {
    json = JSON.parse(content);
  } catch {
    json = parseFallbackText(content);
  }

  const subjectParts = splitSubjectName(json.subject);
  const firstName = json.firstName || json.givenName || subjectParts.firstName || "";
  const lastName = json.lastName || json.surname || subjectParts.lastName || "";
  const middleName = json.middleName || "";
  const displayName = [firstName, middleName, lastName].filter(Boolean).join(" ") || json.name || json.subject || "UNKNOWN";
  const vehicles = extractVehicles(json);

  return {
    lastName,
    firstName,
    middleName,
    alias: json.alias || "",
    address: json.address || "N/A",
    city: json.city || "N/A",
    state: json.state || "N/A",
    zipCode: json.zipCode || "N/A",
    phone: json.phone || "N/A",
    dob: json.dob || "Unknown",
    age: json.age || "",
    sex: json.sex || "M",
    race: json.race || "W",
    height: json.height || "",
    weight: json.weight || "",
    hair: json.hair || "",
    eyes: json.eyes || "",
    scars: json.scars || "None visible",
    occupation: json.occupation || "Unemployed",
    employer: json.employer || "",
    arrests: json.arrests || "None",
    vehicles,
    statement: json.statement || json.reason || json.statementBody || "No statement provided.",
    conclusion: json.conclusion || "",
    narrativeDate: json.narrativeDate || "Oct 28, 1998",
    narrativeTime: json.narrativeTime || "14:00",
    caseNumber: json.caseNumber || "A03-05081998",
    policeStation: json.policeStation || "Riverdale Police Department",
    displayName,
    referenceId: json.id || json.referenceId || json.caseNumber || fallbackReference("POI"),
  };
}
