/*
  Warnings:

  - The primary key for the `SrsProgress` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SrsProgress" DROP CONSTRAINT "SrsProgress_pkey",
ADD COLUMN     "courseId" TEXT NOT NULL DEFAULT 'sk',
ADD CONSTRAINT "SrsProgress_pkey" PRIMARY KEY ("userId", "courseId");
