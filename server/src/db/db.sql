CREATE SCHEMA IF NOT EXISTS social_media ;

USE social_media;

CREATE TABLE IF NOT EXISTS ACTIVE(
	id int(1) NOT NULL,
	name varchar(8),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS ACCEPTED(
id int(1) NOT NULL,
name varchar(9),
PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS COUNTRY(
	id int AUTO_INCREMENT,
    name varchar(80) NOT NULL,
    code varchar(2) NOT NULL,
	active int(1) DEFAULT 1,
    PRIMARY KEY(id),
    FOREIGN KEY (active) REFERENCES ACTIVE(id)
);

CREATE TABLE IF NOT EXISTS GENDER(
	id int AUTO_INCREMENT,
    name varchar(6),
	active int(1) DEFAULT 1,
    PRIMARY KEY(id),
    FOREIGN KEY (active) REFERENCES ACTIVE(id)
);

CREATE TABLE IF NOT EXISTS USER(
	id int AUTO_INCREMENT,
    username varchar(30) NOT NULL,
    email varchar(35) NOT NULL,
    password varchar(80) NOT NULL,
    firstname varchar(20) NOT NULL,
    lastname varchar(20) NOT NULL,
    image varchar(256) DEFAULT 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp',
    age int NOT NULL,
	country int NOT NULL,
	province varchar(30) NOT NULL,
    gender int(1) NOT NULL,
    friends int DEFAULT 0,
	active int(1) DEFAULT 1,
    PRIMARY KEY (id),
	FOREIGN KEY (gender) REFERENCES GENDER(id),
    FOREIGN KEY (country) REFERENCES COUNTRY(id),
    FOREIGN  KEY (active) REFERENCES ACTIVE(id)
);

CREATE TABLE IF NOT EXISTS POST(
id int AUTO_INCREMENT,
text varchar(256) NOT NULL,
image varchar(150),
comments int DEFAULT 0, 
likes int DEFAULT 0,
user int NOT NULL,
active int DEFAULT 1,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id),
FOREIGN KEY (user) REFERENCES USER(id),
FOREIGN KEY (active) REFERENCES ACTIVE(id)
);

CREATE TABLE IF NOT EXISTS POST_COMMENT(
id int AUTO_INCREMENT,
post_id int NOT NULL,
user_id int NOT NULL,
comment varchar(256) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id),
FOREIGN KEY (post_id) REFERENCES POST(id),
FOREIGN KEY (user_id) REFERENCES USER(id)
);



CREATE TABLE IF NOT EXISTS LIKE_COMMENT(
id int AUTO_INCREMENT,
post_id int NOT NULL,
user_id int NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id),
FOREIGN KEY (post_id) REFERENCES POST(id),
FOREIGN KEY (user_id) REFERENCES USER(id)
);

CREATE TABLE IF NOT EXISTS FRIEND_REQUEST(
id int AUTO_INCREMENT,
sender int NOT NULL,
receiver int NOT NULL,
accepted int DEFAULT 0,
active int(1) DEFAULT 1,
PRIMARY KEY(id),
FOREIGN KEY(sender) REFERENCES USER(id),
FOREIGN KEY(receiver) REFERENCES USER(id),
FOREIGN KEY(accepted) REFERENCES ACCEPTED(id),
FOREIGN KEY(active) REFERENCES ACTIVE(id)
);

CREATE TABLE IF NOT EXISTS FRIEND_LIST(
    user1 int NOT NULL,
    user2 int NOT NULL,
    active int DEFAULT 1,
    FOREIGN KEY(user1) REFERENCES USER(id),
    FOREIGN KEY(user2) REFERENCES USER(id)
);
CREATE TABLE IF NOT EXISTS FAVORITE_LIST(
    user_id int NOT NULL,
    post_id int NOT NULL,
    FOREIGN KEY(user_id) REFERENCES USER(id),
    FOREIGN KEY(post_id) REFERENCES POST(id)
);