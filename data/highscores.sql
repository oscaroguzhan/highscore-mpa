CREATE DATABASE highscore;

CREATE TABLE game (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL,
    image_url VARCHAR(250) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    release_date DATE NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (title)
);

CREATE TABLE highscores (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    game VARCHAR(50) NOT NULL,
    player VARCHAR(250) NOT NULL,
    score_date DATE NOT NULL,
    points INTEGER NOT NULL,
    url_slug VARCHAR,
    FOREIGN KEY (url_slug) REFERENCES game (title),
    PRIMARY KEY (id)
);