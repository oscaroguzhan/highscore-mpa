var express = require("express");
var router = express.Router();

// GET http://localhost:3000/api/games?title={title}
router.get("/", async (req, res) => {
  const { title } = req.query;

  const { db } = req.app.locals;

  // conditional rendering om vi får in query parameter titel i url:en anropa searchGame annars anropar vi alla spel
  const games = title ? await searchGames(title, db) : await getGames(db);

  if (!games) {
    //sätt statuskoden till "404 not found"
    res.status(404).send();
    return;
  }
  res.json(games);
});

// GET http://localhost:3000/api/games/{urlSlug}
router.get("/:urlSlug", async (req, res) => {
  const { db } = req.app.locals;
  const { urlSlug } = req.params;
  const game = await getGame(urlSlug, db);
  //const game = []; kontrollera om endpoint fungerar

  if (!game) {
    //sätt statuskoden till "404 not found"
    res.status(404).send();
    return;
  }
  //sätter automatisk status koden till 200 ok
  res.json(game);
});

// POST endpoint som hanterar inkommande post anrop http://localhost:3000/api/games
// in i body finns det title,description, image_url,genre osv plockar vi upp och bryter vi konstanter och bygger på en game object
// vi plockar up referense till Pool object som vi använder för att kommunicera med postgres
// anropar vi funktioner som i sin tur har sql syntax till database
router.post("/", async (req, res) => {
  const { db } = req.app.locals;
  const { title, description, image_url, genre, release_date } = req.body;
  //TODO:generate urlslug
  const game = {
    title,
    description,
    image_url,
    genre,
    release_date,
    urlSlug: generateUrlSlug(title),
  };

  game.id = await saveGame(game, db);

  //TODO: sätt location header (pekar ut resursen)
  //sätt location header till "/api/games/donkey-kong" (exempelvis)
  res.location(`/api/games/${game.urlSlug}`);
  //Retunera 201 Created - resursen har skapats; vi skicka tillbaka represantion av game
  res.status(201).send(game);
});

// DELETE /http://localhost:3000/api/games/{id}
router.delete("/:id", async (res, req) => {
  // plockar upp id from url:en
  const { db } = req.app.locals;
  const gameId = req.params.id;
  await deleteGame(gameId, db);
  //retunera 204 No Content
  res.status(204).send();
});

async function deleteGame(id, db) {
  const sql = `
    DELETE FROM game
      WHERE id = $1
  `;
  await db.query(sql, [id]);
}

async function getGames(db) {
  const sql = `
  SELECT DISTINCT ON (game.title)
                      game.id,
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
        game.url_slug
      FROM game
    WHERE game.url_slug = $1
  
  `;
  const result = await db.query(sql, [urlSlug]);
  const game = result.rows.length > 0 ? result.rows[0] : null;
  return game;
}
// observera vi vill retunera till id so we can senare plocka upp game
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
    RETURNING id
  `;

  const result = await db.query(sql, [
    game.title,
    game.description,
    game.image_url,
    game.genre,
    game.release_date,
    game.urlSlug,
  ]);
  return result.rows[0].id;
}

const generateUrlSlug = (title) =>
  title.replace("-", "").replace(" ", "-").toLowerCase();
module.exports = router;
