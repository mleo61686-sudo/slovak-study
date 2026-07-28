-- Optional public profile fields shown only when the user fills them in.
ALTER TABLE "User"
ADD COLUMN "age" INTEGER,
ADD COLUMN "nationality" TEXT;
