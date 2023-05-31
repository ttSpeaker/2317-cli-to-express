/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `products_name_key` ON `products`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
