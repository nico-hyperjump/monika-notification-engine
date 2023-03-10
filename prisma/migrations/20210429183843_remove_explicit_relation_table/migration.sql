/*
  Warnings:

  - You are about to drop the column `userId` on the `webhook_token` table. All the data in the column will be lost.
  - Added the required column `user` to the `webhook_token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "webhook_token" DROP CONSTRAINT "webhook_token_userId_fkey";

-- AlterTable
ALTER TABLE "webhook_token" DROP COLUMN "userId",
ADD COLUMN     "user" TEXT NOT NULL;
