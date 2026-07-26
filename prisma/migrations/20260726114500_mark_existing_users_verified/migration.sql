-- Existing Flunio accounts were created before email verification existed.
-- Mark only those already present at deployment time as verified.
-- New users created after this migration still start with emailVerifiedAt = NULL.
UPDATE "User"
SET "emailVerifiedAt" = "createdAt"
WHERE "emailVerifiedAt" IS NULL;
