/*
  Warnings:

  - You are about to drop the column `initializationVector` on the `registrations` table. All the data in the column will be lost.
  - You are about to drop the column `initializationVector` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "registrations" DROP COLUMN "initializationVector";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "initializationVector";
