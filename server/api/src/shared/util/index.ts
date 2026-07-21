import { randomBytes } from "node:crypto";

export function generateTempPassword(prefix = "TMP") {
  const chars = "  ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const bytes = randomBytes(6);

  let password = prefix.toUpperCase() + "-";
  for (const byte of bytes) {
    password += chars[byte % chars.length];
  }
  return password;
}

export function transformPrismaSchema(dmmf: any) {
  return {
    models: dmmf.datamodel.models.map((model: any) => ({
      name: model.name,
      tableName: model.dbName || model.name,
      fields: model.fields.map((field: any) => ({
        name: field.name,
        type: field.type,
        isId: field.isId || false,
        isUnique: field.isUnique || false,
        isRequired: field.isRequired,
        isList: field.isList,
        relation: field.relationName || null,
        default: field.default || null,
      })),
    })),
  };
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const earthRadiusKm = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;

  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}
