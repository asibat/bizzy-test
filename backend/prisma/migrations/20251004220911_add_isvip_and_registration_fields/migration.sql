/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `loyaltyPoints` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredDate` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "createdAt",
ADD COLUMN     "loyaltyPoints" INTEGER NOT NULL,
ADD COLUMN     "registeredDate" TIMESTAMP(3) NOT NULL;
