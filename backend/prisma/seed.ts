import { PrismaClient } from "@prisma/client";
import discountRules from "../../data/discountRules.json";
const prisma = new PrismaClient();

async function main() {
  console.log(discountRules);
  await prisma.discountRule.createMany({
    data: discountRules,
  });

  console.log("Seeded database with orders!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
