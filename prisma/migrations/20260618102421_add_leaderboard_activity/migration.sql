-- CreateEnum
CREATE TYPE "LeaderboardActivityType" AS ENUM ('LESSON', 'REVIEW', 'DICTATION', 'AUDIO_QUIZ');

-- CreateTable
CREATE TABLE "LeaderboardActivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "LeaderboardActivityType" NOT NULL,
    "courseId" TEXT NOT NULL,
    "activityKey" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaderboardActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeaderboardActivity_weekStart_idx" ON "LeaderboardActivity"("weekStart");

-- CreateIndex
CREATE INDEX "LeaderboardActivity_userId_idx" ON "LeaderboardActivity"("userId");

-- CreateIndex
CREATE INDEX "LeaderboardActivity_type_weekStart_idx" ON "LeaderboardActivity"("type", "weekStart");

-- CreateIndex
CREATE INDEX "LeaderboardActivity_courseId_weekStart_idx" ON "LeaderboardActivity"("courseId", "weekStart");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardActivity_userId_type_courseId_activityKey_weekSt_key" ON "LeaderboardActivity"("userId", "type", "courseId", "activityKey", "weekStart");

-- AddForeignKey
ALTER TABLE "LeaderboardActivity" ADD CONSTRAINT "LeaderboardActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
