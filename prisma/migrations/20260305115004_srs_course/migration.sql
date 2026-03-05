-- AlterTable
ALTER TABLE "SrsProgress" ALTER COLUMN "courseId" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "SrsProgress_userId_idx" ON "SrsProgress"("userId");
