-- CreateTable
CREATE TABLE `client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `suburb` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `postcode` VARCHAR(255) NULL,
    `card_number` VARCHAR(255) NULL,
    `card_security_num` VARCHAR(255) NULL,
    `card_expiry_date` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `membership` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` DATE NULL,
    `due_date` DATE NULL,
    `cost` DOUBLE NULL,
    `client_id` INTEGER NULL,
    `professional_id` INTEGER NULL,

    INDEX `client_id`(`client_id`),
    INDEX `professional_id`(`professional_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `abn` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `suburb` VARCHAR(255) NULL,
    `tfn` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `postcode` VARCHAR(255) NULL,
    `card_number` VARCHAR(255) NULL,
    `card_security_num` VARCHAR(255) NULL,
    `card_expiry_date` DATE NULL,
    `service_type_id` INTEGER NULL,
    `failed_update_count` INTEGER NOT NULL DEFAULT 0,
    `failed_update_timestamp` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `service_type_id`(`service_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professional_service_request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `acceptance` INTEGER NULL,
    `cost` DOUBLE NULL,
    `service_request_id` INTEGER NULL,
    `professional_id` INTEGER NULL,

    INDEX `professional_id`(`professional_id`),
    INDEX `service_request_id`(`service_request_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` FLOAT NULL,
    `review` VARCHAR(1000) NULL,
    `client_id` INTEGER NULL,
    `transaction_id` INTEGER NULL,

    INDEX `client_id`(`client_id`),
    INDEX `transaction_id`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `request_time` DATETIME(0) NULL,
    `request_title` VARCHAR(255) NULL,
    `description` VARCHAR(1000) NULL,
    `client_id` INTEGER NULL,
    `service_type_id` INTEGER NULL,

    INDEX `client_id`(`client_id`),
    INDEX `service_type_id`(`service_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_type_name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_time` DATETIME(0) NULL,
    `professional_request_id` INTEGER NULL,

    INDEX `professional_request_id`(`professional_request_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `membership` ADD CONSTRAINT `membership_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `membership` ADD CONSTRAINT `membership_ibfk_2` FOREIGN KEY (`professional_id`) REFERENCES `professional`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `professional` ADD CONSTRAINT `professional_ibfk_1` FOREIGN KEY (`service_type_id`) REFERENCES `service_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `professional_service_request` ADD CONSTRAINT `professional_service_request_ibfk_1` FOREIGN KEY (`service_request_id`) REFERENCES `service_request`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `professional_service_request` ADD CONSTRAINT `professional_service_request_ibfk_2` FOREIGN KEY (`professional_id`) REFERENCES `professional`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`transaction_id`) REFERENCES `transaction`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `service_request` ADD CONSTRAINT `service_request_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `service_request` ADD CONSTRAINT `service_request_ibfk_2` FOREIGN KEY (`service_type_id`) REFERENCES `service_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_ibfk_3` FOREIGN KEY (`professional_request_id`) REFERENCES `professional_service_request`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
