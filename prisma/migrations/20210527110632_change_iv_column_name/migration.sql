/*
  Warnings:

  - You are about to drop the column `iv` on the `registrations` table. All the data in the column will be lost.
  - You are about to drop the column `iv` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "registrations" DROP COLUMN "iv",
ADD COLUMN     "initializationVector" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "iv",
ADD COLUMN     "initializationVector" TEXT;
