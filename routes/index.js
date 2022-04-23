var express = require("express");
var router = express.Router();

/* GET localhost:3000/. */
router.get("/", async function (req, res) {
  const db = req.app.locals.db;

  const sql = `
    SELECT game,
      player,
      score_date,
      points
      FROM highscores
  `;

  const result = await db.query(sql);
  res.render("index", {
    title: "Highscore",
    highscores: result.rows,
  });
});

module.exports = router;
