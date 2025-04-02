/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Headquarter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Headquarter_name_key" ON "Headquarter"("name");
