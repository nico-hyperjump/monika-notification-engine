/*
  Warnings:

  - The primary key for the `registrations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `registrations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[waId]` on the table `registrations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `registrations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredAt` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "registrations.phoneHash_unique";

-- AlterTable
ALTER TABLE "registrations" DROP CONSTRAINT "registrations_pkey",
DROP COLUMN "id",
ADD COLUMN     "waId" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD PRIMARY KEY ("phoneHash");

-- CreateIndex
CREATE UNIQUE INDEX "registrations.waId_unique" ON "registrations"("waId");

-- CreateIndex
CREATE UNIQUE INDEX "registrations.token_unique" ON "registrations"("token");
