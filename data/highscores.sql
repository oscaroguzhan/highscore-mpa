--DDL (DATA DEFINITION LANGUAGE)
CREATE DATABASE highscore;

CREATE TABLE game (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL,
    image_url VARCHAR(250) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    release_date DATE NOT NULL,
    url_slug VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

-- with game_id refererar vi till game tabellen
CREATE TABLE highscores (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER,
    player VARCHAR(250) NOT NULL,
    score_date DATE NOT NULL,
    points INTEGER NOT NULL,
    FOREIGN KEY (game_id) REFERENCES game (id),
    PRIMARY KEY (id)
);