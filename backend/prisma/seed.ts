import { PrismaClient } from "@prisma/client";
import products from "../../data/products.json";
const prisma = new PrismaClient();

async function main() {
  console.log(products);
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
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
