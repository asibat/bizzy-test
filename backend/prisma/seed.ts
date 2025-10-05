import { PrismaClient } from "@prisma/client";
import orders from "../../data/orders.json";
const prisma = new PrismaClient();

async function main() {
  console.log(orders);
  for (const order of orders) {
    await prisma.order.upsert({
      where: { id: order.id },
      update: {
        customerId: order.customerId,
        subtotal: order.subtotal,
        discount: order.discount,
        total: order.total,
        status: order.status,
      },
      create: {
        id: order.id,
        customerId: order.customerId,
        subtotal: order.subtotal,
        discount: order.discount,
        total: order.total,
        status: order.status,
        items: {
          create: order.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.priceAtPurchase,
          })),
        },
      },
    });
  }
  console.log("Seeded database with orders!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
