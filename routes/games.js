var express = require("express");
var router = express.Router();

// GET http://localhost:3000/
router.get("/:urlSlug", async function (req, res) {
  const { db } = req.app.locals;
  const { urlSlug } = req.params;

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
 INNER JOIN highscores
         ON highscores.game_id = game.id
      WHERE game.url_slug ILIKE '%' || $1 || '%'
      ORDER BY highscores.points DESC
        LIMIT 10;

  `;

  const result = await db.query(sql, [urlSlug]);

  // destructring från result.rows and put in a game object
  const { title, genre, description, release_date, image_url, url_slug } = result.rows[0];
  const game = {
    title: title,
    genre: genre,
    description: description,
    release_date: release_date,
    image_url: image_url,
    url_slug:url_slug
  };
  const highscores = result.rows.map((highscore) => ({
    player: highscore.player,
    points: highscore.points,
    score_date: highscore.score_date,
  }));
  res.render("gameDetails", {
    title: game.title,
    game,
    highscores,
  });
});

module.exports = router;
