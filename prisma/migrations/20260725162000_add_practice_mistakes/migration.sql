-- CreateTable
CREATE TABLE "PracticeMistakeProgress" (
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PracticeMistakeProgress_pkey" PRIMARY KEY ("userId", "courseId")
);

-- CreateIndex
CREATE INDEX "PracticeMistakeProgress_userId_idx" ON "PracticeMistakeProgress"("userId");

-- AddForeignKey
ALTER TABLE "PracticeMistakeProgress" ADD CONSTRAINT "PracticeMistakeProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
