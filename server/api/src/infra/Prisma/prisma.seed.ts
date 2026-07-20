import { config } from "dotenv";
import BcryptHasher from "../security/BcryptHasher";
import { PrismaService } from "./prisma.module";
import { getDMMF } from "@prisma/internals";
import fs from "node:fs";
import { transformPrismaSchema } from "../../shared/util";

config();

export default async function run() {
  const email = process.env.EMAIL_DEFAULT_ADMIN!;
  const password = process.env.PASS_DEFAULT_ADMIN!;
  const hasher = new BcryptHasher();
  const db = new PrismaService();
  const schema = fs.readFileSync("prisma/schema.prisma", "utf-8");
  const dmmf = await getDMMF({
    datamodel: schema,
  });
  const dbJsonFy = transformPrismaSchema(dmmf);
  const databaseMock = {
    models: dbJsonFy.models.map((model) => ({
      name: model.name,

      table: model.tableName,

      fields: model.fields.map((field) => ({
        name: field.name,

        type: field.type,

        isId: field.isId,

        isUnique: field.isUnique,

        isRequired: field.isRequired,

        isList: field.isList,

        relation: field.relationName ?? null,
      })),
    })),
  };
  fs.writeFileSync(
    "databaseMock.json",
    JSON.stringify(databaseMock, null, 2),
    "utf-8",
  );

  console.log("✅ databaseMock.json generated");

  const hasAdmin = await db.user.findFirst({
    where: {
      role: "ADMIN",
    },
  });

  if (hasAdmin) {
    console.log("ADMIN ALREADY EXIST");

    return;
  }

  const passwordHashed = await hasher.hash(password);

  await db.user.create({
    data: {
      bi: "123456789LA001",
      email,
      password: passwordHashed,
      name: "ADMIN USER",
      phone: "923456789",
      role: "ADMIN",
      image: "https://app.utmify.com.br/user",
      isActive: true,
    },
  });

  console.log("ADMIN CREATED");
}

run().then(() => {
  process.exit();
});
