import { OdooVersion } from "@prisma/client";

export const versions = Object.values(OdooVersion).map((version) => {
  return {
    value: version,
    label: version.split("_")[1],
  };
});
