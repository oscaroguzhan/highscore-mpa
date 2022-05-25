var express = require("express");
var router = express.Router();

// GET http://localhost:3000/api/games
router.get("/", async (req, res) => {
  const { title } = req.query;

  const { db } = req.app.locals;
  const highscores = await getHighscores(db);

  const games = await searchGames(title, db);
  res.json(highscores);
  res.json(games);
});

// GET http://localhost:3000/api/games/{urlSlug}
router.get("/:urlSlug", async (req, res) => {
  const { db } = req.app.locals;
  const { urlSlug } = req.params;
  const game = await getGame(urlSlug, db);
  //const game = []; kontroll om endpoint fungerar
  if (!game) {
    //sätt statuskoden till 404 not found
    res.status(404).send();
    return;
  }
  //sätter automatisk status koden till 200 ok
  res.json(game);
});

async function getHighscores(db) {
  const sql = `
   SELECT 
          highscores.player,
          TO_CHAR (highscores.score_date, 'YYYY-MM-DD') as score_date,
          highscores.points,
          highscores.game_id,
          game.url_slug
      FROM highscores
      LEFT JOIN game
        ON highscores.game_id = game.id
   `;

  const result = await db.query(sql);
  return result.rows;
}

async function searchGames(title, db) {
  const sql = `
  SELECT title,
         genre,
         TO_CHAR (game.release_date, 'YYYY' ) AS release_date,
         image_url,
         url_slug
    FROM game
  WHERE title ILIKE '%' || $1 || '%'
  
  `;
  const result = await db.query(sql, [title]);
  return result.rows;
}
async function getGame(urlSlug, db) {
  const sql = `
  SELECT game.id,
  game.title,
  game.genre,
  game.description,
TO_CHAR (game.release_date, 'YYYY') AS release_date,
  game.image_url,
  game.url_slug,
  highscores.player,
  highscores.points,
TO_CHAR (highscores.score_date, 'DD-MM-YYYY') AS score_date
FROM game
LEFT JOIN highscores
  ON game.id = highscores.game_id 
WHERE game.url_slug = $1
ORDER BY highscores.points DESC
LIMIT 10;
  
  `;
  const result = await db.query(sql, [urlSlug]);
  const game = result.rows.length > 0 ? result.rows[0] : null;
  return game;
}
module.exports = router;
