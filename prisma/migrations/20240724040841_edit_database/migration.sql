/*
  Warnings:

  - You are about to drop the column `email_verification_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_email_verifiled` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_phone_verifiled` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `registration_tokens` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_verification_token",
DROP COLUMN "is_email_verifiled",
DROP COLUMN "is_phone_verifiled",
DROP COLUMN "password",
DROP COLUMN "registration_tokens";
