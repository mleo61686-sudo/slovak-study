/*
  Warnings:

  - You are about to drop the column `usedAt` on the `PasswordResetToken` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PasswordResetToken_expiresAt_idx";

-- DropIndex
DROP INDEX "PasswordResetToken_userId_idx";

-- AlterTable
ALTER TABLE "PasswordResetToken" DROP COLUMN "usedAt";
