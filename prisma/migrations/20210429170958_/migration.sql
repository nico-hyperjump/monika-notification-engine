/*
  Warnings:

  - You are about to drop the `templates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "templates";

-- CreateTable
CREATE TABLE "waTemplates" (
    "name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "namespace" TEXT NOT NULL,
    "langPolicy" TEXT NOT NULL,
    "langCode" TEXT NOT NULL,
    "compType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "waTemplates.action_unique" ON "waTemplates"("action");
