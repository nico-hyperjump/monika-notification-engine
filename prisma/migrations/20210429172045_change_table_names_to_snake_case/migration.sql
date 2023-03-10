/*
  Warnings:

  - You are about to drop the `waLoginTokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `waMessages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `waTemplates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "waLoginTokens";

-- DropTable
DROP TABLE "waMessages";

-- DropTable
DROP TABLE "waTemplates";

-- CreateTable
CREATE TABLE "wa_login_tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wa_templates" (
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

-- CreateTable
CREATE TABLE "wa_messages" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "parameters" TEXT NOT NULL,
    "status" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wa_templates.action_unique" ON "wa_templates"("action");
