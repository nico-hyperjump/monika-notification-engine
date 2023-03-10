/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[action]` on the table `templates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[waId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `action` to the `templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneHash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users.phone_unique";

-- AlterTable
ALTER TABLE "templates" ADD COLUMN     "action" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
DROP COLUMN "phone",
ADD COLUMN     "phoneHash" TEXT NOT NULL,
ADD COLUMN     "waId" TEXT NOT NULL,
ADD PRIMARY KEY ("phoneHash");

-- CreateTable
CREATE TABLE "actions" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "actions.action_unique" ON "actions"("action");

-- CreateIndex
CREATE UNIQUE INDEX "templates.action_unique" ON "templates"("action");

-- CreateIndex
CREATE UNIQUE INDEX "users.waId_unique" ON "users"("waId");
