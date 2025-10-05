/*
  Warnings:

  - You are about to drop the `Basket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BasketItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Basket" DROP CONSTRAINT "Basket_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BasketItem" DROP CONSTRAINT "BasketItem_basketId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BasketItem" DROP CONSTRAINT "BasketItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropTable
DROP TABLE "public"."Basket";

-- DropTable
DROP TABLE "public"."BasketItem";

-- DropTable
DROP TABLE "public"."Customer";

-- DropTable
DROP TABLE "public"."Order";

-- DropTable
DROP TABLE "public"."OrderItem";

-- DropEnum
DROP TYPE "public"."OrderStatus";
