var express = require("express");
var router = express.Router();

// GET htpp://localhost:3000/admin/score
router.get("/", async (req, res) => {
  res.render("admin/score/index", {
    title: "New Score Administration",
  });
});

// GET http://localhost:3000/admin/score/new
// här vi gör en ny get anrop för att navigera till 
// sidan admin/score/new
router.get("/new", async (req, res) => {
  const { db } = req.app.locals;

  const sql = `
        SELECT id,
               title
            FROM game
    `;

  const result = await db.query(sql);

  res.render("admin/score/new", {
    title: "Ny score",
    games: result.rows,
  });
});

//POST http://localhost:3000/admin/score/new

router.post("/new", async (req, res) => {
  //destructure data from body
  const { player, score_date, points, game_title } = req.body;

  const { db } = req.app.locals;

  const gameId = await findGame(game_title, db);
  
  const score = {
    player,
    score_date,
    points: +points,
    gameId: gameId.id
  };

  await addScore(score, db);
  // server skickar en 302 Found till klienten, tillsammans med en location-header
  // som kommer vara satt till värdet nedan
  res.redirect("/admin/games");
});

async function findGame(title, db) {
  const sql = `
    SELECT id
        FROM game
    WHERE game.title =$1
  `;

  const result = await db.query(sql, [title]);
  return result.rows[0];
}

async function addScore(score, db) {
  const sql = `
    INSERT INTO highscores (
        player,
        score_date,
        points,
        game_id
    ) VALUES ($1, $2, $3, $4)
  `;

  await db.query(sql, [
    score.player,
    score.score_date,
    score.points,
    score.gameId,
  ]);
}
module.exports = router;
