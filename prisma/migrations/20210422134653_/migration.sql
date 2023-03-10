/*
  Warnings:

  - A unique constraint covering the columns `[phoneHash]` on the table `registrations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "registrations.phoneHash_unique" ON "registrations"("phoneHash");
