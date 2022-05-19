DROP TABLE IF EXISTS tricks;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_tricks;


CREATE TABLE tricks
(
    id          SERIAL PRIMARY KEY NOT NULL,
    name        VARCHAR            NOT NULL,
    description VARCHAR            NOT NULL,
    difficulty  INTEGER,
    video VARCHAR
);



CREATE TABLE users
(
    id       SERIAL PRIMARY KEY NOT NULL,
    name     VARCHAR            NOT NULL,
    email    VARCHAR UNIQUE     NOT NULL,
    password VARCHAR            NOT NULL
);


CREATE TABLE user_tricks (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER,
    trick_id INTEGER,
    status bool

);


ALTER TABLE ONLY user_tricks
    ADD CONSTRAINT fk_user_tricks_user_id FOREIGN KEY (user_id) references users(id),
    ADD CONSTRAINT fk_user_tricks_trick_id FOREIGN KEY (trick_id) references tricks(id);

ALTER TABLE ONLY tricks
    ADD COLUMN video VARCHAR;





