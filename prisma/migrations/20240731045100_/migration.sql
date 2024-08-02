/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `benefits` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `conditions` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `discounts` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `galleries` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `gifts` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `promotions` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "benefits" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "conditions" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "discounts" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "galleries" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "gifts" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "products" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "promotions" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);
