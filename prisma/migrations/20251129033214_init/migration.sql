/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `plantbase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plantprogress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userplant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `plantprogress` DROP FOREIGN KEY `plantProgress_userPlantId_fkey`;

-- DropForeignKey
ALTER TABLE `userplant` DROP FOREIGN KEY `userPlant_plantBaseId_fkey`;

-- DropForeignKey
ALTER TABLE `userplant` DROP FOREIGN KEY `userPlant_userId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`;

-- DropTable
DROP TABLE `plantbase`;

-- DropTable
DROP TABLE `plantprogress`;

-- DropTable
DROP TABLE `userplant`;

-- CreateTable
CREATE TABLE `links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `links_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `links` ADD CONSTRAINT `links_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
