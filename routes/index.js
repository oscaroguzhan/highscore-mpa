var express = require("express");
var router = express.Router();

/* GET localhost:3000/.  index.js hanterar till anrop till startsidan */
router.get("/", async function (req, res) {
  const db = req.app.locals.db;

  // in sql har skapar vi en relation mellan game och users (många till många)
  //FIXME: sortera descending order
  const sql = `
  SELECT 
  game,
  player,
  TO_CHAR (highscores.score_date, 'YYYY-MM-DD') AS score_date,
  points,
  url_slug
  FROM highscores
  ORDER BY points DESC
  `;

  // skicka frågan till databasen och svaret sparar vi in result.rows
  const result = await db.query(sql);
  res.render("index", {
    title: "Highscore",
    Highscores: result.rows,
  });
});

module.exports = router;
