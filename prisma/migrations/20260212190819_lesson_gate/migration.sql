-- AlterTable
ALTER TABLE "UserProgress" ADD COLUMN     "dailyCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dailyDate" TIMESTAMP(3),
ADD COLUMN     "lastUnlockedLevel" TEXT;
