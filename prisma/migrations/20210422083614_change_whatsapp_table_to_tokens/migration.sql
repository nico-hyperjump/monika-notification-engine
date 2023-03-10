/*
  Warnings:

  - You are about to drop the column `phone` on the `registrations` table. All the data in the column will be lost.
  - You are about to drop the `whatsapp` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phoneHash` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registrations" DROP COLUMN "phone",
ADD COLUMN     "phoneHash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "templates" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- DropTable
DROP TABLE "whatsapp";

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
