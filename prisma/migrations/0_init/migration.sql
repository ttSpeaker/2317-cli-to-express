-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `status` VARCHAR(255) NOT NULL DEFAULT 'CREATED',
    `userId` VARCHAR(36) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders_products` (
    `id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `orderId` VARCHAR(36) NOT NULL,
    `productId` VARCHAR(36) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders_products_with_complex_pk` (
    `orderId` VARCHAR(36) NOT NULL,
    `productId` VARCHAR(36) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`orderId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` FLOAT NOT NULL,
    `pictures` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `email` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ordersToproducts` (
    `A` VARCHAR(36) NOT NULL,
    `B` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `_ordersToproducts_AB_unique`(`A`, `B`),
    INDEX `_ordersToproducts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

