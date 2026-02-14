-- CreateTable
CREATE TABLE "ErrorReport" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "page" TEXT,
    "lessonId" TEXT,
    "exercise" TEXT,
    "actionIdx" INTEGER,
    "sk" TEXT,
    "ua" TEXT,
    "ru" TEXT,
    "key" TEXT,
    "category" TEXT,
    "message" TEXT NOT NULL,
    "userAgent" TEXT,

    CONSTRAINT "ErrorReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ErrorReport" ADD CONSTRAINT "ErrorReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
