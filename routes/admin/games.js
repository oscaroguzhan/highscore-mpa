var express = require("express");
var router = express.Router();

// GET htpp://localhost:3000/admin/games
router.get("/", async (req, res) => {
  const { db } = req.app.locals;

  const games = await getGames(db);

  res.render("admin/games/index", {
    title: "Administration",
    games,
  });
});

// GET http://localhost:3000/admin/games/new
// här vi gör en ny get anrop för att navigera till sidan admin/games/new
router.get("/new", async (req, res) => {
  res.render("admin/games/new", {
    title: "Nytt spel",
  });
});

//POST http://localhost:3000/admin/games

router.post("/new", async (req, res) => {
  //destructure data from body
  const { title, description, image_url, genre, release_date } = req.body;
  const game = {
    title,
    description,
    image_url,
    genre,
    release_date,
    urlSlug: generateUrlSlug(title),
  };

  
  const { db } = req.app.locals;

  await saveGame(game, db);
  
  res.redirect("/admin/games");
});

async function saveGame(game, db) {
  const sql = `
    INSERT INTO game (
      title,
      description,
      image_url,
      genre,
      release_date,
      url_slug
    ) VALUES ($1, $2, $3, $4, $5, $6)
  `;

  await db.query(sql, [
    game.title,
    game.description,
    game.image_url,
    game.genre,
    game.release_date,
    game.urlSlug
  ]);
}

const generateUrlSlug = (title) => 
title.replace("-", "").replace(" ", "-").toLowerCase();
;
async function getGames(db) {
  const sql = `
    SELECT id,
           title,
           genre,
           TO_CHAR (game.release_date, 'DD-MM-YYYY') AS release_date,
           url_slug
      FROM game
  `;

  const result = await db.query(sql);
  return result.rows;
}
module.exports = router;
