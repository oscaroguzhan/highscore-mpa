var express = require("express");
var router = express.Router();

/* GET anrop till https://localhost:3000/admin/games/ */
router.get("/:urlSlug", async function (req, res) {
  const db = req.app.locals.db;

  const sql = `
  SELECT id,
    title,
    genre,
    release_year
    FROM game
  `;

  const result = await db.query(sql);

  res.render("admin/games", {
    title: "games",
    allGames: result.rows,
  });
});

module.exports = router;
