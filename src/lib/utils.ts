import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { OdooVersion } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const versions = Object.values(OdooVersion).map((version) => {
  return {
    value: version,
    label: version.split("_")[1],
  };
});
