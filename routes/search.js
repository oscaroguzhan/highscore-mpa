var express = require("express");
var router = express.Router();

// get localhost://3000/search?q=searchTerm
router.get("/", async function (req, res) {
  const searchTerm = req.query.q;
  //reference till db
  const db = req.app.locals.db;
  const sql = `
  SELECT title,
         genre,
         TO_CHAR (game.release_date, 'YYYY' ) AS release_date,
         image_url
    FROM game
    WHERE title ILIKE '%' || $1 || '%'

  `;

  const result = await db.query(sql, [searchTerm]);
  res.render("search", {
    title: "Sökresultat",
    Games: result.rows,
    searchTerm,
  });
});

module.exports = router;
