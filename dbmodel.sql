
-- ------
-- BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
-- MaquisSolo implementation : © <Your name here> <Your email address here>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-- -----

-- dbmodel.sql

-- This is the file where you are describing the database schema of your game
-- Basically, you just have to export from PhpMyAdmin your table structure and copy/paste
-- this export here.
-- Note that the database itself and the standard tables ("global", "stats", "gamelog" and "player") are
-- already created and must not be created here

-- Note: The database schema is created from this file when the game starts. If you modify this file,
--       you have to restart a game to see your changes in database.

-- Example 1: create a standard "card" table to be used with the "Deck" tools (see example game "hearts"):

-- CREATE TABLE IF NOT EXISTS `card` (
--   `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `card_type` varchar(16) NOT NULL,
--   `card_type_arg` int(11) NOT NULL,
--   `card_location` varchar(16) NOT NULL,
--   `card_location_arg` int(11) NOT NULL,
--   PRIMARY KEY (`card_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


-- Example 2: add a custom field to the standard "player" table
-- ALTER TABLE `player` ADD `player_my_custom_field` INT UNSIGNED NOT NULL DEFAULT '0';

CREATE TABLE IF NOT EXISTS `round_data` (
    `round` INT DEFAULT 0,
    `morale` INT DEFAULT 0,
    `active_space` INT DEFAULT 0,
    `action_taken` BOOLEAN DEFAULT FALSE,
    `placed_resistance` INT DEFAULT 0,
    `active_resistance` INT DEFAULT 0,
    `resistance_in_game` INT DEFAULT 0,
    `placed_milice` INT DEFAULT 0,
    `active_milice` INT DEFAULT 0,
    `active_soldiers` INT DEFAULT 0,
    `placed_soldiers` INT DEFAULT 0,
    `selected_field` INT DEFAULT 0,
    `shot_today` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `board` (
    `space_id` INT UNSIGNED NOT NULL,
    `space_name` varchar(16) NOT NULL,
    `has_worker` BOOLEAN NOT NULL DEFAULT FALSE,
    `has_milice` BOOLEAN NOT NULL DEFAULT FALSE,
    `has_soldier` BOOLEAN NOT NULL DEFAULT FALSE,
    `is_safe` BOOLEAN NOT NULL DEFAULT FALSE,
    `is_field` BOOLEAN NOT NULL DEFAULT FALSE,
    `has_item` BOOLEAN NOT NULL DEFAULT FALSE,
    `item` varchar(16) DEFAULT NULL,
    `quantity` INT UNSIGNED NOT NULL DEFAULT 0,
    `has_marker` BOOLEAN NOT NULL DEFAULT FALSE,
    `mission_id` INT UNSIGNED DEFAULT 0,
    `room_id` INT UNSIGNED DEFAULT NULL,
    PRIMARY KEY (`space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `patrol_card` (
    `card_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `card_type` VARCHAR(32) NOT NULL,
    `card_type_arg` INT UNSIGNED NOT NULL,
    `card_location` VARCHAR(32) NOT NULL,
    `card_location_arg` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `action` (
    `action_id` INT UNSIGNED NOT NULL,
    `action_name` varchar(32) NOT NULL,
    `action_description` varchar(255) NOT NULL,
    `is_safe` BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `board_action` (
    `space_id` INT unsigned NOT NULL,
    `action_id` INT unsigned NOT NULL,
    FOREIGN KEY (`space_id`)
        REFERENCES `board`(`space_id`),
    FOREIGN KEY (`action_id`)
        REFERENCES `action`(`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `board_path` (
    `path_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `space_id_start` INT unsigned NOT NULL,
    `space_id_end` INT unsigned NOT NULL,
    PRIMARY KEY (`path_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `resource` (
    `resource_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `resource_name` VARCHAR(16) NOT NULL,
    `quantity` INT UNSIGNED NOT NULL DEFAULT 0,
    `available` INT UNSIGNED NOT NULL DEFAULT 4,
    PRIMARY KEY (`resource_id`)
) ENGINE=InnoDb DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `mission` (
    `mission_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `mission_name` VARCHAR(16) NOT NULL,
    `selected` BOOLEAN NOT NULL DEFAULT FALSE,
    `completed` BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`mission_id`)
) ENGINE=InnoDb DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `room` (
    `room_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `room_name` VARCHAR(16) NOT NULL,
    `available` BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (`room_id`)
) ENGINE=InnoDb DEFAULT CHARSET=utf8;