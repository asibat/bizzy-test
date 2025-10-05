/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `Basket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Basket_customerId_key" ON "Basket"("customerId");
