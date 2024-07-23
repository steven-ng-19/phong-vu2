-- AlterTable
ALTER TABLE "users" ALTER COLUMN "registration_tokens" DROP NOT NULL,
ALTER COLUMN "registration_tokens" DROP DEFAULT,
ALTER COLUMN "registration_tokens" SET DATA TYPE TEXT;
