INSERT INTO
    game (
        title,
        description,
        image_url,
        genre,
        release_date,
        url_slug
    )
VALUES
    (
        'Tetris',
        ' Tetris is a puzzle video game. Players complete lines by moving differently shaped pieces (tetrominoes), which descend onto the playing field. he completed lines disappear. he game ends when the playing field is filled. !',
        'https://via.placeholder.com/150x100',
        'Puzzle',
        '1984-03-01',
        'tetris'
    );

INSERT INTO
    game (
        title,
        description,
        image_url,
        genre,
        release_date,
        url_slug
    )
VALUES
    (
        'Pac-Man',
        ' Pac-Man is a 1980 arcade action video game. the player controls the eponymous character through an enclosed maze. The objective of the game is to eat all of the dots placed in the maze!',
        'https://via.placeholder.com/150x100',
        'Arcade',
        '1980-01-22',
        'pac-man'
    );

--add highscores 
INSERT INTO
    highscores (player, score_date, points, game_id)
VALUES
    (
        ' Ella',
        '2021-08-12',
        '3402405',
        1
    );
INSERT INTO
    highscores (player, score_date, points, game_id)
VALUES
    (
        ' Ozzy',
        '2019-06-18',
        '3906405',
        1
    );
INSERT INTO
    highscores (player, score_date, points, game_id)
VALUES
    (
        'Ozzy',
        '2022-08-12',
        '1402405',
        1
    );

INSERT INTO
    highscores (player, score_date, points, game_id)
VALUES
    (
        ' Karin',
        '2022-02-15',
        '3902405',
        2
    );
INSERT INTO
    highscores (player, score_date, points, game_id)
VALUES
    (
        ' Karin',
        '2015-04-19',
        '3582405',
        1
    );

