INSERT INTO
    game (
        title,
        description,
        image_url,
        genre,
        release_date
    )
VALUES
    (
        'Tetris',
        ' Tetris is a puzzle video game. Players complete lines by moving differently shaped pieces (tetrominoes), which descend onto the playing field. he completed lines disappear. he game ends when the playing field is filled. !',
        'https://via.placeholder.com/150x100',
        'Puzzle',
        '1984-03-01'
    );


INSERT INTO
    game (
        title,
        description,
        image_url,
        genre,
        release_date
    )
VALUES
    (
        'PacMan',
        ' Pac-Man is a 1980 maze action video game. the player controls the eponymous character through an enclosed maze. The objective of the game is to eat all of the dots placed in the maze!',
        'https://via.placeholder.com/150x100',
        'Maze',
        '1980-01-22'
    );


--add highscores 
INSERT INTO
    highscores (game, player, score_date, points, url_slug)
VALUES
    (
        'Tetris',
        ' Ozzy',
        '2021-08-12',
        '3402405',
        'Tetris'
    );

INSERT INTO
    highscores (game, player, score_date, points, url_slug)
VALUES
    (
        'PacMan',
        ' Ozzy',
        '2022-02-15',
        '3902405',
        'PacMan'
    );

INSERT INTO
    highscores (game, player, score_date, points, url_slug)
VALUES
    (
        'Tetris',
        ' Karin',
        '2022-03-14',
        '3802405',
        'Tetris'
    );

INSERT INTO
    highscores (game, player, score_date, points, url_slug)
VALUES
    (
        'Tetris',
        ' Ozzy',
        '2019-08-12',
        '1402405',
        'Tetris'
    );
INSERT INTO
    highscores (game, player, score_date, points, url_slug)
VALUES
    (
        'Tetris',
        ' Ella',
        '2018-08-12',
        '3002405',
        'Tetris'
    );

