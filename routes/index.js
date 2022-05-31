var express = require("express");
var router = express.Router();

/* GET localhost:3000/.  index.js hanterar till anrop till startsidan */
router.get("/", async function (req, res) {
  const db = req.app.locals.db;

  //FIXME: behöver visa högsta score för varje spel (ingen duplets)
  // ta bort duplets DISTINCT ON
  //sortera descending order ORDER BY - DESC
  // LEFT JOIN make sure that all data from the left table (game) will be display regardless it has a matching entry or not on right table(highscores)
  const sql = `
  SELECT DISTINCT ON (game.title)
                      game.title,
                      game.url_slug,
                      highscores.player,
              TO_CHAR (highscores.score_date, 'YYYY-MM-DD') AS score_date,
                      highscores.points
                  FROM game
              LEFT JOIN highscores
                  ON game.id = highscores.game_id
              ORDER BY game.title, highscores.points DESC
  `;

  // skicka frågan till databasen och svaret sparas in result.rows
  const result = await db.query(sql);
  res.render("index", {
    title: "Highscore",
    Highscores: result.rows,
  });
});

module.exports = router;
