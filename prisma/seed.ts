import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { seedWines } from "../src/lib/catalog/seed-data";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.upsert({
      where: { email },
      update: { passwordHash },
      create: { email, passwordHash, name: "Администратор", role: "ADMIN" },
    });
    console.log(`Администратор ${email} готов`);
  } else {
    console.warn("ADMIN_EMAIL / ADMIN_PASSWORD не заданы — администратор не создан");
  }

  for (const wine of seedWines) {
    await prisma.wine.upsert({ where: { slug: wine.slug }, update: {}, create: wine });
  }
  console.log(`Вина коллекции: ${seedWines.length} шт.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
