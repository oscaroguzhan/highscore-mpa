
CREATE TABLE highscores (
id INTEGER GENERATED ALWAYS AS IDENTITY,
game VARCHAR(50) NOT NULL,
player VARCHAR(250) NOT NULL,
score_date DATE NOT NULL,
points INTEGER NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO highscores
(game,
 player,
 score_date,
 points
 )
VALUES
('Tetris',
 ' Ozzy',
 '2022-05-16',
 '2904405'
);
INSERT INTO highscores
(game,
 player,
 score_date,
 points
 )
VALUES
('Tetris',
 ' Karin',
 '2022-03-17',
 '2506602'
);

