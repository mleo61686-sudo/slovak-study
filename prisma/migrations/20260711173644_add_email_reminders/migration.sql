/*
  Warnings:

  - A unique constraint covering the columns `[unsubscribeToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailLanguage" TEXT NOT NULL DEFAULT 'ua',
ADD COLUMN     "emailRemindersEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "inactivityReminderSentAt" TIMESTAMP(3),
ADD COLUMN     "preferredCourse" TEXT NOT NULL DEFAULT 'sk',
ADD COLUMN     "unsubscribeToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_unsubscribeToken_key" ON "User"("unsubscribeToken");
