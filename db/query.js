const db = require('./pool.js')

let movie_poster = 1;

async function retrieveAllMovies() {
    try {
        const { rows } = await db.query('SELECT * FROM movies')
        return rows;
    }
    catch (err) {
        console.error('Error retrieving all users from database', err);
    }
}

async function insertMovie(movieObject) {
    const { movie_title, movie_director, movie_genre, movie_main_actor, movie_released } = movieObject;

    try {
        await db.query(`
            INSERT INTO movies (movie_poster, movie_title, movie_director, movie_genre, movie_cast, movie_released)
            VALUES ('${movie_poster}', '${movie_title}', '${movie_director}', '${movie_genre}','${movie_main_actor}', ${movie_released});
            `);
        movie_poster++;
    }
    catch (err) {
        console.error('Error inserting movie into the database', err)
    }

}
async function dropAllEntries() {
    try {
        await db.query('DELETE FROM movies;')
        const {rows} = await db.query('SELECt * from movies');
        console.log(rows);
    }
    catch (err) {
        console.error('Error deleting entries', err);
    }
}

module.exports = { retrieveAllMovies, insertMovie, dropAllEntries }