-- create database SimplyQDB;
 use SimplyQDB;

show tables;
-- drop table user;
-- CREATE TABLE `user` (
--   `uid` INT AUTO_INCREMENT PRIMARY KEY,
--   `email` VARCHAR(255) NOT NULL,
--   `name` VARCHAR(255),
--   `password` VARCHAR(255),
--   `inQueue` BOOLEAN
-- );
-- CREATE TABLE `admin` (
--     `email` VARCHAR(225) NOT NULL,
-- 	`password` VARCHAR(255)
-- );
-- CREATE TABLE `staff`(
--   `sid` INT AUTO_INCREMENT PRIMARY KEY,
--   `email` VARCHAR(255) NOT NULL,
--   `name` VARCHAR(255),
--   `password` VARCHAR(255)

-- );
-- CREATE TABLE `queue` (
--     `queuePosition` INT PRIMARY KEY,
--     `uid` INT references uid(`uid`)
-- );

-- Delete from user where uid = 5;
Select *
From user;

-- Select *
-- From staff;

Select max(queue.queuePosition)
From queue;

Select *
From queue

 