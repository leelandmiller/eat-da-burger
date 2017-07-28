### Schema

CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE orders
(
	id int NOT NULL AUTO_INCREMENT,
	burger_id int NOT NULL,
    devoured BOOLEAN DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (burger_id) 
		REFERENCES burgers(id)
        ON DELETE CASCADE
);

