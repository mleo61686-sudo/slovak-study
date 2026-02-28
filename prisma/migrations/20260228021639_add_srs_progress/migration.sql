-- CreateTable
CREATE TABLE "SrsProgress" (
    "userId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SrsProgress_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "SrsProgress" ADD CONSTRAINT "SrsProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
