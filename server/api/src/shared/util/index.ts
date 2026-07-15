import SENSITIVE_FIELDS from "../constants/SENSITIVE_FIELDS";
import { randomBytes } from "node:crypto";

export function sanitize(data: any): any {
  if (Array.isArray(data)) {
    return data.map(sanitize);
  }

  if (data && typeof data === "object") {
    return Object.entries(data).reduce(
      (acc, [key, value]) => {
        if (SENSITIVE_FIELDS.has(key)) {
          acc[key] = "<hidden>";
        } else {
          acc[key] = sanitize(value);
        }

        return acc;
      },
      {} as Record<string, unknown>,
    );
  }

  return data;
}

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
