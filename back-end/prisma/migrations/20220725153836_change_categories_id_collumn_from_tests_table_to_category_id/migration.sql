/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `tests` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_categoriesId_fkey";

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "categoriesId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
