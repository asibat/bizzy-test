import { PrismaClient } from "@prisma/client";
import customers from "../../data/customers.json";
const prisma = new PrismaClient();

async function main() {
  console.log(customers);
  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { id: customer.id },
      update: customer,
      create: customer,
    });
  }
  console.log("Seeded database with products!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
