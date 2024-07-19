/*
  Warnings:

  - You are about to drop the column `userName` on the `users` table. All the data in the column will be lost.
  - Added the required column `user_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "userName",
ADD COLUMN     "user_name" VARCHAR(50) NOT NULL;
