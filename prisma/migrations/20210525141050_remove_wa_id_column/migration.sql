/*
  Warnings:

  - You are about to drop the column `waId` on the `registrations` table. All the data in the column will be lost.
  - You are about to drop the column `waId` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users.waId_unique";

-- DropIndex
DROP INDEX "registrations.waId_unique";

-- AlterTable
ALTER TABLE "registrations" DROP COLUMN "waId";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "waId";
