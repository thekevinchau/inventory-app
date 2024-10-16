const db = require('./pool.js')
const {processUpdateQuery, processSearchQuery} = require('../utils/queryProcessing.js');
const retrieveMovieImage = require('../utils/testingFetch.js');


async function retrieveAllMovies() {
    try {
        const { rows } = await db.query('SELECT * FROM movies ORDER BY movie_title;')
        return rows;
    }
    catch (err) {
        console.error('Error retrieving all users from database', err);
    }
}

async function insertMovie(movieObject) {
    const { movie_title, movie_director, movie_genre, movie_main_actor, movie_released } = movieObject;

    try {
        const poster_url = await retrieveMovieImage(movie_title);
        await db.query(`
            INSERT INTO movies (movie_poster, movie_title, movie_director, movie_genre, movie_main_actor, movie_released)
            VALUES ('${poster_url}', '${movie_title}', '${movie_director}', '${movie_genre}','${movie_main_actor}', ${movie_released});
            `);
    }
    catch (err) {
        console.error('Error inserting movie into the database', err)
        res.status(500).send('Server error');
    }

}

async function updateMovie(movie_id, updated_params){
    try{
        const updateQuery = await processUpdateQuery(updated_params);
        console.log(updateQuery);

        await db.query(`
            UPDATE movies
            ${updateQuery}
            WHERE movie_id = ${movie_id};
            `)
    }
    catch(err){
        console.error('Error updating movie: ', err)
    }
}

async function deleteMovie(movie_id){
    try{
        await db.query(`
            DELETE FROM movies WHERE movie_id = ${movie_id};
            `)
    }
    catch(err){
        console.error(`Error deleting movie ${movie_id}`, err)
    }
}

async function searchMovie(search_params){
    const processedQuery = processSearchQuery(search_params);
    try{
        const {rows} = await db.query(`
            SELECT * FROM movies
            WHERE
            ${processedQuery}
            ORDER BY movie_title
            ;
            `)
        console.log(rows);
        return rows;
    }
    catch(err){
        console.error('Error searching for movie', err);
    }
}


async function dropAllEntries() {
    try {
        await db.query('DELETE FROM movies;')
        const {rows} = await db.query('SELECT * from movies');
        console.log(rows);
    }
    catch (err) {
        console.error('Error deleting entries', err);
    }
}

module.exports = { retrieveAllMovies, insertMovie, dropAllEntries, updateMovie, deleteMovie, searchMovie}